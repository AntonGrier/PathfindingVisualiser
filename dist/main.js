!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){e.exports=React},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(0),s=n(5);var a,i;t.STARTPOS={x:Math.floor(10),y:Math.floor(10.5)},t.FINISHPOS={x:40-t.STARTPOS.x,y:t.STARTPOS.y},function(e){e[e.PlacingWall=0]="PlacingWall",e[e.MovingStart=1]="MovingStart",e[e.MovingFinish=2]="MovingFinish"}(a=t.MouseState||(t.MouseState={})),function(e){e[e.Empty=0]="Empty",e[e.Wall=1]="Wall",e[e.Start=2]="Start",e[e.Finish=3]="Finish"}(i=t.NodeType||(t.NodeType={}));class l extends r.Component{constructor(e){super(e),this.state={grid:[],mouseState:null,isMouseDown:!1}}componentDidMount(){let e=[];for(let t=0;t<21;t++){let n=[];for(let e=0;e<40;e++){let r={x:e,y:t,nodeType:i.Empty};n.push(r)}e.push(n)}let n={x:t.STARTPOS.x,y:t.STARTPOS.y,nodeType:i.Start},r={x:t.FINISHPOS.x,y:t.FINISHPOS.y,nodeType:i.Finish};e[t.STARTPOS.y][t.STARTPOS.x]=n,e[t.FINISHPOS.y][t.FINISHPOS.x]=r,this.setState({grid:e,mouseState:a.PlacingWall,isMouseDown:!1})}updateMouseState(e,t,n){let r,{grid:o,mouseState:s,isMouseDown:l}=this.state,u=o[t][e].nodeType;switch(n){case"mousedown":if(s==a.MovingStart&&u==i.Finish||s==a.MovingFinish&&u==i.Start)return;switch(s=u==i.Start?a.MovingStart:u==i.Finish?a.MovingFinish:a.PlacingWall,u){case i.Empty:r=i.Wall;break;case i.Wall:r=i.Empty;break;case i.Start:case i.Finish:r=u}l=!0,o[t][e].nodeType=r;break;case"mouseup":if(s==a.MovingStart&&u==i.Finish||s==a.MovingFinish&&u==i.Start)return;s=a.PlacingWall,l=!1;break;case"mouseenter":if(!l)return;if(u==i.Start||u==i.Finish)return;switch(s){case a.MovingStart:r=i.Start;break;case a.MovingFinish:r=i.Finish;break;case a.PlacingWall:r=u==i.Empty?i.Wall:i.Empty}o[t][e].nodeType=r;break;case"mouseleave":if(!l)return;if(s==a.MovingStart&&u==i.Finish)return;if(s==a.MovingFinish&&u==i.Start)return;switch(s){case a.MovingStart:case a.MovingFinish:r=i.Empty;break;case a.PlacingWall:r=u}o[t][e].nodeType=r}this.setState({grid:o,mouseState:s,isMouseDown:l})}render(){let e=this.state.grid;return o.createElement("div",{className:"grid"},e.map((e,t)=>o.createElement("div",{className:"grid-row",key:t},e.map((e,n)=>o.createElement(s.default,{x:n,y:t,nodeType:e.nodeType,updateMouseState:(e,t,n)=>this.updateMouseState(e,t,n),key:n})))))}}t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(3),s=n(4);o.render(r.createElement(s.default,null),document.getElementById("root"))},function(e,t){e.exports=ReactDOM},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(1),s=n(0);class a extends s.Component{constructor(e){super(e),this.state={}}render(){return r.createElement("div",{className:"app"},r.createElement(o.default,null))}}t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(0),s=n(1);class a extends o.Component{constructor(e){super(e),this.state={}}handleMouseEvent(e){let t=e.type;this.props.updateMouseState(this.props.x,this.props.y,t)}render(){let e;switch(this.props.nodeType){case s.NodeType.Empty:e="";break;case s.NodeType.Start:e="cell-start";break;case s.NodeType.Finish:e="cell-finish";break;case s.NodeType.Wall:e="cell-wall"}return r.createElement("div",{className:"cell "+e,onMouseDown:e=>this.handleMouseEvent(e),onMouseUp:e=>this.handleMouseEvent(e),onMouseLeave:e=>this.handleMouseEvent(e),onMouseEnter:e=>this.handleMouseEvent(e)})}}t.default=a}]);
//# sourceMappingURL=main.js.map