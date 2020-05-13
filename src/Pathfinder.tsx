import {Component} from "react";
import * as React from "react";
import Cell from "./Cell";

const GRIDW = 40;
const GRIDH = 21;

export const STARTPOS = {x: Math.floor(GRIDW/4), y: Math.floor(GRIDH/2)};
export const FINISHPOS = {x: GRIDW - STARTPOS.x, y: STARTPOS.y};

export enum MouseState {
    PlacingWall,
    MovingStart,
    MovingFinish,
}

export enum NodeType {
    Empty,
    Wall,
    Start,
    Finish,
}

export interface Node {
    x: number;
    y: number;
    nodeType: NodeType;
}

export default class Pathfinder extends Component<{}, {grid: Array<Array<Node>>, mouseState: MouseState, isMouseDown: boolean}> {
    constructor(props: any) {
        super(props);
        this.state = {
            grid: [],
            mouseState: null,
            isMouseDown: false,
        };
    }

    componentDidMount(): void {
        let grid: Array<Array<Node>> = [];
        for (let row = 0; row < GRIDH; row++) {
            let curRow: Array<Node> = [];
            for (let col = 0; col < GRIDW; col++) {
                let newNode: Node = {x: col, y: row, nodeType: NodeType.Empty};
                curRow.push(newNode);
            }
            grid.push(curRow);
        }
        let startNode: Node = {x: STARTPOS.x, y: STARTPOS.y, nodeType: NodeType.Start};
        let finishNode: Node = {x: FINISHPOS.x, y: FINISHPOS.y, nodeType: NodeType.Finish};
        grid[STARTPOS.y][STARTPOS.x]   = startNode;
        grid[FINISHPOS.y][FINISHPOS.x] = finishNode;
        this.setState({grid: grid, mouseState: MouseState.PlacingWall, isMouseDown: false});
    }

    updateMouseState(x: number, y: number, eventType: string): void {
        let {grid, mouseState, isMouseDown} = this.state;
        let nodeType: NodeType = grid[y][x].nodeType;
        let nextNodeType: NodeType;
        switch (eventType) {
            case "mousedown": {
                if ((mouseState == MouseState.MovingStart && nodeType == NodeType.Finish) || (mouseState == MouseState.MovingFinish && nodeType == NodeType.Start)) {
                    return;
                }
                mouseState = nodeType == NodeType.Start ? MouseState.MovingStart : nodeType == NodeType.Finish ? MouseState.MovingFinish : MouseState.PlacingWall;

                switch (nodeType) {
                    case NodeType.Empty:
                        nextNodeType = NodeType.Wall;
                        break;
                    case NodeType.Wall:
                        nextNodeType = NodeType.Empty;
                        break;
                    case NodeType.Start:
                    case NodeType.Finish:
                        nextNodeType = nodeType;
                }
                isMouseDown = true;
                grid[y][x].nodeType = nextNodeType;
                break;
            }
            case "mouseup": {
                if ((mouseState == MouseState.MovingStart && nodeType == NodeType.Finish) || (mouseState == MouseState.MovingFinish && nodeType == NodeType.Start)) {
                    return;
                } else {
                    mouseState = MouseState.PlacingWall;
                    isMouseDown = false;
                }
                break;
            }
            case "mouseenter": {
                if (!isMouseDown) return;
                if (nodeType == NodeType.Start || nodeType == NodeType.Finish) {
                    return;
                } else {
                    switch (mouseState) {
                        case MouseState.MovingStart:
                            nextNodeType = NodeType.Start;
                            break;
                        case MouseState.MovingFinish:
                            nextNodeType = NodeType.Finish;
                            break;
                        case MouseState.PlacingWall:
                            nextNodeType = nodeType == NodeType.Empty ? NodeType.Wall : NodeType.Empty;
                            break;
                    }
                }
                grid[y][x].nodeType = nextNodeType;
                break;
            }
            case "mouseleave": {
                if (!isMouseDown) return;
                if (mouseState == MouseState.MovingStart  && nodeType == NodeType.Finish) return;
                if (mouseState == MouseState.MovingFinish && nodeType == NodeType.Start) return;
                switch (mouseState) {
                    case MouseState.MovingStart:
                    case MouseState.MovingFinish:
                        nextNodeType = NodeType.Empty;
                        break;
                    case MouseState.PlacingWall:
                        nextNodeType = nodeType;
                        break;
                }
                grid[y][x].nodeType = nextNodeType;
                break;
            }
        }
        this.setState({grid: grid, mouseState: mouseState, isMouseDown: isMouseDown});
    }

    render(): any {
        let grid = this.state.grid;
        return (
        <div className = "grid">
            {grid.map((row: Array<Node>, rowIdx) => {
                return (<div className="grid-row" key = {rowIdx}>
                    {row.map((cell: Node, colIdx) => {
                        return (<Cell
                            x = {colIdx}
                            y = {rowIdx}
                            nodeType = {cell.nodeType}
                            updateMouseState = {(x: number, y: number, eventType: string) => this.updateMouseState(x, y, eventType)}
                            key = {colIdx}/>)
                    })}
                </div>)
            })}
        </div>)
    }
}