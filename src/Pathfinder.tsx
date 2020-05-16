import * as React from "react";
import {Component} from "react";
import Cell from "./Cell";
import Navbar from "./Navbar";
import PathfindingAlgorithm from "./Algorithms/PathfindingAlgorithm";

export const GRIDW = 50;
export const GRIDH = 27;
const DEFAULTSTARTPOS: Position = {x: Math.floor(GRIDW/4), y: Math.floor(GRIDH/2)};
const DEFAULTFINISHPOS: Position = {x: GRIDW - DEFAULTSTARTPOS.x, y: DEFAULTSTARTPOS.y};
const UPDATERATE = 15;

export interface Position {
    x: number,
    y: number,
}
export enum MouseState {
    PlacingWall,
    RemovingWall,
    MovingStart,
    MovingFinish,
}
export enum NodeType {
    Unvisited,
    Visited,
    Wall,
    ShortestPath,
}
export interface Node {
    position : Position,
    nodeType: NodeType;
}
export default class Pathfinder extends Component<{}, {grid: Array<Array<Node>>, startPos: Position, finishPos: Position, mouseState: MouseState, isMouseDown: boolean}> {
    // references: Array<Array<React.RefObject<any>>>;
    constructor(props: any) {
        super(props);
        this.state = {
            grid: [],
            startPos: null,
            finishPos: null,
            mouseState: null,
            isMouseDown: false,
        };
    }

    componentDidMount(): void {
        let grid: Array<Array<Node>> = [];
        for (let row = 0; row < GRIDH; row++) {
            let curRow: Array<Node> = [];
            for (let col = 0; col < GRIDW; col++) {
                let newNode: Node = {position: {x: col, y: row}, nodeType: NodeType.Unvisited};
                curRow.push(newNode);
            }
            grid.push(curRow);
        }
        // this.references = grid.map((row: Array<Node>) => {
        //    return row.map(() => {
        //        return React.createRef();
        //    });
        // });
        this.setState({grid: grid, startPos: DEFAULTSTARTPOS, finishPos: DEFAULTFINISHPOS, mouseState: MouseState.PlacingWall, isMouseDown: false});
    }

    updateMouseState(position: Position, eventType: string): void {
        switch (eventType) {
            case "mousedown": {
                this.onMouseDown(position);
                break;
            }
            case "mouseup": {
                this.onMouseUp();
                break;
            }
            case "mouseenter": {
                this.onMouseEnter(position);
                break;
            }
        }
    }

    private onMouseDown(position: Position) {
        let {grid, mouseState, isMouseDown} = this.state;
        let nodeType: NodeType = grid[position.y][position.x].nodeType;
        if ((mouseState === MouseState.MovingStart && this.isFinish(position)) || (mouseState === MouseState.MovingFinish && this.isStart(position))) return;

        mouseState = this.isStart(position) ? MouseState.MovingStart : this.isFinish(position) ? MouseState.MovingFinish : nodeType === NodeType.Unvisited ? MouseState.PlacingWall : MouseState.RemovingWall;

        if (!this.isStart(position) && !this.isFinish(position)) {
            if (nodeType === NodeType.Wall) {
                grid[position.y][position.x].nodeType = NodeType.Unvisited;
            } else {
                grid[position.y][position.x].nodeType = NodeType.Wall
            }
        }
        isMouseDown = true;
        this.setState({grid: grid, mouseState: mouseState, isMouseDown: isMouseDown});
    }

    private onMouseUp() {
        let mouseState = MouseState.PlacingWall;
        let isMouseDown = false;
        this.setState({mouseState: mouseState, isMouseDown: isMouseDown});
    }

    private onMouseEnter(position: Position) {
        let {grid, startPos, finishPos, mouseState, isMouseDown} = this.state;
        if (!isMouseDown || this.isStart(position) || this.isFinish(position)) return;

        switch (mouseState) {
            case MouseState.MovingStart:
                startPos = position;
                this.setState({startPos: startPos});
                break;
            case MouseState.MovingFinish:
                finishPos = position;
                this.setState({finishPos: finishPos});
                break;
            case MouseState.PlacingWall:
                grid[position.y][position.x].nodeType = NodeType.Wall;
                this.setState({grid: grid});
                break;
            case MouseState.RemovingWall:
                grid[position.y][position.x].nodeType = NodeType.Unvisited;
                this.setState({grid: grid});
                break;
        }
    }

    private isStart(position: Position) {
        return position.x === this.state.startPos.x && position.y === this.state.startPos.y;
    }

    private isFinish(position: Position) {
        return position.x === this.state.finishPos.x && position.y === this.state.finishPos.y;
    }

    private performAlgorithm(algorithm: PathfindingAlgorithm): void {
        algorithm.calculatePath(this.state.grid, this.state.startPos, this.state.finishPos);
        let visitedInOrder: Array<Position> = algorithm.produceVisitedInOrder();
        let shortestPath: Array<Position> = algorithm.produceShortestPath();
        this.visualiseAlgorithm(visitedInOrder, shortestPath);
    }

    private visualiseAlgorithm(visitedInOrder: Array<Position>, shortestPath: Array<Position>): void {
        (async () => {
            await this.visualiseVisited(visitedInOrder);
            await this.visualisePath(shortestPath);
        })();
    }

    private visualiseVisited(visitedInOrder: Array<Position>): Promise<void> {
        return new Promise(resolve => {
            let posIdx: number = 0;
            setInterval(() => {
                if (posIdx === visitedInOrder.length) {
                    resolve();
                } else {
                    let position: Position = visitedInOrder[posIdx];
                    document.getElementById(`cell-${position.x}-${position.y}`).className = "cell cell-visited";
                    posIdx++;
                }
            }, UPDATERATE * posIdx)
        });
    }

    private visualisePath(shortestPath: Array<Position>): Promise<void> {
        return new Promise(resolve => {
            let posIdx: number = 0;
            setInterval(() => {
                if (posIdx === shortestPath.length) {
                    resolve();
                } else {
                    let position: Position = shortestPath[posIdx];
                    document.getElementById(`cell-${position.x}-${position.y}`).className = "cell cell-shortestPath";
                    posIdx++;
                }
            }, UPDATERATE * posIdx)
        });
    }

    public render(): any {
        let grid = this.state.grid;
        return (
            <div>
            <Navbar performAlgorithm = {(algorithm: PathfindingAlgorithm) => this.performAlgorithm(algorithm)}/>
            <div className = "grid">
                {grid.map((row: Array<Node>, rowIdx) => {
                    return (<div className="grid-row" key = {rowIdx}>
                        {row.map((cell: Node, colIdx) => {
                            return (<Cell
                                position = {{x: colIdx, y: rowIdx}}
                                isStart={this.state.startPos.x === colIdx && this.state.startPos.y === rowIdx}
                                isFinish={this.state.finishPos.x === colIdx && this.state.finishPos.y === rowIdx}
                                nodeType = {cell.nodeType}
                                updateMouseState = {(position: Position, eventType: string) => this.updateMouseState(position, eventType)}
                                // ref = {this.references[rowIdx][colIdx]}
                                key = {colIdx}/>)
                        })}
                    </div>)
                })}
            </div>
            </div>
        )
    }
}