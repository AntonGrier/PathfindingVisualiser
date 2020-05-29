import MazeGenerator from "./MazeGenerator";
import { Position, GRID_W, GRID_H } from '../IPathfinder';

export default class RecursiveDivision extends MazeGenerator {
    public generateWalls(): Position[] {
        this.divide(0, 0, GRID_W, GRID_H);
        return this.wallsCreatedInOrder;
    }

    private divide(x: number, y: number, width: number, height: number) {
        if (width === 2 || height === 2) {
            return;
        }
        let vertical: boolean = width > height;
        let splitIdx: number = this.getRandom(vertical ? width : height)
        this.buildWall(vertical? height - y : width - x, vertical? height : width, splitIdx, vertical);
        if (vertical) {
            this.divide(0, 0, width - splitIdx, height);
            this.divide(splitIdx, 0, width - splitIdx, height);
        } else {
            this.divide(0, 0, width, height - splitIdx);
            this.divide(0, splitIdx, width, height - splitIdx);
        }
    }

    private buildWall(min: number, max: number, splitIdx: number, vertical: boolean): void {
        let divLen = max - min;
        let wallGap = this.getRandom(divLen);
        for (let i = min; i < max; i++) {
            if (i === wallGap) continue;
            let pos: Position;
            if (vertical) {
                pos = { x: splitIdx, y: i };
            } else {
                pos = { x: i, y: splitIdx }
            }
            this.wallsCreatedInOrder.push(pos);
        }
    }
}