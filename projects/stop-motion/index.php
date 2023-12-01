<?php
  $title = "Stop Motion";
  $path = "/projects/stop-motion/";
  include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php");
?>

<script type="text/javascript" src="/includes/js/underscore.js"></script>
<script type="text/javascript" src="/includes/js/jquery.js"></script>
<script type="text/javascript" src="/includes/js/jquery_ui.js"></script>

<link rel="stylesheet" type="text/css" href="<?php echo $path; ?>css/sprite_gallery.css">

<h1>Stop Motion Animation</h1>
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

<div class="section">
  <h2>More Info...</h2>
  <div class="row section">
    <div class="col-xs-12">
      <p style="text-align: right;"><a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/stop-motion" target="_blank"><img src="/images/logos/github.png"/></a></p>
      <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/markdown.php"); ?>
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