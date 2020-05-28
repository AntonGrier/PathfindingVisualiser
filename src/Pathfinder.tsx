import * as React from 'react';
import {
    Node,
    NodeType,
    Position,
    MouseState,
    GRID_W,
    GRID_H,
    DEFAULT_START_POS,
    DEFAULT_FINISH_POS,
    UPDATE_RATE,
} from './IPathfinder';
import { Component, createRef, RefObject } from 'react';
import Cell from './Cell';
import Navbar from './Navbar';
import PathfindingAlgorithm from './Algorithms/PathfindingAlgorithm';
import PerlinNoise from './Algorithms/Perlin/PerlinNoise';

interface State {
    grid: Node[][];
    startPos: Position;
    finishPos: Position;
    mouseState: MouseState;
    isMouseDown: boolean;
    updateLock: boolean;
    perlinToggle: boolean;
    prevAlgorithm: PathfindingAlgorithm;
}

export default class Pathfinder extends Component<{}, State> {
    references: Array<Array<RefObject<HTMLDivElement> | any>> = Array(GRID_H)
        .fill([])
        .map(() =>
            Array(GRID_W)
                .fill(0)
                .map(() => createRef()),
        );
    constructor(props: any) {
        super(props);
        // this.references = Array(GRID_H)
        //     .fill([])
        //     .map(() =>
        //         Array(GRID_W)
        //             .fill(0)
        //             .map(() => createRef()),
        //     );
        let grid: Node[][] = [];
        for (let row = 0; row < GRID_H; row++) {
            let curRow: Array<Node> = [];
            for (let col = 0; col < GRID_W; col++) {
                let newNode: Node = { position: { x: col, y: row }, nodeType: NodeType.Unvisited, weight: 0 };
                curRow.push(newNode);
            }
            grid.push(curRow);
        }
        this.state = {
            grid: grid,
            startPos: DEFAULT_START_POS,
            finishPos: DEFAULT_FINISH_POS,
            mouseState: MouseState.PlacingWall,
            isMouseDown: false,
            updateLock: false,
            perlinToggle: false,
            prevAlgorithm: null,
        };
    }

    shouldComponentUpdate(
        nextProps: Readonly<{}>,
        nextState: Readonly<State>,
    ): boolean {
        return !nextState.updateLock;
    }

    clearPath(): Node[][] {
        let grid: Node[][] = this.state.grid;
        grid = grid.map((row) => {
            return row.map((node) => {
                return {
                    ...node,
                    nodeType: node.nodeType === NodeType.Wall ? NodeType.Wall : NodeType.Unvisited,
                };
            });
        });
        return grid;
    }

    updateMouseState(position: Position, eventType: string): void {
        if (this.state.mouseState === MouseState.Disabled) return;
        switch (eventType) {
            case 'mousedown': {
                this.onMouseDown(position);
                break;
            }
            case 'mouseup': {
                this.onMouseUp();
                break;
            }
            case 'mouseenter': {
                this.onMouseEnter(position);
                break;
            }
        }
    }

    private onMouseDown(position: Position) {
        let { grid, mouseState, isMouseDown, prevAlgorithm } = this.state;
        let nodeType: NodeType = grid[position.y][position.x].nodeType;
        if (
            (mouseState === MouseState.MovingStart && this.isFinish(position)) ||
            (mouseState === MouseState.MovingFinish && this.isStart(position))
        )
            return;

        mouseState = this.isStart(position)
            ? MouseState.MovingStart
            : this.isFinish(position)
            ? MouseState.MovingFinish
            : nodeType === NodeType.Unvisited
            ? MouseState.PlacingWall
            : MouseState.RemovingWall;

        if (!this.isStart(position) && !this.isFinish(position)) {
            if (prevAlgorithm !== null) {
                grid = this.clearPath();
                prevAlgorithm = null;
            }
            if (nodeType === NodeType.Wall) {
                grid[position.y][position.x].nodeType = NodeType.Unvisited;
            } else {
                grid[position.y][position.x].nodeType = NodeType.Wall;
            }
        }
        isMouseDown = true;
        this.setState({ grid: grid, mouseState: mouseState, isMouseDown: isMouseDown, prevAlgorithm: prevAlgorithm });
    }

    private onMouseUp() {
        let mouseState = MouseState.PlacingWall;
        let isMouseDown = false;
        this.setState({ mouseState: mouseState, isMouseDown: isMouseDown });
    }

    private onMouseEnter(position: Position) {
        let { grid, startPos, finishPos, mouseState, isMouseDown, prevAlgorithm } = this.state;
        if (!isMouseDown || this.isStart(position) || this.isFinish(position)) return;

        switch (mouseState) {
            case MouseState.MovingStart:
                startPos = position;
                if (prevAlgorithm !== null) {
                    this.recalculatePath(startPos, finishPos, prevAlgorithm);
                } else {
                    this.setState({ startPos: startPos });
                }
                break;
            case MouseState.MovingFinish:
                finishPos = position;
                if (prevAlgorithm !== null) {
                    this.recalculatePath(startPos, finishPos, prevAlgorithm);
                } else {
                    this.setState({ finishPos: finishPos });
                }
                break;
            case MouseState.PlacingWall:
                grid[position.y][position.x].nodeType = NodeType.Wall;
                this.setState({ grid: grid });
                break;
            case MouseState.RemovingWall:
                grid[position.y][position.x].nodeType = NodeType.Unvisited;
                this.setState({ grid: grid });
                break;
        }
    }

