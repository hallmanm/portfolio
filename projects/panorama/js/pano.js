(function() {
  function showQuickView( params, brand, pano ) {

    setTimeout(function() {
      var qvModal = new Modal({
        id: "qvModal",
        width: 670,
        quickView: true,
        useAjax: true,
        url: "/" + (brand || jsContextRoot) + "/browse/quickview.jsp?",
        ajaxData: params,
        ajaxCb: function() {
          var qvModalRef = qvModal.getModalDOM();
          // Prefer to use init but will require further testing since it runs resolveDuplicateModal
          if (qvModalRef.find(".heroOn").length) {
            this.setConfig({width: 856});
          }
          // Test for bookmark page and transform size
          var bmLink = qvModalRef.find(".mBookmark_continueShopping");
            if (bmLink.length) {

              bmLink.bind("click.qv", function( evt ) {
                evt.preventDefault();

                pano.startAutorotate();

                qvModal.close();
              });
          }
        },
        openCb: function(){
          pano.stopAutorotate();
        },
        closeCb: function(){
          pano.startAutorotate();
        }
      });
      qvModal.open();
    }, 0);
  }

  /*QUICK VIEW HOTNESS*/
  function panoQV(a,c,pano){
    alert('Original functionality would now show a "quick view" of the product clicked.');
  //   var link = $(this), //$(evt.target),
  //     href = "",
  //     brand;

  //   if (!link.is("a")) {
  //     link = link.closest("a");
  //   }
  //   href = a;
  //   brand = /\/(\w+)\/browse\/product\.jsp/.exec(href);
  //   brand = brand && brand[1];

  //   showQuickView($.parseParams(href), brand, pano);
  }

  // check for CSS3 3D transformations and WebGL
  if (ggHasHtml5Css3D() || ggHasWebGL()) {
    // use HTML5 panorama

    // create the panorama player with the container
    pano=new pano2vrPlayer("container");

    //Quick View Hack
    pano._openUrl = pano.openUrl;

    pano.openUrl = function ( a, c ) {

      if (/bundle/.test(a)) {
        panoQV(a, c, pano);
      } else {
        pano._openUrl(a, c);
      }
    };
    // add the skin object
    skin=new pano2vrSkin(pano);
    // load the configuration

    if(Modernizr.touch){
      pano.readConfigUrl("xml/touch_pano.xml");
    }else {
      pano.readConfigUrl("xml/pano.xml");
    }
    // hide the URL bar on the iPhone
    //hideUrlBar();
  }
  // else
  // if (swfobject.hasFlashPlayerVersion("9.0.0")) {
  //   var flashvars = {},
  //     params = {};

  //   params.quality = "high";
  //   params.bgcolor = "#ffffff";
  //   params.allowscriptaccess = "sameDomain";
  //   params.allowfullscreen = "true";
  //   params.wmode = "transparent";

  //   var attributes = {};

  //   attributes.id = "pano";
  //   attributes.name = "pano";
  //   attributes.align = "middle";

  //   flashvars.skinxml="panoSkin.xml";

  //   flashvars.panoxml="pano.xml";

  //   params.base=".";

  //   swfobject.embedSWF(
  //     "images/pano2vr_player.swf", "container", 
  //     "1010", "544",
  //     "9.0.0", "",
  //     flashvars, params, attributes);
  // }
})();
