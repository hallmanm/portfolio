<?php
  $title = "Template Generator";
  $path = "/projects/template-generator/";
  include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php");
?>

<h1>Master Module - Template Generator<a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/template-generator" target="_blank"><img src="/images/logos/github.png"/></a></h1>
<div class="section">
  <iframe class="project" src="master-module.html" style="width:100%;height:810px;"></iframe>
  <div class="disclaimer">View JSON output in console.</div>
</div>

<div class="section">
  <h2>More Info...</h2>
  <p style="text-align: right;"><a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/template-generator" target="_blank"><img src="/images/logos/github.png"/></a></p>
  <div class="row section">
    <h3>Purpose</h3>
    <div class="col-xs-12">
      <p>The "Master Module" empowers business users to effortlessly generate marketing content modules on demand. What used to require collaborative efforts from UX, Design, Engineering, and QE, spanning months of coordination and work, can now be accomplished instantly. The "Master Module" is designed to facilitate the creation of unique modules or establish a library of customizable templates.</p>
    </div>
  </div>

  <div class="row section">
    <h3>Background</h3>
    <div class="col-xs-12">
    <p>AEO faced challenges with its traditional CMS, particularly in adapting the brand's ever-evolving online presence. When presented with the chance to adopt a headless CMS, I suggested a dynamic solution that would instruct the UI on the placement and presentation of pre-defined marketing content. This solution streamlined a library of over 50 modules into a single, versatile module with the capability to generate countless layouts based on the team's creative ideas.</p>
    </div>
  </div>

  <div class="row section">
    <h3>Features</h3>
    <div class="col-xs-12">

      <div class="row section">
        <h4>Lockups</h4>
        <div class="col-md-5">
          <p>At the heart of the "Master Module" functionality lies the concept of the "lockup." A "lockup" is defined as marketing content incorporating various combinations of copy, media, and CTAs. Each "lockup" is represented by a numbered block within the "Master Module," providing users with a clear visual of the content's position and appearance across different breakpoints.</p>
        </div>
        <div class="col-xs-5 col-md-3">
          <img src="images/block.jpg"/>
        </div>
        <div class="col-xs-7 col-md-4">
          <img src="images/lockup.jpg"/>
        </div>
      </div>
      

      <div class="row section">
        <h4>Grid System</h4>
        <div class="col-md-4">
          <p>Leveraging a custom adaptation of <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a>, the "Master Module" uses a responsive 12 column grid system to place dynamically sized blocks of content into rows. Expanding on the grid system, the "Master Module" also allows blocks to be "pushed" or "pulled" by 50% in order to better center content when needed.</p>
        </div>
        <div class="col-md-8">
          <img src="images/push_pull.jpg"/>
        </div>
      </div>

      <div class="row section">
        <div class="col-md-12">
          <img src="images/module.jpg"/>
        </div>
      </div>
      <div class="row section">
        <div class="col-xs-12">
          <p>To achieve the straightforward layout above, a single block will be generated spanning 3 columns, offset by 7 columns. Within the CMS, the "lockup" in the first position will align with the depicted block.</p>
        </div>
        <div class="col-xs-12">
          <img src="images/template.jpg"/>
        </div>
      </div>
      
      <div class="row section">
        <h4>Headless</h4>
        <div class="col-xs-12">
          <p>Traditional CMS output generates fully-formed HTML, necessitating development efforts in both the CMS and UI. This not only significantly increases the payload but also establishes a dependency between the CMS and the platform. In contrast, the "Master Module" produces an efficient data object, delivering only the essential properties and values required for the UI to display content.</p>
          <p>Open the console to view the live data output from the "Master Module" above!</p>
        </div>
      </div>
      
      <div class="row section">
        <h4>Mobile First</h4>
        <div class="col-xs-12">
          <p>Adhering to the industry standard of "<a href="https://developer.mozilla.org/en-US/docs/Glossary/Mobile_First" target="_blank">mobile first</a>," the "Master Module" collects all the data for the "small" breakpoint, followed by only the modified properties for higher breakpoints which will inherit any properties not explicitly overwritten. Furthermore, this minimizes the payload, enhancing overall efficiency and page speed.</p>
        
          <div class="col-sm-6 col-md-6">
            <img src="images/options.jpg"/>
          </div>
          <div class="col-sm-6 col-md-6 col-lg-3">
            <pre>
sm: {
  anchor: "center",
  animate: "both",
  animation: "none",
  border: "none",
  hidden: "show",
  justify: "center",
  margin: "0 15px",
  offset: 2,
  padding: "0 15px",
  span: 10,
  split: "none"
}
            </pre>
          </div>
          <div class="col-sm-6 col-md-6 col-lg-3">
            <pre>
md: {
  anchor: "tr",
  justify: "left"
}
            </pre>
          </div>
          <div class="col-sm-6 col-md-6 col-md-offset-6 col-lg-3 col-lg-offset-0">
            <pre>
