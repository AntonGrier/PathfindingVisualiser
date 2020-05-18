!function(t){var e={};function s(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(i,o,function(e){return t[e]}.bind(null,o));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=3)}([function(t,e){t.exports=React},function(t,e,s){"use strict";var i=this&&this.__awaiter||function(t,e,s,i){return new(s||(s=Promise))((function(o,n){function a(t){try{h(i.next(t))}catch(t){n(t)}}function r(t){try{h(i.throw(t))}catch(t){n(t)}}function h(t){var e;t.done?o(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(a,r)}h((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const o=s(0),n=s(0),a=s(6),r=s(7);e.GRIDW=50,e.GRIDH=27;const h={x:Math.floor(e.GRIDW/4),y:Math.floor(e.GRIDH/2)},l={x:e.GRIDW-h.x,y:h.y};var u,c;!function(t){t[t.PlacingWall=0]="PlacingWall",t[t.RemovingWall=1]="RemovingWall",t[t.MovingStart=2]="MovingStart",t[t.MovingFinish=3]="MovingFinish"}(u=e.MouseState||(e.MouseState={})),function(t){t[t.Unvisited=0]="Unvisited",t[t.Visited=1]="Visited",t[t.Wall=2]="Wall",t[t.ShortestPath=3]="ShortestPath"}(c=e.NodeType||(e.NodeType={}));class p extends n.Component{constructor(t){super(t),this.state={grid:[],startPos:null,finishPos:null,mouseState:null,isMouseDown:!1}}componentDidMount(){let t=[];for(let s=0;s<e.GRIDH;s++){let i=[];for(let t=0;t<e.GRIDW;t++){let e={position:{x:t,y:s},nodeType:c.Unvisited};i.push(e)}t.push(i)}this.references=t.map(t=>t.map(()=>n.createRef())),this.setState({grid:t,startPos:h,finishPos:l,mouseState:u.PlacingWall,isMouseDown:!1})}updateMouseState(t,e){switch(e){case"mousedown":this.onMouseDown(t);break;case"mouseup":this.onMouseUp();break;case"mouseenter":this.onMouseEnter(t)}}onMouseDown(t){let{grid:e,mouseState:s,isMouseDown:i}=this.state,o=e[t.y][t.x].nodeType;s===u.MovingStart&&this.isFinish(t)||s===u.MovingFinish&&this.isStart(t)||(s=this.isStart(t)?u.MovingStart:this.isFinish(t)?u.MovingFinish:o===c.Unvisited?u.PlacingWall:u.RemovingWall,this.isStart(t)||this.isFinish(t)||(o===c.Wall?e[t.y][t.x].nodeType=c.Unvisited:e[t.y][t.x].nodeType=c.Wall),i=!0,this.setState({grid:e,mouseState:s,isMouseDown:i}))}onMouseUp(){let t=u.PlacingWall;this.setState({mouseState:t,isMouseDown:!1})}onMouseEnter(t){let{grid:e,startPos:s,finishPos:i,mouseState:o,isMouseDown:n}=this.state;if(n&&!this.isStart(t)&&!this.isFinish(t))switch(o){case u.MovingStart:s=t,this.setState({startPos:s});break;case u.MovingFinish:i=t,this.setState({finishPos:i});break;case u.PlacingWall:e[t.y][t.x].nodeType=c.Wall,this.setState({grid:e});break;case u.RemovingWall:e[t.y][t.x].nodeType=c.Unvisited,this.setState({grid:e})}}isStart(t){return t.x===this.state.startPos.x&&t.y===this.state.startPos.y}isFinish(t){return t.x===this.state.finishPos.x&&t.y===this.state.finishPos.y}performAlgorithm(t){t.calculatePath(this.state.grid,this.state.startPos,this.state.finishPos);let e=t.produceVisitedInOrder(),s=t.produceFinalPath();this.visualiseAlgorithm(e,s)}visualiseAlgorithm(t,e){(()=>{i(this,void 0,void 0,(function*(){yield this.visualiseVisited(t),yield this.visualisePath(e)}))})()}visualiseVisited(t){return new Promise(e=>{let s=0;setInterval(()=>{if(s===t.length)e();else{let e=t[s];this.references[e.y][e.x].current.className="cell cell-visited",s++}},15*s)})}visualisePath(t){return new Promise(e=>{let s=0;setInterval(()=>{if(s===t.length)e();else{let e=t[s];this.references[e.y][e.x].current.className="cell cell-shortestPath",s++}},15*s)})}render(){let t=this.state.grid;return o.createElement("div",null,o.createElement(r.default,{performAlgorithm:t=>this.performAlgorithm(t)}),o.createElement("div",{className:"grid"},t.map((t,e)=>o.createElement("div",{className:"grid-row",key:e},t.map((t,s)=>o.createElement(a.default,{position:{x:s,y:e},isStart:this.state.startPos.x===s&&this.state.startPos.y===e,isFinish:this.state.finishPos.x===s&&this.state.finishPos.y===e,nodeType:t.nodeType,updateMouseState:(t,e)=>this.updateMouseState(t,e),nodeRef:this.references[e][s],key:s}))))))}}e.default=p},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(1);e.default=class{constructor(){this.pathValues=new Map,this.finalPath=[],this.visitedNodesInOrder=[]}produceVisitedInOrder(){return this.visitedNodesInOrder}produceFinalPath(){return this.finalPath}getNeighbors(t,e){let s=[];return e.x>0&&s.push({x:e.x-1,y:e.y}),e.y<t.length-1&&s.push({x:e.x,y:e.y+1}),e.x<t[0].length-1&&s.push({x:e.x+1,y:e.y}),e.y>0&&s.push({x:e.x,y:e.y-1}),s.filter(e=>t[e.y][e.x].nodeType!==i.NodeType.Wall&&!this.isVisited(e))}isVisited(t){return this.pathValues.get(this.hash(t)).isVisited}markAsVisited(t){this.visitedNodesInOrder.push(t);let e=this.pathValues.get(this.hash(t)),s=Object.assign(Object.assign({},e),{isVisited:!0});this.pathValues.set(this.hash(t),s)}equalPosition(t,e){return t.x===e.x&&t.y===e.y}hash(t){return t.x.toString()+"-"+t.y.toString()}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0),o=s(4),n=s(5);o.render(i.createElement(n.default,null),document.getElementById("root"))},function(t,e){t.exports=ReactDOM},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0),o=s(1),n=s(0);class a extends n.Component{constructor(t){super(t),this.state={}}render(){return i.createElement("div",{className:"app"},i.createElement(o.default,null))}}e.default=a},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0),o=s(0),n=s(1);class a extends o.Component{constructor(t){super(t),this.state={}}handleMouseEvent(t){let e=t.type,s=this.props.position;this.props.updateMouseState(s,e)}render(){let t,{isStart:e,isFinish:s,nodeType:o}=this.props;if(e||s)t=e?"cell-start":s?"cell-finish":"";else switch(o){case n.NodeType.Unvisited:t="cell-unvisited";break;case n.NodeType.Visited:t="cell-visited";break;case n.NodeType.Wall:t="cell-wall";break;case n.NodeType.ShortestPath:t="cell-shortestPath"}return i.createElement("div",{ref:this.props.nodeRef,id:`cell-${this.props.position.x}-${this.props.position.y}`,className:"cell "+t,onMouseDown:t=>this.handleMouseEvent(t),onMouseUp:t=>this.handleMouseEvent(t),onMouseEnter:t=>this.handleMouseEvent(t)})}}e.default=a},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0),o=s(0),n=s(8),a=s(10),r=s(12);class h extends i.Component{constructor(t){super(t),this.state={}}render(){return o.createElement("div",{className:"navbar"},o.createElement("button",{onClick:()=>{this.props.performAlgorithm(new n.default)}},"Djikstra"),o.createElement("button",{onClick:()=>{this.props.performAlgorithm(new a.default)}},"DFS"),o.createElement("button",{onClick:()=>{this.props.performAlgorithm(new r.default)}},"BFS"))}}e.default=h},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(2),o=s(9);class n extends i.default{constructor(){super(...arguments),this.minHeap=new o.PriorityQueue}calculatePath(t,e,s){for(this.setMap(t,e),this.minHeap.insert(e,0);0!==this.minHeap.size();){let i=this.minHeap.pop();if(console.log(i),this.markAsVisited(i),this.equalPosition(i,s))return console.log("FINISH REACHED"),void this.findShortestPath(e);let o=this.getNeighbors(t,i),n=this.pathValues.get(this.hash(i)).shortestPath;for(let t of o){let e=n+1,s=this.pathValues.get(this.hash(t));if(this.minHeap.insert(t,e),e<s.shortestPath){let s={shortestPath:e,isVisited:!0,previousNode:i};this.pathValues.set(this.hash(t),s)}}}}setMap(t,e){t.forEach(t=>t.forEach(t=>{let s,i=t.position;s=this.equalPosition(e,i)?0:1/0;let o={shortestPath:s,isVisited:!1,previousNode:null};this.pathValues.set(this.hash(i),o)}))}findShortestPath(t){for(let e=t;null!=e;e=this.pathValues.get(this.hash(e)).previousNode)this.finalPath.unshift(e)}}e.default=n},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.PriorityQueue=class{constructor(){this.heap=[]}insert(t,e){if(!this.heap.length||this.heap[this.heap.length-1][1]>e)return this.heap.push([t,e]),this.heap;const s=[];let i=!1;for(let o=0;o<this.heap.length;o++){e>=this.heap[o][1]&&!i&&(s.push([t,e]),i=!0),s.push(this.heap[o])}return this.heap=s}has({x:t,y:e}){return!!this.heap.find(([s])=>s.x===t&&s.y===e)}get({x:t,y:e}){const s=this.heap.find(([s])=>s.x===t&&s.y===e);return s&&s[0]}shift(t){const e=this.heap.shift();return t?e:e?e[0]:void 0}pop(){return this.heap.pop()[0]}priorities(){return this.heap.map(([t,e])=>e)}values(){return this.heap.map(([t])=>t)}size(){return this.heap.length}toArray(t){return t?this.heap.map(([t])=>t):this.heap}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(2),o=s(11);class n extends i.default{constructor(){super(...arguments),this.stack=new o.default}calculatePath(t,e,s){for(this.setMap(t),this.stack.push(e);!this.stack.isEmpty();){let e=this.stack.pop();if(this.markAsVisited(e),this.equalPosition(e,s))return void(this.finalPath=this.visitedNodesInOrder);let i=this.getNeighbors(t,e);for(let t of i)this.stack.push(t)}}setMap(t){t.forEach(t=>{t.forEach(t=>{let e=t.position;this.pathValues.set(this.hash(e),{isVisited:!1})})})}}e.default=n},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(){this.data=[],this.top=0}push(t){this.data[this.top]=t,this.top++}pop(){return this.top--,this.data[this.top]}isEmpty(){return 0===this.top}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(2),o=s(13);class n extends i.default{constructor(){super(...arguments),this.queue=new o.default}calculatePath(t,e,s){for(this.setMap(t),this.queue.push(e);!this.queue.isEmpty();){let e=this.queue.pop();if(console.log(e),this.markAsVisited(e),this.equalPosition(e,s))return void this.findShortestPath(s);let i=this.getNeighbors(t,e);for(let t of i)this.queue.push(t),this.pathValues.set(this.hash(t),{isVisited:!0,previousNode:e})}}setMap(t){t.forEach(t=>{t.forEach(t=>{let e=t.position;this.pathValues.set(this.hash(e),{isVisited:!1,previousNode:null})})})}findShortestPath(t){for(let e=t;null!=e;e=this.pathValues.get(this.hash(e)).previousNode)this.finalPath.unshift(e)}}e.default=n},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(){this.data=[]}push(t){this.data.push(t)}pop(){return this.data.shift()}isEmpty(){return 0===this.data.length}}}]);
//# sourceMappingURL=main.js.map