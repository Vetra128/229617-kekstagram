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
var MIN_INDEX_AVATAR = 1;
var MAX_INDEX_AVATAR = 6;

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

var similarPhotoTemplate = document.querySelector('#picture').content;

var createPhoto = function (photo) {
  var photoElement = similarPhotoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;

  return photoElement;
};

var detailedPhoto = document.querySelector('.big-picture');

var showDetailedPhoto = function (detailedPhotoElement, photo) {
  detailedPhotoElement.classList.remove('hidden');

  detailedPhoto.querySelector('.big-picture__img').src = photo.url;
  detailedPhoto.querySelector('.likes-count').textContent = photo.likes;
  detailedPhoto.querySelector('.comments-count').textContent = photo.comments.length;

  var detailedPhotoCommentElement = detailedPhoto.querySelector('.social__comment').cloneNode(true);
  var detailedPhotoCommentList = detailedPhoto.querySelector('.social__comments');
  var detailedPhotoPicture = detailedPhoto.querySelector('.social__picture');
  var detailedPhotoText = detailedPhoto.querySelector('.social__text');
  var detailedPhotoDescription = detailedPhoto.querySelector('.social__caption');

  detailedPhotoDescription.textContent = photo.description;

  for (i = 0; i < photo.comments.length; i++) {
    detailedPhotoPicture.src = 'img/avatar-' + (randomInteger(MIN_INDEX_AVATAR, MAX_INDEX_AVATAR)) + '.svg';
    detailedPhotoText.textContent = photo.comments[i];
    fragment.appendChild(detailedPhotoCommentElement);
  }

  detailedPhotoCommentList.appendChild(fragment);

  var detailedPhotoCounterOfComment = document.querySelector('.social__comment-count');
  var detailedPhotoLoadmore = document.querySelector('.social__loadmore');
  detailedPhotoCounterOfComment.classList.add('visually-hidden');
  detailedPhotoLoadmore.classList.add('visually-hidden');
};

var photos = createArrayOfPhotos();

var similarPhotoListElement = document.querySelector('.pictures');

var fragment = document.createDocumentFragment();

for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {

  fragment.appendChild(createPhoto(photos[i]));
}

similarPhotoListElement.appendChild(fragment);

showDetailedPhoto(detailedPhoto, photos[0]);
