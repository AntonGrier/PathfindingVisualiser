import PathfindingAlgorithm from "./PathfindingAlgorithm";
import Stack from "./DataStructures/Stack";
import {Position, Node} from "../Pathfinder";

export default class DFS extends PathfindingAlgorithm {
    stack: Stack<Position> = new Stack<Position>();
    calculatePath(grid: Array<Array<Node>>, startPos: Position, finishPos: Position): void {
        this.setMap(grid);
        this.stack.push(startPos);
        while (!this.stack.isEmpty()) {
            let curPosition: Position = this.stack.pop();
            this.markAsVisited(curPosition);
            if (this.equalPosition(curPosition, finishPos)) {
                this.finalPath = this.visitedNodesInOrder;
                return;
            }
            let neighbors: Array<Position> = this.getNeighbors(grid, curPosition).reverse();
            for (let neighbor of neighbors) {
                this.stack.push(neighbor);
            }
        }
    }

    protected setMap(grid: Array<Array<Node>>): void {
        grid.forEach((row) => {
            row.forEach((node) => {
                let nodePosition: Position = node.position;
                this.pathValues.set(this.hash(nodePosition), {isVisited: false});
            });
        });
    }
}