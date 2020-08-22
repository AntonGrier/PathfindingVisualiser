import PathfindingAlgorithm from './Algorithms/PathfindingAlgorithm';

export const GRID_W = 41;
export const GRID_H = 21;
export const DEFAULT_START_POS: Position = { x: Math.floor(GRID_W / 4), y: Math.floor(GRID_H / 2) };
export const DEFAULT_FINISH_POS: Position = { x: GRID_W - DEFAULT_START_POS.x, y: DEFAULT_START_POS.y };
export const UPDATE_RATE = 15;

export interface Position {
    x: number;
    y: number;
}
export enum MouseState {
    PlacingWall,
    RemovingWall,
    MovingStart,
    MovingFinish,
    MovingMidpoint,
    Disabled,
}
export enum NodeType {
    Unvisited,
    VisitedOne,
    VisitedTwo,
    VisitedOverlap,
    Wall,
    ShortestPath,
}
export interface Node {
    position: Position;
    nodeType: NodeType;
    weight: number;
}
