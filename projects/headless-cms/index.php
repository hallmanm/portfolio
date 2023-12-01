<?php
  $title = "Headless CMS";
  $path = "/projects/headless-cms/";
  $exclude_container = true;
  $exclude_bootstrap = true;
  include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php");
?>

<script type="text/javascript" src="/includes/js/jquery.js"></script>
<script type="text/javascript" src="<?php echo $path; ?>js/dependencies.js"></script>
<link rel="stylesheet" type="text/css" href="<?php echo $path; ?>css/styles.css">

<!-- <h1>Brandcardinator - Headless CMS</h1>
<div class="section"> -->
  <div class="disclaimer">This application must be viewed on a desktop browser. | Content &copy; AEO All Rights Reserved.</div>
  <div class="cms" style="position:relative;">
    <div id="generator_wrap" class="generator_wrap showTip">
      <div class="minMax">
        <button id="debugBtn" class="btn debugBtn x" type="button" onclick="debug=!debug;$(this).toggleClass('Active');">{...}</button>
        <button id="saveBtn" class="btn saveBtn x" type="button" onclick="printFile('save');">&#x1f4be;</button>
        <button class="btn white minBtn" type="button" onclick="minimize(undefined,true)">Collapse All</button>
        <button class="btn white maxBtn" type="button" onclick="minimize()">Expand All</button>
      </div>
      <button id="addCardBtn" class="btn addCardBtn green tip form_btn" type="button" onclick="addCards(this)">+</button>
      <div id="card_inputs">
        <form id="autoscroll_delay" class="autoScroll" name="auto_scroll_form">
          <fieldset>
            <label>AutoScroll:</label>
            <select id="autoScrollInput" name="autoscroll_delay">
              <option value="0">None</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4" selected>4</option>
              <option value="5">5</option>
            </select>
            <span>seconds</span>
          </fieldset>
        </form>
        <div id="cards"></div>
      </div>
      <div id="banners" class="banners slide blue_background">
        <div id="banners_content" class="slide_content">
          <table id="banners_table"></table>
        </div>
        <button id="addBannerBtn" class="btn addBannerBtn green tip form_btn" type="button" onclick="addBanners()">+</button>
        <button id="addBannersBtn" class="btn addBannersBtn blue tip error_btn" type="button" onclick="toggleShadow(this)">Banners</button>
      </div>
      <div id="promotions" class="promotions slide blue_background">
        <div id="promotions" class="slide_content">
          <table id="promotions_table"></table>
        </div>
        <button id="addPromotionBtn" class="btn addPromotionBtn green tip form_btn" type="button" onclick="addPromotions()">+</button>
        <button id="addPromotionsBtn" class="btn addPromotionsBtn blue tip error_btn" type="button" onclick="toggleShadow(this)">Promotions</button>
      </div>
      <div id="input_json" class="input_json slide blue_background">
        <div id="json_input_content" class="slide_content">
          <textarea id="jsonInputText" class="jsonInput_textarea" placeholder="enter json here..." oninput="jsonTextarea(this)"></textarea>
        </div>
        <button id="inputJSONBtn" class="btn inputJSONBtn green tip form_btn" type="button" onclick="inputJSON(this)">Create Cards</button>
        <button id="restoreBtn" class="btn restoreBtn orange" type="button" onclick="loadFile('restore')">Restore</button>
        <button id="savedBtn" class="btn savedBtn orange" type="button" onclick="loadFile('saved')">Load Saved</button>
        <button id="loadZoneBtn" class="btn loadZoneBtn orange" type="button" onclick="loadFile('zone')">Load ZONE</button>
        <button id="loadProdBtn" class="btn loadProdBtn orange" type="button" onclick="loadFile('prod')">Load PROD</button>
        <button id="openInputJSONBtn" class="btn openInputJSONBtn blue tip" type="button" onclick="toggleShadow(this);$('#jsonInputText').select();">Input JSON</button>
      </div>
      <div id="organize" class="organize slide blue_background">
        <div id="organize_content" class="slide_content"></div>
        <button id="organizeBtn" class="btn organizeBtn blue tip" type="button" onclick="organize(this);">Organize Cards</button>
        <button id="override" class="btn override x" onclick="organize(this,true);">&#x26a0;</button>
        <button id="createJSONBtn" class="btn createJSONBtn orange tip" type="button" onclick="openOutput(this)">Create JSON</button>
        <button id="applyJSONBtn" class="btn applyJSONBtn green tip form_btn" type="button" onclick="applyJSON()">Apply JSON</button>
        <div class="testCheck">
          <input id="testCheck" type="checkbox" value="testing" checked>
          <label for="testCheck">Testing</label>
        </div>
        <button id="printBtn" class="btn printBtn x" type="button" onclick="printFile()">&#128221;</button>
        <textarea id="jsonOutput" class="jsonOutput"></textarea>
        <div id="tempJson" class="tempJson">
          <input type="date" placeholder="yyyy-dd-mm" id="temp_date_input">
          <input type="time" placeholder="hh:mm 24hr" id="temp_time_input">
          <button type="button" onclick="createOutput(true)" class="green">Apply</button>
          <button type="button" onclick="createOutput()" class="red">Clear</button>
        </div>
      </div>
      <button id="undoBtn" class="btn undoBtn blue form_btn" type="button" onclick="undo()">&#x21BA;</button>
      <div id="shadow" class="shadow"></div>
    </div>
  </div>
<!-- </div> -->

<script type="text/javascript" src="<?php echo $path; ?>js/logic.js"></script>

<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/foot.php"); ?>