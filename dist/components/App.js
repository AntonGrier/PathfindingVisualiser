"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Pathfinder_1 = require("../Pathfinder");
const react_1 = require("react");
class App extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement("div", { className: "app" },
            React.createElement(Pathfinder_1.default, null)));
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map