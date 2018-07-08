'use strict';
(function () {
  var PHOTOS_COUNT = 10;
  var PROBABILITY = 0.5;

  var createPhoto = function (photo) {
    var similarPhotoTemplate = document.querySelector('#picture').content;
    var photography = similarPhotoTemplate.cloneNode(true);

    photography.querySelector('.picture__img').src = photo.url;
    photography.querySelector('.picture__stat--likes').textContent = photo.likes;
    photography.querySelector('.picture__stat--comments').textContent = photo.comments.length;

    return photography;
  };

  var createPhotoList = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (el) {
      fragment.appendChild(createPhoto(el));
    });

    var shuffledPhotos = data.slice().sort(function () {
      return (Math.random() - PROBABILITY);
    }).slice(0, PHOTOS_COUNT);

    var discussedPhotos = data.slice().sort(function (a, b) {
      return b.likes - a.likes;
    });

    window.preview.photoGalery.appendChild(fragment);
    window.filters.showImgFilters();

    window.data = {
      photos: data,
      shuffledPhotos: shuffledPhotos,
      discussedPhotos: discussedPhotos,
      createPhoto: createPhoto
    };
  };

  window.backend.load(createPhotoList, window.utils.onError);
})();
