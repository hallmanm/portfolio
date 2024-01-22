<?php
  $title = "Adobe Target Debugger";
  $path = "/projects/experiment-visibility/";
  include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php");
?>

<script type="text/javascript" src="/includes/js/jquery.js"></script>
<link rel="stylesheet" type="text/css" href="./css/debugger.css">

<style>
    .project{
        position:relative;
        min-height:500px;
    }
</style>

<h1>Adobe Target Debugger<a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/experiment-visibility" target="_blank"><img src="/images/logos/github.png"/></a></h1>
<div class="section">
  <div id="project" class="project">
    <picture class="elem1">
      <source media="(min-width:670px)" srcset="./images/xt.jpg">
      <img src="./images/xt_sm.jpg">
    </picture>
    <picture class="elem2">
      <source media="(min-width:670px)" srcset="./images/ab.jpg">
      <img src="./images/ab_sm.jpg">
    </picture>
    <picture class="elem3">
      <source media="(min-width:670px)" srcset="./images/rec.jpg">
      <img src="./images/rec_sm.jpg">
    </picture>
  </div>
  
</div>


<h2>More Info...</h2>
<p style="text-align: right;"><a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/experiment-visibility" target="_blank"><img src="/images/logos/github.png"/></a></p>

<div class="section">

  <div class="section">
    <h3>Purpose</h3>
    <p>The debugger was developed to enhance visibility for both the business and engineers, revealing the manipulations to the site initiated by the experimentation tool.</p>
  </div>

  <div class="section">
    <h3>Background</h3>
    <p>Given the increasing volume of tests, experiences, and recommendations deployed on the site, it became crucial to offer visibility to cross-functional teams. This application not only assists business users in locating and validating features but also aids engineers in debugging their work.</p>
  </div>

  <div class="section">
    <h3>Overview</h3>
    <h4>Information</h4>
    <p>Each "activity" includes a type (AB Test, Experience, Recommendation, Template, or Extension), a name, a brief description, a link to the corresponding JIRA ticket, and the parent DOM element.</p>
    <h4>Identification</h4>
    <p>When chosen, the element will be highlighted with the corresponding type color, outlining the entire area undergoing manipulation.</p>
    <h4>Definitions</h4>
    <p>While addressing Adobe Target-related tasks, I seized the opportunity to incorporate Tealium-related scripts. When integrated with a Tealium profile, the debugger enables users to modify the environment and verify the version ID.</p>
    <ul>
        <li>A/B - Experiment</li>
        <li>XT - Experience</li>
        <li>REC - Recommendation</li>
        <li>TMP - Template</li>
        <li>EXT - Extension</li>
    </ul>
  </div>

  <div class="section">
    <h3>Technical Details</h3>
    <pre>
//Adobe Activity
{
  "name":"A/B - Promo Test - 9/1-9/14",
  "info":{
      "desc":"All Tops On Sale - Show vs Hide",
      "jira":"JIRA-1234"
  },
  "elements":[
      ".elem2"
  ]
}
    </pre>
    <pre>
//Tealium Activity
{
  "name": "extension - eCommerce",
  "info": {
    "desc": "Capturing order properties"
  }
}
    </pre>
  </div>

</div>

<script type="text/javascript" src="./js/utag_sync.js"></script>
<script type="text/javascript" src="./js/activities.js"></script>
<script type="text/javascript" src="./js/debugger.js"></script>
<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/foot.php"); ?>