/**
 * How to create a parallax scrolling website
 * Author: Petr Tichy
 * URL: www.ihatetomatoes.net
 * Article URL: http://ihatetomatoes.net/how-to-create-a-parallax-scrolling-website/
 */

(function(){
// Setup variables
  var paraWindow = $(window),
      body = $('body, html'),
      paraCrumbs = $('#paraCrumbs'),
      anchors = $('.subpara_section'),
      scrollDownBtn = $('#scrollDown'),
      scrollPos = 0,
      scrollBottom = 0,
      winH = 550;
  
  _.each(anchors, function(anchor, index){
    var anchorId = $(anchor).attr('id');
    
    $(paraCrumbs).append('<div class="paraCrumb" href="#' + anchorId + '" data-anchor-target="#' + anchorId + '" data-bottom-top="background-color: rgba(255,255,255,.6);" data-center-top="background-color: rgba(255,255,255,.6);" data-center="background-color: rgba(204,36,41,.6);" data-center-bottom="background-color: rgba(255,255,255,.6);" data-top-bottom="background-color: rgba(255,255,255,.6);"></div>');
  });

//FadeIn all sections   
  body.imagesLoaded( function() {
    setTimeout(function() {
// Resize sections
      adjustWindow();
// Fade in sections
      $('#parallaxWrap').addClass('loaded');
    }, 800);
  });
  
  function adjustWindow(){
// Init Skrollr
    var s = skrollr.init({
      forceHeight: false,
      render: function(data) {
        scrollPos = data.curTop;
        scrollBottom = data.maxTop;
      }
    });
// Get window size
    winH = paraWindow.height();
// Keep minimum height 550
    if(winH <= 550) {
      winH = 550;
    }
// Resize our slides
    anchors.height(winH);
// Refresh Skrollr after resizing our sections
    s.refresh($('.subpara_section'));
  }

  scrollDownBtn.on('mousedown', function(){
    body.stop();

    body.animate({
      scrollTop: scrollBottom + 'px'
    }, ((scrollBottom-Math.abs(scrollPos))/800)*1000);
  });

  scrollDownBtn.on('mouseup', function(){
    body.stop();
  });

  var paraCrumb = $('.paraCrumb');

  paraCrumb.on('click', function(){
    body.stop();

    var scrollToAnchor = $(this).attr('href'),
        scrollToPos = $(scrollToAnchor).offset().top;

    body.animate({
      scrollTop: scrollToPos + 'px'
    }, (Math.abs(scrollToPos-Math.abs(scrollPos))/800)*1000);
  });

  body.on("scroll DOMMouseScroll mousewheel", function( evt ) {
    if (evt.type === "mousewheel" || evt.type === "DOMMouseScroll") {
      body.stop(true);
    }
  });
})();