import {Component} from "react";
import * as React from "react";
import {render} from "react-dom";
import PathfindingAlgorithm from "./Algorithms/PathfindingAlgorithm";
import Dijkstra from "./Algorithms/Dijkstra";

export default class extends Component<{performAlgorithm: (algorithm: PathfindingAlgorithm) => void},{}> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render(): any {
        return (
            <div className="navbar">
                <button onClick={() => {this.props.performAlgorithm(new Dijkstra())}}>Djikstra</button>
            </div>
        )
    }
}