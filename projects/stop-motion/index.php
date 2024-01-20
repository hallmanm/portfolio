<?php
  $title = "Stop Motion";
  $path = "/projects/stop-motion/";
  include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php");
?>

<script type="text/javascript" src="/includes/js/underscore.js"></script>
<script type="text/javascript" src="/includes/js/jquery.js"></script>
<script type="text/javascript" src="/includes/js/jquery_ui.js"></script>

<link rel="stylesheet" type="text/css" href="<?php echo $path; ?>css/sprite_gallery.css">

<h1>Stop Motion Animation<a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/stop-motion" target="_blank"><img src="/images/logos/github.png"/></a></h1>
<div class="section">
  <div id="AnimationWidgetWrapper" class="project"></div>
  <div class="disclaimer">Content &copy; AEO All Rights Reserved.</div>
  <div class="panel panel-default" style="margin-top:50px;">
    <div class="panel-heading">
      <h3 class="panel-title">Edit The Settings!</h3>
    </div>
    <div class="panel-body">
      <form id="edit" class="edit">
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="speed">Animation Speed in Miliseconds</label>
              <input type="number" class="form-control" id="speed" placeholder="100" value="100" min="10" max="200">
            </div>
            <div class="form-group">
              <label for="minInterval">Minimal Time Between Animations in Seconds</label>
              <input type="number" class="form-control" id="minInterval" placeholder="0" value="0" min="0" max="5" step="0.1">
            </div>
            <div class="form-group">
              <label for="maxInterval">Maxiumum Time Between Animations in Seconds</label>
              <input type="number" class="form-control" id="maxInterval" placeholder="2.5" value="2.5" min="0" max="5" step="0.1">
            </div>
            <p style="font-size:10px;margin-top:-15px">If Min and Max values are in conflict, a default value will be used.</p>
            <div class="form-group">
              <label for="preview">Size (%) of Preview Window</label>
              <input type="number" class="form-control" id="preview" placeholder="30" value="30" min="0" max="100">
              <p style="font-size:10px;">If 0, no preview will be shown.</br>Percentage will automatically max out when preview width matches container width.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label>
                <input id="intro" type="checkbox" checked> Scroll Intro Animation
              </label>
            </div>
            <div class="form-group">
              <label>
                <input id="scrollbar" type="checkbox"> Show Scroll Bar
              </label>
            </div>
            <div class="form-group">
              <label>
                <input id="bounce" type="checkbox"> Bounce Arrows
              </label>
            </div>
            <div class="form-group">
              <label>
                <input id="fade" type="checkbox"> Fade Images Not Fully in View
              </label>
            </div>
          </div>
        </div>
        <div onclick="update()" class="btn btn-success" style="float:right;">Reload Widget</div>
      </form>
    </div>
  </div>
</div>

<h2>More Info...</h2>
<p style="text-align: right;"><a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/stop-motion" target="_blank"><img src="/images/logos/github.png"/></a></p>

