import { Component } from 'react';
import * as React from 'react';
import PathfindingAlgorithm from './Algorithms/PathfindingAlgorithm';
import Dijkstra from './Algorithms/Dijkstra';
import DFS from './Algorithms/DFS';
import BFS from './Algorithms/BFS';
import MazeGenerator from './mazes/MazeGenerator';
import RecursiveDivision from './mazes/RecursiveDivision';
import RecursiveBacktracking from './mazes/RecursiveBacktracking';

interface Props {
    performAlgorithm: (algorithm: PathfindingAlgorithm) => void;
    clearPath: () => void;
    generateLandscape: () => void;
    generateMaze: (mazeGenerator: MazeGenerator) => void;
}

export default class Navbar extends Component<Props> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render(): any {
        return (
            <div className="navbar">
                <button
                    onClick={() => {
                        this.props.generateMaze(new RecursiveBacktracking());
                    }}
                >
                    Recursive BackTrack
                </button>
                <button
                    onClick={() => {
                        this.props.generateMaze(new RecursiveDivision());
                    }}
                >
                    Recursive Division
                </button>
                <button
                    onClick={() => {
                        this.props.generateLandscape();
                    }}
                >
                    Generate Landscape
                </button>
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
