"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathfindingAlgorithm_1 = require("./PathfindingAlgorithm");
const Stack_1 = require("./DataStructures/Stack");
class DFS extends PathfindingAlgorithm_1.default {
    constructor() {
        super(...arguments);
        this.stack = new Stack_1.default();
    }
    calculatePath(grid, startPos, finishPos) {
        this.setMap(grid);
        this.stack.push(startPos);
        while (!this.stack.isEmpty()) {
            let curPosition = this.stack.pop();
            this.markAsVisited(curPosition);
            if (this.equalPosition(curPosition, finishPos)) {
                this.finalPath = this.visitedNodesInOrder;
                return;
            }
            let neighbors = this.getNeighbors(grid, curPosition).reverse();
            for (let neighbor of neighbors) {
                this.stack.push(neighbor);
            }
        }
    }
    setMap(grid) {
        grid.forEach((row) => {
            row.forEach((node) => {
                let nodePosition = node.position;
                this.pathValues.set(this.hash(nodePosition), { isVisited: false });
            });
        });
    }
    recalculatePath(grid, startPos, finishPos) {
        this.clear();
        this.stack = new Stack_1.default();
        this.calculatePath(grid, startPos, finishPos);
    }
}
exports.default = DFS;
//# sourceMappingURL=DFS.js.map