"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const IPathfinder_1 = require("./IPathfinder");
const react_1 = require("react");
const Cell_1 = require("./Cell");
const Navbar_1 = require("./Navbar");
const PerlinNoise_1 = require("./Algorithms/Perlin/PerlinNoise");
class Pathfinder extends react_1.Component {
    constructor(props) {
        super(props);
        this.references = Array(IPathfinder_1.GRID_H)
            .fill([])
            .map(() => Array(IPathfinder_1.GRID_W)
            .fill(0)
            .map(() => react_1.createRef()));
        // this.references = Array(GRID_H)
        //     .fill([])
        //     .map(() =>
        //         Array(GRID_W)
        //             .fill(0)
        //             .map(() => createRef()),
        //     );
        let grid = [];
        for (let row = 0; row < IPathfinder_1.GRID_H; row++) {
            let curRow = [];
            for (let col = 0; col < IPathfinder_1.GRID_W; col++) {
                let newNode = { position: { x: col, y: row }, nodeType: IPathfinder_1.NodeType.Unvisited, weight: 0 };
                curRow.push(newNode);
            }
            grid.push(curRow);
        }
        this.state = {
            grid: grid,
            startPos: IPathfinder_1.DEFAULT_START_POS,
            finishPos: IPathfinder_1.DEFAULT_FINISH_POS,
            mouseState: IPathfinder_1.MouseState.PlacingWall,
            isMouseDown: false,
            updateLock: false,
            prevAlgorithm: null,
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !nextState.updateLock;
    }
    clearPath() {
        let grid = this.state.grid;
        grid = grid.map((row) => {
            return row.map((node) => {
                return Object.assign(Object.assign({}, node), { nodeType: node.nodeType === IPathfinder_1.NodeType.Wall ? IPathfinder_1.NodeType.Wall : IPathfinder_1.NodeType.Unvisited });
            });
        });
        return grid;
    }
    updateMouseState(position, eventType) {
        if (this.state.mouseState === IPathfinder_1.MouseState.Disabled)
            return;
        switch (eventType) {
            case 'mousedown': {
                this.onMouseDown(position);
                break;
            }
            case 'mouseup': {
                this.onMouseUp();
                break;
            }
            case 'mouseenter': {
                this.onMouseEnter(position);
                break;
            }
        }
    }
    onMouseDown(position) {
        let { grid, mouseState, isMouseDown, prevAlgorithm } = this.state;
        let nodeType = grid[position.y][position.x].nodeType;
        if ((mouseState === IPathfinder_1.MouseState.MovingStart && this.isFinish(position)) ||
            (mouseState === IPathfinder_1.MouseState.MovingFinish && this.isStart(position)))
            return;
        mouseState = this.isStart(position)
            ? IPathfinder_1.MouseState.MovingStart
            : this.isFinish(position)
                ? IPathfinder_1.MouseState.MovingFinish
                : nodeType === IPathfinder_1.NodeType.Unvisited
                    ? IPathfinder_1.MouseState.PlacingWall
                    : IPathfinder_1.MouseState.RemovingWall;
        if (!this.isStart(position) && !this.isFinish(position)) {
            if (prevAlgorithm !== null) {
                grid = this.clearPath();
                prevAlgorithm = null;
            }
            if (nodeType === IPathfinder_1.NodeType.Wall) {
                grid[position.y][position.x].nodeType = IPathfinder_1.NodeType.Unvisited;
            }
            else {
                grid[position.y][position.x].nodeType = IPathfinder_1.NodeType.Wall;
            }
        }
        isMouseDown = true;
        this.setState({ grid: grid, mouseState: mouseState, isMouseDown: isMouseDown, prevAlgorithm: prevAlgorithm });
    }
    onMouseUp() {
        let mouseState = IPathfinder_1.MouseState.PlacingWall;
        let isMouseDown = false;
        this.setState({ mouseState: mouseState, isMouseDown: isMouseDown });
    }
    onMouseEnter(position) {
        let { grid, startPos, finishPos, mouseState, isMouseDown, prevAlgorithm } = this.state;
        if (!isMouseDown || this.isStart(position) || this.isFinish(position))
            return;
        switch (mouseState) {
            case IPathfinder_1.MouseState.MovingStart:
                startPos = position;
                if (prevAlgorithm !== null) {
                    this.recalculatePath(startPos, finishPos, prevAlgorithm);
                }
                else {
                    this.setState({ startPos: startPos });
                }
                break;
            case IPathfinder_1.MouseState.MovingFinish:
                finishPos = position;
                if (prevAlgorithm !== null) {
                    this.recalculatePath(startPos, finishPos, prevAlgorithm);
                }
                else {
                    this.setState({ finishPos: finishPos });
                }
                break;
            case IPathfinder_1.MouseState.PlacingWall:
                grid[position.y][position.x].nodeType = IPathfinder_1.NodeType.Wall;
                this.setState({ grid: grid });
                break;
            case IPathfinder_1.MouseState.RemovingWall:
                grid[position.y][position.x].nodeType = IPathfinder_1.NodeType.Unvisited;
                this.setState({ grid: grid });
                break;
        }
    }
    recalculatePath(startPos, finishPos, prevAlgorithm) {
        let grid = this.clearPath();
        prevAlgorithm.recalculatePath(grid, startPos, finishPos);
        let visitedInOrder = prevAlgorithm.produceVisitedInOrder();
        let finalPath = prevAlgorithm.produceFinalPath();
        for (let position of visitedInOrder) {
            grid[position.y][position.x].nodeType = IPathfinder_1.NodeType.Visited;
        }
        for (let position of finalPath) {
            grid[position.y][position.x].nodeType = IPathfinder_1.NodeType.ShortestPath;
        }
        this.setState({ grid: grid, startPos: startPos, finishPos: finishPos });
    }
    isStart(position) {
        return position.x === this.state.startPos.x && position.y === this.state.startPos.y;
    }
    isFinish(position) {
        return position.x === this.state.finishPos.x && position.y === this.state.finishPos.y;
    }
    performAlgorithm(algorithm) {
        this.setState({ prevAlgorithm: algorithm, mouseState: IPathfinder_1.MouseState.Disabled });
        algorithm.calculatePath(this.state.grid, this.state.startPos, this.state.finishPos);
        let visitedInOrder = algorithm.produceVisitedInOrder();
        let shortestPath = algorithm.produceFinalPath();
        this.visualiseAlgorithm(visitedInOrder, shortestPath);
    }
    visualiseAlgorithm(visitedInOrder, shortestPath) {
        (() => __awaiter(this, void 0, void 0, function* () {
            this.lockRender();
            yield this.visualiseVisited(visitedInOrder);
            yield this.visualisePath(shortestPath);
            this.unlockRender();
            this.setState({ mouseState: IPathfinder_1.MouseState.PlacingWall });
        }))();
    }
    visualiseVisited(visitedInOrder) {
        return new Promise((resolve) => {
            for (let i = 0; i <= visitedInOrder.length; i++) {
                setTimeout(() => {
                    if (i === visitedInOrder.length) {
                        resolve();
                    }
                    else {
                        let position = visitedInOrder[i];
                        let ref = this.references[position.y][position.x];
                        let className = ref.current.className;
                        if (!className.includes('cell-start') && !className.includes('cell-finish')) {
                            ref.current.className = 'cell cell-visited';
                            let grid = this.state.grid;
                            grid[position.y][position.x].nodeType = IPathfinder_1.NodeType.Visited;
                            this.setState({ grid: grid });
                        }
                    }
                }, IPathfinder_1.UPDATE_RATE * i);
            }
        });
    }
    visualisePath(shortestPath) {
        return new Promise((resolve) => {
            for (let i = 0; i <= shortestPath.length; i++) {
                setTimeout(() => {
                    if (i === shortestPath.length) {
                        resolve();
                    }
                    else {
                        let position = shortestPath[i];
                        let ref = this.references[position.y][position.x];
                        let className = ref.current.className;
                        if (!className.includes('cell-start') && !className.includes('cell-finish')) {
                            ref.current.className = 'cell cell-shortestPath';
                            let grid = this.state.grid;
                            grid[position.y][position.x].nodeType = IPathfinder_1.NodeType.ShortestPath;
                            this.setState({ grid: grid });
                        }
                    }
                }, IPathfinder_1.UPDATE_RATE * i);
            }
        });
    }
    lockRender() {
        this.setState({ updateLock: true });
    }
    unlockRender() {
        this.setState({ updateLock: false });
    }
    generateLandscape() {
        const STEEPNESS = 0.1;
        const perlin = new PerlinNoise_1.default();
        let grid = this.state.grid;
        for (let y = 0; y < IPathfinder_1.GRID_H; y++) {
            for (let x = 0; x < IPathfinder_1.GRID_W; x++) {
                let newWeight = perlin.noise(x * STEEPNESS, y * STEEPNESS, 0);
                grid[y][x].weight = newWeight;
            }
        }
        console.log(grid);
        this.setState({ grid: grid });
    }
    render() {
        let grid = this.state.grid;
        return (React.createElement("div", null,
            React.createElement(Navbar_1.default, { performAlgorithm: (algorithm) => this.performAlgorithm(algorithm), clearPath: () => this.setState({ prevAlgorithm: null, grid: this.clearPath() }), generateLandscape: () => this.generateLandscape() }),
            React.createElement("div", { className: "grid" }, grid.map((row, rowIdx) => {
                return (React.createElement("div", { className: "grid-row", key: rowIdx }, row.map((cell, colIdx) => {
                    return (React.createElement(Cell_1.default, { position: { x: colIdx, y: rowIdx }, isStart: this.state.startPos.x === colIdx && this.state.startPos.y === rowIdx, isFinish: this.state.finishPos.x === colIdx && this.state.finishPos.y === rowIdx, nodeType: cell.nodeType, weight: cell.weight, updateMouseState: (position, eventType) => this.updateMouseState(position, eventType), nodeRef: this.references[rowIdx][colIdx], key: colIdx }));
                })));
            }))));
    }
}
exports.default = Pathfinder;
//# sourceMappingURL=Pathfinder.js.map