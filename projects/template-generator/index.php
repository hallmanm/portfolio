<?php
  $title = "Template Generator";
  $path = "/projects/template-generator/";
  include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php");
?>

<h1>Master Module - Template Generator</h1>
<div class="section">
  <iframe class="project" src="master-module.html" style="width:100%;height:810px;"></iframe>
  <div class="disclaimer">View JSON output in console.</div>
</div>

<div class="section">
  <h2>More Info...</h2>
  <div class="row section">
    <div class="col-xs-12">
      <p style="text-align: right;"><a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/template-generator" target="_blank"><img src="/images/logos/github.png"/></a></p>
      <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/markdown.php"); ?>
    </div>
  </div>
</div>

<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/foot.php"); ?>