    private recalculatePath(startPos: Position, finishPos: Position, prevAlgorithm: PathfindingAlgorithm) {
        let grid: Node[][] = this.clearPath();
        prevAlgorithm.recalculatePath(grid, startPos, finishPos);
        let visitedInOrder = prevAlgorithm.produceVisitedInOrder();
        let finalPath = prevAlgorithm.produceFinalPath();
        for (let position of visitedInOrder) {
            grid[position.y][position.x].nodeType = NodeType.Visited;
        }
        for (let position of finalPath) {
            grid[position.y][position.x].nodeType = NodeType.ShortestPath;
        }
        this.setState({ grid: grid, startPos: startPos, finishPos: finishPos });
    }

    private isStart(position: Position) {
        return position.x === this.state.startPos.x && position.y === this.state.startPos.y;
    }

    private isFinish(position: Position) {
        return position.x === this.state.finishPos.x && position.y === this.state.finishPos.y;
    }

    private performAlgorithm(algorithm: PathfindingAlgorithm): void {
        this.setState({ prevAlgorithm: algorithm, mouseState: MouseState.Disabled });
        algorithm.calculatePath(this.state.grid, this.state.startPos, this.state.finishPos);
        let visitedInOrder: Array<Position> = algorithm.produceVisitedInOrder();
        let shortestPath: Array<Position> = algorithm.produceFinalPath();
        this.visualiseAlgorithm(visitedInOrder, shortestPath);
    }

    private visualiseAlgorithm(visitedInOrder: Array<Position>, shortestPath: Array<Position>): void {
        (async () => {
            this.lockRender();
            await this.visualiseVisited(visitedInOrder);
            await this.visualisePath(shortestPath);
            this.unlockRender();
            this.setState({ mouseState: MouseState.PlacingWall });
        })();
    }

    private visualiseVisited(visitedInOrder: Array<Position>): Promise<void> {
        return new Promise<void>((resolve) => {
            for (let i = 0; i <= visitedInOrder.length; i++) {
                setTimeout(() => {
                    if (i === visitedInOrder.length) {
                        resolve();
                    } else {
                        let position: Position = visitedInOrder[i];
                        let ref: RefObject<HTMLDivElement> = this.references[position.y][position.x];
                        let className: string = ref.current.className;
                        if (!className.includes('cell-start') && !className.includes('cell-finish')) {
                            ref.current.className = 'cell cell-visited';
                            let grid: Node[][] = this.state.grid;
                            grid[position.y][position.x].nodeType = NodeType.Visited;
                            this.setState({ grid: grid });
                        }
                    }
                }, UPDATE_RATE * i);
            }
        });
    }

    private visualisePath(shortestPath: Array<Position>): Promise<void> {
        return new Promise<void>((resolve) => {
            for (let i = 0; i <= shortestPath.length; i++) {
                setTimeout(() => {
                    if (i === shortestPath.length) {
                        setTimeout(() => {
                            resolve();
                        }, UPDATE_RATE);
                    } else {
                        let position: Position = shortestPath[i];
                        let ref: RefObject<HTMLDivElement> = this.references[position.y][position.x];
                        let className: string = ref.current.className;
                        if (!className.includes('cell-start') && !className.includes('cell-finish')) {
                            ref.current.className = 'cell cell-shortestPath';
                            let grid: Node[][] = this.state.grid;
                            grid[position.y][position.x].nodeType = NodeType.ShortestPath;
                            this.setState({ grid: grid });
                        }
                    }
                }, UPDATE_RATE * i);
            }
        });
    }

    private lockRender() {
        this.setState({ updateLock: true });
    }

    private unlockRender() {
        this.setState({ updateLock: false });
    }

    private generateLandscape() {
        const STEEPNESS: number = 0.2;
        const perlin: PerlinNoise = new PerlinNoise();
        const seed: number = Math.floor(Math.random() * 10000);

        let grid: Node[][] = this.state.grid;
        for (let y: number = 0; y < GRID_H; y++) {
            for (let x: number = 0; x < GRID_W; x++) {
                let newWeight = perlin.noise(x * STEEPNESS + seed, y * STEEPNESS + seed, 0);
                grid[y][x].weight = newWeight;
            }
        }
        console.log(grid);
        this.setState({ grid: grid });
    }

    public render(): any {
        const grid = this.state.grid;
        return (
            <div>
                <Navbar
                    performAlgorithm={(algorithm: PathfindingAlgorithm) => this.performAlgorithm(algorithm)}
                    clearPath={() => this.setState({ prevAlgorithm: null, grid: this.clearPath() })}
                    generateLandscape={() => this.generateLandscape()}
                />
                <div className="grid">
                    {grid.map((row: Array<Node>, rowIdx) => {
                        return (
                            <div className="grid-row" key={rowIdx}>
                                {row.map((cell: Node, colIdx) => {
                                    return (
                                        <Cell
                                            position={{ x: colIdx, y: rowIdx }}
                                            isStart={
                                                this.state.startPos.x === colIdx && this.state.startPos.y === rowIdx
                                            }
                                            isFinish={
                                                this.state.finishPos.x === colIdx && this.state.finishPos.y === rowIdx
                                            }
                                            nodeType={cell.nodeType}
                                            weight={cell.weight}
                                            updateMouseState={(position: Position, eventType: string) =>
                                                this.updateMouseState(position, eventType)
                                            }
                                            nodeRef={this.references[rowIdx][colIdx]}
                                            key={colIdx}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
