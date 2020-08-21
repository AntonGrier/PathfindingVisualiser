import MazeGenerator from './MazeGenerator';
import { Position, GRID_W, GRID_H } from '../IPathfinder';

export default class RecursiveDivision extends MazeGenerator {
    public generateWalls(): Position[] {
        this.wallsCreatedInOrder = [];
        this.generateBorder();
        const ul: Position = { x: 0, y: 0 };
        const lr: Position = { x: GRID_W - 1, y: GRID_H - 1 };
        this.divide(ul, lr);
        return this.wallsCreatedInOrder;
    }
    generateBorder(): void {
        for (let i = 0; i < GRID_W; i++) {
            let topBorderWall: Position = { x: i, y: 0 };
            let botBorderWall: Position = { x: i, y: GRID_H - 1 };
            this.addWall(topBorderWall);
            this.addWall(botBorderWall);
        }
        for (let i = 1; i < GRID_H - 1; i++) {
            let leftBorderWall: Position = { x: 0, y: i };
            let rightBorderWall: Position = { x: GRID_W - 1, y: i };
            this.addWall(leftBorderWall);
            this.addWall(rightBorderWall);
        }
    }

    private divide(ul: Position, lr: Position) {
        let width: number = lr.x - ul.x + 1;
        let height: number = lr.y - ul.y + 1;
        let vertical: boolean = width > height;
        let splitIdx: number;
        let gap: Position;
        if (vertical) {
            if (width < 4) return;
            splitIdx = this.randomEven(ul.x, lr.x);
            console.log(splitIdx);
            gap = { x: splitIdx, y: this.randomOdd(ul.y, lr.y) };
            console.log(`Trying ${splitIdx}, gap (${gap.x},${gap.y}) width: ${width} height: ${height}`);
        } else {
            if (height < 4) return;
            splitIdx = this.randomEven(ul.y, lr.y);
            console.log(splitIdx);
            gap = { x: this.randomOdd(ul.x, lr.x), y: splitIdx };
            console.log(`Trying ${splitIdx}, gap (${gap.x},${gap.y}) width: ${width} height: ${height}`);
        }

        for (let i = vertical ? ul.y + 1 : ul.x + 1; i <= (vertical ? lr.y - 1 : lr.x - 1); i++) {
            if (i === (vertical ? gap.y : gap.x)) continue;
            let pos: Position;
            if (vertical) {
                pos = { x: splitIdx, y: i };
            } else {
                pos = { x: i, y: splitIdx };
            }
            this.wallsCreatedInOrder.push(pos);
        }

        let newLr: Position;
        let newUl: Position;
        if (vertical) {
            newLr = { x: splitIdx, y: lr.y };
            newUl = { x: splitIdx, y: ul.y };
        } else {
            newLr = { x: lr.x, y: splitIdx };
            newUl = { x: ul.x, y: splitIdx };
        }

        this.divide(ul, newLr);
        this.divide(newUl, lr);
    }

    /**
     *
     * @param min
     * @param max
     *
     * produce a random even number in a range to match a valid wall coordinate that is not next to a current wall
     */
    private randomEven(min: number, max: number): number {
        min += 2;
        max -= 2;
        if (min % 2 === 1) {
            min++;
        }
        if (max % 2 === 1) {
            max--;
        }
        let wall = min + 2 * this.getRandom(0, (max - min) / 2);
        return wall;
    }

    /**
     *
     * @param min
     * @param max
     *
     * produce a random odd number in a range to match a valid gap coordinate
     */
    private randomOdd(min: number, max: number): number {
        min += 2;
        max -= 2;
        if (min % 2 === 0) {
            min++;
        }
        if (max % 2 === 0) {
            max--;
        }
        let gap = min + 2 * this.getRandom(0, (max - min) / 2);
        return gap;
    }

    private hash(position: Position): string {
        return position.x.toString() + '-' + position.y.toString();
    }
}
