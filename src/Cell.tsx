import * as React from 'react'
import { FunctionComponent, RefObject } from 'react'
import { NodeType, Position } from './models'

interface CellProps {
  position: Position
  isStart: boolean
  isFinish: boolean
  isMidpoint: boolean
  nodeType: NodeType
  setMidpoint: (position: Position) => void
  onMouseDown: (position: Position) => void
  onMouseUp: () => void
  onMouseEnter: (position: Position, isMouseDown: boolean) => void
  nodeRef: (ref: RefObject<HTMLDivElement> | any) => void
}

export const Cell: FunctionComponent<CellProps> = ({
  position,
  isStart,
  isFinish,
  isMidpoint,
  nodeType,
  setMidpoint,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  nodeRef
}) => {
  const getClassName = () => {
    if (isStart || isFinish || isMidpoint) {
      return isStart ? 'cell-start' : isFinish ? 'cell-finish' : isMidpoint ? 'cell-midpoint' : ''
    } else {
      switch (nodeType) {
        case NodeType.Unvisited:
          return 'cell-unvisited'
        case NodeType.VisitedOne:
          return 'cell-visited-0'
        case NodeType.VisitedTwo:
          return 'cell-visited-1'
        case NodeType.VisitedOverlap:
          return 'cell-visited-overlap'
        case NodeType.Wall:
          return 'cell-wall'
        case NodeType.ShortestPath:
          return 'cell-shortestPath'
      }
    }
  }

  return (
    <div
      ref={nodeRef}
      id={`cell-${position.x}-${position.y}`}
      className={`cell ${getClassName()}`}
      onMouseUp={onMouseUp}
      onMouseDown={() => onMouseDown(position)}
      onMouseEnter={event => {
        const isMouseDown = (event.buttons ?? (event as any).which) === 1
        onMouseEnter(position, isMouseDown)
      }}
      onContextMenu={event => {
        event.stopPropagation()
        event.preventDefault()
        setMidpoint(position)
      }}
    />
  )
}
