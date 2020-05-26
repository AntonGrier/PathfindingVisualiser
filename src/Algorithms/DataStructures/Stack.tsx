export default class Stack<T> {
    data: Array<T> = [];
    top: number = 0;
    public push(element: T): void {
        this.data[this.top] = element;
        this.top++;
    }
    public pop(): T {
        this.top--;
        return this.data[this.top];
    }
    // public peek(): T {
    //     return this.data[this.top - 1];
    // }
    public isEmpty(): boolean {
        return this.top === 0;
    }
}
