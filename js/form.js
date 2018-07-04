'use strict';
(function () {
  var HASHTAG_LENGTH_MIN = 2;
  var HASHTAG_LENGTH_MAX = 20;
  var HASHTAGS_MAX_COUNT = 5;
  var hashtagsInput = document.querySelector('.text__hashtags');
  var commentsTextarea = document.querySelector('.text__description');
  var uploadImageForm = document.querySelector('.img-upload__form');
  var uploadImageFormSubmit = uploadImageForm.querySelector('.img-upload__submit');
  var uploadImageFormOverlay = document.querySelector('.img-upload__overlay');

  var onHashtagsValidity = function () {
    var trimmedInput = hashtagsInput.value.trim();
    if (trimmedInput === '') {
      return;
    }
    var hashtags = trimmedInput.toLowerCase().split(' ');
    var hashtagsObj = {};
    hashtagsInput.setCustomValidity('');
    if (hashtags.length > HASHTAGS_MAX_COUNT) {
      hashtagsInput.setCustomValidity('максимальное количество хэштегов - 5');
      return;
    }
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].lastIndexOf('#') !== 0) {
        hashtagsInput.setCustomValidity('Хэштег должен начинаться с символа # и больше не иметь этого символа');
        return;
      }
      if ((hashtags[i].length < HASHTAG_LENGTH_MIN) || (hashtags[i].length > HASHTAG_LENGTH_MAX)) {
        hashtagsInput.setCustomValidity('Длина хэштега должна быть больше 2, но меньше 20 символов');
        return;
      }
      if (hashtagsObj.hasOwnProperty(hashtags[i])) {
        hashtagsInput.setCustomValidity('Не должно быть одинаковых хештегов');
        return;
      }
      hashtagsObj[hashtags[i]] = true;
    }
  };

  var onFieldEscPress = function (evt) {
    window.utils.isEscEvent(evt, evt.stopPropagation());
  };

  hashtagsInput.addEventListener('change', onHashtagsValidity);
  hashtagsInput.addEventListener('keydown', onFieldEscPress);
  commentsTextarea.addEventListener('keydown', onFieldEscPress);

  var onSuccessLoad = function () {
    uploadImageFormOverlay.classList.add('hidden');
  };

  var onErrorLoad = function (message) {
    var uploadImageFormErrorBlock = document.querySelector('.img-upload__message--error');
    uploadImageFormErrorBlock.textContent = message;
    uploadImageFormErrorBlock.style.zIndex = 2;
    uploadImageFormErrorBlock.classList.remove('hidden');
  };

  uploadImageForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    uploadImageFormSubmit.disabled = true;
    var data = new FormData(uploadImageForm);
    window.backend.upload(data, onSuccessLoad, onErrorLoad);
  });
})();
