import PathfindingAlgorithm, { PathData } from './PathfindingAlgorithm';
import { Node, Position } from '../IPathfinder';
import { PriorityQueue } from './DataStructures/PriorityQueue';

export default class AStar extends PathfindingAlgorithm {
    minHeap: PriorityQueue<Position> = new PriorityQueue<Position>();

    public calculatePath(grid: Node[][], startPos: Position, finishPos: Position): void {
        this.reset();
        this.setMap(grid, startPos);
        this.minHeap.insert(startPos, 0);
        while (this.minHeap.size() > 0) {
            let closestPosition: Position = this.minHeap.pop();
            if (this.pathValues.get(this.hash(closestPosition)).isVisited) {
                continue;
            }
            this.markAsVisited(closestPosition);
            if (this.equalPosition(closestPosition, finishPos)) {
                this.findShortestPath(finishPos);
                return;
            }
            this.setNeighbors(grid, closestPosition, startPos, finishPos);
        }
    }

    private setNeighbors(grid: Node[][], current: Position, start: Position, finish: Position): void {
        let neighbors = this.getNeighbors(grid, current);
        let costSoFar: number = this.pathValues.get(this.hash(current)).shortestPath;
        for (let neighbor of neighbors) {
            // let pathData: PathData = this.pathValues.get(this.hash(neighbor));
            let distanceFromStart: number = costSoFar + this.getDistance(grid, neighbor, current);
            let distanceFromFinish: number = this.getDistance(grid, neighbor, finish);
            let totalCost: number = distanceFromStart + distanceFromFinish;
            let prevPathData: PathData = this.pathValues.get(this.hash(neighbor));
            if (prevPathData.previousNode !== null) {
                let prevCost: number = prevPathData.shortestPath + distanceFromFinish;
                if (totalCost < prevCost) {
                    this.minHeap.insert(neighbor, totalCost, true);
                    this.pathValues.set(this.hash(neighbor), {
                        isVisited: false,
                        previousNode: current,
                        shortestPath: distanceFromStart,
                    });
                }
            } else {
                this.minHeap.insert(neighbor, totalCost, false);
                this.pathValues.set(this.hash(neighbor), {
                    isVisited: false,
                    previousNode: current,
                    shortestPath: distanceFromStart,
                });
            }
        }
    }

    protected setMap(grid: Node[][], startPos: Position): void {
        grid.forEach((row: Node[]) => {
            return row.forEach((node: Node) => {
                let nodePosition: Position = node.position;
                let shortestPath: number;
                if (this.equalPosition(startPos, nodePosition)) {
                    shortestPath = 0;
                } else {
                    shortestPath = Infinity;
                }
                let pathData: PathData = { isVisited: false, shortestPath: shortestPath, previousNode: null };
                this.pathValues.set(this.hash(nodePosition), pathData);
            });
        });
    }
    protected reset(): void {
        this.clear();
        this.minHeap = new PriorityQueue<Position>();
    }
}
