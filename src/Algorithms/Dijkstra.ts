import PathfindingAlgorithm from "./PathfindingAlgorithm";
import {Node, NodeType, Position} from "../Pathfinder";
import {PriorityQueue} from "./PriorityQueue";

interface PathObject {
    shortestPath: number,
    previousNode: Position,
}

export default class Dijkstra extends PathfindingAlgorithm {
    pathValues: Array<Array<PathObject>>;
    minHeap: PriorityQueue<Position>;
    constructor() {
        super();
        this.pathValues = [];
        this.minHeap= new PriorityQueue();
    }

    calculatePath(grid: Array<Array<Node>>, startPos: Position, finishPos: Position): void {
        this.pathValues = grid.map((row) => {
            return row.map((node) => {
                let nodePosition: Position = node.position;
                let shortestPath: number;
                if (startPos.x === nodePosition.x && startPos.y === nodePosition.y) {
                    shortestPath = 0;
                } else {
                    shortestPath = Infinity;
                }
                return {shortestPath: shortestPath, previousNode: null}
            });
        });
        this.minHeap.insert(startPos, 0);

        // for (let row = 0; row < grid.length; row++) {
        //     for (let col = 0; col < grid[0].length; col++) {
        //         let position: Position = {x: col, y: row};
        //         let pathObject: PathObject;
        //         let shortestPath: number;
        //         if (position.x === startPos.x && position.y === startPos.y) {
        //             shortestPath = 0;
        //         } else {
        //             shortestPath = Infinity;
        //         }
        //         pathObject = {shortestPath: shortestPath, previousNode: null};
        //         this.map.set(position, pathObject);
        //     }
        // }

        while (this.minHeap.size() !== 0) {
            let closestPosition: Position = this.minHeap.pop();
            let closestDistance: number = this.pathValues[closestPosition.y][closestPosition.x].shortestPath;
            console.log(`POS: ${closestPosition.x} ${closestPosition.y}`);
            if (closestDistance === Infinity) {
                console.log("INFINITY REACHED");
                return;
            }
            if (closestPosition.x === finishPos.x && closestPosition.y === finishPos.y) {
                console.log("FINISH REACHED");
                this.getShortestPath(startPos, finishPos);
                return;
            }
            if (closestDistance !== 0) {
                this.visitedNodesInOrder.push(closestPosition);
            }
            let neighbors: Array<Position> = this.getNeighbors(grid, closestPosition);
            for (let neighborPosition of neighbors) {
                let newDistance: number = this.pathValues[closestPosition.y][closestPosition.x].shortestPath + 1;
                let neighborPathValues: PathObject = this.pathValues[neighborPosition.y][neighborPosition.x];
                this.minHeap.insert(neighborPosition, newDistance);
                if (newDistance < neighborPathValues.shortestPath) {
                    this.pathValues[neighborPosition.y][neighborPosition.x] = {shortestPath: newDistance, previousNode: closestPosition};
                }
            }
        }
    }

    getShortestPath(startPos: Position, finishPos: Position): void {
        for (let curPosition = finishPos;
             curPosition != null;
             curPosition = this.pathValues[curPosition.y][curPosition.x].previousNode
        ) {
            this.shortestPathInOrder.unshift(curPosition);
        }
    }

    getNeighbors(grid: Array<Array<Node>>, position: Position): Array<Position> {
        let neighbors: Array<Position> = [];
        if (position.x < grid[0].length - 1) {
            neighbors.push({x: position.x + 1, y: position.y});
        }
        if (position.y > 0) {
            neighbors.push({x: position.x, y: position.y - 1});
        }
        if (position.x > 0) {
            neighbors.push({x: position.x - 1, y: position.y});
        }
        if (position.y < grid.length - 1) {
            neighbors.push({x: position.x, y: position.y + 1});
        }
        return neighbors.filter((pos) => {
            return this.pathValues[pos.y][pos.x].shortestPath === Infinity && grid[pos.y][pos.x].nodeType === NodeType.Unvisited;
        });
    }
}