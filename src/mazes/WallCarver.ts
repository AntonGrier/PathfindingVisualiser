import MazeGenerator from './MazeGenerator';
import { Position, GRID_W, GRID_H } from '../IPathfinder';

export const ADJUSTED_WIDTH = (GRID_W - 1) / 2;
export const ADJUSTED_HEIGHT = (GRID_H - 1) / 2;

export default abstract class WallCarver extends MazeGenerator {
    protected placeWallBetweenPositions(current: Position, neighbor: Position): void {
        let positionBetween: Position = {
            x: Math.floor((current.x + neighbor.x) / 2),
            y: Math.floor((current.y + neighbor.y) / 2),
        };
        this.addWall(positionBetween);
    }

    protected positionInBounds(position: Position): boolean {
        return position.x > 0 && position.x < GRID_W - 1 && position.y > 0 && position.y < GRID_H - 1;
    }

    public getSetup(): Position[] {
        let walls: Position[] = [];
        for (let i = 0; i < GRID_W; i++) {
            let topBorderWall: Position = { x: i, y: 0 };
            let botBorderWall: Position = { x: i, y: GRID_H - 1 };
            walls.push(topBorderWall);
            walls.push(botBorderWall);
        }
        for (let x = 0; x < GRID_W; x += 2) {
            for (let y = 1; y < GRID_H - 1; y++) {
                let middleWall: Position = { x: x, y: y };
                walls.push(middleWall);
            }
        }
        for (let x = 1; x < GRID_W - 1; x += 2) {
            for (let y = 2; y < GRID_H - 2; y += 2) {
                let crossWall: Position = { x: x, y: y };
                walls.push(crossWall);
            }
        }
        return walls;
    }
}