lg: {
  border: "bottom",
  offset: 1,
  span: 11,
  split: "pull"
}
            </pre>
          </div>
        
        </div>
      </div>
      
      <div class="row section">
        <h4>Live Preview</h4>
        <div class="col-sm-8">
          <p>The "Master Module" offers a straightforward yet effective preview of "lockup" settings. The square within the block denotes content placement, while lines represent copy attributes. Similarly, animation settings can be displayed using these elements.</p>
        </div>
        <div class="col-sm-4">
          <img src="images/justify.jpg"/>
          <div class="caption">Justification</div>
        </div>
        <div class="col-xs-12">
          <img src="images/anchor.jpg"/>
          <div class="caption">Anchoring</div>
        </div>
      </div>
      
      <div class="row section">
        <div class="col-sm-4">
          <p>Similarly, animation settings can be displayed using these same elements.</p>
        </div>
        <div class="col-sm-8">
          <img src="images/animation_2.gif"/>
          <div class="caption">Animation</div>
        </div>
      </div>

      <div class="row section">
        <h4>Templates</h4>
        <div class="col-xs-12">
          <p>The "Master Module" enables users to save their layouts using the CMS tool. When opened, it utilizes the CMS API to load all saved template entries. With no limitations on the number of templates, a naming convention was established to facilitate automatic filtering, aiding users in quickly locating their layouts.</p>
        </div>
      </div>

    </div>
  </div>
  <div class="row section">
    <h3>Code Samples</h3>
    <div class="col-xs-12">
        
      <div class="row section">
          <h4>Loading Templates</h4>
          <div class="col-xs-12">
            <pre>
function getTemplates(){
  var env = extensionField.stack._data.name || 'PROD';
  var xhr = new XMLHttpRequest();

  xhr.open('GET', extensionField.config.baseURL+'v3/content_types/'+extensionField.config.contentType+'/entries?environment='+extensionField.config.templateEnv, true);
  xhr.setRequestHeader("api_key", extensionField.config[env].apiKey);
  xhr.setRequestHeader("access_token", extensionField.config[env].deliveryToken);
  xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE) {
      var status = xhr.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        if(this.response){
          createTemplates(JSON.parse(this.response).entries);
        }else{
          return false;
        }
      } else {
        return false;
      }
    }
  };
  xhr.send();
}
            </pre>
          </div>
        </div>

        <div class="row section">
          <h4>Create Filter</h4>
          <div class="col-xs-12">
            <pre>
for (var i = 0; i < templates.length; i++) {
  template = templates[i];
  title = template.title || '';
  result = title.match(/([^\-]+)\s-\s(.+)/);

  if (result && result.length === 3) {
    title = result[2] || '';
    category = result[1].replace(/\s/g, '-') || '';

    if (categories.indexOf(category) < 0) {
      categories.push(category);
    }
  } else {
    category = '';
  }

  html += '&lt;option class="cat-' + category + '" value="' + i + '">' + title + '&lt;/option&gt;';
}

html += '&lt;/select&gt;&lt;/div&gt;';

if (categories.length &gt; 0) {
  filterHtml = '&lt;div class="w-45" style="display:inline-block;"&gt;&lt;label for="filters" style="display:block"&gt;Filter&lt;/label&gt;&lt;select id="filters" class="cs-text-box w-100" style="text-transform: capitalize;" name="filters" onchange="filterTemplates(this)"&gt;&lt;option value=""&gt;All&lt;/option&gt;';

  for (var x = 0; x &lt; categories.length; x++) {
    filterHtml += '&lt;option value="' + categories[x] + '"&gt;' + categories[x].replace(/\-/g, ' ') + '&lt;/option&gt;';
  }

  filterHtml += '&lt;/select&gt;&lt;/div&gt;';
}
            </pre>
          </div>
        </div>

        <div class="row section">
          <h4>Options Validation</h4>
          <div class="col-xs-12">
            <pre>
function testTotalColsBlock(size){
  var ind = data.loops.breakpoints.indexOf(size);
  var offset = data.options[size].offset || data.options[data.loops.breakpoints[ind - 1] || size].offset || data.options[data.loops.breakpoints[ind - 2] || size].offset || 0;
  var span = data.options[size].span || data.options[data.loops.breakpoints[ind - 1] || size].span || data.options[data.loops.breakpoints[ind - 2] || size].span || 1;

  return (offset + span) <= 12 ? true : false;
}

function testAnimOpts(size){
  var animation = data.options[size].animation || false;
  var animate = data.options[size].animate || false;

  return (!animation || !animate) && !(!animation && !animate) && animation !== 'none' ? false : true;
}

function testHiddenBreakpoints(){
  var valid = false;

  for (var i = 0; i < data.loops.breakpoints.length; i++) {
    if(data.options[data.loops.breakpoints[i]].hidden === 'show'){
      valid = true;
    }
  }

  return valid;
}
            </pre>
          </div>
        </div>

        <div class="row section">
          <h4>Creating the Data Object</h4>
          <div class="col-xs-12">
            <pre>
for (var i = 0; i < data.loops.areas.length; i++) {
  area = data.loops.areas[i];
  data.output.layout[area] = [];
  rows = [];
  rowElems = $('#'+(area !== 'content' ? 'row_'+area+'.row' : area+' .row'));

  for (var x = 0; x < rowElems.length; x++) {
    blocks = [];              
    blockElems = $(rowElems[x]).find('.block');

    for (var y = 0; y < blockElems.length; y++) {
      blockObj = {};
      optsObj = {};

      row_id = $(rowElems[x]).attr('id');
      block_id = $(blockElems[y]).attr('id');

      blockObj = data[area][row_id].blocks[block_id];
      blockObj.seq = iter;
      $(blockObj.elem).find('.num').text(iter++);

      for (var z = 0; z < data.loops.breakpoints.length; z++) {
        breakpoint = data.loops.breakpoints[z];
        optsObj[breakpoint] = {};

        for (var j = 0; j < data.loops.options.length; j++) {
          option = data.loops.options[j];
          val = blockObj.options[breakpoint][option];

          if(val !== ''){
            optsObj[breakpoint][option] = val;
          }
        }
      }
      blocks.push(optsObj);
    }
    rows.push(blocks);
  }
  data.output.layout[area] = rows;
}
            </pre>
          </div>
        </div>

      </div>
    </div>

  </div>
</div>

<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/foot.php"); ?>