var STYLE_ID = "sub-master";
var LOCALSTORAGE = "sub-master-fr-font";
var LOCALSTORAGE_FULL = "sub-master-fr-font-full";
var INITIAL_FONT_SIZE = 2.1;
var INITIAL_FONT_SIZE_FULL = 4.2;
var FONT_SIZE_RANGE = 0.3;

var fontSize = localStorage.getItem(LOCALSTORAGE) || INITIAL_FONT_SIZE;
var fontSizeFull = localStorage.getItem(LOCALSTORAGE_FULL) || INITIAL_FONT_SIZE_FULL;
fontSize = Number.parseFloat(fontSize);
fontSizeFull = Number.parseFloat(fontSizeFull);

function addNewStyle(newStyle) {
  var styleElement = document.getElementById(STYLE_ID);
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.id = STYLE_ID;
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  styleElement.innerHTML = '';
  styleElement.appendChild(document.createTextNode(newStyle));
}

function adjustFontSize(value, valueFull) {
  localStorage.setItem(LOCALSTORAGE, value);
  localStorage.setItem(LOCALSTORAGE_FULL, valueFull);
  addNewStyle('.video-js.vjs-fullscreen .vjs-text-track { font-size: ' + valueFull + 'em !important } .video-js .vjs-text-track { font-size: ' + value + 'em !important }');

  /*
  .video-js.vjs-fullscreen .vjs-text-track {
    font-size: ' + valueFull + 'em !important
  }

  .video-js .vjs-text-track {
    font-size: ' + value + 'em !important
  }
  */
}

function resetFontSize() {
  $('#' + STYLE_ID).html('');
  localStorage.removeItem(LOCALSTORAGE);
  localStorage.removeItem(LOCALSTORAGE_FULL);
  fontSize = INITIAL_FONT_SIZE;
  fontSizeFull = INITIAL_FONT_SIZE_FULL;
}

function smallerFontSize() {
  adjustFontSize(fontSize -= FONT_SIZE_RANGE, fontSizeFull -= FONT_SIZE_RANGE);
}

function largerFontSize() {
  adjustFontSize(fontSize += FONT_SIZE_RANGE, fontSizeFull += FONT_SIZE_RANGE);
}

function toggleFontSizeMenu() {
  if($('.sub-master-font-size.hide')) {
    $('.sub-master-font-size').show();
    $('.share-tips, .subtitle-tips').hide();
  } else {
    $('.sub-master-font-size').hide();
  }
}

function offFontSizeMenu() {
 $('.sub-master-font-size').hide();
}

if (localStorage.getItem(LOCALSTORAGE) && localStorage.getItem(LOCALSTORAGE_FULL)) {
  adjustFontSize(fontSize, fontSizeFull);
}

setInterval(function() {
  var $player = $('.video-background > .video-js');
  if ($player.length > 0 && $('.p-caption').css('display') !== 'none') {
    if ($('.sub-master').length === 0) {
      $setting = $player.find('.player-head-wrap .right');
      $setting.append('<a href="#" title="字體" class="sub-master">字體</a>');
      $setting.append('<div class="sub-master-font-size hide"></div>');
      $('.sub-master-font-size').append('<div class="sub-master-btn _large">放大</div>');
      $('.sub-master-font-size').append('<div class="sub-master-btn _reset">重置</div>');
      $('.sub-master-font-size').append('<div class="sub-master-btn _small">縮小</div>');
      $('.sub-master').click(toggleFontSizeMenu);
      $('.p-share, .p-caption').click(offFontSizeMenu);
      $('.sub-master-btn._small').click(smallerFontSize);
      $('.sub-master-btn._reset').click(resetFontSize);
      $('.sub-master-btn._large').click(largerFontSize);
    }
  }
}, 1000);
