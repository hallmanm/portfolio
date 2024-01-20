<?php
  $title = "Live Your Life";
  $path = "/projects/live-your-life/";
  $exclude_container = true;
  // $exclude_bootstrap = true;
  include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php");
?>

<script type="text/javascript" src="/includes/js/jquery.js"></script>
<script type="text/javascript" src="/includes/js/underscore.js"></script>
<script type="text/javascript" src="/includes/js/backbone.js"></script>
<script type="text/javascript" src="/includes/js/modernizr.js"></script>
<script type="text/javascript" src="/includes/js/mediaelementplayer.js"></script>
<script type="text/javascript" src="<?php echo $path; ?>js/alice.js"></script>

<link rel="stylesheet" type="text/css" href="/includes/css/mediaelementplayer.css">
<link rel="stylesheet" type="text/css" href="<?php echo $path; ?>css/live_your_life.css">
<style>
  #content .row{
    margin-left:0;
    margin-right:0;
  }
</style>
<h1>#LiveYourLife - Cast Showcase<a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/live-your-life" target="_blank"><img src="/images/logos/github.png"/></a></h1>
<div id="content">
  <div id="liveYourLifeHeader">
    <div class="btnContainer">
      <a href="#"><span>Enter Contest</span></a>
    </div>
  </div>
  <div id="liveyourlifeContainer"></div>
</div>

<div class="container">

  <h2>More Info...</h2>
  <p style="text-align: right;"><a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/live-your-life" target="_blank"><img src="/images/logos/github.png"/></a></p>

  <div class="section">

    <div class="section">
      <h3>Purpose</h3>
      <p>The #LiveYourLife Cast Showcase provides customers an opportunity to "meet" and learn more about the cast of AEO models.</p>
    </div>

    <div class="section">
      <h3>Background</h3>
      <p>AEO organized a contest that invited the public to submit themselves for consideration as cast models. To showcase the contestants, AEO sought a dynamic and interactive application to connect customers with potential models.</p>
    </div>

    <div class="section">
      <h3>Overview</h3>
      <h4>Dynamic Views</h4>
      <p>This application delivers a distinctive experience by randomizing the position and size of content. Organized in rows, each section introduces a new cast member and includes quotes, imagery, video, and social media connections.</p>
      <h4>Shoppable</h4>
      <p>Expandable image elements in this application can be linked to product collections, providing a new way to merchandise.</p>
      <h4>Media Controls</h4>
      <p>Ensuring the best user experience, precise control over the videos was crucial. Each video will play and pause according to the guide's positioning but will start initially muted. Users will have the option to unmute if desired.</p>
    </div>
    
    <div class="section">
      <h3>Technical Details</h3>
      <h4>Data Object</h4>
      <pre>
{
  "modelName": "Shay",
  "bitly": "http://on.ae.com/Pm6GDL",
  "fbTwitter": "and follow @shaymitch ",
  "fbName": "actress Shay",
  "twitterCopy" : "Actress Shay (@shaymitch)",
  "startPosition": "left",
  "row": [
    {
      "blockWidth": 25
    },
    {
      "blockWidth": 75,
      "mediaType": "scalable",
      "bundleId": "bundleCatId=cat5930102&productId=0393_9260_600"
    },
    {
      "blockWidth": 100
    },
    {
      "blockWidth": 25,
      "mediaType": "scalable",
      "bundleId": "bundleCatId=cat5900248",
      "social": true
    },
    {
      "blockWidth": 75,
      "mediaType": "vid",
      "youTubeID": "8KcZDolqBLw"
    },
    {
      "blockWidth": 50,
      "mediaType": "bio",
      "link1": "/web/guides/w_jeanguide.jsp?catId=cat5900036&icid=AE:LiveYourLife:ShayBio:FindYourFit",
      "link1Text": "Find Your Fit",
      "link2": "/web/sweepstakes/index.jsp?icid=AE:LiveYourLife:ShayBio:EnterContest",
      "link2Text": "Enter Contest"
    }
  ]
}
      </pre>
      <h4>Block Model</h4>
      <pre>
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
      </pre>
      <h4>Media Control</h4>
      <pre>
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
      </pre>
      <h4>Swipe Control</h4>
      <pre>
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
      </pre>
    </div>

  </div>

</div>

<script type="text/javascript" src="js/liveYourLifeData.js"></script>
<script type="text/javascript" src="js/liveYourLife.js"></script>

<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/foot.php"); ?>