import {Component} from "react";
import * as React from "react";
import PathfindingAlgorithm from "./Algorithms/PathfindingAlgorithm";
import Dijkstra from "./Algorithms/Dijkstra";
import DFS from "./Algorithms/DFS";
import BFS from "./Algorithms/BFS";

export default class extends Component<{performAlgorithm: (algorithm: PathfindingAlgorithm) => void, reset: () => void},{}> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render(): any {
        return (
            <div className="navbar">
                <button onClick={() => {this.props.performAlgorithm(new Dijkstra())}}>Djikstra</button>
                <button onClick={() => {this.props.performAlgorithm(new DFS())}}>DFS</button>
                <button onClick={() => {this.props.performAlgorithm(new BFS())}}>BFS</button>
                <button onClick={() => {this.props.reset()}}>Clear</button>
            </div>
        )
    }
}