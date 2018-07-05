'use strict';
(function () {
  var PHOTOS_COUNT = 25;
  var similarPhotoList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  var createPhoto = function (photo) {
    var similarPhotoTemplate = document.querySelector('#picture').content;
    var photography = similarPhotoTemplate.cloneNode(true);

    photography.querySelector('.picture__img').src = photo.url;
    photography.querySelector('.picture__stat--likes').textContent = photo.likes;
    photography.querySelector('.picture__stat--comments').textContent = photo.comments.length;

    return photography;
  };

  var createPhotoList = function (data) {
    for (var i = 0; i < PHOTOS_COUNT; i++) {
      fragment.appendChild(createPhoto(data[i]));
    }

    var shuffledPhotos = data.slice().sort(function () {
      return (Math.random() - 0.5);
    });

    var discussedPhotos = data.slice().sort(function (a, b) {
      return b.likes - a.likes;
    });

    similarPhotoList.appendChild(fragment);
    window.filters.showImgFilters();

    window.data = {
      photos: data,
      shuffledPhotos: shuffledPhotos,
      discussedPhotos: discussedPhotos,
      PHOTOS_COUNT: PHOTOS_COUNT,
      createPhoto: createPhoto
    };
  };

  window.backend.load(createPhotoList, window.utils.onError);
})();
