<script>
  (function(){
    try{
  awo.debug('Recs Framework Loading...','green');
      var activity_style = '/*Widget*/'+
          '.awo-rec-widget,.awo-rec-border.awo-rec-arrows-out.awo-rec-widget{ display:block; position:relative; clear:both; width:100%; max-width:1376px; margin:0 auto; padding:50px 15px; text-transform:uppercase; text-align:center; letter-spacing:0; }'+
          '.container-fluid .awo-rec-widget{ padding-left:0; padding-right:0; }'+
          '@media (min-width:768px){'+
            '.awo-rec-widget.awo-rec-constrained{ width:83.33%!important; max-width:1346px!important; padding-left:0!important; padding-right:0!important; }'+
          '}'+
          '.awo-rec-widget a,.awo-rec-widget a:hover,.awo-rec-widget a:active,.awo-rec-widget a:focus{ outline:0!important; }'+
          '.awo-rec-widget img{ width:100%; }'+
          '.awo-rec-content{ position:relative; }'+
          '.awo-vShim{ display:inline-block; width:0; height:100%; vertical-align:middle; }'+
        '/*Header*/'+
          '.awo-rec-header{ z-index:1; width:100%; margin:0 auto 18px auto; padding-bottom:8px; font-size:13px; text-transform:uppercase; font-family:\'Avenir Next Demi\'; letter-spacing:0.5px; }'+
          '.awo-rec-header-left .awo-rec-header,.awo-rec-header-left-underline .awo-rec-header{ text-align:left; }'+
          '.awo-rec-header-center .awo-rec-header,.awo-rec-header-center-underline .awo-rec-header{ text-align:center; }'+
          '.awo-rec-header-right .awo-rec-header,.awo-rec-header-right-underline .awo-rec-header{ text-align:right; }'+
          '.awo-rec-header-left-underline .awo-rec-header,.awo-rec-header-center-underline .awo-rec-header,.awo-rec-header-right-underline .awo-rec-header{ margin-bottom:17px; border-bottom:1px solid #e5e5e5; }'+
          '.awo-rec-red{ color:#dd002e; }'+
          '.awo-rec-banner{ position:relative; top:20px; margin:0 -2%; }'+
          '.awo-rec-banner .awo-rec-header-vert{ position:absolute; left:0; top:0; width:100%; height:100%; padding:0 4%; }'+
          '.awo-rec-banner .awo-rec-header-vert .awo-rec-header{ display:inline-block; width:98%; margin:0 auto; vertical-align:middle; }'+
          '@media (min-width:768px){'+
            '.awo-rec-banner .awo-rec-header-vert .awo-vShim{ height:98%; }'+
          '}'+
          '@media (max-width:767px){'+
            '.awo-rec-header span{ display:block; margin-top:2px; }'+
            '.awo-rec-banner{ top:0; margin:0 0 2% 0; }'+
          '}'+
        '/*Scrolling*/'+
          '.awo-rec-scroll.awo-rec-hide-scroll{ overflow:hidden; }'+
          '.awo-rec-scroll{ white-space:nowrap; overflow-y:hidden; overflow-x:scroll; -webkit-overflow-scrolling:touch; transition:padding-bottom 0.5s; }'+
          '.awo-rec-scroll.custom-scrollbars{ padding-bottom:20px; }'+
        '/*Arrows*/'+
          '.awo-rec-hide-arrows .awo-rec-arrow{ display:none; }'+
          '.awo-rec-arrow{ z-index:1; position:absolute; top:32%; width:26px; text-align:center; font-size:16px; cursor:pointer; -webkit-transition:top 0.3s; transition:top 0.3s; }'+
          '.awo-rec-left{ left:-26px; padding:16px 2px 14px 0; }'+
          '.awo-rec-right{ right:-26px; padding:16px 0 14px 2px; }'+
          '.awo-rec-arrows-in .awo-rec-left{ left:0; }'+
          '.awo-rec-arrows-in .awo-rec-right{ right:0; }'+
          '.awo-rec-arrows-in .awo-rec-arrow{ background-color:#fff; background-color:rgba(255,255,255,0.6); }'+
          '.awo-rec-arrows-in .awo-rec-arrow:hover{ background-color:#fff; }'+
          '@media (min-width:768px){'+
            '.awo-rec-arrows-out.awo-rec-widget{ max-width:1430px; padding-left:41px; padding-right:41px; }'+
          '}'+
          '@media (max-width:767px){'+
            '.awo-rec-arrow{ display:none!important; }'+
          '}'+
        '/*Border*/'+
          '.awo-rec-border .awo-rec-header{ margin-bottom:18px; border-bottom:none; }'+
          '.awo-rec-border .awo-rec-content{ padding:28px; border:1px solid #cccccc; }'+
          '.awo-rec-border.awo-rec-arrows-in .awo-rec-left{ left:28px; }'+
          '.awo-rec-border.awo-rec-arrows-in .awo-rec-right{ right:28px; }'+
          '.awo-rec-border.awo-rec-arrows-out .awo-rec-left{ left:0; }'+
          '.awo-rec-border.awo-rec-arrows-out .awo-rec-right{ right:0; }'+
        '/*Sections*/'+
          '.awo-rec-sections{ font-size:0; }'+
          '.awo-rec-widget .awo-rec-sections .awo-rec-section{ display:inline-block; position:relative; vertical-align:top; white-space:normal; margin:0 1%; overflow:hidden; }'+
        '/***LAYOUT***/'+
          '.awo-rec-sections .awo-rec-sections{ float:none; }'+
          '.awo-rec-section{ position:relative; width:14.66%; }'+
        '/*Grid*/'+
          '.awo-rec-grid .awo-rec-sections{ margin:0 -1%; }'+
          '.awo-rec-grid.awo-rec-6-across .awo-rec-sections .awo-rec-section{ width:14.66%; }'+
          '.awo-rec-grid.awo-rec-5-across .awo-rec-sections .awo-rec-section{ width:18%; }'+
          '.awo-rec-grid.awo-rec-4-across .awo-rec-sections .awo-rec-section{ width:23%; }'+
          '.awo-rec-grid.awo-rec-3-across .awo-rec-sections .awo-rec-section{ width:31.33%; }'+
          '.awo-rec-grid.awo-rec-2-across .awo-rec-sections .awo-rec-section{ width:48%; }'+
        ''+
          '@media (max-width:1023px){'+
            '.awo-rec-grid.awo-rec-6-across .awo-rec-sections .awo-rec-section{ width:23%; }'+
            '.awo-rec-grid.awo-rec-5-across .awo-rec-sections .awo-rec-section{ width:31.33%; }'+
          '}'+
          '@media (max-width:767px){'+
            '.awo-rec-grid .awo-rec-sections .awo-rec-section{ width:48%!important; }'+
          '}'+
        '/*Bundle*/'+
          '.awo-rec-bundle.awo-rec-3-across .awo-rec-sections .awo-rec-section{ width:23%; }'+
          '.awo-rec-bundle.awo-rec-2-across .awo-rec-sections .awo-rec-section{ width:31.33%; }'+
          '@media (max-width:1023px){'+
            '.awo-rec-bundle.awo-rec-6-across .awo-rec-sections .awo-rec-section{ width:31.33%!important; }'+
          '}'+
          '@media (max-width:767px){'+
            '.awo-rec-bundle.awo-rec-3-across .awo-rec-sections .awo-rec-section,.awo-rec-vignette.awo-rec-3-across .awo-rec-sections .awo-rec-section{ width:31.33%!important; }'+
          '}'+
        ''+
        '/*Carousel*/'+
          '.awo-rec-carousel{ text-align:left; }'+
          '.awo-rec-carousel .awo-rec-section:first-child{ margin-left:0; }'+
          '.awo-rec-carousel .awo-rec-section:last-child{ margin-right:0; }'+
          '.awo-rec-carousel.awo-rec-6-across .awo-rec-sections .awo-rec-section{ width:15%; }'+
          '.awo-rec-carousel.awo-rec-5-across .awo-rec-sections .awo-rec-section{ width:18.4%; }'+
          '.awo-rec-carousel.awo-rec-4-across .awo-rec-sections .awo-rec-section{ width:23.5%; }'+
          '.awo-rec-carousel.awo-rec-3-across .awo-rec-sections .awo-rec-section{ width:32%; }'+
          '.awo-rec-carousel.awo-rec-2-across .awo-rec-sections .awo-rec-section{ width:49%; }'+
        ''+
          '@media (max-width:1023px){'+
            '.awo-rec-carousel.awo-rec-6-across .awo-rec-sections .awo-rec-section{ width:23.5%; }'+
            '.awo-rec-carousel.awo-rec-5-across .awo-rec-sections .awo-rec-section{ width:32%; }'+
          '}'+
          '@media (max-width:767px){'+
            '.awo-rec-carousel .awo-rec-sections .awo-rec-section{ width:45%!important; }'+
          '}'+
        ''+
        '/*Lead*/'+
          '.awo-rec-lead.awo-rec-6-across .awo-rec-sections .awo-rec-section:first-child{ width:29.6%; }'+
          '.awo-rec-lead.awo-rec-6-across .awo-rec-sections .awo-rec-section{ width:15.6%; }'+
          '.awo-rec-lead.awo-rec-5-across .awo-rec-sections .awo-rec-section:first-child{ width:36.5%; }'+
          '.awo-rec-lead.awo-rec-5-across .awo-rec-sections .awo-rec-section{ width:19.2%; }'+
          '.awo-rec-lead.awo-rec-4-across .awo-rec-sections .awo-rec-section:first-child{ width:46.9%; }'+
          '.awo-rec-lead.awo-rec-4-across .awo-rec-sections .awo-rec-section{ width:24.6%; }'+
          '.awo-rec-lead.awo-rec-3-across .awo-rec-sections .awo-rec-section:first-child{ width:64.3%; }'+
          '.awo-rec-lead.awo-rec-3-across .awo-rec-sections .awo-rec-section{ width:33.7%; }'+
          '.awo-rec-lead.awo-rec-2-across .awo-rec-sections .awo-rec-section:first-child{ width:100%; }'+
          '.awo-rec-lead.awo-rec-2-across .awo-rec-sections .awo-rec-section{ width:50%; }'+
        ''+
          '@media (max-width:1023px){'+
            '.awo-rec-lead.awo-rec-6-across .awo-rec-sections .awo-rec-section:first-child{ width:46.9%; }'+
            '.awo-rec-lead.awo-rec-6-across .awo-rec-sections .awo-rec-section{ width:24.6%; }'+
            '.awo-rec-lead.awo-rec-5-across .awo-rec-sections .awo-rec-section:first-child{ width:64.3%; }'+
            '.awo-rec-lead.awo-rec-5-across .awo-rec-sections .awo-rec-section{ width:33.7%; }'+
          '}'+
          '@media (max-width:767px){'+
            '.awo-rec-lead .awo-rec-section:nth-child(2){ margin-left:0; }'+
            '.awo-rec-lead .awo-rec-sections .awo-rec-section{ width:30%!important; }'+
          '}'+
        '/*Follow*/'+
          '.awo-rec-follow .awo-rec-section{ margin-left:0; margin-right:0; }'+
          '@media (min-width:1024px){'+
            '.awo-rec-follow.awo-rec-6-across .awo-rec-scroll{ width:77%; }'+
            '.awo-rec-follow.awo-rec-6-across .awo-rec-section{ width:22%; }'+
            '.awo-rec-follow.awo-rec-5-across .awo-rec-scroll{ width:73%; }'+
            '.awo-rec-follow.awo-rec-5-across .awo-rec-section{ width:25.6%; }'+
            '.awo-rec-follow.awo-rec-4-across .awo-rec-scroll{ width:68%; }'+
            '.awo-rec-follow.awo-rec-4-across .awo-rec-section{ width:30.5%; }'+
            '.awo-rec-follow.awo-rec-3-across .awo-rec-scroll{ width:61.5%; }'+
            '.awo-rec-follow.awo-rec-3-across .awo-rec-section{ width:37.5%; }'+
          '}'+
          '@media (max-width:1023px){'+
            '.awo-rec-follow.awo-rec-6-across .awo-rec-scroll,.awo-rec-follow.awo-rec-5-across .awo-rec-scroll{ width:61.5%; }'+
            '.awo-rec-follow.awo-rec-6-across .awo-rec-section,.awo-rec-follow.awo-rec-5-across .awo-rec-section{ width:37.5%; }'+
            '.awo-rec-follow.awo-rec-6-across .awo-rec-sections .awo-rec-section,.awo-rec-follow.awo-rec-5-across .awo-rec-sections .awo-rec-section{ width:32%; }'+
            '.awo-rec-follow.awo-rec-4-across .awo-rec-scroll,.awo-rec-follow.awo-rec-3-across .awo-rec-scroll{ width:51%; }'+
            '.awo-rec-follow.awo-rec-4-across .awo-rec-section,.awo-rec-follow.awo-rec-3-across .awo-rec-section{ width:47.5%; }'+
            '.awo-rec-follow.awo-rec-4-across .awo-rec-sections .awo-rec-section,.awo-rec-follow.awo-rec-3-across .awo-rec-sections .awo-rec-section{ width:49%; }'+
          '}'+
          '@media (min-width:768px){'+
            '.awo-rec-follow .awo-rec-section{ float:right; }'+
            '.awo-rec-follow.awo-rec-2-across .awo-rec-section{ width:47.9%; }'+
            '.awo-rec-follow.awo-rec-2-across .awo-rec-scroll{ width:51.3%; }'+
          '}'+
          '@media (max-width:767px){'+
            '.awo-rec-follow.awo-rec-widget .awo-rec-scroll,.awo-rec-follow.awo-rec-widget .awo-rec-section{ width:100%; }'+
            '.awo-rec-follow .awo-rec-section{ margin-bottom:2%; }'+
          '}'+
        '/*Promotions*/'+
          '@media (max-width:767px){'+
            '.awo-rec-promotions .awo-rec-sections .awo-rec-section{ width:45%!important; }'+
          '}'+
          '@media (max-width:479px){'+
            '.awo-rec-promotions .awo-rec-sections .awo-rec-section{ width:90%!important; }'+
          '}'+
        '/***Styling***/'+
        '/*Equity*/'+
          '.awo-rec-widget,.awo-rec-widget a{ color:#000; }'+
          '.awo-rec-widget a,.awo-rec-widget a:hover{ display:block; cursor:pointer; text-decoration:none; }'+
          '.awo-rec-hide{ display:none!important; }'+
          '.awo-rec-clear{ clear:both; }'+
          '.awo-rec-float-left{ float:left; }'+
          '.awo-rec-float-right{ float:right; }'+
          '.awo-rec-cta-btn{ height:50px; padding:0 10px!important; line-height:14px; font-size:12px; white-space:pre-wrap; }'+
          '.awo-rec-bottom-btn{ margin-top:20px!important; }'+
          '.awo-rec-widget a.awo-rec-cta-btn,.awo-rec-widget a.awo-rec-cta-btn:hover{ display:inline-block; line-height:47px; }'+
          '.awo-rec-cta-btn-thin{ height:30px; line-height:12px; }'+
          '.awo-rec-widget a.awo-rec-cta-btn-thin,.awo-rec-widget a.awo-rec-cta-btn-thin:hover{ line-height:28px; }'+
          '.awo-rec-info{ position:relative; font-size:10px; line-height:12px; letter-spacing:0.5px; text-align:center; }'+
          '.awo-rec-no-info .awo-rec-info,.awo-rec-no-equity .awo-rec-equity,.awo-rec-no-name .awo-rec-name,.awo-rec-no-price .awo-rec-price,.awo-rec-no-price .awo-rec-sale-price,.awo-rec-no-qv .awo-rec-qv,.cms-main .awo-rec-qv{ display:none!important; }'+
        ''+
          '.awo-rec-name{ font-size:11px; padding-top:11px; }'+
          '.awo-rec-price,.awo-rec-sale-price{ position:relative; display:inline-block; margin:2px 2px 0; font-size:12px; }'+
          '.awo-rec-no-name .awo-rec-price,.awo-rec-no-name .awo-rec-sale-price{ margin-top:10px; }'+
          '.awo-rec-sale-price{ display:none; color:#f00; }'+
          '.awo-rec-on-sale{ position:relative; }'+
          '.awo-rec-on-sale .awo-rec-price:after{ content:\'\'; display:block; position:absolute; top:7px; width:100%; height:1px; background-color:#000;}'+
          '.awo-rec-on-sale .awo-rec-sale-price{ display:inline-block; }'+
        '/*Quickview*/'+
          '.awo-rec-qv{ }'+
          '.awo-rec-qv .quickview-product-btn:before{ width:2px; margin:6px auto; }'+
          '.awo-rec-qv .quickview-product-btn:after{ margin:auto 6px; height:2px; }'+
          '.awo-rec-qv .quickview-product-btn:before, .awo-rec-qv .quickview-product-btn:after { position:absolute; top:0; left:0; right:0; bottom:0; background:#000; content:\'\'; }'+
          '.awo-rec-qv .quickview-product-btn {display: inline-block; vertical-align:middle; background:#fff; -webkit-border-radius:100%; -moz-border-radius:100%; border-radius:100%; -khtml-opacity:.7; -moz-opacity:.7; opacity:.7; -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)"; filter:alpha(opacity=70); width:24px; height:24px; position:absolute; top:-34px; right:11px; -o-transition:transform .5s ease-in-out; -webkit-transition:transform .5s ease-in-out; transition:transform .5s ease-in-out; border:none; }'+
          '.awo-rec-qv .quickview-product-btn:hover { transform:rotate(90deg); }'+
        ''+
        '/*Show More Btn*/'+
          '.awo-rec-show-more-btn{ float:none; width:25%; margin:10px auto; }'+
        ''+
          '@media (max-width:767px){'+
            '.awo-rec-show-more-btn{ width:80%; margin-top:20px; }'+
          '}'+
        '/*Grid*/'+
          '.awo-rec-sections .awo-rec-section{ float:none; }'+
          '.awo-rec-grid .awo-rec-section{ padding-bottom:4%; }'+
          '.awo-rec-grid.awo-rec-no-info .awo-rec-section,'+
          '.awo-rec-grid.awo-rec-no-equity .awo-rec-section{ padding-bottom:2%; }'+
        '/*Partial*/'+
          '.awo-rec-partial{ padding-bottom:23px; }'+
          '.awo-rec-partial.awo-rec-6-across .awo-rec-sections .awo-rec-section:nth-child(n+13),'+
          '.awo-rec-partial.awo-rec-5-across .awo-rec-sections .awo-rec-section:nth-child(n+11),'+
          '.awo-rec-partial.awo-rec-4-across .awo-rec-sections .awo-rec-section:nth-child(n+9),'+
          '.awo-rec-partial.awo-rec-3-across .awo-rec-sections .awo-rec-section:nth-child(n+7),'+
          '.awo-rec-partial.awo-rec-2-across .awo-rec-sections .awo-rec-section:nth-child(n+5){ display:none; }'+
          '@media (max-width:1023px){'+
            '.awo-rec-partial.awo-rec-6-across .awo-rec-sections .awo-rec-section:nth-child(n+9),'+
            '.awo-rec-partial.awo-rec-5-across .awo-rec-sections .awo-rec-section:nth-child(n+7){ display:none; }'+
          '}'+
          '@media (max-width:767px){'+
            '.awo-rec-partial .awo-rec-sections .awo-rec-section:nth-child(n+5){ display:none!important; }'+
          '}'+
        '/*Rated*/'+
          '.product-list .awo-rec-widget{ padding-top:0; padding-left:10px; padding-right:10px; }'+
          '.product-list .awo-rec-header{ margin-bottom:10px; font-size:15px; }'+
          '.awo-rec-partial.awo-rec-rated.awo-rec-6-across .awo-rec-sections .awo-rec-section:nth-child(n+7),'+
          '.awo-rec-partial.awo-rec-rated.awo-rec-5-across .awo-rec-sections .awo-rec-section:nth-child(n+6),'+
          '.awo-rec-partial.awo-rec-rated.awo-rec-4-across .awo-rec-sections .awo-rec-section:nth-child(n+5),'+
          '.awo-rec-partial.awo-rec-rated.awo-rec-3-across .awo-rec-sections .awo-rec-section:nth-child(n+4),'+
          '.awo-rec-partial.awo-rec-rated.awo-rec-2-across .awo-rec-sections .awo-rec-section:nth-child(n+3){ display:none; }'+
          '@media (max-width:1023px){'+
            '.awo-rec-partial.awo-rec-rated.awo-rec-6-across .awo-rec-sections .awo-rec-section:nth-child(n+5),'+
            '.awo-rec-partial.awo-rec-rated.awo-rec-5-across .awo-rec-sections .awo-rec-section:nth-child(n+4){ display:none; }'+
          '}'+
          '@media (max-width:767px){'+
            '.awo-rec-partial.awo-rec-rated .awo-rec-sections .awo-rec-section:nth-child(n+3){ display:none!important; }'+
          '}'+
          '.awo-rec-widget .awo-rec-total,.awo-rec-review-modal-total .awo-rec-total{ font-size:10px; margin-top:11px; text-transform:capitalize; text-decoration:underline; }'+
          '.awo-rec-no-rating .awo-rec-rating,.awo-rec-no-total .awo-rec-total,.awo-rec-no-review .awo-rec-review{ display:none!important; }'+
          '.awo-rec-total:hover,.awo-rec-review-modal-total .awo-rec-total:hover{ text-decoration:none; }'+
          '.awo-rec-rating{ position:relative; width:96px; height:15px; margin:8px auto 3px; }'+
          '.awo-rec-rating-slider-black,.awo-rec-rating-slider-grey{ display:inline-block; height:100%; font-size:0; }'+
          '.awo-rec-rating-slider-black{ background-color:#000; }'+
          '.awo-rec-rating-slider-grey{ background-color:#cdcdcd; }'+
          '.awo-rec-stars{ position:absolute; left:0; top:0; height:100%; box-shadow:0px -2px #fff, 0px 2px #fff, -2px 0px #fff, 2px 0px #fff; }'+
          '.awo-rec-review-copy{ position:relative; margin-top:11px; margin-bottom:0; font-size:11px; line-height:15px; text-transform:none; }'+
          '.awo-rec-show-full-review{ font-size:10px; text-decoration:underline; white-space:nowrap; text-transform:none; cursor:pointer; }'+
          '.awo-rec-full-review-modal img{ width:100%; }'+
          '.awo-rec-review-modal-img{ float:left; padding-right:2%; } '+
          '.awo-rec-review-modal-img, .awo-rec-review-modal-name, .awo-rec-review-modal-total, .awo-rec-review-modal-rating, .awo-rec-review-modal-copy{ width:48%; }'+
          '.awo-rec-review-modal-name, .awo-rec-review-modal-total, .awo-rec-review-modal-rating, .awo-rec-review-modal-copy{ padding-left:2%; }'+
          '.awo-rec-review-modal-name{ margin-top:28px; font-size:11px; text-transform:uppercase; }'+
          '.awo-rec-review-modal-rating{ margin-top:8px; }'+
          '.awo-rec-review-modal-total{ margin-top:8px; }'+
          '.awo-rec-review-modal-copy{ margin-top:29px; font-size:11px; letter-spacing:0.5px; line-height:15px; }'+
          '.awo-rec-review-modal-btn{ width:208px; margin-top:24px; }'+
          '.awo-rec-review-modal-btn.awo-rec-cta-btn-thin{ line-height:28px; }'+
          '@media (min-width:768px){'+
            '.product-list .awo-rec-widget{ display:inline-block; width:75%; }'+
            '.awo-rec-full-review-modal .awo-rec-clear{ clear:none; }'+
            '.awo-rec-full-review-modal .modal-body{ text-align:center; }'+
          '}'+
          '@media (max-width:767px){'+
            '.awo-rec-rated.awo-rec-grid .awo-rec-sections .awo-rec-section{ width:100%!important; margin:0 -1%; }'+
            '.awo-rec-rated.awo-rec-grid .awo-rec-section .awo-rec-product,'+
            '.awo-rec-rated.awo-rec-grid .awo-rec-section .awo-rec-info{ display:inline-block; width:48%; vertical-align:middle; }'+
            '.awo-rec-rated.awo-rec-grid .awo-rec-section .awo-rec-info{ padding:2%; margin-left:2%; text-align:left; }'+
            '.awo-rec-rated.awo-rec-grid .awo-rec-section .awo-rec-rating{ margin-left:0; }'+
            '.awo-rec-full-review-modal .awo-rec-review-modal-name{ font-size:11px; }'+
            '.awo-rec-full-review-modal .awo-rec-clear{ text-align:center; }'+
            '.awo-rec-full-review-modal .awo-rec-rating{ margin-left:-2px; }'+
            '.awo-rec-full-review-modal .awo-rec-review-modal-copy{ width:100%; padding:0; text-align:left; }'+
            '.awo-rec-full-review-modal .awo-rec-review-modal-btn{ width:100%; }'+
          '}'+
        '/*Bundle*/'+
          '.awo-rec-bundle .awo-rec-sections .awo-rec-section,'+
          '.awo-rec-vignette .awo-rec-sections .awo-rec-section{ vertical-align:middle; }'+
          '.awo-rec-bundle .awo-rec-section:nth-child(1) a{ cursor:default; }'+
          '.awo-rec-bundle .awo-rec-section:nth-child(1) .awo-rec-qv{ display:none; }'+
          '@media (min-width:1024px){'+
            '.awo-rec-bundle.awo-rec-5-across .awo-rec-bundle-btn{ width:100%!important; max-width:228px; }'+
          '}'+
          '@media (min-width:768px){'+
            '.awo-rec-bundle.awo-rec-3-across .awo-rec-sections .awo-rec-section,'+
            '.awo-rec-bundle.awo-rec-2-across .awo-rec-sections .awo-rec-section{ padding-bottom:0; }'+
            '.awo-rec-bundle.awo-rec-6-across .awo-rec-bundle-btn,'+
            '.awo-rec-bundle.awo-rec-4-across .awo-rec-bundle-btn{ width:100%!important; max-width:228px; }'+
          '}'+
          '@media (max-width:767px){'+
            '.awo-rec-bundle.awo-rec-widget.awo-rec-6-across .awo-rec-bundle-btn,'+
            '.awo-rec-bundle.awo-rec-widget.awo-rec-4-across .awo-rec-bundle-btn,'+
            '.awo-rec-bundle.awo-rec-widget.awo-rec-3-across .awo-rec-bundle-btn,'+
            '.awo-rec-bundle.awo-rec-widget.awo-rec-2-across .awo-rec-bundle-btn{ width:98%!important; }'+
          '}'+
        '/*Vignette*/'+
          '.awo-rec-vignette .awo-rec-yt-vid-wrap, .awo-rec-vignette .awo-rec-sections{ display:inline-block; vertical-align:top; }'+
          '.awo-rec-vignette .awo-rec-yt-vid-wrap{ width:49%; margin-right:1%; }'+
          '.awo-rec-vignette .awo-rec-sections{ width:50%; }'+
          '.awo-rec-vignette .awo-rec-yt-vid-wrap { position:relative; height:0; padding-bottom:27%; }'+
          '.awo-rec-yt-vid-wrap .awo-rec-yt-vid { position:absolute; top:0; left:0; width:100%; height:100%; }'+
          '.awo-rec-vignette .awo-rec-section.awo-rec-bundle-btn{ width:100%; max-width:228px; }'+
          '@media (min-width:768px) and (max-width:1023px){'+
            '.awo-rec-vignette .awo-rec-section.awo-rec-bundle-btn{ height:30px; line-height:12px; margin-top:4%; }'+
          '}'+
          '@media (max-width:767px){'+
            '.awo-rec-vignette .awo-rec-yt-vid-wrap{ width:100%; padding-bottom:48%; margin-bottom:4%; margin-right:0; }'+
            '.awo-rec-vignette .awo-rec-sections{ width:102%; }'+
            '.awo-rec-vignette .awo-rec-section.awo-rec-bundle-btn{ width:98%!important; max-width:98%; }'+
          '}'+
        '/*Lead*/'+
          '.awo-rec-lead{ padding-top:20px; padding-bottom:20px; }'+
          '.awo-rec-lead .awo-rec-product-lead{ display:none; position:relative; margin-bottom:2%; }'+
          '.awo-rec-lead-btn, .awo-rec-follow-btn{ position:absolute; top:45%; width:98%; font-size:12px; text-align:center; cursor:pointer; }'+
          '.awo-rec-section-follow{ cursor:pointer; }'+
          '.awo-rec-lead-btn span, .awo-rec-follow-btn span{ display:inline-block; min-width:131px; padding:9px 10px; color:#fff; background-color:rgba(0,0,0,0.4); border:2px solid #fff; font-family:\'Avenir Next Demi\'; }'+
          '.awo-rec-lead .awo-rec-section:first-child:hover .awo-rec-lead-btn span, .awo-rec-product-lead:hover .awo-rec-lead-btn span, .awo-rec-section-follow:hover .awo-rec-follow-btn span{ box-shadow:inset 0 0 0 1px #fff; }'+
          '.awo-rec-lead .awo-rec-section:first-child .awo-rec-info{ display:none!important; }'+
          '@media (max-width:767px){'+
            '.awo-rec-lead .awo-rec-product-lead{ display:block; }'+
            '.awo-rec-lead .awo-rec-section:first-child{ display:none; }'+
          '}'+
        '/*Promotions*/'+
          '.awo-rec-promotions .awo-rec-promo img{ border:1px solid #ccc; }'+
          '.awo-rec-promotions .awo-rec-promo-headline{ padding-top:28px; line-height:20px; font-size:13px; font-family:\'Avenir Next Demi\'; }'+
          '.awo-rec-promotions .awo-rec-promo-main-message{ margin-top:3px; line-height:15px; font-size:10px; text-transform:none; }'+
          '.awo-rec-promotions .awo-rec-promo-action-items{ position:relative; height:30px; margin-top:14px; }'+
          '.awo-rec-promotions .awo-rec-promo-btn, .awo-rec-promotions .awo-rec-promo-cta-wrap{ width:70%; margin:0 15%; }'+
          '.awo-rec-promotions .awo-rec-promo-hide-ctas{ padding-bottom:14px; margin:23px 16px 12px 16px; font-size:13px; color:#888; border-bottom:1px solid #ccc; text-align:left; text-transform:capitalize; font-family:\'Avenir Next Regular\'; }'+
          '.awo-rec-promotions .awo-rec-promo-hide-ctas .aeoicon{ float:right; color:#000; cursor:pointer; }'+
          '.awo-rec-promotions .awo-rec-promo-tray-btn{ position:absolute; left:0; line-height:28px; }'+
          '.awo-rec-promotions .awo-rec-promo-cta-wrap{ position:absolute; overflow:hidden; bottom:29px; max-height:0; background-color:#fff; box-shadow:inset 0 0 0 1px #ccc; transition:max-height 0.5s; }'+
          '.awo-rec-promotions .awo-rec-promo-show-ctas .awo-rec-promo-cta-wrap{ max-height:225px; }'+
          '.awo-rec-promotions .awo-rec-promo-cta-wrap .custom-scrollbars{ max-height:153px; margin:0 11px 10px 0; }'+
          '.awo-rec-promotions .awo-rec-promo-cta-wrap .awo-rec-promo-btn{ position:relative; display:block!important; margin:5px 0 5px 16px; width:90%; width:calc(100% - 32px); height:25px; line-height:24px!important; border:none; box-shadow:none; font-family:\'Avenir Next Regular\'; text-transform:capitalize; }'+
          '.awo-rec-promotions .awo-rec-promo-cta-wrap .awo-rec-promo-btn:hover{ font-family:\'Avenir Next Demi\'; }'+
          '.awo-rec-promotions .awo-rec-promo-cta-wrap .awo-rec-promo-btn:hover{ color:#fff; background-color:#000; }'+
          '.awo-rec-promo-details-wrap span:nth-child(2){ padding-left:5px; margin-left:5px; }'+
          '.awo-rec-promotions .awo-rec-promo-code,'+
          '.awo-rec-promotions .awo-rec-promo-details-trigger,'+
          '.awo-rec-promotions .awo-rec-promo-disclaimer{ font-size:10px; line-height:30px; text-transform:none; text-decoration:underline; cursor:pointer; }'+
          '.awo-rec-promotions .awo-rec-promo-disclaimer,'+
          '.awo-rec-promotions .awo-rec-promo-details-trigger:hover{ text-decoration:none; }'+
          '.awo-rec-promotions .awo-rec-promo-disclaimer{ cursor:inherit; }'+
          '.awo-rec-promotions .awo-rec-promo-code{ text-transform:capitalize; text-decoration:none; cursor:text; }'+
          '.awo-rec-details-modal .modal-body{ font-size:11px; }'+
          '.awo-rec-details-modal .modal-body h4{ font-size:12px; line-height:16px; font-family:\'Avenir Next Demi\'; }'+
          '.awo-rec-details-modal .awo-modal-content{ margin-bottom:35px; }'+
          '@media (max-width:1023px){'+
            '.awo-rec-promotions .awo-rec-promo-btn,'+
            '.awo-rec-promotions .awo-rec-promo-cta-wrap{ width:90%; margin:0 5%; }'+
          '}'+
          '@media (max-width:767px){'+
            '.awo-rec-promotions .awo-rec-promo-btn,'+
            '.awo-rec-promotions .awo-rec-promo-cta-wrap{ width:100%; margin:0; }'+
          '}'+
          '.awo-rec-loader{ opacity:1; position:absolute!important; left:0; top:0; width:100%; height:100%; }'+
          '.modal-open .awo-rec-loader{ opacity:0; -webkit-transition:opacity 1s; transition:opacity 1s; }';
  
      var win = window,
          win_elem,
          productLead,
          productLeadM,
          offsetStart,
          offsetEnd,
          modal_iter = 0,
          modals = {},
          year = new Date().getFullYear(),
          a2b;
  
      var init = function(){
        var atWidgets = Object.keys(awo.at.widgets);
        win_elem = $(win);

        if(atWidgets.length > 0) {
          for(var i=0; i < atWidgets.length; i++){
            productLeadM ='';
            productLead ='';
            showMore = '';
        
            //define outside for loop then set value here.
            var presentWidget = Object.keys(awo.at.widgets)[i];
            var settings = awo.at.widgets[presentWidget].settings;
            var products = awo.at.widgets[presentWidget].products;
            // Note: GCP 0.1
    
            if(settings.loc && settings.placement && settings.layout && settings.view){
              formatWidget(settings,products);
            }
    
            if(settings.type === 'a2b'){
              a2b = true;
            }

          }
        } else {
awo.debug('No active widgets to display','red');          
        }
  
        $('body').addClass("awo-rec-fw-loaded");
      };
  
      awo.updateRec = awo.updateRec || function(rec){
        var settings = awo.widgets[rec].settings;
        var products = awo.widgets[rec].products;
        formatWidget(settings,products);
      };
  
      function formatWidget(settings,products){
        var runCode = true;
  awo.debug('Widget Type: '+settings.type+' (optional)', 'thistle');
        switch(settings.type) {
          case "lead":
            addLead(settings,products[0].product);
            break;
          case "follow":
            addBundleBtn(settings);
            break;
          case "bottom":
            addBundleBtn(settings);
            break;
          case "promotions":
            runCode = false;
            addPromotions(settings);
            break;
          case "rated":
            runCode = false;
            fetchRatings(products,settings);
            break;
          case "bundle":
            // addCarouselLead(settings,products);
            populateCarouselLead(elem,data.type);
            addBundleBtn(elem,data.type,data.view);
            break;
          case "a2b":
          case "pdp":
            // addCarouselLead(settings,products);
            populateCarouselLead(elem);
            break;
          default:
            break;
        }
        if(runCode){
          buildProducts(products, settings, offsetStart, products.length);      
        }
      }
  
      function buildProducts(products, settings, offsetStart, offsetEnd){
  awo.debug('Building Products: '+offsetEnd+' found','thistle');
        var saleStyle = "";
        var salePrice = "";
        var recProducts = "";

        offsetStart = offsetStart == undefined ? 0 : offsetStart;
  
        for(var i=offsetStart; i < offsetEnd; i++){
          var product = products[i].product;

          if(product.sale_price != product.list_price && parseFloat(product.sale_price) > 0){
            saleStyle = 'awo-rec-on-sale';
            salePrice = '<span class="awo-rec-sale-price">$' + product.sale_price + '</span>';
          }

          recProducts += '<div class="awo-rec-section">'+
          '<a data-path="' + product.url + '" class="awo-rec-product msg-link-to" data-route="product-detail">'+
            '<img src="https://s7d2.scene7.com/is/image/aeo/' + product.id + settings.preset + '?$cat-main_large$&defaultImage=' + product.id +'_f" alt="' + product.name + '"/>'+
          '</a>'+
          '<div class="awo-rec-info">'+
            '<span class="awo-rec-qv qv-btn-wrapper">'+
              '<button type="button" onclick="$(this).trigger(\'show.quickview\',{productId:\'' + product.id + '\'});" class="quickview-product quickview-product-btn hidden-xs hidden-sm">'+
                '<span class="hidden">Launch product quickview</span>'+
              '</button>'+
            '</span>'+
            '<a data-path="' + product.url + '" class="awo-rec-equity msg-link-to ' + saleStyle + '" data-id="' + product.id + '" data-route="product-detail">'+
            '<div class="awo-rec-name">' + product.name + '</div>'+
            '<span class="awo-rec-price">$' + product.list_price + '</span>'+
            salePrice+
            '</a>';

            if(product.ratingAvg){
  awo.debug('Adding a rating to the product inside buildProducts','thistle');
              recProducts += addRating(product);
            }
            recProducts += '</div></div>';
        }

        buildContainer(settings,recProducts, offsetEnd); 
      }
  
      function buildContainer(settings, recProducts, offsetEnd){ 
  awo.debug('Gathering data for '+ settings.elemid +'\'s container','thistle');
  
        var recClass = ['awo-rec-widget', 'awo-rec-no-price', 'awo-trans-remove', 'awo-rec-'+settings.layout, 'awo-rec-'+settings.type]; // Check settings layout before just adding it
        var showMore;
        var containerScroll;
        var arrows;
        
        recClass.push('awo-rec-'+setView(settings.view)+'-across');
  
        if(settings.layout === 'carousel'){
          containerScroll = offsetEnd > settings.view ? '<div class="awo-rec-scroll custom-scrollbars">' : '<div class="awo-rec-scroll">';

          if(settings.arrows){
            arrows = addArrows(settings.arrows);
            recClass.push('awo-rec-hide-arrows', arrows[1]);
          }
        }else if(settings.layout === 'grid' && settings.partial){
          if(settings.type === 'rated'){
            if(settings.view < offsetEnd){
              recClass.push('awo-rec-partial');
              showMore = addShowMore(settings.elemid);
            }
          }else{
            if(grid * 2 < offsetEnd){
              recClass.push('awo-rec-partial');
              showMore = addShowMore(settings.elemid);
            }
          }
        }
  
        if(settings.constrained){recClass.push('awo-rec-constrained');}
        if(settings.border){recClass.push('awo-rec-border');}
        if(settings.header){recClass.push('awo-rec-header-'+settings.header);} 
  
  awo.debug('Constructing: '+settings.elemid,'thistle');
  
        var recString = recClass.join(' ');

        if(settings.category){
          var recHeader = settings.header;
        }

        var rec_content = '<div id="' + settings.elemid + '" class="' + recString + '">';
            rec_content += settings.title !== undefined ? '<div class="awo-rec-header">' + settings.title + '</div>' : '';
            rec_content += productLeadM !== undefined ? productLeadM : '';
            rec_content += '<div class="awo-rec-content">';
            rec_content += containerScroll || '';
            rec_content += '<div class="awo-rec-sections">';
            rec_content += productLead || '';
            rec_content += recProducts;
            rec_content += showMore || '';
            rec_content +=  '</div>';
            rec_content += arrows !== undefined ? arrows[0] : '';
            rec_content += containerScroll ? '</div>' : '';// 
  
            rec_content += '</div>'+
                        '</div>'+
                      '</div>';

        placeWidget(settings,rec_content);
      }
  
      function placeWidget(settings,elem){
  awo.debug('Placing Rec - target: '+settings.loc, 'thistle');
        var awo_url = window.location.href;
  
        if(awo_url.match(/\/search/ig) && data.type === 'grid'){
          var no_results = $('.search-tips-panel');
  
          if(no_results.length){
            $(elem).appendTo('.main-content');
            $(elem).addClass('awo-rec-no-qv');
          }else{
            $(elem).insertBefore('.back-to-top-container');
            $(elem).removeClass('awo-rec-6-across');
            $(elem).addClass('awo-rec-4-across awo-rec-search');
          }
        }else{
  
          awo.runPoll(settings.loc, function(){
            $(elem)[settings.placement](settings.loc);
          },'',100,100);
  
          if(settings.layout === 'carousel' && settings.type !== 'promotions' || settings.layout === 'carousel' && settings.type !== 'promotions-offers'){
            awo.runPoll('#'+settings.elemid, function(){
              handleCarousel('#'+settings.elemid); // Move to success of runPoll          
            },'',100,100);
          }
        }
      }
  
      function setView(grid){
        if(grid !== 2 && grid !== 3 && grid !== 4 && grid !== 5 && grid !== 6){
          grid = 4;
        }
        return grid;
      }

      function populateCarouselLead(type){
      awo.runPoll('.item.active img', function(){
        var regId = new RegExp(/\d{4}_\d{4}_\d{3}/,'g');
        var regUrl = new RegExp(`\/p\/[^?]+`,'g');
        var section = $(elem).find('.awo-rec-section').first();
        var name = $('#js_carousel h1.psp-product-name').text();
        var src = $('.item.active img').attr('src').replace(/\?.*/g, '?\$cat-main_large\$') || '';
        var prodId = src.match(regId)[0];
        var links = $(section).find('a');
        var qv = $(section).find('.awo-rec-qv button');

        var newProd = `"product":{
                "id":"${regId}",
                "name":"${name}",
                "url":"${url}",
                "list_price":"$value",
                "sale_price":"$sale"
                }`;

        if(type !== 'a2b'){
          updateBundleBtn(elem,$(elem).find('.awo-rec-cta-btn'));
        }

        if(type ==='bundle'){
          $(section).find('a').on('click',function(e){e.preventDefault();});
        }
      });

      awo.runPoll('#pdp-sticky-menu-container .psp-swatch-container', function(){
        $('#pdp-sticky-menu-container .psp-swatch-container').off('click.awo').on('click.awo',function(){
          setTimeout(function () {
            var elems = $('.awo-rec-bundle, .awo-rec-a2b, .awo-rec-pdp');

            for (var i = 0; i < elems.length; i++) {
              populateCarouselLead(elems[i],type);
            }
          }, 500);
        });
      });
    }

  
      function addArrows(placement){
        var containerArrows = '<span class="awo-rec-arrow awo-rec-left aeoicon aeoicon-arrow2_l awo-rec-hide"></span><span class="awo-rec-arrow awo-rec-right aeoicon aeoicon-arrow2_r awo-rec-hide"></span>';
        var arrowPlacement = placement === 'out' ? 'awo-rec-arrows-out' : 'awo-rec-arrows-in';
        return [containerArrows,arrowPlacement];
      }
  
      function fetchRatings(products,settings){ 
  awo.debug('Fetch Product Ratings','violet');
        var prodIds = '';
  
        for(var i=0; i < products.length; i++){
          var product = products[i].product;
          prodIds += product.id + (i !== products.length - 1 ? ',' : '');
        }
  
        $.getJSON('https://api.bazaarvoice.com/data/products.json?apiversion=5.4&passkey=caxADTXpcItvafPxCwF8EFAqNIVhuVzZg6vDH4tbGorhE&filter=id:'+ prodIds +'&Filter_Reviews=IsRatingsOnly:eq:false&Sort_reviews=Rating:desc&limit_reviews=1&include=reviews&stats=Reviews&callback=?', function(json){
          addAttributes(products,settings,json);
        });
      }
  
      function addAttributes(products,settings,data){
  awo.debug('Add Ratings Attributes','violet');
        if(data && !data.HasErrors && data.Includes && data.Includes.Reviews && data.Results){
          $(document).on('click','.awo-rec-show-full-review',function(){
            var modal = $(this).data('modal');
  
            createModal(modal,modals[modal]);
          });
  
          var results = data.Results;
          var reviews = data.Includes.Reviews;
  
          for (var i = 0; i < results.length; i++) {
            var result = results[i];
            var prodId = result.Id;
            var reviewId = result.ReviewIds.length ? result.ReviewIds[0] : false;
  
            if(reviewId){
              var rating = reviews[reviewId].Rating;
  
              if(rating >= 4){
  awo.debug('Product Rating Qualifies', 'violet');
                products[i].product.pos = Math.ceil((rating / 5) * 100);
                products[i].product.neg = 100 - products[i].product.pos;
                products[i].product.reviewCopy = reviews[reviewId].ReviewText;
                products[i].product.ratingAvg = result.ReviewStatistics.AverageOverallRating;
                products[i].product.ratingTotal = result.ReviewStatistics.TotalReviewCount;
              }else{
  awo.debug("Review "+ i +": Rating under 4 stars",'darkmagenta');
              }
            }else{
  awo.debug("Review "+ i +": No review id", 'darkmagenta');
            }
          }
          buildProducts(products, settings, offsetStart, products.length);      
        }
      }
  
      function addRating(product){
  awo.debug('Add Rating to Product','violet');
        var pos = product.pos;
        var neg = product.neg;
        var total = product.ratingTotal;
        var copy = product.reviewCopy;
        var rating = '<div class="awo-rec-rating">'+
              '<span class="awo-rec-rating-slider-black" style="width:'+ (isNaN(pos) ? 0 : pos) +'%;"></span>'+
              '<span class="awo-rec-rating-slider-grey" style="width:'+ (isNaN(neg) ? 0 : neg) +'%;"></span>'+
              '<img class="awo-rec-stars" src="//s7d2.scene7.com/is/image/aeo/bvRatingStars?scl=1&qlt=100&fmt=png-alpha"/>'+
            '</div>'+
            '<a class="awo-rec-total" href="'+ product.url +'">'+ (isNaN(total) ? '' : (total > 1 ? total+' Reviews' : total+' Review')) +'</a>';
        if(copy !== ''){
          rating += '<div class="awo-rec-review"><p class="awo-rec-review-copy">';
          if(copy.length > 70){
            rating += '"' + copy.substring(0, 71).trim() + '..." <span class="awo-rec-show-full-review" data-modal="'+ addModal(createRevModalContent(product),'full review') +'">Full Review </span>';
          } else {
            rating += '"' + copy + '"';
          }
          rating += '</p></div>';
        }
        return rating;
      }
  
      function addLead(settings, product){
        var widgetCopy = settings.copy ? '<div class="awo-rec-lead-btn"><span>'+ settings.copy +'</span></div>':'';
  
        productLeadM = '<a href="'+ product.url +'?'+ settings.tag +'" class="awo-rec-product-lead">'+
              '<img src="https://s7d2.scene7.com/is/image/aeo/'+ product.id +'?hei=362&wid=760&fit=hfit" alt="'+ product.name +'">'+ widgetCopy +'</a>';
        productLead = '<div class="awo-rec-section"><a href="'+ product.url +'?'+ settings.tag +'" class="awo-rec-product">'+
              '<img src="https://s7d2.scene7.com/is/image/aeo/'+ product.id +'?qlt=60&wid=800" alt="'+ product.name +'">'+ widgetCopy +'</a></div>';
        offsetStart = 1;
      }
  
      function addShowMore(elem){
  awo.debug('addShowMore Called', 'thistle');
  
        showMore = '<button type="button" class="btn btn-secondary center-block awo-rec-cta-btn awo-rec-cta-btn-thin awo-rec-show-more-btn" onclick="document.getElementById(\''+ elem +'\').classList.remove(\'awo-rec-partial\');this.parentNode.removeChild(this);">show more</button>';
        return showMore;
      }
  
      function addBundleBtn(settings){
        var btn;
  
        if(settings.type === 'follow'){
          if(settings.copy){
            btn = $(elem).find('.awo-rec-section').first();
  
            $(btn).addClass('awo-rec-section-follow');
            $(btn).append('<div class="awo-rec-follow-btn"><span>'+copy+'</span></div>');
            $(btn).append('<div id="'+ $(elem).attr('id') +'_loader" class="awo-rec-loader"></div>');
  
            updateBundleBtn(elem,btn,type);
          }
        }else if(settings.type === 'bottom'){
          if(settings.copy){
            //containerClose += '<button class="btn btn-secondary center-block awo-rec-cta-btn awo-rec-show-more-btn awo-rec-bottom-btn"><span>'+settings.copy+'</span></button>';
            //btn = $(elem).find('.awo-rec-bottom-btn');
            //updateBundleBtn(elem,btn,type);
          }
        }else{//To do
          var sections_wrap = $(elem).find('.awo-rec-sections');
          var sections = $(elem).find('.awo-rec-section');
          var sections_length = sections.length || 0;
          var btn_copy = 'Add All '+ view +' To bag';
  
          if(sections_length !== view){
            $(elem).removeClass('awo-rec-'+view+'-across');
            $(elem).addClass('awo-rec-'+sections_length+'-across');
            btn_copy = 'Add All '+ sections_length +' To bag';
          }
  
          if(sections_length == 2){
            btn_copy = 'Add Both To bag';
          }
  
          if(type === 'vignette'){
            btn_copy = 'Get This Look';
          }
  
          $(sections_wrap).append('<button type="button" class="btn btn-secondary awo-rec-cta-btn awo-rec-bundle-btn awo-rec-section">' + btn_copy + '</button>');
  
          updateBundleBtn(elem,$(elem).find('.awo-rec-cta-btn'),type);
        }
      }
      //Need to do.
      function updateBundleBtn(elem,btn,type){
        if(btn.length){
          var selectedIds = collectProdIds($(elem).find('.awo-rec-sections .awo-rec-section'));
  
          if(selectedIds.length){
            $(btn).off('click').on('click',function(){
              showSideTray(elem,type,selectedIds);
              trackClick(elem,'st_pdp');
              showLoader(elem);
            });
          }
        }
      }
  
      //**************************//
      //****** PROMOTIONS ********//
      //**************************//
  
      function addPromotions(settings){
        var promoSettings = {
          "async": false,
          "crossDomain": true,
          "url": win.location.origin + "/web/mobile/app_cards.json?channel=web",
          "method": "POST",
          "headers": {
            "cache-control": "no-cache"
          }
        };
  
        $.ajax(promoSettings).done(function(resp){
          if(resp){
            buildSections(settings,resp,setGender(settings.gender));
          }
        });
      }
  
      function setGender(gender){
       if(!gender || gender ==='neutral'){
          gender = ['landing'];
        }else if(gender === 'women' || gender === 'female'){
          gender = ['women','aerie'];
        } else if(gender === 'men' || gender === 'male'){
          gender = ['men'];
        }else{
          gender = [gender];
        }
        return gender;
      }
  
      function buildSections(settings,resp,gender){
        var cards = filterBrandcards(resp.mobile_app_data.card_data.cards,gender,settings.context);
        var recProducts = '';
  
        for (var i = 0; i < cards.length; i++) {
          var card = cards[i];
          var links = buildLinks(card.action_items,card.secondary_copy.cta,gender[0],(i+1),settings.context);
  
          if(links){
            recProducts += '<div class="awo-rec-section">'+
              '<div class="awo-rec-promo">'+
                '<img src="//s7d2.scene7.com/is/image/aeo/'+ card.image.image_src +'?qlt=60&hei=369&scl=2"/>'+
              '</div>'+
              '<div class="awo-rec-info">'+
                buildCopy(card,'headline') +
                buildCopy(card,'main') +
                '<div class="awo-rec-promo-action-items">'+ links +'</div>'+
                '<div class="awo-rec-promo-details-wrap">'+
                  buildCopy(card,'promo') +
                  buildCopy(card,'disclaimer') +
                '</div>'+
              '</div>'+
            '</div>';
          }
        }
  
        if(recProducts){
          buildContainer(settings,recProducts);
  
          $(win_elem).click(function() {
            $('.awo-rec-promo-action-items').removeClass('awo-rec-promo-show-ctas');
          });
  
          $('.awo-rec-promotions .awo-rec-section').off('click');
          $('.awo-rec-promotions .awo-rec-section').on('click',function(e){
            e.stopPropagation();
  
            $('.awo-rec-promotions .awo-rec-section').not(this).find('.awo-rec-promo-action-items').removeClass('awo-rec-promo-show-ctas');
            $(this).find('.awo-rec-promo-action-items').toggleClass('awo-rec-promo-show-ctas');
          });
  
          $('.awo-rec-promo-details-trigger').off('click');
          $('.awo-rec-promo-details-trigger').on('click',function(e){
              e.stopPropagation();
  
              var modal = $(this).data('modal');
  
              createModal(modal,modals[modal]);            
          });
  
          handleCarousel('#'+settings.elemid);
        }
      }
  
      function filterBrandcards(data,gender,context){
        var cards = [];
  
        for (var i = 0; i < data.length; i++) {
          var card = data[i];
          var show = false;
  
          if(card.devices.indexOf('ios') > -1 && card.locations.length){
  
            for (var x = 0; x < card.locations.length; x++) {
              var app_location = card.locations[x];
  
              for (var y = 0; y < gender.length; y++) {
                if(context) {
                  if(app_location == gender[y] && card.context == context){
                    show = true;
                  }  
                } else {
                  if(app_location == gender[y]){
                    show = true;
                  } 
                }
                
              }
            }
  
            if(show){
              cards.push(card);
            }
          }
        }
  
        return cards;
      }
  
      function buildCopy(data,type){
        if(type === 'promo'){
          if(data.copy.promo){
            return '<span class="awo-rec-promo-code">'+ data.copy.promo.copy.toLowerCase() +' '+ data.copy.promo.code +'</span>';
          }else{
            return '';
          }
        }else if(type === 'disclaimer'){
          if(data.secondary_copy.terms.length){
            return '<span class="awo-rec-promo-details-trigger" data-modal="'+ addModal(data.secondary_copy.terms,'details') +'">'+ data.copy.disclaimer +'</span>';
          }else if(data.copy.disclaimer){
            return '<span class="awo-rec-promo-disclaimer">'+ data.copy.disclaimer +'</span>';
          }else{
            return '';
          }
        }else{
          if(type === 'headline'){
            return '<div class="awo-rec-promo-headline">'+ data.copy.headline +'</div>';
          }else if(type === 'main'){
            return '<div class="awo-rec-promo-main-message">'+ data.copy.main_message +'</div>';
          }
        }
      }
  
      function buildLinks(data,tray_cta,gender,card,context){
        var ctas = [];
  
  
        for (var i = 0; i < data.length; i++) {
          var cta = data[i];
  
          ctas.push(createHREF(cta,gender,card,data.length,context));
        }
          
        if(ctas.length > 1){
          var links = '';
  
          for (var j = 0; j < ctas.length; j++) {
            links += ctas[j];
          }
  
          return '<div class="awo-rec-promo-cta-wrap"><div class="awo-rec-promo-hide-ctas">Shop Now<span class="aeoicon aeoicon-close"></span></div><div class="custom-scrollbars">'+ links +'</div></div><div class="btn btn-secondary awo-rec-cta-btn awo-rec-cta-btn-thin awo-rec-promo-btn awo-rec-promo-tray-btn">'+ (tray_cta !== "" ? tray_cta : "Shop Now") +'</div>';
        }else if(ctas.length === 1){
          return ctas[0];
        }else{
          return false;
        }
      }
  
      function createHREF(data,gender,card,links,context){
        if(data.type && data.link && data.cta){
          var link = '';
          var cidUpdate;
  
          if(context){
            cidUpdate = context;
          } else {
            cidUpdate = 'justforyou';
          }
  
          if(data.type === 'category'){
            link = '/0/0/s-cat/'+ data.link.replace('cat','') +'?icid=AE:' + cidUpdate + ':brandcard_'+ card +':'+ gender +':'+ data.link;
          }else if(data.type === 'product'){
            link = '/0/0/s-prod/'+ data.link +'?icid=AE:' + cidUpdate + ':brandcard_'+ card +':'+ gender +':'+ data.link;
          }else if(data.type === 'url'){
            link = data.link + (data.link.match(/\?/g) ? '&' : '?') +'icid=AE:' + cidUpdate + ':brandcard_'+ card +':'+ gender +':url';
          }else if(data.type == 'deep_link'){
            var dl = data.link.replace(/ae\w*:\/\/page\//,'');
  
            switch(dl) {
              case "shop":
                link = '/';
                break;
              case "men":
                link = '/men/web/s-cms/mens';
                break;
              case "women":
                link = '/women/web/s-cms/womens';
                break;
              case "aerie":
                link = '/aerie/aerie/s-cms/4840006';
                break;
              case "tailgate":
                link = '/tailgate/tailgate/s-cms/8050004';
                break;
              case "giftcard":
                link = '/gift-cards';
                break;
              case "findastore":
                link = 'https://storelocations.ae.com/search.html';
                break;
              case "myaeo":
                link = '/myaccount/aeoconnected';
                break;
              case "aerewards":
                link = '/myaccount/aeoconnected';
                break;
              case "aecreditcard":
                link = '/content/credit';
                break;
              case "RTB":
                link = '/reserve-in-store';
                break;
              case "createaccount":
                link = '/myaccount/create-account';
                break;
              case "signin":
                link = '/login';
                break;
              default:
                link = '';
            }
  
            if(link){
              link = link + (link.match(/\?/g) ? '&' : '?') +'icid=AE:justforyou:brandcard_'+ card +':'+ gender +':deep_link';
            }
          }
  
          if(link){
            var cta = data.cta.toLowerCase().trim();
  
            if(!cta.match(/shop\snow/ig) && links > 1){
              cta = cta.replace(/shop/ig,'');
            }
  
            return '<a class="btn btn-secondary awo-rec-cta-btn awo-rec-cta-btn-thin awo-rec-promo-btn" href="'+ link +'">'+ cta +'</a>';
          }else{
            return '';
          }
        }
      }
  
      //**************************//
      //********* Modal **********//
      //**************************//
  
      function addModal(data,title){
        var content = '';
  
        if(title === 'details'){
          for (var i = 0; i < data.length; i++) {
            var copy = data[i];
  
            content += '<h4>'+ copy.copy_title +'</h4><div class="awo-modal-content">'+ copy.copy +'</div>';
          }
  
          content += '<div class="awo-rec-cr">&copy; '+ year +' AEO Management Co. All Rights Reserved.</div>';
        }else{
          content = data;
        }
  
        modal_iter++;
  
        modals[modal_iter] = {};
        modals[modal_iter].title = title;
        modals[modal_iter].content = content;
  
        return modal_iter;
      }
  
      function createRevModalContent(product){ 
        var pos = product.pos;
        var neg = product.neg;
        var total = product.ratingTotal;
            
        var data  = '<div class="awo-rec-review-modal-img awo-rec-float-left">'+
                      '<img src="https://s7d2.scene7.com/is/image/aeo/' + product.id + '?$cat-main_large$" alt="' + product.name + '"/>'+
                    '</div>'+
                    '<div class="awo-rec-review-modal-name awo-rec-float-left">'+ product.name +'</div>'+
                    '<div class="awo-rec-review-modal-rating awo-rec-float-left">'+ 
                    '<div class="awo-rec-rating">'+
                      '<span class="awo-rec-rating-slider-black" style="width:'+ (isNaN(pos) ? 0 : pos) +'%;"></span>'+
                      '<span class="awo-rec-rating-slider-grey" style="width:'+ (isNaN(neg) ? 0 : neg) +'%;"></span>'+
                      '<img class="awo-rec-stars" src="//s7d2.scene7.com/is/image/aeo/bvRatingStars?scl=1&qlt=100&fmt=png-alpha"/>'+
                    '</div></div>'+
                    '<div class="awo-rec-review-modal-total awo-rec-float-left">'+
                    '<a class="awo-rec-total" href="'+ product.url +'">'+ (isNaN(total) ? '' : (total > 1 ? total+' Reviews' : total+' Review')) +'</a></div>'+
                    '<div class="awo-rec-clear">'+
                      '<div class="awo-rec-review-modal-copy awo-rec-float-left">"'+ product.reviewCopy +'"</div>'+
                      '<a class="awo-rec-review-modal-btn awo-rec-cta-btn awo-rec-cta-btn-thin btn btn-secondary" href="'+ product.url +'">Shop Now</a>'+
                    '</div>'+
                    '<div class="awo-rec-clear"></div>';
        return data;
      }
  
      function createModal(modal,data){
        var elem = $('#awo_rec_modal_'+modal);
  
        if(elem.length){
          $(elem).modal('show');
        }else{
          $('.modals-wrapper').append('<div class="modal animate awo-rec-'+ data.title.toLowerCase().replace(' ','-') +'-modal" id="awo_rec_modal_'+ modal +'" tabindex="1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
              '<div class="modal-content">'+
                '<div class="modal-header">'+
                  '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'+
                  '<h4 class="modal-title">'+ data.title +'</h4>'+
                '</div>'+
                '<div class="modal-body">'+
                  data.content+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>');
  
          $('#awo_rec_modal_'+modal).modal('show');
        }
      }
  
      //**************************//
      //**** Handle Carousel *****//
      //**************************//
  
      function handleCarousel(elem){
  awo.debug('handleCarousel Called: '+elem, 'DARKOLIVEGREEN');
        var data          = {};
        var scroll_elem   = $(elem+' .awo-rec-scroll');
        var sections_wrap = $(elem).find('.awo-rec-sections');
        var sections      = $(elem).find('.awo-rec-section');
        var arrows        = $(elem).find('.awo-rec-arrow');
        var left          = $(elem).find('.awo-rec-left');
        var right         = $(elem).find('.awo-rec-right');
        var buffer        = 30;
        var resize_thr;
        var scroll_thr;
  awo.debug(scroll_elem, 'DARKOLIVEGREEN');
  awo.debug(elem +' sections_wrap width : '+$(elem+' .awo-rec-sections').width(), 'DARKOLIVEGREEN');
  
        $(win_elem).on('load',function(){
            awo.debug('handleResize on window load '+elem, 'YELLOWGREEN');
          handleResize();
        });
  
        setTimeout(function(){
          handleResize();
        },3000);
  
        function handleResize(){
  awo.debug('handleResize '+elem, 'YELLOWGREEN');
          winWidth();
          sectionsWidth();  
          entireWidth();
  
          if(scrollableContent()){
            if(data.winWidth > 767){
              checkScrollPos();
              placeArrows();
            } 

            $(scroll_elem).addClass('custom-scrollbars');
            $(scroll_elem).removeClass('awo-rec-hide-scroll');
          }else{
            handleArrows('hide');

            $(scroll_elem).removeClass('custom-scrollbars');
            $(scroll_elem).addClass('awo-rec-hide-scroll');
          }
        }
  
        function placeArrows(){
          var section = $(sections_wrap).find('.awo-rec-section:nth-child(2) img');
          var section_height = $(section).height() || 0;
          var offset = $(sections_wrap).position().top;
          var placement = (section_height/2 + offset) - 30;
  
          if(placement > 20){
            $(arrows).css('top', placement +'px');
  
            $(elem).removeClass('awo-rec-hide-arrows');
          }else{
            $(elem).addClass('awo-rec-hide-arrows');
          }
        }
  
        function checkScrollPos(){
          scrollPos();
  
          if(scrollableContent()){
            if(data.scrollPos <= buffer){
              handleArrows('hide','left');
              handleArrows('show','right');
            }else if(data.scrollPos + data.sectionsWidth >= data.entireWidth - buffer){
              handleArrows('hide','right');
              handleArrows('show','left');
            }else{
              handleArrows('show');
            }
          }else{
            handleArrows('hide');
          }
        }
  
        function handleArrows(display,arrow){
          var btns = ['left','right'];
  
          if(arrow){
            btns = [arrow];
          }
  
          for (var i = 0; i < btns.length; i++) {
            var btn = btns[i];
  
            if(display === 'show'){
              $(elem).find('.awo-rec-'+btn).removeClass('awo-rec-hide');
            }else if(display === 'hide'){
              $(elem).find('.awo-rec-'+btn).addClass('awo-rec-hide');
            }
          }
        }
  
        function moveWidget(dir){
         var section;
          var left;
          var right;
          var margin = 0;
  
          if(sections.length <= 0){
            sections = $(elem).find('.awo-rec-section');
          }
  
          if(dir === 'right'){
            for (var i = 0; i < sections.length; i++) {
              section = $(sections)[i];
  
              left = $(section).position().left;
              right = left + $(section).width();
  
              if(right + 5 >= data.sectionsWidth){
                margin = parseInt($(section).css('margin-right')) || 0;
                scrollElem(data.scrollPos + left + margin);
                break;
              }
            }
          }
  
          if(dir === 'left'){
            for (var x = sections.length - 1; x >= 0; x--) {
              section = $(sections)[x];
  
              margin = parseInt($(section).css('margin-left')) || 0;
              left = $(section).position().left + margin;
              right = left + $(section).width();
  
              if(left + 5 <= 0){
                scrollElem(data.scrollPos - data.sectionsWidth + right);
                break;
              }
            }
          }
        }
  
        function winWidth(){
          data.winWidth = $(win_elem).width();
        }
  
        function sectionsWidth(){
          awo.debug('function sectionsWidth = '+$(sections_wrap).width(),'red');
          data.sectionsWidth = $(sections_wrap).width();          
        }
  
        function entireWidth(){
          var el = $(scroll_elem)[0];
  
          if(el){
            data.entireWidth = el.scrollWidth;
          }
        }
  
        function scrollPos(){
          data.scrollPos =  $(scroll_elem).scrollLeft();
        }
  
        function scrollableContent(){
          if(Math.ceil(data.sectionsWidth) < data.entireWidth){
            return true;
          }else{
            return false;
          }
        }
  
        function throttleResize(){
          clearTimeout(resize_thr);
  
          resize_thr = setTimeout(function () {
            awo.debug('throttleResize','MEDIUMVIOLETRED');
            handleResize();
          }, 100);
        }
  
        function throttleScroll(e){
          clearTimeout(scroll_thr);
  
          scroll_thr = setTimeout(function () {
            if (e.type === 'mousedown' || e.type === 'mousewheel' || e.type === 'DOMMouseScroll'){
              stopAnimation();
            }
  
            if(data.winWidth > 767){
              checkScrollPos();
            }
          }, 10);
        }
  
        function stopAnimation(){
          $(scroll_elem).stop();
        }
  
        $(win_elem).on('resize',function(){
          throttleResize();
        });
  
        $(scroll_elem).on('scroll DOMMouseScroll mousewheel mousedown',function(e){
          throttleScroll(e);
        });
  
        $(left).on('click',function(){
          moveWidget('left');
        });
  
        $(right).on('click',function(){
          moveWidget('right');
        });
  
        function scrollElem(scroll){
          stopAnimation();
  
          $(scroll_elem).animate({
            scrollLeft: scroll
          }, 1000);
        }
      }

      awo.at.activities.push({
        "name":"XT - Recommendations Code - v13.6",
        "info":{
          "desc":"Updating framework for JSON and at.js integration"
        }
      });
  
      if(document.getElementById('AWO-Frmwk') == null){
        awo.setStyles(activity_style, 'AWO-Frmwk');
      }
      //awo.runPoll('.footer-default',init);
      
      awo.runPoll2('Adobe Recs Framework','jQuery',function(){
        awo.runPoll2('Recs Framework Footer','.footer-default',init)
      });
  
    }catch(e){
      if(typeof awo !== 'undefined'){
        awo.debug(e,'red');
      }
    }
  })();
  </script>