<div class="section">

  <div class="section">
    <h3>Purpose</h3>
    <p>The Stop Motion carousel presents products dynamically and attractively, introducing a unique movement to the images without the burden of using videos. The application offers a versatile framework that can be effortlessly customized by business users using a simple data object.</p>
  </div>

  <div class="section">
    <h3>Background</h3>
      <p>Following years of the consistent "Jean Guide" appearance, AEO sought a change. Through collaboration with the design team, I developed a dynamic and scalable solution applied across various product categories. A notable achievement was eliminating the requirement for engineering resources to facilitate new instances or modifications.</p>
  </div>

  <div class="section">
    <h3>Overview</h3>

    <div class="section">
      <div class="row">
        <div class="col-xs-9 col-sm-10 col-md-11">
          <h4>Sprites</h4>
          <p>Each model was filmed executing a simple movement, such as shifting their weight or moving their hands or legs. Ten frames were then chosen to serve as a repeatable and reversible motion.</p>
          <h4>Window</h4>
          <p>Only one frame of the sprite is visible, with the rest being masked. The sprite is moved both up and down, creating the illusion of a moving image, similar to a GIF. Ensuring natural-looking movement in reverse enables us to derive two animations from a single sprite.</p>
          <h4>Setting the Size</h4>
          <p>A requirement is that each sprite has a uniform width and height. Moreover, the overall height of the sprite is incorporated, enabling the code to animate through the total number of frames unique to each sprite. These values can be easily adjusted within the code to accommodate a variety of ratios. While the sprites are not responsive, they are adaptive. Depending on the adjustable viewport, the number of visible sprites will adapt to accommodate any device width. Similarly, the draggable preview window will adjust and toggle visibility based on the viewport.</p>
          <h3>Technical Details</h3>
          <h4>Building the Guide</h4>
          <p>By setting several properties, the user can decide the following:</p>
          <ul>
            <li>Speed of frame animation</li>
            <li>Minimum delay between animations</li>
            <li>Maximum delay between animations</li>
            <li>Display and size of preview window</li>
            <li>Animating the intro of the guide on load</li>
            <li>Display of scrollbar</li>
            <li>Bounce animation of carousel arrows</li>
            <li>Fading sprites based on viewport</li>
            <li>Frame width and height</li>
            <li>Sprite height</li>
            <li>Sprite heading</li>
            <li>Linking out to a URL</li>
            <li>Image URL</li>
          </ul>
          <pre>
{
  'speed': 100,
  'minInterval': 0,
  'maxInterval': 2.5,
  'preview': 30,
  'intro': true,
  'scrollbar': false,
  'bounce': false,
  'fade': false,
  'imgWidth': 144,
  'imgHeight': 365,
  'linkTo': false,
  'sprites': [
  {
      "copy": "Sky High Jegging",
      "catId": "cat7010082",
      "imgSrc": "/projects/stop-motion/images/skyhighjegging.jpg",
      "imgHeight": 3650
    },
    ...
  ]
}
          </pre>
          <h4>Data Object</h4>
          <p>Each sprite is coded as a data object in the application. The system tracks the position and direction of the current sprite animation. Furthermore, it ensures that each sprite within the viewport completes one animation cycle before any sprite is animated for a second time.</p>
          <pre>
for (var i = 0; i < animationCount; i++) {
  animations[i].leftPosition = Math.round($(animations[i]).position().left);
  animations[i].rightPosition = Math.round(animations[i].leftPosition + parseInt(animationOuterWidth, 10));
  animations[i].sprite = $(animations[i]).find('img');
  animations[i].frame_count = Math.round($(animations[i].sprite).attr('height') / animationHeight);
  animations[i].top_pos = 0;
  animations[i].hasPlayed = 0;
  animations[i].loopCount = 1;
}
          </pre>
          <h4>Randomization</h4>
          <p>To provide a more organic feel to the guide, two aspects have been randomized. Firstly, the timing between sprite animations is set with minimum and maximum values. A randomized value within this range is selected each time to prevent the user from becoming accustomed to a specific pace. Additionally, the order in which the sprites animate is also randomized.</p>
          <pre>
//Create Random Delay Between Animations
function randomizeInterval() {
  randomized = true;

  var randomInterval = Math.floor(Math.random() * (animationData.maxInterval * 10 - animationData.minInterval * 10) + animationData.minInterval * 10) * 100;

  animationDelay = setTimeout(function() {
    randomizeNumber();
  }, randomInterval);
}
          </pre>
          <pre>
//Create Random Number for Animated Element
function randomizeNumber(){
  activeAnimation = Math.floor((Math.random() * animationCount));

  checkNum();
}
          </pre>
        </div>

        <div class="col-xs-3 col-sm-2 col-md-1">
          <img src="images/artist.jpg"/>
        </div>
      </div>
    </div>
  
  
  </div>

</div>


<script type="text/javascript" src="<?php echo $path; ?>js/jeans_data.js"></script>
<script type="text/javascript" src="<?php echo $path; ?>js/sprite_gallery.js"></script>
<script>
  function update(){
    var formData = {
      'speed': document.getElementById('speed').value,
      'minInterval': document.getElementById('minInterval').value,
      'maxInterval': document.getElementById('maxInterval').value,
      'preview': document.getElementById('preview').value,
      'intro': document.getElementById('intro').checked,
      'scrollbar': document.getElementById('scrollbar').checked,
      'bounce': document.getElementById('bounce').checked,
      'fade': document.getElementById('fade').checked
    };

    buildWidget(formData);
  }
</script>

<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/foot.php"); ?>