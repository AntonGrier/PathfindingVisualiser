"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MazeGenerator_1 = require("./MazeGenerator");
const IPathfinder_1 = require("../IPathfinder");
class RecursiveDivision extends MazeGenerator_1.default {
    generateWalls() {
        this.wallsCreatedInOrder = [];
        const ul = { x: 0, y: 0 };
        const lr = { x: IPathfinder_1.GRID_W - 1, y: IPathfinder_1.GRID_H - 1 };
        this.divide(ul, lr);
        return this.wallsCreatedInOrder;
    }
    divide(ul, lr) {
        let width = lr.x - ul.x + 1;
        let height = lr.y - ul.y + 1;
        if (width <= 2 && height <= 2) {
            return;
        }
        let vertical = width > height;
        let splitIdx;
        let gapIdx;
        if (vertical) {
            splitIdx = this.getRandom(ul.x + 1, lr.x - 1);
            gapIdx = this.getRandom(ul.y, lr.y);
        }
        else {
            splitIdx = this.getRandom(ul.y + 1, lr.y - 1);
            gapIdx = this.getRandom(ul.x, lr.x);
        }
        for (let i = vertical ? ul.y : ul.x; i <= (vertical ? lr.y : lr.x); i++) {
            if (i === gapIdx)
                continue;
            let pos;
            if (vertical) {
                pos = { x: splitIdx, y: i };
            }
            else {
                pos = { x: i, y: splitIdx };
            }
            this.wallsCreatedInOrder.push(pos);
        }
        let newLr;
        let newUl;
        if (vertical) {
            newLr = { x: splitIdx - 1, y: lr.y };
            newUl = { x: splitIdx + 1, y: ul.y };
        }
        else {
            newLr = { x: lr.x, y: splitIdx - 1 };
            newUl = { x: ul.x, y: splitIdx + 1 };
        }
        this.divide(ul, newLr);
        this.divide(newUl, lr);
    }
}
exports.default = RecursiveDivision;
//# sourceMappingURL=RecursiveDivision.js.map