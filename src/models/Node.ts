import { Position } from './Position'

export enum NodeType {
  Unvisited = 'UNVISITED',
  VisitedOne = 'VISITED_ONE',
  VisitedTwo = 'VISITED_TWO',
  VisitedOverlap = 'VISITED_OVERLAP',
  Wall = 'WALL',
  ShortestPath = 'SHORTEST_PATH'
}

export interface Node {
  position: Position
  nodeType: NodeType
}
