import {Component} from "react";
import * as React from "react";
import Cell from "./Cell";

const GRIDW = 30;
const GRIDH = 21;

export const STARTPOS = {x: 5, y: 10};
export const FINISHPOS = {x: 24, y: 10};

export default class Pathfinder extends Component<{}, {grid: Array<any>}> {
    constructor(props: any) {
        super(props);
        this.state = {
            grid: [],
        }
    }

    componentDidMount(): void {
        let grid = [];
        for (let row = 0; row < GRIDH; row++) {
            let curRow = [];
            for (let col = 0; col < GRIDW; col++) {
                curRow.push([]);
            }
            grid.push(curRow);
        }
        this.setState({grid});
    }

    render(): any {
        const {grid} = this.state;
        return (
        <div className = "grid">
            {grid.map((row: Array<any>, rowIdx) => {
                return (<div className="grid-row" key = {rowIdx}>
                    {row.map((cell: any, colIdx) => {
                        return (<Cell x = {colIdx} y = {rowIdx} key = {colIdx}/>)
                    })}
                </div>)
            })}
        </div>)
    }
}