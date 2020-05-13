import {Component} from "react";
import * as React from "react";
import Pathfinder, {FINISHPOS, STARTPOS} from "./Pathfinder";

export default class Cell extends Component<{x: number, y: number}, {isStart: boolean, isFinish: boolean}>{
    constructor(props: any) {
        super(props);
        this.state = {
            isStart: false,
            isFinish: false,
        };
    }

    handleClick(event: React.MouseEvent<HTMLElement>) {

    }

    handleMouseLeave(event: React.MouseEvent<HTMLElement>) {

    }


    render(): any {
        let {x, y} = this.props;
        let isStart: boolean = x == STARTPOS.x && y == STARTPOS.y;
        let isFinish: boolean = x == FINISHPOS.x && y == FINISHPOS.y;
        this.state = {isStart, isFinish};
        let extraClassName: string = isStart ? "cell-start" : isFinish ? "cell-finish" : "";
        return (
            <div className={`cell ${extraClassName}`} onClick={this.handleClick} onMouseLeave={this.handleMouseLeave}/>
        )
    }
}