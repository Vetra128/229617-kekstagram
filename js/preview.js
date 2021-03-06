'use strict';
(function () {
  var INDEX_AVATAR_MIN = 1;
  var INDEX_AVATAR_MAX = 6;
  var SCALE_LINE_LENGTH = 450;
  var PERCENTS_MAX = 100;
  var PHOBOS_BLURE_MAX = 3;
  var BRIGHTNES_MIN = 1;
  var BRIGHTNES_MAX = 3;
  var DEFAULT_SCALE_PIN = 20;
  var DEFAULT_SIZE = '55%';
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
  var detailedPhotoCloseBtn = detailedPhoto.querySelector('.big-picture__cancel');
  var modifier;
  var scaleSizeValue = parseInt(scaleSizeInput.value, 10);

  var showDetailedPhoto = function (detailedBigPhoto, photo) {
    detailedBigPhoto.classList.remove('hidden');

    detailedBigPhoto.querySelector('.big-picture__img').src = photo.url;
    detailedBigPhoto.querySelector('.likes-count').textContent = photo.likes;
    detailedBigPhoto.querySelector('.comments-count').textContent = photo.comments.length;

    var detailedPhotoComment = detailedBigPhoto.querySelector('.social__comment').cloneNode(true);
    var detailedPhotoCommentList = detailedBigPhoto.querySelector('.social__comments');
    var detailedPhotoPicture = detailedBigPhoto.querySelector('.social__picture');
    var detailedPhotoText = detailedBigPhoto.querySelector('.social__text');
    var detailedPhotoDescription = detailedBigPhoto.querySelector('.social__caption');
    var fragment = document.createDocumentFragment();

    detailedPhotoDescription.textContent = photo.description;

    for (var i = 0; i < photo.comments.length; i++) {
      detailedPhotoPicture.src = 'img/avatar-' + (window.utils.getRandomInteger(INDEX_AVATAR_MIN, INDEX_AVATAR_MAX)) + '.svg';
      detailedPhotoText.textContent = photo.comments[i];
      fragment.appendChild(detailedPhotoComment);
    }

    detailedPhotoCommentList.appendChild(fragment);

    var detailedPhotoCounterOfComment = document.querySelector('.social__comment-count');
    var detailedPhotoLoadmore = document.querySelector('.social__loadmore');
    detailedPhotoCounterOfComment.classList.add('visually-hidden');
    detailedPhotoLoadmore.classList.add('visually-hidden');
  };

  showDetailedPhoto(detailedPhoto, window.data.photos[0]);
  detailedPhoto.classList.add('hidden');

  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, onUploadImageFormClose());
  };

  var onUploadImageFormOpen = function () {
    uploadImageFormOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    scale.addEventListener('mousedown', onScalePinMouseDown);
    resizeBtnMinus.addEventListener('click', onScaleSizeDecrease);
    resizeBtnPlus.addEventListener('click', onScaleSizeIncrease);
    effectPrewList.addEventListener('click', onEffectPrewClick);
  };

  var onUploadImageFormClear = function () {
    uploadImageForm.reset();
    scaleValue.value = DEFAULT_SCALE_PIN;
    scalePin.style.left = DEFAULT_SCALE_PIN + '%';
    scaleLevel.style.width = DEFAULT_SCALE_PIN + '%';
    scaleSizeInput.value = DEFAULT_SIZE;
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
    onUploadImageFormClear();
  };

  uploadFile.addEventListener('change', onUploadImageFormOpen);

  uploadImageFormClose.addEventListener('click', onUploadImageFormClose);

  uploadImageFormClose.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, onUploadImageFormClose());
  });

  var onDetaliedPhotoEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeDetaliedPhoto());
  };

  var onDetaliedPhotoClosePress = function (evt) {
    window.utils.isEnterEvent(evt, closeDetaliedPhoto());
  };

  var closeDetaliedPhoto = function () {
    detailedPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onDetaliedPhotoEscPress);
  };

  var openDetaliedPhoto = function () {
    detailedPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onDetaliedPhotoEscPress);
    detailedPhotoCloseBtn.addEventListener('click', closeDetaliedPhoto);
    detailedPhotoCloseBtn.addEventListener('keydown', onDetaliedPhotoClosePress);
  };

  picturesGalery.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      openDetaliedPhoto();
    }
  });

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
    if (scaleValue.value <= 100) {
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
      }
    }
  };

  var onScaleSizeIncrease = function () {
    if (scaleSizeValue < (PERCENTS_MAX - RESIZE_STEP)) {
      scaleSizeValue = scaleSizeValue + RESIZE_STEP;
      imgPreview.style.transform = 'scale(0.' + scaleSizeValue + ')';
    } else {
      scaleSizeValue = PERCENTS_MAX;
      imgPreview.style.transform = '';
    }
    scaleSizeInput.value = scaleSizeValue + '%';
  };

  var onScaleSizeDecrease = function () {
    if (scaleSizeValue >= (RESIZE_STEP + RESIZE_STEP)) {
      scaleSizeValue = scaleSizeValue - RESIZE_STEP;
    } else {
      scaleSizeValue = RESIZE_STEP;
    }
    imgPreview.style.transform = 'scale(0.' + scaleSizeValue + ')';
    scaleSizeInput.value = scaleSizeValue + '%';
  };

  window.prewiew = {
    onUploadImageFormClose: onUploadImageFormClose
  };
})();
