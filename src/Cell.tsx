import * as React from 'react';
import { Component, RefObject } from 'react';
import { NodeType, Position } from './IPathfinder';

interface Props {
    position: Position;
    isStart: boolean;
    isFinish: boolean;
    nodeType: NodeType;
    weight: number;
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

    /**
     *
     * @param weight is a scale of difficulty of node traversal [0,1]
     * @returns greyscale rgb value corresponding to the weight e.g.:
     *          weight 0 produces 'rgb(255,255,255)'
     *          weight 1 produces 'rgb(55,55,55)'
     */
    convertWeightToGreyscale(weight: number): string {
        weight = 1 - weight;
        const min = 55;
        const max = 255;
        const rbgVal = min + (max - min) * weight;
        return `rgb(${rbgVal},${rbgVal},${rbgVal})`;
    }

    render(): any {
        let { isStart, isFinish, nodeType, weight } = this.props;
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
        // TODO: Proper integration with visual perlin noise, w/o colour degradation with the regular pathfinding module
        // let backgroundColor = {};
        // if (nodeType === NodeType.Unvisited) {
        //     let colour: string;
        //     if (weight > 0) {
        //         colour = this.convertWeightToGreyscale(weight);
        //     } else {
        //         colour = 'white';
        //     }
        //     backgroundColor = { backgroundColor: colour };
        // }
        return (
            <div
                ref={this.props.nodeRef}
                id={`cell-${this.props.position.x}-${this.props.position.y}`}
                className={`cell ${className}`}
                style={{ ...backgroundColor }}
                onMouseDown={(event) => this.handleMouseEvent(event)}
                onMouseUp={(event) => this.handleMouseEvent(event)}
                onMouseEnter={(event) => this.handleMouseEvent(event)}
            />
        );
    }
}
