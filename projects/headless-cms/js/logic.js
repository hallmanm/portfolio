  $('#card_inputs').css('padding-bottom',$('header').outerHeight());

  var data,
      card_backup,
      banner_backup,
      promotion_backup,
      debounce,
      zone_written      = true,
      prod_written      = true,
      saved_written     = true,
      undo_apply        = false,
      jira              = 'DP-',
      jira_given        = false,
      temp_commit_date  = '',
      debug             = false,
      setTime           = '04:20',
      // setCardHeight     = 225,
      // paramDefault      = '?hei=' + Math.round(setCardHeight*1.5),
      paramDefault      ='?qtl=60',
      setStartTimestamp = getTimestamp('1970-01-01',setTime),
      setEndTimestamp   = getTimestamp('9999-12-31',setTime),
      copyDate          = new Date().getFullYear(),
      doc               = $(document),
      card_inputs       = $('#card_inputs'),
      cards_table       = $('#cards'),
      addCardBtn        = $('#addCardBtn'),
      saveBtn           = $('#saveBtn'),
      generator_wrap    = $('#generator_wrap'),
      jsonInputText     = $('#jsonInputText'),
      jsonOutput        = $('#jsonOutput'),
      organizeOutput    = $('#organize'),
      autoScrollInput   = $('#autoScrollInput'),
      banners_table     = $('#banners_table'),
      promotions_table  = $('#promotions_table'),
      shadow            = $('#shadow'),
      temp_date_input   = $('#temp_date_input'),
      temp_time_input   = $('#temp_time_input'),
      testCheck         = $('#testCheck'),
      location_names = [
        "landing",
        "women",
        "men",
        "jeans",
        "aerie",
        "tailgate",
        "gifts",
        "clearance"
      ],
      cta_types = [
        'category',
        'product',
        'web_view',
        'deep_link',
        'url'
      ],
      deep_links = [
        {'display_name':'Home Tab','val':'ae://page/shop'},
        {'display_name':'Men','val':'ae://page/men'},
        {'display_name':'Women','val':'ae://page/women'},
        {'display_name':'Aerie','val':'ae://page/aerie'},
        {'display_name':'Tailgate','val':'ae://page/tailgate'},
        {'display_name':'Find A Store','val':'ae://page/findastore'},
        {'display_name':'Gift Cards','val':'ae://page/giftcard'},
        {'display_name':'My AEO','val':'ae://page/myaeo'},
        {'display_name':'AERewards','val':'ae://page/aerewards'},
        {'display_name':'AEO Credit Card','val':'ae://page/aecreditcard'},
        {'display_name':'Offers','val':'ae://page/offers'},
        {'display_name':'Reserve, Try & Buy','val':'ae://page/RTB'},
        {'display_name':'Inspiration','val':'ae://page/inspiration'},
        {'display_name':'Snap & Scan','val':'ae://page/snapandscan'},
        {'display_name':'Create Account','val':'ae://page/createaccount'},
        {'display_name':'Sign In','val':'ae://page/signin'},
        {'display_name':'Music Player','val':'ae://page/music'}
      ],
      days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      auto_save = window.setInterval(save, 300000);
function updateHeight(){
  $(generator_wrap).css('height',+$(window).outerHeight() - $('#header').outerHeight() - $('#nav').outerHeight() - $('h1').outerHeight() - $('#disclaimer').outerHeight() +'px');
}

$(document).ready(function(){
  updateHeight();
if(debug){console.log('initial set height');}
});

