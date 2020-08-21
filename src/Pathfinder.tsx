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
import MazeGenerator from './mazes/MazeGenerator';

interface State {
    grid: Node[][];
    startPos: Position;
    finishPos: Position;
    midpointPos: Position;
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
            midpointPos: null,
            mouseState: MouseState.PlacingWall,
            isMouseDown: false,
            updateLock: false,
            perlinToggle: false,
            prevAlgorithm: null,
        };
    }

    shouldComponentUpdate(nextProps: Readonly<{}>, nextState: Readonly<State>): boolean {
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
            (mouseState === MouseState.MovingStart ||
                mouseState === MouseState.MovingFinish ||
                mouseState === MouseState.MovingMidpoint) &&
            !this.isEmpty(position)
        )
            return;

        if (this.isStart(position)) {
            mouseState = MouseState.MovingStart;
        } else if (this.isFinish(position)) {
            mouseState = MouseState.MovingFinish;
        } else if (this.isMidpoint(position)) {
            mouseState = MouseState.MovingMidpoint;
        } else if (nodeType === NodeType.Unvisited) {
            mouseState = MouseState.PlacingWall;
        } else {
            mouseState = MouseState.RemovingWall;
        }

        if (this.isEmpty(position)) {
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
        let { grid, startPos, finishPos, midpointPos, mouseState, isMouseDown, prevAlgorithm } = this.state;
        if (!isMouseDown || this.isStart(position) || this.isFinish(position) || this.isMidpoint(position)) return;

        switch (mouseState) {
            case MouseState.MovingStart:
                startPos = position;
                if (prevAlgorithm !== null) {
                    this.recalculatePath(startPos, finishPos, midpointPos, prevAlgorithm);
                } else {
                    this.setState({ startPos: startPos });
                }
                break;
            case MouseState.MovingFinish:
                finishPos = position;
                if (prevAlgorithm !== null) {
                    this.recalculatePath(startPos, finishPos, midpointPos, prevAlgorithm);
                } else {
                    this.setState({ finishPos: finishPos });
                }
                break;
            case MouseState.MovingMidpoint:
                midpointPos = position;
                if (prevAlgorithm !== null) {
                    this.recalculatePath(startPos, finishPos, midpointPos, prevAlgorithm);
                } else {
                    this.setState({ midpointPos: midpointPos });
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

    private recalculatePath(
        startPos: Position,
        finishPos: Position,
        midpointPos: Position,
        prevAlgorithm: PathfindingAlgorithm,
    ) {
        let grid: Node[][] = this.clearPath();
        let visitedPaths: Position[][] = [];
        let finalPaths: Position[][] = [];
        if (midpointPos === null) {
            prevAlgorithm.calculatePath(grid, startPos, finishPos);
            visitedPaths.push(prevAlgorithm.produceVisitedInOrder());
            finalPaths.push(prevAlgorithm.produceFinalPath());
        } else {
            prevAlgorithm.calculatePath(grid, startPos, midpointPos);
            visitedPaths.push(prevAlgorithm.produceVisitedInOrder());
            finalPaths.push(prevAlgorithm.produceFinalPath());

            prevAlgorithm.calculatePath(grid, midpointPos, finishPos);
            visitedPaths.push(prevAlgorithm.produceVisitedInOrder());
            finalPaths.push(prevAlgorithm.produceFinalPath());
        }

        console.log(visitedPaths);

        for (let idx = 0; idx < visitedPaths.length; idx++) {
            let visited: Position[] = visitedPaths[idx];
            for (let pos of visited) {
                if (idx === 0) {
                    grid[pos.y][pos.x].nodeType = NodeType.VisitedOne;
                } else if (grid[pos.y][pos.x].nodeType === NodeType.VisitedOne) {
                    grid[pos.y][pos.x].nodeType = NodeType.VisitedOverlap;
                } else {
                    grid[pos.y][pos.x].nodeType = NodeType.VisitedTwo;
                }
            }
        }

        for (let path of finalPaths) {
            for (let pos of path) {
                grid[pos.y][pos.x].nodeType = NodeType.ShortestPath;
            }
        }

        this.setState({ grid: grid, startPos: startPos, finishPos: finishPos, midpointPos: midpointPos });
    }

    private isEmpty(position: Position) {
        return !this.isStart(position) && !this.isFinish(position) && !this.isMidpoint(position);
    }

    private isStart(position: Position) {
        return position.x === this.state.startPos.x && position.y === this.state.startPos.y;
    }

    private isFinish(position: Position) {
        return position.x === this.state.finishPos.x && position.y === this.state.finishPos.y;
    }

    private isMidpoint(position: Position) {
        return (
            this.state.midpointPos !== null &&
            position.x === this.state.midpointPos.x &&
            position.y === this.state.midpointPos.y
        );
    }

    private performAlgorithm(algorithm: PathfindingAlgorithm): void {
        let midpointPos = this.state.midpointPos;
        this.setState({ prevAlgorithm: algorithm, mouseState: MouseState.Disabled });
        let visitedPaths: Position[][] = [];
        let finalPaths: Position[][] = [];
        if (midpointPos === null) {
            algorithm.calculatePath(this.state.grid, this.state.startPos, this.state.finishPos);
            visitedPaths.push(algorithm.produceVisitedInOrder());
            finalPaths.push(algorithm.produceFinalPath());
        } else {
            algorithm.calculatePath(this.state.grid, this.state.startPos, this.state.midpointPos);
            visitedPaths.push(algorithm.produceVisitedInOrder());
            finalPaths.push(algorithm.produceFinalPath());

            algorithm.calculatePath(this.state.grid, this.state.midpointPos, this.state.finishPos);
            visitedPaths.push(algorithm.produceVisitedInOrder());
            finalPaths.push(algorithm.produceFinalPath());
        }

        this.visualiseAlgorithm(visitedPaths, finalPaths);
        this.setState({ mouseState: MouseState.PlacingWall });
    }

    private visualiseAlgorithm(visitedInOrder: Position[][], shortestPath: Position[][]): void {
        (async () => {
            this.lockRender();
            for (let idx = 0; idx < visitedInOrder.length; idx++) {
                let visited: Position[] = visitedInOrder[idx];
                await this.visualiseVisited(visited, idx);
            }

            await this.visualisePath([].concat(...shortestPath));
            this.unlockRender();
        })();
    }

    private visualiseVisited(visitedInOrder: Array<Position>, count: number): Promise<void> {
        return new Promise<void>((resolve) => {
            for (let i = 0; i <= visitedInOrder.length; i++) {
                setTimeout(() => {
                    if (i === visitedInOrder.length) {
                        resolve();
                    } else {
                        let position: Position = visitedInOrder[i];
                        let ref: RefObject<HTMLDivElement> = this.references[position.y][position.x];
                        let className: string = ref.current.className;
                        if (
                            !className.includes('cell-start') &&
                            !className.includes('cell-finish') &&
                            !className.includes('cell-midpoint')
                        ) {
                            if (className.includes('cell-visited-0')) {
                                ref.current.className = `cell cell-visited-overlap`;
                            } else {
                                ref.current.className = `cell cell-visited-${count}`;
                            }
                            let grid: Node[][] = this.state.grid;
                            if (count === 0) {
                                grid[position.y][position.x].nodeType = NodeType.VisitedOne;
                            } else if (grid[position.y][position.x].nodeType === NodeType.VisitedOne) {
                                grid[position.y][position.x].nodeType = NodeType.VisitedOverlap;
                            } else {
                                grid[position.y][position.x].nodeType = NodeType.VisitedTwo;
                            }
                            this.setState({ grid: grid });
                        }
                    }
                }, UPDATE_RATE * i);
            }
        });
    }

    private visualisePath(shortestPath: Position[]): Promise<void> {
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
                        if (
                            !className.includes('cell-start') &&
                            !className.includes('cell-finish') &&
                            !className.includes('cell-midpoint')
                        ) {
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

    private generateMaze(mazeGenerator: MazeGenerator): void {
        (async () => {
            this.lockRender();
            let walls: Position[] = mazeGenerator.generateWalls();
            await this.visualizeMaze(walls);
            this.unlockRender();
            this.setState({ mouseState: MouseState.PlacingWall });
        })();
    }

    private visualizeMaze(walls: Position[]): Promise<void> {
        return new Promise<void>((resolve) => {
            for (let i = 0; i <= walls.length; i++) {
                setTimeout(() => {
                    if (i === walls.length) {
                        setTimeout(() => {
                            resolve();
                        }, UPDATE_RATE);
                    } else {
                        let grid: Node[][] = this.state.grid;
                        let position: Position = walls[i];
                        let ref: RefObject<HTMLDivElement> = this.references[position.y][position.x];
                        let className: string = ref.current.className;
                        if (this.wallAlreadyPlaced(position)) {
                            if (!className.includes('cell-start') && !className.includes('cell-finish')) {
                                ref.current.className = 'cell cell-unvisited';
                            }
                            grid[position.y][position.x].nodeType = NodeType.Unvisited;
                        } else {
                            if (
                                !className.includes('cell-start') &&
                                !className.includes('cell-finish') &&
                                !className.includes('cell-midpoint')
                            ) {
                                ref.current.className = 'cell cell-wall';
                            }
                            grid[position.y][position.x].nodeType = NodeType.Wall;
                        }

                        this.setState({ grid: grid });
                    }
                }, UPDATE_RATE * i);
            }
        });
    }

    private wallAlreadyPlaced(wall: Position): boolean {
        const grid = this.state.grid;
        return grid[wall.y][wall.x].nodeType === NodeType.Wall;
    }

    setMidpoint(position: Position): void {
        let prevAlgorithm = this.state.prevAlgorithm;
        let grid = this.state.grid;
        if (!this.isStart(position) && !this.isFinish(position)) {
            let nextMidPoint: Position;
            if (this.isMidpoint(position)) {
                nextMidPoint = null;
            } else {
                nextMidPoint = position;
            }
            //
            if (prevAlgorithm !== null) {
                prevAlgorithm = null;
                grid = this.clearPath();
            }
            //
            this.setState({ grid: grid, prevAlgorithm: prevAlgorithm, midpointPos: nextMidPoint });
        }
    }

    public render(): any {
        const grid = this.state.grid;
        return (
            <div>
                <Navbar
                    performAlgorithm={(algorithm: PathfindingAlgorithm) => this.performAlgorithm(algorithm)}
                    clearPath={() => this.setState({ prevAlgorithm: null, grid: this.clearPath() })}
                    generateLandscape={() => this.generateLandscape()}
                    generateMaze={(mazeGenerator: MazeGenerator) => this.generateMaze(mazeGenerator)}
                />
                <div className="grid">
                    {grid.map((row: Array<Node>, rowIdx) => {
                        return (
                            <div className="grid-row" key={rowIdx}>
                                {row.map((cell: Node, colIdx) => {
                                    let position: Position = { x: colIdx, y: rowIdx };
                                    return (
                                        <Cell
                                            position={{ x: colIdx, y: rowIdx }}
                                            isStart={this.isStart(position)}
                                            isFinish={this.isFinish(position)}
                                            isMidpoint={this.isMidpoint(position)}
                                            nodeType={cell.nodeType}
                                            weight={cell.weight}
                                            updateMouseState={(position: Position, eventType: string) =>
                                                this.updateMouseState(position, eventType)
                                            }
                                            setMidpoint={(position: Position) => this.setMidpoint(position)}
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
