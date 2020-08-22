export default class Stack<T> {
    data: Array<T>;
    top: number;
    constructor() {
        this.data = new Array<T>();
        this.top = 0;
    }
    public push(element: T): void {
        this.data[this.top] = element;
        this.top++;
    }
    public pop(): T {
        this.top--;
        return this.data[this.top];
    }
    public isEmpty(): boolean {
        return this.top === 0;
    }
}
