try {
  // create global object for Adobe Target 
  window.awo = window.awo && window.awoLoaded ? window.awo : {
    tl: { //tealium debugger info
      "activities": [
        {
          "name": "Template - uTag_Sync - utag.sync.js",
          "info": {
            "desc": "Loading Adobe visitor.js v1.7, Adobe at.js v1.7 and including custom 'awo' object"
          }
        }
      ]
    },
    at: { //Adobe TnT info
      "activities": [],  //TnT debugger info
      "widgets": {
        "designs": {},
        "xts": {}
      }  //widgets to be added to page
    },
    loadTNT: true,
    targetDiv: 'mbox-content',
    defaultMbox: 'target-global-mbox',
    viewIndex: 1,
    pollIndex: 1,
    jQuery: typeof jQuery !== 'undefined' ? true : false,

    clearVerbose: {
      "subscribe": {
        "full": false,
        "logs": {}
      },
      "unsubscribe": {
        "full": true,
        "logs": {}
      }
    },
    trackEvent: function (str) {
      this.debug2('default', 'trackEvent');
      if (str && typeof str === 'string' && window.utag && window.utag_data) {
        var obj = {};

        try {
          obj = JSON.parse(str);

          if (obj) {
            this.debug2('default', obj);
            var props = [];

            for (var prop in obj) {
              if (obj.hasOwnProperty(prop)) {
                utag_data[prop] = obj[prop];
                props.push(prop);
              }
            }

            utag_data.event_type = "";

            utag.link(utag_data);

            for (var i = 0; i < props.length; i++) {
              utag_data[props[i]] = "";
            }
          }
        } catch (e) {
          this.error('awo.trackEvent', e);
        }
      } else {
        this.error('awo.trackEvent', 'incorrect data type passed');
      }
    },
    setVerbose: function (logs, action) {
      if (typeof logs === 'undefined' && typeof action === 'undefined') {
        this.verbose = this.clearVerbose;
      } else if (typeof logs === 'undefined') {
        this.debug2('force', this.verbose[action]);
      } else if (typeof logs === 'string') {
        logs = logs.split(',');

        for (var i = 0; i < logs.length; i++) {
          if (action === 'subscribe') {
            this.verbose.unsubscribe.full = false;
            this.verbose.subscribe.logs[logs[i]] = true;
            delete this.verbose.unsubscribe.logs[logs[i]];
          } else if (action === 'unsubscribe') {
            if (logs[i] !== 'default' && logs[i] !== 'force') {
              delete this.verbose.subscribe.logs[logs[i]];
              this.verbose.unsubscribe.logs[logs[i]] = true;
            }
          }
        }
      } else if (typeof logs === 'boolean') {
        if (action === 'subscribe') {
          this.verbose.subscribe.full = logs;
          this.verbose.unsubscribe.full = logs ? false : this.verbose.unsubscribe.full;
        } else if (action === 'unsubscribe') {
          this.verbose.subscribe.full = logs ? false : this.verbose.subscribe.full;
          this.verbose.unsubscribe.full = logs;
        }
      }

      localStorage.setItem('awoVerbose', JSON.stringify(this.verbose));
    },
    subscribe: function (logs) {
      this.setVerbose(logs, 'subscribe');
    },
    unsubscribe: function (logs) {
      this.setVerbose(logs, 'unsubscribe');
    },
    console: function (type, iden, msg, color) {
      if (typeof window.console !== 'undefined' && type && iden && msg) {
        var sub = this.verbose.subscribe;
        var unsub = this.verbose.unsubscribe;

        if ((sub && unsub) && (iden === 'force' || (sub.full && !unsub.logs[iden]) || (!unsub.full && (type === 'error' || iden === 'default' || (sub.logs[iden] && !unsub.logs[iden]))))) {
          var isMSIE = /*@cc_on!@*/ false;

          if (isMSIE) {
            console.log(msg);
          } else {
            var syn = iden === 'default' || iden === 'force' ? '| ' : '- ' + iden + ' | ';

            if (type === 'error') {
              console.error('AWO ' + syn, msg);
            } else if (typeof msg !== 'string') {
              console.log('%cAWO ' + syn, 'color:blue;', msg);
            } else {
              console.log('%cAWO ' + syn + '%c' + msg, 'color:blue;', 'color:' + (iden === 'default' && !color ? 'darkgray' : color || 'black') + ';');
            }
          }
        }
      }
    },
    /*debug2*/
    //Must pass a Jira or identifier
    debug2: function (iden, msg, color) {
      this.console('log', iden, msg, color);
    },
    debug: function (msg) {
      this.debug2('default', 'Using deprecated debug reference. Replace with debug2()', 'red');
      this.debug2('default', msg, 'red');
    },
    error: function (iden, msg) {
      this.console('error', iden, msg);
    },
    /*runPoll2*/
    //Must pass a Jira or identifier
    //If looking for an element, must use jQuery syntax
    //If looking for a tag, string must begin with $
    runPoll2: function (iden, selector, successFunc, failFunc, limit, duration, count, ind) {
      var pollIndex = ind || this.pollIndex;

      if (this.viewIndex !== pollIndex) {
        this.debug2('default', 'awo.runPoll2: Canceled "' + iden + '" - "' + selector + '". Called on previous page', 'red');
      } else if (typeof iden === 'string') {
        var pollLimit = limit || 50;
        var pollDuration = duration || 50;
        var curCount = count || 1;
        var condition = false;

        if (typeof selector === 'string' && selector !== '') {
          var char_1 = selector.charAt(0);

          if (curCount === 1) {
            this.debug2(iden, 'awo.runPoll2: looking for: "' + selector + '"', 'orange');
          }

          if ((/^[a-z0-9]/i).test(char_1)) {
            var objs = selector.split('.');

            if (objs.length > 1) {
              var obj = window;

              for (var i = 0; i < objs.length; i++) {
                if (typeof obj[objs[i]] !== 'undefined') {
                  obj = obj[objs[i]];

                  condition = true;
                } else {
                  condition = false;
                  break;
                }
              }
            } else if (typeof window[selector] !== 'undefined' && (typeof window[selector].id === 'undefined' || window[selector].id != selector)) {
              if (selector === 'jQuery') {
                this.jQuery = true;
              }

              condition = true;
            }
          } else {
            if ((/^[\.|\#|\[]/i).test(char_1)) {
              if (document.querySelectorAll(selector).length > 0) {
                condition = true;
              }
            } else if (document.querySelectorAll(selector.substr(1)).length > 0) {
              condition = true;
            }
          }
        } else {
          this.debug2(iden, 'awo.runPoll2: invalid selector: "' + selector + '"', 'red');

          return false;
        }

        if (condition) {
          this.debug2(iden, 'awo.runPoll2: after ' + curCount + ' attemp(s), found: "' + selector + '"', 'green');
          if (typeof successFunc === 'undefined' || successFunc === '' || successFunc === null) {
            return true;
          } else if (typeof successFunc === 'function') {
            this.debug2(iden, 'awo.runPoll2: trigger success function', 'green');
            successFunc();

            return true;
          } else {
            return false;
          }
        } else {
          if (curCount >= pollLimit) {
            this.debug2(iden, 'awo.runPoll2: after ' + curCount + ' attemps, unable to find: "' + selector + '"', 'red');
            if (typeof failFunc === 'function') {
              this.debug2(iden, 'awo.runPoll2: trigger fail function', 'red');
              failFunc();
            } else {
              return false;
            }
          } else {
            curCount++;

            setTimeout(function () {
              awo.runPoll2(iden, selector, successFunc, failFunc, pollLimit, pollDuration, curCount, pollIndex);
            }, pollDuration);
          }
        }
      }
    },
    runPoll: function (selector, successFunc, failFunc, limit, duration, count) {
      this.debug2('default', 'Using deprecated runPoll reference. Replace with runPoll2()', 'red');
      this.runPoll2('default', selector, successFunc, failFunc, limit, duration, count);
    },
    setStyles: function (styles, id, remove) {
      var error = '';

      if (id && document.getElementById(id)) {
        error = 'Style id="' + id + '" already inserted';
      } else {
        if (styles) {
          var documentHead = document.head || document.getElementsByTagName('head')[0] || false;

          if (documentHead) {
            var newStylesheet = document.createElement('style');

            if (id) { newStylesheet.id = id; }
            if (remove) { newStylesheet.className = 'awo-trans-remove'; }

            newStylesheet.type = 'text/css';

            if (newStylesheet.styleSheet) {
              newStylesheet.styleSheet.cssText = styles;
            } else {
              newStylesheet.appendChild(document.createTextNode(styles));
            }

            documentHead.appendChild(newStylesheet);
          } else {
            error = 'Head not found';
          }
        } else {
          error = 'Styles not available';
        }
      }

      if (error !== '') {
        this.error('awo.setStyles', error);
      }
    },
    parseStrObj: function (str, prop) {
      if (str) {
        try {
          var value = JSON.parse(str)[prop];

          if (value) {
            return value;
          } else {
            return false;
          }
        } catch (e) {
          this.error('awo.parseStrObj', e);
          return false;
        }
      } else {
        return false;
      }
    },
    setCookie: function (cName, cValue, exDays) {
      if (cName && cValue) {
        var expires = '';

        if (exDays) {
          var d = new Date();

          d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));

          expires = ";expires=" + d.toUTCString();
        }

        document.cookie = cName + "=" + cValue + expires + ";path=/";
      }
    },
    getCookie: function (cName, propName) {
      var name = cName + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }

        if (c.indexOf(name) === 0) {
          var value = c.substring(name.length, c.length);

          if (propName) {
            var result = awo.parseStrObj(value, propName);

            if (!!result) {
              return result;
            }
          }

          if (value) {
            return value;
          } else {
            return false;
          }
        }
      }

      return false;
    },
    getLocalStorage: function (lsName, propName) {
      if (typeof window.localStorage !== 'undefined') {
        var value = localStorage.getItem(lsName);

        if (propName) {
          var result = awo.parseStrObj(value, propName);

          if (!!result) {
            return result;
          }
        }

        if (value) {
          return value;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    toggleTealiumDebug: function () {
      if (this.getCookie('utagdb') !== 'false' && !!this.getCookie('utagdb')) {
        document.cookie = 'utagdb=false;path=/';
      } else {
        document.cookie = 'utagdb=true;path=/';
      }
    },
    getData: function (prop) {
      if (typeof prop === 'string') {
        if (typeof utag_data !== 'undefined' && utag_data[prop] && utag_data[prop] !== '') {
          return utag_data[prop];
        } else {
          var url = window.location.href;
          var val = '';

          switch (prop) {
            case "user_profile_id":
              return this.getLocalStorage('aeo_profile', 'id') || '';
            case "user_loyalty_id":
              return this.getLocalStorage('aeo_profile', 'rewardsLink').rewardsNumber || '';
            case "tealium_visitor_id":
              var uMain = this.getCookie('utag_main') || '';
              var vId = uMain.match(/v_id:([^\$]*)/i);
              if(vId && vId.length > 1) {
                return vId[1];
              }else{
                return '';
              }
              break;
            case "page_gender":
              if ((/[\/|-]women/i).test(url) || (/[\/|-]aerie/i).test(url)) {
                return 'female';
              } else if ((/[\/|-]men/i).test(url)) {
                return 'male';
              } else {
                return 'neutral';
              }
              break;
            case "page_brand":
              if ((/[\/|-]tailgate/i).test(url)) {
                return 'tailgate';
              } else if ((/[\/|-]aerie/i).test(url)) {
                return 'aerie';
              } else {
                return 'AE';
              }
              break;
            case "page_type":
              val = "landing";

              if ((/cat(\d{5,7})/).test(url)) {
                val = "clp";
              }

              if ((/\d{4}_\d{4}_\d{3}/).test(url)) {
                val = "product_detail";
              }

              return val;
            case "category_id":
              val = url.match(/cat(\d{5,7})/);

              if (val && val !== null) {
                val = val[1] || '';
              } else {
                if (typeof utag_data !== 'undefined' && utag_data.category_hierarchy && utag_data.category_hierarchy.length > 0) {
                  val = utag_data.category_hierarchy[0].replace(/\D/g, '');
                }
              }

              return val || '';
            case "product_id":
              val = url.match(/\d{4}_\d{4}_\d{3}/);

              if (val && val !== null) {
                val = val[0] || '';
              }

              return val || '';
            case "pref_language":
              var elem = document.querySelector('meta[name="ae-language"]');

              if (elem) {
                var content = elem.getAttribute('content');

                if (content) {
                  var match = content.match(/^([a-z]{2,})_/);

                  if (match.length > 1) {
                    val = match[1];
                  }
                }
              }

              return val || '';
            default:
              return '';
          }
        }
      } else {
        return '';
      }
    },
    logAdobeEvents: function (data) {
      if (data) {
        try {
          this.debug2('mbox', {
            'mbox': data.detail.mbox,
            'type': data.type,
            'detail': data.detail
          });
        } catch (e) {
          this.error('mbox', e);
        }
      }
    },
    collectTntData: function () {
      //collect custom attributes for Adobe mbox call
      var product_feed = "US";
      var gender = this.getData("page_gender");
      var brand = this.getData("page_brand");
      var category_id = this.getData("category_id");
      var product_id = this.getData("product_id");
      var bmax = this.getCookie('BMaxV2') || '';

      this.targetPageParams = {
        "at_property": "90e44b5f-234a-e5ad-b82f-b5fd7c94bc38",//US specific
        "mboxReferrer": document.referrer || "",
        "mbox3rdPartyId": "",
        "page": {
          "product_feed": product_feed,
          "language": this.getData("pref_language"),
          "gender": gender,
          "brand": brand,
          "type": this.getData("page_type"),
          "category_id": category_id,
          "product_id": product_id
        },
        "profile": {
          "profile_id": this.getData("user_profile_id"),
          "rewards_id": this.getData("user_loyalty_id"),
          "visitor_id": this.getData("tealium_visitor_id"),
          "BMax": bmax
        },
        "entity": {
          "gender": gender,
          "brand": brand,
          "categoryId": category_id,
          "id": product_id ? product_id + '_' + product_feed : ''
        }
      };
    },
    clearAtData: function (widgets) {
      if (!widgets) {
        this.at.activities = [];
      }

      this.at.widgets.designs = {};
      this.at.widgets.xts = {};
    },
    tntCB: function (success, mbox, func, view) {
      if (success && typeof func === 'function') {
        this.debug2('mbox', 'awo.callTnt: (' + mbox + ') Trigger success function', 'teal');
        func();
      }

      if (view && window.agwa) {
        agwa.tealium('view', {
          'data_adobe_call': (success ? 'success' : 'error')
        });
      } else if (view) {
        this.debug2('default', 'awo.callTnt: AGWA API undefined', 'red');
      }
    },
    callTnt: function (mbox, func, view) {
      if (mbox) {
        if (adobe && adobe.target && adobe.target.getOffer && adobe.target.applyOffer) {
          this.debug2('mbox', 'awo.callTnt: (' + mbox + ') Call Adobe Test and Target mBox - ' + (view ? 'Page View' : 'Dynamic'), 'teal');
          this.debug2('mbox', this.targetPageParams);
          adobe.target.getOffer({
            "mbox": mbox,
            "params": awo.targetPageParams || '',
            "success": function (offer) {
              awo.debug2('mbox', 'awo.callTnt: (' + mbox + ') mBox call successful', 'green');
              adobe.target.applyOffer({
                "mbox": mbox,
                "offer": offer,
                "selector": "#" + awo.targetDiv
              });

              awo.tntCB(true, mbox, func, view);
            },
            "error": function (status, error) {
              awo.debug2('default', 'awo.callTnt: (' + mbox + ') mBox call failed', 'red');
              awo.debug2('mbox', status, 'red');
              awo.error('mbox', error);

              awo.tntCB(false, mbox, func, view);
            },
            "timeout": 5000
          });
        } else {
          this.error('mbox', 'awo.callTnt: "adobe" undefined for Adobe Test and Target Call');
        }
      } else {
        this.debug2('default', 'awo.callTnt: No mBox provided for Adobe Test and Target Call', 'red');
      }
    }
  };

  awo.verbose = awo.clearVerbose;

  if (typeof window.localStorage !== 'undefined') {
    var awoVerbose = localStorage.getItem('awoVerbose');

    if (awoVerbose) {
      try {
        awoVerbose = JSON.parse(awoVerbose);
      } catch (e) {
        localStorage.removeItem('awoVerbose');
      }

      if (typeof awoVerbose !== 'object') {
        localStorage.removeItem('awoVerbose');
      } else {
        awo.verbose = awoVerbose;
      }
    }
  }
} catch (e) {
  console.error(e);
}

if (typeof awo !== 'undefined') {
  window.awoLoaded = true;
  awo.debug2('default', 'utag_sync: Tealium Profile: "ugpus"');

  document.addEventListener('at-request-failed', function (data) { awo.logAdobeEvents(data); });
  document.addEventListener('at-request-no-offers', function (data) { awo.logAdobeEvents(data); });

  window.addEventListener("UDOUpdated", function () {
    awo.debug2('default', 'utag_sync: UDOUpdated');

    awo.viewIndex++;

    if (typeof adobe !== 'undefined') {
      awo.clearAtData();
      awo.collectTntData();
      awo.callTnt(awo.defaultMbox, undefined, true);
      awo.pollIndex++;
    }
  });
}