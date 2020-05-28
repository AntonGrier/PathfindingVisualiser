"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathfindingAlgorithm_1 = require("./PathfindingAlgorithm");
const Queue_1 = require("./DataStructures/Queue");
class BFS extends PathfindingAlgorithm_1.default {
    constructor() {
        super(...arguments);
        this.queue = new Queue_1.default();
    }
    calculatePath(grid, startPos, finishPos) {
        this.setMap(grid);
        this.queue.push(startPos);
        while (!this.queue.isEmpty()) {
            let curPosition = this.queue.pop();
            this.markAsVisited(curPosition);
            if (this.equalPosition(curPosition, finishPos)) {
                this.findShortestPath(finishPos);
                return;
            }
            let neighbors = this.getNeighbors(grid, curPosition);
            for (let neighbor of neighbors) {
                this.queue.push(neighbor);
                this.pathValues.set(this.hash(neighbor), { isVisited: true, previousNode: curPosition });
            }
        }
    }
    setMap(grid) {
        grid.forEach((row) => {
            row.forEach((node) => {
                let nodePosition = node.position;
                let pathData = {
                    isVisited: false,
                    previousNode: null,
                };
                this.pathValues.set(this.hash(nodePosition), pathData);
            });
        });
    }
    findShortestPath(finishPos) {
        for (let curPosition = finishPos; curPosition != null; curPosition = this.pathValues.get(this.hash(curPosition)).previousNode) {
            this.finalPath.unshift(curPosition);
        }
    }
    recalculatePath(grid, startPos, finishPos) {
        this.clear();
        this.queue = new Queue_1.default();
        this.calculatePath(grid, startPos, finishPos);
    }
}
exports.default = BFS;
//# sourceMappingURL=BFS.js.map