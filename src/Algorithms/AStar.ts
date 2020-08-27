import PathfindingAlgorithm, { PathData } from "./PathfindingAlgorithm";
import { Node, Position } from '../IPathfinder';
import { PriorityQueue } from './DataStructures/PriorityQueue';

export default class AStar extends PathfindingAlgorithm {
    minHeap: PriorityQueue<Position> = new PriorityQueue<Position>();

    public calculatePath(grid: Node[][], startPos: Position, finishPos: Position): void {
        this.reset();
        this.setMap(grid);
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
        for (let neighbor of neighbors) {
            let distanceFromStart: number = this.getDistance(grid, neighbor, start);
            let distanceFromFinish: number = this.getDistance(grid, neighbor, finish);
            let totalCost: number = distanceFromStart + distanceFromFinish;

            let prevPathData: PathData = this.pathValues.get(this.hash(neighbor));
            let prevCost: number = this.minHeap.get(neighbor);
            if (prevPathData.previousNode !== null && prevCost !== null) {
                console.log(prevCost);
                // if (!prevCost) {
                //     throw new Error('prevCost should be defined');
                // }
                if (totalCost < prevCost) {
                    this.pathValues.set(this.hash(neighbor), {isVisited: false, previousNode: current})
                }
            } else {
                this.pathValues.set(this.hash(neighbor), {isVisited: false, previousNode: current})
            }
            this.minHeap.insert(neighbor, totalCost);
        }
    }

    protected setMap(grid: Node[][]): void {
        grid.forEach((row: Node[]) => {
            return row.forEach((node: Node) => {
                let nodePosition: Position = node.position;
                let pathData: PathData = { isVisited: false, previousNode: null };
                this.pathValues.set(this.hash(nodePosition), pathData);
            });
        });
    }
    protected reset(): void {
        this.clear();
        this.minHeap = new PriorityQueue<Position>();
    }
    
} 