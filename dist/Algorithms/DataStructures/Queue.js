"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queue {
    constructor() {
        this.data = [];
    }
    push(element) {
        this.data.push(element);
    }
    pop() {
        return this.data.shift();
    }
    isEmpty() {
        return this.data.length === 0;
    }
}
exports.default = Queue;
//# sourceMappingURL=Queue.js.map