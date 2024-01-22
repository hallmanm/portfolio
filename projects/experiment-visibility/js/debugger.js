(function(){
  try{

    var awoDebugger = '<div id="at_debugger" class="at_debugger at_debugger_at">'+
        '<div id="at_peek" class="at_peek"></div>'+
        '<div class="at_header">'+
          '<div class="at_program">'+
            '<select id="at_program_select">'+
              '<option value="at">Adobe Target Debugger</option>'+
              '<option value="tl">Tealium Debugger</option>'+
            '</select>'+
          '</div>'+
          '<div class="at_tabs">'+
            '<span id="at_tab_activities" class="at_tab at_tab_active" data-target="activities"><span class="at_icon icon-international"></span></span>'+
            '<span id="at_tab_settings" class="at_tab" data-target="settings"><span class="at_icon icon-edit"></span></span>'+
            '<span id="at_tab_help" class="at_tab" data-target="help"><span class="at_icon icon-wismo_help"></span></span>'+
          '</div>'+
        '</div>'+
        '<div id="at_disable_mbox" class="at_disable_mbox"><span class="at_icon icon-warning"></span>Disable Adobe Target</div>'+
        '<div id="at_disable_debug" class="at_disable_debug">Disable Debugger<span class="at_icon icon-close"></span></div>'+
        '<div id="at_window_activities" class="at_window at_window_active custom-scrollbars">'+
          '<div class="at_section"><div id="at_activities" class="at_activities"></div></div>'+
        '</div>'+
        '<div id="at_window_settings" class="at_window at_window_settings custom-scrollbars">'+
          '<form id="at_form" class="at_form">'+
            '<div class="at_window_settings_at">'+
              '<a class="at_btn_launch" data-program="adobe">Launch Adobe Console</a>'+
              '<div class="at_section at_section_gender">'+
                '<div class="at_section_header">Set Gender</div>'+
                '<select style="width:100%;" name="awoGender">'+
                  '<option value="">Select Gender</option>'+
                  '<option value="male">Male</option>'+
                  '<option value="female">Female</option>'+
                  '<option value="aerie">Aerie</option>'+
                  '<option value="neutral">Neutral</option>'+
                '</select>'+
              '</div>'+
              '<div class="at_section">'+
                '<div class="at_section_header">Set Customer Id</div>'+
                '<input type="text" value="" placeholder="Enter Customer Id" pattern="\b\d+\b" name="awoCustId">'+
              '</div>'+
              '<div class="at_section">'+
                '<div class="at_section_header">Set IP</div>'+
                '<input type="text" value="" placeholder="Enter IP Address" pattern="\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b" name="mboxOverride.browserIp">'+
              '</div>'+
              '<div class="at_section">'+
                '<div class="at_section_header">Set Location</div>'+
                '<input type="text" value="" placeholder="Enter Location" pattern="\b\D+\b" name="awoLocation">'+
              '</div>'+
              '<div class="at_section at_section_user_groups">'+
                '<div class="at_section_header" style="display:block;">Set Audience Groups</div>'+
                '<div>'+
                  '<label>Two Groups</label>'+
                  '<select name="awoTwoGroups">'+
                    '<option value="">Select Group</option>'+
                    '<option value="a">A</option>'+
                    '<option value="b">B</option>'+
                  '</select>'+
                '</div>'+
                '<div>'+
                  '<label>Three Groups</label>'+
                  '<select name="awoThreeGroups">'+
                    '<option value="">Select Group</option>'+
                    '<option value="a">A</option>'+
                    '<option value="b">B</option>'+
                    '<option value="c">C</option>'+
                  '</select>'+
                '</div>'+
                '<div>'+
                  '<label>Ten Groups</label>'+
                  '<select name="awoTenGroups">'+
                    '<option value="">Select Group</option>'+
                    '<option value="a">A</option>'+
                    '<option value="b">B</option>'+
                    '<option value="c">C</option>'+
                    '<option value="d">D</option>'+
                    '<option value="e">E</option>'+
                    '<option value="f">F</option>'+
                    '<option value="g">G</option>'+
                    '<option value="h">H</option>'+
                    '<option value="i">I</option>'+
                    '<option value="j">J</option>'+
                  '</select>'+
                '</div>'+
              '</div>'+
              '<div class="at_section" style="text-align:right;">'+
                '<div class="at_section_header" style="float:left;">Cancel Activity Token</div>'+
                '<a class="at_cancel at_btn_red" data-atparam=\'["at_preview_token="]\' data-atclear=\'["at_preview_index","at_preview_listed_activities_only","at_preview_evaluate_as_true_audience_ids","at_preview_token"]\' tabindex="-1">Cancel</a>'+
                '<!-- <input type="text" value="" placeholder="Enter Adobe Token for Activity" name="at_preview_token">'+
                '<input type="text" value="" placeholder="Enter Activity Index" pattern="\b\d+\b" name="at_preview_listed_activities_only=true&at_preview_index"> -->'+
              '</div>'+
              '<div class="at_section" style="text-align:right;">'+
                '<div class="at_section_header" style="float:left;">Set Debug Token</div>'+
                '<a class="at_cancel at_btn_red" data-atparam=\'["mboxTrace=disable"]\' data-atclear=\'["mboxTrace","authorization"]\' tabindex="-1">Cancel</a>'+
                '<input type="text" value="" placeholder="Enter Adobe Token for Logs" pattern="\b[\w\d]{8}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}\b" name="mboxTrace=window&authorization">'+
              '</div>'+
            '</div>'+
            '<div class="at_window_settings_tl">'+
              '<a class="at_btn_launch" data-program="tealium">Launch Tealium Console</a>'+
              '<div class="at_section">'+
                '<div class="at_section_header">Set Environment</div>'+
                '<div class="at_tealium_version"><span>Current Version: </span><span id="tealium_version"></span></div>'+
                '<select id="at_env_select" style="width:100%;">'+
                  '<option value="dev">Dev</option>'+
                  '<option value="qa">QA</option>'+
                  '<option value="prod">Production</option>'+
                '</select>'+
              '</div>'+
              '<div class="at_section">'+
                '<div class="at_section_header">Tealium Logs</div>'+
                '<select id="tl_logs_select" style="width:100%;">'+
                  '<option value=\'false\'>Off</option>'+
                  '<option value=\'true\'>On</option>'+
                '</select>'+
              '</div>'+
            '</div>'+
            '<div class="at_section">'+
              '<div class="at_section_header">AWO Logs</div>'+
              '<select id="at_logs_select" style="width:100%;">'+
                '<option value=\'0\'>Off</option>'+
                '<option value=\'1\'>Normal</option>'+
                '<option value=\'2\'>Verbose</option>'+
              '</select>'+
            '</div>'+
            '<button type="reset" class="at_btn_red" style="margin-top:15px;" tabindex="-1">Clear</button>'+
            '<button type="submit" style="margin-top:15px;">Apply</button>'+
          '</form>'+
        '</div>'+
        '<div id="at_window_help" class="at_window custom-scrollbars">'+
          '<div class="at_section">'+
            '<ul>'+
              '<li>What is this?</li>'+
              '<p>This tool will help users determine which elements on the current page are being affected by Adobe Target. Also, this debugger will let the user quickly update "mbox" settings to change their experience.</p>'+
              '<li>Who can see this?</li>'+
              '<p>This tool is visible ONLY ON THE COPORATE IP ADDRESS in all environments. This is <strong>NOT PUCBLIC FACING</strong>.</p>'+
              '<li>Have more questions?</li>'+
              '<p>If you have more questions, please feel free to reach out to Michael Hallman [hallmanm@ae.com] or Jimmy Hunkele [hunkelej@ae.com].</p>'+
              '<li>More Info:</li>'+
              '<p><a href="https://wiki.ae.com/display/ABTesting/AWO+Debugger" target="_blank">Documentation</a></p>'+
              '<li>Legend:</li>'+
              '<p><span class="at_type at_type_ab">A/B</span> - Adobe Multivariate Test<br><span class="at_type at_type_rec">REC</span> - Adobe Recommendation<br><span class="at_type at_type_xt">XT</span> - Adobe Experience Targeting<br><span class="at_type at_type_tmp">TMP</span> - Tealium Template<br><span class="at_type at_type_ext">EXT</span> - Tealium Extension</p>'+
            '</ul>'+
          '</div>'+
        '</div>'+
      '</div>';

    var awo_url = window.location.href;
    var activeObj = {};
    var type = 'at';
    var tealium_account = '';
    var tealium_profile = '';
    var elem;
    var parameters = getParamObj(window.location.search.substring(1));

    var init = function(){
      $(awoDebugger).prependTo('#project');
      elem = document.getElementById('at_debugger');
      awo.debug('Debugger Init: '+elem,'pink');      
      setPresets();
      addListeners();
    };

    function getParamObj(str){
      var obj = {};
      var param_strs = decodeURIComponent(str).split('&');

      for (var i = 0; i < param_strs.length; i++) {
        var param_str = param_strs[i];

        if(param_str){
          var param = param_str.split('=');

          if(param.length){
            obj[param[0]] = param[1];
          }
        }
      }

      return obj;
    }

    function setPresets(){
      awo.debug('Debugger setPresets','pink');      
      for (var key in parameters) {
        var val = '';

        if(key === 'awoLocation'){
          val = parameters[key].replace(/\+/g,' ');
        }else if(parameters[key] != 'disable' && parameters[key] != 'window'){
          val = parameters[key];
        }

        $('#at_form :input[name*="'+ key +'"]').val(val);
      }

      $('#at_logs_select').val(awo.verbose);
      $('#tl_logs_select').val(awo.getCookie('utagdb'));
    }

    function getUtagData(){
      if(typeof utag_data !== 'undefined'){
        tealium_account = utag_data['ut.account'];
        tealium_profile = utag_data['ut.profile'];

        $('#tealium_version').text(utag_data['ut.version']);
        $('#at_env_select').val(utag_data['ut.env']);
      }
    }

    function addListeners(){
      awo.debug('Debugger addListeners','pink');      
      var peek = $(elem).find('#at_peek');
      var select = $(elem).find('#at_program_select');
      var tabs = $(elem).find('.at_tab');
      var windows = $(elem).find('.at_window');
      var mbox = $(elem).find('#at_disable_mbox');
      var debug = $(elem).find('#at_disable_debug');
      var env = $(elem).find('#at_env_select');
      var at_logs = $(elem).find('#at_logs_select');
      var tl_logs = $(elem).find('#tl_logs_select');
      var form = $(elem).find('#at_form');
      var cancel = $(elem).find('.at_cancel');

      $(window).click(function() {
        $(elem).removeClass('at_revealed');
      });

      $(elem).click(function(e){
        e.stopPropagation();
      });

      $(peek).on('click',function(){
        $(elem).toggleClass('at_revealed');

        // if($('.at_activity').length <= 0){
        if($(elem).hasClass('at_revealed')){
          $('.at_highlight').removeClass('at_highlight');
          createContent($(select).val());
        }
        // }
      });

      //for portfolio
      $(peek).trigger('click');

      $('.at_btn_launch').on('click',function(){
        if($(this).data('program') === 'tealium'){
          (function(){
            if(typeof __tealium_tagcompanion=="undefined"){
              __tealium_tagcompanion = document.createElement("SCRIPT");
              __tealium_tagcompanion.type = "text/javascript";
              __tealium_tagcompanion.src = "//tealium.hs.llnwd.net/o43/utui/utui.tagcompanion.js?v="+Math.random();

              document.getElementsByTagName("head")[0].appendChild(__tealium_tagcompanion);
            }
          })();
        }else if($(this).data('program') === 'adobe'){
          (function(){
            var at_win=window.open("","dp_debugger","width=600,height=600,location=0,menubar=0,status=1,toolbar=0,resizable=1,scrollbars=1");

            at_win.document.write('<script id="dbg" src="https://www.adobetag.com/d1/digitalpulsedebugger/live/DPD.js"></'+'script>');
          })();
        }
      });

      $(select).on('change',function(){
        type = $(this).val();
        activeObj = {};
        $('.at_highlight').removeClass('at_highlight');
        createContent();
        getUtagData();
        $(elem).removeClass('at_debugger_at');
        $(elem).removeClass('at_debugger_tl');
        $(elem).addClass('at_debugger_'+type);
      });

      $(tabs).on('click',function(){
        var target = $(this).data('target');

        $(tabs).removeClass('at_tab_active');
        $('#at_tab_'+target).addClass('at_tab_active');

        $(windows).removeClass('at_window_active');
        $('#at_window_'+target).addClass('at_window_active');
      });

      $(mbox).on('click',function(e){
        e.preventDefault();

        if (confirm("\u26A0 You are disabling all Adobe Target content.\n\nTo re-enable, you will need to add 'mboxEnable' to your url.") === true){
          window.open(window.location.pathname+'?mboxDisable=1','_self');
        }
      });

      $(debug).on('click',function(e){
        e.preventDefault();

        if (confirm("\u26A0 You are disabling the Adobe Target debugger.\n\nTo re-enable, you will need to add 'awoDebug=true' to your url.") === true){
          window.open(window.location.pathname+'?awoDebug=false','_self');
        }
      });

      $(env).on('change',function(){
        // document.cookie = 'utag_env_'+ tealium_account +'_'+ tealium_profile +'=//tags.tiqcdn.com/utag/americaneagle/awpmain/'+ $(this).val() +'/utag.js';
      });

      $(at_logs).on('change',function(){
        updateLocal($(this).val());
      });

      $(tl_logs).on('change',function(){
        document.cookie($(this).val());
      });

      $(form).on('submit',function(e){
        e.preventDefault();
        e.stopPropagation();

        updateParams(getParamObj($(form).not('.at_window_settings_tl :input').serialize()));

        refresh();
      });

      $(cancel).on('click',function(e){
        e.preventDefault();
        e.stopPropagation();

        clearParams($(this).data('atclear'));

        addParams($(this).data('atparam'));

        refresh();
      });
    }

    function updateParams(obj){
      for (var key in obj) {
        if(obj[key]){
          parameters[key] = obj[key];
        }else{
          delete parameters[key];
        }
      }
    }

    function clearParams(params){
      for (var i = 0; i < params.length; i++) {
        delete parameters[params[i]];
      }
    }

    function addParams(params){
      if(params.length){
          for (var i = 0; i < params.length; i++) {
            var param = params[i].split('=');

            parameters[param[0]] = param[1];
          }
        }
    }

    function refresh(){
      var params = '';

      if(parameters.authorization === undefined || parameters.authorization === ''){
        if(parameters.mboxTrace && parameters.mboxTrace !== 'disable'){
          delete parameters.mboxTrace;
        }
      }

      for (var key in parameters) {
        params += key + (parameters[key] !== undefined ? '=' + parameters[key] : '') + '&';
      }

      params = params.replace(/&$/,'');

      window.location = updateUrl(window.location.href.replace(/[?|&].*/,''),params);
    }

    function updateUrl(url,params){
      return url + (params !== '' ? checkParam(url) + params : '');
    }

    function checkParam(url){
      return url.indexOf('?') > -1 ? '&' : '?';
    }

    function updateLocal(verbose){
      var awoVerbose = verbose || '0';

      awo.verbose = awoVerbose;

      if(typeof window.localStorage !== 'undefined'){
        localStorage.setItem('awoVerbose',awoVerbose);
      }
    }

    function createContent(){
      var activities = $(elem).find('.at_activities');

      $(activities).empty();

      var content = createActivities();

      if(!!content){
        $(activities).html(content);

        createActiveObj(getElementList());

        handleActivities();
      }else{
        $(activities).html('<div class="at_section_header">There are currently no acitivites running on this page.</div>');
      }
    }

    function createActivities(){
      var program = awo[type];

      if(program.activities.length){
        var activities = program.activities;

        activities = reOrderActivities(activities);

        var content = '<div class="at_section_header">Acitivites currently running on this page:</div><div id="at_view_all" class="at_view_all" data-active="false">View All</div>';
        
        for (var i = 0; i < activities.length; i++) {
          var activity = activities[i];

          if(activity.elements){
            for (var x = 0; x < activity.elements.length; x++) {
              $(activity.elements[x]).addClass('at_highlight_'+activity.type);
            }
          }

          if(activity.info || activity.elements){
            content += '<div class="at_activity'+ (activity.info ? ' at_arrow' : '') +'" data-activity="'+ activity.iter +'" data-active="false">'+ activity.name +
              (activity.info ? '<div class="at_info">' +
                (activity.info.desc ? '<div class="at_desc custom-scrollbars">'+ activity.info.desc +'</div>' : '') +
                (activity.info.jira ? '<a class="at_jira" href="//jira.com/browse/'+ activity.info.jira +'" target="_blank">JIRA '+ activity.info.jira +'</a>' : '') +
              '</div>' : '') +
            '</div>';
          }
        }

        return content;
      }else{
        return false;
      }
    }

    function reOrderActivities(activities){
      var all = [];
      var ab  = [];
      var rec = [];
      var xt  = [];
      var tmp = [];
      var ext = [];
      var gen = [];

      for (var i = 0; i < activities.length; i++) {
        var activity = activities[i];

        activity.iter = i;

        if(activity.name.match(/a\/b\s/i) || activity.type === 'ab'){
          activity.name = activity.name.replace(/a\/b - /i,'<span class="at_type at_type_ab">A/B</span>');
          activity.type = 'ab';
          ab.push(activity);
        }else if(activity.name.match(/rec\s/i) || activity.type === 'rec'){
          activity.name = activity.name.replace(/rec - /i,'<span class="at_type at_type_rec">REC</span>');
          activity.type = 'rec';
          rec.push(activity);
        }else if(activity.name.match(/xt\s/i) || activity.type === 'xt'){
          activity.name = activity.name.replace(/xt - /i,'<span class="at_type at_type_xt">XT</span>');
          activity.type = 'xt';
          xt.push(activity);
        }else if(activity.name.match(/template\s/i) || activity.type === 'tmp'){
          activity.name = activity.name.replace(/template - /i,'<span class="at_type at_type_tmp">TMP</span>');
          activity.type = 'tmp';
          tmp.push(activity);
        }else if(activity.name.match(/extension\s/i) || activity.type === 'ext'){
          activity.name = activity.name.replace(/extension - /i,'<span class="at_type at_type_ext">EXT</span>');
          activity.type = 'ext';
          ext.push(activity);
        }else{
          activity.type = 'gen';
          gen.push(activity);
        }
      }

      return all.concat(ab,rec,xt,tmp,ext,gen);
    }

    function handleActivities(){
      var activity_btns = $(elem).find('.at_activity[data-activity]');
      var view_all = $(elem).find('#at_view_all');

      $(view_all).on('click',function(){
        recordAction(toggleActive(this));
        toggleHighlight();
      });

      for (var x = 0; x < activity_btns.length; x++) {
        var activity_btn = $(activity_btns)[x];

        $(activity_btn).on('click',function(){
          var activity = $(this).data('activity');

          recordAction(toggleActive(this),getElementList(activity),activity);

          toggleHighlight();

          if($(elem).find('.at_activity[data-active="false"]').length > 0){
            $(view_all).attr('data-active','false');
          }else{
            $(view_all).attr('data-active','true');
          }
        });
      }
    }

    function createActiveObj(elems){
      for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];

        activeObj[elem] = [];
      }
    }

    function toggleActive(el){
      if($(el).attr('data-active') === 'true'){
        $(el).attr('data-active','false');

        return false;
      }else{
        $(el).attr('data-active','true');

        return true;
      }
    }

    function getElementList(activity){
      var program = awo[type];
      var activities = program.activities || {};
      var elems = [];

      if(activity === undefined){
        for (var i = 0; i < activities.length; i++) {
          if(activities[i].elements){
            for (var j = 0; j < activities[i].elements.length; j++) {
              if(elems.indexOf(activities[i].elements[j]) < 0){
                elems.push(activities[i].elements[j]);
              }
            }
          }
        }
      }else{
        if(activities[activity].elements){
          elems = activities[activity].elements;
        }else{
          return false;
        }
      }

      return elems;
    }

    function recordAction(active,objs,activity){
      if(objs === undefined){
        var activities = $('.at_activity');

        for (var y = 0; y < activities.length; y++) {
          var activity_elem = $(activities)[y];

          $(activity_elem).attr('data-active',active);
        }

        for (var key in activeObj) {
          activeObj[key] = [];
        }

        if(active){
          for (var j = 0; j < activities.length; j++) {
            recordAction(true,getElementList(j),j);
          }
        }
      }else{
        activity = parseInt(activity);

        for (var i = 0; i < objs.length; i++) {
          var obj = objs[i];

          if(active){
            activeObj[obj].push(activity);
          }else{
            activeObj[obj].pop(activity);
          }
        }
      }
    }

    function toggleHighlight(){
      for (var obj in activeObj) {
        if(activeObj[obj].length > 0){
          highlight(obj,true);
        }else{
          highlight(obj,false);
        }
      }
    }

    function highlight(str,active){
      var elems = $(str);

      for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];

        if(active){
          $(elem).addClass('at_highlight');
        }else{
          $(elem).removeClass('at_highlight');
        }
      }
    }

      awo.debug("Debugger Active - v8 - Internal IP Only");

      // if(typeof window.localStorage !== 'undefined'){
      //   if(awo_url.match(/awoDebug=false/ig)){
      //     localStorage.removeItem('awoDebug');
      //   }else if(localStorage.getItem('awoDebug') || awo_url.match(/awoDebug=true/ig)){
      //     localStorage.setItem('awoDebug','true');

      //     awo.runPoll2('Debugger jQuery','jQuery',init);
      //   }
      // }

      awo.runPoll2('Debugger jQuery','jQuery',init);

    //awo.setStyles(activity_style);
    
  }catch(e){console.log(e);}
})();