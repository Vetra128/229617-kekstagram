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

var uploadFile = document.querySelector('#upload-file');
var uploadImageForm = document.querySelector('.img-upload__overlay');
var uploadImageFormClose = document.querySelector('#upload-cancel');
var scalePin = uploadImageForm.querySelector('.scale__pin');
var scaleLine = uploadImageForm.querySelector('.scale__line');
var scaleValue = uploadImageForm.querySelector('.scale__value');
var effectPrewList = uploadImageForm.querySelector('.effects__list');
var imgPreview = uploadImageForm.querySelector('.img-upload__preview');
var picturesGalery = document.querySelector('.pictures');
var detailedPhoto = document.querySelector('.big-picture');
var detailedPhotoCloseBtn = detailedPhoto.querySelector('.big-picture__cancel');
var modifire;
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
    closeUploadImageForm();
  }
};

var openUploadImageForm = function () {
  uploadImageForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  scalePin.addEventListener('mouseup', changeScalePin);
  effectPrewList.addEventListener('click', changeEffect);
};

var closeUploadImageForm = function () {
  uploadImageForm.classList.add('hidden');
  uploadFile.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
  scalePin.removeEventListener('mouseup', changeScalePin);
  effectPrewList.removeEventListener('click', changeEffect);
};

uploadFile.addEventListener('change', function () {
  openUploadImageForm();
});

uploadImageFormClose.addEventListener('click', function () {
  closeUploadImageForm();
});

uploadImageFormClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeUploadImageForm();
  }
});

var changeScalePin = function (evt) {
  var scaleLineX = scaleLine.getBoundingClientRect().x;
  scaleValue.value = Math.floor((evt.clientX - scaleLineX) * PERCENTS_MAX / SCALE_LINE_LENGTH);
  if (modifire) {
    switch (modifire.value) {
      case 'chrome':
        imgPreview.style.filter = 'grayscale(' + scaleValue.value / PERCENTS_MAX + ')';
        break;
      case 'sepia':
        imgPreview.style.filter = 'sepia(' + scaleValue.value / PERCENTS_MAX + ')';
        break;
      case 'marvin':
        imgPreview.style.filter = 'invert(' + scaleValue.value + '%)';
        break;
      case 'phobos':
        imgPreview.style.filter = 'blur(' + (scaleValue.value * PHOBOS_BLURE_MAX / PERCENTS_MAX) + 'px)';
        break;
      case 'heat':
        imgPreview.style.filter = 'brightness(' + (BRIGHTNES_MIN + scaleValue.value * (BRIGHTNES_MAX - BRIGHTNES_MIN) / PERCENTS_MAX) + ')';
        break;
      default:
        break;
    }
  }
};

var changeEffect = function (evt) {
  if (evt.target.classList.contains('effects__radio')) {
    scaleValue.value = 0;
    if (modifire) {
      imgPreview.classList.remove('effects__preview--' + modifire.value);
      imgPreview.style.filter = '';
    }
    modifire = evt.target;
    if (modifire.value !== 'none') {
      imgPreview.classList.add('effects__preview--' + modifire.value);
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


var validityHashtags = function () {
  var hashtags = hashtagsInput.value.trim().toLowerCase().split(' ');
  hashtagsInput.setCustomValidity('');

  if (hashtagsInput.value.trim() === '') {
    return;
  } else if (hashtags.length > 5) {
    hashtagsInput.setCustomValidity('максимальное количество хэштегов - 5');
    return;
  } else if (hashtags.length > 0) {
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].length < 2) {
        hashtagsInput.setCustomValidity('Длина хэштега должна быть больше 2 символов');
        return;
      } else if (hashtags[i].length > 20) {
        hashtagsInput.setCustomValidity('Длина хэштега должна быть меньше 20 символов');
        return;
      } else if (hashtags[i][0] !== '#') {
        hashtagsInput.setCustomValidity('Хэштег должен начинаться с символа #');
        return;
      }
      for (var j = 1; j < hashtags[i].length; j++) {
        if (hashtags[i][j] === '#') {
          hashtagsInput.setCustomValidity('Хэштег не должен иметь внутри символ #');
          return;
        }
      }
    }
  }
  for (i = 0; i < hashtags.length; i++) {
    for (j = 0; j < hashtags.length; j++) {
      if ((hashtags[i] === hashtags[j]) && (i !== j)) {
        hashtagsInput.setCustomValidity('Не должно быть одинаковых хэштегов');
        return;
      }
    }
  }
};

var onFieldFocusEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
};

hashtagsInput.addEventListener('change', validityHashtags);
hashtagsInput.addEventListener('keydown', onFieldFocusEscPress);
commentsTextarea.addEventListener('keydown', onFieldFocusEscPress);


