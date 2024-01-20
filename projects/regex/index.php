<?php
  $title = "RegEx";
  $path = "/projects/regex/";
  include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php");
?>

<h1>RegEx - 77kids Word Count<a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/regex" target="_blank"><img src="/images/logos/github.png"/></a></h1>
<div class="section">
  <div class="project" style="text-align:center;">
    <textarea tabindex="2" id="essayDesc" name="essayDesc" rows="7" cols="35" placeholder="Please enter your words here..." onkeyup="liveCount()" onblur="liveCount()" style="width:90%"></textarea>
    <div id="wordCountOutput"></div>
  </div>
  <div class="disclaimer">For this demo, the word limit is set to 10.</div>
</div>


<h2>More Info...</h2>
<p style="text-align: right;"><a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/regex" target="_blank"><img src="/images/logos/github.png"/></a></p>

<div class="section">

  <div class="section">
    <h3>Purpose</h3>
    <p>This application was developed to restrict input to 300 words within a contest entry.</p>
  </div>

  <div class="section">
    <h3>Background</h3>
    <p>A sub brand of AEO, 77kids, hosted a contest asking customers to write about their child. Given the large number of potential entries, a word limit was required.</p>
  </div>

  <div class="section">
    <h3>Overview</h3>
    <p><b>Word Count Calculation:</b> The 'wordCounter' function takes the value from the textarea, trims leading whitespaces, and uses a regular expression to split the string into an array of words. The total word count is then calculated, considering the user agent to handle specific cases.</p>
    <p><b>Live Word Count Update:</b> The 'liveCount' function is responsible for updating the UI with the current word count. It dynamically changes the color of the text based on whether the user has exceeded the word limit.</p>
    <p><b>Word Limit Enforcement:</b> The 'wordLimit' function checks if the current word count exceeds the specified limit. This can be used to prevent users from submitting content that goes beyond the defined constraint.</p>
  </div>

  <div class="section">
    <h3>Technical Details</h3>
    <pre>
function wordCounter() {
  // Retrieve the value from the textarea
  var essay_val = essay.value;

  // Trim leading whitespaces
  var leftTrim = /^\s+/;
  var trimmed = essay_val.replace(leftTrim, "");

  // Split the string into words using regex
  var splitString = trimmed.split(/\s+|[\w\d]$|[.?!"]$/);

  // Calculate the word count
  var wordCount = (navigator.userAgent.indexOf('MSIE') > 0 ) ? (splitString.length+1) : splitString.length;

  return wordCount;
}
    </pre>
    <pre>
function liveCount(){
  // Get the current word count
  var curCount = wordCounter();

  // Update the UI with the word count
  wordCountOutput.style.color = "#333";
  wordCountOutput.innerHTML = (curCount - 1) + " of " + maxWords + " words";

  // Check if the user has exceeded the word limit
  if (curCount > maxWords + 1){
    wordCountOutput.style.color = "red";
    wordCountOutput.innerHTML = "You've gone over " + maxWords + " words by " + (curCount - (maxWords + 1)) + " word(s).";
  }
}
    </pre>
    <pre>
function wordLimit(){
  // Check if the word count exceeds the limit
  if (wordCounter() > maxWords + 1){
    return false;
  } else {
    return true;
  }
}
    </pre>
  </div>

</div>


<script type="text/javascript" src="<?php echo $path; ?>js/main.js"></script>

<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/foot.php"); ?>