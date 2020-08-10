import * as React from 'react';
import { Component, RefObject } from 'react';
import { NodeType, Position } from './IPathfinder';

interface Props {
    position: Position;
    isStart: boolean;
    isFinish: boolean;
    isMidpoint: boolean;
    nodeType: NodeType;
    weight: number;
    updateMouseState: (position: Position, eventType: string) => void;
    setMidpoint: (position: Position) => void;
    nodeRef: (ref: RefObject<HTMLDivElement> | any) => void;
}

export default class Cell extends Component<Props> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    handleMouseEvent(event: React.MouseEvent<HTMLElement>): void {
        let position: Position = this.props.position;
        if (event.nativeEvent.which === 1) {
            let eventType: string = event.type;
            this.props.updateMouseState(position, eventType);
        } else if (event.nativeEvent.which === 3 && event.type === 'mousedown') {
            this.props.setMidpoint(position);
        }
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
        let { isStart, isFinish, isMidpoint, nodeType, weight } = this.props;
        let className: string;
        if (isStart || isFinish || isMidpoint) {
            className = isStart ? 'cell-start' : isFinish ? 'cell-finish' : isMidpoint ? 'cell-midpoint' : '';
        } else {
            switch (nodeType) {
                case NodeType.Unvisited:
                    className = 'cell-unvisited';
                    break;
                case NodeType.VisitedOne:
                    className = 'cell-visited-0';
                    break;
                case NodeType.VisitedTwo:
                    className = 'cell-visited-1';
                    break;
                case NodeType.VisitedOverlap:
                    className = 'cell-visited-overlap';
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
        let backgroundColor = {};
        if (nodeType !== NodeType.Wall && nodeType !== NodeType.ShortestPath && !isStart && !isFinish && weight > 0) {
            backgroundColor = { backgroundColor: this.convertWeightToGreyscale(weight) };
        }
        return (
            <div
                ref={this.props.nodeRef}
                id={`cell-${this.props.position.x}-${this.props.position.y}`}
                className={`cell ${className}`}
                style={{ ...backgroundColor }}
                onMouseDown={(event) => this.handleMouseEvent(event)}
                onMouseUp={(event) => this.handleMouseEvent(event)}
                onMouseEnter={(event) => this.handleMouseEvent(event)}
                onContextMenu={(event) => event.preventDefault()}
            />
        );
    }
}
