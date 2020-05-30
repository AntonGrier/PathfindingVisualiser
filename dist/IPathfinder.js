"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeType = exports.MouseState = exports.UPDATE_RATE = exports.DEFAULT_FINISH_POS = exports.DEFAULT_START_POS = exports.GRID_H = exports.GRID_W = void 0;
exports.GRID_W = 41;
exports.GRID_H = 20;
exports.DEFAULT_START_POS = { x: Math.floor(exports.GRID_W / 4), y: Math.floor(exports.GRID_H / 2) };
exports.DEFAULT_FINISH_POS = { x: exports.GRID_W - exports.DEFAULT_START_POS.x, y: exports.DEFAULT_START_POS.y };
exports.UPDATE_RATE = 5;
var MouseState;
(function (MouseState) {
    MouseState[MouseState["PlacingWall"] = 0] = "PlacingWall";
    MouseState[MouseState["RemovingWall"] = 1] = "RemovingWall";
    MouseState[MouseState["MovingStart"] = 2] = "MovingStart";
    MouseState[MouseState["MovingFinish"] = 3] = "MovingFinish";
    MouseState[MouseState["Disabled"] = 4] = "Disabled";
})(MouseState = exports.MouseState || (exports.MouseState = {}));
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Unvisited"] = 0] = "Unvisited";
    NodeType[NodeType["Visited"] = 1] = "Visited";
    NodeType[NodeType["Wall"] = 2] = "Wall";
    NodeType[NodeType["ShortestPath"] = 3] = "ShortestPath";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
//# sourceMappingURL=IPathfinder.js.map