// Garden Gnome Software - Skin
// Pano2VR 4.0/3102
// Filename: nav.ggsk
// Generated Wed Feb 20 11:37:05 2013

function pano2vrSkin(player,base) {
  var me=this;
  var flag=false;
  var nodeMarker=new Array();
  var activeNodeMarker=new Array();
  this.player=player;
  this.player.skinObj=this;
  this.divSkin=player.divSkin;
  var basePath="";
  // auto detect base path
  if (base=='?') {
    var scripts = document.getElementsByTagName('script');
    for(var i=0;i<scripts.length;i++) {
      var src=scripts[i].src;
      if (src.indexOf('skin.js')>=0) {
        var p=src.lastIndexOf('/');
        if (p>=0) {
          basePath=src.substr(0,p+1);
        }
      }
    }
  } else
  if (base) {
    basePath=base;
  }
  this.elementMouseDown=new Array();
  this.elementMouseOver=new Array();
  var cssPrefix='';
  var domTransition='transition';
  var domTransform='transform';
  var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
  var i;
  for(i=0;i<prefixes.length;i++) {
    if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
      cssPrefix='-' + prefixes[i].toLowerCase() + '-';
      domTransition=prefixes[i] + 'Transition';
      domTransform=prefixes[i] + 'Transform';
    }
  }
  
  this.player.setMargins(0,0,0,0);
  
  this.updateSize=function(startElement) {
    var stack=new Array();
    stack.push(startElement);
    while(stack.length>0) {
      e=stack.pop();
      if (e.ggUpdatePosition) {
        e.ggUpdatePosition();
      }
      if (e.hasChildNodes()) {
        for(i=0;i<e.childNodes.length;i++) {
          stack.push(e.childNodes[i]);
        }
      }
    }
  }
  
  parameterToTransform=function(p) {
    return 'translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
  }
  
  this.findElements=function(id,regex) {
    var r=new Array();
    var stack=new Array();
    var pat=new RegExp(id,'');
    stack.push(me.divSkin);
    while(stack.length>0) {
      e=stack.pop();
      if (regex) {
        if (pat.test(e.ggId)) r.push(e);
      } else {
        if (e.ggId==id) r.push(e);
      }
      if (e.hasChildNodes()) {
        for(i=0;i<e.childNodes.length;i++) {
          stack.push(e.childNodes[i]);
        }
      }
    }
    return r;
  }
  
  this.preloadImages=function() {
    var preLoadImg=new Image();
    preLoadImg.src=basePath + 'images/nav/button_1__o.png';
    preLoadImg.src=basePath + 'images/nav/button_1__a.png';
    preLoadImg.src=basePath + 'images/nav/button_3__o.png';
    preLoadImg.src=basePath + 'images/nav/button_3__a.png';
    preLoadImg.src=basePath + 'images/nav/button_4__o.png';
    preLoadImg.src=basePath + 'images/nav/button_4__a.png';
    preLoadImg.src=basePath + 'images/nav/button_5__o.png';
    preLoadImg.src=basePath + 'images/nav/button_5__a.png';
    preLoadImg.src=basePath + 'images/nav/button_6__o.png';
    preLoadImg.src=basePath + 'images/nav/button_6__a.png';
    preLoadImg.src=basePath + 'images/nav/button_7__o.png';
    preLoadImg.src=basePath + 'images/nav/button_7__a.png';
    preLoadImg.src=basePath + 'images/nav/button_8__o.png';
    preLoadImg.src=basePath + 'images/nav/button_8__a.png';
  }
  
  this.addSkin=function() {
    this._container_10=document.createElement('div');
    this._container_10.ggId='Container 10';
    this._container_10.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._container_10.ggVisible=true;
    this._container_10.ggUpdatePosition=function() {
      this.style[domTransition]='none';
      if (this.parentNode) {
        w=this.parentNode.offsetWidth;
        this.style.left=(-150 + w/2) + 'px';
        h=this.parentNode.offsetHeight;
        this.style.top=(-50 + h) + 'px';
      }
    }
    hs ='position:absolute;';
    hs+='left: -150px;';
    hs+='top:  -50px;';
    hs+='width: 275px;';
    hs+='height: 30px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    this._container_10.setAttribute('style',hs);
    this._button_1=document.createElement('div');
    this._button_1.ggId='Button 1';
    this._button_1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._button_1.ggVisible=true;
    hs ='position:absolute;';
    hs+='left: 120px;';
    hs+='top:  0px;';
    hs+='width: 30px;';
    hs+='height: 30px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    hs+='cursor: pointer;';
    this._button_1.setAttribute('style',hs);
    this._button_1__img=document.createElement('img');
    this._button_1__img.setAttribute('src',basePath + 'images/nav/button_1.png');
    this._button_1__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
    me.player.checkLoaded.push(this._button_1__img);
    this._button_1.appendChild(this._button_1__img);
    this._button_1.onmouseover=function () {
      me._button_1__img.src=basePath + 'images/nav/button_1__o.png';
    }
    this._button_1.onmouseout=function () {
      me._button_1__img.src=basePath + 'images/nav/button_1.png';
      me.elementMouseDown['button_1']=false;
    }
    this._button_1.onmousedown=function () {
      me._button_1__img.src=basePath + 'images/nav/button_1__a.png';
      me.elementMouseDown['button_1']=true;
    }
    this._button_1.onmouseup=function () {
      me._button_1__img.src=basePath + 'images/nav/button_1.png';
      me.elementMouseDown['button_1']=false;
    }
    this._button_1.ontouchend=function () {
      me.elementMouseDown['button_1']=false;
    }
    this._container_10.appendChild(this._button_1);
    this._button_3=document.createElement('div');
    this._button_3.ggId='Button 3';
    this._button_3.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._button_3.ggVisible=true;
    hs ='position:absolute;';
    hs+='left: 160px;';
    hs+='top:  0px;';
    hs+='width: 30px;';
    hs+='height: 30px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    hs+='cursor: pointer;';
    this._button_3.setAttribute('style',hs);
    this._button_3__img=document.createElement('img');
    this._button_3__img.setAttribute('src',basePath + 'images/nav/button_3.png');
    this._button_3__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
    me.player.checkLoaded.push(this._button_3__img);
    this._button_3.appendChild(this._button_3__img);
    this._button_3.onmouseover=function () {
      me._button_3__img.src=basePath + 'images/nav/button_3__o.png';
    }
    this._button_3.onmouseout=function () {
      me._button_3__img.src=basePath + 'images/nav/button_3.png';
      me.elementMouseDown['button_3']=false;
    }
    this._button_3.onmousedown=function () {
      me._button_3__img.src=basePath + 'images/nav/button_3__a.png';
      me.elementMouseDown['button_3']=true;
    }
    this._button_3.onmouseup=function () {
      me._button_3__img.src=basePath + 'images/nav/button_3.png';
      me.elementMouseDown['button_3']=false;
    }
    this._button_3.ontouchend=function () {
      me.elementMouseDown['button_3']=false;
    }
    this._container_10.appendChild(this._button_3);
    this._button_4=document.createElement('div');
    this._button_4.ggId='Button 4';
    this._button_4.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._button_4.ggVisible=true;
    hs ='position:absolute;';
    hs+='left: 0px;';
    hs+='top:  0px;';
    hs+='width: 30px;';
    hs+='height: 30px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    hs+='cursor: pointer;';
    this._button_4.setAttribute('style',hs);
    this._button_4__img=document.createElement('img');
    this._button_4__img.setAttribute('src',basePath + 'images/nav/button_4.png');
    this._button_4__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
    me.player.checkLoaded.push(this._button_4__img);
    this._button_4.appendChild(this._button_4__img);
    this._button_4.onmouseover=function () {
      me._button_4__img.src=basePath + 'images/nav/button_4__o.png';
    }
    this._button_4.onmouseout=function () {
      me._button_4__img.src=basePath + 'images/nav/button_4.png';
      me.elementMouseDown['button_4']=false;
    }
    this._button_4.onmousedown=function () {
      me._button_4__img.src=basePath + 'images/nav/button_4__a.png';
      me.elementMouseDown['button_4']=true;
    }
    this._button_4.onmouseup=function () {
      me._button_4__img.src=basePath + 'images/nav/button_4.png';
      me.elementMouseDown['button_4']=false;
    }
    this._button_4.ontouchend=function () {
      me.elementMouseDown['button_4']=false;
    }
    this._container_10.appendChild(this._button_4);
    this._button_5=document.createElement('div');
    this._button_5.ggId='Button 5';
    this._button_5.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._button_5.ggVisible=true;
    hs ='position:absolute;';
    hs+='left: 200px;';
    hs+='top:  0px;';
    hs+='width: 30px;';
    hs+='height: 30px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    hs+='cursor: pointer;';
    this._button_5.setAttribute('style',hs);
    this._button_5__img=document.createElement('img');
    this._button_5__img.setAttribute('src',basePath + 'images/nav/button_5.png');
    this._button_5__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
    me.player.checkLoaded.push(this._button_5__img);
    this._button_5.appendChild(this._button_5__img);
    this._button_5.onmouseover=function () {
      me._button_5__img.src=basePath + 'images/nav/button_5__o.png';
    }
    this._button_5.onmouseout=function () {
      me._button_5__img.src=basePath + 'images/nav/button_5.png';
      me.elementMouseDown['button_5']=false;
    }
    this._button_5.onmousedown=function () {
      me._button_5__img.src=basePath + 'images/nav/button_5__a.png';
      me.elementMouseDown['button_5']=true;
    }
    this._button_5.onmouseup=function () {
      me._button_5__img.src=basePath + 'images/nav/button_5.png';
      me.elementMouseDown['button_5']=false;
    }
    this._button_5.ontouchend=function () {
      me.elementMouseDown['button_5']=false;
    }
    this._container_10.appendChild(this._button_5);
    this._button_6=document.createElement('div');
    this._button_6.ggId='Button 6';
    this._button_6.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._button_6.ggVisible=true;
    hs ='position:absolute;';
    hs+='left: 40px;';
    hs+='top:  0px;';
    hs+='width: 30px;';
    hs+='height: 30px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    hs+='cursor: pointer;';
    this._button_6.setAttribute('style',hs);
    this._button_6__img=document.createElement('img');
    this._button_6__img.setAttribute('src',basePath + 'images/nav/button_6.png');
    this._button_6__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
    me.player.checkLoaded.push(this._button_6__img);
    this._button_6.appendChild(this._button_6__img);
    this._button_6.onmouseover=function () {
      me._button_6__img.src=basePath + 'images/nav/button_6__o.png';
    }
    this._button_6.onmouseout=function () {
      me._button_6__img.src=basePath + 'images/nav/button_6.png';
      me.elementMouseDown['button_6']=false;
    }
    this._button_6.onmousedown=function () {
      me._button_6__img.src=basePath + 'images/nav/button_6__a.png';
      me.elementMouseDown['button_6']=true;
    }
    this._button_6.onmouseup=function () {
      me._button_6__img.src=basePath + 'images/nav/button_6.png';
      me.elementMouseDown['button_6']=false;
    }
    this._button_6.ontouchend=function () {
      me.elementMouseDown['button_6']=false;
    }
    this._container_10.appendChild(this._button_6);
    this._button_7=document.createElement('div');
    this._button_7.ggId='Button 7';
    this._button_7.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._button_7.ggVisible=true;
    hs ='position:absolute;';
    hs+='left: 240px;';
    hs+='top:  0px;';
    hs+='width: 30px;';
    hs+='height: 30px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    hs+='cursor: pointer;';
    this._button_7.setAttribute('style',hs);
    this._button_7__img=document.createElement('img');
    this._button_7__img.setAttribute('src',basePath + 'images/nav/button_7.png');
    this._button_7__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
    me.player.checkLoaded.push(this._button_7__img);
    this._button_7.appendChild(this._button_7__img);
    this._button_7.onclick=function () {
      me.player.toggleAutorotate();
    }
    this._button_7.onmouseover=function () {
      me._button_7__img.src=basePath + 'images/nav/button_7__o.png';
    }
    this._button_7.onmouseout=function () {
      me._button_7__img.src=basePath + 'images/nav/button_7.png';
    }
    this._button_7.onmousedown=function () {
      me._button_7__img.src=basePath + 'images/nav/button_7__a.png';
    }
    this._button_7.onmouseup=function () {
      me._button_7__img.src=basePath + 'images/nav/button_7.png';
    }
    this._container_10.appendChild(this._button_7);
    this._button_8=document.createElement('div');
    this._button_8.ggId='Button 8';
    this._button_8.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._button_8.ggVisible=true;
    hs ='position:absolute;';
    hs+='left: 80px;';
    hs+='top:  0px;';
    hs+='width: 30px;';
    hs+='height: 30px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    hs+='cursor: pointer;';
    this._button_8.setAttribute('style',hs);
    this._button_8__img=document.createElement('img');
    this._button_8__img.setAttribute('src',basePath + 'images/nav/button_8.png');
    this._button_8__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
    me.player.checkLoaded.push(this._button_8__img);
    this._button_8.appendChild(this._button_8__img);
    this._button_8.onmouseover=function () {
      me._button_8__img.src=basePath + 'images/nav/button_8__o.png';
    }
    this._button_8.onmouseout=function () {
      me._button_8__img.src=basePath + 'images/nav/button_8.png';
      me.elementMouseDown['button_8']=false;
    }
    this._button_8.onmousedown=function () {
      me._button_8__img.src=basePath + 'images/nav/button_8__a.png';
      me.elementMouseDown['button_8']=true;
    }
    this._button_8.onmouseup=function () {
      me._button_8__img.src=basePath + 'images/nav/button_8.png';
      me.elementMouseDown['button_8']=false;
    }
    this._button_8.ontouchend=function () {
      me.elementMouseDown['button_8']=false;
    }
    this._container_10.appendChild(this._button_8);
    this.divSkin.appendChild(this._container_10);
    this._container_11=document.createElement('div');
    this._container_11.ggId='Container 11';
    this._container_11.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._container_11.ggVisible=true;
    this._container_11.ggUpdatePosition=function() {
      this.style[domTransition]='none';
      if (this.parentNode) {
        w=this.parentNode.offsetWidth;
        this.style.left=(-170 + w/2) + 'px';
        h=this.parentNode.offsetHeight;
        this.style.top=(-70 + h) + 'px';
      }
    }
    hs ='position:absolute;';
    hs+='left: -170px;';
    hs+='top:  -70px;';
    hs+='width: 328px;';
    hs+='height: 61px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    this._container_11.setAttribute('style',hs);
    this._rectangle_10=document.createElement('div');
    this._rectangle_10.ggId='Rectangle 10';
    this._rectangle_10.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._rectangle_10.ggVisible=true;
    hs ='position:absolute;';
    hs+='left: 20px;';
    hs+='top:  2px;';
    hs+='width: 269px;';
    hs+='height: 19px;';
    hs+=cssPrefix + 'transform-origin: 0% 50%;';
    hs+='visibility: inherit;';
    hs+='border: 1px solid #ffffff;';
    hs+='background-color: #7c7c7c;';
    this._rectangle_10.setAttribute('style',hs);
    this._container_11.appendChild(this._rectangle_10);
    this._text_9=document.createElement('div');
    this._text_9.ggId='Text 9';
    this._text_9.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._text_9.ggVisible=true;
    hs ='position:absolute;';
    hs+='left: 104px;';
    hs+='top:  26px;';
    hs+='width: 100px;';
    hs+='height: 20px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    hs+='border: 0px solid #000000;';
    hs+='color: #7c7c7c;';
    hs+='text-align: center;';
    hs+='white-space: nowrap;';
    hs+='white-space: nowrap;';
    hs+='padding: 0px 1px 0px 1px;';
    hs+='overflow: hidden;';
    this._text_9.setAttribute('style',hs);
    this._text_9.innerHTML="<strong>LOADING...<\/strong>";
    this._container_11.appendChild(this._text_9);
    this.divSkin.appendChild(this._container_11);
    me._container_10.style[domTransition]='none';
    me._container_10.style.visibility='hidden';
    me._container_10.ggVisible=false;
    this.preloadImages();
    this.divSkin.ggUpdateSize=function(w,h) {
      me.updateSize(me.divSkin);
    }
    this.divSkin.ggViewerInit=function() {
    }
    this.divSkin.ggLoaded=function() {
      me._container_11.style[domTransition]='none';
      me._container_11.style.visibility='hidden';
      me._container_11.ggVisible=false;
      me._container_10.style[domTransition]='none';
      me._container_10.style.visibility='inherit';
      me._container_10.ggVisible=true;
    }
    this.divSkin.ggReLoaded=function() {
    }
    this.divSkin.ggEnterFullscreen=function() {
    }
    this.divSkin.ggExitFullscreen=function() {
    }
    this.skinTimerEvent();
  };
  this.hotspotProxyClick=function(id) {
  }
  this.hotspotProxyOver=function(id) {
  }
  this.hotspotProxyOut=function(id) {
  }
  this.changeActiveNode=function(id) {
    var newMarker=new Array();
    var i,j;
    var tags=me.player.userdata.tags;
    for (i=0;i<nodeMarker.length;i++) {
      var match=false;
      if (nodeMarker[i].ggMarkerNodeId==id) match=true;
      for(j=0;j<tags.length;j++) {
        if (nodeMarker[i].ggMarkerNodeId==tags[j]) match=true;
      }
      if (match) {
        newMarker.push(nodeMarker[i]);
      }
    }
    for(i=0;i<activeNodeMarker.length;i++) {
      if (newMarker.indexOf(activeNodeMarker[i])<0) {
        if (activeNodeMarker[i].ggMarkerNormal) {
          activeNodeMarker[i].ggMarkerNormal.style.visibility='inherit';
        }
        if (activeNodeMarker[i].ggMarkerActive) {
          activeNodeMarker[i].ggMarkerActive.style.visibility='hidden';
        }
        if (activeNodeMarker[i].ggDeactivate) {
          activeNodeMarker[i].ggDeactivate();
        }
      }
    }
    for(i=0;i<newMarker.length;i++) {
      if (activeNodeMarker.indexOf(newMarker[i])<0) {
        if (newMarker[i].ggMarkerNormal) {
          newMarker[i].ggMarkerNormal.style.visibility='hidden';
        }
        if (newMarker[i].ggMarkerActive) {
          newMarker[i].ggMarkerActive.style.visibility='inherit';
        }
        if (newMarker[i].ggActivate) {
          newMarker[i].ggActivate();
        }
      }
    }
    activeNodeMarker=newMarker;
  }
  this.skinTimerEvent=function() {
    setTimeout(function() { me.skinTimerEvent(); }, 10);
    if (me.elementMouseDown['button_1']) {
      me.player.changeTilt(-0.2,true);
    }
    if (me.elementMouseDown['button_3']) {
      me.player.changeFovLog(-0.2,true);
    }
    if (me.elementMouseDown['button_4']) {
      me.player.changePan(0.2,true);
    }
    if (me.elementMouseDown['button_5']) {
      me.player.changeFovLog(0.2,true);
    }
    if (me.elementMouseDown['button_6']) {
      me.player.changePan(-0.2,true);
    }
    if (me.elementMouseDown['button_8']) {
      me.player.changeTilt(0.2,true);
    }
    var hs='';
    if (me._rectangle_10.ggParameter) {
      hs+=parameterToTransform(me._rectangle_10.ggParameter) + ' ';
    }
    hs+='scale(' + (1 * me.player.getPercentLoaded() + 0) + ',1.0) ';
    me._rectangle_10.style[domTransform]=hs;
  };
  this.addSkin();
};