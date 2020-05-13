import * as React from "react";
import Pathfinder from "../Pathfinder";
import {Component} from "react";


export default class App extends Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render(): any {
        return (<div className="app">
            <Pathfinder/>
        </div>);
    }
}