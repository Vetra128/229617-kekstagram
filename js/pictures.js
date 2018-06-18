'use strict';

var PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COUNT_COMMENT = 1;
var MAX_COUNT_COMMENT = 2;
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
var MIN_INDEX_AVATAR = 1;
var MAX_INDEX_AVATAR = 6;
var MAX_INDEX_COMMENT = COMMENTS.length - 1;
var MAX_INDEX_DESCRIPTION = DESCRIPTIONS.length - 1;

var randomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var fillPhotoComments = function (photo) {
  if (randomInteger(MIN_COUNT_COMMENT, MAX_COUNT_COMMENT) === MAX_COUNT_COMMENT) {
    var firstComment = COMMENTS[randomInteger(0, MAX_INDEX_COMMENT)];
    var secondComment = COMMENTS[randomInteger(0, MAX_INDEX_COMMENT)];
    while (firstComment === secondComment) {
      secondComment = COMMENTS[randomInteger(0, MAX_INDEX_COMMENT)];
    }
    photo.comments = [firstComment, secondComment];
  } else {
    photo.comments = [COMMENTS[randomInteger(0, MAX_INDEX_COMMENT)]];
  }
};

var createArrayOfPhotos = function () {
  var photos = [];
  for (var i = 1; i <= PHOTOS; i++) {
    var photo = {};
    photo.url = 'photos/' + i + '.jpg';
    photo.likes = randomInteger(MIN_LIKES, MAX_LIKES);
    fillPhotoComments(photo);
    photo.description = DESCRIPTIONS[randomInteger(0, MAX_INDEX_DESCRIPTION)];
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

var showDetailedPhoto = function (detailedPhoto, photo) {
  detailedPhoto.classList.remove('hidden');

  detailedPhoto.querySelector('.big-picture__img').src = photo.url;
  detailedPhoto.querySelector('.likes-count').textContent = photo.likes;
  detailedPhoto.querySelector('.comments-count').textContent = photo.comments.length;

  var detailedPhotoComment = detailedPhoto.querySelector('.social__comment').cloneNode(true);
  var detailedPhotoCommentList = detailedPhoto.querySelector('.social__comments');
  var detailedPhotoPicture = detailedPhoto.querySelector('.social__picture');
  var detailedPhotoText = detailedPhoto.querySelector('.social__text');
  var detailedPhotoDescription = detailedPhoto.querySelector('.social__caption');
  var fragment = document.createDocumentFragment();

  detailedPhotoDescription.textContent = photo.description;

  for (var i = 0; i < photo.comments.length; i++) {
    detailedPhotoPicture.src = 'img/avatar-' + (randomInteger(MIN_INDEX_AVATAR, MAX_INDEX_AVATAR)) + '.svg';
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

  for (var i = 0; i < PHOTOS; i++) {

    fragment.appendChild(createPhoto(photos[i]));
  }
  similarPhotoList.appendChild(fragment);
};

var detailedPhoto = document.querySelector('.big-picture');

var photos = createArrayOfPhotos();

createPhotoList();

showDetailedPhoto(detailedPhoto, photos[0]);
