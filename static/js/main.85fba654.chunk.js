(this["webpackJsonppixel-puzzles"]=this["webpackJsonppixel-puzzles"]||[]).push([[0],{143:function(e,t,i){},171:function(e,t){},173:function(e,t){},293:function(e,t,i){},296:function(e,t,i){"use strict";i.r(t);var n=i(1),r=i.n(n),a=i(25),o=i.n(a),s=(i(143),i(18)),c=i.n(s),l=i(30),d=i(13),u=i(14),h=i(8),g=i(16),b=i(15),j=i(27),m=i.p+"static/media/x.f5457199.svg",p=i(19),f=i.n(p),C=function(e){return e.flat().flat().flat().join("")},O=function(e){for(var t="",i=0;i<e.length;i+=4){var n=e.substring(i,i+4);4===n.length?t+=parseInt(n,2).toString(16).toUpperCase():t+="_"+n}return t},v=function(e){for(var t=[],i=0;i<e;i++)for(var n=0;n<e;n++)t.push({x:n,y:i});return function(e){var t,i,n=e.length;if(0===n)return e;for(;--n;)t=Math.floor(Math.random()*(n+1)),i=e[n],e[n]=e[t],e[t]=i;return e}(t)},x=function(e,t,i){var n="",r=e.bitmap,a=r.width,o=r.height,s=t*i;if(s!==a||s!==o)throw new Error("Invalid image size.");for(var c=0;c<t;c++)for(var l=0;l<t;l++)for(var d=0;d<i;d++)for(var u=0;u<i;u++){var h=l*i+u,g=c*i+d,b=f.a.intToRGBA(e.getPixelColor(h,g)),j=b.r,m=b.g,p=b.b,C=b.a;n+=j+m+p>=382.5||0===C?"0":"1"}return n},F=function(e,t,i){for(var n=C(e),r=e.length,a=e[0][0].length,o=r*a,s=new f.a(o,o),c=0,l=0;l<r;l++)for(var d=0;d<r;d++)for(var u=0;u<a;u++)for(var h=0;h<a;h++){var g=d*a+h,b=l*a+u,j=f.a.intToRGBA("1"===n[c]?t:i),m=j.r,p=j.g,O=j.b;s.setPixelColor(f.a.rgbaToInt(m,p,O,255),g,b),c++}return s},y=function(e,t,i,n){if(!t||"classic"===t)return["ABCDEFGHIJK"[e]];if("nonogram"===t){for(var r=[],a=0,o=0;o<n;o++)i[o][e][0][0]?a++:(a&&r.push(a),a=0);return 0!==a?r.push(a):0===r.length&&r.push(0),r}},S=function(e,t,i,n){if(!t||"classic"===t)return e+1;if("nonogram"===t){for(var r=[],a=0,o=0;o<n;o++)i[e][o][0][0]?a++:(a&&r.push(a),a=0);return 0!==a?r.push(a):0===r.length&&r.push(0),r.join(",")}},w=function(e){return"#".concat(e.toString(16).toUpperCase().padStart(6,"0"))},z=function(e,t){return y(e)[0]+S(t)},k=i(0),A=function(e){var t=r.a.useState({isCrossedOut:!1}),i=Object(j.a)(t,2),n=i[0],a=i[1],o=e.onCellEdit,s=e.onCellChanged,c=e.game,l=e.filledColor,d=e.emptyColor,u=e.gridY,h=e.gridX,g=e.subGridY,b=e.subGridX,p=e.cellWidthAndHeight,f=e.isFilled;return Object(k.jsx)("td",{className:"cell",style:{backgroundColor:n.isCrossedOut?void 0:w(f?l:d),backgroundImage:n.isCrossedOut?"url(".concat(m,")"):void 0,minWidth:p,minHeight:p,width:p,height:p},onPointerDown:function(t){if(2!==t.button){var i=e.isAuthoring,r=e.isFilled;!o||(o(r),"nonogram"!==c||"touch"!==t.pointerType||i||!r||n.isCrossedOut)?(s&&s(u,h,g,b,!r),a({isCrossedOut:!1})):a({isCrossedOut:r})}},onContextMenu:function(t){t.preventDefault();var i=e.onCrossOut;if("nonogram"===c&&!e.isAuthoring&&i){var r=!n.isCrossedOut;i(r),a({isCrossedOut:r}),s(u,h,g,b,!1)}},onMouseEnter:function(t){var i=e.isAuthoring,n=e.isFilling,r=e.isCrossingOut;(s&&void 0===t.buttons?1===t.which:1===t.buttons)?(s(u,h,g,b,n),n&&a({isCrossedOut:!1})):"nonogram"!==c||2!==t.buttons||i||(a({isCrossedOut:r}),r&&s(u,h,g,b,!1))}})},G=function(e){Object(g.a)(i,e);var t=Object(b.a)(i);function i(e){var n;Object(d.a)(this,i),n=t.call(this);for(var r=e.isAuthoring,a=e.isCoordinate,o=e.isRevealing,s=e.subGridSize,c=e.initialSubGridData,l=[],u=[],g=0;g<s;g++){for(var b=[],j=[],m=0;m<s;m++)if(c){var p=c[g][m];b.push(p),r||a?j.push(p):j.push(0)}else b.push(0),j.push(0);l.push(b),u.push(j)}return n.state={subGridData:l,subGridFilling:u},o&&setTimeout((function(){n.setState({subGridFilling:l})}),1e3*Math.random()),n.onCellChanged=n.onCellChanged.bind(Object(h.a)(n)),n.isSolved=n.isSolved.bind(Object(h.a)(n)),n}return Object(u.a)(i,[{key:"onCellChanged",value:function(e,t,i,n,r){var a=this.props,o=a.onCellChanged,s=a.isAuthoring,c=a.isCoordinate,l=this.state,d=l.subGridData,u=l.subGridFilling;!c&&o&&(s&&(d[i][n]=r?1:0,u[i][n]=d[i][n],o(e,t,i,n,r)),u[i][n]=r?1:0),this.setState({subGridData:d,subGridFilling:u})}},{key:"isSolved",value:function(){var e=this.props,t=e.isAuthoring,i=e.isCoordinate,n=this.state,r=n.subGridData,a=n.subGridFilling;return!t&&!i&&JSON.stringify(r)===JSON.stringify(a)}},{key:"render",value:function(){var e=this,t=this.props,i=t.onCellEdit,n=t.onCrossOut,r=t.isCoordinate,a=t.game,o=t.isAuthoring,s=t.isFilling,c=t.isCrossingOut,l=t.isPrinting,d=t.filledColor,u=t.emptyColor,h=t.solvedColor,g=t.unsolvedColor,b=t.cellWidthAndHeight,j=t.gridY,m=t.gridX,p=this.state.subGridFilling;return Object(k.jsx)("td",{className:"subGrid",style:{border:"classic"===a?"1px solid ".concat(w(this.isSolved()?h:g)):void 0,minWidth:b,minHeight:b,touchAction:r?"auto":"none"},children:Object(k.jsx)("table",{children:Object(k.jsx)("tbody",{children:p.map((function(t,r){return Object(k.jsx)("tr",{children:t.map((function(t,h){return Object(k.jsx)(A,{onCellEdit:i,onCellChanged:e.onCellChanged,onCrossOut:n,game:a,isAuthoring:o,isFilling:s,isCrossingOut:c,isPrinting:l,filledColor:d,emptyColor:u,gridY:j,gridX:m,subGridY:r,subGridX:h,cellWidthAndHeight:b,isFilled:t},h)}))},r)}))})})})}}]),i}(r.a.Component),D=function(e){var t=e.onCellEdit,i=e.onCellChanged,n=e.onCrossOut,r=e.getCellWidthAndHeight,a=e.game,o=e.isAuthoring,s=e.isFilling,c=e.isCrossingOut,l=e.isRevealing,d=e.isPrinting,u=e.gridSize,h=e.subGridSize,g=e.filledColor,b=e.emptyColor,j=e.solvedColor,m=e.unsolvedColor,p=e.gridData,f=e.noFloat,C=r(d),O=C.match(/[0-9]\.*[0-9]*vw/)[0],v=parseFloat(O.split("vw")[0])/2,x=C.replace(O,"".concat(v,"vw")).replace("40px","20px");return Object(k.jsxs)("div",{className:"grid",style:{float:"classic"!==a||f?void 0:"left",paddingRight:"classic"===a?"20px":void 0},children:[Object(k.jsx)("table",{style:{margin:"nonogram"===a?"auto":void 0},children:Object(k.jsxs)("tbody",{children:[("classic"===a||!o)&&Object(k.jsxs)("tr",{children:[Object(k.jsx)("td",{}),Array(u).fill().map((function(e,t){return Object(k.jsx)("td",{style:{fontSize:"nonogram"===a?x:void 0,verticalAlign:"bottom",paddingDown:"5px"},children:y(t,a,p,u).map((function(e,t){return Object(k.jsxs)("span",{children:[e,Object(k.jsx)("br",{})]},t)}))},t)}))]}),Array(u).fill().map((function(e,r){return Object(k.jsxs)("tr",{children:[("classic"===a||!o)&&Object(k.jsx)("td",{style:{fontSize:"nonogram"===a?x:void 0,textAlign:"right",paddingRight:"5px"},children:S(r,a,p,u)}),Array(u).fill().map((function(e,f){return Object(k.jsx)(G,{onCellEdit:t,onCellChanged:i,onCrossOut:n,game:a,isAuthoring:o,isFilling:s,isCrossingOut:c,isRevealing:l,isPrinting:d,gridSize:u,subGridSize:h,filledColor:g,emptyColor:b,solvedColor:j,unsolvedColor:m,gridY:r,gridX:f,cellWidthAndHeight:C,initialSubGridData:p[r][f]},f)}))]},r)}))]})}),!o&&"nonogram"===a&&Object(k.jsx)(k.Fragment,{children:Object(k.jsx)("p",{style:{fontSize:x,textAlign:"center"},children:Object(k.jsxs)("strong",{children:["Grid size: ",u,"x",u]})})})]})},E=i(129),I=i(302),R=i(20),P=i(63),M=i(54),L=i(128),W=i.n(L),H=(i(290),i(291),i(292),i(293),function(e){Object(g.a)(i,e);var t=Object(b.a)(i);function i(e){var n;return Object(d.a)(this,i),(n=t.call(this,e)).state={hasError:!1},n}return Object(u.a)(i,[{key:"componentDidCatch",value:function(e){this.setState({hasError:!0}),this.props.onError(e)}},{key:"render",value:function(){return this.state.hasError?Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("h1",{children:"Something went wrong."}),Object(k.jsx)(E.a,{variant:"primary",type:"submit",onClick:function(){return window.location.reload(!1)},children:"Reload application"})]}):this.props.children}}]),i}(n.Component)),N=function(e){return Object(k.jsxs)(k.Fragment,{children:["classic"===e.game&&Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("h1",{children:"Pixel Puzzles - Classic"}),Object(k.jsx)("h4",{children:"Copy each square's pattern to the associated coordinates to reveal a secret image!"})]}),"nonogram"===e.game&&Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("h1",{children:"Pixel Puzzles - Nonogram"}),Object(k.jsxs)("h4",{children:["Solve the ",e.isPrinting&&Object(k.jsx)(k.Fragment,{children:"Nonogram"})," ",!e.isPrinting&&Object(k.jsx)("a",{href:"https://en.wikipedia.org/wiki/Nonogram",children:"Nonogram"})," to reveal a secret image!\xa0",!e.isPrinting&&Object(k.jsx)("a",{href:"https://www.youtube.com/watch?v=zisu0Qf4TAI",children:"Nonogram Tutorial"})]})]}),Object(k.jsxs)("h6",{children:["Fill the grid in your browser or print the puzzle to complete by hand. Edit the puzzle or generate your own using any image. Share puzzles with your friends and family! ",e.isPrinting&&Object(k.jsx)(k.Fragment,{children:"https://brandone.github.io/pixel-puzzles/"})]}),!e.isPrinting&&Object(k.jsxs)(k.Fragment,{children:[e.changeGame&&"classic"===e.game&&Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("h6",{children:Object(k.jsx)("strong",{children:"Left-click or touch to fill or unfill a cell"})}),Object(k.jsx)("br",{}),Object(k.jsx)("h4",{children:Object(k.jsx)("a",{href:"",onClick:function(t){t.preventDefault(),e.changeGame("nonogram")},children:"Switch to Nonogram mode"})})]}),e.changeGame&&"nonogram"===e.game&&Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("h6",{children:Object(k.jsx)("strong",{children:"Left-click or touch to fill or unfill a cell. Right-click to cross out or uncross out a cell. On mobile, touching a filled cell will cross it out, and touching a crossed out cell will unfill it"})}),Object(k.jsx)("br",{}),Object(k.jsx)("h4",{children:Object(k.jsx)("a",{href:"",onClick:function(t){t.preventDefault(),e.changeGame("classic")},children:"Switch to Classic mode"})})]})]})]})},T=function(e){var t=e.getCellWidthAndHeight,i=e.isPrinting,n=e.gridSize,r=e.subGridSize,a=e.filledColor,o=e.emptyColor,s=e.solvedColor,c=e.unsolvedColor,l=e.gridData,d=e.coordinatesOrder,u=t(i);return d.map((function(e,t){var i=e.x,d=e.y;return Object(k.jsx)("table",{className:"coordinates",children:Object(k.jsxs)("tbody",{children:[Object(k.jsx)("tr",{children:Object(k.jsx)("td",{children:z(i,d)})}),Object(k.jsx)("tr",{children:Object(k.jsx)(G,{game:"classic",isCoordinate:!0,gridSize:n,subGridSize:r,filledColor:a,emptyColor:o,solvedColor:s,unsolvedColor:c,gridY:d,gridX:i,cellWidthAndHeight:u,initialSubGridData:l[d][i]})})]})},t)}))},B=function(e){Object(g.a)(i,e);var t=Object(b.a)(i);function i(){return Object(d.a)(this,i),t.apply(this,arguments)}return Object(u.a)(i,[{key:"render",value:function(){var e=this.props,t=e.onCellEdit,i=e.onCellChanged,n=e.onCrossOut,r=e.getCellWidthAndHeight,a=e.game,o=e.isAuthoring,s=e.isFilling,c=e.isCrossingOut,l=e.gridSize,d=e.subGridSize,u=e.filledColor,h=e.emptyColor,g=e.solvedColor,b=e.unsolvedColor,j=e.gridData,m=e.coordinatesOrder;return Object(k.jsxs)("div",{children:[Object(k.jsx)(D,{onCellEdit:t,onCellChanged:i,onCrossOut:n,getCellWidthAndHeight:r,game:a,isAuthoring:o,isFilling:s,isCrossingOut:c,gridSize:l,subGridSize:d,filledColor:u,emptyColor:h,solvedColor:g,unsolvedColor:b,gridData:j}),!o&&"classic"===a&&Object(k.jsx)(T,{getCellWidthAndHeight:r,gridSize:l,subGridSize:d,filledColor:u,emptyColor:h,solvedColor:g,unsolvedColor:b,gridData:j,coordinatesOrder:m})]})}}]),i}(r.a.Component),U=i(300),Y=i(130),_=i(301),J=i(138),X=function(e){var t=e.game,i=e.changeMode,n=e.clear,r=e.revealSolution,a=e.invert,o=e.importImage,s=e.exportImage,c=e.share,l=e.resizeGrids,d=e.print,u=e.isAuthoring,h=e.isReadOnly,g=e.gridSizeMin,b=e.gridSizeMax,j=e.subGridSizeMin,m=e.subGridSizeMax,p=e.nonogramGridSizeMin,f=e.nonogramGridSizeMax,C=e.gridData,O=C.length,v=C[0][0].length;return Object(k.jsxs)(k.Fragment,{children:[u&&Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(U.a,{children:Object(k.jsxs)(Y.a,{children:[Object(k.jsx)(_.a,{title:"Resize Grid",children:Array("classic"===t?b:f).fill(0).map((function(e,t){return t+1})).filter((function(e){return e>=("classic"===t?g:p)&&e!==O})).map((function(e){return Object(k.jsxs)(J.a.Item,{onSelect:function(){return l(e,v)},children:[e,"x",e]},e)}))}),"classic"===t&&Object(k.jsx)(_.a,{title:"Resize Sub-Grid",children:Array(m).fill(0).map((function(e,t){return t+1})).filter((function(e){return e>=j&&e!==v})).map((function(e){return Object(k.jsxs)(J.a.Item,{onSelect:function(){return l(O,e)},children:[e,"x",e]},e)}))}),Object(k.jsx)(E.a,{onClick:a,children:"Invert"})]})}),Object(k.jsxs)(U.a,{children:[Object(k.jsx)(I.a.Label,{children:"Import from Image"}),Object(k.jsx)(I.a.Control,{type:"file",name:"files",accept:".bmp, .gif, .jpg, .jpeg, .png, .tiff",onChange:o})]}),Object(k.jsx)(U.a,{children:Object(k.jsx)(Y.a,{children:Object(k.jsx)(E.a,{onClick:s,children:"Export as Image"})})})]}),!u&&!h&&Object(k.jsx)(U.a,{children:Object(k.jsx)(Y.a,{children:Object(k.jsx)(I.a.Group,{className:"mb-3",children:Object(k.jsx)(E.a,{variant:"warning",onClick:r,children:"Reveal Solution"})})})}),!h&&Object(k.jsx)(U.a,{children:Object(k.jsxs)(Y.a,{children:[Object(k.jsx)(E.a,{variant:"danger",onClick:n,children:"Clear"}),Object(k.jsx)(E.a,{variant:"danger",onClick:i,children:u?"Play":"Edit"})]})}),Object(k.jsx)(U.a,{children:Object(k.jsxs)(Y.a,{children:[Object(k.jsx)(E.a,{onClick:d,children:"Print"}),Object(k.jsx)(E.a,{onClick:c,children:"Share"})]})})]})},q=i(134),Q=i(135),K=function(e){return Object(k.jsx)(U.a,{className:"footer",children:Object(k.jsxs)(Y.a,{children:["Created by ",Object(k.jsx)("a",{href:"https://github.com/BrandonE",target:"_blank",rel:"noreferrer",children:"Brandon Evans"}),"classic"===e.game&&Object(k.jsxs)(k.Fragment,{children:[".\xa0Inspired by ",Object(k.jsx)("a",{href:"https://web.archive.org/web/20111027002447/http://www.tipstricks.com/puzzles.html",target:"_blank",rel:"noreferrer",children:"Pencil Puzzles"})," from ",Object(k.jsx)("a",{href:"https://en.wikipedia.org/wiki/Tips_%26_Tricks_(magazine)",children:"Tips & Tricks Magazine"})]}),"\xa0 ",Object(k.jsx)("a",{href:"https://github.com/BrandonE/pixel-puzzles",target:"_blank",rel:"noreferrer",children:Object(k.jsx)(q.a,{icon:Q.a})})]})})},V=i(136),Z=i.n(V),$=i(137),ee=i.n($),te=(i(295),function(e){Object(g.a)(i,e);var t=Object(b.a)(i);function i(){var e;return Object(d.a)(this,i),(e=t.call(this)).state={isCropping:!0,crop:{}},e.cropComponentRef=r.a.createRef(),e.onImageLoaded=e.onImageLoaded.bind(Object(h.a)(e)),e.getCroppedImg=e.getCroppedImg.bind(Object(h.a)(e)),e.onCropComplete=e.onCropComplete.bind(Object(h.a)(e)),e.onCropChange=e.onCropChange.bind(Object(h.a)(e)),e.onAspectChange=e.onAspectChange.bind(Object(h.a)(e)),e}return Object(u.a)(i,[{key:"componentDidMount",value:function(){this.onAspectChange(!0)}},{key:"onImageLoaded",value:function(e){this.imageRef=e}},{key:"getCroppedImg",value:function(){var e=Object(l.a)(c.a.mark((function e(t,i,n){var r,a,o,s,l,d=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=document.createElement("canvas"),a=window.devicePixelRatio,o=t.naturalWidth/t.width,s=t.naturalHeight/t.height,l=r.getContext("2d"),r.width=i.width*a*o,r.height=i.height*a*s,l.setTransform(a,0,0,a,0,0),l.imageSmoothingQuality="high",l.drawImage(t,i.x*o,i.y*s,i.width*o,i.height*s,0,0,i.width*o,i.height*s),e.abrupt("return",new Promise((function(e,t){r.toBlob((function(i){i?(i.name=n,window.URL.revokeObjectURL(d.fileUrl),d.fileUrl=window.URL.createObjectURL(i),e(d.fileUrl)):t(new Error("Canvas is empty"))}),"image/png")})));case 11:case"end":return e.stop()}}),e)})));return function(t,i,n){return e.apply(this,arguments)}}()},{key:"onCropComplete",value:function(){var e=Object(l.a)(c.a.mark((function e(t){var i;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(this.imageRef&&t.width&&t.height)){e.next=7;break}return this.setState({isCropping:!0}),e.next=4,this.getCroppedImg(this.imageRef,t,"newFile.png");case 4:i=e.sent,this.props.onCropProcessed(i),this.setState({isCropping:!1});case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"onCropChange",value:function(e,t){this.setState({crop:t})}},{key:"onAspectChange",value:function(e){var t,i,n=this,r=this.props,a=r.width,o=r.height,s=!this.state.crop.aspect;s?a<o?(t=100,i=a/o*100):(i=100,t=o/a*100):(t=100,i=100),this.setState({crop:{unit:"%",width:t,height:i,x:0,y:0,aspect:s?1:void 0}},(function(){e||n.cropComponentRef.current.onMediaLoaded()}))}},{key:"render",value:function(){var e=this,t=this.props.imageSrc,i=this.state,n=i.isCropping,r=i.crop;return Object(k.jsxs)("div",{children:[Object(k.jsx)(M.a,{loading:n,position:"global"}),Object(k.jsx)(ee.a,{children:Object(k.jsx)(Z.a,{src:t,crop:r,ruleOfThirds:!0,onImageLoaded:this.onImageLoaded,onComplete:this.onCropComplete,onChange:this.onCropChange,ref:this.cropComponentRef})}),Object(k.jsx)(I.a,{children:Object(k.jsx)(I.a.Group,{controlId:"formBasicCheckbox",children:Object(k.jsx)(I.a.Check,{type:"checkbox",label:"Square Aspect Ratio (1:1)",checked:!!r.aspect,onChange:function(){return e.onAspectChange()}})})})]})}}]),i}(r.a.Component)),ie=function(e){Object(g.a)(i,e);var t=Object(b.a)(i);function i(){return Object(d.a)(this,i),t.apply(this,arguments)}return Object(u.a)(i,[{key:"render",value:function(){var e=this.props,t=e.getCellWidthAndHeight,i=e.game,n=e.gridSize,r=e.subGridSize,a=e.filledColor,o=e.emptyColor,s=e.unsolvedColor,c=e.gridData,l=e.coordinatesOrder;return c?Object(k.jsxs)("div",{className:"print",children:[Object(k.jsx)(N,{game:i,isPrinting:!0}),c&&Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(D,{getCellWidthAndHeight:t,game:i,isPrinting:!0,gridSize:n,subGridSize:r,filledColor:a,emptyColor:o,solvedColor:s,unsolvedColor:s,gridData:c}),"classic"===i&&Object(k.jsx)(T,{getCellWidthAndHeight:t,isPrinting:!0,gridSize:n,subGridSize:r,filledColor:a,emptyColor:o,solvedColor:s,unsolvedColor:s,gridData:c,coordinatesOrder:l})]}),Object(k.jsx)(K,{game:i})]}):Object(k.jsx)(k.Fragment,{})}}]),i}(r.a.Component),ne=4294967295,re=4294902015,ae=2155905279,oe=function(e){e.preventDefault(),e.returnValue=""},se=function(e){Object(g.a)(i,e);var t=Object(b.a)(i);function i(){var e;return Object(d.a)(this,i),(e=t.call(this)).state={game:"classic",isAuthoring:!1,isReadOnly:!1,isFilling:!1,isCrossingOut:!1,isLoading:!1,gridSize:void 0,subGridSize:void 0},e.printableRef=r.a.createRef(),e.initializeGrid=e.initializeGrid.bind(Object(h.a)(e)),e.onCellEdit=e.onCellEdit.bind(Object(h.a)(e)),e.onCellChanged=e.onCellChanged.bind(Object(h.a)(e)),e.onCrossOut=e.onCrossOut.bind(Object(h.a)(e)),e.changeGame=e.changeGame.bind(Object(h.a)(e)),e.confirmChangeGame=e.confirmChangeGame.bind(Object(h.a)(e)),e.changeMode=e.changeMode.bind(Object(h.a)(e)),e.confirmChangeMode=e.confirmChangeMode.bind(Object(h.a)(e)),e.clear=e.clear.bind(Object(h.a)(e)),e.revealSolution=e.revealSolution.bind(Object(h.a)(e)),e.invert=e.invert.bind(Object(h.a)(e)),e.onCropProcessed=e.onCropProcessed.bind(Object(h.a)(e)),e.importImage=e.importImage.bind(Object(h.a)(e)),e.confirmImportImage=e.confirmImportImage.bind(Object(h.a)(e)),e.exportImage=e.exportImage.bind(Object(h.a)(e)),e.share=e.share.bind(Object(h.a)(e)),e.resizeGrids=e.resizeGrids.bind(Object(h.a)(e)),e.getCellWidthAndHeight=e.getCellWidthAndHeight.bind(Object(h.a)(e)),e.print=e.print.bind(Object(h.a)(e)),e}return Object(u.a)(i,[{key:"componentDidMount",value:function(){var e=new URLSearchParams(window.location.search),t=Object.fromEntries(e.entries()),i=["classic","nonogram"].includes(t.game)?t.game:"classic",n=parseInt(t.gridSize,10),r=parseInt(t.subGridSize,10);"classic"===i?((!n||n<2||n>9)&&(n=8),(!r||r<2||r>9)&&(r=5)):"nonogram"===i&&((!n||n<5||n>20)&&(n=15),r=1),document.onselectstart=function(){return!1},window.addEventListener("beforeunload",oe);var a=t.gridData;this.initializeGrid(i,n,r,a);var o="true"===t.isAuthoring;this.setState({game:i,isAuthoring:o,isReadOnly:"true"===t.isReadOnly&&!o,gridSize:n,subGridSize:r})}},{key:"componentWillUnmount",value:function(){window.removeEventListener("beforeunload",oe)}},{key:"navigate",value:function(e){window.removeEventListener("beforeunload",oe),window.location.search=e.toString()}},{key:"initializeGrid",value:function(e,t,i,n){n||"classic"!==e||8!==t||5!==i||(n="000000000019C27FFFFFFFFFFFFFFFFC39FFFC000638000000000231BFFFFFBFFFFC7FFFFFFFFFFFFFFFFFE3DFFFDE00431839DEF7FBDEF782000018000001800004000001EF7BDFCE7BDEFFFFFFFB9CE700000000000000000000000001E739CFFFFFFFFFFFFFF39CE700000000000000000000000000E739CFFFFFFFFBDEF3FBFFFDC00873E00001000000080013FDFFFFFFFF7BDC38C6106FBDF7FFFFB410800000840007FFFFFFFFFFFFCC62000000003CE3003FFFFCE0000000000007FFFFF3DCC000000000"),n||"nonogram"!==e||15!==t||(n="07C03FE0FFE33E6600FC01F803F003E00FC01FC07AE3E207C30F0308_0");var r=n.length===Math.pow(t*i,2)?n:function(e){var t=e.split("_"),i=Object(j.a)(t,2),n=i[0],r=i[1];return n.split("").map((function(e){return parseInt(e,16).toString(2).padStart(4,"0")})).join("")+r}(n);this.gridData=function(e,t,i){for(var n=[],r=0,a=0;a<e;a++){for(var o=[],s=0;s<e;s++){for(var c=[],l=0;l<t;l++){for(var d=[],u=0;u<t;u++){var h=i?i[r]:"0";d.push("1"===h?1:0),r++}c.push(d)}o.push(c)}n.push(o)}return n}(t,i,r),this.coordinatesOrder=v(t)}},{key:"onCellEdit",value:function(e){this.setState({isFilling:!e})}},{key:"onCellChanged",value:function(e,t,i,n,r){this.gridData[e][t][i][n]=r?1:0}},{key:"onCrossOut",value:function(e){this.setState({isCrossingOut:e})}},{key:"changeGame",value:function(e){var t=this,i=this.state.isAuthoring;Object(R.confirmAlert)({title:"Confirmation",message:"Are you sure you want to change the game mode? ".concat(i?"This will clear the canvas and cannot be undone.":"This will undo your progress."),buttons:[{label:"Yes",onClick:function(){return t.confirmChangeGame(e)}},{label:"No"}]})}},{key:"confirmChangeGame",value:function(e){var t=new URLSearchParams(window.location.search);t.set("game",e),t.delete("gridData"),t.delete("gridSize"),t.delete("subGridSize"),t.delete("isReadOnly"),this.navigate(t)}},{key:"changeMode",value:function(){this.state.isAuthoring?this.confirmChangeMode():Object(R.confirmAlert)({title:"Confirmation",message:"Are you sure you want to edit the puzzle? This will undo your progress and reveal the solution!",buttons:[{label:"Yes",onClick:this.confirmChangeMode},{label:"No"}]})}},{key:"confirmChangeMode",value:function(){var e=this.state.isAuthoring,t=new URLSearchParams(window.location.search);t.set("gridData",O(C(this.gridData))),t.set("isAuthoring",JSON.stringify(!e)),t.delete("isReadOnly"),this.navigate(t)}},{key:"clear",value:function(){var e=this,t=this.state.isAuthoring;Object(R.confirmAlert)({title:"Confirmation",message:"Are you sure you want to clear ".concat(t?"the canvas":"your progress","? This cannot be undone."),buttons:[{label:"Yes",onClick:function(){var i=new URLSearchParams(window.location.search);t?i.set("gridData","0"):i.set("gridData",O(C(e.gridData))),i.set("isAuthoring",JSON.stringify(t)),e.navigate(i)}},{label:"No"}]})}},{key:"revealSolution",value:function(){var e=this;Object(R.confirmAlert)({title:"Confirmation",message:"Are you sure you want to reveal the solution? This spoils the fun!",buttons:[{label:"Yes",onClick:function(){setTimeout((function(){Object(R.confirmAlert)({title:"Solution",childrenElement:function(){var t=e.state,i=t.game,n=t.gridSize,r=t.subGridSize;return e.gridData?Object(k.jsx)(D,{getCellWidthAndHeight:e.getCellWidthAndHeight,game:i,isRevealing:!0,isFilling:!1,isCrossingOut:!1,gridSize:n,subGridSize:r,filledColor:0,emptyColor:ne,solvedColor:re,unsolvedColor:ae,gridData:e.gridData,noFloat:!0}):Object(k.jsx)(k.Fragment,{})},buttons:[{label:"Continue"}]})}),0)}},{label:"No"}]})}},{key:"invert",value:function(){for(var e=C(this.gridData),t="",i=0;i<e.length;i++)t+="1"===e[i]?"0":"1";var n=new URLSearchParams(window.location.search);n.set("gridData",O(t)),this.navigate(n)}},{key:"onCropProcessed",value:function(e){this.setState({croppedImageUrl:e})}},{key:"importImage",value:function(e){var t=this,i=e.target.files[0];e.target.value="",this.setState({isLoading:!0});var n=new FileReader;n.addEventListener("load",Object(l.a)(c.a.mark((function e(){var i,r,a,o,s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.read(n.result);case 2:return i=e.sent,r=i.bitmap,a=r.width,o=r.height,e.next=6,new Promise((function(e,t){i.getBase64(f.a.MIME_PNG,(function(i,n){i?t(i):e(n)}))}));case 6:s=e.sent,t.setState({isLoading:!1}),Object(R.confirmAlert)({title:"Confirmation",message:"Are you sure you want to import this image? Your current canvas will be overwritten.",childrenElement:function(){return Object(k.jsx)(te,{imageSrc:s,width:a,height:o,onImageLoaded:t.onImageLoaded,onCropProcessed:t.onCropProcessed})},buttons:[{label:"Import",onClick:function(){return t.confirmImportImage()}},{label:"Cancel"}],closeOnClickOutside:!1});case 9:case"end":return e.stop()}}),e)})))),n.readAsDataURL(i)}},{key:"confirmImportImage",value:function(){var e=Object(l.a)(c.a.mark((function e(){var t,i,n,r,a,o,s,l,d,u;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state.croppedImageUrl,this.setState({isLoading:!0}),e.next=4,f.a.read(t);case 4:i=e.sent,n=this.gridData.length,r=this.gridData[0][0].length,a=n*r,o=i.bitmap,s=o.width,l=o.height,d=s>l?s:l,i.background(4294967295).contain(d,d).resize(a,a),(u=new URLSearchParams(window.location.search)).set("gridData",O(x(i,n,r))),this.navigate(u);case 14:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"exportImage",value:function(){var e=Object(l.a)(c.a.mark((function e(){var t,i,n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=F(this.gridData,0,ne),e.next=3,t.getBufferAsync(f.a.MIME_JPEG);case 3:i=e.sent,n=i.reduce((function(e,t){return e+String.fromCharCode(t)}),""),r=btoa(n),Object(R.confirmAlert)({title:"Image",childrenElement:function(){return Object(k.jsxs)(k.Fragment,{children:['Right-click and "Save Image As" to download the image.',Object(k.jsx)("div",{children:Object(k.jsx)("img",{src:"data:image/jpeg;base64, ".concat(r)})})]})},buttons:[{label:"Continue"}]});case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"share",value:function(){var e=window.location,t=e.protocol,i=e.host,n=e.pathname,r=new URLSearchParams(window.location.search);r.set("isAuthoring","false"),r.delete("isReadOnly"),r.set("gridData",O(C(this.gridData))),navigator.clipboard.writeText("".concat(t,"//").concat(i).concat(n,"?").concat(r.toString())),P.b.success("URL copied to your clipboard!")}},{key:"resizeGrids",value:function(e,t){var i=this;Object(R.confirmAlert)({title:"Confirmation",message:"Are you sure you want to resize? This will clear the canvas.",buttons:[{label:"Yes",onClick:function(){var n=new URLSearchParams(window.location.search);n.set("gridSize",e),n.set("subGridSize",t),n.set("gridData","0"),i.navigate(n)}},{label:"No"}]})}},{key:"print",value:function(){var e=this;this.setState({gridDataToPrint:this.gridData}),Object(R.confirmAlert)({title:"Print",message:"Click this button to print the puzzle. Works best on Google Chrome. ",childrenElement:function(){return Object(k.jsx)(W.a,{trigger:function(){return Object(k.jsx)(E.a,{children:"Print"})},content:function(){return e.printableRef.current}})},buttons:[{label:"Cancel"}]})}},{key:"getCellWidthAndHeight",value:function(e){var t,i,n=this.state,r=n.game,a=n.gridSize,o=n.subGridSize;return"classic"===r?(t=e?50:40,i="6px"):"nonogram"===r&&(t=e?75:40,i=e?"10px":"40px"),"classic"===r||e?"max(".concat(t/(a*o),"vw, ").concat(i,")"):"min(".concat(t/(a*o),"vw, ").concat(i,")")}},{key:"render",value:function(){var e=this.state,t=e.game,i=e.isAuthoring,n=e.isReadOnly,r=e.isFilling,a=e.isCrossingOut,o=e.gridSize,s=e.subGridSize,c=e.isLoading,l=e.gridDataToPrint;e.hasError;return this.gridData?Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(P.a,{}),Object(k.jsxs)(H,{onError:function(e){return P.b.error(e.toString())},children:[Object(k.jsxs)("div",{className:"no-print",children:[Object(k.jsx)(M.a,{loading:c,position:"global"}),Object(k.jsx)(N,{changeGame:this.changeGame,game:t}),Object(k.jsx)(B,{onCellEdit:this.onCellEdit,onCellChanged:this.onCellChanged,onCrossOut:this.onCrossOut,getCellWidthAndHeight:this.getCellWidthAndHeight,game:t,isAuthoring:i,isFilling:r,isCrossingOut:a,gridSize:o,subGridSize:s,filledColor:0,emptyColor:ne,solvedColor:re,unsolvedColor:ae,gridData:this.gridData,coordinatesOrder:this.coordinatesOrder}),Object(k.jsxs)(I.a,{className:"mainForm",children:[Object(k.jsx)(X,{game:t,changeMode:this.changeMode,clear:this.clear,revealSolution:this.revealSolution,invert:this.invert,importImage:this.importImage,exportImage:this.exportImage,share:this.share,resizeGrids:this.resizeGrids,print:this.print,isAuthoring:i,isReadOnly:n,gridSizeMin:2,gridSizeMax:9,subGridSizeMin:2,subGridSizeMax:9,nonogramGridSizeMin:5,nonogramGridSizeMax:20,gridData:this.gridData}),Object(k.jsx)(K,{game:t}),Object(k.jsx)(ie,{getCellWidthAndHeight:this.getCellWidthAndHeight,gridSize:o,subGridSize:s,filledColor:0,emptyColor:ne,unsolvedColor:ae,gridData:l,coordinatesOrder:this.coordinatesOrder,game:t,ref:this.printableRef})]})]}),Object(k.jsx)("div",{className:"print",children:Object(k.jsxs)("h3",{children:["Unsupported operation! To print this puzzle, please click the ",Object(k.jsx)("em",{children:"Print"})," button on the webpage itself"]})})]})]}):Object(k.jsx)(k.Fragment,{})}}]),i}(r.a.Component),ce=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,303)).then((function(t){var i=t.getCLS,n=t.getFID,r=t.getFCP,a=t.getLCP,o=t.getTTFB;i(e),n(e),r(e),a(e),o(e)}))};o.a.render(Object(k.jsx)(r.a.StrictMode,{children:Object(k.jsx)(se,{})}),document.getElementById("root")),ce()}},[[296,1,2]]]);
//# sourceMappingURL=main.85fba654.chunk.js.map