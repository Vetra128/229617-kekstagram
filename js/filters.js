'use strict';
(function () {
  var NEW_PHOTOS_COUNT = 10;
  var imgFilters = document.querySelector('.img-filters');
  var popularFilterBtn = imgFilters.querySelector('#filter-popular');
  var newFilterBtn = imgFilters.querySelector('#filter-new');
  var discussedFilterBtn = imgFilters.querySelector('#filter-discussed');
  var shuffledPhotos = window.data.shuffledPhotos;
  var popularPhoto = window.data.popularPhoto;
  var discussedPhotos = window.data.discussedPhotos;


  var clearPicturesGalery = function () {
    document.querySelectorAll('.picture__link').forEach(function (item) {
      item.parentNode.removeChild(item);
    });
  };

  var showImgFilters = function () {
    imgFilters.classList.remove('img-filters--inactive');

    popularFilterBtn.addEventListener('click', onPopularFilterBtnClick);
    newFilterBtn.addEventListener('click', onNewFilterBtnClick);
    discussedFilterBtn.addEventListener('click', onDiscussedFilterBtn);
  };

  var onPopularFilterBtnClick = function () {
    clearPicturesGalery();
    var similarPhotoList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    var currentBtn = document.querySelector('.img-filters__button--active');
    currentBtn.classList.remove('img-filters__button--active');
    popularFilterBtn.classList.add('img-filters__button--active');

    for (var i = 0; i < window.data.PHOTOS_COUNT; i++) {

      fragment.appendChild(window.data.createPhoto(popularPhoto[i]));
    }
    similarPhotoList.appendChild(fragment);
  };

  var onNewFilterBtnClick = function () {
    clearPicturesGalery();
    var similarPhotoList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    var currentBtn = document.querySelector('.img-filters__button--active');
    currentBtn.classList.remove('img-filters__button--active');
    newFilterBtn.classList.add('img-filters__button--active');

    for (var i = 0; i < NEW_PHOTOS_COUNT; i++) {

      fragment.appendChild(window.data.createPhoto(shuffledPhotos[i]));
    }
    similarPhotoList.appendChild(fragment);
  };

  var onDiscussedFilterBtn = function () {
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
