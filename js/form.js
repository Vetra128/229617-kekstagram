'use strict';
(function () {
  var Hashtag = {
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
    MAX_COUNT: 5
  };
  var hashtagsInput = document.querySelector('.text__hashtags');
  var commentsTextarea = document.querySelector('.text__description');
  var uploadImageForm = document.querySelector('.img-upload__form');

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
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].lastIndexOf('#') !== 0) {
        hashtagsInput.setCustomValidity('Хэштег должен начинаться с символа # и больше не иметь этого символа');
        return;
      }
      if ((hashtags[i].length < Hashtag.MIN_LENGTH) || (hashtags[i].length > Hashtag.MAX_LENGTH)) {
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
    window.utils.isEscEvent(evt, function(){evt.stopPropagation()});
  };

  var onSuccessLoad = function () {
    window.prewiew.onUploadImageFormClose();
  };

  var onUploadImageFormSubmit = function (evt) {
    evt.preventDefault();
    var data = new FormData(uploadImageForm);
    window.backend.upload(data, onSuccessLoad, window.utils.onError);
  };

  hashtagsInput.addEventListener('change', onHashtagsValidity);
  hashtagsInput.addEventListener('keydown', onFieldEscPress);
  commentsTextarea.addEventListener('keydown', onFieldEscPress);
  uploadImageForm.addEventListener('submit', onUploadImageFormSubmit);
})();
