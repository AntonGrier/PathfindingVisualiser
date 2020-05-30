import MazeGenerator from './MazeGenerator';
import { Position, GRID_W, GRID_H } from '../IPathfinder';

export default class RecursiveDivision extends MazeGenerator {
    gapMap: Map<string, Position>;
    public generateWalls(): Position[] {
        this.wallsCreatedInOrder = [];
        this.gapMap = new Map<string, Position>();
        const ul: Position = { x: 0, y: 0 };
        const lr: Position = { x: GRID_W - 1, y: GRID_H - 1 };
        this.divide(ul, lr);
        return this.wallsCreatedInOrder;
    }

    private divide(ul: Position, lr: Position) {
        let width: number = lr.x - ul.x + 1;
        let height: number = lr.y - ul.y + 1;
        if (width < 2 || height < 2 || (width === 2 && height === 2)) {
            // || (height === 3 && width === 2) || (height ===  && width === 2)) {
            return;
        }
        let vertical: boolean = width > height;
        let splitIdx: number;
        let gap: Position;
        let found = false;
        while (!found) {
            if (vertical) {
                splitIdx = this.getRandom(ul.x + 1, lr.x - 1);
                gap = { x: splitIdx, y: this.getRandom(ul.y, lr.y) };
                console.log(`Trying ${splitIdx}, width: ${width} heoght: ${height}`);
                let up: Position = { x: splitIdx, y: ul.y - 1 };
                let down: Position = { x: splitIdx, y: lr.y + 1 };
                if (width > 2 && height > 2) {
                    found = !this.gapMap.has(this.hash(up)) && !this.gapMap.has(this.hash(down));
                } else {
                    found = true;
                }
            } else {
                splitIdx = this.getRandom(ul.y + 1, lr.y - 1);
                gap = { x: this.getRandom(ul.x, lr.x), y: splitIdx };
                console.log(`Trying ${splitIdx}, width: ${width} heoght: ${height}`);
                let left: Position = { x: ul.x - 1, y: splitIdx };
                let right: Position = { x: lr.x + 1, y: splitIdx };
                if (width > 2 && height > 2) {
                    found = !this.gapMap.has(this.hash(left)) && !this.gapMap.has(this.hash(right));
                } else {
                    found = true;
                }
            }
        }

        this.gapMap.set(this.hash(gap), gap);

        for (let i = vertical ? ul.y : ul.x; i <= (vertical ? lr.y : lr.x); i++) {
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
            newLr = { x: splitIdx - 1, y: lr.y };
            newUl = { x: splitIdx + 1, y: ul.y };
        } else {
            newLr = { x: lr.x, y: splitIdx - 1 };
            newUl = { x: ul.x, y: splitIdx + 1 };
        }
        this.divide(ul, newLr);
        this.divide(newUl, lr);
    }
    // checkSplit(ul: Position, lr: Position, splitIdx: number, vertical: boolean): boolean {
    //     let wallStart: Position;
    //     let wallFinish: Position;
    //     if (vertical) {
    //         wallStart = { x: splitIdx, y: ul.y };
    //         wallFinish = { x: splitIdx, y: lr.y };
    //     } else {
    //         wallStart = { x: ul.x, y: splitIdx };
    //         wallFinish = { x: lr.x, y: splitIdx };
    //     }
    // }

    private hash(position: Position): string {
        return position.x.toString() + '-' + position.y.toString();
    }

    // private buildWall(min: number, max: number, splitIdx: number, vertical: boolean): void {
    //     let divLen = max - min;
    //     let wallGap = this.getRandom(divLen);
    //     for (let i = min; i < max; i++) {
    //         if (i === wallGap) continue;
    //         let pos: Position;
    //         if (vertical) {
    //             pos = { x: splitIdx, y: i };
    //         } else {
    //             pos = { x: i, y: splitIdx };
    //         }
    //         this.wallsCreatedInOrder.push(pos);
    //     }
    // }
}
