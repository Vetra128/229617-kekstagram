'use strict';

var NUMBER_OF_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_NUMBER_OF_COMMEMT = 1;
var MAX_NUMBER_OF_COMMEMT = 2;
var ARRAY_OF_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var ARRAY_OF_DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var randomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var LengthArrayOfComments = ARRAY_OF_COMMENTS.length;
var LengthArrayOfDescriptions = ARRAY_OF_DESCRIPTIONS.length;

var fillPhotoComments = function (photo) {
  if (randomInteger(MIN_NUMBER_OF_COMMEMT, MAX_NUMBER_OF_COMMEMT) === 2) {
    var firstComment = ARRAY_OF_COMMENTS[randomInteger(0, LengthArrayOfComments - 1)];
    var secondComment = ARRAY_OF_COMMENTS[randomInteger(0, LengthArrayOfComments - 1)];
    while (firstComment === secondComment) {
      secondComment = ARRAY_OF_COMMENTS[randomInteger(0, LengthArrayOfComments - 1)];
    }
    photo.comments = [firstComment, secondComment];
  } else {
    photo.comments = [ARRAY_OF_COMMENTS[randomInteger(0, LengthArrayOfComments - 1)]];
  }
};

var createArrayOfPhotos = function () {
  var photos = [];
  for (var i = 1; i <= NUMBER_OF_PHOTOS; i++) {
    var photo = {};
    photo.url = 'photos/' + i + '.jpg';
    photo.likes = randomInteger(MIN_LIKES, MAX_LIKES);
    fillPhotoComments(photo);
    photo.description = ARRAY_OF_DESCRIPTIONS[randomInteger(0, LengthArrayOfDescriptions - 1)];
    photos.push(photo);
  }
  return photos;
};

var photos = createArrayOfPhotos();

var similarPhotoListElement = document.querySelector('.pictures');

var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

var renderPhoto = function (photo) {
  var photoElement = similarPhotoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;

  return photoElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {

  fragment.appendChild(renderPhoto(photos[i]));
}

similarPhotoListElement.appendChild(fragment);

var bigPhoto = document.querySelector('.big-picture');

var showBigPhoto = function (bigPhotoElement, photo) {
  bigPhotoElement.classList.remove('hidden');

  document.querySelector('.big-picture__img').src = photo.url;
  document.querySelector('.likes-count').textContent = photo.likes;
  document.querySelector('.comments-count').textContent = photo.comments.length;

  var bigPhotoCommentElement = document.querySelector('.social__comment').cloneNode(true);
  var bigPhotoCommentList = document.querySelector('.social__comments');
  var bigPhotoCommentPicture = document.querySelector('.social__picture');
  var bigPhotoCommentText = document.querySelector('.social__text');

  for (i = 0; i < photo.comments.length; i++) {
    bigPhotoCommentPicture.src = 'img/avatar-' + (randomInteger(1, 6)) + '.svg';
    bigPhotoCommentText.textContent = photo.comments[i];
    bigPhotoCommentList.appendChild(bigPhotoCommentElement);
  }
};

showBigPhoto(bigPhoto, photos[0]);
