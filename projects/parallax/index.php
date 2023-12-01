<?php
  $title = "Parallax";
  $path = "/projects/parallax/";
  $exclude_container = true;
  $exclude_bootstrap = true;
  include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php");
?>

<script type="text/javascript" src="/includes/js/underscore.js"></script>
<script type="text/javascript" src="/includes/js/jquery.js"></script>
<link rel="stylesheet" type="text/css" href="<?php echo $path; ?>css/parallax.css">

<style>
  .footer{
    margin-top:0;
  }
</style>

<div class="disclaimer">Parallax - Proof of Concept</div>
<div id="content">
  <div id="parallaxWrap" class="parallaxWrap">
    <div id="paraCrumbs" class="paraCrumbs"></div>
    
    <div class="paraNextWrap"
      data-anchor-target="#parallaxWrap"
      data-top="opacity: 1;"
      data-5p-bottom="opacity: 1;"
      data-bottom="opacity: 0;"
      >
      <div id="scrollDown" class="paraNext">
        <div class="paraCopy">scroll down</div>
        <div class="paraArrow"><span class="is_icon_font">&#x2193;</span></div>
      </div>
    </div>
    <div id="para_sections" class="para_sections">
      <div id='header_1' class='para_section header_1'>
        <div class='paraMenuWrap'
          data-anchor-target='#header_1'
          data-top='display: !inline-block;'
          data-center-bottom='display: !none;'
          >
          <div class='paraMenuCont'>
            <div class='paraMenu'>
              <div class='paraMenuImage'></div>
              <ul class='wsbtn'>
                <li><a href=''>women's great gifts</a></li>
                <li><a href=''>men's great gifts</a></li>
                <li><a href=''>aerie's great gifts</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div id='anchor_1' class='subpara_section subheader_1'></div>
      </div>
      <div id='para_section_1' class='para_section para_section_1'><
        <div class='paraMenuWrap'
          data-anchor-target='#para_section_1'
          data-bottom-top='display: !none;'
          data-center-top='display: !inline-block;'
          data-top='display: !inline-block;'
          data-bottom='display: !inline-block;'
          data-center-bottom='display: !none;'
          >
          <div class='paraMenuCont'>
            <div class='paraMenu'>
              <div class='paraMenuImage'></div>
              <ul class='wsbtn'>
                <li><a href=''>Great Gifts</a></li>
                <li><a href=''>Gifts By Price</a></li>
                <li><a href=''>Gift Cards</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div id='anchor_2' class='subpara_section subpara_section_1'
          data-bottom-top='background-attachment: !local;'
          data-top='background-attachment: !fixed;'
        ></div>
        <div id='anchor_3' class='subpara_section subpara_section_2 fixedpara_section'></div>
        <div id='anchor_4' class='subpara_section subpara_section_3 fixedpara_section'></div>
        <div id='anchor_5' class='subpara_section subpara_section_4'
          data-top-bottom='background-attachment: !fixed;'
          data-top='background-attachment: !local;'
        ></div>
      </div>
    </div>
    <div id='para_section_2' class='para_section para_section_2'>
      <div class='paraMenuWrap'
        data-anchor-target='#para_section_2'
        data-bottom-top='display: !none;'
        data-center-top='display: !inline-block;'
        data-top='display: !inline-block;'
        data-bottom='display: !inline-block;'
        data-center-bottom='display: !none;'
        >
        <div class='paraMenuCont'>
          <div class='paraMenu'>
            <div class='paraMenuImage'></div>
            <ul class='wsbtn'>
              <li><a href=''>Great Gifts</a></li>
              <li><a href=''>Gifts By Price</a></li>
              <li><a href=''>Gift Cards</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div id='anchor_6' class='subpara_section subpara_section_1'
        data-bottom-top='background-attachment: !local;'
        data-top='background-attachment: !fixed;'
      ></div>
      <div id='anchor_7' class='subpara_section subpara_section_2 fixedpara_section'></div>
      <div id='anchor_8' class='subpara_section subpara_section_3 fixedpara_section'></div>
      <div id='anchor_9' class='subpara_section subpara_section_4'
        data-top-bottom='background-attachment: !fixed;'
        data-top='background-attachment: !local;'
      ></div>
    </div>
    <div id='para_section_3' class='para_section para_section_3'>
      <div class='paraMenuWrap'
        data-anchor-target='#para_section_3'
        data-bottom-top='display: !none;'
        data-center-top='display: !inline-block;'
        data-top='display: !inline-block;'
        data-bottom='display: !inline-block;'
        data-center-bottom='display: !none;'
        >
        <div class='paraMenuCont'>
          <div class='paraMenu'>
            <div class='paraMenuImage'></div>
            <ul class='wsbtn'>
              <li><a href=''>Great Gifts</a></li>
              <li><a href=''>Gifts By Price</a></li>
              <li><a href=''>Gift Cards</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div id='anchor_10' class='subpara_section subpara_section_1'
        data-bottom-top='background-attachment: !local;'
        data-top='background-attachment: !fixed;'
      ></div>
      <div id='anchor_11' class='subpara_section subpara_section_2 fixedpara_section'></div>
      <div id='anchor_12' class='subpara_section subpara_section_3 fixedpara_section'></div>
      <div id='anchor_13' class='subpara_section subpara_section_4'
        data-top-bottom='background-attachment: !fixed;'
        data-top='background-attachment: !local;'
      ></div>
    </div>
    <div id="snow_1" class="snow snow_1"
      data-anchor-target="#parallaxWrap"
      data-top="background-position: 0px 0px"
      data-center="background-position: -25px 125px"
      data-top-bottom="background-position: 0px 250x"
    ></div>
    <div id="snow_2" class="snow snow_2"
      data-anchor-target="#parallaxWrap"
      data-top="background-position: 0px 0px"
      data-center="background-position: 50px 250px"
      data-top-bottom="background-position: 0px 500x"
    ></div>
  </div>
</div>
<div class="disclaimer">Content &copy; AEO All Rights Reserved.</div>

<script type="text/javascript" src="<?php echo $path; ?>js/skrollr.js"></script>
<script type="text/javascript" src="<?php echo $path; ?>js/imagesloaded.js"></script>
<script type="text/javascript" src="<?php echo $path; ?>js/parallax.js"></script>

<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/foot.php"); ?>