export default class Queue<T> {
  data: T[] = []
  push(element: T) {
    this.data.push(element)
  }
  pop(): T {
    return this.data.shift()
  }
  isEmpty(): boolean {
    return this.data.length === 0
  }
}
