import { Component } from 'react';
import * as React from 'react';
import PathfindingAlgorithm from './Algorithms/PathfindingAlgorithm';
import Dijkstra from './Algorithms/Dijkstra';
import DFS from './Algorithms/DFS';
import BFS from './Algorithms/BFS';
import MazeGenerator from './mazes/MazeGenerator';
import RecursiveDivision from './mazes/RecursiveDivision';
import RecursiveBacktracking from './mazes/RecursiveBacktracking';
import Ellers from './mazes/Ellers';
import AStar from './Algorithms/AStar';

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
            <ul>
                <li><a
                    onClick={() => {
                        this.props.generateMaze(new Ellers());
                    }}
                >
                    Ellers
                </a></li>
                <li><a
                    onClick={() => {
                        this.props.generateMaze(new RecursiveBacktracking());
                    }}
                >
                    Recursive BackTrack
                </a></li>
                <li><a
                    onClick={() => {
                        this.props.generateMaze(new RecursiveDivision());
                    }}
                >
                    Recursive Division
                </a></li>
                <li><a
                    onClick={() => {
                        this.props.generateLandscape();
                    }}
                >
                    Generate Landscape
                </a></li>
                <li><a
                    onClick={() => {
                        this.props.performAlgorithm(new AStar());
                    }}
                >
                    AStar
                </a></li>
                <li><a
                    onClick={() => {
                        this.props.performAlgorithm(new Dijkstra());
                    }}
                >
                    Dijkstra
                </a></li>
                <li><a
                    onClick={() => {
                        this.props.performAlgorithm(new DFS());
                    }}
                >
                    DFS
                </a></li>
                <li><a
                    onClick={() => {
                        this.props.performAlgorithm(new BFS());
                    }}
                >
                    BFS
                </a></li>
                <li><a
                    onClick={() => {
                        this.props.clearPath();
                    }}
                >
                    Clear
                </a></li> 
            </ul>
        );
    }
}
