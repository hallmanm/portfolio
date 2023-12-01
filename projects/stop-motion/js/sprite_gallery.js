/*global
  animationData,
  catalogPathMap
*/

/*REQUIRED DATA///////////

-Dependent Files:

sprite_gallery.css
jquery-drag.js

--------------------------

-Element Required for Placement:

<div id="AnimationWidgetWrapper"></div>

--------------------------

-Example of Data Required to Populate:

var animationData =
  {
    'speed': 100,       //In Miliseconds            **If '0' there will be no animation**
    'minInterval': 0,   //In Seconds
    'maxInterval': 2.5, //In Seconds
    'preview': 30,      //% size of preview window  **If '0' there will be no preview**
    'intro': true,      //Slide Images
    'scrollbar': false, //Show Scroll Bar
    'bounce': false,    //Bounce Arrows
    'fade': false,      //Fade Elements Not Fully in View
    'imgWidth': 144,    //Img Width
    'imgHeight': 365,   //Height of Sprites
    'linkTo': false,    //[true] - Navigate to External Page | [false] - Drop Down to Section
    'sprites': [
      {
        'copy': 'Tom Girl',                                                                             //Header Copy
        'catId': 'cat7240079',                                                                          //For Linking to Category Below
EXAMPLE 'imgSrc': '/Images/web/touts/YEAR/DATE/section/gender/order_width_spriteHeight_headerCopy.jpg', EXAMPLE
        'imgSrc': '/Images/web/touts/2015/0205/jeans/w/14_146_3650_tom_girl.jpg',                       //Paths do not Have to Mirror Each Other
        'imgHeight': 3650                                                                               //Full Height of Image **Must Be a Multiple of the Above imgHeight**
      }
    ]
  };

////////////////////////*/

