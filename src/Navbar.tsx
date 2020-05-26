import { Component } from 'react';
import * as React from 'react';
import PathfindingAlgorithm from './Algorithms/PathfindingAlgorithm';
import Dijkstra from './Algorithms/Dijkstra';
import DFS from './Algorithms/DFS';
import BFS from './Algorithms/BFS';

export default class Navbar extends Component<
    { performAlgorithm: (algorithm: PathfindingAlgorithm) => void; clearPath: () => void },
    {}
> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render(): any {
        return (
            <div className="navbar">
                <button
                    onClick={() => {
                        this.props.performAlgorithm(new Dijkstra());
                    }}
                >
                    Dijkstra
                </button>
                <button
                    onClick={() => {
                        this.props.performAlgorithm(new DFS());
                    }}
                >
                    DFS
                </button>
                <button
                    onClick={() => {
                        this.props.performAlgorithm(new BFS());
                    }}
                >
                    BFS
                </button>
                <button
                    onClick={() => {
                        this.props.clearPath();
                    }}
                >
                    Clear
                </button>
            </div>
        );
    }
}
