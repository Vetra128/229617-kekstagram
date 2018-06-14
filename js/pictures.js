'use strict';

var NUMBER_OF_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_NUMBER_OF_COMMEMT = 1;
var MAX_NUMBER_OF_COMMEMT = 2;
var arrayOfComment = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var arrayOfDescription = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

var createArrayOfPhotos = function () {
  var photos = [];

  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    var photo = {};
    photo.url = `photos/${i + 1}.jpg`;
    photo.likes = randomInteger(MIN_LIKES, MAX_LIKES);

    if (randomInteger(MIN_NUMBER_OF_COMMEMT, MAX_NUMBER_OF_COMMEMT) === 2) {
      var firstComment = arrayOfComment[randomInteger(0, arrayOfComment.length - 1)];
      var secondComment = arrayOfComment[randomInteger(0, arrayOfComment.length - 1)];
      while (firstComment === secondComment) {
        secondComment = arrayOfComment[randomInteger(0, arrayOfComment.length - 1)];
      }
      photo.comments = [firstComment, secondComment];
    } else {
      photo.comments = [arrayOfComment[randomInteger(0, arrayOfComment.length - 1)]];
    }

    photo.description = [arrayOfDescription[randomInteger(0, arrayOfDescription.length - 1)]];
    photos.push(photo);
  }
};

createArrayOfPhotos();
