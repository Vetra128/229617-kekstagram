'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomInteger: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    onError: function (message) {
      var errorBlock = document.querySelector('.img-upload__message--error');
      errorBlock.textContent = message;
      errorBlock.style.zIndex = 5;
      errorBlock.classList.remove('hidden');
    }
  };
})();
