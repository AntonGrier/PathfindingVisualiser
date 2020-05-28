"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IPathfinder_1 = require("../IPathfinder");
class PathfindingAlgorithm {
    constructor() {
        this.pathValues = new Map();
        this.finalPath = [];
        this.visitedNodesInOrder = [];
    }
    produceVisitedInOrder() {
        return this.visitedNodesInOrder.slice(1, this.visitedNodesInOrder.length - 1);
    }
    produceFinalPath() {
        return this.finalPath.slice(1, this.visitedNodesInOrder.length - 1);
    }
    getNeighbors(grid, position) {
        let neighbors = [];
        neighbors.push({ x: position.x + 1, y: position.y });
        neighbors.push({ x: position.x, y: position.y + 1 });
        neighbors.push({ x: position.x, y: position.y - 1 });
        neighbors.push({ x: position.x - 1, y: position.y });
        neighbors.push({ x: position.x - 1, y: position.y + 1 });
        neighbors.push({ x: position.x + 1, y: position.y + 1 });
        neighbors.push({ x: position.x + 1, y: position.y - 1 });
        neighbors.push({ x: position.x - 1, y: position.y - 1 });
        return neighbors.filter((neighbor) => {
            return (neighbor.x >= 0 &&
                neighbor.x < IPathfinder_1.GRID_W &&
                neighbor.y >= 0 &&
                neighbor.y < IPathfinder_1.GRID_H &&
                grid[neighbor.y][neighbor.x].nodeType !== IPathfinder_1.NodeType.Wall &&
                !this.isVisited(neighbor) &&
                this.cornerCheck(position, neighbor, grid));
        });
    }
    cornerCheck(position, neighbor, grid) {
        return (grid[position.y][neighbor.x].nodeType !== IPathfinder_1.NodeType.Wall ||
            grid[neighbor.y][position.x].nodeType !== IPathfinder_1.NodeType.Wall);
    }
    isVisited(position) {
        return this.pathValues.get(this.hash(position)).isVisited;
    }
    markAsVisited(position) {
        this.visitedNodesInOrder.push(position);
        let pathData = this.pathValues.get(this.hash(position));
        let newPathData = Object.assign(Object.assign({}, pathData), { isVisited: true });
        this.pathValues.set(this.hash(position), newPathData);
    }
    equalPosition(pos1, pos2) {
        return pos1.x === pos2.x && pos1.y === pos2.y;
    }
    hash(position) {
        return position.x.toString() + '-' + position.y.toString();
    }
    clear() {
        this.visitedNodesInOrder = [];
        this.finalPath = [];
        this.pathValues = new Map();
    }
}
exports.default = PathfindingAlgorithm;
//# sourceMappingURL=PathfindingAlgorithm.js.map