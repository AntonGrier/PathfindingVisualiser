import { GRID_H, GRID_W, Node, NodeType } from '../models'

export const getDefaultGrid = () => {
  const grid: Node[][] = []
  for (let row = 0; row < GRID_H; row++) {
    let curRow: Node[] = []
    for (let col = 0; col < GRID_W; col++) {
      let newNode: Node = { position: { x: col, y: row }, nodeType: NodeType.Unvisited }
      curRow.push(newNode)
    }
    grid.push(curRow)
  }
  return grid
}

export const cloneGrid = (grid: Node[][]) => grid.map(row => row.slice())

export const clearPath = (grid: Node[][]): Node[][] =>
  grid.map(row =>
    row.map(node => ({
      ...node,
      nodeType: node.nodeType === NodeType.Wall ? NodeType.Wall : NodeType.Unvisited
    }))
  )

export const clearWalls = (grid: Node[][]): Node[][] =>
  grid.map(row =>
    row.map(node => ({
      ...node,
      nodeType: NodeType.Unvisited
    }))
  )
