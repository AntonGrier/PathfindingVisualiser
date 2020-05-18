import {Node, NodeType, Position} from "../Pathfinder";

export interface PathData {
    isVisited: boolean,
    shortestPath?: number,
    previousNode?: Position,
}

export default abstract class PathfindingAlgorithm {
    pathValues: Map<string, PathData> = new Map<string, PathData>();
    finalPath: Array<Position> = [];
    visitedNodesInOrder: Array<Position> = [];

    protected abstract setMap(grid: Array<Array<Node>>, startPos?: Position): void;

    public abstract calculatePath(grid: Array<Array<Node>>, startPos: Position, finishPos: Position): void;

    public produceVisitedInOrder(): Array<Position> {
        return this.visitedNodesInOrder;
    }

    public produceFinalPath() : Array<Position> {
        return this.finalPath;
    }

    protected getNeighbors(grid: Array<Array<Node>>, position: Position): Array<Position> {
        let neighbors: Array<Position> = [];

        if (position.x > 0) {
            neighbors.push({x: position.x - 1, y: position.y});
        }
        if (position.y < grid.length - 1) {
            neighbors.push({x: position.x, y: position.y + 1});
        }
        if (position.x < grid[0].length - 1) {
            neighbors.push({x: position.x + 1, y: position.y});
        }
        if (position.y > 0) {
            neighbors.push({x: position.x, y: position.y - 1});
        }
        return neighbors.filter((pos) => {
            return (
                grid[pos.y][pos.x].nodeType !== NodeType.Wall
                && !this.isVisited(pos)
            );
        });
    }

    protected isVisited(position: Position): boolean {
        return this.pathValues.get(this.hash(position)).isVisited;
    }

    protected markAsVisited(position: Position): void {
        this.visitedNodesInOrder.push(position);
        let pathData: PathData = this.pathValues.get(this.hash(position));
        let newPathData: PathData =
            {
                ...pathData,
                isVisited: true,
            };
        this.pathValues.set(this.hash(position), newPathData);
    }

    protected equalPosition(pos1: Position, pos2: Position) {
        return pos1.x === pos2.x && pos1.y === pos2.y;
    }

    protected hash(position: Position): string {
        return position.x.toString() + "-" + position.y.toString();
    }
}