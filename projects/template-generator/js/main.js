let extensionField;

var body = $('body');
var preview = $('#preview');
var overlay = $('#overlay');
var grid = $('#grid');
var content = $('#content');
var options = $('#options');
var block_seq;
var unique = 0;
var processing = false;
var updateCSDataDelay;
var updateGridDelay;
var updateCSDelay;
var exclusions = ['padding', 'margin'];
var data = {
  above: {
    row_above: {
      blocks: {}
    }
  },
  content: {},
  below: {
    row_below: {
      blocks: {}
    }
  },
  options: {
    area: '',
    row: '',
    block: ''
  },
  defaults: {
    row_anchor: 'default'
  },
  loops: {
    areas: ['above', 'content', 'below'],
    breakpoints: ['sm', 'md', 'lg'],
    options: ['hidden', 'offset', 'span', 'split', 'anchor', 'justify', 'padding', 'margin', 'border', 'animation', 'animate'],
    row_anchors: {
      default: { title: 'default', value: 'default' },
      top: { title: 'Stick to the Top', value: 'start' },
      center: { title: 'Center', value: 'center' },
      bottom: { title: 'Stick to the Bottom', value: 'end' },
      space_between: { title: 'Space Between', value: 'space-between' },
      space_evenly: { title: 'Space Evenly', value: 'space-evenly' },
      space_around: { title: 'Space Around', value: 'space-around' }
    }
  },
  output: {
    settings: {
      rowAnchor: {},
      margin: {
        sm: {
          top: 80,
          bottom: 80
        },
        md: {
          top: 80,
          bottom: 80
        },
        lg: {
          top: 80,
          bottom: 80
        }
      }
    }
  }
};

function init(form_data) {
  if (document.getElementById('opts').innerHTML === '') {
    fillOutData();
    createHTML();
    createTemplates(data.templates);
  }

  clearForm();

  if (form_data && form_data.layout) {
    var obj = form_data.layout;
    processing = true;

    var rows = '';
    var blocks = '';
    var row_id = '';
    var block_id = '';

    for (var area in obj) {
      rows = obj[area];

      if (area === 'content' && rows.length < 1) {
        addRow();
      } else {
        for (var i = 0; i < rows.length; i++) {
          blocks = rows[i];

          if (area === 'content') {
            row_id = unique;

            addRow(undefined, undefined, row_id);
          } else {
            row_id = area;
          }

          for (var x = 0; x < blocks.length; x++) {
            block = blocks[x];
            block_id = unique;

            addBlock(area, row_id, block_id, block);
            updateBlock(area, row_id, block_id);
          }
        }
      }
    }

    for (var z = 0; z < data.loops.breakpoints.length; z++) {
      var size = data.loops.breakpoints[z];

      $('#' + size + '_top_margin').val(form_data.settings.margin[size].top);
      $('#' + size + '_bottom_margin').val(form_data.settings.margin[size].bottom);

      updateMargin(size, 'top', form_data.settings.margin[size].top);
      updateMargin(size, 'bottom', form_data.settings.margin[size].bottom);
    }
    createRowAnchors(form_data.settings.rowAnchor);
    processing = false;
    updateData();
  } else {
    createRowAnchors();
    addRow();
  }
}

function createRowAnchors(rowAnchor) {
  let rowAnchors = document.getElementById('row-anchors');

  //Resets when triggered by removing all children from row-anchors
  while (rowAnchors.firstChild) {
    rowAnchors.removeChild(rowAnchors.firstChild);
  }

  let val = rowAnchor || data.defaults.row_anchor;

  for (let row_anchor in data.loops.row_anchors) {
    let rowObj = data.loops.row_anchors[row_anchor];
    let anchorElem = document.createElement('option');

    if (val === rowObj.value) {
      anchorElem.selected = 'selected';
    }

    anchorElem.value = rowObj.value;
    anchorElem.innerHTML = rowObj.title;
    rowAnchors.appendChild(anchorElem);
  }
  updateRowAnchor(val);
}

