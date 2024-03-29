import { Position } from './Position'

const screenWidth = Math.floor((0.9 * window.innerWidth) / 25)
const screenHeight = Math.floor((0.8 * window.innerHeight) / 25)
export const GRID_W = screenWidth % 2 === 0 ? screenWidth - 1 : screenWidth
export const GRID_H = screenHeight % 2 === 0 ? screenHeight - 1 : screenHeight
export const DEFAULT_START_POS: Position = { x: Math.floor(GRID_W / 4), y: Math.floor(GRID_H / 2) }
export const DEFAULT_FINISH_POS: Position = { x: GRID_W - DEFAULT_START_POS.x - 1, y: DEFAULT_START_POS.y }
export const UPDATE_RATE = 15
