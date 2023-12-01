/*global
  $
  Backbone
  _
  MediaElementPlayer
  Modal
  jsContextRoot
  FB
  rowsArray
  Modernizr
  s
  s_gi
  s_account
*/
(function(){
  "use strict";

  /* The following is used for deep linking. If the row parameter is passed in the url, then the corresponging row is loaded in the top most slot */
  // var urlParams = $.parseParams(location.href),
  //  modelKey = urlParams.row,
  //  rowKey = _.find(rowsArray, function(row, index){
  //    return row.modelName.toLowerCase() == modelKey;
  //  });
  // var jumpTo = _.indexOf(rowsArray, rowKey);
  // if(jumpTo >= 0){
  //  rowsArray = _.sortBy(rowsArray, function(row, index){
  //    if(index < jumpTo){
  //      return index + rowsArray.length;
  //    }else{
  //      return index - jumpTo;
  //    }
  //  });
  // }

  var clickEvent = Modernizr.touch ? "touch" : "click";

  /* This function is used to reposition the facebook modals, so they won't jump you to the top of the page when you open them. This can be removed when facebook fixes this bug: http://developers.facebook.com/bugs/359862544085722?browse=search_502bb3b121c190376847662 */
  function positionFBWindow(value) {
    $(".fb_dialog").each(function(index) {
      if($(this).css("top")!='-10000px') {
        $(this).css("top", '50px' );
      }
    });
    setTimeout ( function(){
      positionFBWindow(50);
    }, 1250 );
  }

  function getWindowOpts(){
    var width = 575,
      height = 342,
      left = ($(window).width() - width) / 2,
      top = ($(window).height() - height) / 2,
      opts = 'status=1' +
        ',width=' + width +
        ',height=' + height +
        ',top=' + top +
        ',left=' + left;

    return opts;
  }

  function removeDirections(){
    $("#lylDirections").fadeOut(1000);
  }

  var debounceTimer = null,
    masterDebouncer = function( fun ) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function(){
        fun();
      }, 100);
    },
    pauseRowSelect = false,
    scrollAnimation = false,
    useWidget = true,
    scrollElem = $("html,body");

  /* This will give any user generated scroll events precedence over guide generated scroll evernts. */
  scrollElem.on("scroll mousedown DOMMouseScroll mousewheel", function( evt ) {
    if (evt.type === "mousedown" || evt.type === "mousewheel" || evt.type === "DOMMouseScroll") {
      scrollElem.stop(true);
      scrollAnimation = false;
    }
  });

  /* This function isn't currently being used, but will be used to scale flash videos. */
  function resizeVideo(){
    var myWidth = $(document).width() * 0.75;
    var myHeight = myWidth * 601 / 1068;
    $('object').css({"height": myHeight + "px", "width": myWidth + "px"});
  }

  /* This is a helper function to return a mediaElement video object. */
  function getVideo(selector) {
    var sel = selector || "",
      mePlayer,
      videoPlayer;

    if (sel) {
      mePlayer = $(sel).mediaelementplayer();
      videoPlayer = mePlayer[0];

      if (typeof videoPlayer !== "undefined" && videoPlayer.player) {
        // player exists (is Flash), so set our variable to the player.media
        videoPlayer = videoPlayer.player.media;
      }

      return videoPlayer;
    } else {
      return false;
    }
  }

  /* Defines a block model with default values set. */
  var BlockModel = Backbone.Model.extend({
    "defaults": {
      "blockWidth": 50,
      "mediaType": "img",
      "social": false,
      "youTubeID": "",
      "htmlContent": "",
      "link1": "",
      "link1Text": "",
      "link2": "",
      "link2Text": "",
      "bundleId": ""
    }
  });

  /* Defines a row model */
  var RowModel = Backbone.Model.extend({});

  /* Defines a collection to be used to store the block models */
  var BlockCollection = Backbone.Collection.extend({
    "model": BlockModel
  });

  /* Defines a collection to be used to store the row models */
  var RowCollection = Backbone.Collection.extend({
    "model": RowModel
  });

  /* Initializes a collection of rows from a predefined data object. */
  var collectionOfRows = new RowCollection(rowsArray);

  var BlockView = Backbone.View.extend({
    "tagName": "span",
    "className": "media",
    "options":{
      "parentSelector": "#liveYourLife"
    },

    "initialize": function(){
      _.bindAll(this, "render");
      this.render();
    },

    "render": function(){
      var rowIndex = this.options.rowId.split('row');
      var modelName = rowsArray[rowIndex[1] - 1].modelName.toLowerCase();

      if (this.model.get("mediaType") === "img") {

        $(this.el).html('<img style="width:100%;" src="images/' + modelName + '/' + this.id + '.jpg"/>');

      }else if (this.model.get("mediaType") === "vid") {
        $(this.el).html("<span style='display:block;' class='vidWrap'>" +
          "<video id='movie_" + modelName + "_" + this.id + "' class='movie' width='100%' loop muted preload='" + ((rowIndex[1] <= 1) ? 'preload' : 'none') + "' poster='images/" + modelName + "/img" + (this.model.collection.indexOf(this.model) + 1) + ".jpg'>" +
            "<source src='http://video.ae.com/video/ae/2012723btsupdate/liveyourlife/" + modelName + "/" + this.id + ".webm' type='video/webm; codecs=\"vp8, vorbis\"'/>" +
            "<source src='http://video.ae.com/video/ae/2012723btsupdate/liveyourlife/" + modelName + "/" + this.id + ".ogv'  type='video/ogg;  codecs=\"theora, vorbis\"'/>" +
            "<source src='http://video.ae.com/video/ae/2012723btsupdate/liveyourlife/" + modelName + "/" + this.id + ".mp4'/>" +
            "<source src='http://www.youtube.com/watch?v=" + this.model.get("youTubeID") + "' type='video/youtube'/>" +
            // '<object type="application/x-shockwave-flash" data="images/flashmediaelement.swf">' +
            // '<param name="movie" value="images/flashmediaelement.swf" />' +
            // '<param name="flashvars" value="controls=true&file=http://video.ae.com/video/ae/2012723btsupdate/liveyourlife/' + modelName + '/' + this.id + '.mp4" />' +
            // '<img class="lylYouTube" style="width: 100%;" src="images/' + modelName + '/youTube' + (this.model.collection.indexOf(this.model) + 1) + '.jpg"/>' +
            // '</object>' +
          "</video>" +
        "</span>");

        var thisVideo = this.$("video"),
          thisView = this;

        /* Until we finalize the scaling of flash videos, IE7 and IE8 videos will be replaced with the following link to open an mp4 version of the video in a modal window. */
        if(thisVideo.length <= 0){
          /* This function will be used for scaling flash videos */
          // resizeVideo();
          // $(window).on("resize", function(){
          //  masterDebouncer(resizeVideo);
          // });
          this.$(".vidWrap").html('<img class="lylYouTube" style="width: 100%;" src="images/' + modelName + '/youTube' + (this.model.collection.indexOf(this.model) + 1) + '.jpg"/>');
        }
        var lylYouTube = thisView.$(".lylYouTube");
        lylYouTube.on("click", function(e){
          e.preventDefault();
          if(_.isUndefined(thisView.options.modal)){
            var youTubeModal = new Modal({
              id: 'lylYouTubeModalVid_' + modelName,
              html: '<div id="youTubeModalClose" style="width:635px; height:17px; text-align:right; padding:3px 5px 0 0; cursor:pointer; background-color:#001e42; color:#fff;">X</div><iframe width="640" height="360" src="http://www.youtube.com/embed/' + thisView.model.get("youTubeID") + '?rel=0" frameborder="0" allowfullscreen></iframe>',
              title: "Live Your Life: " + modelName,
              height: 380,
              closeSelector: '#lylYouTubeModalVid_' + modelName + 'Overlay, #youTubeModalClose'
            });
            thisView.options.modal = youTubeModal;
          }
          thisView.options.modal.open();
        });

        try{
          $(document).ready(function() {
            /* Initializing a mediaElementPlayer object for any videos within this block */
            thisView.options.video = thisVideo.mediaelementplayer({
              "videoWidth": "100%",
              "videoHeight": "100%",
              "loop": true,
              "enableAutosize": false,
              "pluginPath": "images/",
              "flashName": 'flashmediaelement.swf',
              "enableKeyboard": false
            });
            if (thisVideo[0]) {
              /* Forcing video to mute, because not all browsers support mute in video tags */
              getVideo(thisVideo[0]).setMuted(true);
            }
          });
        }catch(err){}

      }else if (this.model.get("mediaType") === "bio") {

        $(this.el).html('<img style="width:100%;" src="images/' + modelName + '/' + this.id + '.jpg"/>' +
          '<span class="bio">' +
            '<span class="buttons">' +
              '<a class="link1 bioButton" href="#">' +
                '<span>' + this.model.get("link1Text") + '</span>' +
              '</a>' +
              '<a class="link2 bioButton" href="#">' +
                '<span>' + this.model.get("link2Text") + '</span>' +
              '</a>' +
            '</span>' +
          '</span>');

      }else if (this.model.get("mediaType") === "scalable") {
        $(this.el).addClass("scalable").html('<span class="enlarge"><span>+</span></span><img style="width:100%;" src="images/' + modelName + '/' + this.id + '.jpg"/>');
      }

      $(this.el).css('width', this.model.get("blockWidth") + "%");
      $(this.options.parentSelector).find(".visRow").append($(this.el));
    }
  });

  var RowView = Backbone.View.extend({
    "className": "imgRowCont",
    "options": {
      "selected": false,
      "nextBlock": 0,
      "prevBlock": 0
    },

    "initialize": function(){
      _.bindAll(this, "render", "initialize", "initColumns", "slideRow", "showArrows", "hideArrows", "downTheRabbitHole");

      var thisView = this;

      /* Removed lazy loading in lue of other optimizations */
        //lazyOffset = $(this.options.parentSelector).children().height() * (this.options.index - 2);

      /*if(this.options.index > 2){
        $.alice.at(function(scrollPos, goingDown){
          if(!thisView.$el.html()){
            eatTheCake();
          }
        }, lazyOffset);
      }else{*/
        eatTheCake();
      //}

      /* This function kicks off all the inner workings of this row */
      function eatTheCake(){
        thisView.render();
        thisView.initColumns();
        thisView.slideRow(thisView.options.startingPos, true);
        thisView.downTheRabbitHole();
        thisView.showArrows();
      }
    },

    "render": function(){
      var thisView = this;

      this.$el.html("<div class='arrowLeft nav'><span>&#9668;</span></div>" +
        "<div class='arrowRight nav'><span>&#9658;</span></div>" +
        "<div class='row'>" +
          "<div class='lylWidget'>" +
            "<div class='lylWidgetBtn'>+</div>" +
            "<div class='lylWidgetCont'>" +
              "<div class='lylWidgetNav'>" +
                "<div class='widgetUpBtn'><span>&#x25B2;</span></div>" +
                "<div class='lylWidgetNames'>" +
                  "<div class='widgetRowNamePrev'>" + thisView.options.modelPrev + "</div>" +
                  "<div class='widgetRowName'>" + thisView.options.modelName + "</div>" +
                  "<div class='widgetRowNameNext'>" + thisView.options.modelNext + "</div>" +
                "</div>" +
                "<div class='widgetDownBtn'><span>&#x25BC;</span></div>" +
              "</div>" +
              "<div class='lylWidgetBtns'>" +
                "<div class='lylSocialBtns'>" +
                  "<div class='lylBtn lylfbBtn'><a class='share_button' target='_blank'><span>Facebook</span></a></div>" +
                  "<div class='lylBtn lylTwitterBtn'><a class='share_button' target='_blank' href='https://twitter.com/share?text=" + thisView.options.twitterCopy + "%20in%20AE&#39;s%20Meet%20the%20People%20campaign%20guide.&url=" + thisView.options.bitly + "&via=aeo&hashtags=liveyourlife'><span>Twitter</span></a></div>" +
                  "<div class='lylBtn lylPinterestBtn'><a class='share_button' target='_blank' href='http://pinterest.com/pin/create/button/?url=http%3A%2F%2Fwww.ae.com%2Fweb%2Fguides%2Fliveyourlife.jsp%3Frow%3D" + thisView.options.modelName.toLowerCase() + "%26cid%3DAE_Social_120719_1&media=http%3A%2F%2Fwww.ae.com%2FImages%2Fweb%2FliveYourLife%2Fpinterest%2F" + thisView.options.modelName.toLowerCase() + ".jpg&description=Want%20To%20Be%20In%20AE%E2%80%99s%20Next%20Campaign%3F%20Enter%20The%20%23liveyourlife%20Contest%20Today.'><span>Pinterest</span></a></div>" +
                "</div>" +
                "<div class='lylBtn muteBtn vidMuted'><span>Mute</span></div>" +
                "<div class='lylBtn closeWidget'><span>Close</span></div>" +
              "</div>" +
              "<div class='lylBackToTopBtn'>Back To Top</div>" +
            "</div>" +
          "</div>" +
          "<div class='visRow'></div>" +
        "</div>");

      var lylWidgetBtn = thisView.$(".lylWidgetBtn"),
        lylCloseBtn = thisView.$(".closeWidget"),
        widget = thisView.$(".lylWidget"),
        lylBackToTopBtn = thisView.$(".lylBackToTopBtn");

      lylWidgetBtn.on("click", function(){
        widget.addClass('lylWidgetOpen');

        useWidget = true;
      });

      lylCloseBtn.on("click", function(){
        widget.removeClass('lylWidgetOpen');

        useWidget = false;
      });

      lylBackToTopBtn.on("click", function(){

        scrollAnimation = true;
        scrollElem.animate({ scrollTop: 0}, 800, function(){
          scrollAnimation = false;
        });

        liveYourLife.options.currentRow = 0;

        liveYourLife.updateRowInfo();
      });

      $(this.options.parentSelector).append(this.$el);

      /* If this is the first row, then show directions for navigating the guide */
      if(this.options.index === 0){
          this.$el.append("<div id='lylDirections' class='lylDirections'><span>Scroll left to right or top to bottom using the arrow keys.</span></div>");
      }

      this.visRow = thisView.$(".visRow");

      this.$(".arrowLeft").on("click", function(){
        thisView.slideRow(thisView.prevLeft);
      });
      this.$(".arrowRight").on("click", function(){
        thisView.slideRow(thisView.nextLeft);
      });
    },

    "downTheRabbitHole": function(){
      /* This is the function that pulls the top row to align to the top of the screen when whithin a predifined range. */

      var thisView = this,
        posDiff = 0,
        slideUp = function(){
          if (liveYourLife.options.currentRow != thisView.options.index && scrollAnimation === false && pauseRowSelect === false){
            liveYourLife.slideVert("up", thisView.options.index);
          }
        },
        slideDown = function(){
          if (liveYourLife.options.currentRow != thisView.options.index && scrollAnimation === false && pauseRowSelect === false){
            liveYourLife.slideVert("down", thisView.options.index);
          }
        };

      /* We had to create a custom alice call, because the top positions of all the rows can change due to scaling */
      $.alice(cb, test);

      function cb(scrollPos, goingDown){
        posDiff = thisView.options.rangeDiff;

        if(scrollPos > -posDiff && scrollPos <= 0){
          masterDebouncer(slideDown);
        }else if(scrollPos < posDiff && scrollPos > 0){
          masterDebouncer(slideUp);
        }
      }

      function test(pos){
        return pos - thisView.options.top;
      }
    },

    "showArrows": function(){
      if (this.currLeft === this.prevLeft) {
        this.$(".arrowRight").fadeIn();
      }else if (this.currLeft === this.nextLeft) {
        this.$(".arrowLeft").fadeIn();
      }else {
        this.$(".nav").fadeIn();
      }
    },

    "hideArrows": function(){
      if (this.currLeft === this.prevLeft) {
        this.$(".arrowLeft").fadeOut();
      }else if (this.currLeft === this.nextLeft) {
        this.$(".arrowRight").fadeOut();
      }
    },

    "initColumns": function(){
      var thisView = this,
        rowWidth = 0;

        thisView.columns = [];

      /* Initializes all the blocks for this row. */
      this.collection.each(function(block, index){
        var thisColumn  = new BlockView({
          "model": block,
          "id": block.get("mediaType") + (index + 1),
          "rowId": thisView.id,
          "parentSelector": thisView.el,
          "index": index
        });

        thisView.columns.push(thisColumn);

        /* This stops the row from scrolling past the first and last blocks */
        if(index === 0){
          thisView.options.prevBlock = thisColumn;
        }
        if(rowWidth <= 100){
          thisView.options.nextBlock = thisColumn;
        }

        rowWidth += thisColumn.model.get("blockWidth");

        if (block.get("mediaType") === "scalable"){

          thisColumn.$el.on("click", function(){

            var scrollPos = $('html').scrollTop();

            if (scrollPos === 0){
              scrollPos = $('body').scrollTop();
            }

            pauseRowSelect = true;

            thisView.$("video").each(function(index, video){
              if(video){
                video.pause();
              }
            });

            $("#fullViewBtnCont .lylSocialBtns").remove();

            $("#fullImg").attr('src', 'images/' + thisView.options.modelName.toLowerCase() + '/full' + (thisColumn.options.index + 1) + '.jpg');

            $("#fullImgCont").css('top', scrollPos + 'px');

            // $("#closeFullViewOverlay").stretchObj();

            var bundleLink = "/web/browse/product.jsp?" + block.attributes.bundleId;

            $("#fullViewBundle").attr('href', "#");

            if (block.attributes.social){
              $("#fullViewBtnCont").show();
              $("#fullViewShop").attr('href', "#");
            }else{
              $("#fullViewBtnCont").hide();
            }
            $("#fullView").fadeIn(800).css('width', '100%');

            /* Clones sharing buttons from widget in order to reuse them in studio full views. */
            thisView.$(".lylSocialBtns").clone(true).appendTo("#fullViewBtnCont");
            $('.fullViewBtnCont .lylBtn').addClass('zoomView');

            $(".closeFullViewBtn").on("click", function(){

              $("#fullView").fadeOut(500, function(){
                $("#fullImg").attr('src', '');
                $("#fullViewBtnCont .lylSocialBtns").remove();
              });
              pauseRowSelect = false;
              liveYourLife.slideVert("down", liveYourLife.options.currentRow);
            });

          });
        }
      });
    },

    "slideRow": function( left, killAnimation ) {
      /* This function handles the horizontal navigation. */

      if (!left) {
        left = 0;
      }

      var lylWidget = $('.lylWidget');

      if (!useWidget){
        lylWidget.removeClass('lylWidgetOpen');
      }

      var pos = 0,
        prevIndex = 0,
        nextIndex = 0,
        prevLeft = 0,
        nextLeft = 0,
        maxLeft = left + 100,
        columns = this.columns,
        blockWidth,
        currLeft;

      while (pos <= maxLeft && nextIndex < columns.length) {
        if (pos < left) {
          prevIndex++;
        }
        pos += columns[nextIndex].model.get("blockWidth");
        nextIndex++;
      }
      for (var j = 0; j < nextIndex; j++){
        blockWidth = columns[j].model.get("blockWidth");
        if (j < prevIndex - 1) {
          prevLeft += blockWidth;
        }
        nextLeft += blockWidth;
      }

      this.prevLeft = prevLeft;
      this.nextLeft = nextLeft - 100;

      if (killAnimation) {
        this.visRow.css({'left': -left + "%"});
        currLeft = left;
      } else {
        var arrowClass = "",
          hoveredClass = "";

        if(left < this.currLeft){
          arrowClass = ".arrowLeft";
          hoveredClass = "hoveredLeft";
        }else if(left > this.currLeft){
          arrowClass = ".arrowRight";
          hoveredClass = "hoveredRight";
        }

        this.$(arrowClass).addClass(hoveredClass);

        this.visRow.animate({'left': -left + "%"}, function(){
          $(arrowClass).removeClass(hoveredClass);
        });
        currLeft = left;
      }
      this.currLeft = currLeft;

      this.hideArrows();
      this.showArrows();
    }
  });

  /* Initializeing the view that contains the entire guide. */
  var LiveYourLifeView = Backbone.View.extend({
    "id": "liveYourLife",
    "collection": collectionOfRows,
    "options": {
      "currentRow": 0,
      "headerHeight": 0,
      "allVids": []
    },

    "initialize": function(){
      _.bindAll(this, "render", "slideVert", "updateRowInfo");

      this.render();

      /* We need to know the header height so we can offset all the scroll animations. */
      this.options.headerHeight = $("#liveyourlifeContainer").offset().top;

      var thisView = this;

      /* We are constantly checking for the current state of the guide, mostly to handle scaling. */
      _.delay(function(){
        thisView.updateRowInfo();
      }, 1000);

      /* This function will mute or unmute all videos. */
      $(".muteBtn").on('click', function(){
        var myVideo,
          isMuted = $(".muteBtn").hasClass("vidMuted");
        $(".muteBtn").toggleClass("vidMuted");
        $("video").each(function(index, video){
          myVideo = getVideo(video);
          myVideo.setMuted(!isMuted);
        });
      });

    },

    "render": function(){
      var thisView = this,
        position = 0;

      this.rowViews = [];

      this.collection.each(function(block, index){

        position = (index + 1) % 2;

        var len = thisView.collection.length - 1,
          atIndex = thisView.collection.at(index);

        /* This determines whether a row should start left or right defined. */
        if(atIndex.get("startPosition") == "right"){
          position = 250;
        }else{
          position = 0;
        }

        /* Initializes a row view. */
        var thisRow = new RowView({
            "collection": new BlockCollection(atIndex.get("row")),
            "modelName": atIndex.get("modelName"),
            "modelPrev": index > 0 ? thisView.collection.at(index - 1).get("modelName") : "Top",
            "modelNext": index < len ? thisView.collection.at(index + 1).get("modelName") : "",
            "bitly": atIndex.get("bitly"),
            "fbTwitter": atIndex.get("fbTwitter"),
            "fbName": atIndex.get("fbName"),
            "twitterCopy": atIndex.get("twitterCopy"),
            "id": "row" + (index + 1),
            "startingPos": position,
            "startPosition": atIndex.get("startPosition"),
            "parentSelector": thisView.el,
            "index": index
          });
        thisView.rowViews[index] = thisRow;

        thisView.$el.append(thisRow);

        $("#liveyourlifeContainer").append(thisView.$el);

        /* The video for the currently selected row is auto-played if possible. */
        try{
          if(thisView.options.currentRow == index  && !Modernizr.touch){
            $(thisRow.el).find("video").get(0).play();
          }
        }catch(err){}
      });

      var vidRow = this.rowViews[this.options.currentRow],
      fbCopy = "Check out the Meet the People guide " + thisView.options.fbTwitter + "to learn more about " + thisView.options.fbName + ", a real individual featured in AE's new campaign. Go to ae.com/liveyourlife to share how you #liveyourlife for a chance to be in an AE campaign just like " +  thisView.options.modelName + ".";

      /* Empty full view element is added to the page. */
      $('body').prepend('<div id="fullView" class="fullView">' +
        '<div id="closeFullViewOverlay" class="closeFullViewOverlay closeFullViewBtn"></div>' +
        '<div id="fullImgCont" class="fullImgCont">' +
          '<a id="fullViewBundle" class="fullViewBundle js_qvLink"><img id="fullImg" style="width:100%;" src=""/></a>' +
          '<div id="fullViewBtnCont" class="fullViewBtnCont">' +
            '<div class="fullViewShop"><a id="fullViewShop" class="js_qvLink"><span>Shop This Look</span></a></div>' +
          '</div>' +
          '<div class="closeFullView closeFullViewBtn"><span>X</span></div>' +
        '</div>' +
      '</div>');

      /* If the Full View is open and you scroll outside of it, this alice call will pull you back in. */
      $.alice(zoomCb, zoomTest);

      function zoomCb(scrollPos, goingDown){
        var fullViewHeight = $("#fullImg").height(),
          isOpen = $("#fullView").css("display") == "block";

        if(scrollPos < 0 && isOpen){
          masterDebouncer(alignZoomTop);
        }else if(scrollPos > (fullViewHeight - fullViewHeight * 0.25) && isOpen){
          masterDebouncer(alignZoomBottom);
        }
      }

      function zoomTest(pos){
        return pos - $("#fullImg").offset().top;
      }

      function alignZoomTop(){
        var topOffset = $("#fullImg").offset().top;
        scrollElem.animate({ scrollTop: topOffset}, 800, function(){
          scrollAnimation = false;
        });
      }

      function alignZoomBottom(){
        var fullViewHeight = $("#fullImg").height(),
          topOffset = $("#fullImg").offset().top;
        scrollElem.animate({ scrollTop: topOffset + fullViewHeight * 0.75}, 800, function(){
          scrollAnimation = false;
        });
      }
    },

    "updateRowInfo": _.debounce(function(){
      /* This function is called whenever the state of the guide changes to keep everything in sync. */

      var thisView = this,
      lylWidget = $('.lylWidget'),
      inactiveRow = $(".imgRowCont"),
      widgetRow = $(this.$(".row").get(this.options.currentRow));

      this.options.offset = this.$el.parent().offset().top;
      this.options.rowHeight = this.rowViews[0].$el.height();
      this.options.rangeDiff = this.options.rowHeight * 0.4;

      this.collection.each(function(block, index){
        thisView.rowViews[index].options.top = thisView.options.offset + thisView.options.rowHeight * index;
        thisView.rowViews[index].options.rangeDiff = thisView.options.rangeDiff;
      });

      /* Auto-plays video for currently selected row, this also causes all other videos to pause. */
      try{
        if(!Modernizr.touch){
          $("video").get(this.options.currentRow).play();
        }
      }catch(err){}

      if (!useWidget){
        lylWidget.removeClass('lylWidgetOpen');
      }else{
        lylWidget.removeClass('lylWidgetOpen');
        widgetRow.children(".lylWidget").addClass("lylWidgetOpen");
      }

      inactiveRow.removeClass("activeRow");

      widgetRow.parent().addClass("activeRow");
    }, 300),

    "slideVert": function(direction, index) {
      /* This function will animate a row to the top of the window given a row index and a direction. */

      if (pauseRowSelect === false){
        this.updateRowInfo();
      }

      var rowHeight = this.options.rowHeight,
        rows = this.$el.children(".imgRowCont").length-1,
        offset = this.options.offset,
        currentRow = this.options.currentRow,
        useIndex = index != null,
        headerHeight = this.options.headerHeight,
        thisView = this;

      /* Scroll animation will only be called if scroll animations and row selecting are active or set to true. */
      if (direction === "down" && (useIndex || currentRow < rows) && scrollAnimation === false && pauseRowSelect === false){

        if (useIndex) {
          this.options.currentRow = index;
        } else {
          this.options.currentRow++;
        }

        animateScroll();

      }else if (direction === "up" && (useIndex || currentRow > 0) && scrollAnimation === false && pauseRowSelect === false) {

        if (useIndex) {
          this.options.currentRow = index;
        } else {
          this.options.currentRow--;
        }

        animateScroll();

      }else if (direction === "up" && currentRow === 0 && scrollAnimation === false && pauseRowSelect === false) {
        scrollAnimation = true;
        scrollElem.animate({ scrollTop: 0}, 800, function(){
          scrollAnimation = false;
        });
      }

      function animateScroll(){
        scrollAnimation = true;
        scrollElem.animate({ scrollTop: (thisView.options.currentRow * rowHeight + headerHeight)}, 800, function(){
          scrollAnimation = false;
        });
      }
    }
  });

  var liveYourLife = new LiveYourLifeView({});

  /* On window resize store new position values. */
  $(window).on("resize", function(){
    liveYourLife.updateRowInfo();
  });

  //$("body").on("keydown", function( evt ) {
    //evt.stopPropagation();
  //});

  $(document).on("keydown", function( evt ){

    function doWork() {
      evt.preventDefault();
      row = liveYourLife.rowViews[liveYourLife.options.currentRow];
    }
    var row;

    switch(evt.keyCode){
      case 37:
        if(pauseRowSelect === false){
          removeDirections();
          doWork();
          row.slideRow(row.prevLeft);
        }
        break;
      case 39:
        if(pauseRowSelect === false){
          removeDirections();
          doWork();
          row.slideRow(row.nextLeft);
        }
        break;
      case 38:
        removeDirections();
        doWork();
        liveYourLife.slideVert("up");
        break;
      case 40:
        removeDirections();
        doWork();
        liveYourLife.slideVert("down");
        break;
    }
  });

  function trackSwipe() {
    var liveYourLifeDiv = $("#liveyourlifeContainer"),
      body = $('body'),
      startPosX = 0,
      lastPosX = 0,
      isSwiping = false,
      SWIPE_SENSITIVITY = 200/*,
      SWIPE_DURATION = 200,
      swipeTimer = null*/;

    function clearSwipe() {
      isSwiping = false;
      startPosX = lastPosX = 0;
      liveYourLifeDiv.unbind("touchmove").unbind("touchend").unbind("touchcancel");

        //$(window).css({"overflow": "auto"});
    }

    _.each(liveYourLife.rowViews, function(row, index){

      $(row.el).bind("touchstart", function( evt ) {

        //body.css({"overflow": "hidden"});

        if (event.changedTouches.length == 1) {
          isSwiping = true;
          startPosX = lastPosX = event.changedTouches[0].pageX;

          liveYourLifeDiv.bind("touchmove", function( evt ) {
            if (isSwiping) {
              lastPosX = event.changedTouches[0].pageX;
            } else {
              clearSwipe();
            }
          });

          liveYourLifeDiv.bind("touchend", function( evt ) {
            if (isSwiping) {
              if ((startPosX - lastPosX) > SWIPE_SENSITIVITY) {
                //doWork();
                row.slideRow(row.nextLeft);
              } else if ((lastPosX - startPosX) > SWIPE_SENSITIVITY) {
                //doWork();
                row.slideRow(row.prevLeft);
              }
            }
            clearSwipe();
          });

          liveYourLifeDiv.bind("touchcancel", clearSwipe);
        }
      });
    });
  }
  var row1 = $("#row1");

  row1.addClass("activeRow");
  row1.find(".lylWidget").addClass("lylWidgetOpen");

  $(".widgetDownBtn").last().css("visibility", "hidden");

  var widgetUpBtn = $(".widgetUpBtn"),
    widgetDownBtn = $(".widgetDownBtn"),
    lylWidgetCont = $(".lylWidgetCont");

  widgetUpBtn.on("mouseover", function(){
    $(this).parent().addClass("prevModel");
  });
  widgetUpBtn.on("mouseout", function(){
    $(this).parent().removeClass("prevModel");
  });
  widgetDownBtn.on("mouseover", function(){
    $(this).parent().addClass("nextModel");
  });
  widgetDownBtn.on("mouseout", function(){
    $(this).parent().removeClass("nextModel");
  });

  widgetUpBtn.on("click", function(){
    liveYourLife.slideVert("up");
  });
  widgetDownBtn.on("click", function(){
    liveYourLife.slideVert("down");
  });

  $(document).ready(function(){
    trackSwipe();

    window.setTimeout(
      function(){
        removeDirections();
      },
      6000
    );

    /* When facebook js is loaded bind the facebook posts. */
    // (function() {
    //   $(".lylfbBtn").on("click", function(e){
    //     var currRowData = rowsArray[liveYourLife.options.currentRow],
    //       currModelName = currRowData.modelName,
    //       row_name = currModelName.toLowerCase(),
    //       btnType = $(this).hasClass("zoomView") ? "ZoomView" : "Widget",
    //       post_name = "Live Your Life",
    //       fbCopy = "Check out the Meet the People guide " + currRowData.fbTwitter + "to learn more about " + currRowData.fbName + ", a real individual featured in AE's new campaign. Go to ae.com/liveyourlife to share how you #liveyourlife for a chance to be in an AE campaign just like " +  currModelName + ".",
    //       obj = {
    //         method: 'feed',
    //         link: 'http://www.ae.com/web/guides/liveyourlife.jsp?row=' + row_name + '&cid=AE_Social_120719_0',
    //         picture: 'http://www.ae.com/Images/web/liveYourLife/facebook/' + row_name + '.jpg',
    //         name: post_name,
    //         caption: currModelName,
    //         description: fbCopy
    //       };

    //     e.preventDefault();

    //     FB.getLoginStatus(function(response) {
    //       if (response.status === 'connected') {
    //         FB.ui(obj);
    //         positionFBWindow(50);
    //       } else {
    //         FB.login(function(response){
    //           if (response.authResponse) {
    //             FB.ui(obj);
    //             positionFBWindow(50);
    //           }
    //         });
    //       }
    //     });

    //     return false;
    //   });

    // }());

    $(".lylTwitterBtn").on("click", function(e){
      e.preventDefault();

      var url = $(this).find("a").attr('href'),
        opts = getWindowOpts();

      window.open(url, 'twitter', opts);

      var btnType = $(this).hasClass("zoomView") ? "ZoomView" : "Widget";
    });

    $(".lylPinterestBtn").on("click", function(e){
      e.preventDefault();

      var url = $(this).find("a").attr('href'),
        opts = getWindowOpts();

      window.open(url, 'pinterest', opts);

      var btnType = $(this).hasClass("zoomView") ? "ZoomView" : "Widget";
    });

  });
}());