function updateRowAnchor(anchor) {
  data.output.settings.rowAnchor = anchor;
  if (!processing) {
    storeData();
  }
}

//add data
function fillOutData() {
  for (var i = 0; i < data.loops.breakpoints.length; i++) {
    data.options[data.loops.breakpoints[i]] = {};

    for (var x = 0; x < data.loops.options.length; x++) {
      data.options[data.loops.breakpoints[i]][data.loops.options[x]] = '';
    }
  }
}
//create select for templates
function createTemplates(templates) {
  if (templates) {
    var html = '';
    var filterHtml = '';
    var template = {};
    var result = false;
    var category = '';
    var categories = [];
    var title = '';
    data.templates = templates;

    html += '<div class="w-45" style="display:inline-block; margin-left:10px;"><label for="templates" style="display:block">Templates</label><select id="templates" class="cs-text-box w-100" style="text-transform: capitalize;" name="templates" data-action="clear" onchange="updateTemplates(this)"><option class="cat-" value="">Custom</option>';

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

      html += '<option class="cat-' + category + '" value="' + i + '">' + title + '</option>';
    }

    html += '</select></div>';

    if (categories.length > 0) {
      filterHtml = '<div class="w-45" style="display:inline-block;"><label for="filters" style="display:block">Filter</label><select id="filters" class="cs-text-box w-100" style="text-transform: capitalize;" name="filters" onchange="filterTemplates(this)"><option value="">All</option>';

      for (var x = 0; x < categories.length; x++) {
        filterHtml += '<option value="' + categories[x] + '">' + categories[x].replace(/\-/g, ' ') + '</option>';
      }

      filterHtml += '</select></div>';
    }

    html = filterHtml + html;

    document.getElementById('filter_wrap').innerHTML = html;
  }
}

