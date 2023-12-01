<?php
  $title = "Personalization";
  $path = "/projects/personalization/";
  include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php");
?>

<h1>Personalization</h1>
<div class="section">
  <div class="project">
    <img src="/images/thumbs/just_for_you.jpg"/>
  </div>
  
</div>

<div class="section">
  <h2>More Info...</h2>
  <div class="row section">
    <div class="col-xs-12">
      <p style="text-align: right;"><a class="code-link" href="https://github.com/hallmanm" target="_blank"><img src="/images/logos/github.png"/></a></p>
      <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/markdown.php"); ?>
    </div>
  </div>
</div>

<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/foot.php"); ?>