'use strict';

var PHOTOS_COUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN_COUNT = 1;
var COMMENTS_MAX_COUNT = 2;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var INDEX_AVATAR_MIN = 1;
var INDEX_AVATAR_MAX = 6;
var INDEX_COMMENT_MAX = COMMENTS.length - 1;
var INDEX_DESCRIPTION_MAX = DESCRIPTIONS.length - 1;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var SCALE_LINE_LENGTH = 450;
var PERCENTS_MAX = 100;
var PHOBOS_BLURE_MAX = 3;
var BRIGHTNES_MIN = 1;
var BRIGHTNES_MAX = 3;
var HASHTAG_LENGTH_MIN = 2;
var HASHTAG_LENGTH_MAX = 20;
var HASHTAGS_MAX_COUNT = 5;

var uploadFile = document.querySelector('#upload-file');
var uploadImageForm = document.querySelector('.img-upload__overlay');
var uploadImageFormClose = document.querySelector('#upload-cancel');
var scalePin = uploadImageForm.querySelector('.scale__pin');
var scaleLine = uploadImageForm.querySelector('.scale__line');
var scale = uploadImageForm.querySelector('.scale');
var scaleLevel = uploadImageForm.querySelector('.scale__level');
var scaleValue = uploadImageForm.querySelector('.scale__value');
var effectPrewList = uploadImageForm.querySelector('.effects__list');
var imgPreview = uploadImageForm.querySelector('.img-upload__preview');
var picturesGalery = document.querySelector('.pictures');
var detailedPhoto = document.querySelector('.big-picture');
var detailedPhotoCloseBtn = detailedPhoto.querySelector('.big-picture__cancel');
var modifier;
var hashtagsInput = document.querySelector('.text__hashtags');
var commentsTextarea = document.querySelector('.text__description');

var randomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var fillPhotoComments = function (photo) {
  if (randomInteger(COMMENTS_MIN_COUNT, COMMENTS_MAX_COUNT) === COMMENTS_MAX_COUNT) {
    var firstComment = COMMENTS[randomInteger(0, INDEX_COMMENT_MAX)];
    var secondComment = COMMENTS[randomInteger(0, INDEX_COMMENT_MAX)];
    while (firstComment === secondComment) {
      secondComment = COMMENTS[randomInteger(0, INDEX_COMMENT_MAX)];
    }
    photo.comments = [firstComment, secondComment];
  } else {
    photo.comments = [COMMENTS[randomInteger(0, INDEX_COMMENT_MAX)]];
  }
};

var createArrayOfPhotos = function () {
  var photos = [];
  for (var i = 1; i <= PHOTOS_COUNT; i++) {
    var photo = {};
    photo.url = 'photos/' + i + '.jpg';
    photo.likes = randomInteger(LIKES_MIN, LIKES_MAX);
    fillPhotoComments(photo);
    photo.description = DESCRIPTIONS[randomInteger(0, INDEX_DESCRIPTION_MAX)];
    photos.push(photo);
  }
  return photos;
};

var createPhoto = function (photo) {
  var similarPhotoTemplate = document.querySelector('#picture').content;
  var photography = similarPhotoTemplate.cloneNode(true);

  photography.querySelector('.picture__img').src = photo.url;
  photography.querySelector('.picture__stat--likes').textContent = photo.likes;
  photography.querySelector('.picture__stat--comments').textContent = photo.comments.length;

  return photography;
};

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
    detailedPhotoPicture.src = 'img/avatar-' + (randomInteger(INDEX_AVATAR_MIN, INDEX_AVATAR_MAX)) + '.svg';
    detailedPhotoText.textContent = photo.comments[i];
    fragment.appendChild(detailedPhotoComment);
  }

  detailedPhotoCommentList.appendChild(fragment);

  var detailedPhotoCounterOfComment = document.querySelector('.social__comment-count');
  var detailedPhotoLoadmore = document.querySelector('.social__loadmore');
  detailedPhotoCounterOfComment.classList.add('visually-hidden');
  detailedPhotoLoadmore.classList.add('visually-hidden');
};

var createPhotoList = function () {
  var similarPhotoList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTOS_COUNT; i++) {

    fragment.appendChild(createPhoto(photos[i]));
  }
  similarPhotoList.appendChild(fragment);
};

var photos = createArrayOfPhotos();

createPhotoList();

showDetailedPhoto(detailedPhoto, photos[0]);

detailedPhoto.classList.add('hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onUploadImageFormClose();
  }
};

var onUploadImageFormOpen = function () {
  uploadImageForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  scale.addEventListener('mousedown', onScalePinMouseDown);
  effectPrewList.addEventListener('click', onEffectPrewClick);
};

var onUploadImageFormClose = function () {
  uploadImageForm.classList.add('hidden');
  uploadFile.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
  scale.removeEventListener('mouseup', onScalePinMouseUp);
  effectPrewList.removeEventListener('click', onEffectPrewClick);
};

uploadFile.addEventListener('change', onUploadImageFormOpen);

uploadImageFormClose.addEventListener('click', onUploadImageFormClose);

uploadImageFormClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onUploadImageFormClose();
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

var onDetaliedPhotoEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeDetaliedPhoto();
  }
};

var onDetaliedPhotoClosePress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeDetaliedPhoto();
  }
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
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
};

hashtagsInput.addEventListener('change', onHashtagsValidity);
hashtagsInput.addEventListener('keydown', onFieldEscPress);
commentsTextarea.addEventListener('keydown', onFieldEscPress);


