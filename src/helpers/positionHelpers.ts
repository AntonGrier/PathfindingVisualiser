import { Position } from '../models'

export const positionsEqual = (pos1: Position, pos2: Position) => pos1.x === pos2.x && pos1.y === pos2.y

export const isStart = (position: Position, startPos: Position) => positionsEqual(position, startPos)

export const isFinish = (position: Position, finishPos: Position) => positionsEqual(position, finishPos)

export const isMidpoint = (position: Position, midpointPos: Position) =>
  midpointPos && positionsEqual(position, midpointPos)

export const isEmpty = (position: Position, startPos: Position, finishPos: Position, midpointPos: Position) =>
  !isStart(position, startPos) && !isFinish(position, finishPos) && !isMidpoint(position, midpointPos)
