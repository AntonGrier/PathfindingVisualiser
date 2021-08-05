import { GRID_H, GRID_W, Node, NodeType, Position } from '../IPathfinder'

export interface PathData {
  isVisited: boolean
  shortestPath?: number
  previousNode?: Position
}

export default abstract class PathfindingAlgorithm {
  pathValues: Map<string, PathData> = new Map<string, PathData>()
  finalPath: Array<Position> = []
  visitedNodesInOrder: Array<Position> = []

  protected abstract setMap(grid: Node[][], startPos?: Position): void

  public abstract calculatePath(grid: Node[][], startPos: Position, finishPos: Position): void

  public produceVisitedInOrder(): Position[] {
    return this.visitedNodesInOrder.slice(1, this.visitedNodesInOrder.length - 1)
  }

  public produceFinalPath(): Position[] {
    return this.finalPath.slice(1, this.visitedNodesInOrder.length - 1)
  }

  protected getNeighbors(grid: Node[][], position: Position): Array<Position> {
    let neighbors: Array<Position> = []
    neighbors.push({ x: position.x + 1, y: position.y })
    neighbors.push({ x: position.x, y: position.y + 1 })
    neighbors.push({ x: position.x, y: position.y - 1 })
    neighbors.push({ x: position.x - 1, y: position.y })

    neighbors.push({ x: position.x - 1, y: position.y + 1 })
    neighbors.push({ x: position.x + 1, y: position.y + 1 })
    neighbors.push({ x: position.x + 1, y: position.y - 1 })
    neighbors.push({ x: position.x - 1, y: position.y - 1 })

    return neighbors.filter(neighbor => {
      return (
        neighbor.x >= 0 &&
        neighbor.x < GRID_W &&
        neighbor.y >= 0 &&
        neighbor.y < GRID_H &&
        grid[neighbor.y][neighbor.x].nodeType !== NodeType.Wall &&
        !this.isVisited(neighbor) &&
        this.cornerCheck(position, neighbor, grid)
      )
    })
  }

  private cornerCheck(position: Position, neighbor: Position, grid: Node[][]): boolean {
    return (
      grid[position.y][neighbor.x].nodeType !== NodeType.Wall || grid[neighbor.y][position.x].nodeType !== NodeType.Wall
    )
  }

  protected getDistance(grid: Node[][], current: Position, neighbor: Position): number {
    return Math.sqrt(Math.pow(Math.abs(current.x - neighbor.x), 2) + Math.pow(Math.abs(current.y - neighbor.y), 2))
  }

  protected isVisited(position: Position): boolean {
    return this.pathValues.get(this.hash(position)).isVisited
  }

  protected markAsVisited(position: Position): void {
    this.visitedNodesInOrder.push(position)
    let pathData: PathData = this.pathValues.get(this.hash(position))
    let newPathData: PathData = {
      ...pathData,
      isVisited: true
    }
    this.pathValues.set(this.hash(position), newPathData)
  }

  protected findShortestPath(finishPos: Position): void {
    for (
      let curPosition = finishPos;
      curPosition != null;
      curPosition = this.pathValues.get(this.hash(curPosition)).previousNode
    ) {
      this.finalPath.unshift(curPosition)
    }
  }

  protected equalPosition(pos1: Position, pos2: Position) {
    return pos1.x === pos2.x && pos1.y === pos2.y
  }

  protected hash(position: Position): string {
    return position.x.toString() + '-' + position.y.toString()
  }

  protected clear(): void {
    this.visitedNodesInOrder = []
    this.finalPath = []
    this.pathValues = new Map<string, PathData>()
  }

  protected abstract reset(): void
}
