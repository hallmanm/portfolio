<?php
  $title = "RegEx";
  $path = "/projects/regex/";
  include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php");
?>

<h1>RegEx - 77kids Word Count</h1>
<div class="section">
  <p>This text box functionality was originally for a "77Kids" sweepstakes which required the participant to write a short essay about their child. The essay allowed up to 300 words. This box will count the inputed words and also tell you if you've gone over and by how many words.</p>
  <p>For this example, the word limit is set to 10.</p>
  <div class="project" style="text-align:center;">
    <textarea tabindex="2" id="essayDesc" name="essayDesc" rows="7" cols="35" placeholder="Please enter your words here..." onkeyup="liveCount()" onblur="liveCount()" style="width:90%"></textarea>
    <div id="wordCountOutput"></div>
  </div>
</div>

<div class="section">
  <h2>More Info...</h2>
  <div class="row section">
    <div class="col-xs-12">
      <p style="text-align: right;"><a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/regex" target="_blank"><img src="/images/logos/github.png"/></a></p>
      <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/markdown.php"); ?>
    </div>
  </div>
</div>

<script type="text/javascript" src="<?php echo $path; ?>js/main.js"></script>

<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/foot.php"); ?>