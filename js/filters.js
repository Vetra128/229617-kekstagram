'use strict';
(function () {
  var NEW_PHOTOS_COUNT = 10;
  var DEBOUNCE_TIME = 500;
  var imgFilters = document.querySelector('.img-filters');
  var popularFilterBtn = imgFilters.querySelector('#filter-popular');
  var newFilterBtn = imgFilters.querySelector('#filter-new');
  var discussedFilterBtn = imgFilters.querySelector('#filter-discussed');

  var clearPicturesGalery = function () {
    document.querySelectorAll('.picture__link').forEach(function (item) {
      item.parentNode.removeChild(item);
    });
  };

  var debounce = function (fun) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_TIME);
    };
  };

  var showImgFilters = function (popularPhotoList, newPhotoList, discussedPhotoList) {
    imgFilters.classList.remove('img-filters--inactive');

    popularFilterBtn.addEventListener('click', function () {
      debounce(onPopularFilterBtnClick(popularPhotoList));
    });
    newFilterBtn.addEventListener('click', function () {
      debounce(onNewFilterBtnClick(newPhotoList));
    });
    discussedFilterBtn.addEventListener('click', function () {
      debounce(onDiscussedFilterBtn(discussedPhotoList));
    });
  };

  var onPopularFilterBtnClick = function (popularPhotos) {
    clearPicturesGalery();
    var similarPhotoList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    var currentBtn = document.querySelector('.img-filters__button--active');
    currentBtn.classList.remove('img-filters__button--active');
    popularFilterBtn.classList.add('img-filters__button--active');

    for (var i = 0; i < window.data.PHOTOS_COUNT; i++) {

      fragment.appendChild(window.data.createPhoto(popularPhotos[i]));
    }
    similarPhotoList.appendChild(fragment);
  };

  var onNewFilterBtnClick = function (newPhotos) {
    clearPicturesGalery();
    var similarPhotoList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    var currentBtn = document.querySelector('.img-filters__button--active');
    currentBtn.classList.remove('img-filters__button--active');
    newFilterBtn.classList.add('img-filters__button--active');

    for (var i = 0; i < NEW_PHOTOS_COUNT; i++) {

      fragment.appendChild(window.data.createPhoto(newPhotos[i]));
    }
    similarPhotoList.appendChild(fragment);
  };

  var onDiscussedFilterBtn = function (discussedPhotos) {
    clearPicturesGalery();
    var similarPhotoList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();


    var currentBtn = document.querySelector('.img-filters__button--active');
    currentBtn.classList.remove('img-filters__button--active');
    discussedFilterBtn.classList.add('img-filters__button--active');

    for (var i = 0; i < window.data.PHOTOS_COUNT; i++) {

      fragment.appendChild(window.data.createPhoto(discussedPhotos[i]));
    }
    similarPhotoList.appendChild(fragment);
  };

  window.filters = {
    showImgFilters: showImgFilters
  };

})();
