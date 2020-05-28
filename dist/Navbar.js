"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const React = require("react");
const Dijkstra_1 = require("./Algorithms/Dijkstra");
const DFS_1 = require("./Algorithms/DFS");
const BFS_1 = require("./Algorithms/BFS");
class Navbar extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement("div", { className: "navbar" },
            React.createElement("button", { onClick: () => {
                    this.props.generateLandscape();
                } }, "Generate Landscape"),
            React.createElement("button", { onClick: () => {
                    this.props.performAlgorithm(new Dijkstra_1.default());
                } }, "Dijkstra"),
            React.createElement("button", { onClick: () => {
                    this.props.performAlgorithm(new DFS_1.default());
                } }, "DFS"),
            React.createElement("button", { onClick: () => {
                    this.props.performAlgorithm(new BFS_1.default());
                } }, "BFS"),
            React.createElement("button", { onClick: () => {
                    this.props.clearPath();
                } }, "Clear")));
    }
}
exports.default = Navbar;
//# sourceMappingURL=Navbar.js.map