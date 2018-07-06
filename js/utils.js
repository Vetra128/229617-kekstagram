'use strict';
(function () {
  var Keycode = {
    ESC: 27,
    ENTER: 13
  };
  var DEBOUNCE_TIME = 500;

  window.utils = {
    isEscEvent: function (evt, callback) {
      if (evt.keyCode === Keycode.ESC) {
        callback();
      }
    },
    isEnterEvent: function (evt, callback) {
      if (evt.keyCode === Keycode.ENTER) {
        callback();
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
    },
    debounce: function (func) {
      var lastTimeout;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(func, DEBOUNCE_TIME);
      return lastTimeout;
    }
  };
})();
