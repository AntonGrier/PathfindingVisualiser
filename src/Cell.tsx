import * as React from 'react'
import { FunctionComponent, RefObject } from 'react'
import { NodeType, Position } from './IPathfinder'

interface CellProps {
  position: Position
  isStart: boolean
  isFinish: boolean
  isMidpoint: boolean
  nodeType: NodeType
  updateMouseState: (position: Position, eventType: string) => void
  setMidpoint: (position: Position) => void
  nodeRef: (ref: RefObject<HTMLDivElement> | any) => void
}

export const Cell: FunctionComponent<CellProps> = ({
  position,
  isStart,
  isFinish,
  isMidpoint,
  nodeType,
  updateMouseState,
  setMidpoint,
  nodeRef
}) => {
  const handleMouseEvent = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.nativeEvent.which === 1) {
      let eventType: string = event.type
      updateMouseState(position, eventType)
    } else if (event.nativeEvent.which === 3 && event.type === 'mousedown') {
      setMidpoint(position)
    }
  }

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
      onMouseDown={event => handleMouseEvent(event)}
      onMouseUp={event => handleMouseEvent(event)}
      onMouseEnter={event => handleMouseEvent(event)}
      onContextMenu={event => event.preventDefault()}
    />
  )
}
