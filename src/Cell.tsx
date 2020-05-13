import * as React from "react";
import {Component} from "react";
import {FINISHPOS, MouseState, NodeType, STARTPOS} from "./Pathfinder";
import {render} from "react-dom";

export default class Cell extends Component<
    {
        x: number,
        y: number,
        nodeType: NodeType,
        updateMouseState: (x: number, y: number, eventType: string) => void
    },
    {}>{
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    handleMouseEvent(event: React.MouseEvent<HTMLElement>): void {
        let eventType: string =  event.type;
        this.props.updateMouseState(this.props.x, this.props.y, eventType);
    }

    render(): any {
        let nodeType = this.props.nodeType;
        let extraClassName: string;
        switch (nodeType) {
            case NodeType.Empty:    extraClassName = ""; break;
            case NodeType.Start:    extraClassName = "cell-start"; break;
            case NodeType.Finish:   extraClassName = "cell-finish"; break;
            case NodeType.Wall:     extraClassName = "cell-wall"; break;
        }
        return (
            <div className={`cell ${extraClassName}`}
                 onMouseDown    =   {(event) => this.handleMouseEvent(event)}
                 onMouseUp      =   {(event) => this.handleMouseEvent(event)}
                 onMouseLeave   =   {(event) => this.handleMouseEvent(event)}
                 onMouseEnter   =   {(event) => this.handleMouseEvent(event)}
            />
        )
    }
}