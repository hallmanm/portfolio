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
  <div class="section">
    <h2>More Info...</h2>
    <div class="row section">
      <div class="col-xs-12">
        <p style="text-align: right;"><a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/live-your-life" target="_blank"><img src="/images/logos/github.png"/></a></p>
        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/markdown.php"); ?>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript" src="js/liveYourLifeData.js"></script>
<script type="text/javascript" src="js/liveYourLife.js"></script>

<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/foot.php"); ?>