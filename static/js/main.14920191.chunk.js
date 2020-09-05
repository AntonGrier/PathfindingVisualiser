(this["webpackJsonppathfinding-visualizer"]=this["webpackJsonppathfinding-visualizer"]||[]).push([[0],{15:function(t,e,i){t.exports=i(22)},21:function(t,e,i){},22:function(t,e,i){"use strict";i.r(e);var n,a,s=i(2),r=i(13),o=i(0),u=i(1),h=i(4),l=i(3),c=i(10),d=i.n(c),p=i(14),v=i(11),f=i(5),y=i(6),g=Math.floor(.95*window.innerWidth/25),m=Math.floor(.8*window.innerHeight/25),k=g%2===0?g-1:g,x=m%2===0?m-1:m,b={x:Math.floor(k/4),y:Math.floor(x/2)},O={x:k-b.x-1,y:b.y};!function(t){t[t.PlacingWall=0]="PlacingWall",t[t.RemovingWall=1]="RemovingWall",t[t.MovingStart=2]="MovingStart",t[t.MovingFinish=3]="MovingFinish",t[t.MovingMidpoint=4]="MovingMidpoint",t[t.Disabled=5]="Disabled"}(n||(n={})),function(t){t[t.Unvisited=0]="Unvisited",t[t.VisitedOne=1]="VisitedOne",t[t.VisitedTwo=2]="VisitedTwo",t[t.VisitedOverlap=3]="VisitedOverlap",t[t.Wall=4]="Wall",t[t.ShortestPath=5]="ShortestPath"}(a||(a={}));var P=function(t){Object(h.a)(i,t);var e=Object(l.a)(i);function i(t){var n;return Object(o.a)(this,i),(n=e.call(this,t)).state={},n}return Object(u.a)(i,[{key:"handleMouseEvent",value:function(t){var e=this.props.position;if(1===t.nativeEvent.which){var i=t.type;this.props.updateMouseState(e,i)}else 3===t.nativeEvent.which&&"mousedown"===t.type&&this.props.setMidpoint(e)}},{key:"convertWeightToGreyscale",value:function(t){var e=55+200*(t=1-t);return"rgb(".concat(e,",").concat(e,",").concat(e,")")}},{key:"render",value:function(){var t,e=this,i=this.props,n=i.isStart,r=i.isFinish,o=i.isMidpoint,u=i.nodeType,h=i.weight;if(n||r||o)t=n?"cell-start":r?"cell-finish":o?"cell-midpoint":"";else switch(u){case a.Unvisited:t="cell-unvisited";break;case a.VisitedOne:t="cell-visited-0";break;case a.VisitedTwo:t="cell-visited-1";break;case a.VisitedOverlap:t="cell-visited-overlap";break;case a.Wall:t="cell-wall";break;case a.ShortestPath:t="cell-shortestPath"}var l={};return u!==a.Wall&&u!==a.ShortestPath&&!n&&!r&&h>0&&(l={backgroundColor:this.convertWeightToGreyscale(h)}),s.createElement("div",{ref:this.props.nodeRef,id:"cell-".concat(this.props.position.x,"-").concat(this.props.position.y),className:"cell ".concat(t),style:Object(y.a)({},l),onMouseDown:function(t){return e.handleMouseEvent(t)},onMouseUp:function(t){return e.handleMouseEvent(t)},onMouseEnter:function(t){return e.handleMouseEvent(t)},onContextMenu:function(t){return t.preventDefault()}})}}]),i}(s.Component),w=function(){function t(){Object(o.a)(this,t),this.pathValues=new Map,this.finalPath=[],this.visitedNodesInOrder=[]}return Object(u.a)(t,[{key:"produceVisitedInOrder",value:function(){return this.visitedNodesInOrder.slice(1,this.visitedNodesInOrder.length-1)}},{key:"produceFinalPath",value:function(){return this.finalPath.slice(1,this.visitedNodesInOrder.length-1)}},{key:"getNeighbors",value:function(t,e){var i=this,n=[];return n.push({x:e.x+1,y:e.y}),n.push({x:e.x,y:e.y+1}),n.push({x:e.x,y:e.y-1}),n.push({x:e.x-1,y:e.y}),n.push({x:e.x-1,y:e.y+1}),n.push({x:e.x+1,y:e.y+1}),n.push({x:e.x+1,y:e.y-1}),n.push({x:e.x-1,y:e.y-1}),n.filter((function(n){return n.x>=0&&n.x<k&&n.y>=0&&n.y<x&&t[n.y][n.x].nodeType!==a.Wall&&!i.isVisited(n)&&i.cornerCheck(e,n,t)}))}},{key:"cornerCheck",value:function(t,e,i){return i[t.y][e.x].nodeType!==a.Wall||i[e.y][t.x].nodeType!==a.Wall}},{key:"getDistance",value:function(t,e,i){var n=t[i.y][i.x].weight-t[e.y][e.x].weight;return Math.pow(1e4,n)*Math.sqrt(Math.pow(Math.abs(e.x-i.x),2)+Math.pow(Math.abs(e.y-i.y),2))}},{key:"isVisited",value:function(t){return this.pathValues.get(this.hash(t)).isVisited}},{key:"markAsVisited",value:function(t){this.visitedNodesInOrder.push(t);var e=this.pathValues.get(this.hash(t)),i=Object(y.a)(Object(y.a)({},e),{},{isVisited:!0});this.pathValues.set(this.hash(t),i)}},{key:"findShortestPath",value:function(t){for(var e=t;null!=e;e=this.pathValues.get(this.hash(e)).previousNode)this.finalPath.unshift(e)}},{key:"equalPosition",value:function(t,e){return t.x===e.x&&t.y===e.y}},{key:"hash",value:function(t){return t.x.toString()+"-"+t.y.toString()}},{key:"clear",value:function(){this.visitedNodesInOrder=[],this.finalPath=[],this.pathValues=new Map}}]),t}(),M=i(8),j=function(){function t(){Object(o.a)(this,t),this.heap=[]}return Object(u.a)(t,[{key:"insert",value:function(t,e,i){if(i=void 0!==i,!this.heap.length||this.heap[this.heap.length-1][1]>e)return this.heap.push([t,e]),this.heap;for(var n=[],a=!1,s=0;s<this.heap.length;s++){var r=this.heap[s][1],o=this.heap[s][0];e>=r&&!a&&(n.push([t,e]),a=!0),i&&o.x===t.x&&o.y===t.y||n.push(this.heap[s])}return this.heap=n}},{key:"has",value:function(t){var e=t.x,i=t.y;return!!this.heap.find((function(t){var n=Object(M.a)(t,1)[0];return n.x===e&&n.y===i}))}},{key:"get",value:function(t){var e=t.x,i=t.y,n=this.heap.find((function(t){var n=Object(M.a)(t,1)[0];return n.x===e&&n.y===i}));return n&&n[1]}},{key:"shift",value:function(t){var e=this.heap.shift();return t?e:e?e[0]:void 0}},{key:"pop",value:function(){return this.heap.pop()[0]}},{key:"priorities",value:function(){return this.heap.map((function(t){var e=Object(M.a)(t,2);e[0];return e[1]}))}},{key:"values",value:function(){return this.heap.map((function(t){return Object(M.a)(t,1)[0]}))}},{key:"size",value:function(){return this.heap.length}},{key:"toArray",value:function(t){return t?this.heap.map((function(t){return Object(M.a)(t,1)[0]})):this.heap}}]),t}(),S=function(t){Object(h.a)(i,t);var e=Object(l.a)(i);function i(){var t;Object(o.a)(this,i);for(var n=arguments.length,a=new Array(n),s=0;s<n;s++)a[s]=arguments[s];return(t=e.call.apply(e,[this].concat(a))).minHeap=new j,t}return Object(u.a)(i,[{key:"calculatePath",value:function(t,e,i){for(this.reset(),this.setMap(t,e),this.minHeap.insert(e,0);0!==this.minHeap.size();){var n=this.minHeap.pop();if(this.markAsVisited(n),this.equalPosition(n,i))return void this.findShortestPath(i);var a,s=this.getNeighbors(t,n),r=this.pathValues.get(this.hash(n)).shortestPath,o=Object(f.a)(s);try{for(o.s();!(a=o.n()).done;){var u=a.value,h=r+this.getDistance(t,n,u),l=this.pathValues.get(this.hash(u));if(this.minHeap.insert(u,h),h<l.shortestPath){var c={shortestPath:h,isVisited:!0,previousNode:n};this.pathValues.set(this.hash(u),c)}}}catch(d){o.e(d)}finally{o.f()}}}},{key:"setMap",value:function(t,e){var i=this;t.forEach((function(t){return t.forEach((function(t){var n=t.position,a={shortestPath:i.equalPosition(e,n)?0:1/0,isVisited:!1,previousNode:null};i.pathValues.set(i.hash(n),a)}))}))}},{key:"reset",value:function(){this.clear(),this.minHeap=new j}}]),i}(w),V=function(){function t(){Object(o.a)(this,t),this.data=void 0,this.top=void 0,this.data=new Array,this.top=0}return Object(u.a)(t,[{key:"push",value:function(t){this.data[this.top]=t,this.top++}},{key:"pop",value:function(){return this.top--,this.data[this.top]}},{key:"isEmpty",value:function(){return 0===this.top}}]),t}(),E=function(t){Object(h.a)(i,t);var e=Object(l.a)(i);function i(){var t;Object(o.a)(this,i);for(var n=arguments.length,a=new Array(n),s=0;s<n;s++)a[s]=arguments[s];return(t=e.call.apply(e,[this].concat(a))).stack=new V,t}return Object(u.a)(i,[{key:"calculatePath",value:function(t,e,i){for(this.reset(),this.setMap(t),this.stack.push(e);!this.stack.isEmpty();){var n=this.stack.pop();if(this.markAsVisited(n),this.equalPosition(n,i))return void(this.finalPath=this.visitedNodesInOrder);var a,s=this.getNeighbors(t,n).reverse(),r=Object(f.a)(s);try{for(r.s();!(a=r.n()).done;){var o=a.value;this.stack.push(o)}}catch(u){r.e(u)}finally{r.f()}}}},{key:"setMap",value:function(t){var e=this;t.forEach((function(t){t.forEach((function(t){var i=t.position;e.pathValues.set(e.hash(i),{isVisited:!1})}))}))}},{key:"reset",value:function(){this.clear(),this.stack=new V}}]),i}(w),W=function(){function t(){Object(o.a)(this,t),this.data=[]}return Object(u.a)(t,[{key:"push",value:function(t){this.data.push(t)}},{key:"pop",value:function(){return this.data.shift()}},{key:"isEmpty",value:function(){return 0===this.data.length}}]),t}(),T=function(t){Object(h.a)(i,t);var e=Object(l.a)(i);function i(){var t;Object(o.a)(this,i);for(var n=arguments.length,a=new Array(n),s=0;s<n;s++)a[s]=arguments[s];return(t=e.call.apply(e,[this].concat(a))).queue=new W,t}return Object(u.a)(i,[{key:"calculatePath",value:function(t,e,i){for(this.reset(),this.setMap(t),this.queue.push(e);!this.queue.isEmpty();){var n=this.queue.pop();if(this.markAsVisited(n),this.equalPosition(n,i))return void this.findShortestPath(i);var a,s=this.getNeighbors(t,n),r=Object(f.a)(s);try{for(r.s();!(a=r.n()).done;){var o=a.value;this.queue.push(o),this.pathValues.set(this.hash(o),{isVisited:!0,previousNode:n})}}catch(u){r.e(u)}finally{r.f()}}}},{key:"setMap",value:function(t){var e=this;t.forEach((function(t){t.forEach((function(t){var i=t.position;e.pathValues.set(e.hash(i),{isVisited:!1,previousNode:null})}))}))}},{key:"reset",value:function(){this.clear(),this.queue=new W}}]),i}(w),N=function(){function t(){Object(o.a)(this,t),this.wallsCreatedInOrder=void 0}return Object(u.a)(t,[{key:"getSetup",value:function(){for(var t=[],e=0;e<k;e++){var i={x:e,y:0},n={x:e,y:x-1};t.push(i),t.push(n)}for(var a=1;a<x-1;a++){var s={x:0,y:a},r={x:k-1,y:a};t.push(s),t.push(r)}return t}},{key:"getRandom",value:function(t,e){return t+Math.floor((e-t+1)*Math.random())}},{key:"addWall",value:function(t){this.wallsCreatedInOrder.push(t)}}]),t}(),A=function(t){Object(h.a)(i,t);var e=Object(l.a)(i);function i(){return Object(o.a)(this,i),e.apply(this,arguments)}return Object(u.a)(i,[{key:"generateWalls",value:function(){this.wallsCreatedInOrder=[];var t={x:k-1,y:x-1};return this.divide({x:0,y:0},t),this.wallsCreatedInOrder}},{key:"divide",value:function(t,e){var i,n,a,s,r=e.x-t.x+1,o=e.y-t.y+1,u=r>o;if(u){if(r<4)return;i=this.randomEven(t.x,e.x),console.log(i),n={x:i,y:this.randomOdd(t.y,e.y)},console.log("Trying ".concat(i,", gap (").concat(n.x,",").concat(n.y,") width: ").concat(r," height: ").concat(o))}else{if(o<4)return;i=this.randomEven(t.y,e.y),console.log(i),n={x:this.randomOdd(t.x,e.x),y:i},console.log("Trying ".concat(i,", gap (").concat(n.x,",").concat(n.y,") width: ").concat(r," height: ").concat(o))}for(var h=u?t.y+1:t.x+1;h<=(u?e.y-1:e.x-1);h++)if(h!==(u?n.y:n.x)){var l=void 0;l=u?{x:i,y:h}:{x:h,y:i},this.wallsCreatedInOrder.push(l)}u?(a={x:i,y:e.y},s={x:i,y:t.y}):(a={x:e.x,y:i},s={x:t.x,y:i}),this.divide(t,a),this.divide(s,e)}},{key:"randomEven",value:function(t,e){return(t+=2)%2===1&&t++,(e-=2)%2===1&&e--,t+2*this.getRandom(0,(e-t)/2)}},{key:"randomOdd",value:function(t,e){return(t+=2)%2===0&&t++,(e-=2)%2===0&&e--,t+2*this.getRandom(0,(e-t)/2)}},{key:"hash",value:function(t){return t.x.toString()+"-"+t.y.toString()}}]),i}(N),R=(k-1)/2,C=(x-1)/2,I=function(t){Object(h.a)(i,t);var e=Object(l.a)(i);function i(){return Object(o.a)(this,i),e.apply(this,arguments)}return Object(u.a)(i,[{key:"placeWallBetweenPositions",value:function(t,e){var i={x:Math.floor((t.x+e.x)/2),y:Math.floor((t.y+e.y)/2)};this.addWall(i)}},{key:"positionInBounds",value:function(t){return t.x>0&&t.x<k-1&&t.y>0&&t.y<x-1}},{key:"getSetup",value:function(){for(var t=[],e=0;e<k;e++){var i={x:e,y:0},n={x:e,y:x-1};t.push(i),t.push(n)}for(var a=0;a<k;a+=2)for(var s=1;s<x-1;s++){var r={x:a,y:s};t.push(r)}for(var o=1;o<k-1;o+=2)for(var u=2;u<x-2;u+=2){var h={x:o,y:u};t.push(h)}return t}}]),i}(N),F=function(t){Object(h.a)(i,t);var e=Object(l.a)(i);function i(){var t;Object(o.a)(this,i);for(var n=arguments.length,a=new Array(n),s=0;s<n;s++)a[s]=arguments[s];return(t=e.call.apply(e,[this].concat(a))).visited=void 0,t}return Object(u.a)(i,[{key:"generateWalls",value:function(){this.wallsCreatedInOrder=[],this.visited=new Map;var t={x:2*this.getRandom(1,(k-1)/2)-1,y:2*this.getRandom(1,(x-1)/2)-1};return this.carveWalls(t),this.wallsCreatedInOrder}},{key:"carveWalls",value:function(t){this.visit(t);var e,i=this.getUnvisitedNeighbors(t),n=Object(f.a)(i);try{for(n.s();!(e=n.n()).done;){var a=e.value;console.log(a),this.isVisisted(a)||(this.placeWallBetweenPositions(t,a),this.carveWalls(a))}}catch(s){n.e(s)}finally{n.f()}}},{key:"getUnvisitedNeighbors",value:function(t){var e=this,i=[{x:t.x+2,y:t.y},{x:t.x,y:t.y-2},{x:t.x-2,y:t.y},{x:t.x,y:t.y+2}];return i=i.filter((function(t){return e.positionInBounds(t)})),this.randomisePositions(i)}},{key:"randomisePositions",value:function(t){return t.sort((function(){return Math.random()-.5}))}},{key:"visit",value:function(t){this.visited.set(this.hash(t),!0)}},{key:"isVisisted",value:function(t){return this.visited.has(this.hash(t))}},{key:"hash",value:function(t){return t.x.toString()+"-"+t.y.toString()}}]),i}(I),D=function(t){Object(h.a)(i,t);var e=Object(l.a)(i);function i(){return Object(o.a)(this,i),e.apply(this,arguments)}return Object(u.a)(i,[{key:"generateWalls",value:function(){return this.wallsCreatedInOrder=[],this.generateMaze(),this.wallsCreatedInOrder}},{key:"generateMaze",value:function(){var t=new z;t=this.mergeRow(t,0,!0);for(var e=1;e<C;e++){var i=t;t=this.extendToNextRow(t,i,e),t=this.mergeRow(t,e,e!==C-1)}}},{key:"extendToNextRow",value:function(t,e,i){t=new z;for(var n=0;n<R;n++)e.isRoot(n)?(t.addEntry(n,-1),this.addTopWall({x:n,y:i})):this.randomBool()&&(t.addEntry(n,e.getEntry(n)),this.addTopWall({x:n,y:i}));return t}},{key:"mergeRow",value:function(t,e,i){for(var n=0;n<R-1;n++)!this.randomBool()&&i||t.sameClass(n,n+1)||(t.mergeSets(n,n+1),this.addRightWall({x:n,y:e}));return t}},{key:"addRightWall",value:function(t){this.addWall({x:2*t.x+2,y:2*t.y+1})}},{key:"addTopWall",value:function(t){this.addWall({x:2*t.x+1,y:2*t.y})}},{key:"randomBool",value:function(){return Math.random()>=.5}}]),i}(I),z=function(){function t(){Object(o.a)(this,t),this.data=void 0,this.data=Array(R).fill(-1)}return Object(u.a)(t,[{key:"mergeSets",value:function(t,e){-1===this.data[t]?this.data[t]=this.getRoot(e):this.data[e]=this.getRoot(t)}},{key:"sameClass",value:function(t,e){return this.getRoot(t)===this.getRoot(e)}},{key:"getRoot",value:function(t){for(;-1!==this.data[t];)t=this.data[t];return t}},{key:"isRoot",value:function(t){return-1===this.data[t]}},{key:"addEntry",value:function(t,e){this.data[t]=e}},{key:"getEntry",value:function(t){return this.getRoot(t)}}]),t}(),U=function(t){Object(h.a)(i,t);var e=Object(l.a)(i);function i(){var t;Object(o.a)(this,i);for(var n=arguments.length,a=new Array(n),s=0;s<n;s++)a[s]=arguments[s];return(t=e.call.apply(e,[this].concat(a))).minHeap=new j,t}return Object(u.a)(i,[{key:"calculatePath",value:function(t,e,i){for(this.reset(),this.setMap(t,e),this.minHeap.insert(e,0);this.minHeap.size()>0;){var n=this.minHeap.pop();if(!this.pathValues.get(this.hash(n)).isVisited){if(this.markAsVisited(n),this.equalPosition(n,i))return void this.findShortestPath(i);this.setNeighbors(t,n,e,i)}}}},{key:"setNeighbors",value:function(t,e,i,n){var a,s=this.getNeighbors(t,e),r=this.pathValues.get(this.hash(e)).shortestPath,o=Object(f.a)(s);try{for(o.s();!(a=o.n()).done;){var u=a.value,h=r+this.getDistance(t,u,e),l=this.getDistance(t,u,n),c=h+l,d=this.pathValues.get(this.hash(u));if(null!==d.previousNode)c<d.shortestPath+l&&(this.minHeap.insert(u,c,!0),this.pathValues.set(this.hash(u),{isVisited:!1,previousNode:e,shortestPath:h}));else this.minHeap.insert(u,c,!1),this.pathValues.set(this.hash(u),{isVisited:!1,previousNode:e,shortestPath:h})}}catch(p){o.e(p)}finally{o.f()}}},{key:"setMap",value:function(t,e){var i=this;t.forEach((function(t){return t.forEach((function(t){var n=t.position,a={isVisited:!1,shortestPath:i.equalPosition(e,n)?0:1/0,previousNode:null};i.pathValues.set(i.hash(n),a)}))}))}},{key:"reset",value:function(){this.clear(),this.minHeap=new j}}]),i}(w),q=function(t){Object(h.a)(i,t);var e=Object(l.a)(i);function i(t){var n;return Object(o.a)(this,i),(n=e.call(this,t)).state={},n}return Object(u.a)(i,[{key:"render",value:function(){var t=this;return s.createElement("div",{className:"navbar"},s.createElement("button",{onClick:function(){t.props.generateMaze(new D)}},"Ellers"),s.createElement("button",{onClick:function(){t.props.generateMaze(new F)}},"Recursive BackTrack"),s.createElement("button",{onClick:function(){t.props.generateMaze(new A)}},"Recursive Division"),s.createElement("button",{onClick:function(){t.props.generateLandscape()}},"Generate Landscape"),s.createElement("button",{onClick:function(){t.props.performAlgorithm(new U)}},"AStar"),s.createElement("button",{onClick:function(){t.props.performAlgorithm(new S)}},"Dijkstra"),s.createElement("button",{onClick:function(){t.props.performAlgorithm(new E)}},"DFS"),s.createElement("button",{onClick:function(){t.props.performAlgorithm(new T)}},"BFS"),s.createElement("button",{onClick:function(){t.props.clearPath()}},"Clear"))}}]),i}(s.Component),H=function(){function t(){Object(o.a)(this,t),this.p=void 0,this.permutation=void 0,this.permutation=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],this.p=new Array(512);for(var e=0;e<256;e++)this.p[256+e]=this.p[e]=this.permutation[e]}return Object(u.a)(t,[{key:"noise",value:function(t,e,i){var n=255&Math.floor(t),a=255&Math.floor(e),s=255&Math.floor(i);t-=Math.floor(t),e-=Math.floor(e),i-=Math.floor(i);var r=this.fade(t),o=this.fade(e),u=this.fade(i),h=this.p[n]+a,l=this.p[h]+s,c=this.p[h+1]+s,d=this.p[n+1]+a,p=this.p[d]+s,v=this.p[d+1]+s;return this.scale(this.lerp(u,this.lerp(o,this.lerp(r,this.grad(this.p[l],t,e,i),this.grad(this.p[p],t-1,e,i)),this.lerp(r,this.grad(this.p[c],t,e-1,i),this.grad(this.p[v],t-1,e-1,i))),this.lerp(o,this.lerp(r,this.grad(this.p[l+1],t,e,i-1),this.grad(this.p[p+1],t-1,e,i-1)),this.lerp(r,this.grad(this.p[c+1],t,e-1,i-1),this.grad(this.p[v+1],t-1,e-1,i-1)))))}},{key:"fade",value:function(t){return t*t*t*(t*(6*t-15)+10)}},{key:"lerp",value:function(t,e,i){return e+t*(i-e)}},{key:"grad",value:function(t,e,i,n){var a=15&t,s=a<8?e:i,r=a<4?i:12===a||14===a?e:n;return(0===(1&a)?s:-s)+(0===(2&a)?r:-r)}},{key:"scale",value:function(t){return(1+t)/2}}]),t}(),B=function(t){Object(h.a)(i,t);var e=Object(l.a)(i);function i(t){var r;Object(o.a)(this,i),(r=e.call(this,t)).references=Array(x).fill([]).map((function(){return Array(k).fill(0).map((function(){return Object(s.createRef)()}))}));for(var u=[],h=0;h<x;h++){for(var l=[],c=0;c<k;c++){var d={position:{x:c,y:h},nodeType:a.Unvisited,weight:0};l.push(d)}u.push(l)}return r.state={grid:u,startPos:b,finishPos:O,midpointPos:null,mouseState:n.PlacingWall,isMouseDown:!1,updateLock:!1,perlinToggle:!1,prevAlgorithm:null},r}return Object(u.a)(i,[{key:"shouldComponentUpdate",value:function(t,e){return!e.updateLock}},{key:"clearPath",value:function(){var t=this.state.grid;return t=t.map((function(t){return t.map((function(t){return Object(y.a)(Object(y.a)({},t),{},{nodeType:t.nodeType===a.Wall?a.Wall:a.Unvisited})}))}))}},{key:"updateMouseState",value:function(t,e){if(this.state.mouseState!==n.Disabled)switch(e){case"mousedown":this.onMouseDown(t);break;case"mouseup":this.onMouseUp();break;case"mouseenter":this.onMouseEnter(t)}}},{key:"onMouseDown",value:function(t){var e=this.state,i=e.grid,s=e.mouseState,r=(e.isMouseDown,e.prevAlgorithm),o=i[t.y][t.x].nodeType;(s!==n.MovingStart&&s!==n.MovingFinish&&s!==n.MovingMidpoint||this.isEmpty(t))&&(s=this.isStart(t)?n.MovingStart:this.isFinish(t)?n.MovingFinish:this.isMidpoint(t)?n.MovingMidpoint:o===a.Unvisited?n.PlacingWall:n.RemovingWall,this.isEmpty(t)&&(null!==r&&(i=this.clearPath(),r=null),o===a.Wall?i[t.y][t.x].nodeType=a.Unvisited:i[t.y][t.x].nodeType=a.Wall),!0,this.setState({grid:i,mouseState:s,isMouseDown:!0,prevAlgorithm:r}))}},{key:"onMouseUp",value:function(){var t=n.PlacingWall;this.setState({mouseState:t,isMouseDown:!1})}},{key:"onMouseEnter",value:function(t){var e=this.state,i=e.grid,s=e.startPos,r=e.finishPos,o=e.midpointPos,u=e.mouseState,h=e.isMouseDown,l=e.prevAlgorithm;if(h&&!this.isStart(t)&&!this.isFinish(t)&&!this.isMidpoint(t))switch(u){case n.MovingStart:s=t,null!==l?this.recalculatePath(s,r,o,l):this.setState({startPos:s});break;case n.MovingFinish:r=t,null!==l?this.recalculatePath(s,r,o,l):this.setState({finishPos:r});break;case n.MovingMidpoint:o=t,null!==l?this.recalculatePath(s,r,o,l):this.setState({midpointPos:o});break;case n.PlacingWall:i[t.y][t.x].nodeType=a.Wall,this.setState({grid:i});break;case n.RemovingWall:i[t.y][t.x].nodeType=a.Unvisited,this.setState({grid:i})}}},{key:"recalculatePath",value:function(t,e,i,n){var s=this.clearPath(),r=[],o=[];null===i?(n.calculatePath(s,t,e),r.push(n.produceVisitedInOrder()),o.push(n.produceFinalPath())):(n.calculatePath(s,t,i),r.push(n.produceVisitedInOrder()),o.push(n.produceFinalPath()),n.calculatePath(s,i,e),r.push(n.produceVisitedInOrder()),o.push(n.produceFinalPath()));for(var u=0;u<r.length;u++){var h,l=r[u],c=Object(f.a)(l);try{for(c.s();!(h=c.n()).done;){var d=h.value;0===u?s[d.y][d.x].nodeType=a.VisitedOne:s[d.y][d.x].nodeType===a.VisitedOne?s[d.y][d.x].nodeType=a.VisitedOverlap:s[d.y][d.x].nodeType=a.VisitedTwo}}catch(x){c.e(x)}finally{c.f()}}for(var p=0,v=o;p<v.length;p++){var y,g=v[p],m=Object(f.a)(g);try{for(m.s();!(y=m.n()).done;){var k=y.value;s[k.y][k.x].nodeType=a.ShortestPath}}catch(x){m.e(x)}finally{m.f()}}this.setState({grid:s,startPos:t,finishPos:e,midpointPos:i})}},{key:"isEmpty",value:function(t){return!this.isStart(t)&&!this.isFinish(t)&&!this.isMidpoint(t)}},{key:"isStart",value:function(t){return t.x===this.state.startPos.x&&t.y===this.state.startPos.y}},{key:"isFinish",value:function(t){return t.x===this.state.finishPos.x&&t.y===this.state.finishPos.y}},{key:"isMidpoint",value:function(t){return null!==this.state.midpointPos&&t.x===this.state.midpointPos.x&&t.y===this.state.midpointPos.y}},{key:"performAlgorithm",value:function(t){var e=this.state.midpointPos;this.setState({prevAlgorithm:t,mouseState:n.Disabled});var i=[],a=[];null===e?(t.calculatePath(this.state.grid,this.state.startPos,this.state.finishPos),i.push(t.produceVisitedInOrder()),a.push(t.produceFinalPath())):(t.calculatePath(this.state.grid,this.state.startPos,this.state.midpointPos),i.push(t.produceVisitedInOrder()),a.push(t.produceFinalPath()),t.calculatePath(this.state.grid,this.state.midpointPos,this.state.finishPos),i.push(t.produceVisitedInOrder()),a.push(t.produceFinalPath())),this.visualiseAlgorithm(i,a),this.setState({mouseState:n.PlacingWall})}},{key:"visualiseAlgorithm",value:function(t,e){var i=this;Object(v.a)(d.a.mark((function n(){var a,s,r;return d.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:i.lockRender(),s=0;case 2:if(!(s<t.length)){n.next=9;break}return r=t[s],n.next=6,i.visualiseVisited(r,s);case 6:s++,n.next=2;break;case 9:return n.next=11,i.visualisePath((a=[]).concat.apply(a,Object(p.a)(e)));case 11:i.unlockRender();case 12:case"end":return n.stop()}}),n)})))()}},{key:"visualiseVisited",value:function(t,e){var i=this;return new Promise((function(n){for(var s=function(s){setTimeout((function(){if(s===t.length)setTimeout((function(){n()}),15);else{var r=t[s],o=i.references[r.y][r.x],u=o.current.className;if(!u.includes("cell-start")&&!u.includes("cell-finish")&&!u.includes("cell-midpoint")){u.includes("cell-visited-0")?o.current.className="cell cell-visited-overlap":o.current.className="cell cell-visited-".concat(e);var h=i.state.grid;0===e?h[r.y][r.x].nodeType=a.VisitedOne:h[r.y][r.x].nodeType===a.VisitedOne?h[r.y][r.x].nodeType=a.VisitedOverlap:h[r.y][r.x].nodeType=a.VisitedTwo,i.setState({grid:h})}}}),15*s)},r=0;r<=t.length;r++)s(r)}))}},{key:"visualisePath",value:function(t){var e=this;return new Promise((function(i){for(var n=function(n){setTimeout((function(){if(n===t.length)setTimeout((function(){i()}),15);else{var s=t[n],r=e.references[s.y][s.x],o=r.current.className;if(!o.includes("cell-start")&&!o.includes("cell-finish")&&!o.includes("cell-midpoint")){r.current.className="cell cell-shortestPath";var u=e.state.grid;u[s.y][s.x].nodeType=a.ShortestPath,e.setState({grid:u})}}}),15*n)},s=0;s<=t.length;s++)n(s)}))}},{key:"lockRender",value:function(){this.setState({updateLock:!0})}},{key:"unlockRender",value:function(){this.setState({updateLock:!1})}},{key:"generateLandscape",value:function(){for(var t=new H,e=Math.floor(1e4*Math.random()),i=this.state.grid,n=0;n<x;n++)for(var a=0;a<k;a++){var s=t.noise(.2*a+e,.2*n+e,0);i[n][a].weight=s}this.setState({grid:i})}},{key:"generateMaze",value:function(t){var e=this;Object(v.a)(d.a.mark((function i(){var a,s;return d.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return e.lockRender(),a=t.getSetup(),s=t.generateWalls(),i.next=5,e.setupStartingWalls(a);case 5:return i.next=7,e.visualizeMaze(s);case 7:e.unlockRender(),e.setState({mouseState:n.PlacingWall});case 9:case"end":return i.stop()}}),i)})))()}},{key:"setupStartingWalls",value:function(t){var e=this;return new Promise((function(i){for(var n=0;n<=t.length;n++)if(n===t.length)setTimeout((function(){i()}),1e3);else{var s=e.state.grid,r=t[n],o=e.references[r.y][r.x],u=o.current.className;s[r.y][r.x].nodeType=a.Wall,u.includes("cell-start")||u.includes("cell-finish")||u.includes("cell-midpoint")||(o.current.className="cell cell-wall"),e.setState({grid:s})}}))}},{key:"visualizeMaze",value:function(t){var e=this;return new Promise((function(i){for(var n=function(n){setTimeout((function(){if(n===t.length)setTimeout((function(){i()}),15);else{var s=e.state.grid,r=t[n],o=e.references[r.y][r.x],u=o.current.className;e.wallAlreadyPlaced(r)?(u.includes("cell-start")||u.includes("cell-finish")||(o.current.className="cell cell-unvisited"),s[r.y][r.x].nodeType=a.Unvisited):(u.includes("cell-start")||u.includes("cell-finish")||u.includes("cell-midpoint")||(o.current.className="cell cell-wall"),s[r.y][r.x].nodeType=a.Wall),e.setState({grid:s})}}),15*n)},s=0;s<=t.length;s++)n(s)}))}},{key:"wallAlreadyPlaced",value:function(t){return this.state.grid[t.y][t.x].nodeType===a.Wall}},{key:"setMidpoint",value:function(t){var e,i=this.state.prevAlgorithm,n=this.state.grid;this.isStart(t)||this.isFinish(t)||(e=this.isMidpoint(t)?null:t,null!==i&&(i=null,n=this.clearPath()),this.setState({grid:n,prevAlgorithm:i,midpointPos:e}))}},{key:"render",value:function(){var t=this,e=this.state.grid;return s.createElement("div",null,s.createElement(q,{performAlgorithm:function(e){return t.performAlgorithm(e)},clearPath:function(){return t.setState({prevAlgorithm:null,grid:t.clearPath()})},generateLandscape:function(){return t.generateLandscape()},generateMaze:function(e){return t.generateMaze(e)}}),s.createElement("div",{className:"grid"},e.map((function(e,i){return s.createElement("div",{className:"grid-row",key:i},e.map((function(e,n){var a={x:n,y:i};return s.createElement(P,{position:{x:n,y:i},isStart:t.isStart(a),isFinish:t.isFinish(a),isMidpoint:t.isMidpoint(a),nodeType:e.nodeType,weight:e.weight,updateMouseState:function(e,i){return t.updateMouseState(e,i)},setMidpoint:function(e){return t.setMidpoint(e)},nodeRef:t.references[i][n],key:n})})))}))))}}]),i}(s.Component),L=function(t){Object(h.a)(i,t);var e=Object(l.a)(i);function i(t){var n;return Object(o.a)(this,i),(n=e.call(this,t)).state={},n}return Object(u.a)(i,[{key:"render",value:function(){return s.createElement("div",{className:"app"},s.createElement(B,null))}}]),i}(s.Component);i(21),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.render(s.createElement(s.StrictMode,null,s.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[15,1,2]]]);
//# sourceMappingURL=main.14920191.chunk.js.map