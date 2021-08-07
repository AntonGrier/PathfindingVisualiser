import * as React from 'react'
import {
  Node,
  NodeType,
  Position,
  MouseState,
  GRID_W,
  GRID_H,
  DEFAULT_START_POS,
  DEFAULT_FINISH_POS,
  UPDATE_RATE
} from './models'
import { createRef, FunctionComponent, RefObject, useState } from 'react'
import { Cell } from './Cell'
import Navbar from './Navbar'
import PathfindingAlgorithm from './Algorithms/PathfindingAlgorithm'
import MazeGenerator from './mazes/MazeGenerator'
import { clearPath, clearWalls, cloneGrid, getDefaultGrid, isEmpty, isFinish, isMidpoint, isStart } from './helpers'

const references: any[][] = Array(GRID_H)
  .fill([])
  .map(() =>
    Array(GRID_W)
      .fill(0)
      .map(() => createRef())
  )

export const Pathfinder: FunctionComponent = () => {
  const [grid, setGrid] = useState<Node[][]>(getDefaultGrid())
  const [startPos, setStartPos] = useState<Position>(DEFAULT_START_POS)
  const [finishPos, setFinishPos] = useState<Position>(DEFAULT_FINISH_POS)
  const [midpointPos, setMidpointPos] = useState<Position | undefined>()
  const [mouseState, setMouseState] = useState<MouseState>(MouseState.PlacingWall)
  const [prevAlgorithm, setPrevAlgorithm] = useState<PathfindingAlgorithm | undefined>()
  const [animating, setAnimating] = useState(false)

  const recalculatePath = (
    prevAlgorithm: PathfindingAlgorithm,
    startPos: Position,
    finishPos: Position,
    midpointPos?: Position
  ) => {
    let newGrid: Node[][] = clearPath(cloneGrid(grid))
    let visitedPaths: Position[][] = []
    let finalPaths: Position[][] = []
    if (!midpointPos) {
      prevAlgorithm.calculatePath(newGrid, startPos, finishPos)
      visitedPaths.push(prevAlgorithm.produceVisitedInOrder())
      finalPaths.push(prevAlgorithm.produceFinalPath())
    } else {
      prevAlgorithm.calculatePath(newGrid, startPos, midpointPos)
      visitedPaths.push(prevAlgorithm.produceVisitedInOrder())
      finalPaths.push(prevAlgorithm.produceFinalPath())

      prevAlgorithm.calculatePath(newGrid, midpointPos, finishPos)
      visitedPaths.push(prevAlgorithm.produceVisitedInOrder())
      finalPaths.push(prevAlgorithm.produceFinalPath())
    }

    for (let idx = 0; idx < visitedPaths.length; idx++) {
      let visited: Position[] = visitedPaths[idx]
      for (let pos of visited) {
        if (idx === 0) {
          newGrid[pos.y][pos.x].nodeType = NodeType.VisitedOne
        } else if (newGrid[pos.y][pos.x].nodeType === NodeType.VisitedOne) {
          newGrid[pos.y][pos.x].nodeType = NodeType.VisitedOverlap
        } else {
          newGrid[pos.y][pos.x].nodeType = NodeType.VisitedTwo
        }
      }
    }

    for (let path of finalPaths) {
      for (let pos of path) {
        newGrid[pos.y][pos.x].nodeType = NodeType.ShortestPath
      }
    }

    setStartPos(startPos)
    setFinishPos(finishPos)
    setMidpointPos(midpointPos)
    setPrevAlgorithm(prevAlgorithm)
    setGrid(newGrid)
  }

  const onMouseUp = () => {
    setMouseState(MouseState.PlacingWall)
  }

  const onMouseDown = (position: Position) => {
    if (animating) return
    const { nodeType } = grid[position.y][position.x]
    if (
      (mouseState === MouseState.MovingStart ||
        mouseState === MouseState.MovingFinish ||
        mouseState === MouseState.MovingMidpoint) &&
      !isEmpty(position, startPos, finishPos, midpointPos)
    )
      return

    if (isStart(position, startPos)) {
      setMouseState(MouseState.MovingStart)
    } else if (isFinish(position, finishPos)) {
      setMouseState(MouseState.MovingFinish)
    } else if (isMidpoint(position, midpointPos)) {
      setMouseState(MouseState.MovingMidpoint)
    } else if (nodeType === NodeType.Unvisited) {
      setMouseState(MouseState.PlacingWall)
    } else {
      setMouseState(MouseState.RemovingWall)
    }

    if (isEmpty(position, startPos, finishPos, midpointPos)) {
      let clearedGrid = cloneGrid(grid)
      if (prevAlgorithm) {
        clearedGrid = clearPath(clearedGrid)
        setPrevAlgorithm(undefined)
      }
      if (nodeType === NodeType.Wall) {
        clearedGrid[position.y][position.x].nodeType = NodeType.Unvisited
      } else {
        clearedGrid[position.y][position.x].nodeType = NodeType.Wall
      }
      setGrid(clearedGrid)
    }
  }

  const onMouseEnter = (position: Position, isMouseDown: boolean) => {
    if (animating) return
    const clonedGrid = cloneGrid(grid)
    if (
      !isMouseDown ||
      isStart(position, startPos) ||
      isFinish(position, finishPos) ||
      isMidpoint(position, midpointPos)
    )
      return

    switch (mouseState) {
      case MouseState.MovingStart:
        if (prevAlgorithm) {
          recalculatePath(prevAlgorithm, position, finishPos, midpointPos)
        } else {
          setStartPos(position)
        }
        break
      case MouseState.MovingFinish:
        if (prevAlgorithm) {
          recalculatePath(prevAlgorithm, startPos, position, midpointPos)
        } else {
          setFinishPos(position)
        }
        break
      case MouseState.MovingMidpoint:
        if (prevAlgorithm) {
          recalculatePath(prevAlgorithm, startPos, finishPos, position)
        } else {
          setMidpointPos(position)
        }
        break
      case MouseState.PlacingWall:
        clonedGrid[position.y][position.x].nodeType = NodeType.Wall
        setGrid(clonedGrid)
        break
      case MouseState.RemovingWall:
        clonedGrid[position.y][position.x].nodeType = NodeType.Unvisited
        setGrid(clonedGrid)
        break
    }
  }

  const performAlgorithm = (algorithm: PathfindingAlgorithm): void => {
    setPrevAlgorithm(algorithm)
    setMouseState(MouseState.Disabled)
    const clonedGrid = clearPath(cloneGrid(grid))
    const visitedPaths: Position[][] = []
    const finalPaths: Position[][] = []
    if (!midpointPos) {
      algorithm.calculatePath(grid, startPos, finishPos)
      visitedPaths.push(algorithm.produceVisitedInOrder())
      finalPaths.push(algorithm.produceFinalPath())
    } else {
      algorithm.calculatePath(grid, startPos, midpointPos)
      visitedPaths.push(algorithm.produceVisitedInOrder())
      finalPaths.push(algorithm.produceFinalPath())

      algorithm.calculatePath(grid, midpointPos, finishPos)
      visitedPaths.push(algorithm.produceVisitedInOrder())
      finalPaths.push(algorithm.produceFinalPath())
    }
    visualiseAlgorithm(visitedPaths, finalPaths, clonedGrid)

    setGrid(clonedGrid)
    setMouseState(MouseState.PlacingWall)
  }

  const visualiseAlgorithm = async (
    visitedInOrder: Position[][],
    shortestPath: Position[][],
    clonedGrid: Node[][]
  ): Promise<void> => {
    setAnimating(true)

    for (let idx = 0; idx < visitedInOrder.length; idx++) {
      let visited: Position[] = visitedInOrder[idx]
      await visualiseVisited(visited, idx, clonedGrid)
    }
    await visualisePath(shortestPath.flat(), clonedGrid)
    setAnimating(false)
  }

  const visualiseVisited = (visitedInOrder: Position[], count: number, clonedGrid: Node[][]): Promise<void> => {
    return new Promise<void>(resolve => {
      for (let i = 0; i <= visitedInOrder.length; i++) {
        setTimeout(() => {
          if (i === visitedInOrder.length) {
            setTimeout(() => {
              resolve()
            }, UPDATE_RATE)
          } else {
            let position: Position = visitedInOrder[i]
            let ref: RefObject<HTMLDivElement> = references[position.y][position.x]
            let className: string = ref.current.className
            if (
              !className.includes('cell-start') &&
              !className.includes('cell-finish') &&
              !className.includes('cell-midpoint')
            ) {
              if (className.includes('cell-visited-0')) {
                ref.current.className = `cell cell-visited-overlap`
              } else {
                ref.current.className = `cell cell-visited-${count}`
              }
              if (count === 0) {
                clonedGrid[position.y][position.x].nodeType = NodeType.VisitedOne
              } else if (clonedGrid[position.y][position.x].nodeType === NodeType.VisitedOne) {
                clonedGrid[position.y][position.x].nodeType = NodeType.VisitedOverlap
              } else {
                clonedGrid[position.y][position.x].nodeType = NodeType.VisitedTwo
              }
            }
          }
        }, UPDATE_RATE * i)
      }
    })
  }

  const visualisePath = (shortestPath: Position[], clonedGrid: Node[][]): Promise<void> => {
    return new Promise<void>(resolve => {
      for (let i = 0; i <= shortestPath.length; i++) {
        setTimeout(() => {
          if (i === shortestPath.length) {
            setTimeout(() => {
              resolve()
            }, UPDATE_RATE)
          } else {
            let position: Position = shortestPath[i]
            let ref: RefObject<HTMLDivElement> = references[position.y][position.x]
            let className: string = ref.current.className
            if (
              !className.includes('cell-start') &&
              !className.includes('cell-finish') &&
              !className.includes('cell-midpoint')
            ) {
              ref.current.className = 'cell cell-shortestPath'
              clonedGrid[position.y][position.x].nodeType = NodeType.ShortestPath
            }
          }
        }, UPDATE_RATE * i)
      }
    })
  }

  const clearGridWalls = () => {
    references.forEach(refRow =>
      refRow.forEach(ref => {
        const className = ref.current.className
        if (
          !className.includes('cell-start') &&
          !className.includes('cell-finish') &&
          !className.includes('cell-midpoint')
        ) {
          ref.current.className = 'cell cell-unvisited'
        }
      })
    )
  }

  const generateMaze = async (mazeGenerator: MazeGenerator): Promise<void> => {
    setAnimating(true)
    setPrevAlgorithm(undefined)
    clearGridWalls()
    const clonedGrid = clearWalls(cloneGrid(grid))
    const setupWalls: Position[] = mazeGenerator.getSetup()
    const walls: Position[] = mazeGenerator.generateWalls()
    await setupStartingWalls(setupWalls, clonedGrid)
    await visualizeMaze(walls, clonedGrid)
    setGrid(clonedGrid)
    setMouseState(MouseState.PlacingWall)
    setAnimating(false)
  }

  const setupStartingWalls = (walls: Position[], clonedGrid: Node[][]): Promise<void> => {
    return new Promise<void>(resolve => {
      for (let i = 0; i <= walls.length; i++) {
        if (i === walls.length) {
          setTimeout(() => {
            resolve()
          }, 1000)
        } else {
          let position = walls[i]
          let ref: RefObject<HTMLDivElement> = references[position.y][position.x]
          let className = ref.current.className
          clonedGrid[position.y][position.x].nodeType = NodeType.Wall
          if (
            !className.includes('cell-start') &&
            !className.includes('cell-finish') &&
            !className.includes('cell-midpoint')
          ) {
            ref.current.className = 'cell cell-wall'
          }
        }
      }
    })
  }

  const visualizeMaze = (walls: Position[], clonedGrid: Node[][]): Promise<void> => {
    return new Promise<void>(resolve => {
      for (let i = 0; i <= walls.length; i++) {
        setTimeout(() => {
          if (i === walls.length) {
            setTimeout(() => {
              resolve()
            }, UPDATE_RATE)
          } else {
            let position: Position = walls[i]
            let ref: RefObject<HTMLDivElement> = references[position.y][position.x]
            let className: string = ref.current.className
            if (className.includes('cell-wall')) {
              if (!className.includes('cell-start') && !className.includes('cell-finish')) {
                ref.current.className = 'cell cell-unvisited'
              }
              clonedGrid[position.y][position.x].nodeType = NodeType.Unvisited
            } else {
              if (
                !className.includes('cell-start') &&
                !className.includes('cell-finish') &&
                !className.includes('cell-midpoint')
              ) {
                ref.current.className = 'cell cell-wall'
              }
              clonedGrid[position.y][position.x].nodeType = NodeType.Wall
            }
          }
        }, UPDATE_RATE * i)
      }
    })
  }

  const setMidpoint = (position: Position): void => {
    if (animating) return
    if (!isStart(position, startPos) && !isFinish(position, finishPos)) {
      setMidpointPos(isMidpoint(position, midpointPos) ? undefined : position)
      if (prevAlgorithm) {
        setPrevAlgorithm(undefined)
      }
    }
  }

  const cells = grid.map((row, rowIdx) => (
    <div className='grid-row' key={rowIdx}>
      {row.map((node, colIdx) => {
        const position: Position = { x: colIdx, y: rowIdx }
        return (
          <Cell
            key={`${colIdx}-${rowIdx}`}
            position={position}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
            isStart={isStart(position, startPos)}
            isFinish={isFinish(position, finishPos)}
            isMidpoint={isMidpoint(position, midpointPos)}
            setMidpoint={setMidpoint}
            nodeType={node.nodeType}
            nodeRef={references[rowIdx][colIdx]}
          />
        )
      })}
    </div>
  ))

  return (
    <div>
      <Navbar
        performAlgorithm={(algorithm: PathfindingAlgorithm) => performAlgorithm(algorithm)}
        clearPath={() => {
          setPrevAlgorithm(undefined)
          setGrid(clearPath(grid))
        }}
        clearWall={() => {
          setPrevAlgorithm(undefined)
          setGrid(clearWalls(grid))
        }}
        generateMaze={(mazeGenerator: MazeGenerator) => {
          generateMaze(mazeGenerator)
        }}
      />
      <div className='grid'>{cells}</div>
    </div>
  )
}
