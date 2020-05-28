"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathfindingAlgorithm_1 = require("./PathfindingAlgorithm");
const PriorityQueue_1 = require("./DataStructures/PriorityQueue");
class Dijkstra extends PathfindingAlgorithm_1.default {
    constructor() {
        super(...arguments);
        this.minHeap = new PriorityQueue_1.PriorityQueue();
    }
    calculatePath(grid, startPos, finishPos) {
        this.setMap(grid, startPos);
        this.minHeap.insert(startPos, 0);
        while (this.minHeap.size() !== 0) {
            let closestPosition = this.minHeap.pop();
            this.markAsVisited(closestPosition);
            if (this.equalPosition(closestPosition, finishPos)) {
                this.findShortestPath(finishPos);
                return;
            }
            let neighbors = this.getNeighbors(grid, closestPosition);
            let closestDistance = this.pathValues.get(this.hash(closestPosition)).shortestPath;
            for (let neighbor of neighbors) {
                let newDistance = closestDistance +
                    this.getDistance(closestPosition, neighbor) * Math.pow(1000, grid[neighbor.y][neighbor.x].weight);
                let neighborPathData = this.pathValues.get(this.hash(neighbor));
                this.minHeap.insert(neighbor, newDistance);
                if (newDistance < neighborPathData.shortestPath) {
                    let pathData = {
                        shortestPath: newDistance,
                        isVisited: true,
                        previousNode: closestPosition,
                    };
                    this.pathValues.set(this.hash(neighbor), pathData);
                }
            }
        }
    }
    recalculatePath(grid, startPos, finishPos) {
        this.clear();
        this.minHeap = new PriorityQueue_1.PriorityQueue();
        this.calculatePath(grid, startPos, finishPos);
    }
    getDistance(pos1, pos2) {
        return Math.sqrt(Math.pow(Math.abs(pos1.x - pos2.x), 2) + Math.pow(Math.abs(pos1.y - pos2.y), 2));
    }
    setMap(grid, startPos) {
        grid.forEach((row) => {
            return row.forEach((node) => {
                let nodePosition = node.position;
                let shortestPath;
                if (this.equalPosition(startPos, nodePosition)) {
                    shortestPath = 0;
                }
                else {
                    shortestPath = Infinity;
                }
                let pathData = { shortestPath: shortestPath, isVisited: false, previousNode: null };
                this.pathValues.set(this.hash(nodePosition), pathData);
            });
        });
    }
    findShortestPath(finishPos) {
        for (let curPosition = finishPos; curPosition != null; curPosition = this.pathValues.get(this.hash(curPosition)).previousNode) {
            this.finalPath.unshift(curPosition);
        }
    }
}
exports.default = Dijkstra;
//# sourceMappingURL=Dijkstra.js.map