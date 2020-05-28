import * as React from 'react';
import { Component } from 'react';
import { NodeType, Position } from './Pathfinder';
import { RefObject } from 'react';

interface Props {
    position: Position;
    isStart: boolean;
    isFinish: boolean;
    nodeType: NodeType;
    updateMouseState: (position: Position, eventType: string) => void;
    nodeRef: (ref: RefObject<HTMLDivElement> | any) => void;
}

export default class Cell extends Component<Props> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    handleMouseEvent(event: React.MouseEvent<HTMLElement>): void {
        let eventType: string = event.type;
        let position: Position = this.props.position;
        this.props.updateMouseState(position, eventType);
    }

    render(): any {
        let { isStart, isFinish, nodeType } = this.props;
        let className: string;
        if (isStart || isFinish) {
            className = isStart ? 'cell-start' : isFinish ? 'cell-finish' : '';
        } else {
            switch (nodeType) {
                case NodeType.Unvisited:
                    className = 'cell-unvisited';
                    break;
                case NodeType.Visited:
                    className = 'cell-visited';
                    break;
                case NodeType.Wall:
                    className = 'cell-wall';
                    break;
                case NodeType.ShortestPath:
                    className = 'cell-shortestPath';
                    break;
            }
        }
        return (
            <div
                ref={this.props.nodeRef}
                id={`cell-${this.props.position.x}-${this.props.position.y}`}
                className={`cell ${className}`}
                onMouseDown={(event) => this.handleMouseEvent(event)}
                onMouseUp={(event) => this.handleMouseEvent(event)}
                onMouseEnter={(event) => this.handleMouseEvent(event)}
            />
        );
    }
}
