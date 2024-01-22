<?php
  $title = "Personalization";
  $path = "/projects/personalization/";
  include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php");
?>

<h1>Personalization Framework<a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/personalization" target="_blank"><img src="/images/logos/github.png"/></a></h1>
<div class="section">
  <div class="project">
    <img src="/images/thumbs/just_for_you_lg.jpg"/>
  </div>
  
</div>

<h2>More Info...</h2>
<p style="text-align: right;"><a class="code-link" href="https://github.com/hallmanm/portfolio/tree/main/projects/personalization" target="_blank"><img src="/images/logos/github.png"/></a></p>

<div class="section">

  <div class="section">
    <h3>Purpose</h3>
    <p>The Personalization Framework was designed to efficiently deliver recommendation widgets across the site with flexibility and speed.</p>
  </div>

  <div class="section">
    <h3>Background</h3>
    <p>As the Personalization program gained momentum, the frequency of requests for new and diverse recommendation widgets increased. The initial challenge was to efficiently deliver these widgets which were being treated as a standalone feature injected through the experimentation tool, which resulted in unnecessary bloat. To address this, I developed a framework to power the individual widgets.</p>
    <p>Subsequently, the focus shifted to creating a dynamic output from a product feed. Using Velocity and Adobe Target Designs, I developed a dynamic engine capable of parsing Adobe or GCP feeds and generating product outputs. Additionally, the design team sought flexibility in visual treatment. By utilizing data to guide the templating engine, business users gained a broad range of options to adjust the visual aspects of each recommendation.</p>
  </div>

  <div class="section">
    <h3>Technical Details</h3>
    <h4>Adobe Target Design | Velocity Template</h4>
    <pre>
#set($iter = 0)
  #foreach($e in $entities)
    #if($e.id != "" && $e.thumbnailUrl != "" && $foreach.count < $entities.size() && $iter < $limit)
      #set($iter = $iter + 1)
      #set($id = $e.id)
      #set($url = "${e.PageURL}&${tracking}_${e.gender}_${id}")
      #set($url = $url.replaceAll("https://www.ae.com",""))
      #set($name = $e.name.replaceAll("%20"," ").replaceAll("%24","\\\$").replaceAll("%25","%").replaceAll("%21","!").replaceAll("%26","&").replaceAll("_"," "))
      #set($thumb = $e.thumbnailUrl.replaceAll('qv-450','cat-main_large'))
      #set($value = $e.value)
      #set($sale = $e.Onsale)

      &lt;div class="awo-rec-section"&gt;
        &lt;a href="$url" class="awo-rec-product"&gt;
          &lt;img src="$thumb" alt="$name"/&gt;
        &lt;/a&gt;
        &lt;div class="awo-rec-info"&gt;
          &lt;span class="awo-rec-qv qv-btn-wrapper"&gt;
            &lt;button type="button" onclick="$(document).trigger('show.quickview',{productId:'${id}'});" class="quickview-product quickview-product-btn hidden-xs hidden-sm"&gt;
              &lt;span class="hidden"&gt;Launch product quickview&lt;/span&gt;
              &lt;span class="aeoicon aeoicon-add"&gt;&lt;/span&gt;
            &lt;/button&gt;
          &lt;/span&gt;
          &lt;a href="$url" class="awo-rec-equity #if($sale != $value) awo-rec-on-sale #end" data-id="$id"&gt;
            &lt;div class="awo-rec-name"&gt;$name&lt;/div&gt;
            &lt;span class="awo-rec-price"&gt;$$value&lt;/span&gt;&lt;span class="awo-rec-sale-price"&gt;$$sale&lt;/span&gt;
          &lt;/a&gt;
        &lt;/div&gt;
      &lt;/div&gt;

    #end
  #end
    </pre>
    <h4>GCP Powered Recommendation</h4>
    <pre>
awo.at.widgets.xts = {
  "globalSettings":{
    "url":"https://us-east1-aeo-data-engineering-test.cloudfunctions.net/reco-v1"
  },
  "MoreLooksToLove": {
    "settings": {
      "params": {
        "prodId":"${mbox.entity.id}",
        "catId":"${mbox.entity.categoryId}"
      },
      "elemid": "awo_ml2l",
      "tag": "mltl_pdp",
      "loc": "#awo_more_looks_to_love",
      "placement": "insertBefore",
      "layout": "carousel",
      "limit":"16",
      "partial":"",
      "view": 4,
      "constrained": "true",
      "arrows": "out",
      "border": "",
      "header": "center",
      "title":"More Looks To Love",
      "copy": "", 
      "gender": "",
      "type": "more-looks-to-love",
      "preset": "_of"
    }
  }
}
    </pre>
    <h4>Including BazaarVoice Recommendations</h4>
    <pre>
function fetchRatings(products,settings){ 
awo.debug('Fetch Product Ratings','violet');
  var prodIds = '';

  for(var i=0; i < products.length; i++){
    var product = products[i].product;
    prodIds += product.id + (i !== products.length - 1 ? ',' : '');
  }

  $.getJSON('https://api.bazaarvoice.com/data/products.json?apiversion=5.4&passkey=__&filter=id:'+ prodIds +'&Filter_Reviews=IsRatingsOnly:eq:false&Sort_reviews=Rating:desc&limit_reviews=1&include=reviews&stats=Reviews&callback=?', function(json){
    addAttributes(products,settings,json);
  });
}
    </pre>
  </div>
</div>

<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/includes/foot.php"); ?>