// import PathfindingAlgorithm from "./PathfindingAlgorithm";
// import {Node, Position} from "../Pathfinder";
//
// interface PathObject {
//     shortestPath: number,
//     previousNode: Position,
// }
//
// export default class Dijkstra extends PathfindingAlgorithm {
//     map: Map<Position, PathObject>;
//     minHeap: PriorityQueue<Position>;
//     constructor() {
//         super();
//         this.map = new Map<Position, PathObject>();
//         this.minHeap= new PriorityQueue(({comparator: (a: Position, b: Position) => {
//             return this.map.get(a).shortestPath - this.map.get(b).shortestPath;
//         }}));
//     }
//
//     calculatePath(grid: Array<Array<Node>>, startPos: Position, finishPos: Position): void {
//
//         for (let row = 0; row < grid.length; row++) {
//             for (let col = 0; col < grid[row].length; col++) {
//                 let position: Position = {x: col, y: row};
//                 let pathObject: PathObject;
//                 if (position === startPos) {
//                     pathObject = {shortestPath: 0, previousNode: null};
//                 } else {
//                     pathObject = {shortestPath: Infinity, previousNode: null};
//                 }
//                 this.map.set(position, pathObject);
//                 this.minHeap.queue(position);
//             }
//         }
//
//         while (this.minHeap.length !== 0) {
//             let closestPosition: Position = this.minHeap.dequeue();
//             let closestDistance: number = this.map.get(closestPosition).shortestPath;
//             if (closestDistance === Infinity) {
//                 return;
//             }
//             if (closestPosition === finishPos) {
//                 this.getShortestPath(startPos, finishPos);
//                 return;
//             }
//             if (closestDistance !== 0) {
//                 this.visitedNodesInOrder.push(closestPosition);
//             }
//             let neighbors: Array<Position> = this.getNeighbors(grid, closestPosition);
//             for (let neighbor of neighbors) {
//                 let newDistance: number = this.map.get(closestPosition).shortestPath + 1;
//                 if (newDistance < this.map.get(neighbor).shortestPath) {
//                     this.map.set(neighbor, {shortestPath: newDistance, previousNode: closestPosition});
//                 }
//             }
//         }
//     }
//
//     getShortestPath(startPos: Position, finishPos: Position): void {
//         for (let curPosition = finishPos; curPosition != null; curPosition = this.map.get(curPosition).previousNode) {
//             this.shortestPathInOrder.unshift(curPosition);
//         }
//     }
//
//     getNeighbors(grid: Array<Array<Node>>, position: Position): Array<Position> {
//         let neighbors: Array<Position> = [];
//         if (position.x < grid[0].length - 1) {
//             neighbors.push({x: position.x + 1, y: position.y});
//         }
//         if (position.y > 0) {
//             neighbors.push({x: position.x, y: position.y - 1});
//         }
//         if (position.x > 0) {
//             neighbors.push({x: position.x - 1, y: position.y});
//         }
//         if (position.y < grid.length - 1) {
//             neighbors.push({x: position.x, y: position.y + 1});
//         }
//         return neighbors;
//     }
// }