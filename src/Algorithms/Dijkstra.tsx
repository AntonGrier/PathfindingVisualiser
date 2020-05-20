import PathfindingAlgorithm, {PathData} from "./PathfindingAlgorithm";
import {Node, Position} from "../Pathfinder";
import {PriorityQueue} from "./DataStructures/PriorityQueue";

export default class Dijkstra extends PathfindingAlgorithm {
    minHeap: PriorityQueue<Position> = new PriorityQueue<Position>();
    calculatePath(grid: Array<Array<Node>>, startPos: Position, finishPos: Position): void {
        this.setMap(grid, startPos);
        this.minHeap.insert(startPos, 0);
        while (this.minHeap.size() !== 0) {
            let closestPosition: Position = this.minHeap.pop();
            console.log(closestPosition);
            this.markAsVisited(closestPosition);
            if (this.equalPosition(closestPosition, finishPos)) {
                console.log("FINISH REACHED");
                this.findShortestPath(finishPos);
                return;
            }
            let neighbors: Array<Position> = this.getNeighbors(grid, closestPosition);
            let closestDistance: number = this.pathValues.get(this.hash(closestPosition)).shortestPath;
            for (let neighbor of neighbors) {
                let newDistance: number = closestDistance + this.getDistance(closestPosition, neighbor);
                let neighborPathData: PathData = this.pathValues.get(this.hash(neighbor));
                this.minHeap.insert(neighbor, newDistance);
                if (newDistance < neighborPathData.shortestPath) {
                    let pathData: PathData = {
                        shortestPath: newDistance,
                        isVisited: true,
                        previousNode: closestPosition
                    };
                    this.pathValues.set(this.hash(neighbor), pathData);
                }
            }
        }
    }

    private getDistance(pos1: Position, pos2: Position): number {
        return Math.sqrt(Math.pow(Math.abs(pos1.x - pos2.x),2) + Math.pow(Math.abs(pos1.y - pos2.y),2))
    }

    protected setMap(grid: Array<Array<Node>>, startPos: Position): void {
        grid.forEach((row) => {
            return row.forEach((node) => {
                let nodePosition: Position = node.position;
                let shortestPath: number;
                if (this.equalPosition(startPos, nodePosition)) {
                    shortestPath = 0;
                } else {
                    shortestPath = Infinity;
                }
                let pathData: PathData = {shortestPath: shortestPath, isVisited: false, previousNode: null};
                this.pathValues.set(this.hash(nodePosition), pathData);
            });
        });
    }

    findShortestPath(finishPos: Position): void {
        for (let curPosition = finishPos;
             curPosition != null;
             curPosition = this.pathValues.get(this.hash(curPosition)).previousNode
        ) {
            this.finalPath.unshift(curPosition);
        }
    }
}