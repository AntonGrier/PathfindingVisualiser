import PathfindingAlgorithm, { PathData } from './PathfindingAlgorithm';
import { Node, Position } from '../IPathfinder';
import { PriorityQueue } from './DataStructures/PriorityQueue';

export default class Dijkstra extends PathfindingAlgorithm {
    minHeap: PriorityQueue<Position> = new PriorityQueue<Position>();
    calculatePath(grid: Array<Array<Node>>, startPos: Position, finishPos: Position): void {
        this.reset();
        this.setMap(grid, startPos);
        this.minHeap.insert(startPos, 0);
        while (this.minHeap.size() !== 0) {
            let closestPosition: Position = this.minHeap.pop();
            this.markAsVisited(closestPosition);
            if (this.equalPosition(closestPosition, finishPos)) {
                this.findShortestPath(finishPos);
                return;
            }
            let neighbors: Array<Position> = this.getNeighbors(grid, closestPosition);
            let closestDistance: number = this.pathValues.get(this.hash(closestPosition)).shortestPath;
            for (let neighbor of neighbors) {
                let newDistance: number = closestDistance + this.getDistance(grid, closestPosition, neighbor);
                let neighborPathData: PathData = this.pathValues.get(this.hash(neighbor));
                this.minHeap.insert(neighbor, newDistance);
                if (newDistance < neighborPathData.shortestPath) {
                    let pathData: PathData = {
                        shortestPath: newDistance,
                        isVisited: true,
                        previousNode: closestPosition,
                    };
                    this.pathValues.set(this.hash(neighbor), pathData);
                }
            }
        }
    }

    private getDistance(grid: Node[][], current: Position, neighbor: Position): number {
        let weightDifference = grid[neighbor.y][neighbor.x].weight - grid[current.y][current.x].weight;
        return (
            Math.pow(10000, weightDifference) *
            Math.sqrt(Math.pow(Math.abs(current.x - neighbor.x), 2) + Math.pow(Math.abs(current.y - neighbor.y), 2))
        );
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
                let pathData: PathData = { shortestPath: shortestPath, isVisited: false, previousNode: null };
                this.pathValues.set(this.hash(nodePosition), pathData);
            });
        });
    }

    findShortestPath(finishPos: Position): void {
        for (
            let curPosition = finishPos;
            curPosition != null;
            curPosition = this.pathValues.get(this.hash(curPosition)).previousNode
        ) {
            this.finalPath.unshift(curPosition);
        }
    }

    protected reset(): void {
        this.clear();
        this.minHeap = new PriorityQueue<Position>();
    }
}