function buildWidget(customData){
//If custom data is passed, overwrite the default json
  if(!!customData){
console.log("customData",customData);
    animationData.speed = (customData.speed !== undefined ? customData.speed : animationData.speed);
    animationData.minInterval = (customData.minInterval !== undefined ? customData.minInterval : animationData.minInterval);
    animationData.maxInterval = (customData.maxInterval !== undefined ? customData.maxInterval : animationData.maxInterval);
    animationData.preview = (customData.preview !== undefined ? customData.preview : animationData.preview);
    animationData.intro = (customData.intro !== undefined ? customData.intro : animationData.intro);
    animationData.scrollbar = (customData.scrollbar !== undefined ? customData.scrollbar : animationData.scrollbar);
    animationData.bounce = (customData.bounce !== undefined ? customData.bounce : animationData.bounce);
    animationData.fade = (customData.fade !== undefined ? customData.fade : animationData.fade);
  }

//Clear the DIV contents
  $('#AnimationWidgetWrapper').html('<div id="widgetContainer" style="z-index: 0;"></div>');

  var widgetContainer = $('#widgetContainer');

//Clear Floats for Widget
  widgetContainer.before('<div class="widgetClear"></div>');
  widgetContainer.after('<div class="widgetClear"></div>');
  
//Set Scope Class
  widgetContainer.parent().addClass('AnimationWidgetWrapper');

//Build Widget
  widgetContainer.prepend('<div id="scrollBtnWrap" class="scrollBtnWrap"><div id="scrollLeftBtn" class="scrollBtnPadding scrollLeftBtn"><div class="scrollBtn">&#8249;</div></div><div id="scrollRightBtn" class="scrollBtnPadding scrollRightBtn"><div class="scrollBtn">&#8250;</div></div></div><div id="animationWindow" class="animationWindow"><div id="animationContainer" class="animationContainer"></div></div>');

  var animationContainer = $('#animationContainer'),
      animationCount = animationData.sprites.length;

//Set External Links or Drop Down Links
  for (var i = 0; i < animationCount; i++) {
    if(animationData.linkTo){
      animationContainer.append('<a class="animation" href="/${ctxRoot}/browse/category.jsp?catId=' + animationData.sprites[i].catId + '"><div class="animationHeader">' + animationData.sprites[i].copy + '</div><div class="imgWrap"><img class="imgSprite" width="' + animationData.imgWidth + '" height="' + animationData.sprites[i].imgHeight + '" src="' + animationData.sprites[i].imgSrc + '" /></div></a>');
    } else {
      animationContainer.append('<a class="animation dropDownLink" href="#categoryBar_' + animationData.sprites[i].catId + '"><div class="animationHeader">' + animationData.sprites[i].copy + '</div><div class="imgWrap"><img class="imgSprite" width="' + animationData.imgWidth + '" height="' + animationData.sprites[i].imgHeight + '" src="' + animationData.sprites[i].imgSrc + '" /></div></a>');
    }
  }

  var animationWindowScroll =   document.getElementById('animationWindow'),
      animationWindow =         $('#animationWindow'),
      scrollBtnWrap =           $('#scrollBtnWrap'),
      scrollLeftBtn =           $('#scrollLeftBtn'),
      scrollRightBtn =          $('#scrollRightBtn'),
      animations =              $('.animation'),
      animationWidth =          animationData.imgWidth,
      animationHeight =         animationData.imgHeight,
      animationOuterWidth =     animationWidth + parseInt(animations.css('padding-left'), 10) + parseInt(animations.css('padding-right'), 10),
      animationContainerWidth = animationOuterWidth * animationCount,
      dataReady =               false,
      randomized =              false,
      sliding =                 false,
      scrollPos =               0,
      activeAnimation =         0,
      dragWindowWidth =         0,
      previewImgWidth =         0,
      previewPad =              0,
      previousAnimations =      [],
      closestRightAnimation,
      closestLeftAnimation,
      previousAnimation,
      windowViewWidth,
      animationDelay,
      animationLoop,
      previewWidth,
      restartAnim,
      windowView,
      maxScroll;

//Test for indexOf support for ie8
  var fullFunction = (!Array.prototype.indexOf) ? false : true;

//Allow Animation
  var animateElem = (animationData.speed > 0) ? true : false;

//Build Preview
  var showPreview = (animationData.preview > 0) ? true : false;

//Show Intro
  var showIntro = (animationData.intro) ? true : false;

//Bounce Arrows
  var bounce = (animationData.bounce) ? true : false;

//Fade Elements Not Fully in View
  var fade = (animationData.fade) ? true : false;

//Add Scrollbar
  if(animationData.scrollbar){widgetContainer.addClass('scrollbar');}

//Add Class to Container
  widgetContainer.addClass('widgetContainer');

//Ensure Container is as Wide as a Single Element
  widgetContainer.css('min-width', animationOuterWidth);

//Set Height of Animation Window
  $('.imgWrap').css('height', animationData.imgHeight);

//Set Width of Animations
  animations.css('width', animationWidth);
  $('.animationHeader').css('width', animationWidth);

//Set Width of Scroll to Hold All Animations
  animationContainer.css('width', animationContainerWidth);

//Set Vertical Position of Left and Right Buttons
  scrollBtnWrap.css('top', Math.floor(animations.height()/2));

//Set Sizing
  setDimensions();

//Decide to Build a Preview
  if(showPreview){
    widgetContainer.append('<div id="previewWindow" class="previewWindow"><div id="dragWindow" class="dragWindow"><div class="leftMask"></div><div class="topBorders"></div><div class="bottomBorders"></div><div class="rightMask"></div></div></div>');

    var sprites = $('.imgSprite'),
        dragWindow = $('#dragWindow'),
        previewWindow = $('#previewWindow');

    for (var x = 0; x < animationCount; x++) {
      previewWindow.append('<div class="previewSprite"><img class="imgSprite" src="' + animationData.sprites[x].imgSrc + '" /></div>');
    }
  
//Find Spacing of Preview Sprites
    var previewSprite = $('.previewSprite');

    previewPad = parseInt(previewSprite.css('padding-left'), 10) + parseInt(previewSprite.css('padding-right'), 10);

//Set Preview Dimensions
    setPreviewDimensions();

//Attach Drag Functionality
    dragWindow.draggable(
      {axis:'x'},
      {containment:'parent'},
      {
        start: function() {
          animationWindow.stop();
          sliding = true;
        },
        drag:function(){
          var dragPosition = dragWindow.position();

          slideWindow(dragPosition.left);
        },
        stop: function() {
          sliding = false;
        }
      }
    );
  
//Jump to Selected Preview
    previewSprite.on('click', function(){
      if(fullFunction && dataReady){
        animationWindow.stop();

        if(($(this).index() - 1)  <= closestLeftAnimation){
          var leftDistance = $(dragWindow).position().left - $(this).position().left;

          animationWindow.animate({
            scrollLeft: Math.round(animations[$(this).index() - 1].leftPosition)
          }, Math.round((leftDistance/windowViewWidth).toFixed(4)*8000));
        } else {
          var rightDistance = ($(this).position().left + previewImgWidth + previewPad) - ($(dragWindow).position().left + dragWindowWidth);
          
          animationWindow.animate({
            scrollLeft: Math.round(animations[$(this).index() - 1].rightPosition - windowViewWidth)
          }, Math.round((rightDistance/windowViewWidth).toFixed(4)*8000));
        }
      }
    });
  }

//Clear Floats for Widget
  widgetContainer.append('<div class="widgetClear"></div>');

//Set Animation Element Data
  collectData();

//Set Animation Dimensions
  function setDimensions(){
    var animationWindowWidth = Math.floor(widgetContainer.width());

    windowView = Math.floor(animationWindowWidth / animationOuterWidth);
    windowViewWidth = animationOuterWidth * windowView;
    maxScroll = animationContainerWidth - windowViewWidth;

//Set Width of Animation Window
    animationWindow.css('width', windowViewWidth);
    
//Set Width of Left and Right Buttons Wrapper
    scrollBtnWrap.css('width', windowViewWidth);

//If Animations Do Not Fill the Window, Set Viewable Window to Number of Animations and Remove Left and Right Buttons
    if (windowView >= animationCount) {
      windowView = animationCount;
      animationWindow.css('width', animationContainerWidth);
    }

    if (windowView >= animationCount || windowView < 2) {
      scrollBtnWrap.css('display', 'none');
    } else {
      scrollBtnWrap.css('display', 'block');
    }

    if(fullFunction && dataReady){
      checkPosition(scrollPos);
    }
  }

//Set Preview Dimensions
  function setPreviewDimensions(){
//Check Percentage to Ensure it Fits
    var previewPercent = animationData.preview;

    if (previewPercent < 10) {
      previewPercent = 10;
    }

    if (Math.floor(animationWidth * previewPercent / 100 + previewPad) * animationCount >= windowViewWidth){
      previewPercent = (windowViewWidth / animationCount - previewPad) / animationWidth;
      previewPercent = Math.floor(previewPercent * 100);
    } else {
      previewPercent = Math.floor(previewPercent);
    }

    previewPercent = previewPercent/100;

//Set Preview Sizing
    var previewHeight = Math.floor(animationHeight * previewPercent);

    previewImgWidth = Math.ceil(animationWidth * previewPercent);

    previewWidth = (previewImgWidth + previewPad) * animationCount;
    
    dragWindowWidth = (previewImgWidth + previewPad) * windowView;

    previewSprite.css({
      'height': previewHeight,
      'width': previewImgWidth
    });

    dragWindow.css('width', dragWindowWidth);
    previewWindow.css('width', previewWidth);

    $('.leftMask').css('width', previewWidth);
    $('.rightMask').css('width', previewWidth);

    if (windowView >= animationCount) {
      previewWindow.css('display', 'none');
    } else if (previewImgWidth <= 0){
      widgetContainer.addClass('scrollbar');
      previewWindow.css('display', 'none');
    } else {
      if(!animationData.scrollbar){
        widgetContainer.removeClass('scrollbar');
      }
      previewWindow.css('display', 'block');
    }
  }

//Set Data
  function collectData(){
    for (var i = 0; i < animationCount; i++) {
      animations[i].leftPosition = Math.round($(animations[i]).position().left);
      animations[i].rightPosition = Math.round(animations[i].leftPosition + parseInt(animationOuterWidth, 10));
      animations[i].sprite = $(animations[i]).find('img');
      animations[i].frame_count = Math.round($(animations[i].sprite).attr('height') / animationHeight);
      animations[i].top_pos = 0;
      animations[i].hasPlayed = 0;
      animations[i].loopCount = 1;
    }
    dataReady = true;

//Add Listeners to All Navigation
    attachListeners();
  }

//Allow for Scroll and CSS Animations
  widgetContainer.addClass('startMotion');

//Show Elements
  setTimeout(showElements, 1000);

  function showElements(){
    widgetContainer.addClass('showElements');

    allowFunctionality();
  }

//Start Randomizing the Delay Between Animations
  function allowFunctionality(){
//Check Buttons
    if (fullFunction){
      checkPosition(scrollPos);

      checkBtns();
    }

    if(showIntro){
      animationWindow.scrollLeft(maxScroll);

      animationWindow.animate({
        scrollLeft: 0
      }, Math.round((animationContainerWidth/600).toFixed(3)*1000), function(){
        if(animateElem){
          randomizeInterval();
        }
      });
    } else if(animateElem){
      randomizeInterval();
    }
  }

//Check Intervals
  if(animationData.minInterval >= animationData.maxInterval){
    animationData.minInterval = 0;
    animationData.maxInterval = 2;
  }

//Animate
  function animate() {
    if (randomized && animateElem){
      randomizeInterval();
    } else if (animateElem){
      loopAnimation();
    }
  }

//Create Random Delay Between Animations and Kick off Randomize Animation Function
  function randomizeInterval() {
    randomized = true;

    var randomInterval = Math.floor(Math.random() * (animationData.maxInterval * 10 - animationData.minInterval * 10) + animationData.minInterval * 10) * 100;

    animationDelay = setTimeout(function() {
      randomizeNumber();
    }, randomInterval);
  }

//Create Random Number for Animated Element
  function randomizeNumber(){
    activeAnimation = Math.floor((Math.random() * animationCount));

    checkNum();
  }

//See if the Animation was Just Run and if it is Unique in the Current Array
  function checkNum() {
    if (fullFunction){
      if (activeAnimation < closestLeftAnimation || activeAnimation > closestRightAnimation || (activeAnimation == previousAnimation && animationCount > 1 && windowView > 1) || previousAnimations.lastIndexOf(activeAnimation) != -1) {
        randomizeNumber();
      } else {
        loopAnimation();
      }
    } else {
      if (activeAnimation == previousAnimation && animationCount > 1 && windowView > 1) {
        randomizeNumber();
      } else {
        loopAnimation();
      }
    }
  }

//Loop Through all Frames in the Array
  function loopAnimation() {
    clearIntervals();

    randomized = false;

    if (animations[activeAnimation].hasPlayed % 2 === 0){
      animations[activeAnimation].top_pos = animations[activeAnimation].top_pos - animationHeight;

      $(animations[activeAnimation].sprite).css('top', animations[activeAnimation].top_pos + 'px');

      if (animations[activeAnimation].loopCount < animations[activeAnimation].frame_count - 1) {
        animations[activeAnimation].loopCount += 1;
        
        animationLoop = setTimeout(loopAnimation, animationData.speed);
      } else {
        updateArrays();
      }
    } else {
      animations[activeAnimation].top_pos = animations[activeAnimation].top_pos + animationHeight;

      $(animations[activeAnimation].sprite).css('top', animations[activeAnimation].top_pos + 'px');

      if (animations[activeAnimation].loopCount > 1) {
        animations[activeAnimation].loopCount -= 1;
        
        animationLoop = setTimeout(loopAnimation, animationData.speed);
      } else {
        updateArrays();
      }
    }
  }

//Update the Array Info
  function updateArrays(){
    if (animations[activeAnimation].loopCount >= animations[activeAnimation].frame_count - 1 || animations[activeAnimation].loopCount <= 1){
      animations[activeAnimation].hasPlayed += 1;
    }

    previousAnimation = activeAnimation;
    previousAnimations.push(previousAnimation);

    if (previousAnimations.length == windowView) {
      previousAnimations = [];
    }

    randomizeInterval();
  }

//Resize Windows
  $(window).resize(function() {
    previousAnimations = [];

    setDimensions();
    
    if(showPreview){
      setPreviewDimensions();
    }
    
    updateInfo();
  });

//Throttle the Scroll Events
  var throttled = _.throttle(updateInfo, 10);

  animationWindow.scroll(throttled);
  
//Stop Animation When User Scrolls
  animationWindow.on("scroll mousedown DOMMouseScroll mousewheel", function( evt ) {
    if (evt.type === "mousedown" || evt.type === "mousewheel" || evt.type === "DOMMouseScroll") {
      animationWindow.stop();
    }
  });

//Update Scroll Position on Scroll Event
  function updateInfo(){
    handleAnimation();

    var windowPosition = animationWindow.scrollLeft();
    
    if (!sliding && showPreview){
      slidePreview(windowPosition);
    }

    if (fullFunction && dataReady){
      scrollPos = animationWindowScroll.scrollLeft;
      checkPosition(scrollPos);
      checkBtns();
    }
  }

//Pause and Restart Animation for Scrolling
  function handleAnimation(){
    clearIntervals();

    if(dataReady){
      restartAnim = setTimeout(animate, 500);
    }
  }

//Stop all Auto Loops
  function clearIntervals(){
    clearTimeout(animationDelay);
    clearTimeout(animationLoop);
    clearTimeout(restartAnim);
  }

//Find CLosest Left and Right Elements
  function checkPosition(scrollPos){
    var leftPositions = [];
    var rightPositions = [];

    for (var i = 0; i < animationCount; i++) {
      animations[i].currentLeft = (animations[i].leftPosition - scrollPos);
      animations[i].currentRight = (animations[i].rightPosition - scrollPos);

//Show or Hide Elements Outside of View
      if(fade){
        checkOpacity(animations[i], animations[i].currentLeft, animations[i].currentRight);
      }

      leftPositions.push(Math.abs(animations[i].currentLeft));
      rightPositions.push(Math.abs(animations[i].currentRight - windowViewWidth));
    }
    var closestLeftValue = Math.min.apply(null, leftPositions);
    var closestRightValue = Math.min.apply(null, rightPositions);

    closestLeftAnimation = leftPositions.indexOf(closestLeftValue);
    closestRightAnimation = rightPositions.indexOf(closestRightValue);

    if (closestLeftAnimation == -1){
      closestLeftAnimation = 0;
    }
    if (closestRightAnimation == -1){
      closestRightAnimation = windowView - 1;
    }
  }

//Show or Hide Elements Outside of View
  function checkOpacity(animation, currentLeft, currentRight){
    if(currentLeft < 0){
      $(animation).addClass('hideEl');
    } else if(currentRight > windowViewWidth){
      $(animation).addClass('hideEl');
    } else {
      $(animation).removeClass('hideEl');
    }
  }

//Check to Show or Hide Buttons and Animate Buttons
  function checkBtns(){
    if (scrollPos <= 0){
      scrollLeftBtn.addClass('fadeEl');
      scrollRightBtn.removeClass('fadeEl');
      
      if(bounce){
        scrollRightBtn.addClass('bounce');
      }
    } else if (scrollPos >= maxScroll) {
      scrollLeftBtn.removeClass('fadeEl');
      scrollRightBtn.addClass('fadeEl');

      if(bounce){
        scrollLeftBtn.addClass('bounce');
      }
    } else {
      scrollLeftBtn.removeClass('fadeEl');
      scrollRightBtn.removeClass('fadeEl');

      if(bounce){
        scrollLeftBtn.removeClass('bounce');
        scrollRightBtn.removeClass('bounce');
      }
    }
  }

//Navigation///////////////////////////////////////////////////////

//Slide the Elements Based Off the Preview Window Position
  function slideWindow(position){
    var windowLeft = animationContainerWidth * (position / previewWidth);

    animationWindow.scrollLeft(windowLeft);
  }

//Slide the Preview Window Based Off the Elements Position
  function slidePreview(position){
    var dragLeft = previewWidth * (position / animationContainerWidth);
    dragWindow.css('left', dragLeft);
  }

function attachListeners(){
//Scroll Left
  scrollLeftBtn.on('mousedown', function(){
    animationWindow.stop();

    animationWindow.animate({
      scrollLeft: 0
    }, 1500);
  });

//Scroll Right
  scrollRightBtn.on('mousedown', function(){
    animationWindow.stop();

    animationWindow.animate({
      scrollLeft: maxScroll
    }, 1500);
  });

  if(fullFunction){
//Stop Scroll and Step Left 1
    scrollLeftBtn.on('mouseup', function(){
      animationWindow.stop();

      if (scrollPos > 0) {
        if (closestLeftAnimation - 1 <= 0){
          animationWindow.animate({
            scrollLeft: 0
          }, 500);
        } else {
          animationWindow.animate({
            scrollLeft: Math.round(animations[closestLeftAnimation - 1].leftPosition)
          }, 500);
        }
      }
    });

//Stop Scroll and Step Right 1
    scrollRightBtn.on('mouseup', function(){
      animationWindow.stop();

      if (scrollPos < maxScroll) {
        if (closestRightAnimation + 1 >= animationCount){
          animationWindow.animate({
            scrollLeft: maxScroll
          }, 500);
        } else {
          animationWindow.animate({
            scrollLeft: Math.round(animations[closestRightAnimation + 1].rightPosition - windowViewWidth)
          }, 500);
        }
      }
    });
  }
}

//Scroll to Section
  $('.dropDownLink').on('click', function(e){
    e.preventDefault();

    var jumpToLink = $(this).attr('href');

    if (jumpToLink){
      var jumpToSection = $(jumpToLink);

      if (jumpToSection.length > 0){
        var jumpToScroll = jumpToSection.offset().top - 75;

        $('html, body').animate({scrollTop : jumpToScroll}, 1500);
      }
    }
  });
};

buildWidget();