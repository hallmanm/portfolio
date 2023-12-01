<?php
  $title = "Panorama";
  $path = "/projects/panorama/";
  $exclude_chatgpt = true;
  include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php");
?>

<script type="text/javascript" src="/includes/js/modernizr.js"></script>
<script type="text/javascript" src="<?php echo $path; ?>js/pano2vr_swfobject.js"></script>
<script type="text/javascript" src="<?php echo $path; ?>js/pano2vr_player.js"></script>
<script type="text/javascript" src="<?php echo $path; ?>js/pano2vr_skin.js"></script>

<link rel="stylesheet" type="text/css" href="<?php echo $path; ?>css/pano.css">

<h1>Panorama</h1>
<div class="section">
  <div class="disclaimer">This application must be viewed on a desktop browser.</div>
  <div class="project">
    <div id="container" class="pano">
      <div class="panoUnsupported">
        <h2>Browser Does Not Support Panorama</h2>
        <h3>Please Use Chrome, Safari or Firefox</h3>
      </div>
    </div>
    <script type="text/javascript" src="<?php echo $path; ?>js/pano.js"></script>
    <noscript>
      <p><b>Please enable Javascript!</b></p>
    </noscript>
  </div>
  <div class="disclaimer">Content &copy; AEO All Rights Reserved.</div>
</div>

<div class="section">
  <h2>More Info...</h2>
  <div class="row section">
    <div class="col-xs-12">
      <p style="text-align: right;"><a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/parallax" target="_blank"><img src="/images/logos/github.png"/></a></p>
      <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/markdown.php"); ?>
    </div>
  </div>
</div>

<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/foot.php"); ?>