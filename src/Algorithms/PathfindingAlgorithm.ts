import {Node, Position} from "../Pathfinder";

export default abstract class PathfindingAlgorithm {
    shortestPathInOrder: Array<Position>;
    visitedNodesInOrder: Array<Position>;

    constructor() {
        this.shortestPathInOrder = [];
        this.visitedNodesInOrder = [];
    }

    public abstract calculatePath(grid: Array<Array<Node>>, startPos: Position, finishPos: Position): void;

    public produceVisitedInOrder(): Array<Position> {
        return this.visitedNodesInOrder;
    }

    public produceShortestPath() : Array<Position> {
        return this.shortestPathInOrder;
    }
}

// export interface Weighted {
//
// }
//
// export interface Unweighted {
//
// }
//
// export interface Unidirectional {
//
// }
//
// export interface Bidirectional {
//
// }