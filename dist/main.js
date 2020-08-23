!function(e){var t={};function s(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(i,a,function(t){return e[t]}.bind(null,a));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=5)}([function(e,t){e.exports=React},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NodeType=t.MouseState=t.UPDATE_RATE=t.DEFAULT_FINISH_POS=t.DEFAULT_START_POS=t.GRID_H=t.GRID_W=void 0,t.GRID_W=61,t.GRID_H=27,t.DEFAULT_START_POS={x:Math.floor(t.GRID_W/4),y:Math.floor(t.GRID_H/2)},t.DEFAULT_FINISH_POS={x:t.GRID_W-t.DEFAULT_START_POS.x-1,y:t.DEFAULT_START_POS.y},t.UPDATE_RATE=5,function(e){e[e.PlacingWall=0]="PlacingWall",e[e.RemovingWall=1]="RemovingWall",e[e.MovingStart=2]="MovingStart",e[e.MovingFinish=3]="MovingFinish",e[e.MovingMidpoint=4]="MovingMidpoint",e[e.Disabled=5]="Disabled"}(t.MouseState||(t.MouseState={})),function(e){e[e.Unvisited=0]="Unvisited",e[e.VisitedOne=1]="VisitedOne",e[e.VisitedTwo=2]="VisitedTwo",e[e.VisitedOverlap=3]="VisitedOverlap",e[e.Wall=4]="Wall",e[e.ShortestPath=5]="ShortestPath"}(t.NodeType||(t.NodeType={}))},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(1);t.default=class{constructor(){this.pathValues=new Map,this.finalPath=[],this.visitedNodesInOrder=[]}produceVisitedInOrder(){return this.visitedNodesInOrder.slice(1,this.visitedNodesInOrder.length-1)}produceFinalPath(){return this.finalPath.slice(1,this.visitedNodesInOrder.length-1)}getNeighbors(e,t){let s=[];return s.push({x:t.x+1,y:t.y}),s.push({x:t.x,y:t.y+1}),s.push({x:t.x,y:t.y-1}),s.push({x:t.x-1,y:t.y}),s.push({x:t.x-1,y:t.y+1}),s.push({x:t.x+1,y:t.y+1}),s.push({x:t.x+1,y:t.y-1}),s.push({x:t.x-1,y:t.y-1}),s.filter(s=>s.x>=0&&s.x<i.GRID_W&&s.y>=0&&s.y<i.GRID_H&&e[s.y][s.x].nodeType!==i.NodeType.Wall&&!this.isVisited(s)&&this.cornerCheck(t,s,e))}cornerCheck(e,t,s){return s[e.y][t.x].nodeType!==i.NodeType.Wall||s[t.y][e.x].nodeType!==i.NodeType.Wall}isVisited(e){return this.pathValues.get(this.hash(e)).isVisited}markAsVisited(e){this.visitedNodesInOrder.push(e);let t=this.pathValues.get(this.hash(e)),s=Object.assign(Object.assign({},t),{isVisited:!0});this.pathValues.set(this.hash(e),s)}equalPosition(e,t){return e.x===t.x&&e.y===t.y}hash(e){return e.x.toString()+"-"+e.y.toString()}clear(){this.visitedNodesInOrder=[],this.finalPath=[],this.pathValues=new Map}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(1);t.default=class{getSetup(){let e=[];for(let t=0;t<i.GRID_W;t++){let s={x:t,y:0},a={x:t,y:i.GRID_H-1};e.push(s),e.push(a)}for(let t=1;t<i.GRID_H-1;t++){let s={x:0,y:t},a={x:i.GRID_W-1,y:t};e.push(s),e.push(a)}return e}getRandom(e,t){return e+Math.floor((t-e+1)*Math.random())}addWall(e){this.wallsCreatedInOrder.push(e)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ADJUSTED_HEIGHT=t.ADJUSTED_WIDTH=void 0;const i=s(3),a=s(1);t.ADJUSTED_WIDTH=(a.GRID_W-1)/2,t.ADJUSTED_HEIGHT=(a.GRID_H-1)/2;class r extends i.default{placeWallBetweenPositions(e,t){let s={x:Math.floor((e.x+t.x)/2),y:Math.floor((e.y+t.y)/2)};this.addWall(s)}positionInBounds(e){return e.x>0&&e.x<a.GRID_W-1&&e.y>0&&e.y<a.GRID_H-1}getSetup(){let e=[];for(let t=0;t<a.GRID_W;t++){let s={x:t,y:0},i={x:t,y:a.GRID_H-1};e.push(s),e.push(i)}for(let t=0;t<a.GRID_W;t+=2)for(let s=1;s<a.GRID_H-1;s++){let i={x:t,y:s};e.push(i)}for(let t=1;t<a.GRID_W-1;t+=2)for(let s=2;s<a.GRID_H-2;s+=2){let i={x:t,y:s};e.push(i)}return e}}t.default=r},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),a=s(6),r=s(7);a.render(i.createElement(r.default,null),document.getElementById("root"))},function(e,t){e.exports=ReactDOM},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),a=s(8),r=s(0);class o extends r.Component{constructor(e){super(e),this.state={}}render(){return i.createElement("div",{className:"app"},i.createElement(a.default,null))}}t.default=o},function(e,t,s){"use strict";var i=this&&this.__awaiter||function(e,t,s,i){return new(s||(s=Promise))((function(a,r){function o(e){try{l(i.next(e))}catch(e){r(e)}}function n(e){try{l(i.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(o,n)}l((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const a=s(0),r=s(1),o=s(0),n=s(9),l=s(10),h=s(20);class d extends o.Component{constructor(e){super(e),this.references=Array(r.GRID_H).fill([]).map(()=>Array(r.GRID_W).fill(0).map(()=>o.createRef()));let t=[];for(let e=0;e<r.GRID_H;e++){let s=[];for(let t=0;t<r.GRID_W;t++){let i={position:{x:t,y:e},nodeType:r.NodeType.Unvisited,weight:0};s.push(i)}t.push(s)}this.state={grid:t,startPos:r.DEFAULT_START_POS,finishPos:r.DEFAULT_FINISH_POS,midpointPos:null,mouseState:r.MouseState.PlacingWall,isMouseDown:!1,updateLock:!1,perlinToggle:!1,prevAlgorithm:null}}shouldComponentUpdate(e,t){return!t.updateLock}clearPath(){let e=this.state.grid;return e=e.map(e=>e.map(e=>Object.assign(Object.assign({},e),{nodeType:e.nodeType===r.NodeType.Wall?r.NodeType.Wall:r.NodeType.Unvisited}))),e}updateMouseState(e,t){if(this.state.mouseState!==r.MouseState.Disabled)switch(t){case"mousedown":this.onMouseDown(e);break;case"mouseup":this.onMouseUp();break;case"mouseenter":this.onMouseEnter(e)}}onMouseDown(e){let{grid:t,mouseState:s,isMouseDown:i,prevAlgorithm:a}=this.state,o=t[e.y][e.x].nodeType;(s!==r.MouseState.MovingStart&&s!==r.MouseState.MovingFinish&&s!==r.MouseState.MovingMidpoint||this.isEmpty(e))&&(s=this.isStart(e)?r.MouseState.MovingStart:this.isFinish(e)?r.MouseState.MovingFinish:this.isMidpoint(e)?r.MouseState.MovingMidpoint:o===r.NodeType.Unvisited?r.MouseState.PlacingWall:r.MouseState.RemovingWall,this.isEmpty(e)&&(null!==a&&(t=this.clearPath(),a=null),o===r.NodeType.Wall?t[e.y][e.x].nodeType=r.NodeType.Unvisited:t[e.y][e.x].nodeType=r.NodeType.Wall),i=!0,this.setState({grid:t,mouseState:s,isMouseDown:i,prevAlgorithm:a}))}onMouseUp(){let e=r.MouseState.PlacingWall;this.setState({mouseState:e,isMouseDown:!1})}onMouseEnter(e){let{grid:t,startPos:s,finishPos:i,midpointPos:a,mouseState:o,isMouseDown:n,prevAlgorithm:l}=this.state;if(n&&!this.isStart(e)&&!this.isFinish(e)&&!this.isMidpoint(e))switch(o){case r.MouseState.MovingStart:s=e,null!==l?this.recalculatePath(s,i,a,l):this.setState({startPos:s});break;case r.MouseState.MovingFinish:i=e,null!==l?this.recalculatePath(s,i,a,l):this.setState({finishPos:i});break;case r.MouseState.MovingMidpoint:a=e,null!==l?this.recalculatePath(s,i,a,l):this.setState({midpointPos:a});break;case r.MouseState.PlacingWall:t[e.y][e.x].nodeType=r.NodeType.Wall,this.setState({grid:t});break;case r.MouseState.RemovingWall:t[e.y][e.x].nodeType=r.NodeType.Unvisited,this.setState({grid:t})}}recalculatePath(e,t,s,i){let a=this.clearPath(),o=[],n=[];null===s?(i.calculatePath(a,e,t),o.push(i.produceVisitedInOrder()),n.push(i.produceFinalPath())):(i.calculatePath(a,e,s),o.push(i.produceVisitedInOrder()),n.push(i.produceFinalPath()),i.calculatePath(a,s,t),o.push(i.produceVisitedInOrder()),n.push(i.produceFinalPath())),console.log(o);for(let e=0;e<o.length;e++){let t=o[e];for(let s of t)0===e?a[s.y][s.x].nodeType=r.NodeType.VisitedOne:a[s.y][s.x].nodeType===r.NodeType.VisitedOne?a[s.y][s.x].nodeType=r.NodeType.VisitedOverlap:a[s.y][s.x].nodeType=r.NodeType.VisitedTwo}for(let e of n)for(let t of e)a[t.y][t.x].nodeType=r.NodeType.ShortestPath;this.setState({grid:a,startPos:e,finishPos:t,midpointPos:s})}isEmpty(e){return!this.isStart(e)&&!this.isFinish(e)&&!this.isMidpoint(e)}isStart(e){return e.x===this.state.startPos.x&&e.y===this.state.startPos.y}isFinish(e){return e.x===this.state.finishPos.x&&e.y===this.state.finishPos.y}isMidpoint(e){return null!==this.state.midpointPos&&e.x===this.state.midpointPos.x&&e.y===this.state.midpointPos.y}performAlgorithm(e){let t=this.state.midpointPos;this.setState({prevAlgorithm:e,mouseState:r.MouseState.Disabled});let s=[],i=[];null===t?(e.calculatePath(this.state.grid,this.state.startPos,this.state.finishPos),s.push(e.produceVisitedInOrder()),i.push(e.produceFinalPath())):(e.calculatePath(this.state.grid,this.state.startPos,this.state.midpointPos),s.push(e.produceVisitedInOrder()),i.push(e.produceFinalPath()),e.calculatePath(this.state.grid,this.state.midpointPos,this.state.finishPos),s.push(e.produceVisitedInOrder()),i.push(e.produceFinalPath())),this.visualiseAlgorithm(s,i),this.setState({mouseState:r.MouseState.PlacingWall})}visualiseAlgorithm(e,t){(()=>{i(this,void 0,void 0,(function*(){this.lockRender();for(let t=0;t<e.length;t++){let s=e[t];yield this.visualiseVisited(s,t)}yield this.visualisePath([].concat(...t)),this.unlockRender()}))})()}visualiseVisited(e,t){return new Promise(s=>{for(let i=0;i<=e.length;i++)setTimeout(()=>{if(i===e.length)setTimeout(()=>{s()},r.UPDATE_RATE);else{let s=e[i],a=this.references[s.y][s.x],o=a.current.className;if(!o.includes("cell-start")&&!o.includes("cell-finish")&&!o.includes("cell-midpoint")){o.includes("cell-visited-0")?a.current.className="cell cell-visited-overlap":a.current.className="cell cell-visited-"+t;let e=this.state.grid;0===t?e[s.y][s.x].nodeType=r.NodeType.VisitedOne:e[s.y][s.x].nodeType===r.NodeType.VisitedOne?e[s.y][s.x].nodeType=r.NodeType.VisitedOverlap:e[s.y][s.x].nodeType=r.NodeType.VisitedTwo,this.setState({grid:e})}}},r.UPDATE_RATE*i)})}visualisePath(e){return new Promise(t=>{for(let s=0;s<=e.length;s++)setTimeout(()=>{if(s===e.length)setTimeout(()=>{t()},r.UPDATE_RATE);else{let t=e[s],i=this.references[t.y][t.x],a=i.current.className;if(!a.includes("cell-start")&&!a.includes("cell-finish")&&!a.includes("cell-midpoint")){i.current.className="cell cell-shortestPath";let e=this.state.grid;e[t.y][t.x].nodeType=r.NodeType.ShortestPath,this.setState({grid:e})}}},r.UPDATE_RATE*s)})}lockRender(){this.setState({updateLock:!0})}unlockRender(){this.setState({updateLock:!1})}generateLandscape(){const e=new h.default,t=Math.floor(1e4*Math.random());let s=this.state.grid;for(let i=0;i<r.GRID_H;i++)for(let a=0;a<r.GRID_W;a++){let r=e.noise(.2*a+t,.2*i+t,0);s[i][a].weight=r}console.log(s),this.setState({grid:s})}generateMaze(e){(()=>{i(this,void 0,void 0,(function*(){this.lockRender();let t=e.getSetup(),s=e.generateWalls();yield this.setupStartingWalls(t),yield this.visualizeMaze(s),this.unlockRender(),this.setState({mouseState:r.MouseState.PlacingWall})}))})()}setupStartingWalls(e){return new Promise(t=>{for(let s=0;s<=e.length;s++)if(s===e.length)setTimeout(()=>{t()},1e3);else{let t=this.state.grid,i=e[s],a=this.references[i.y][i.x],o=a.current.className;t[i.y][i.x].nodeType=r.NodeType.Wall,o.includes("cell-start")||o.includes("cell-finish")||o.includes("cell-midpoint")||(a.current.className="cell cell-wall"),this.setState({grid:t})}})}visualizeMaze(e){return new Promise(t=>{for(let s=0;s<=e.length;s++)setTimeout(()=>{if(s===e.length)setTimeout(()=>{t()},r.UPDATE_RATE);else{let t=this.state.grid,i=e[s],a=this.references[i.y][i.x],o=a.current.className;this.wallAlreadyPlaced(i)?(o.includes("cell-start")||o.includes("cell-finish")||(a.current.className="cell cell-unvisited"),t[i.y][i.x].nodeType=r.NodeType.Unvisited):(o.includes("cell-start")||o.includes("cell-finish")||o.includes("cell-midpoint")||(a.current.className="cell cell-wall"),t[i.y][i.x].nodeType=r.NodeType.Wall),this.setState({grid:t})}},r.UPDATE_RATE*s)})}wallAlreadyPlaced(e){return this.state.grid[e.y][e.x].nodeType===r.NodeType.Wall}setMidpoint(e){let t=this.state.prevAlgorithm,s=this.state.grid;if(!this.isStart(e)&&!this.isFinish(e)){let i;i=this.isMidpoint(e)?null:e,null!==t&&(t=null,s=this.clearPath()),this.setState({grid:s,prevAlgorithm:t,midpointPos:i})}}render(){const e=this.state.grid;return a.createElement("div",null,a.createElement(l.default,{performAlgorithm:e=>this.performAlgorithm(e),clearPath:()=>this.setState({prevAlgorithm:null,grid:this.clearPath()}),generateLandscape:()=>this.generateLandscape(),generateMaze:e=>this.generateMaze(e)}),a.createElement("div",{className:"grid"},e.map((e,t)=>a.createElement("div",{className:"grid-row",key:t},e.map((e,s)=>{let i={x:s,y:t};return a.createElement(n.default,{position:{x:s,y:t},isStart:this.isStart(i),isFinish:this.isFinish(i),isMidpoint:this.isMidpoint(i),nodeType:e.nodeType,weight:e.weight,updateMouseState:(e,t)=>this.updateMouseState(e,t),setMidpoint:e=>this.setMidpoint(e),nodeRef:this.references[t][s],key:s})})))))}}t.default=d},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),a=s(0),r=s(1);class o extends a.Component{constructor(e){super(e),this.state={}}handleMouseEvent(e){let t=this.props.position;if(1===e.nativeEvent.which){let s=e.type;this.props.updateMouseState(t,s)}else 3===e.nativeEvent.which&&"mousedown"===e.type&&this.props.setMidpoint(t)}convertWeightToGreyscale(e){const t=55+200*(e=1-e);return`rgb(${t},${t},${t})`}render(){let e,{isStart:t,isFinish:s,isMidpoint:a,nodeType:o,weight:n}=this.props;if(t||s||a)e=t?"cell-start":s?"cell-finish":a?"cell-midpoint":"";else switch(o){case r.NodeType.Unvisited:e="cell-unvisited";break;case r.NodeType.VisitedOne:e="cell-visited-0";break;case r.NodeType.VisitedTwo:e="cell-visited-1";break;case r.NodeType.VisitedOverlap:e="cell-visited-overlap";break;case r.NodeType.Wall:e="cell-wall";break;case r.NodeType.ShortestPath:e="cell-shortestPath"}let l={};return o!==r.NodeType.Wall&&o!==r.NodeType.ShortestPath&&!t&&!s&&n>0&&(l={backgroundColor:this.convertWeightToGreyscale(n)}),i.createElement("div",{ref:this.props.nodeRef,id:`cell-${this.props.position.x}-${this.props.position.y}`,className:"cell "+e,style:Object.assign({},l),onMouseDown:e=>this.handleMouseEvent(e),onMouseUp:e=>this.handleMouseEvent(e),onMouseEnter:e=>this.handleMouseEvent(e),onContextMenu:e=>e.preventDefault()})}}t.default=o},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),a=s(0),r=s(11),o=s(13),n=s(15),l=s(17),h=s(18),d=s(19);class u extends i.Component{constructor(e){super(e),this.state={}}render(){return a.createElement("div",{className:"navbar"},a.createElement("button",{onClick:()=>{this.props.generateMaze(new d.default)}},"Ellers"),a.createElement("button",{onClick:()=>{this.props.generateMaze(new h.default)}},"Recursive BackTrack"),a.createElement("button",{onClick:()=>{this.props.generateMaze(new l.default)}},"Recursive Division"),a.createElement("button",{onClick:()=>{this.props.generateLandscape()}},"Generate Landscape"),a.createElement("button",{onClick:()=>{this.props.performAlgorithm(new r.default)}},"Dijkstra"),a.createElement("button",{onClick:()=>{this.props.performAlgorithm(new o.default)}},"DFS"),a.createElement("button",{onClick:()=>{this.props.performAlgorithm(new n.default)}},"BFS"),a.createElement("button",{onClick:()=>{this.props.clearPath()}},"Clear"))}}t.default=u},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(2),a=s(12);class r extends i.default{constructor(){super(...arguments),this.minHeap=new a.PriorityQueue}calculatePath(e,t,s){for(this.reset(),this.setMap(e,t),this.minHeap.insert(t,0);0!==this.minHeap.size();){let t=this.minHeap.pop();if(this.markAsVisited(t),this.equalPosition(t,s))return void this.findShortestPath(s);let i=this.getNeighbors(e,t),a=this.pathValues.get(this.hash(t)).shortestPath;for(let s of i){let i=a+this.getDistance(e,t,s),r=this.pathValues.get(this.hash(s));if(this.minHeap.insert(s,i),i<r.shortestPath){let e={shortestPath:i,isVisited:!0,previousNode:t};this.pathValues.set(this.hash(s),e)}}}}getDistance(e,t,s){let i=e[s.y][s.x].weight-e[t.y][t.x].weight;return Math.pow(1e4,i)*Math.sqrt(Math.pow(Math.abs(t.x-s.x),2)+Math.pow(Math.abs(t.y-s.y),2))}setMap(e,t){e.forEach(e=>e.forEach(e=>{let s,i=e.position;s=this.equalPosition(t,i)?0:1/0;let a={shortestPath:s,isVisited:!1,previousNode:null};this.pathValues.set(this.hash(i),a)}))}findShortestPath(e){for(let t=e;null!=t;t=this.pathValues.get(this.hash(t)).previousNode)this.finalPath.unshift(t)}reset(){this.clear(),this.minHeap=new a.PriorityQueue}}t.default=r},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PriorityQueue=void 0;t.PriorityQueue=class{constructor(){this.heap=[]}insert(e,t){if(!this.heap.length||this.heap[this.heap.length-1][1]>t)return this.heap.push([e,t]),this.heap;const s=[];let i=!1;for(let a=0;a<this.heap.length;a++){t>=this.heap[a][1]&&!i&&(s.push([e,t]),i=!0),s.push(this.heap[a])}return this.heap=s}has({x:e,y:t}){return!!this.heap.find(([s])=>s.x===e&&s.y===t)}get({x:e,y:t}){const s=this.heap.find(([s])=>s.x===e&&s.y===t);return s&&s[0]}shift(e){const t=this.heap.shift();return e?t:t?t[0]:void 0}pop(){return this.heap.pop()[0]}priorities(){return this.heap.map(([e,t])=>t)}values(){return this.heap.map(([e])=>e)}size(){return this.heap.length}toArray(e){return e?this.heap.map(([e])=>e):this.heap}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(2),a=s(14);class r extends i.default{constructor(){super(...arguments),this.stack=new a.default}calculatePath(e,t,s){for(this.reset(),this.setMap(e),this.stack.push(t);!this.stack.isEmpty();){let t=this.stack.pop();if(this.markAsVisited(t),this.equalPosition(t,s))return void(this.finalPath=this.visitedNodesInOrder);let i=this.getNeighbors(e,t).reverse();for(let e of i)this.stack.push(e)}}setMap(e){e.forEach(e=>{e.forEach(e=>{let t=e.position;this.pathValues.set(this.hash(t),{isVisited:!1})})})}reset(){this.clear(),this.stack=new a.default}}t.default=r},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(){this.data=new Array,this.top=0}push(e){this.data[this.top]=e,this.top++}pop(){return this.top--,this.data[this.top]}isEmpty(){return 0===this.top}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(2),a=s(16);class r extends i.default{constructor(){super(...arguments),this.queue=new a.default}calculatePath(e,t,s){for(this.reset(),this.setMap(e),this.queue.push(t);!this.queue.isEmpty();){let t=this.queue.pop();if(this.markAsVisited(t),this.equalPosition(t,s))return void this.findShortestPath(s);let i=this.getNeighbors(e,t);for(let e of i)this.queue.push(e),this.pathValues.set(this.hash(e),{isVisited:!0,previousNode:t})}}setMap(e){e.forEach(e=>{e.forEach(e=>{let t=e.position;this.pathValues.set(this.hash(t),{isVisited:!1,previousNode:null})})})}findShortestPath(e){for(let t=e;null!=t;t=this.pathValues.get(this.hash(t)).previousNode)this.finalPath.unshift(t)}reset(){this.clear(),this.queue=new a.default}}t.default=r},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(){this.data=[]}push(e){this.data.push(e)}pop(){return this.data.shift()}isEmpty(){return 0===this.data.length}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(3),a=s(1);class r extends i.default{generateWalls(){this.wallsCreatedInOrder=[];const e={x:a.GRID_W-1,y:a.GRID_H-1};return this.divide({x:0,y:0},e),this.wallsCreatedInOrder}divide(e,t){let s,i,a,r,o=t.x-e.x+1,n=t.y-e.y+1,l=o>n;if(l){if(o<4)return;s=this.randomEven(e.x,t.x),console.log(s),i={x:s,y:this.randomOdd(e.y,t.y)},console.log(`Trying ${s}, gap (${i.x},${i.y}) width: ${o} height: ${n}`)}else{if(n<4)return;s=this.randomEven(e.y,t.y),console.log(s),i={x:this.randomOdd(e.x,t.x),y:s},console.log(`Trying ${s}, gap (${i.x},${i.y}) width: ${o} height: ${n}`)}for(let a=l?e.y+1:e.x+1;a<=(l?t.y-1:t.x-1);a++){if(a===(l?i.y:i.x))continue;let e;e=l?{x:s,y:a}:{x:a,y:s},this.wallsCreatedInOrder.push(e)}l?(a={x:s,y:t.y},r={x:s,y:e.y}):(a={x:t.x,y:s},r={x:e.x,y:s}),this.divide(e,a),this.divide(r,t)}randomEven(e,t){return(e+=2)%2==1&&e++,(t-=2)%2==1&&t--,e+2*this.getRandom(0,(t-e)/2)}randomOdd(e,t){return(e+=2)%2==0&&e++,(t-=2)%2==0&&t--,e+2*this.getRandom(0,(t-e)/2)}hash(e){return e.x.toString()+"-"+e.y.toString()}}t.default=r},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(1),a=s(4);class r extends a.default{generateWalls(){this.wallsCreatedInOrder=[],this.visited=new Map;let e={x:2*this.getRandom(1,(i.GRID_W-1)/2)-1,y:2*this.getRandom(1,(i.GRID_H-1)/2)-1};return this.carveWalls(e),this.wallsCreatedInOrder}carveWalls(e){this.visit(e);let t=this.getUnvisitedNeighbors(e);for(let s of t)console.log(s),this.isVisisted(s)||(this.placeWallBetweenPositions(e,s),this.carveWalls(s))}getUnvisitedNeighbors(e){let t=[{x:e.x+2,y:e.y},{x:e.x,y:e.y-2},{x:e.x-2,y:e.y},{x:e.x,y:e.y+2}];return t=t.filter(e=>this.positionInBounds(e)),this.randomisePositions(t)}randomisePositions(e){return e.sort(()=>Math.random()-.5)}visit(e){this.visited.set(this.hash(e),!0)}isVisisted(e){return this.visited.has(this.hash(e))}hash(e){return e.x.toString()+"-"+e.y.toString()}}t.default=r},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(4);class a extends i.default{generateWalls(){return this.wallsCreatedInOrder=[],this.generateMaze(),this.wallsCreatedInOrder}generateMaze(){let e=new r;e=this.mergeRow(e,0,!0);for(let t=1;t<i.ADJUSTED_HEIGHT;t++){let s=e;e=this.extendToNextRow(e,s,t),e=this.mergeRow(e,t,t!==i.ADJUSTED_HEIGHT-1)}}extendToNextRow(e,t,s){e=new r;for(let a=0;a<i.ADJUSTED_WIDTH;a++)t.isRoot(a)?(e.addEntry(a,-1),this.addTopWall({x:a,y:s})):this.randomBool()&&(e.addEntry(a,t.getEntry(a)),this.addTopWall({x:a,y:s}));return e}mergeRow(e,t,s){for(let a=0;a<i.ADJUSTED_WIDTH-1;a++)!this.randomBool()&&s||e.sameClass(a,a+1)||(e.mergeSets(a,a+1),this.addRightWall({x:a,y:t}));return e}addRightWall(e){this.addWall({x:2*e.x+2,y:2*e.y+1})}addTopWall(e){this.addWall({x:2*e.x+1,y:2*e.y})}randomBool(){return Math.random()>=.5}}t.default=a;class r{constructor(){this.data=Array(i.ADJUSTED_WIDTH).fill(-1)}mergeSets(e,t){-1===this.data[e]?this.data[e]=this.getRoot(t):this.data[t]=this.getRoot(e)}sameClass(e,t){return this.getRoot(e)===this.getRoot(t)}getRoot(e){for(;-1!==this.data[e];)e=this.data[e];return e}isRoot(e){return-1===this.data[e]}addEntry(e,t){this.data[e]=t}getEntry(e){return this.getRoot(e)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(){this.permutation=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],this.p=new Array(512);for(var e=0;e<256;e++)this.p[256+e]=this.p[e]=this.permutation[e]}noise(e,t,s){var i=255&Math.floor(e),a=255&Math.floor(t),r=255&Math.floor(s);e-=Math.floor(e),t-=Math.floor(t),s-=Math.floor(s);var o=this.fade(e),n=this.fade(t),l=this.fade(s),h=this.p[i]+a,d=this.p[h]+r,u=this.p[h+1]+r,p=this.p[i+1]+a,c=this.p[p]+r,y=this.p[p+1]+r;return this.scale(this.lerp(l,this.lerp(n,this.lerp(o,this.grad(this.p[d],e,t,s),this.grad(this.p[c],e-1,t,s)),this.lerp(o,this.grad(this.p[u],e,t-1,s),this.grad(this.p[y],e-1,t-1,s))),this.lerp(n,this.lerp(o,this.grad(this.p[d+1],e,t,s-1),this.grad(this.p[c+1],e-1,t,s-1)),this.lerp(o,this.grad(this.p[u+1],e,t-1,s-1),this.grad(this.p[y+1],e-1,t-1,s-1)))))}fade(e){return e*e*e*(e*(6*e-15)+10)}lerp(e,t,s){return t+e*(s-t)}grad(e,t,s,i){var a=15&e,r=a<8?t:s,o=a<4?s:12==a||14==a?t:i;return(0==(1&a)?r:-r)+(0==(2&a)?o:-o)}scale(e){return(1+e)/2}}}]);
//# sourceMappingURL=main.js.map