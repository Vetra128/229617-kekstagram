'use strict';
(function () {
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
  var INDEX_COMMENT_MAX = COMMENTS.length - 1;
  var INDEX_DESCRIPTION_MAX = DESCRIPTIONS.length - 1;

  var fillPhotoComments = function (photo) {
    if (window.utils.getRandomInteger(COMMENTS_MIN_COUNT, COMMENTS_MAX_COUNT) === COMMENTS_MAX_COUNT) {
      var firstComment = COMMENTS[window.utils.getRandomInteger(0, INDEX_COMMENT_MAX)];
      var secondComment = COMMENTS[window.utils.getRandomInteger(0, INDEX_COMMENT_MAX)];
      while (firstComment === secondComment) {
        secondComment = COMMENTS[window.utils.getRandomInteger(0, INDEX_COMMENT_MAX)];
      }
      photo.comments = [firstComment, secondComment];
    } else {
      photo.comments = [COMMENTS[window.utils.getRandomInteger(0, INDEX_COMMENT_MAX)]];
    }
  };

  var createArrayOfPhotos = function () {
    var photos = [];
    for (var i = 1; i <= PHOTOS_COUNT; i++) {
      var photo = {};
      photo.url = 'photos/' + i + '.jpg';
      photo.likes = window.utils.getRandomInteger(LIKES_MIN, LIKES_MAX);
      fillPhotoComments(photo);
      photo.description = DESCRIPTIONS[window.utils.getRandomInteger(0, INDEX_DESCRIPTION_MAX)];
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

  var createPhotoList = function (data) {
    var similarPhotoList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PHOTOS_COUNT; i++) {

      fragment.appendChild(createPhoto(data[i]));
    }
    similarPhotoList.appendChild(fragment);

  };

  window.backend.load(createPhotoList, window.utils.onError);

  window.data = {
    photos: createArrayOfPhotos()
  };
})();
