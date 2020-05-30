import { Position } from './../IPathfinder';
export default abstract class MazeGenerator {
    wallsCreatedInOrder: Position[];
    public abstract generateWalls(): Position[];
    protected getRandom(min: number, max: number): number {
        return min + Math.floor((max - min + 1) * Math.random());
    }
    protected addWall(position: Position) {
        this.wallsCreatedInOrder.push(position);
    }
}
