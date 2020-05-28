"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stack {
    constructor() {
        this.data = [];
        this.top = 0;
    }
    push(element) {
        this.data[this.top] = element;
        this.top++;
    }
    pop() {
        this.top--;
        return this.data[this.top];
    }
    // public peek(): T {
    //     return this.data[this.top - 1];
    // }
    isEmpty() {
        return this.top === 0;
    }
}
exports.default = Stack;
//# sourceMappingURL=Stack.js.map