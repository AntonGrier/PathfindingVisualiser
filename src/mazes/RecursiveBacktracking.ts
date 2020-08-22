import { Position, GRID_W, GRID_H } from '../IPathfinder';
import WallCarver from './wallCarver';

export default class RecursiveBacktracking extends WallCarver {
    visited: Map<String, boolean>;
    public generateWalls(): Position[] {
        this.wallsCreatedInOrder = [];
        this.visited = new Map<string, boolean>();
        let randomStartingPos: Position = {
            x: 2 * this.getRandom(1, (GRID_W - 1) / 2) - 1,
            y: 2 * this.getRandom(1, (GRID_H - 1) / 2) - 1,
        };
        this.carveWalls(randomStartingPos);
        return this.wallsCreatedInOrder;
    }

    carveWalls(current: Position): void {
        this.visit(current);
        let neighbors: Position[] = this.getUnvisitedNeighbors(current);
        for (let neighbor of neighbors) {
            console.log(neighbor);
            if (!this.isVisisted(neighbor)) {
                this.placeWallBetweenPositions(current, neighbor);
                this.carveWalls(neighbor);
            }
        }
    }

    private getUnvisitedNeighbors(current: Position): Position[] {
        let right: Position = { x: current.x + 2, y: current.y };
        let up: Position = { x: current.x, y: current.y - 2 };
        let left: Position = { x: current.x - 2, y: current.y };
        let bot: Position = { x: current.x, y: current.y + 2 };
        let neighbors: Position[] = [right, up, left, bot];
        neighbors = neighbors.filter((pos: Position) => {
            return this.positionInBounds(pos);
        });
        return this.randomisePositions(neighbors);
    }

    private randomisePositions(positions: Position[]): Position[] {
        return positions.sort(() => Math.random() - 0.5);
    }

    private visit(position: Position): void {
        this.visited.set(this.hash(position), true);
    }

    private isVisisted(position: Position): boolean {
        return this.visited.has(this.hash(position));
    }

    private hash(position: Position): string {
        return position.x.toString() + '-' + position.y.toString();
    }
}
