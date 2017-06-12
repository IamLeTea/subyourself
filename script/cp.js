var STYLE_ID = "sub-master";
var LOCALSTORAGE_PX = "sub-master-cp-font-px";
var LOCALSTORAGE_VW = "sub-master-cp-font-vw";
var INITIAL_FONT_SIZE_PX = 20;
var INITIAL_FONT_SIZE_VW = 2.6;
var FONT_SIZE_RANGE_PX = 3;
var FONT_SIZE_RANGE_VW = 0.15;

var keydownEventRegister = false;

var fontSizePX = localStorage.getItem(LOCALSTORAGE_PX) || INITIAL_FONT_SIZE_PX;
var fontSizeVW = localStorage.getItem(LOCALSTORAGE_VW) || INITIAL_FONT_SIZE_VW;
fontSizePX = Number.parseInt(fontSizePX);
fontSizeVW = Number.parseFloat(fontSizeVW);

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

function adjustFontSize(px, vw) {
  localStorage.setItem(LOCALSTORAGE_PX, px);
  localStorage.setItem(LOCALSTORAGE_VW, vw);
  addNewStyle(
    '.no-fullwindow.no-fullscreen #text-track, .no-fullwindow.no-fullscreen .vjs-text-track-display div { font-size: ' + px + 'px !important } .fullscreen #text-track, .fullscreen .vjs-text-track-display div, .fullwindow.no-fullscreen #text-track, .fullwindow.no-fullscreen .vjs-text-track-display div { font-size: ' + vw + 'vw !important } ' +
    'video::-webkit-media-text-track-display { font-size: ' + px + 'px; }'
  );

  /*
  .no-fullwindow.no-fullscreen #text-track,
  .no-fullwindow.no-fullscreen .vjs-text-track-display div {
    font-size: ' + px + 'px !important
  }

  .fullscreen #text-track,
  .fullscreen .vjs-text-track-display div,
  .fullwindow.no-fullscreen #text-track,
  .fullwindow.no-fullscreen .vjs-text-track-display div,
   {
    font-size: ' + vw + 'vw !important
   }

   video::-webkit-media-text-track-display {
     font-size: ' + px + 'px;
   }
   */
}

function resetFontSize() {
  $('#' + STYLE_ID).html('');
  localStorage.removeItem(LOCALSTORAGE_PX);
  localStorage.removeItem(LOCALSTORAGE_VW);
  fontSizePX = INITIAL_FONT_SIZE_PX;
  fontSizeVW = INITIAL_FONT_SIZE_VW;
}

function smallerFontSize() {
  adjustFontSize(fontSizePX -= FONT_SIZE_RANGE_PX, fontSizeVW -= FONT_SIZE_RANGE_VW);
}

function largerFontSize() {
  adjustFontSize(fontSizePX += FONT_SIZE_RANGE_PX, fontSizeVW += FONT_SIZE_RANGE_VW);
}

function handleOnKeyDown(e) {
  const { keyCode } = e;

  switch(keyCode) {
    case 32:
      $(".player-real").click();
      break;
    default:
      // Do nothing
  }
}

// Init Font Size if already stored in localStorage
if (localStorage.getItem(LOCALSTORAGE_PX) && localStorage.getItem(LOCALSTORAGE_VW)) {
  adjustFontSize(fontSizePX, fontSizeVW);
}

// Check if player is on
setInterval(function() {
  var $setting = $('.setting-panel');
  var $player = $(".player-real");

  // Handle Keydown Event
  /*
  if ($player.length > 0 && !keydownEventRegister) {
    keydownEventRegister = true;
    window.addEventListener('keydown', handleOnKeyDown);
  } else if ($player.length === 0 && keydownEventRegister) {
    window.removeEventListener('keydown', handleOnKeyDown);
    keydownEventRegister = false;
  }
  */

  // Handle Setting Pannel
  if ($setting.length > 0) {
    if ($('.sub-master').length === 0) {
      $setting.append('<div class="sub-master"></div>');
      $('.sub-master').append('<span class="col"><span class="title">字體</span></span>');
      $('.sub-master').append('<span class="col"><span class="sub-master-btn _small">縮小</span></span>');
      $('.sub-master').append('<span class="col"><span class="sub-master-btn _large">放大</span></span>');
      $('.sub-master').append('<span class="col"><span class="sub-master-btn _reset">重置</span></span>');
      $('.sub-master-btn._small').click(smallerFontSize);
      $('.sub-master-btn._reset').click(resetFontSize);
      $('.sub-master-btn._large').click(largerFontSize);
    }
  }
}, 1000);
