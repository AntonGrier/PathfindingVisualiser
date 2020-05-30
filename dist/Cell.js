"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const IPathfinder_1 = require("./IPathfinder");
class Cell extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleMouseEvent(event) {
        let eventType = event.type;
        let position = this.props.position;
        this.props.updateMouseState(position, eventType);
    }
    /**
     *
     * @param weight is a scale of difficulty of node traversal [0,1]
     * @returns greyscale rgb value corresponding to the weight e.g.:
     *          weight 0 produces 'rgb(255,255,255)'
     *          weight 1 produces 'rgb(55,55,55)'
     */
    convertWeightToGreyscale(weight) {
        weight = 1 - weight;
        const min = 55;
        const max = 255;
        const rbgVal = min + (max - min) * weight;
        return `rgb(${rbgVal},${rbgVal},${rbgVal})`;
    }
    render() {
        let { isStart, isFinish, nodeType, weight } = this.props;
        let className;
        if (isStart || isFinish) {
            className = isStart ? 'cell-start' : isFinish ? 'cell-finish' : '';
        }
        else {
            switch (nodeType) {
                case IPathfinder_1.NodeType.Unvisited:
                    className = 'cell-unvisited';
                    break;
                case IPathfinder_1.NodeType.Visited:
                    className = 'cell-visited';
                    break;
                case IPathfinder_1.NodeType.Wall:
                    className = 'cell-wall';
                    break;
                case IPathfinder_1.NodeType.ShortestPath:
                    className = 'cell-shortestPath';
                    break;
            }
        }
        // TODO: Proper integration with visual perlin noise, w/o colour degradation with the regular pathfinding module
        let backgroundColor = {};
        if (nodeType !== IPathfinder_1.NodeType.ShortestPath && !isStart && !isFinish && weight > 0) {
            backgroundColor = { backgroundColor: this.convertWeightToGreyscale(weight) };
        }
        return (React.createElement("div", { ref: this.props.nodeRef, id: `cell-${this.props.position.x}-${this.props.position.y}`, className: `cell ${className}`, style: Object.assign({}, backgroundColor), onMouseDown: (event) => this.handleMouseEvent(event), onMouseUp: (event) => this.handleMouseEvent(event), onMouseEnter: (event) => this.handleMouseEvent(event) }));
    }
}
exports.default = Cell;
//# sourceMappingURL=Cell.js.map