$( window ).on( "resize", function() {
  updateHeight();
if(debug){console.log('window resized: update height');}
});

  window.onbeforeunload = function (event) {
    var message = 'Changes you made may not be saved.';

    if(!prod_written && !saved_written && !zone_written){
      if (typeof event == 'undefined') {
        event = window.event;
      }

      if (event) {
        event.returnValue = message;
      }

      return message;
    }
  };


  function updateRepo(file){
    $(shadow).addClass('loading');

    $.ajax({
        url: "handler.php",
        type:'POST',
        data:{
          action: 'load'
        },
        success: function(data){
          console.log(data);
if(debug){console.log('repo updated');}
          updateJSON(file);
        }
      });
  }

  function loadFile(type){
    $(shadow).addClass('loading');

    var file = '';

    if(type =='saved'){
if(debug){console.log('load saved file');}
      file = 'saved/saved.json';

      updateJSON(file);
    }else if(type=='zone'){
if(debug){console.log('load zone json');}
      file = 'zone/app_cards.json';

      updateRepo(file);
    }else if(type=='prod'){
if(debug){console.log('load prod json');}
      file = 'prod/app_cards.json';

      updateRepo(file);
    }else{
if(debug){console.log('load auto saved file');}
      file = 'saved/auto_saved.json';

      updateJSON(file);
    }
  }

  function updateJSON(file){
    var timestamp = new Date().getTime();

    $.getJSON(file+'?v='+timestamp, function( json ) {
if(debug){console.log('paste json into text area');}
      var jsonInput = JSON.stringify(json, null, '\t').replace(/[^\x00-\x7F^®©;]+/g,'');

      $(jsonInputText).val(jsonInput);

      jsonTextarea(jsonInputText);

      $(shadow).removeClass('loading');
    }).fail(function() {
      alert("File Not Found");
      $(shadow).removeClass('loading');
    });
  }

  function save() {
if(debug){console.log('check for content to auto save');}
    if($(generator_wrap).hasClass('hasCards')){
      $(saveBtn).addClass('saving');
      
      printFile('auto_save');

       setTimeout(function(){
        $(saveBtn).removeClass('saving');
      }, 1000);
    }
  }

  function printFile(type){
    var json = '',
        action = '',
        time = '',
        alert_msg = '',
        write = true;

    if(type == 'auto_save'){
if(debug){console.log('auto saved json');}
      action = 'auto_save';
      alert_msg = '\u2705 JSON Saved';
      json = JSON.stringify(getFullForm(), null, '\t').replace(/[^\x00-\x7F^®©;]+/g,'');
    }else if(type == 'save'){
      $(shadow).addClass('loading');

if(debug){console.log('saved json');}
      saved_written = true;
      action = 'save';
      alert_msg = '\u2705 JSON Saved';
      json = JSON.stringify(getFullForm(), null, '\t').replace(/[^\x00-\x7F^®©;]+/g,'');
    }else if($(organizeOutput).hasClass('unvalidated')||$(organizeOutput).hasClass('temp')||$(testCheck).prop('checked')){
      $(shadow).addClass('loading');

      if (confirm("\u26A0 Caution \u26A0\n\nYou are overwriting the current 'Zone Ready' File in the Repo.\n\nAre you sure?") === true) {
if(debug){console.log('saved zone file and pushed to repo');}
        zone_written = true;
        action = 'zone';
        time = temp_commit_date;

        if(time!==''){
          alert_msg = '\u2705 Zone File for '+time+' Has Been Saved and Pushed to the Repo';
        }else{
          alert_msg = '\u2705 Zone File Has Been Saved and Pushed to the Repo';
        }
        
        json = $(jsonOutput).val();
      }else{
        $(shadow).removeClass('loading');

        write = false;
      }
    }else{
      $(shadow).addClass('loading');

      if (confirm("\u26A0 Caution \u26A0\n\nYou are overwriting the current 'Production Ready' File in the Repo.\n\nAre you sure?") === true) {
if(debug){console.log('saved produciton file and pushed to repo');}
        prod_written = true;
        action = 'prod';
        alert_msg = '\u2705 Production File Has Been Saved and Pushed to the Repo';
        json = $(jsonOutput).val();

        var jira_input = prompt("Please Enter a Jira Number", jira);

        if (jira_input !== null) {
          jira_given = true;
          jira = jira_input;
        }else{
          jira_given = false;
        }
      }else{
        $(shadow).removeClass('loading');

        write = false;
      }
    }

    if(write){
      var jira_ticket = '';

      if(jira_given){
        jira_ticket = jira;
      }

      $.ajax({
        url: "handler.php",
        type:'POST',
        data:{
          action: action,
          time: time,
          jira_ticket: jira_ticket,
          json: json
        },
        success: function(data){
          console.log(data);
          if(action!='auto_save'){
            if(data.search("no changes added to commit") > -1 || data.search("nothing to commit") > -1 ){
              alert_msg = "No Change in File. Nothing was Pushed to the Repo.";
            }
            alert(alert_msg);
          }

          $(shadow).removeClass('loading');
        }
      });
    }
  }

  function jsonTextarea(elem){
    if($(elem).val()!==''){
if(debug){console.log('Input content found');}
      $(elem).parents('.slide').addClass('showBtn');
    }else{
if(debug){console.log('No input content found');}
      $(elem).parents('.slide').removeClass('showBtn');
    }
  }

  function inputJSON(elem){
    $(shadow).addClass('loading');

    if($(jsonInputText).val()){
      toggleShadow(elem);

      setTimeout(function(){
if(debug){console.log('Parse JSON');}
        try{
          data = JSON.parse($(jsonInputText).val());
        }catch(e){
          $(shadow).removeClass('loading');

          alert('Improper JSON structure:\n\n'+e);

          return;
        }

        displayOutput(data);

        var errors = $('.error');

        $(errors).removeClass('error');
      }, 1000);
    }
  }

  function displayOutput(data){
if(debug){console.log('Build interface');}
    if(data.mobile_app_data){
      $(addCardBtn).removeClass('dup');
      
      $(promotions_table).empty();
      $(banners_table).empty();
      $(cards_table).empty();

      var promotion_data = data.mobile_app_data.promotions,
          banner_data    = data.mobile_app_data.card_data.banners,
          card_data      = data.mobile_app_data.card_data;

      if(promotion_data){
if(debug){console.log('Build promotions');}
        var promotionString = '';

        for (var i=0; i<promotion_data.length; i++) {
          promotionString += createPromotionString(promotion_data[i]);
        }

        addPromotions(promotionString);
      }

      if(banner_data){
if(debug){console.log('Build banners');}
        var bannerString = '';

        for (var x=0; x<banner_data.length; x++) {
          bannerString += createElemString(banner_data[x],'banner');
        }

        addBanners(bannerString);
      }

      if(card_data){
        if(card_data.autoscroll_delay){
if(debug){console.log('Build autoscroll delay');}
          createScroll(card_data.autoscroll_delay);
        }else{
if(debug){console.log('Creating autoscroll delay');}
          $(autoScrollInput).empty();

          for(var y=0; y<=5; y++){
            $(autoScrollInput).append('<option value="'+y+'" '+(y===0?'selected':'')+'>'+(y===0?'None':y)+'</option>');
          }
        }

        card_data = card_data.cards;

        if(card_data){
if(debug){console.log('Build cards');}
          var cardString = '';

          for (var z=0; z<card_data.length; z++) {
            cardString += createElemString(card_data[z]);
          }

          addCards('',cardString);
        }

        $('input').each(function(){
          $(this).trigger('oninput');
        });
        $('textarea').each(function(){
          $(this).trigger('oninput');
        });

        updateCardSelect();
        checkCards();
      }
    }


    // $(shadow).removeClass('loading');

    checkTimers();
  }

  function addPromotions(content){
    if(content){
if(debug){console.log('Building promotion');}
      $(promotions_table).append(content);
    }else{
if(debug){console.log('Adding new promotion');}
      $(promotions_table).append(createPromotionString());
    }
  }
  function addBanners(content){
    if(content){
if(debug){console.log('Building banner');}
      $(banners_table).append(content);
    }else{
if(debug){console.log('Adding new banner');}
      $(banners_table).append(createElemString('','banner'));
    }
  }
  function addCards(elem,content){
    $(shadow).addClass('loading');

    if($(elem).hasClass('dup')){
      duplicateCards();
    }else{
      if(content){
if(debug){console.log('Building card');}
        $(cards_table).append(content);
      }else{
if(debug){console.log('Adding new card');}
        $(cards_table).append(createElemString());
        jumpTo($(card_inputs).height());
        updateCardSelect();
        checkCards();
      }
    }
  }

  function createScroll(scrollData){
if(debug){console.log('Building autoscrolldelay');}
    $(autoScrollInput).empty();

    for(var i=0; i<=(scrollData<5?5:scrollData); i++){
      $(autoScrollInput).append('<option value="'+i+'" '+(scrollData==i?'selected':'')+'>'+(i===0?'None':i)+'</option>');
    }
  }
  function addTimer(elem){
if(debug){console.log('Add timer');}
    if($(elem).prev('fieldset[name="timer"]').length<=0){
      var outputString = '<fieldset name="timer" data-type="array">'+createTimerString()+'</fieldset>';
      
      $(elem).before(outputString);
    }else{
      $(elem).prev().append(createTimerString());
    }
  }
  function addLocations(input_data){
if(debug){console.log('Build Locations');}
    var locationString = '';

    for (var i=0; i<location_names.length; i++) {
      locationString +='<option value="'+location_names[i]+'" '+(!input_data?'selected':(input_data&&input_data.indexOf(location_names[i])!=-1?'selected':''))+'>'+location_names[i].replace(/_+/g,' ')+'</option>';
    }

    return locationString;
  }
  function togglePromo(elem,val){
    if(val==1){
if(debug){console.log('Add promo');}
      $(elem).after(createPromoString());
      $(elem).parents('form').find('.promo_out_wrap').removeClass('hide');
    }else{
if(debug){console.log('Remove promo');}
      $(elem).next().remove();
      $(elem).parents('form').find('.promo_out_wrap').addClass('hide');
      $(elem).parents('form').find('.promo_out_wrap').empty();
    }
  }
  function toggleSecondary(elem,val){
    if(val==1){
if(debug){console.log('Add secondary');}
      $(elem).after(createSecondaryString());
    }else{
if(debug){console.log('Remove secondary');}
      $(elem).next().remove();
      $(elem).parents('form').find('.barcodes_out_wrap,.terms_out_wrap,.copyright_out').empty();
    }
  }
  function addBarcode(elem){
if(debug){console.log('Add barcode');}
    if($(elem).prev('fieldset[name="barcodes"]').length<=0){
      var outputString = '<fieldset name="barcodes" data-type="array" class="barcodeWrap">'+createBarcodeString()+'</fieldset>';
      
      $(elem).before(outputString);
    }else{
      $(elem).prev().append(createBarcodeString());
    }

    $(elem).parents('form').find('.'+$(elem).attr('data-type')+'_out_wrap').append(createBarcodeOutString());
  }
  function toggleTerms(elem,val){
    if(val==1){
if(debug){console.log('Add terms');}
      $(elem).after(createTermsString()[0]+createCopyrightString());
      $(elem).parents('form').find('.terms_out_wrap').append(createTermOutString());
    }else{
if(debug){console.log('Remove terms and copyright');}
      $(elem).siblings('fieldset[name="terms"],.addTermsBtn,.copyright').remove();
      $(elem).parents('form').find('.terms_out_wrap,.copyright_out').empty();
    }
  }
  function addTerm(elem){
if(debug){console.log('Add term');}
    if($(elem).prev('fieldset[name="terms"]').length<=0){
      var outputString = '<fieldset name="terms" data-type="array">'+createTermString()+'</fieldset>';
      
      $(elem).before(outputString);
    }else{
      $(elem).prev().append(createTermString());
    }

    $(elem).parents('form').find('.'+$(elem).attr('data-type')+'_out_wrap').append(createTermOutString());
  }
  function addAction(elem,type){
if(debug){console.log('Add action item');}
    if($(elem).prev('fieldset[name="action_items"]').length<=0){
      var outputString = '<fieldset name="action_items" data-type="array" class="actionItemWrap actionItems tip">'+createActionString('',type)+'</fieldset>';
      
      $(elem).before(outputString);
    }else{
      $(elem).prev().append(createActionString('',type));
    }

    $(elem).parents('form').find('.'+$(elem).attr('data-type')+'_out_wrap').append(createActionOutString());
  }
  function addTypes(input_data){
if(debug){console.log('Build button types');}
    var typeString = '';

    for (var i=0; i<cta_types.length; i++) {
      typeString += '<option value="'+cta_types[i]+'" '+(input_data?(cta_types[i]==input_data.type?'selected':''):'')+'>'+cta_types[i].replace(/_+/g,' ')+'</option>';
    }

    return typeString;
  }

  function updateImgUrl(elem,value){
    var parent = $(elem).parents('form'),
        img_elem = parent.find('.image_out_wrap img'),
        img_src = '';

    if($(elem).attr('name')=='image_src'){
if(debug){console.log('Update image source');}
      img_src = value+$(elem).siblings('.image_params_input').val();
    }else{
if(debug){console.log('Update image parameters');}
      img_src = $(elem).siblings('.image_src_input').val()+value;
    }

    $(img_elem).attr('src', 'https://s7d2.scene7.com/is/image/aeo/'+img_src);
  }
  function updateButtonTypeSelect(elem,val){
  //       if(val=='url'){
// if(debug){console.log('Root is no longer required');}
  //         $(elem).next().attr('required',false);
  //       }else{
// if(debug){console.log('Root is now required');}
  //         $(elem).next().attr('required','required');
  //       }

    if(val=='deep_link'){
if(debug){console.log('Build deep link types');}
      var deep_link = '';

      for (var i=0; i<deep_links.length; i++) {
        deep_link += '<option value="'+deep_links[i].val+'">'+deep_links[i].display_name.replace(/_+/g,' ')+'</option>';
      }

      deep_link = '<select name="link" class="button_link capitalize" required>'+deep_link+'</select>';

      $(elem).siblings('.button_link').replaceWith(deep_link);
    }else{
      var placeholder = '';

      if(val=='category'){
        placeholder = 'catXXXXXX';
      }else if(val=='product'){
        placeholder = 'XXXX_XXXX_XXX';
      }else if(val=='url'){
        placeholder = 'http://www.url.com';
      }else{
        placeholder = 'Link Info';
      }

      $(elem).siblings('.button_link').replaceWith('<input class="button_link trim" type="text" placeholder="'+placeholder+'" value="" required name="link">');
    }
  }
  function updateColor(elem,val,data){
if(debug){console.log('Update colors');}
    $(elem).parents('form').find('.color').css(data, val);
  }
  function updateOutput(elem,val,parent,multi){
    if(parent){
      parent = '.'+parent+' ';
    }else{
      parent = '';
    }

    if(multi){
if(debug){console.log('Update multiple outputs');}
      var elem_parent  = $(elem).parent(),
          elem_index   = $(elem_parent).index(),
          output_elems = $(elem).parents('form').find(parent+'.'+$(elem).attr('name')+'_out');

      $(output_elems[elem_index]).html(val);
    }else{
if(debug){console.log('Update output');}
      var output_elem = $(elem).parents('form').find(parent+'.'+$(elem).attr('name')+'_out');

      $(output_elem).html(val);
    } 
  }

  function removeObj(elem){
    checkForErrors(elem);

    var parent = $(elem).parents('form'),
        type = $(parent).attr('data-type');

    $(parent).remove();
if(debug){console.log('Remove '+type);}
    if(type=='card'){
      updateCardSelect();
      checkCards();
    }
  }
  function removeThis(elem,type){
    checkForErrors(elem);

    if(type){
if(debug){console.log('Remove '+type);}
      var fieldset = $(elem).parents('fieldset[name="'+type+'"]');

      $(elem).parent().remove();

      var fieldsets = $(fieldset).find('fieldset');

      if(fieldsets.length<=0){
        $(fieldset).remove();
      }
    }else{
if(debug){console.log('Remove');}
      $(elem).parent().remove();
    }
  }
  function removeMult(elem,type){
    checkForErrors(elem);
if(debug){console.log('Remove multiple');}
    var elem_parent  = $(elem).parent(),
        elem_index   = $(elem_parent).index(),
        output_elems = $(elem).parents('form').find('.'+type);

    $(elem_parent).remove();
    $(output_elems[elem_index]).remove();
  }

  function createPromotionString(input_data){
if(debug){console.log('Create promotion string');}
    var outputString = '<form data-type="promotion" class="promotion">'+
      '<table>'+
        '<tr>'+
          '<td class="section inputs">'+
            '<div class="section_content input_fields">'+
              '<fieldset name="timer">' +
                '<fieldset class="timer">'+
                  '<label>Start Time:</label>' +
                  '<input name="start_date" type="date" placeholder="yyyy-dd-mm" value="'+(input_data?input_data.timer.start_date:'')+'" class="start_date_input" required>' +
                  '<input name="start_time" type="time" placeholder="hh:mm 24hr" value="'+(input_data?input_data.timer.start_time:'')+'" class="start_time_input" required>' +
                  '<div class="clear"></div>' +
                  '<label>End Time:</label>' +
                  '<input name="end_date" type="date" placeholder="yyyy-dd-mm" value="'+(input_data?input_data.timer.end_date:'')+'" class="end_date_input" required>' +
                  '<input name="end_time" type="time" placeholder="hh:mm 24hr" value="'+(input_data?input_data.timer.end_time:'')+'" class="end_time_input" required>' +
                '</fieldset>' +
              '</fieldset>' +
              '<fieldset>'+
                '<label>Promo Code:</label>' +
                '<input name="code" type="text" value="'+(input_data?input_data.code:'')+'" class="promoCode trim" required>' +
              '<fieldset>'+
              '</fieldset>'+
                '<label>Auto Apply:</label>' +
                '<select name="auto_apply" class="promoApply">' +
                  '<option value="true" '+(input_data?(input_data.auto_apply=='true'?'selected':''):'selected')+'>True</option>' +
                  '<option value="false" '+(input_data?(input_data.auto_apply=='false'?'selected':''):'')+'>False</option>' +
                '</select>' +
                '<button type="button" class="btn removePromotionBtn red form_btn" onclick="removeObj(this);">Remove Promotion</button>' +
              '</fieldset>'+
            '</div>'+
          '</td>'+
        '</tr>'+
      '</table>'+
    '</form>';

    return outputString;
  }
  function createElemString(input_data,type){
if(debug){console.log('Create element string');}
    var timerString     = '',
        actionString    = '',
        actionOutString = '',
        promoString     = '',
        secondaryString = '',
        colorString     = '',
        layoutString    = '',
        expandString    = '',
        controlString   = '',
        promo_data      = null,
        secondary_data  = null;
    
    if(input_data){
      var timer_data      = input_data.timer,
          action_data     = input_data.action_items;

      promo_data      = (input_data.copy?input_data.copy.promo:'');
      promoString     = (promo_data?createPromoString(promo_data):'');
      secondary_data  = input_data.secondary_copy;
      secondaryString = (secondary_data?createSecondaryString(secondary_data):'');

      if(timer_data){
        timerString = '<fieldset name="timer" data-type="array">'+createTimerString(timer_data)+'</fieldset>';
      }

      if(action_data){
        actionString = '<fieldset name="action_items" data-type="array" class="actionItemWrap actionItems tip">';

        for(var i=0; i<action_data.length; i++){
          actionString    += createActionString(action_data[i]);
          actionOutString += createActionOutString(action_data[i]);
        }
        actionString += '</fieldset>';
      }
    }

    if(type=='banner'){
      colorString = '<fieldset name="styling" class="inline">'+
        '<fieldset>'+
          '<label>Font Color:</label>' +
          '<input name="font_color" type="text" oninput="updateColor(this,value,\'color\')" placeholder="#000000" value="'+(input_data?(input_data.styling?(input_data.styling.font_color?input_data.styling.font_color:''):''):'')+'" class="color_input trim">'+
          '<div class="clear"></div>'+
          '<label>Background Color:</label>' +
          '<input name="background_color" type="text" oninput="updateColor(this,value,\'background-color\')" placeholder="#ffffff" value="'+(input_data?(input_data.styling?(input_data.styling.background_color?input_data.styling.background_color:''):''):'')+'" class="background_color_input trim">'+
        '</fieldset>'+
      '</fieldset>';

      layoutString = '<td class="section output">'+
        '<div class="section_content">'+
          '<div class="image_out_wrap">'+
            '<img src=""/>'+
          '</div>'+
          '<div class="copy_out_wrap color">'+
            '<div class="headline_out"></div>'+
            '<div class="main_message_out"></div>'+
          '</div>'+
        '</div>'+
      '</td>';
    }else{
      type = 'card';

      layoutString = '<td class="section output">'+
        '<div class="section_content">'+
          '<div class="image_out_wrap">'+
            '<img src=""/>'+
          '</div>'+
          '<div class="copy_out_wrap">'+
            '<div class="headline_out"></div>'+
            '<div class="main_message_out"></div>'+
            '<div class="promo_out_wrap '+(promo_data?'':'hide')+'">'+
              '<div class="copy_out"></div>'+
              '<div class="code_out"></div>'+
            '</div>'+
            '<div class="disclaimer_out"></div>'+
          '</div>'+
          '<div class="action_items_out_wrap">'+actionOutString+'</div>'+
        '</div>'+
      '</td>'+
      '<td class="section secondary_output">'+
        '<div class="section_content">'+
          '<div class="headline_out"></div>'+
          '<div class="main_message_out"></div>'+
          '<div class="promo_out_wrap '+(promo_data?'':'hide')+'">'+
            '<div class="copy_out"></div>'+
            '<div class="code_out"></div>'+
          '</div>'+
          '<div class="disclaimer_out"></div>'+
          '<div class="barcodes_out_wrap">'+(secondaryString?secondaryString[1]:'')+'</div>'+
          '<div class="cta_out_wrap">'+
            '<div class="cta_out"></div>'+
          '</div>'+
          '<div class="terms_out_wrap">'+(secondaryString?secondaryString[2]:'')+'</div>'+
          '<div class="copyright_out"></div>'+
        '</div>'+
      '</td>';

      expandString = '<div class="minMax">'+
        '<button type="button" onclick="minimize(this,true)" class="btn minBtn x">-</button>'+
        '<button type="button" onclick="minimize(this)" class="btn maxBtn x">+</button>'+
      '</div>';

      controlString = '<label>Duplicate Card:</label>' +
      '<input type="checkbox" onchange="checkDups()" class="duplicate_card_checkbox">'+
      '<label>Move Card:</label>' +
      '<select onchange="changeCardOrder(this,value)" class="card_order_select"></select>';
    }

    var outputString = '<form data-type="'+ type +'" class="'+ type +' '+(input_data&&type==='card'?'minimize':'')+'">'+
      '<table>'+
        '<tr>'+
          '<td class="section inputs">'+
            '<div class="section_content input_fields">'+
              expandString+
              '<div class="card_controls">'+
                controlString+
                '<button type="button" onclick="removeObj(this);" class="btn removeCardBtn red form_btn">Delete '+ type +'</button>'+
              '</div>'+
              timerString+
              '<button type="button" onclick="addTimer(this)" class="btn addTimerBtn green top tip form_btn">Add Timers</button>'+
              '<fieldset data-type="array" class="deviceSelectWrap tip inline">'+
                '<select name="devices" multiple="multiple" class="deviceSelect">'+
                  '<option value="ios" '+(input_data?(input_data.devices?(input_data.devices.indexOf('ios')!=-1?'selected':''):'selected'):'selected')+'>iOS</option>'+
                  '<option value="android" '+(input_data?(input_data.devices?(input_data.devices.indexOf('android')!=-1?'selected':''):'selected'):'selected')+'>Android</option>'+
                '</select>'+
              '</fieldset>'+
              '<fieldset data-type="array" class="locationSelectWrap tip inline top">'+
                '<select name="locations" multiple="multiple" class="locationSelect capitalize">'+addLocations((input_data?input_data.locations:''))+'</select>'+
              '</fieldset>'+
              '<fieldset name="image">'+
                '<fieldset>'+
                  '<label>Image URL:</label>' +
                  '<input name="image_src" type="text" oninput="updateImgUrl(this,value)" placeholder="scene7 name" value="'+(input_data?(input_data.image?(input_data.image.image_src?input_data.image.image_src:''):''):'')+'" class="image_src_input trim" required>'+
                  '<input name="image_params" type="text" oninput="updateImgUrl(this,value)" placeholder="parameters" value="'+(input_data?(input_data.image?(input_data.image.image_params?input_data.image.image_params:''):''):paramDefault)+'" class="image_params_input trim">' +
                '</fieldset>'+
              '</fieldset>'+
              '<fieldset name="copy">'+
                '<fieldset>'+
                  '<label>Headline:</label>' +
                  '<input name="headline" type="text" oninput="updateOutput(this,value);" placeholder="headline" value="'+(input_data?(input_data.copy?(input_data.copy.headline?input_data.copy.headline:''):''):'')+'" class="headline_input">'+
                  '<div class="clear"></div>'+
                  '<label>Main Message:</label>' +
                  '<input name="main_message" type="text" oninput="updateOutput(this,value);" placeholder="main message" value="'+(input_data?(input_data.copy?(input_data.copy.main_message?input_data.copy.main_message:''):''):'')+'" class="main_message_input">'+
                  '<div class="clear"></div>'+
                  '<label>Disclaimer:</label>' +
                  '<input name="disclaimer" type="text" oninput="updateOutput(this,value);" placeholder="disclaimer" value="'+(input_data?(input_data.copy?(input_data.copy.disclaimer?input_data.copy.disclaimer:''):''):'')+'" class="disclaimer_input">'+
                '</fieldset>'+
                '<select onchange="togglePromo(this,value)" class="promoSelect inline top brown_border">'+
                  '<option value=0>No Promotion</option>'+
                  '<option value=1 '+(promo_data?'selected':'')+'>Promotion</option>'+
                '</select>'+
                promoString+
              '</fieldset>'+
              '<select onchange="toggleSecondary(this,value)" class="secondarySelect blue_border">'+
                '<option value=0>No Additional Copy</option>'+
                '<option value=1 '+(secondary_data?'selected':'')+'>Additional Copy</option>'+
              '</select>'+
              (secondaryString?secondaryString[0]:'')+
              colorString+
              actionString+
              '<button data-type="action_items" type="button" onclick="addAction(this);" class="btn addActionItemsBtn green tip block form_btn">Add Action Item</button>'+
            '</div>'+
          '</td>'+
          layoutString+
        '</tr>'+
      '</table>'+
      '<button type="submit" class="hide"></button>'+
    '</form>';

    return outputString;
  }
  function createTimerString(input_data){
if(debug){console.log('Create timer string');}
    var outputString = '';
    if(!Array.isArray(input_data)){
      outputString = '<fieldset class="timer">'+
        '<label class="small">Start Time:</label>' +
        '<input name="start_date" type="date" placeholder="yyyy-dd-mm" value="'+(input_data?(input_data.start_date?input_data.start_date:''):'')+'" class="start_date_input validate_date" '+(input_data?(input_data.start_time?'required':''):'required')+'>'+
        '<input name="start_time" type="time" placeholder="hh:mm 24hr" value="'+(input_data?(input_data.start_time?input_data.start_time:''):setTime)+'" class="start_time_input validate_time" '+(input_data?(input_data.start_date?'required':''):'')+'>' +
        '<label class="small">End Time:</label>' +
        '<input name="end_date" type="date" placeholder="yyyy-dd-mm" value="'+(input_data?(input_data.end_date?input_data.end_date:''):'')+'" class="end_date_input validate_date" '+(input_data?(input_data.end_time?'required':''):'required')+'>'+
        '<input name="end_time" type="time" placeholder="hh:mm 24hr" value="'+(input_data?(input_data.end_time?input_data.end_time:''):setTime)+'" class="end_time_input validate_time" '+(input_data?(input_data.end_date?'required':''):'')+'>' +
        '<button class="btn removeTimerBtn red x form_btn" type="button" onclick="removeThis(this,\'timer\');">X</button>'+
      '</fieldset>';
    }else{
      for (var i = 0; i < input_data.length; i++) {
        outputString += '<fieldset class="timer">'+
        '<label class="small">Start Time:</label>' +
        '<input name="start_date" type="date" placeholder="yyyy-dd-mm" value="'+(input_data[i]?(input_data[i].start_date?input_data[i].start_date:''):'')+'" class="start_date_input validate_date" '+(input_data[i]?(input_data[i].start_time?'required':''):'required')+'>'+
        '<input name="start_time" type="time" placeholder="hh:mm 24hr" value="'+(input_data[i]?(input_data[i].start_time?input_data[i].start_time:''):setTime)+'" class="start_time_input validate_time" '+(input_data[i]?(input_data[i].start_date?'required':''):'')+'>' +
        '<label class="small">End Time:</label>' +
        '<input name="end_date" type="date" placeholder="yyyy-dd-mm" value="'+(input_data[i]?(input_data[i].end_date?input_data[i].end_date:''):'')+'" class="end_date_input validate_date" '+(input_data[i]?(input_data[i].end_time?'required':''):'required')+'>'+
        '<input name="end_time" type="time" placeholder="hh:mm 24hr" value="'+(input_data[i]?(input_data[i].end_time?input_data[i].end_time:''):setTime)+'" class="end_time_input validate_time" '+(input_data[i]?(input_data[i].end_date?'required':''):'')+'>' +
        '<button class="btn removeTimerBtn red x form_btn" type="button" onclick="removeThis(this,\'timer\');">X</button>'+
      '</fieldset>';
      }
    }

    return outputString;
  }
  function createPromoString(input_data){
if(debug){console.log('Create promo string');}
    var outputString = '<fieldset name="promo" class="wrap inline brown_border">'+
      '<fieldset>'+
        '<label>Promo Copy:</label>' +
        '<input name="copy" type="text" oninput="updateOutput(this,value,\'promo_out_wrap\');" placeholder="Use Code:" value="'+(input_data?(input_data.copy?input_data.copy:''):'')+'" class="promo_copy_input" required>'+
        '<div class="clear"></div>'+
        '<label>Code:</label>' +
        '<input name="code" type="text" oninput="updateOutput(this,value,\'promo_out_wrap\');" placeholder="XXXXXXXX"  value="'+(input_data?(input_data.code?input_data.code:''):'')+'" class="promo_code_input trim" required>'+
      '</fieldset>'+
    '</fieldset>';

    return outputString;
  }
  function createSecondaryString(input_data){
if(debug){console.log('Create secondary string');}
    var barcodeString    = '',
        barcodeOutString = '',
        termsString      = '',
        copyrightString  = '';
    
    if(input_data){
      var barcode_data = input_data.barcodes,
          terms_data   = input_data.terms,
          copy_data    = input_data.copyright;

      if(barcode_data){
        barcodeString = '<fieldset name="barcodes" data-type="array" class="barcodeWrap">';

        for(var i=0; i<barcode_data.length; i++){
          barcodeString    += createBarcodeString(barcode_data[i]);
          barcodeOutString += createBarcodeOutString(barcode_data[i]);
        }
        barcodeString += '</fieldset>';
      }

      if(terms_data){
        termsString = createTermsString(terms_data);
      }

      if(copy_data){
        copyrightString = createCopyrightString(copy_data);
      }
    }
    var outputString = '<fieldset name="secondary_copy" class="wrap blue_border">'+
      barcodeString+
      '<button data-type="barcodes" type="button" onclick="addBarcode(this);" class="btn addBarcodeBtn green tip block form_btn">Add Barcode</button>'+
      '<fieldset>'+
        '<label>Call To Action:</label>' +
        '<input name="cta" type="text" oninput="updateOutput(this,value,\'cta_out_wrap\')" placeholder="Shop This Deal" value="'+(input_data?(input_data.cta?input_data.cta:''):'SHOP NOW')+'" class="secondary_cta_input">'+
      '</fieldset>'+
      '<select onchange="toggleTerms(this,value)" class="detailsSelect orange_border">'+
        '<option value=0>No Details</option>'+
        '<option value=1 '+(input_data?(input_data.terms?'selected':''):'')+'>Details</option>'+
      '</select>'+
      (termsString?termsString[0]:'')+
      copyrightString+
    '</fieldset>';

    return [outputString,barcodeOutString,(termsString?termsString[1]:'')];
  }
  function createBarcodeString(input_data){
if(debug){console.log('Create barcode string');}
    var outputString = '<fieldset class="wrap green_border inline relative">'+
      '<label>Auth Copy:</label>' +
      '<input name="title" type="text" oninput="updateOutput(this,value,\'barcode_out\',true)" placeholder="Show This Barcode To Redeem" value="'+(input_data?(input_data.title?input_data.title:''):'')+'" class="auth_copy_input" required>'+
      '<div class="clear"></div>'+
      '<label>Auth Code:</label>' +
      '<input name="auth_code" type="text" oninput="updateOutput(this,value,\'barcode_out\',true)" placeholder="7392F" value="'+(input_data?(input_data.auth_code?input_data.auth_code:''):'')+'" class="auth_code_input" required>'+
      '<div class="clear"></div>'+
      '<div class="inline barcodeTypeSelectWrap tip">'+
        '<select name="barcode" class="barcodeTypeSelect">'+
          '<option value=pdf417 '+(input_data?(input_data.barcode=='pdf417'?'selected':''):'')+'>pdf417</option>'+
          '<option value=code128 '+(input_data?(input_data.barcode=='code128'?'selected':''):'')+'>code128</option>'+
        '</select>'+
      '</div>'+
      '<button type="button" onclick="removeMult(this,\'barcode_out\');" class="inline btn red x removeBarcodeBtn form_btn">X</button>'+
    '</fieldset>';

    return outputString;
  }
  function createBarcodeOutString(input_data){
if(debug){console.log('Create barcode output string');}
    var outputString = '<div class="barcode_out"><div class="title_out">'+(input_data?input_data.title:'')+'</div><div class="barcode"><img src="http://www.ae.com/Images/coupons/barcodes/2014/1223/aff1.png"/></div><div class="auth_code_out">'+(input_data?input_data.auth_code:'')+'</div></div>';

    return outputString;
  }
  function createTermsString(input_data){
if(debug){console.log('Create terms string');}
    var outputString = '<fieldset data-type="array" name="terms">',
        termOutString = '';

    if(input_data){
      for(var i=0; i<input_data.length; i++){
        outputString  += createTermString(input_data[i]);
        termOutString += createTermOutString(input_data[i]);
      }
    }else{
      outputString += createTermString();
    }

    outputString += '</fieldset>';

    outputString = outputString+'<button data-type="terms" type="button" onclick="addTerm(this);" class="btn addTermsBtn green tip block form_btn">Add Terms</button>';

    return [outputString,termOutString];
  }
  function createTermString(input_data){
if(debug){console.log('Create term string');}
    var outputString = '<fieldset class="terms wrap orange_border inline">'+
      '<label>Details Title:</label>' +
      '<input name="copy_title" type="text" oninput="updateOutput(this,value,\'term_out\',true);" placeholder="Terms &amp; Conditions" value="'+(input_data?(input_data.copy_title?input_data.copy_title:''):'')+'"  class="details_title_input">'+
      '<button type="button" onclick="removeMult(this,\'term_out\');" class="inline btn red x removeTermsBtn form_btn">X</button>'+
      '<div class="clear"></div>'+
      '<label>Terms &amp; Conditions:</label>' +
      '<textarea name="copy" type="text" oninput="updateOutput(this,value,\'term_out\',true);" placeholder="Enter Terms &amp; Conditions here..." class="terms_input">'+(input_data?(input_data.copy?input_data.copy:''):'')+'</textarea>'+
    '</fieldset>';

    return outputString;
  }
  function createTermOutString(input_data){
if(debug){console.log('Create term output string');}
    var outputString = '<div class="term_out"><div class="copy_title_out">'+(input_data?input_data.copy_title:'')+'</div><div class="copy_out">'+(input_data?input_data.copy:'')+'</div></div>';

    return outputString;
  }
  function createCopyrightString(input_data){
if(debug){console.log('Create copyright string');}
    var outputString = '<fieldset class="copyright">'+
      '<label>Copyright:</label>'+
      '<input name="copyright" type="text" oninput="updateOutput(this,value)" placeholder="&copy; '+copyDate+' AEO MANAGEMENT CO. ALL RIGHTS RESERVED." value="'+(input_data?(input_data.copyright?input_data.copyright:'&copy; '+copyDate+' AEO MANAGEMENT CO. ALL RIGHTS RESERVED.'):'&copy; '+copyDate+' AEO MANAGEMENT CO. ALL RIGHTS RESERVED.')+'" class="copyright_input">'+
    '</fieldset>';

    return outputString;
  }
  function createActionString(input_data,type){
if(debug){console.log('Create action item string');}
    var outputString = '<fieldset class="wrap yellow_border">'+
      '<select id="buttonTypeSelect_" onchange="updateButtonTypeSelect(this,value)" class="buttonTypeSelect capitalize" required name="type">'+
        '<option value="">Select Type</option>'+
        addTypes((input_data?input_data:''))+
      '</select>'+
      // '<select class="buttonRootSelect" '+(input_data?(input_data.type=='url'?'':'required'):'required')+' name="root">'+
      //   '<option value="">Select Root</option>'+
      //   '<option value="ae" '+(input_data?(input_data.root=='ae'?'selected':''):'')+'>AE</option>'+
      //   '<option value="aerie" '+(input_data?(input_data.root=='aerie'?'selected':''):'')+'>aerie</option>'+
      // '</select>'+
      '<button onclick="removeMult(this,\'cta_out\');" type="button" class="btn red x removeActionItemBtn form_btn">X</button>'+
      '<div class="clear"></div>'+
      (type!='banner'?'<label>Button Copy:</label>' +
      '<input name="cta" type="text" oninput="updateOutput(this,value,\'action_items_out_wrap\',true)" placeholder="Shop Now" value="'+(input_data?(input_data.cta?input_data.cta:''):'')+'" class="button_copy" required>':'')+
      '<div class="clear"></div>'+
      '<label>Link:</label>' +
      '<input class="button_link trim" type="text" placeholder="Link Info" value="'+(input_data?(input_data.link?input_data.link:''):'')+'" required name="link">'+
      '<div class="clear"></div>'+
      '<label>Page Title:</label>' +
      '<input class="page_title" type="text" placeholder="Womens Tops" value="'+(input_data?(input_data.destination_title?input_data.destination_title:''):'')+'" name="destination_title">'+
      '<div class="clear"></div>'+
    '</fieldset>';

    return outputString;
  }
  function createActionOutString(input_data){
if(debug){console.log('Create action item output string');}
    var outputString = '<div class="cta_out">'+(input_data?input_data.cta:'')+'</div>';

    return outputString;
  }

  function checkCards(){
    var cards = $('.card');

    if(cards.length>0){
if(debug){console.log('Cards present');}
      $(generator_wrap).addClass("hasCards");
    }else{
if(debug){console.log('No cards to show');}
      $(generator_wrap).removeClass("hasCards");
    }

    cards = '';
  }
  function checkDups(){
    var duplicates = $('.card_controls .duplicate_card_checkbox:checked'),
        dupLength  = duplicates.length;

    $('.card').removeClass('dup');

    if(dupLength > 0){
if(debug){console.log('Duplicates present');}
      $(duplicates).parents('.card').addClass('dup');
      $(addCardBtn).addClass('dup');
    }else{
if(debug){console.log('No duplicates');}
      $(duplicates).parents('.card').removeClass('dup');
      $(addCardBtn).removeClass('dup');
    }

    duplicates = '';
  }
  function duplicateCards(){
if(debug){console.log('Duplicating cards');}
    var duplicates = $('.card.dup');

    for (var i=0; i<duplicates.length; i++) {
      var duplicate = $(duplicates[i]),
          clone = $(duplicate).clone(),
          dup_selects = $(duplicate).find('select'),
          clone_selects = $(clone).find('select');

      for (var x=0; x<dup_selects.length; x++) {
        var dup_select = $(dup_selects[x]),
            clone_select = $(clone_selects[x]);
            
        clone_select.val($(dup_select).val());
      }

      $(clone).appendTo(cards_table);
    }

    $('.card_controls .duplicate_card_checkbox').prop('checked', false);

    checkDups();

    updateCardSelect();

    duplicates = '';
    clones = '';
  }

  function changeCardOrder(elem,value){
if(debug){console.log('Change card order');}
    $(shadow).addClass('loading');

    var card_elems = $('.card'),
        card_elem  = $(elem).parents('form'),
        card_index = $(card_elem).index();

    if(card_index > value){
      $(card_elem).insertBefore($(card_elems[value]));
    }else{
      $(card_elem).insertAfter($(card_elems[value]));
    }

    jumpTo($(card_elem).offset().top);

    updateCardSelect();

    card_elems = '';
    card_elem = '';
  }

  function updateCardSelect(){
if(debug){console.log('Update card order option');}
    clearTimeout(debounce);

    debounce = setTimeout(function() {
      $(shadow).addClass('visible');
      $(shadow).addClass('loading');

      setTimeout(function(){
if(debug){console.log("updating card order");}
        var order_selects = $('.card .card_order_select');

        for (var i=0; i<order_selects.length; i++) {
          var select = $(order_selects[i]);

          $(select).empty();
          
          for (var x=0; x<order_selects.length; x++) {
            var selected = (i==x)?"selected":"";
            
            $(select).append('<option '+selected+' value='+x+'>'+(x+1)+'</option>');
          }
        }
        order_selects = '';
        if($('.slide.open').length<=0){
          $(shadow).removeClass('visible');
        }
        
        $(shadow).removeClass('loading');
      },100);
    }, 2000);
  }

  function organize(elem,override){
    save();

    $(organizeOutput).removeClass('temp');
    $(organizeOutput).removeClass('unvalidated');

    if($(elem).parent().hasClass('open')){
if(debug){console.log('Close grid and clear contents');}
      toggleShadow(elem);
      $('#card_sort_grid').remove();
    }else{
      if(override){
if(debug){console.log('VALIDATION OVERRIDDEN: Create organizing grid');}
        $(organizeOutput).addClass('unvalidated');

        displayCards();
      }else{
        var errors = $('.error');

        if(submitForms()&&errors.length<=0){
if(debug){console.log('Create organizing grid');}
          displayCards();
        }
      }
    }

    function displayCards(){
      toggleShadow(elem);
      
      $(elem).parent().removeClass('expand');

      var organize_content = $('#organize_content');

      if($(elem).parent().hasClass('open')){
if(debug){console.log('Collect data and build grid');}
        updateData();

        $(organize_content).append('<table id="card_sort_grid" class="card_sort_grid"><tr id="row_headers"></tr></table>');

        addRows();

        addColumns();

        addElems(data.mobile_app_data.card_data.banners,'banner');
        addElems(data.mobile_app_data.card_data.cards,'card');
      }else{
if(debug){console.log('Remove grid');}
        $('#card_sort_grid').remove();
      }
    }
  }

  function addRows(){
if(debug){console.log('Add rows to grid');}
    var ranges = getRanges(),
        width  = 100/(location_names.length+1);

    for (var i=0; i<ranges.length; i++) {
      var start      = ranges[i].start,
          end        = ranges[i].end,
          start_date = getFormattedDate(start,true,true),
          end_date   = getFormattedDate(end,true,true);

      if(start==setStartTimestamp){
        start_date = 'immediate';
      }
      if(end==setEndTimestamp){
        end_date = 'unending';
      }

      $('#card_sort_grid').append('<tr id="row_'+i+'" class="row" data-start="'+start+'" data-end="'+end+'"><td style="width:'+width+'%;"><div class="timeLabel">'+start_date+'<br/>'+end_date+'</div></td></tr>');      
    }
  }

  function addColumns(){
if(debug){console.log('Add columns to grid');}
    var width = 100/(location_names.length+1);

    $('#row_headers').append('<th style="width:'+width+'%;">Timers</th>');

    for (var i=0; i<location_names.length; i++) {
      var location_name = location_names[i];

      $('#row_headers').append('<th style="width:'+width+'%;">'+location_name.replace(/_+/g,' ')+'</th>');
      $('#card_sort_grid .row').append('<td class="spacedCell" data-location="'+location_name+'" style="width:'+width+'%;"></td>');
    }
  }

  function addElems(objs,type){
    if(objs){
if(debug){console.log('Organize cards into cells');}
      var iteration = 0;
      for (var i=0; i<objs.length; i++) {
        var obj     = objs[i],
            rows    = $('#card_sort_grid tr'),
            columns = assignLocations(obj),
            ranges  = getRanges(obj),
            device  = '';

        if(obj.devices){
          if(obj.devices.length==1){
            device = obj.devices;
          }
        }

        for (var z=0; z<ranges.length; z++) {
          var range = ranges[z];
          
          for (var x=1; x<rows.length; x++) {
            var cell_start  = range.start,
                cell_end    = range.end,
                row         = $(rows[x]),
                start_stamp = $(row).attr('data-start'),
                end_stamp   = $(row).attr('data-end');

            if(cell_start<=start_stamp&&cell_end>=end_stamp){
              for (var y=0; y<columns.length; y++) {
                var cell = $(row).find('td:eq('+(columns[y]+1)+')'),
                    cell_location = $(cell).attr('data-location'),
                    cell_content = '',
                    image_src,
                    image_params,
                    headline,
                    main_message,
                    promo_title,
                    promo_code,
                    disclaimer,
                    color,
                    bkgd_color;

                if(type=='card'){
                  image_src    = (obj.image?(obj.image.image_src   ? obj.image.image_src                    :''):'');
                  image_params = (obj.image?(obj.image.image_params? obj.image.image_params                 :''):'');
                  headline     = (obj.copy ?(obj.copy.headline     ? obj.copy.headline                      :''):'');
                  main_message = (obj.copy ?(obj.copy.main_message ? obj.copy.main_message                  :''):'');
                  promo_title  = (obj.copy ?(obj.copy.promo        ?(obj.copy.promo.copy?obj.copy.promo.copy:''):''):'');
                  promo_code   = (obj.copy ?(obj.copy.promo        ?(obj.copy.promo.code?obj.copy.promo.code:''):''):'');
                  disclaimer   = (obj.copy ?(obj.copy.disclaimer   ? obj.copy.disclaimer                    :''):'');

                  cell_content = '<div class="preview">'+
                    '<div class="card_image_wrap">'+
                      '<img src="https://s7d2.scene7.com/is/image/aeo/'+image_src+image_params+'"/>'+
                    '</div>'+
                    '<div class="copy_out_wrap">'+
                      '<div class="headline_out">'+headline+'</div>'+
                      '<div class="main_message_out">'+main_message+'</div>'+
                      '<div class="promo_out_wrap '+(promo_title!==''||promo_code!==''?'':'hide')+'">'+
                        '<div class="copy_out">'+promo_title+'</div>'+
                        '<div class="code_out">'+promo_code+'</div>'+
                      '</div>'+
                      '<div class="disclaimer_out">'+disclaimer+'</div>'+
                    '</div>'+
                  '</div>';

                  $(cell).append('<div class="cell '+(type=='card'?'sortable':'banner_cell')+' '+device+'" data-index="'+i+'" data-select="'+(iteration++)+'" data-type="'+type+'" data-start="'+start_stamp+'" data-end="'+end_stamp+'" data-location="'+cell_location+'">'+cell_content+'</div>');
                }else if(type=='banner'){
                  image_src    = (obj.image  ?(obj.image.image_src         ?obj.image.image_src         :''):'');
                  image_params = (obj.image  ?(obj.image.image_params      ?obj.image.image_params      :''):'');
                  headline     = (obj.copy   ?(obj.copy.headline           ?obj.copy.headline           :''):'');
                  main_message = (obj.copy   ?(obj.copy.main_message       ?obj.copy.main_message       :''):'');
                  color        = (obj.styling?(obj.styling.font_color      ?obj.styling.font_color      :''):'');
                  bkgd_color   = (obj.styling?(obj.styling.background_color?obj.styling.background_color:''):'');

                  cell_content = '<div class="image_out_wrap">'+
                    '<img src="https://s7d2.scene7.com/is/image/aeo/'+image_src+image_params+'"/>'+
                  '</div>'+
                  '<div class="copy_out_wrap color" style="color:'+color+';background-color:'+bkgd_color+'">'+
                    '<div class="headline_out">'+headline+'</div>'+
                    '<div class="main_message_out">'+main_message+'</div>'+
                  '</div>';

                  var banner_cells = $(cell).find('.banner_cell');

                  if(banner_cells.length<=0){
                    $(cell).append('<div class="cell '+(type=='card'?'sortable':'banner_cell')+' '+device+'" data-index="'+i+'" data-select="'+(iteration++)+'" data-type="'+type+'" data-start="'+start_stamp+'" data-end="'+end_stamp+'" data-location="'+cell_location+'">'+cell_content+'</div>');
                  }else{
                    $(banner_cells).html('<div class="cell '+(type=='card'?'sortable':'banner_cell')+' '+device+'" data-index="'+i+'" data-select="'+(iteration++)+'" data-type="'+type+'" data-start="'+start_stamp+'" data-end="'+end_stamp+'" data-location="'+cell_location+'">'+cell_content+'</div>');
                  }
                }
              }
            }
          }
        }
      }
    }
    $('.sortable').css('height',$('.preview img').height()+2);
    $('#card_sort_grid td').sortable({
      stop: function( event, ui ) {
if(debug){console.log('Card moved');}
        updateDataSelect();
      }
    });
  }

  function updateDataSelect(){
if(debug){console.log('Update data-select value');}
    var data_selects = $('#card_sort_grid [data-select]');

      for (var i=0; i<data_selects.length; i++) {
        $(data_selects[i]).attr('data-select', i);
      }
  }

  function assignLocations(obj){ 
if(debug){console.log('Assign locations');}
    var locations = obj.locations,
        vals = [];

    if(locations){
      for (var i=0; i<locations.length; i++) {
        var location = locations[i],
            val = location_names.indexOf(location);

        if(vals.indexOf(val)==-1){
          vals.push(val);
        }
      }
    }else{
      for (var x=0; x<location_names.length; x++) {
        vals.push(x);
      }
    }

    return vals;
  }

  function openOutput(elem){
    if(!$(elem).parent().hasClass('expand')){
if(debug){console.log('Show JSON');}
      createOutput();
    }
    
    $(elem).parent().toggleClass('expand');
  }

  function createOutput(temp){
    updateData();

    if(!temp){
      $(organizeOutput).removeClass('temp');
      $(temp_date_input).val('');
      $(temp_time_input).val('');
    }else{
      $(organizeOutput).addClass('temp');
    }

    var types = ['banner','card'],
        elems = [],
        temp_time;

    for (var i=0; i<types.length; i++) {
      var type = types[i];

      elems = $('.cell[data-type="'+type+'"]');

      if(temp){
        var temp_elems = [],
            temp_date;

        if(!$(temp_date_input).val()&&!$(temp_time_input).val()){
          temp_time = new Date().getTime();
        }else if(!$(temp_date_input).val()){
          temp_date = new Date().getTime();
          temp_date = getFormattedDate(temp_date);
          temp_date = temp_date.split(' ');
          temp_date = temp_date[0];
          temp_time = getTimestamp(temp_date,$(temp_time_input).val());
        }else if(!$(temp_time_input).val()){
          temp_date = new Date().getTime();
          temp_date = getFormattedDate(temp_date);
          temp_date = temp_date.split(' ');
          temp_date = temp_date[1];
          temp_time = getTimestamp($(temp_date_input).val(),temp_date);
        }else{
          temp_time = getTimestamp($(temp_date_input).val(),$(temp_time_input).val());
        }

        if(!temp_time){
          temp_time = new Date().getTime();
        }

        temp_commit_date = getFormattedDate(temp_time,true,true);

        for (var x=0; x<elems.length; x++) {
          if($(elems[x]).attr('data-start')<=temp_time&&$(elems[x]).attr('data-end')>temp_time){
            temp_elems.push(elems[x]);
          }
        }

        elems = temp_elems;

if(debug){console.log('Create test JSON output');}
        createJSON(elems,type,temp);
      }else{
if(debug){console.log('Create JSON output');}
        temp_commit_date = '';

        createJSON(elems,type);
      }
    }

    if(temp){
if(debug){console.log('Create test promotion JSON output');}
      createTempPromoJSON(temp_time);
    }

    var jsonOut = JSON.stringify(data, null, '\t').replace(/[^\x00-\x7F^®©;]+/g,'');

    $(jsonOutput).val(jsonOut);
    $(jsonOutput).select();

    elems = '';
    jsonOut = '';
  }

  function createJSON(elems,type,temp){
if(debug){console.log("Creating JSON");}
    var obj_data = '';

    if(elems.length>0){
      for (var i=0; i<elems.length; i++) {
        var index        = $(elems[i]).attr('data-index'),
            location_val = $(elems[i]).attr('data-location'),
            start_stamp  = $(elems[i]).attr('data-start'),
            end_stamp    = $(elems[i]).attr('data-end'),
            obj          = {};

        obj = data.mobile_app_data.card_data[type+'s'][index];

        if((start_stamp!=setStartTimestamp||end_stamp!=setEndTimestamp)&&!temp){
          obj.timer = {};

          if(start_stamp!=setStartTimestamp){
            var start = getFormattedDate((start_stamp?start_stamp:$(elems[i]).attr('data-start')));

            start = start.split(' ');

            obj.timer.start_date = start[0];
            obj.timer.start_time = start[1];
          }
          if(end_stamp!=setEndTimestamp){
            var end = getFormattedDate((end_stamp?end_stamp:$(elems[i]).attr('data-end')));

            end = end.split(' ');

            obj.timer.end_date = end[0];
            obj.timer.end_time = end[1];
          }
        }else{
          delete obj.timer;
        }
        
        obj.locations = [];
        obj.locations = [location_val];

        obj_data += JSON.stringify(obj) + (i<elems.length-1?',':'');
      }

      data.mobile_app_data.card_data[type+'s'] = JSON.parse('['+obj_data+']');
    }else{
      delete data.mobile_app_data.card_data[type+'s'];
    }

  }

  function createTempPromoJSON(temp_time){
if(debug){console.log("Creating temporary promotion JSON");}
    if(data.mobile_app_data.promotions){
      var promo_obj_data = '',
          promo_objs = {},
          iteration = 0;

          promo_objs = data.mobile_app_data.promotions;

      for (var x=0; x<promo_objs.length; x++) {
        var promo_obj    = promo_objs[x],
            promo_ranges = getRanges(promo_obj),
            promo_start  = promo_ranges[0].start,
            promo_end    = promo_ranges[0].end;

        if(promo_start<=temp_time&&promo_end>temp_time){
          promo_obj.timer = {};
          
          promo_start = new Date();
          promo_end   = new Date();
          
          promo_start = promo_start.getTime();
          promo_end   = promo_end.getTime();
          
          promo_end  += 86400000 * 5;
          
          promo_start = getFormattedDate(promo_start);
          promo_end   = getFormattedDate(promo_end);
          
          promo_start = promo_start.split(' ');
          promo_end   = promo_end.split(' ');

          promo_obj.timer.start_date = promo_start[0];
          promo_obj.timer.start_time = '00:00';
          promo_obj.timer.end_date = promo_end[0];
          promo_obj.timer.end_time = '23:59';

          promo_obj_data += (iteration>0?',':'') + JSON.stringify(promo_obj);

          iteration++;
        }
      }
      data.mobile_app_data.promotions = JSON.parse('['+promo_obj_data+']');
    }
  }

  $(doc).delegate('.sortable', 'click', function(){
    $(shadow).addClass('loading');
    $(addCardBtn).removeClass('dup');

    createOutput();

    applyJSON($(this).data('select'));
  });

  function applyJSON(jump_to){
    $(shadow).addClass('loading');
    $(organizeOutput).removeClass('open');
    $(organizeOutput).removeClass('expand');
    $(shadow).removeClass('visible');

    $('#card_sort_grid').remove();

    card_backup = $('.card').clone();
    banner_backup = $('.banner').clone();
    promotion_backup = $('.promotion').clone();

    setTimeout(function(){
if(debug){console.log('Apply JSON output');}
      displayOutput(JSON.parse($(jsonOutput).val()));

      if(jump_to >= 0){
if(debug){console.log('Jump to card ' + (jump_to+1));}
        var card_jump = $('.card');

        $(card_jump).addClass('minimize');

        $(card_jump[jump_to]).addClass('selected');
        $(card_jump[jump_to]).removeClass('minimize');

        jumpTo($(card_jump[jump_to]).offset().top);

        card_jump = '';
      }else{
        $(generator_wrap).scrollTop(0);
      }

      $(generator_wrap).addClass('undo');

      undo_apply = true;
    }, 1000);
  }

  function jumpTo(position){
if(debug){console.log('Scroll to ' + (position + $(generator_wrap).scrollTop() - $('header').outerHeight()));}
    $(generator_wrap).animate({
      'scrollTop': position + $('#generator_wrap').scrollTop() - $('header').outerHeight()
    },1000, function(){
      setTimeout(function(){
        $('.card').removeClass('selected');
      },2000);
    });
  }

  function undo(){
    undo_apply = false;

    $(shadow).addClass('loading');
    $(generator_wrap).removeClass('undo');

    setTimeout(function(){
if(debug){console.log('Revert cards');}
      $(cards_table).empty();
      $(banners_table).empty();
      $(promotions_table).empty();

      $(cards_table).html(card_backup);
      $(banners_table).html(banner_backup);
      $(promotions_table).html(promotion_backup);

      card_backup = '';
      banner_backup = '';
      promotion_backup = '';

      $(shadow).removeClass('loading');
    }, 1000);
  }

  function toggleShadow(elem){
if(debug){console.log('Toggle shadow');}
    if(elem){
      $(elem).parent().toggleClass('open');
    }

    $(shadow).toggleClass('visible');
  }

  $(shadow).on('click', function(){
    $(this).removeClass('visible');
    $('.open').removeClass('open');
    $('#card_sort_grid').remove();
  });

  function getRanges(objs){
if(debug){console.log('Collect timer ranges');}
    var timers     = [],
        timestamps = [],
        ranges     = [];

    if(objs===undefined){
      var banners = data.mobile_app_data.card_data.banners,
          cards   = data.mobile_app_data.card_data.cards;

      if(banners){
if(debug){console.log('Collecting all banner ranges');}
        timers.push(getTimers(banners));
      }
      if(cards){
if(debug){console.log('Collecting all card ranges');}
        timers.push(getTimers(cards));
      }
    }else{
if(debug){console.log('Collecting passed object ranges');}
      timers.push(getTimers(objs));
    }

    for (var x=0; x<timers.length; x++) {
      var timer_objs = timers[x];

      for (var y=0; y<timer_objs.length; y++) {
        var timer = timer_objs[y],
            start_date  = (timer.start_date==='')?'1970-01-01':timer.start_date,
            start_time  = (timer.start_time==='')?setTime     :timer.start_time,
            end_date    = (timer.end_date  ==='')?'9999-12-31':timer.end_date,
            end_time    = (timer.end_time  ==='')?setTime     :timer.end_time,
            start_stamp = getTimestamp(start_date,start_time),
            end_stamp   = getTimestamp(end_date,end_time);

        if(timestamps.indexOf(start_stamp)==-1){
          timestamps.push(start_stamp);
        }
        if(timestamps.indexOf(end_stamp)==-1){
          timestamps.push(end_stamp);
        }
      }
    }
    timestamps.sort(sortNumber);

    for (var g=0; g<timestamps.length-1; g++) {
      ranges[g] = {start:timestamps[g],end:timestamps[g+1]};
    }

    return ranges;
  }

  function getTimers(objs){
if(debug){console.log('Collect timers');}
    var timers = [];

    if(Array.isArray(objs)){
      for (var i=0; i<objs.length; i++) {
        createTimers(objs[i]);
      }
    }else{
      createTimers(objs);
    }

    function createTimers(obj){
      if(obj.timer){
        if(obj.timer.length){
          for (var x=0; x<obj.timer.length; x++) {
            timers.push(obj.timer[x]);
          }
        }else{
          timers.push(obj.timer);
        }
      }else{
        var temp_obj = {};

        temp_obj.start_date = '1970-01-01';
        temp_obj.start_time = setTime;
        temp_obj.end_date   = '9999-12-31';
        temp_obj.end_time   = setTime;

        timers.push(temp_obj);
      }  
    }

    return timers;
  }

  function sortNumber(a,b) {
    return a - b;
  }

  function getFormattedDate(timestamp,readable,day){
if(debug){console.log('Format timestamp into readable date');}
    var date = new Date(parseInt(timestamp));

    if(readable){
      date = (day?days[date.getDay()]+' ':'')+(date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear()+' '+(date.getHours() > 12?date.getHours() - 12:(date.getHours()===0?'12':date.getHours()))+':'+(date.getMinutes()<10?'0':'')+date.getMinutes()+(date.getHours() > 11?'PM':'AM');
    }else{
      date = date.getFullYear()+'-'+((date.getMonth()+1)<10?'0':'')+(date.getMonth()+1)+'-'+(date.getDate()<10?'0':'')+date.getDate()+' '+(date.getHours()<10?'0':'')+date.getHours()+':'+(date.getMinutes()<10?'0':'')+date.getMinutes();
    }

    return date;
  }

  function getTimestamp(date,time){
if(debug){console.log('Get timestamp from date');}
    date = date.split('-');

    var timestamp = new Date(date[1]+' '+date[2]+' '+date[0]+' '+time).getTime();

    return timestamp;
  }

  function minimize(elem,min){
    var section;

    if(elem===undefined){
      section = $('.card');
    }else{
      section = $(elem).parents('.card');
    }

    if(min){
if(debug){console.log('minimize');}
      $(section).addClass('minimize');
    }else{
if(debug){console.log('maximize');}
      $(section).removeClass('minimize');
    }
  }

  function getFullForm(){
if(debug){console.log('Create form JSON');}
    var obj = {};

    obj.mobile_app_data = {};

    getPromotions(obj.mobile_app_data);
    
    getCardData(obj.mobile_app_data);

    return obj;
  }

  function getPromotions(obj){
if(debug){console.log('Create promotion JSON');}
    var forms = $('#promotions form');

    createForms(obj,forms,'promotions');

    forms = '';
  }

  function getCardData(obj){
if(debug){console.log('Create card data JSON');}
    obj.card_data = {};

    getScroll(obj.card_data);
    getBanners(obj.card_data);
    getCards(obj.card_data);
  }

  function getScroll(obj){
if(debug){console.log('Create autoscroll delay JSON');}
    var new_obj = {},
    obj_data = collectData($('#autoscroll_delay'),new_obj);

    obj[Object.keys(obj_data)] = obj_data[Object.keys(obj_data)];
  }

  function getBanners(obj){
if(debug){console.log('Create banner JSON');}
    var forms = $('#banners form');

    createForms(obj,forms,'banners');

    forms = '';
  }

  function getCards(obj){
if(debug){console.log('Create card JSON');}
    var forms = $('#cards form');

    createForms(obj,forms,'cards');

    forms = '';
  }

  function createForms(obj,forms,type){
if(debug){console.log('Create JSON objects');}
    var forms_length = forms.length;

    if(forms_length>0){
      obj[type] = [];

      for (var i=0; i<forms.length; i++) {
        var new_obj = {};

        obj[type].push(collectData($(forms[i]).find('.input_fields'),new_obj));
      }
    }else{
      return;
    }
  }

  function collectData(elem,obj,type){
if(debug){console.log('Collect data from form');}
    var fieldsets = $(elem).children('fieldset'),
        temp_obj;

    for (var i=0; i<fieldsets.length; i++) {
      var fieldset  = fieldsets[i],
          temp_name = $(fieldset).attr('name'),
          temp_type = $(fieldset).attr('data-type');
      
      temp_obj  = obj;

      if(temp_type=='array' || type=='array'){
        createArray(fieldset,temp_obj,temp_name);
      }else{
        createObj(fieldset,temp_obj,temp_name);
      }
    }
    fieldsets = '';

    return temp_obj;
  }

  function createObj(elem,obj,name){
if(debug){console.log('Create object from form');}
    if(name){
      obj[name] = {};

      collectData(elem,obj[name]);
    }else{
      var obj_data = $(elem).serializeArray();
      
      for (var i=0; i<obj_data.length; i++) {
        obj[obj_data[i].name] = obj_data[i].value;
      }
    }
    return obj;
  }

  function createArray(elem,obj,name){
if(debug){console.log('Create array from form');}
    if(name){
      obj[name] = [];

      collectData(elem,obj[name],'array');
    }else{
      var obj_data = $(elem).serializeArray(),
          data_length = obj_data.length,
          array = false;
      
      if(data_length===0){
        return;
      }
      if(data_length==1){
        array = true;
      }else{
        for (var x=0; x<obj_data.length; x++) {
          try{
            if(obj_data[x].name==obj_data[x-1].name){
              array = true;
            }
          }catch(e){}
        }
      }

      if(array){
        obj[obj_data[0].name] = [];

        for (var y=0; y<obj_data.length; y++) {

          obj[obj_data[y].name].push(obj_data[y].value);
        }
      }else{
        var temp_obj = {};

        createObj(elem,temp_obj);

        obj.push(temp_obj);
      }

      return obj;
    }
  }

  function trim(elem){
if(debug){console.log('Trimming input');}
    var start = elem.selectionStart,
        end = elem.selectionEnd,
        untrimmed = $(elem).val(),
        trimmed = untrimmed.replace(/\s+/,'');

    $(elem).val(trimmed);

    elem.setSelectionRange(start, end);
  }

  function updateData(){
if(debug){console.log('Update JSON data');}
    data = getFullForm();
  }

  function checkTimers(){
if(debug){console.log('Check forms for timers');}
    var timers = $('.timer');

    for(var i=0; i<timers.length; i++){
      var elem = timers[i];

      validateTimer(elem,$(elem).find('.start_date_input').val(),$(elem).find('.start_time_input').val(),$(elem).find('.end_date_input').val(),$(elem).find('.end_time_input').val());
    }

    timers = '';
  }

  function validateTimer(elem,start_date,start_time,end_date,end_time){
if(debug){console.log('Check validity of timer');}
    start_date  = (start_date==='')?'1970-01-01':start_date;
    start_time  = (start_time==='')?setTime     :start_time;
    end_date    = (end_date  ==='')?'9999-12-31':end_date;
    end_time    = (end_time  ==='')?setTime     :end_time;

    if(getTimestamp(start_date,start_time)>=getTimestamp(end_date,end_time)){
      $(elem).addClass('error');
    }else{
      $(elem).removeClass('error');
    }

    checkForErrors(elem);
  }

  function checkForErrors(elem){
if(debug){console.log('Check form for errors');}
    var elem_parent = $(elem).parents('.inputs'),
        elem_section = $(elem).parents('.slide');
    
    setTimeout(function(){
      var form_errors = $(elem_parent).find('.error');

      if(form_errors.length>0){
        $(elem_parent).addClass('error');

        checkSectionErrors(elem_section);
      }else{
        $(elem_parent).removeClass('error');

        checkSectionErrors(elem_section);
      }

      form_errors = '';
    },100);
  }

  function checkSectionErrors(elem_section){
    var section_errors = $(elem_section).find('.error');

    if(section_errors.length>0){
      $(elem_section).addClass('error');
    }else{
      $(elem_section).removeClass('error');
    }
  }

  function submitForms(){
if(debug){console.log('Submit form for validation');}
    var validated = [],
        inputs = document.querySelectorAll('input,select');

    for (var i=inputs.length-1; i>0; i--) {
      if(!inputs[i].checkValidity()){
        $(inputs[i]).parents('.slide').addClass('error');
        $(inputs[i]).addClass('validation_error');
        validated.push(false);
      }
    }

    if(validated.indexOf(false)==-1){
      inputs = '';
      return true;
    }else{
      var forms = $('form');

      for (var x=forms.length-1; x>0; x--) {
        $(forms[x]).find('button[type="submit"]').trigger('click');
      }
      inputs = '';
      return false;
    }
  }

  function unsaved(){
    zone_written = false;
    prod_written = false;
    saved_written = false;
  }

  $(doc).delegate('form', 'submit', function(event){
    event.preventDefault();
  });

  $(doc).delegate('.form_btn', 'click', function(){
if(debug){console.log('Form button clicked');}
    unsaved();
  });

  $(doc).delegate('form', 'input', function(){
if(debug){console.log('Form input received');}
    unsaved();

    if(undo_apply){
if(debug){console.log('Clear "undo" values');}
      $(generator_wrap).removeClass('undo');

      card_backup = '';
      banner_backup = '';
      promotion_backup = '';

      undo_apply = false;
    }
  });

  $(doc).delegate('.trim', 'input', function(){
if(debug){console.log('Trimmed input changed');}
    
    trim(this);
  });

  $(doc).delegate('button', 'click', function(){
if(debug){console.log('Button clicked');}
    $(this).removeClass('tip');
  });

  $(doc).delegate('select', 'input', function(){
if(debug){console.log('Select input received');}
    $(this).parent().removeClass('tip');
  });

  $(doc).delegate('input[required="required"],select[required="required"]', 'input', function(){
if(debug){console.log('Required input received');}
    checkForErrors($(this));

    if(!this.checkValidity()){
      $(this).addClass('validation_error');
    }else{
      $(this).removeClass('validation_error');
    }
  });

  $(doc).delegate('.validate_date', 'input', function(){
if(debug){console.log('Date input received');}

    checkTimers();

    if(!$(this).val()){
      $(this).next().attr('required',false);
    }else{
      $(this).next().attr('required','required');
    }
  });

  $(doc).delegate('.validate_time', 'input', function(){
if(debug){console.log('Time input received');}

    checkTimers();

    if(!$(this).val()){
      $(this).prev().attr('required',false);
    }else{
      $(this).prev().attr('required','required');
    }
  });
