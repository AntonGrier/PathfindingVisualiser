import { Position } from './../IPathfinder';
export default abstract class MazeGenerator {
    wallsCreatedInOrder: Position[];
    public abstract generateWalls(): Position[];
    protected getRandom(max: number): number {
        return Math.floor(max * Math.random());
    }
}