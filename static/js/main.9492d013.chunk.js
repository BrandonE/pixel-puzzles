(this["webpackJsonppixel-puzzles"]=this["webpackJsonppixel-puzzles"]||[]).push([[0],{135:function(e,t,r){"use strict";(function(e){var n=r(44),i=r.n(n),a=r(86),o=r(22),l=r(23),s=r(11),c=r(26),d=r(25),u=r(0),h=r.n(u),b=r(33),j=r(15),g=r(306),f=r(69),v=r(17),C=r(38),O=r(136),p=r.n(O),m=r(27),x=r.n(m),y=(r(299),r(300),r(301),r(302),r(56)),w=r(137),z=r(138),D=r(63),k=r(9),S=r(145),A=r(1),F="0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000011000011110001111100000000000000110001111101111111111111111111111111111111111111110111111111111111111111111111111111111111111111111111111111111111111111101111111111111111111111111111111111111111111111111111111100000000110000001111100011111110111111111111111111111111111111110000000000000000000000000000000010000000110000001111000011111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000010000001100000111000011110011111101111111111111111111111111111111111111111111111011111110111111111111111111111111111111111111111111111111000111110000011111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110001110000011111100111111101111111111111111111111111111111101111111011111110000000000000000000000001000000010000000110000001110000011110000000011110001111100011111001111110011111100111111011111110111111111111110111111101111111011111110111111101111111011111110111111000000000100000000000000000000000000000000000000000000000000000000111100000000000000000000000000000000000000000000000000000000000000001111000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000011111110111111101111111011111110111111101111111011111110011111111110000111110001111100011111100111111001111110011111110111111100111111101111111111111111111111111111111111111111111111111111111111111001111100011111000111100001111000011110000111100001111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011111100011111000111110000111100001111000011110000111100001111111111101111111011111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111000011110000111100001111000011110000111110001111100011111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001111000011110000111100001111000011110001111100011111000111111111111111111111111111111111111111111111111111111111111111111111011111110111111101111111011111110011111100111111000111110001111111111100111111101111111011111111111111111111111110011111110001110000000000000000000000000000000011000000111100001111111011111111000000000000000000000000000000000000000000000000000000001100000000000000000000000000000000000000000000000000000000000000000000110000000000000000000000000000000000000011000011110111111111111111001111110111111101111111111111111111111111111111111111111111111111111110111111101111111011111110111111001111110011111000111110000000111100001111000001110000011100000011000000010000000000000000111001111111001111111010111110011111110011111100111111100111111111111111111111111111111111111111001111100110111100000000100000001100000010000000100000000000000000000000000000000000000000000000000000110000000100000001000000000000000000000000000000000000000011111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110111100001111000011100000111000001100000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111100011111000011110000011100000011000000000000000000000000111111111111111111111111111111111111111111111111001111110000111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111111111111111111111111111111111111111111111111111001111000011111110111110001111000011100000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",G=function(t){Object(c.a)(n,t);var r=Object(d.a)(n);function n(){var e;return Object(o.a)(this,n),(e=r.call(this)).state={isAuthoring:!1,isFilling:!1,filledColor:0,emptyColor:4294967295,solvedColor:4294902015,unsolvedColor:2155905279},e.printableRef=h.a.createRef(),e.initializeGrid=e.initializeGrid.bind(Object(s.a)(e)),e.onCellEdit=e.onCellEdit.bind(Object(s.a)(e)),e.onCellChanged=e.onCellChanged.bind(Object(s.a)(e)),e.changeMode=e.changeMode.bind(Object(s.a)(e)),e.confirmChangeMode=e.confirmChangeMode.bind(Object(s.a)(e)),e.clear=e.clear.bind(Object(s.a)(e)),e.revealSolution=e.revealSolution.bind(Object(s.a)(e)),e.invert=e.invert.bind(Object(s.a)(e)),e.importImage=e.importImage.bind(Object(s.a)(e)),e.exportImage=e.exportImage.bind(Object(s.a)(e)),e.share=e.share.bind(Object(s.a)(e)),e.resizeCanvas=e.resizeCanvas.bind(Object(s.a)(e)),e.print=e.print.bind(Object(s.a)(e)),e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=new URLSearchParams(window.location.search),t=Object.fromEntries(e.entries());document.onselectstart=function(){return!1},this.setState({isAuthoring:"true"===t.isAuthoring,size:this.initializeGrid(t.gridData)})}},{key:"initializeGrid",value:function(e){var t=8;if(e){var r=Math.sqrt(Math.sqrt(e.length));r%1!==0?(C.b.error("Grid must have a size of x^4."),this.gridData=Object(k.c)(t,F)):r<3?(C.b.error("Grid can be no smaller than 3^4."),this.gridData=Object(k.c)(t,F)):r>9?(C.b.error("Grid can be no larger than 9^4."),this.gridData=Object(k.c)(t,F)):(t=r,this.gridData=Object(k.c)(t,e))}else this.gridData=Object(k.c)(t,F);return this.coordinatesOrder=Object(k.b)(t),t}},{key:"onCellEdit",value:function(e){this.setState({isFilling:!e})}},{key:"onCellChanged",value:function(e,t,r,n,i){this.gridData[e][t][r][n]=i?1:0}},{key:"changeMode",value:function(){this.state.isAuthoring?this.confirmChangeMode():Object(v.confirmAlert)({title:"Confirmation",message:"Are you sure you want to edit the puzzle? This will undo your progress and reveal the solution!",buttons:[{label:"Yes",onClick:this.confirmChangeMode},{label:"No"}]})}},{key:"confirmChangeMode",value:function(){var e=this.state.isAuthoring,t=new URLSearchParams(window.location.search);t.set("gridData",Object(k.h)(this.gridData)),t.set("isAuthoring",JSON.stringify(!e)),window.location.search=t.toString()}},{key:"clear",value:function(){var e=this,t=this.state.isAuthoring;Object(v.confirmAlert)({title:"Confirmation",message:"Are you sure you want to clear ".concat(t?"the canvas":"your progress","? This cannot be undone."),buttons:[{label:"Yes",onClick:function(){var r=new URLSearchParams(window.location.search);if(t){var n=Object(k.h)(e.gridData);r.set("gridData","0".repeat(n.length))}else r.set("gridData",Object(k.h)(e.gridData));r.set("isAuthoring",JSON.stringify(t)),window.location.search=r.toString()}},{label:"No"}]})}},{key:"revealSolution",value:function(){var e=this;Object(v.confirmAlert)({title:"Confirmation",message:"Are you sure you want to reveal the solution? This spoils the fun!",buttons:[{label:"Yes",onClick:function(){setTimeout((function(){Object(v.confirmAlert)({title:"Solution",childrenElement:function(){var t=e.state,r=t.size,n=t.filledColor,i=t.emptyColor,a=t.solvedColor,o=t.unsolvedColor;return r?Object(A.jsx)(b.a,{isRevealing:!0,isFilling:!1,size:r,filledColor:n,emptyColor:i,solvedColor:a,unsolvedColor:o,gridData:e.gridData}):Object(A.jsx)(A.Fragment,{})},buttons:[{label:"Continue"}]})}),0)}},{label:"No"}]})}},{key:"invert",value:function(){for(var e=Object(k.h)(this.gridData),t="",r=0;r<e.length;r++)t+="1"===e[r]?"0":"1";var n=new URLSearchParams(window.location.search);n.set("gridData",t),window.location.search=n.toString()}},{key:"importImage",value:function(t){var r=this,n=t.target.files[0];t.target.value="",Object(v.confirmAlert)({title:"Confirmation",message:"Are you sure you want to import this image? Your current canvas will be overwritten.",buttons:[{label:"Yes",onClick:function(){var t=new FileReader;t.onload=function(){var t=Object(a.a)(i.a.mark((function t(n){var a,o,l;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x.a.read(e.from(n.target.result));case 2:a=t.sent,o=Math.pow(r.gridData.length,2),a.contrast(1).resize(o,o),(l=new URLSearchParams(window.location.search)).set("gridData",Object(k.g)(a)),window.location.search=l.toString();case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),t.readAsArrayBuffer(n)}},{label:"No"}]})}},{key:"exportImage",value:function(){var e=Object(a.a)(i.a.mark((function e(){var t,r,n,a,o,l,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state,r=t.filledColor,n=t.emptyColor,a=Object(k.i)(Object(k.h)(this.gridData),r,n),e.next=4,a.getBufferAsync(x.a.MIME_PNG);case 4:o=e.sent,l=o.reduce((function(e,t){return e+String.fromCharCode(t)}),""),s=btoa(l),Object(v.confirmAlert)({title:"Image",childrenElement:function(){return Object(A.jsxs)(A.Fragment,{children:['Right-click and "Save Image As" to download the image.',Object(A.jsx)("div",{children:Object(A.jsx)("img",{src:"data:image/png;base64, ".concat(s)})})]})},buttons:[{label:"Continue"}]});case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"share",value:function(){var e=window.location,t=e.protocol,r=e.host,n=e.pathname,i=new URLSearchParams(window.location.search);i.set("isAuthoring","false"),i.set("gridData",Object(k.h)(this.gridData)),navigator.clipboard.writeText("".concat(t,"//").concat(r).concat(n,"?").concat(i.toString())),C.b.success("URL copied to your clipboard!")}},{key:"resizeCanvas",value:function(e){Object(v.confirmAlert)({title:"Confirmation",message:"Are you sure you want to resize? This will clear the canvas.",buttons:[{label:"Yes",onClick:function(){var t=new URLSearchParams(window.location.search);t.set("gridData","0".repeat(Math.pow(e,4))),window.location.search=t.toString()}},{label:"No"}]})}},{key:"print",value:function(){var e=this;this.setState({gridDataToPrint:this.gridData}),Object(v.confirmAlert)({title:"Print",message:"Click this button to print the puzzle. We recommend printing in Landscape mode. ",childrenElement:function(){return Object(A.jsx)(p.a,{trigger:function(){return Object(A.jsx)(j.a,{children:"Print"})},content:function(){return e.printableRef.current}})},buttons:[{label:"Cancel"}]})}},{key:"render",value:function(){var e=this.state,t=e.isAuthoring,r=e.isFilling,n=e.size,i=e.filledColor,a=e.emptyColor,o=e.solvedColor,l=e.unsolvedColor,s=e.gridDataToPrint;return n?Object(A.jsxs)(g.a,{children:[Object(A.jsx)(C.a,{}),Object(A.jsx)(y.a,{}),Object(A.jsx)(w.a,{onCellEdit:this.onCellEdit,onCellChanged:this.onCellChanged,isAuthoring:t,isFilling:r,size:n,filledColor:i,emptyColor:a,solvedColor:o,unsolvedColor:l,gridData:this.gridData,coordinatesOrder:this.coordinatesOrder}),Object(A.jsxs)(f.a,{children:[Object(A.jsx)(z.a,{changeMode:this.changeMode,clear:this.clear,revealSolution:this.revealSolution,invert:this.invert,importImage:this.importImage,exportImage:this.exportImage,share:this.share,resizeCanvas:this.resizeCanvas,print:this.print,isAuthoring:t,gridData:this.gridData}),Object(A.jsx)(D.a,{}),Object(A.jsx)(S.a,{size:n,filledColor:i,emptyColor:a,unsolvedColor:l,gridData:s,coordinatesOrder:this.coordinatesOrder,ref:this.printableRef})]})]}):Object(A.jsx)(A.Fragment,{})}}]),n}(h.a.Component);t.a=G}).call(this,r(4).Buffer)},137:function(e,t,r){"use strict";var n=r(22),i=r(23),a=r(26),o=r(25),l=r(0),s=r.n(l),c=r(33),d=r(57),u=r(1),h=function(e){Object(a.a)(r,e);var t=Object(o.a)(r);function r(){return Object(n.a)(this,r),t.apply(this,arguments)}return Object(i.a)(r,[{key:"render",value:function(){var e=this.props,t=e.onCellEdit,r=e.onCellChanged,n=e.isAuthoring,i=e.isFilling,a=e.size,o=e.filledColor,l=e.emptyColor,s=e.solvedColor,h=e.unsolvedColor,b=e.gridData,j=e.coordinatesOrder;return Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("div",{children:[Object(u.jsx)("div",{className:"grid",children:Object(u.jsx)(c.a,{onCellEdit:t,onCellChanged:r,isAuthoring:n,isFilling:i,size:a,filledColor:o,emptyColor:l,solvedColor:s,unsolvedColor:h,gridData:b})}),!n&&Object(u.jsx)(d.a,{size:a,filledColor:o,emptyColor:l,solvedColor:s,unsolvedColor:h,gridData:b,coordinatesOrder:j})]})})}}]),r}(s.a.Component);t.a=h},138:function(e,t,r){"use strict";r(0);var n=r(31),i=r(28),a=r(305),o=r(89),l=r(15),s=r(69),c=r(1);t.a=function(e){var t=e.changeMode,r=e.clear,d=e.revealSolution,u=e.invert,h=e.importImage,b=e.exportImage,j=e.share,g=e.resizeCanvas,f=e.print,v=e.isAuthoring,C=e.gridData;return Object(c.jsxs)(c.Fragment,{children:[v&&Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(n.a,{children:Object(c.jsxs)(i.a,{children:[Object(c.jsx)(a.a,{title:"Resize Canvas",children:Array(9).fill(0).map((function(e,t){return t+1})).filter((function(e){return e>=3&&e!==C.length})).map((function(e){return Object(c.jsxs)(o.a.Item,{onSelect:function(){return g(e)},children:[e,Object(c.jsx)("sup",{children:"4"})]},e)}))}),Object(c.jsx)(l.a,{onClick:u,children:"Invert"})]})}),Object(c.jsxs)(n.a,{children:[Object(c.jsx)(s.a.Label,{children:"Import from Image"}),Object(c.jsx)(s.a.Control,{type:"file",name:"files",accept:".bmp, .gif, .jpg, .jpeg, .png, .tiff",onChange:h})]}),Object(c.jsx)(n.a,{children:Object(c.jsx)(i.a,{children:Object(c.jsx)(l.a,{onClick:b,children:"Export as Image"})})})]}),!v&&Object(c.jsx)("div",{children:Object(c.jsx)(n.a,{children:Object(c.jsx)(i.a,{children:Object(c.jsx)(s.a.Group,{className:"mb-3",children:Object(c.jsx)(l.a,{variant:"warning",onClick:d,children:"Reveal Solution"})})})})}),Object(c.jsx)(n.a,{children:Object(c.jsxs)(i.a,{children:[Object(c.jsx)(l.a,{variant:"danger",onClick:r,children:"Clear"}),Object(c.jsx)(l.a,{variant:"danger",onClick:t,children:v?"Play":"Edit"})]})}),Object(c.jsx)(n.a,{children:Object(c.jsxs)(i.a,{children:[Object(c.jsx)(l.a,{onClick:f,children:"Print"}),Object(c.jsx)(l.a,{onClick:j,children:"Share"})]})})]})}},145:function(e,t,r){"use strict";var n=r(22),i=r(23),a=r(26),o=r(25),l=r(0),s=r.n(l),c=r(56),d=r(33),u=r(57),h=r(63),b=r(1),j=function(e){Object(a.a)(r,e);var t=Object(o.a)(r);function r(){return Object(n.a)(this,r),t.apply(this,arguments)}return Object(i.a)(r,[{key:"render",value:function(){var e=this.props,t=e.size,r=e.filledColor,n=e.emptyColor,i=e.unsolvedColor,a=e.gridData,o=e.coordinatesOrder;return a?Object(b.jsxs)("div",{className:"print",children:[Object(b.jsx)(c.a,{}),a&&Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("div",{className:"grid",children:Object(b.jsx)(d.a,{size:t,filledColor:r,emptyColor:n,solvedColor:i,unsolvedColor:i,gridData:a})}),Object(b.jsx)(u.a,{size:t,filledColor:r,emptyColor:n,solvedColor:i,unsolvedColor:i,gridData:a,coordinatesOrder:o})]}),Object(b.jsx)(h.a,{})]}):Object(b.jsx)(b.Fragment,{})}}]),r}(s.a.Component);t.a=j},150:function(e,t,r){},178:function(e,t){},180:function(e,t){},302:function(e,t,r){},304:function(e,t,r){"use strict";r.r(t);var n=r(0),i=r.n(n),a=r(21),o=r.n(a),l=(r(150),r(135)),s=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,310)).then((function(t){var r=t.getCLS,n=t.getFID,i=t.getFCP,a=t.getLCP,o=t.getTTFB;r(e),n(e),i(e),a(e),o(e)}))},c=r(1);o.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(l.a,{})}),document.getElementById("root")),s()},33:function(e,t,r){"use strict";r(0);var n=r(66),i=r(9),a=r(1);t.a=function(e){var t=e.onCellEdit,r=e.onCellChanged,o=e.isAuthoring,l=e.isFilling,s=e.isRevealing,c=e.size,d=e.filledColor,u=e.emptyColor,h=e.solvedColor,b=e.unsolvedColor,j=e.gridData;return Object(a.jsx)("table",{children:Object(a.jsxs)("tbody",{children:[Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{}),Array(c).fill().map((function(e,t){return Object(a.jsx)("td",{children:Object(i.e)(t)},t)}))]}),Array(c).fill().map((function(e,g){return Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{children:Object(i.f)(g)}),Array(c).fill().map((function(e,i){return Object(a.jsx)(n.a,{onCellEdit:t,onCellChanged:r,isAuthoring:o,isFilling:l,isRevealing:s,size:c,filledColor:d,emptyColor:u,solvedColor:h,unsolvedColor:b,gridY:g,gridX:i,initialSubGridData:j[g][i]},i)}))]},g)}))]})})}},56:function(e,t,r){"use strict";r(0);var n=r(1);t.a=function(){return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("h1",{children:"Pixel Puzzles"}),Object(n.jsx)("h4",{children:"Copy each square's pattern to the associated coordinates to reveal a secret image!"}),Object(n.jsx)("h6",{children:"Fill the grid in your browser or print the puzzle to complete by hand. Edit the puzzle or generate your own using any image. Share puzzles with your friends and family!"})]})}},57:function(e,t,r){"use strict";r(0);var n=r(66),i=r(9),a=r(1);t.a=function(e){var t=e.size,r=e.filledColor,o=e.emptyColor,l=e.solvedColor,s=e.unsolvedColor,c=e.gridData;return e.coordinatesOrder.map((function(e,d){var u=e.x,h=e.y;return Object(a.jsx)("table",{className:"coordinates",children:Object(a.jsxs)("tbody",{children:[Object(a.jsx)("tr",{children:Object(a.jsx)("td",{children:Object(i.d)(u,h)})}),Object(a.jsx)("tr",{children:Object(a.jsx)(n.a,{isCoordinate:!0,size:t,filledColor:r,emptyColor:o,solvedColor:l,unsolvedColor:s,gridY:h,gridX:u,initialSubGridData:c[h][u]})})]})},d)}))}},63:function(e,t,r){"use strict";r(0);var n=r(31),i=r(28),a=r(143),o=r(144),l=r(1);t.a=function(){return Object(l.jsx)(n.a,{className:"footer",children:Object(l.jsxs)(i.a,{children:["Created by ",Object(l.jsx)("a",{href:"https://github.com/BrandonE",target:"_blank",rel:"noreferrer",children:"Brandon Evans"}),". Inspired by ",Object(l.jsx)("a",{href:"https://web.archive.org/web/20111027002447/http://www.tipstricks.com/puzzles.html",target:"_blank",rel:"noreferrer",children:"Pencil Puzzles"})," from ",Object(l.jsx)("a",{href:"https://en.wikipedia.org/wiki/Tips_%26_Tricks_(magazine)",children:"Tips & Tricks Magazine"}),"\xa0 ",Object(l.jsx)("a",{href:"https://github.com/BrandonE/pixel-puzzles",target:"_blank",rel:"noreferrer",children:Object(l.jsx)(a.a,{icon:o.a})})]})})}},66:function(e,t,r){"use strict";var n=r(22),i=r(23),a=r(11),o=r(26),l=r(25),s=r(0),c=r.n(s),d=r(9),u=r(1),h=function(e){var t=e.onCellEdit,r=e.onCellChanged,n=e.filledColor,i=e.emptyColor,a=e.gridY,o=e.gridX,l=e.subGridY,s=e.subGridX,c=e.isFilled;return Object(u.jsx)("td",{className:"cell",style:{backgroundColor:Object(d.a)(c?n:i)},onPointerDown:function(){var n=e.isFilled;t&&t(n),r&&r(a,o,l,s,!n)},onMouseEnter:function(t){var n=e.isFilling;(r&&void 0===t.buttons?1===t.which:1===t.buttons)&&r(a,o,l,s,n)}})},b=function(e){Object(o.a)(r,e);var t=Object(l.a)(r);function r(e){var i;Object(n.a)(this,r),i=t.call(this);for(var o=e.isAuthoring,l=e.isCoordinate,s=e.isRevealing,c=e.size,d=e.initialSubGridData,u=[],h=[],b=0;b<c;b++){for(var j=[],g=[],f=0;f<c;f++)if(d){var v=d[b][f];j.push(v),o||l?g.push(v):g.push(0)}else j.push(0),g.push(0);u.push(j),h.push(g)}return i.state={subGridData:u,subGridFilling:h},s&&setTimeout((function(){i.setState({subGridFilling:u})}),1e3*Math.random()),i.onCellChanged=i.onCellChanged.bind(Object(a.a)(i)),i.isSolved=i.isSolved.bind(Object(a.a)(i)),i}return Object(i.a)(r,[{key:"onCellChanged",value:function(e,t,r,n,i){var a=this.props,o=a.onCellChanged,l=a.isAuthoring,s=a.isCoordinate,c=this.state,d=c.subGridData,u=c.subGridFilling;!s&&o&&(l&&(d[r][n]=i?1:0,u[r][n]=d[r][n],o(e,t,r,n,i)),u[r][n]=i?1:0),this.setState({subGridData:d,subGridFilling:u})}},{key:"isSolved",value:function(){var e=this.props,t=e.isAuthoring,r=e.isCoordinate,n=this.state,i=n.subGridData,a=n.subGridFilling;return!t&&!r&&JSON.stringify(i)===JSON.stringify(a)}},{key:"render",value:function(){var e=this,t=this.props,r=t.onCellEdit,n=t.isFilling,i=t.filledColor,a=t.emptyColor,o=t.solvedColor,l=t.unsolvedColor,s=t.gridY,c=t.gridX,b=this.state.subGridFilling;return Object(u.jsx)("td",{className:"subGrid",style:{border:"1px solid ".concat(Object(d.a)(this.isSolved()?o:l))},children:Object(u.jsx)("table",{children:Object(u.jsx)("tbody",{children:b.map((function(t,o){return Object(u.jsx)("tr",{children:t.map((function(t,l){return Object(u.jsx)(h,{onCellEdit:r,onCellChanged:e.onCellChanged,isFilling:n,filledColor:i,emptyColor:a,gridY:s,gridX:c,subGridY:o,subGridX:l,isFilled:t},l)}))},o)}))})})})}}]),r}(c.a.Component);t.a=b},9:function(e,t,r){"use strict";r.d(t,"h",(function(){return a})),r.d(t,"c",(function(){return o})),r.d(t,"b",(function(){return l})),r.d(t,"g",(function(){return s})),r.d(t,"i",(function(){return c})),r.d(t,"a",(function(){return d})),r.d(t,"e",(function(){return u})),r.d(t,"f",(function(){return h})),r.d(t,"d",(function(){return b}));var n=r(27),i=r.n(n),a=function(e){return e.flat().flat().flat().join("")},o=function(e,t){for(var r=[],n=0,i=0;i<e;i++){for(var a=[],o=0;o<e;o++){for(var l=[],s=0;s<e;s++){for(var c=[],d=0;d<e;d++){var u=t?t[n]:"0";c.push("1"===u?1:0),n++}l.push(c)}a.push(l)}r.push(a)}return r},l=function(e){for(var t=[],r=0;r<e;r++)for(var n=0;n<e;n++)t.push({x:n,y:r});return function(e){var t,r,n=e.length;if(0===n)return e;for(;--n;)t=Math.floor(Math.random()*(n+1)),r=e[n],e[n]=e[t],e[t]=r;return e}(t)},s=function(e){var t="",r=e.bitmap,n=r.width,a=r.height,o=Math.sqrt(Math.sqrt(n*a));if(o%1!==0)throw new Error("Invalid image size.");for(var l=0;l<o;l++)for(var s=0;s<o;s++)for(var c=0;c<o;c++)for(var d=0;d<o;d++){var u=s*o+d,h=l*o+c,b=i.a.intToRGBA(e.getPixelColor(u,h)),j=b.r,g=b.g,f=b.b,v=b.a;t+=j*g*f>=8290687.5||0===v?"0":"1"}return t},c=function(e,t,r){var n=Math.sqrt(e.length),a=Math.sqrt(n);if(a%1!==0)throw new Error("Invalid image size.");for(var o=new i.a(n,n),l=0,s=0;s<a;s++)for(var c=0;c<a;c++)for(var d=0;d<a;d++)for(var u=0;u<a;u++){var h=c*a+u,b=s*a+d,j=i.a.intToRGBA("1"===e[l]?t:r),g=j.r,f=j.g,v=j.b;o.setPixelColor(i.a.rgbaToInt(g,f,v,255),h,b),l++}return o},d=function(e){return"#".concat(e.toString(16).toUpperCase().padStart(6,"0"))},u=function(e){return"ABCDEFGHIJK"[e]},h=function(e){return e+1},b=function(e,t){return u(e)+h(t)}}},[[304,1,2]]]);
//# sourceMappingURL=main.9492d013.chunk.js.map