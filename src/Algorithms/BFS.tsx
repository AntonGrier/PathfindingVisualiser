import PathfindingAlgorithm, { PathData } from './PathfindingAlgorithm'
import Queue from './DataStructures/Queue'
import { Node, Position } from '../models'

export default class BFS extends PathfindingAlgorithm {
  queue: Queue<Position> = new Queue<Position>()

  calculatePath(grid: Node[][], startPos: Position, finishPos: Position): void {
    this.reset()
    this.setMap(grid)
    this.queue.push(startPos)
    while (!this.queue.isEmpty()) {
      let curPosition: Position = this.queue.pop()
      this.markAsVisited(curPosition)
      if (this.equalPosition(curPosition, finishPos)) {
        this.findShortestPath(finishPos)
        return
      }
      let neighbors: Position[] = this.getNeighbors(grid, curPosition)
      for (let neighbor of neighbors) {
        this.queue.push(neighbor)
        this.pathValues.set(this.hash(neighbor), { isVisited: true, previousNode: curPosition })
      }
    }
  }

  protected setMap(grid: Node[][]): void {
    grid.forEach(row => {
      row.forEach(node => {
        let nodePosition: Position = node.position
        let pathData: PathData = {
          isVisited: false,
          previousNode: null
        }
        this.pathValues.set(this.hash(nodePosition), pathData)
      })
    })
  }

  protected reset(): void {
    this.clear()
    this.queue = new Queue<Position>()
  }
}
