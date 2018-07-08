'use strict';
(function () {
  var INDEX_AVATAR_MIN = 1;
  var INDEX_AVATAR_MAX = 6;
  var SCALE_LINE_LENGTH = 450;
  var PERCENTS_MAX = 100;
  var PHOBOS_BLURE_MAX = 3;
  var BRIGHTNES_MIN = 1;
  var BRIGHTNES_MAX = 3;
  var DEFAULT_SCALE_PIN = 100;
  var DEFAULT_SIZE = '100%';
  var RESIZE_STEP = 25;
  var uploadFile = document.querySelector('#upload-file');
  var uploadImageFormOverlay = document.querySelector('.img-upload__overlay');
  var uploadImageForm = document.querySelector('.img-upload__form');
  var uploadImageFormClose = document.querySelector('#upload-cancel');
  var scalePin = uploadImageForm.querySelector('.scale__pin');
  var scaleLine = uploadImageForm.querySelector('.scale__line');
  var scale = uploadImageForm.querySelector('.scale');
  var scaleLevel = uploadImageForm.querySelector('.scale__level');
  var scaleValue = uploadImageForm.querySelector('.scale__value');
  var effectPrewList = uploadImageForm.querySelector('.effects__list');
  var resizeBtnMinus = uploadImageForm.querySelector('.resize__control--minus');
  var resizeBtnPlus = uploadImageForm.querySelector('.resize__control--plus');
  var scaleSizeInput = uploadImageForm.querySelector('.resize__control--value');
  var imgPreview = uploadImageForm.querySelector('.img-upload__preview');
  var picturesGalery = document.querySelector('.pictures');
  var detailedPhoto = document.querySelector('.big-picture');
  var detailedPhotoImg = detailedPhoto.querySelector('.big-picture__img > img');
  var detailedPhotoLikes = detailedPhoto.querySelector('.likes-count');
  var detailedPhotoComments = detailedPhoto.querySelector('.comments-count');
  var detailedPhotoCloseBtn = detailedPhoto.querySelector('.big-picture__cancel');
  var detailedPhotoCommentList = detailedPhoto.querySelector('.social__comments');
  var detailedPhotoCounterOfComment = detailedPhoto.querySelector('.social__comment-count');
  var detailedPhotoLoadmore = detailedPhoto.querySelector('.social__loadmore');
  var modifier;
  var scaleSizeValue = PERCENTS_MAX;
  var uploadImageFormHashtagsInput = uploadImageForm.querySelector('.text__hashtags');
  var uploadImageFormCommentTextarea = uploadImageForm.querySelector('.text__description');
  var body = document.querySelector('body');

  var showDetailedPhoto = function (photo) {
    detailedPhoto.classList.remove('hidden');

    detailedPhotoImg.src = photo.url;
    detailedPhotoLikes.textContent = photo.likes;
    detailedPhotoComments.textContent = photo.comments.length;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photo.comments.length; i++) {
      var detailedPhotoComment = detailedPhoto.querySelector('.social__comment').cloneNode(true);
      detailedPhotoComment.querySelector('.social__picture').src = 'img/avatar-' + (window.utils.getRandomInteger(INDEX_AVATAR_MIN, INDEX_AVATAR_MAX)) + '.svg';
      detailedPhotoComment.querySelector('.social__text').textContent = photo.comments[i];
      fragment.appendChild(detailedPhotoComment);
    }

    while (detailedPhotoCommentList.lastChild) {
      detailedPhotoCommentList.removeChild(detailedPhotoCommentList.lastChild);
    }

    detailedPhotoCommentList.appendChild(fragment);
    detailedPhotoCounterOfComment.classList.add('visually-hidden');
    detailedPhotoLoadmore.classList.add('visually-hidden');
  };

  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, onUploadImageFormClose);
  };

  var onUploadImageFormOpen = function () {
    uploadImageFormOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    scale.addEventListener('mousedown', onScalePinMouseDown);
    resizeBtnMinus.addEventListener('click', onScaleSizeDecrease);
    resizeBtnPlus.addEventListener('click', onScaleSizeIncrease);
    effectPrewList.addEventListener('click', onEffectPrewClick);
    uploadImageFormHashtagsInput.addEventListener('keydown', onUploadImageFormFieldPress);
    uploadImageFormCommentTextarea.addEventListener('keydown', onUploadImageFormFieldPress);
    scalePin.style.left = DEFAULT_SCALE_PIN + '%';
    scaleLevel.style.width = DEFAULT_SCALE_PIN + '%';
    scaleSizeInput.value = DEFAULT_SIZE;
    scaleSizeInput.setAttribute('value', PERCENTS_MAX + '%');
  };

  var onUploadImageFormFieldPress = function (evt) {
    window.utils.isEscEvent(evt, function () {
      evt.stopPropagation();
    });
  };

  var onUploadImageFormClear = function () {
    uploadImageForm.reset();
    scaleValue.value = DEFAULT_SCALE_PIN;
    scalePin.style.left = DEFAULT_SCALE_PIN + '%';
    scaleLevel.style.width = DEFAULT_SCALE_PIN + '%';
    scaleSizeInput.value = DEFAULT_SIZE;
    scaleSizeInput.setAttribute('value', PERCENTS_MAX + '%');
  };

  var onUploadImageFormClose = function () {
    uploadImageFormOverlay.classList.add('hidden');
    uploadFile.value = '';
    imgPreview.style.transform = '';
    document.removeEventListener('keydown', onPopupEscPress);
    scale.removeEventListener('mouseup', onScalePinMouseUp);
    resizeBtnMinus.removeEventListener('click', onScaleSizeDecrease);
    resizeBtnPlus.removeEventListener('click', onScaleSizeIncrease);
    effectPrewList.removeEventListener('click', onEffectPrewClick);
    uploadImageFormHashtagsInput.removeEventListener('keydown', onUploadImageFormFieldPress);
    uploadImageFormCommentTextarea.removeEventListener('keydown', onUploadImageFormFieldPress);
    onUploadImageFormClear();
  };

  var onDetaliedPhotoEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeDetaliedPhoto);
  };

  var onDetaliedPhotoClosePress = function (evt) {
    window.utils.isEnterEvent(evt, closeDetaliedPhoto);
  };

  var closeDetaliedPhoto = function () {
    detailedPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onDetaliedPhotoEscPress);
    body.classList.remove('modal-open');
  };

  var openDetaliedPhoto = function () {
    detailedPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onDetaliedPhotoEscPress);
    detailedPhotoCloseBtn.addEventListener('click', closeDetaliedPhoto);
    detailedPhotoCloseBtn.addEventListener('keydown', onDetaliedPhotoClosePress);
    body.classList.add('modal-open');
  };

  var changeImgPreviewStyle = function (modifierClass, scaleEffect) {
    switch (modifierClass.value) {
      case 'chrome':
        imgPreview.style.filter = 'grayscale(' + scaleEffect.value / PERCENTS_MAX + ')';
        break;
      case 'sepia':
        imgPreview.style.filter = 'sepia(' + scaleEffect.value / PERCENTS_MAX + ')';
        break;
      case 'marvin':
        imgPreview.style.filter = 'invert(' + scaleEffect.value + '%)';
        break;
      case 'phobos':
        imgPreview.style.filter = 'blur(' + (scaleEffect.value * PHOBOS_BLURE_MAX / PERCENTS_MAX) + 'px)';
        break;
      case 'heat':
        imgPreview.style.filter = 'brightness(' + (BRIGHTNES_MIN + scaleEffect.value * (BRIGHTNES_MAX - BRIGHTNES_MIN) / PERCENTS_MAX) + ')';
        break;
      default:
        break;
    }
  };

  var onScalePinMouseUp = function (evt) {
    onScalePinMouseMove(evt);
    scale.removeEventListener('mouseup', onScalePinMouseUp);
    scale.removeEventListener('mousemove', onScalePinMouseMove);
    scale.removeEventListener('mouseleave', onScalePinMouseUp);
  };

  var onScalePinMouseDown = function () {
    scale.addEventListener('mouseup', onScalePinMouseUp);
    scale.addEventListener('mousemove', onScalePinMouseMove);
    scale.addEventListener('mouseleave', onScalePinMouseUp);
  };

  var calculateScaleValue = function () {
    var scaleValuePercent;
    if (scaleValue.value <= PERCENTS_MAX) {
      scaleValuePercent = (scaleValue.value <= 0) ? '0%' : (scaleValue.value + '%');
      scalePin.style.left = scaleValuePercent;
      scaleLevel.style.width = scaleValuePercent;
    } else {
      scalePin.style.left = '100%';
      scaleLevel.style.width = '100%';
    }
  };

  var onScalePinMouseMove = function (evt) {
    var scaleLineX = scaleLine.getBoundingClientRect().x;
    scaleValue.value = Math.floor((evt.clientX - scaleLineX) * PERCENTS_MAX / SCALE_LINE_LENGTH);
    calculateScaleValue();
    if (modifier) {
      changeImgPreviewStyle(modifier, scaleValue);
    }
  };

  var onEffectPrewClick = function (evt) {
    if (evt.target.classList.contains('effects__radio')) {
      scaleValue.value = 0;
      if (modifier) {
        imgPreview.classList.remove('effects__preview--' + modifier.value);
        imgPreview.style.filter = '';
      }
      modifier = evt.target;
      if (modifier.value !== 'none') {
        imgPreview.classList.add('effects__preview--' + modifier.value);
        scale.classList.remove('hidden');
        scalePin.style.left = '100%';
        scaleLevel.style.width = '100%';
      } else {
        scale.classList.add('hidden');
      }
    }
  };

  var onScaleSizeIncrease = function () {
    if (scaleSizeValue < (PERCENTS_MAX - RESIZE_STEP)) {
      scaleSizeValue = scaleSizeValue + RESIZE_STEP;
      scaleSizeInput.setAttribute('value', scaleSizeValue + '%');
      imgPreview.style.transform = 'scale(0.' + scaleSizeValue + ')';
    } else {
      scaleSizeValue = PERCENTS_MAX;
      scaleSizeInput.setAttribute('value', PERCENTS_MAX + '%');
      imgPreview.style.transform = '';
    }
    scaleSizeInput.value = scaleSizeValue + '%';
  };

  var onScaleSizeDecrease = function () {
    scaleSizeValue = (scaleSizeValue >= (RESIZE_STEP + RESIZE_STEP)) ? (scaleSizeValue - RESIZE_STEP) : RESIZE_STEP;
    scaleSizeInput.setAttribute('value', scaleSizeValue + '%');
    imgPreview.style.transform = 'scale(0.' + scaleSizeValue + ')';
    scaleSizeInput.value = scaleSizeValue + '%';
  };

  var onPicturesGaleryClick = function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      var fullPath = evt.target.src;
      var filename = fullPath.split('/').pop().split('.')[0];
      showDetailedPhoto(window.data.photos[filename - 1]);
      openDetaliedPhoto();
    }
  };

  var onUploadImageFormCloseBtnEnter = function (evt) {
    window.utils.isEnterEvent(evt, onUploadImageFormClose);
  };

  uploadFile.addEventListener('change', onUploadImageFormOpen);

  uploadImageFormClose.addEventListener('click', onUploadImageFormClose);

  uploadImageFormClose.addEventListener('keydown', onUploadImageFormCloseBtnEnter);

  picturesGalery.addEventListener('click', onPicturesGaleryClick);

  window.prewiew = {
    onUploadImageFormClose: onUploadImageFormClose
  };
})();
