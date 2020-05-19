import PathfindingAlgorithm, {PathData} from "./PathfindingAlgorithm";
import {PriorityQueue} from "./DataStructures/PriorityQueue";
import {Position, Node} from "../Pathfinder";

export default class AStart extends PathfindingAlgorithm {
    minHeap: PriorityQueue<Position> = new PriorityQueue<Position>();
    calculatePath(grid: Array<Array<Node>>, startPos: Position, finishPos: Position): void {
        this.minHeap.insert(startPos, this.getDistanceFromFinish(startPos, finishPos));
        while (this.minHeap.size() !== 0) {
            let curPosition: Position = this.minHeap.pop();
            this.markAsVisited(curPosition);
            if (this.equalPosition(curPosition, finishPos)) {

            }
            let neighbors = this.getNeighbors(grid, curPosition);
        }
    }

    protected setMap(grid: Array<Array<Node>>, startPos?: Position): void {
        grid.forEach((row) => {
            row.forEach((node) => {
                let pathData: PathData = {isVisited: false, previousNode: null}
            });
        });
    }

    private getDistanceFromFinish(position: Position, finishPos: Position): number {
        return Math.abs(position.x - finishPos.x) + Math.abs(position.y - finishPos.y);
    }
}