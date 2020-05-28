"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = void 0;
class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    insert(val, priority) {
        if (!this.heap.length || this.heap[this.heap.length - 1][1] > priority) {
            this.heap.push([val, priority]);
            return this.heap;
        }
        const tmp = [];
        let found = false;
        for (let i = 0; i < this.heap.length; i++) {
            const p = this.heap[i][1];
            if (priority >= p && !found) {
                tmp.push([val, priority]);
                found = true;
            }
            tmp.push(this.heap[i]);
        }
        return (this.heap = tmp);
    }
    has({ x, y }) {
        const foundNode = this.heap.find(([val]) => val.x === x && val.y === y);
        return !!foundNode;
    }
    get({ x, y }) {
        const foundNode = this.heap.find(([val]) => val.x === x && val.y === y);
        return foundNode && foundNode[0];
    }
    shift(priority) {
        const tuple = this.heap.shift();
        if (priority) {
            return tuple;
        }
        return tuple ? tuple[0] : undefined;
    }
    pop() {
        return this.heap.pop()[0];
    }
    priorities() {
        return this.heap.map(([_, p]) => p);
    }
    values() {
        return this.heap.map(([val]) => val);
    }
    size() {
        return this.heap.length;
    }
    toArray(values) {
        if (values) {
            return this.heap.map(([val]) => val);
        }
        return this.heap;
    }
}
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=PriorityQueue.js.map