//filter templates
function filterTemplates(elem) {
  if (elem.value) {
    $('#templates option[class*="cat-"]').hide();
    $('#templates option.cat-' + elem.value).show();
  } else {
    $('#templates option[class*="cat-"]').show();
  }
}
//create html
function createHTML() {
  var breakpoint = '';
  var option = '';
  var html = '';

  html += '<tr><th>LOCKUP: <span id="block_seq"></span></th><th>Small</th><th>Medium</th><th>Large</th></tr>';

  for (var x = 0; x < data.loops.options.length; x++) {
    option = data.loops.options[x];

    html += '<tr>';
    for (var i = 0; i < data.loops.breakpoints.length; i++) {
      breakpoint = data.loops.breakpoints[i];
      if (i === 0) {
        html += '<td><label style="text-transform:capitalize;">' + option + '</label></td>';
      }

      switch (option) {
        case 'hidden':
          html += '<td class="' + option + '-feedback"><select id="' + option + '_' + breakpoint + '" data-type="' + option + '" class="cs-text-box w-100 bp-' + i + ' opt-' + x + '" name="' + option + '_' + breakpoint + "\" onchange=\"updateOptions(this.getAttribute('data-type'),'" + breakpoint + '\',this.value)"><option value="show">Show</option><option value="hidden">Hidden</option></select></td>';
          break;
        case 'offset':
          html += '<td class="' + option + '-feedback-' + breakpoint + '"><input id="' + option + '_' + breakpoint + '" data-type="' + option + '" class="cs-text-box w-100" type="number" min="0" max="11" value="0" name="' + option + '_' + breakpoint + "\" onchange=\"updateOptions(this.getAttribute('data-type'),'" + breakpoint + '\',parseInt(this.value))"/></td>';
          break;
        case 'span':
          html += '<td class="' + option + '-feedback-' + breakpoint + '"><input id="' + option + '_' + breakpoint + '" data-type="' + option + '" class="cs-text-box w-100" type="number" min="1" max="12" value="1" name="span_' + breakpoint + "\" onchange=\"updateOptions(this.getAttribute('data-type'),'" + breakpoint + '\',parseInt(this.value))"/></td>';
          break;
        case 'split':
          html += '<td><select id="' + option + '_' + breakpoint + '" data-type="' + option + '" class="cs-text-box w-100" name="' + option + '_' + breakpoint + "\" onchange=\"updateOptions(this.getAttribute('data-type'),'" + breakpoint + '\',this.value)"><option value="none">None</option><option value="pull">Pull</option><option value="push">Push</option></select></td>';
          break;
        case 'anchor':
          html += '<td><select id="' + option + '_' + breakpoint + '" data-type="' + option + '" class="cs-text-box w-100" name="' + option + '_' + breakpoint + "\" onchange=\"updateOptions(this.getAttribute('data-type'),'" + breakpoint + '\',this.value)"><option value="center">Center</option><option value="top">Top</option><option value="bottom">Bottom</option><option value="left">Left</option><option value="right">Right</option><option value="tl">Top Left</option><option value="tr">Top Right</option><option value="bl">Bottom Left</option><option value="br">Bottom Right</option></select></td>';
          break;
        case 'justify':
          html += '<td><select id="' + option + '_' + breakpoint + '" data-type="' + option + '" class="cs-text-box w-100" name="' + option + '_' + breakpoint + "\" onchange=\"updateOptions(this.getAttribute('data-type'),'" + breakpoint + '\',this.value)"><option value="center">Center</option><option value="left">Left</option><option value="right">Right</option></select></td>';
          break;
        case 'padding':
          html += '<td class="' + option + '_' + breakpoint + '"><input id="' + option + '_' + breakpoint + '" data-type="' + option + '" class="cs-text-box w-100" type="text" minlength="1" maxlength="23" name="' + option + '_' + breakpoint + "\" onchange=\"updateOptions(this.getAttribute('data-type'),'" + breakpoint + '\',this.value)"/></td>';
          break;
        case 'margin':
          html += '<td class="' + option + '_' + breakpoint + '"><input id="' + option + '_' + breakpoint + '" data-type="' + option + '" class="cs-text-box w-100" type="text" minlength="1" maxlength="23" name="' + option + '_' + breakpoint + "\" onchange=\"updateOptions(this.getAttribute('data-type'),'" + breakpoint + '\',this.value)"/></td>';
          break;
        case 'border':
          html += '<td><select id="' + option + '_' + breakpoint + '" data-type="' + option + '" class="cs-text-box w-100" name="' + option + '_' + breakpoint + "\" onchange=\"updateOptions(this.getAttribute('data-type'),'" + breakpoint + '\',this.value)"><option value="none">None</option><option value="top">Top</option><option value="bottom">Bottom</option><option value="left">Left</option><option value="right">Right</option></select></td>';
          break;
        case 'animation':
          html += '<td class="' + option + '-feedback-' + breakpoint + '"><select id="' + option + '_' + breakpoint + '" data-type="' + option + '" class="cs-text-box w-100" name="' + option + '_' + breakpoint + "\" onchange=\"updateOptions(this.getAttribute('data-type'),'" + breakpoint + '\',this.value)"><option value="none">None</option><option value="top">Top</option><option value="bottom">Bottom</option><option value="left">Left</option><option value="right">Right</option></select></td>';
          break;
        case 'animate':
          html += '<td class="' + option + '-feedback-' + breakpoint + '"><select id="' + option + '_' + breakpoint + '" data-type="' + option + '" class="cs-text-box w-100" name="' + option + '_' + breakpoint + "\" onchange=\"updateOptions(this.getAttribute('data-type'),'" + breakpoint + '\',this.value)"><option value="both">Text &amp; Background</option><option value="text">Text</option><option value="background">Background</option></select></td>';
          break;
        default:
          default_val = '';
      }
    }
    html += '</tr>';
  }
  html += '<tr><td></td><td colspan="3"><button style="margin-top:20px;" class="apply-btn btn cs-btn-success btn-large w-100" onclick="applyOptions()">Apply</button></td></tr>';

  document.getElementById('opts').innerHTML = html;
  block_seq = $('#block_seq');
}
//clear form
function clearForm() {
  $('#row_above.row .block,#row_below.row .block,#content .row').remove();

  data.above.row_above.blocks = {};
  data.content = {};
  data.below.row_below.blocks = {};
  data.output.settings.rowAnchor = {};

  for (var i = 0; i < data.loops.breakpoints.length; i++) {
    var size = data.loops.breakpoints[i];

    data.output.settings.margin[size].top = 80;
    data.output.settings.margin[size].bottom = 80;

    $('#' + size + '_top_margin').val(data.output.settings.margin[size].top);
    $('#' + size + '_bottom_margin').val(data.output.settings.margin[size].bottom);

    updateMargin(size, 'top', data.output.settings.margin[size].top);
    updateMargin(size, 'bottom', data.output.settings.margin[size].bottom);
  }
}
//apply templates
function updateTemplates(elem) {
  if (elem) {
    var action = elem.getAttribute('data-action');
    var template = elem.value;

    if (template === '' && action === 'clear') {
      init();
    } else if (template !== '') {
      init(data.templates[template].template);
    }

    elem.dataset.action = 'clear';
  } else if (!processing) {
    updateFilters('filters');
    updateFilters('templates');
  }
}
//update filters
function updateFilters(select) {
  var elem = document.getElementById(select);

  if (elem && elem.getElementsByTagName('option').length > 0) {
    elem.getElementsByTagName('option')[0].selected = 'selected';

    if (select === 'filters') {
      filterTemplates(elem);
    } else {
      elem.dataset.action = '';
    }
  }
}
//change breakpoint
function updateBreakpoint(size) {
  for (var i = 0; i < data.loops.breakpoints.length; i++) {
    $(body).removeClass(data.loops.breakpoints[i]);
  }

  $(body).addClass(size);

  updateGridHeight();
  updateMargin(size, 'top', data.output.settings.margin[size].top);
  updateMargin(size, 'bottom', data.output.settings.margin[size].bottom);
}
//add row
function addRow(row_id, pos, set) {
  var id = set || unique;
  var str = '<div id="row_' + id + '" class="row"><div class="ctrl-block"><div class="add" onclick="addBlock(\'content\',' + id + ')">&#43; &#9635;</div></div><div class="ctrl-row"><div class="add before" onclick="addRow(' + id + ',\'before\')">&#43; &#8593;</div><div class="remove" onclick="removeRow(' + id + ')">&#8592; &#215;</div><div class="add after" onclick="addRow(' + id + ",'after')\">&#43; &#8595;</div></div></div>";
  var elem;

  if (row_id === undefined) {
    $(content).append(str);
  } else {
    elem = $('#row_' + row_id);

    if (pos === 'before') {
      $(elem).before(str);
    } else {
      $(elem).after(str);
    }
  }

  updateRowData(id, 'add');
  unique++;
}
//remove row
function removeRow(row_id) {
  $(data.content['row_' + row_id].elem).remove();

  updateRowData(row_id, 'remove');
}
//update row data
function updateRowData(row_id, action) {
  updateTemplates();

  if (action === 'remove') {
    delete data.content['row_' + row_id];
  } else {
    data.content['row_' + row_id] = {
      elem: document.getElementById('row_' + row_id),
      blocks: {}
    };
  }

  updateRemoval();
  updateData();
}
//update content height
function updateGridHeight() {
  clearTimeout(updateGridDelay);

  updateGridDelay = setTimeout(function () {
    $(grid).height($(overlay).height());

    updateCSHeight();
  }, 100);
}
//show/hide row removal btn
function updateRemoval() {
  if ($('#content .row').length < 2) {
    $(content).addClass('hide-removal');
  } else {
    $(content).removeClass('hide-removal');
  }
}
//add block
function addBlock(area, row_id, set, block) {
  var id = set || unique;
  var str = '<div id="block_' + id + '" class="block span-sm-1 offset-sm-0"><div class="remove" onclick="removeBlock(\'' + area + "','" + row_id + "'," + id + ')">&#215;</div><div class="opts" onclick="showOptions(\'' + area + "','" + row_id + "'," + id + ')">&#x2026;</div><div class="view"><div class="view-wrap"><div class="background"></div><div class="text">-</br>--</br>-</div></div></div><div class="num"></div></div>';

  $('#row_' + row_id).append(str);

  updateBlockData(area, row_id, id, 'add', block);
  unique++;
}
//remove block
function removeBlock(area, row_id, block_id) {
  $(data[area]['row_' + row_id].blocks['block_' + block_id].elem).remove();

  updateBlockData(area, row_id, block_id, 'remove');
}
//update block data
function updateBlockData(area, row_id, block_id, action, block) {
  updateTemplates();

  if (action === 'remove') {
    delete data[area]['row_' + row_id].blocks['block_' + block_id];
  } else {
    var breakpoint = '';
    var option = '';
    var obj = {};
    var val;
    var default_val;

    if (!data[area]['row_' + row_id]) {
      data[area]['row_' + row_id] = {
        blocks: {}
      };
    }

    obj.elem = document.getElementById('block_' + block_id);
    obj.options = {};

    for (var i = 0; i < data.loops.breakpoints.length; i++) {
      breakpoint = data.loops.breakpoints[i];
      obj.options[breakpoint] = {};

      for (var x = 0; x < data.loops.options.length; x++) {
        option = data.loops.options[x];
        val = '';
        default_val = '';

        if (breakpoint === 'sm') {
          switch (option) {
            case 'hidden':
              default_val = 'show';
              break;
            case 'offset':
              default_val = 0;
              break;
            case 'span':
              default_val = 1;
              break;
            case 'split':
              default_val = 'none';
              break;
            case 'anchor':
              default_val = 'center';
              break;
            case 'justify':
              default_val = 'center';
              break;
            case 'padding':
              default_val = '0 15px';
              break;
            case 'margin':
              default_val = '0 15px';
              break;
            case 'border':
              default_val = 'none';
              break;
            case 'animation':
              default_val = 'none';
              break;
            case 'animate':
              default_val = 'both';
              break;
            default:
              default_val = '';
          }
        }
        val = block ? block[breakpoint][option] : default_val;
        obj.options[breakpoint][option] = val;
      }
    }
    data[area]['row_' + row_id].blocks['block_' + block_id] = obj;
  }

  updateData();
}
//show options
function showOptions(area, row_id, block_id) {
  clearError();

  var breakpoint = '';
  var option = '';
  var blockObj = data[area]['row_' + row_id].blocks['block_' + block_id];
  var blockOptions = blockObj.options;

  data.options.area = area;
  data.options.row = row_id;
  data.options.block = block_id;

  for (var i = 0; i < data.loops.breakpoints.length; i++) {
    breakpoint = data.loops.breakpoints[i];
    for (var x = 0; x < data.loops.options.length; x++) {
      option = data.loops.options[x];
      data.options[breakpoint][option] = blockOptions[breakpoint][option];
      $('#' + [option] + '_' + [breakpoint]).val(data.options[breakpoint][option]);
    }
  }

  $(block_seq).text(blockObj.seq);

  $(options).toggleClass('show-opts');
}
//capture inputs in data obj
function updateOptions(type, size, val) {
  data.options[size][type] = val;

  validate();
}
//validate
function validate() {
  var error = false;
  var breakpoint = '';

  clearError();

  for (var y = 0; y < data.loops.breakpoints.length; y++) {
    breakpoint = data.loops.breakpoints[y];
    if (!testTotalColsBlock(breakpoint)) {
      error = true;
      $(options).addClass('offset-error-' + breakpoint);
      $(options).addClass('span-error-' + breakpoint);
    }

    if (!testAnimOpts(breakpoint)) {
      error = true;
      $(options).addClass('animation-error-' + breakpoint);
      $(options).addClass('animate-error-' + breakpoint);
    }
  }

  if (!testHiddenBreakpoints()) {
    error = true;
    $(options).addClass('hidden-error');
  }

  return error;
}
//clear error validation
function clearError() {
  for (var x = 0; x < data.loops.options.length; x++) {
    for (var i = 0; i < data.loops.breakpoints.length; i++) {
      $(options).removeClass(data.loops.options[x] + '-error-' + data.loops.breakpoints[i]);
    }
  }

  $(options).removeClass('hidden-error');
}
//apply options
function applyOptions() {
  if (!validate()) {
    updateTemplates();

    var blockOptions = data[data.options.area]['row_' + data.options.row].blocks['block_' + data.options.block].options;
    var breakpoint = '';
    var option = '';
    var val = '';

    for (var i = 0; i < data.loops.breakpoints.length; i++) {
      breakpoint = data.loops.breakpoints[i];
      for (var x = 0; x < data.loops.options.length; x++) {
        option = data.loops.options[x];
        val = data.options[breakpoint][option];

        if (!val && (option === 'padding' || option === 'margin') && breakpoint === 'sm') {
          val = '0';
        }

        blockOptions[breakpoint][option] = val;
      }
    }

    updateBlock(data.options.area, data.options.row, data.options.block);
    closeOptions();
    updateData();
  }
}
//update block
function updateBlock(area, row_id, block_id) {
  var block = data[area]['row_' + row_id].blocks['block_' + block_id];
  var breakpoint = '';
  var option = '';
  var selection = '';
  var className = '';
  var regex;

  for (var i = 0; i < data.loops.breakpoints.length; i++) {
    breakpoint = data.loops.breakpoints[i];

    for (var x = 0; x < data.loops.options.length; x++) {
      option = data.loops.options[x];

      if (exclusions.indexOf(option) < 0) {
        selection = block.options[breakpoint][option] !== undefined ? block.options[breakpoint][option] : '';
        regex = new RegExp([option] + '-' + breakpoint + '-[\\w\\d]+', 'g');

        if (selection !== '') {
          className = option + '-' + breakpoint + '-' + selection;

          if (block.elem.className.match(regex)) {
            block.elem.className = block.elem.className.replace(regex, className);
          } else {
            block.elem.className = block.elem.className + ' ' + className;
          }
        }
      }
    }
  }
}
//close options
function closeOptions() {
  $(options).toggleClass('show-opts');

  data.options.area = '';
  data.options.row = '';
  data.options.block = '';

  for (var i = 0; i < data.loops.breakpoints.length; i++) {
    for (var x = 0; x < data.loops.options.length; x++) {
      data.options[data.loops.breakpoints[i]][data.loops.options[x]] = '';
    }
  }
}
//get total columns used in block
function testTotalColsBlock(size) {
  var ind = data.loops.breakpoints.indexOf(size);
  var offset = data.options[size].offset || data.options[data.loops.breakpoints[ind - 1] || size].offset || data.options[data.loops.breakpoints[ind - 2] || size].offset || 0;
  var span = data.options[size].span || data.options[data.loops.breakpoints[ind - 1] || size].span || data.options[data.loops.breakpoints[ind - 2] || size].span || 1;

  return offset + span <= 12 ? true : false;
}
//ensure both animation options are selected
function testAnimOpts(size) {
  var animation = data.options[size].animation || false;
  var animate = data.options[size].animate || false;

  return (!animation || !animate) && !(!animation && !animate) && animation !== 'none' ? false : true;
}
//ensure one breakpoint is shown
function testHiddenBreakpoints() {
  var valid = false;

  for (var i = 0; i < data.loops.breakpoints.length; i++) {
    if (data.options[data.loops.breakpoints[i]].hidden === 'show') {
      valid = true;
    }
  }

  return valid;
}
//update margin
function updateMargin(size, pos, val) {
  var css = val * -1 + 'px';

  if (pos === 'bottom') {
    $('.' + size + ' .module-bottom').css('bottom', css);

    data.output.settings.margin[size].bottom = val;
  } else {
    $('.' + size + ' .module-top').css('top', css);

    data.output.settings.margin[size].top = val;
  }

  if (!processing) {
    storeData();
  }
}
//add class for margin
function checkContent() {
  var above = data.above.row_above.blocks;
  var below = data.below.row_below.blocks;
  var top = false;
  var bottom = false;
  var size;
  var hidden;

  for (var i = 0; i < data.loops.breakpoints.length; i++) {
    size = data.loops.breakpoints[i];
    top = false;
    bottom = false;

    for (var aBlock in above) {
      hidden = above[aBlock].options[size].hidden || above[aBlock].options[data.loops.breakpoints[i - 1] || size].hidden || above[aBlock].options[data.loops.breakpoints[i - 2] || size].hidden;

      if (hidden === 'show') {
        top = true;
      }
    }

    if (top) {
      $(preview).addClass(size + '-has-top-content');
    } else {
      $(preview).removeClass(size + '-has-top-content');
    }

    for (var bBlock in below) {
      hidden = below[bBlock].options[size].hidden || below[bBlock].options[data.loops.breakpoints[i - 1] || size].hidden || below[bBlock].options[data.loops.breakpoints[i - 2] || size].hidden;

      if (hidden === 'show') {
        bottom = true;
      }
    }

    if (bottom) {
      $(preview).addClass(size + '-has-bottom-content');
    } else {
      $(preview).removeClass(size + '-has-bottom-content');
    }
  }
}
//update ouput data
function updateData() {
  updateGridHeight();

  if (!processing) {
    checkContent();

    var breakpoint = '';
    var option = '';
    var area = '';
    var rowElems = '';
    var rows = [];
    var row_id = '';
    var blockElems = '';
    var blocks = [];
    var block_id = '';
    var blockObj = {};
    var optsObj = {};
    var iter = 1;

    data.output.layout = {};

    for (var i = 0; i < data.loops.areas.length; i++) {
      area = data.loops.areas[i];
      data.output.layout[area] = [];
      rows = [];
      rowElems = $('#' + (area !== 'content' ? 'row_' + area + '.row' : area + ' .row'));

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
          $(blockObj.elem)
            .find('.num')
            .text(iter++);

          for (var z = 0; z < data.loops.breakpoints.length; z++) {
            breakpoint = data.loops.breakpoints[z];
            optsObj[breakpoint] = {};

            for (var j = 0; j < data.loops.options.length; j++) {
              option = data.loops.options[j];
              val = blockObj.options[breakpoint][option];

              if (val !== '') {
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
    storeData();
    updateCSHeight();
  }
}
//update CS height
function updateCSHeight() {
  clearTimeout(updateCSDelay);

  updateCSDelay = setTimeout(function () {
    //extensionField.window.updateHeight(document.getElementById('height').offsetHeight);
    var elem = document.getElementById('height');
    window.parent.masterModule.updateiFrameHeight(elem.offsetHeight + parseInt(window.getComputedStyle(elem).marginTop.replace('px','')) + 125);
  }, 100);
}
//save data to CS
function storeData() {
  clearTimeout(updateCSDataDelay);

  updateCSDataDelay = setTimeout(function () {
    console.log('Master Module Extension Data', data.output);
    localStorage.setItem("module",JSON.stringify(data.output));
    //extensionField.field.setData(data.output);
  }, 500);
}

//load saved template entries
function getTemplates() {
  var env = extensionField.stack._data.name || 'PROD';
  var xhr = new XMLHttpRequest();

  xhr.open('GET', extensionField.config.baseURL + 'v3/content_types/' + extensionField.config.contentType + '/entries?environment=' + extensionField.config.templateEnv, true);
  xhr.setRequestHeader('api_key', extensionField.config[env].apiKey);
  xhr.setRequestHeader('access_token', extensionField.config[env].deliveryToken);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      var status = xhr.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        if (this.response) {
          createTemplates(JSON.parse(this.response).entries);
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  };
  xhr.send();
}

// ContentstackUIExtension.init().then(function (extension) {
//   extensionField = extension;
//   extension.window.updateHeight(800);

//   if (extensionField.field.schema.config.showTemplates) {
//     getTemplates();
//   }

//   init(extensionField.field.getData());
// });


createTemplates(template_examples);

init(JSON.parse(localStorage.getItem("module")));