'use strict';
(function () {
  var Hashtag = {
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
    MAX_COUNT: 5
  };
  var hashtagsInput = document.querySelector('.text__hashtags');
  var commentsTextarea = document.querySelector('.text__description');

  var onHashtagsValidity = function () {
    var trimmedInput = hashtagsInput.value.trim();
    if (trimmedInput === '') {
      return;
    }
    var hashtags = trimmedInput.toLowerCase().split(' ');
    var hashtagsObj = {};
    hashtagsInput.setCustomValidity('');
    if (hashtags.length > Hashtag.MAX_COUNT) {
      hashtagsInput.setCustomValidity('максимальное количество хэштегов - 5');
      return;
    }

    hashtags.forEach(function (hashtag) {
      if (hashtag.lastIndexOf('#') !== 0) {
        hashtagsInput.setCustomValidity('Хэштег должен начинаться с символа # и больше не иметь этого символа');
        return;
      }
      if ((hashtag.length < Hashtag.MIN_LENGTH) || (hashtag.length > Hashtag.MAX_LENGTH)) {
        hashtagsInput.setCustomValidity('Длина хэштега должна быть больше 2, но меньше 20 символов');
        return;
      }
      if (hashtagsObj.hasOwnProperty(hashtag)) {
        hashtagsInput.setCustomValidity('Не должно быть одинаковых хештегов');
        return;
      }
      hashtagsObj[hashtag] = true;
    });
  };

  var onFieldEscPress = function (evt) {
    window.utils.isEscEvent(evt, function () {
      evt.stopPropagation();
    });
  };

  var onSuccessLoad = function () {
    window.preview.onUploadImageFormClose();
  };

  var onUploadImageFormSubmit = function (evt) {
    evt.preventDefault();
    var data = new FormData(window.preview.uploadImageForm);
    window.backend.upload(data, onSuccessLoad, window.utils.onError);
  };

  hashtagsInput.addEventListener('change', onHashtagsValidity);
  hashtagsInput.addEventListener('keydown', onFieldEscPress);
  commentsTextarea.addEventListener('keydown', onFieldEscPress);
  window.preview.uploadImageForm.addEventListener('submit', onUploadImageFormSubmit);

  window.form = {
    hashtagsInput: hashtagsInput,
    commentsTextarea: commentsTextarea
  };
})();
