import { Position, GRID_H, GRID_W } from './../IPathfinder';
export default abstract class MazeGenerator {
    wallsCreatedInOrder: Position[];
    public abstract generateWalls(): Position[];
    public getSetup(): Position[] {
        let walls: Position[] = [];
        for (let i = 0; i < GRID_W; i++) {
            let topBorderWall: Position = { x: i, y: 0 };
            let botBorderWall: Position = { x: i, y: GRID_H - 1 };
            walls.push(topBorderWall);
            walls.push(botBorderWall);
        }
        for (let i = 1; i < GRID_H - 1; i++) {
            let leftBorderWall: Position = { x: 0, y: i };
            let rightBorderWall: Position = { x: GRID_W - 1, y: i };
            walls.push(leftBorderWall);
            walls.push(rightBorderWall);
        }
        return walls;
    }
    protected getRandom(min: number, max: number): number {
        return min + Math.floor((max - min + 1) * Math.random());
    }
    protected addWall(position: Position) {
        this.wallsCreatedInOrder.push(position);
    }
}
