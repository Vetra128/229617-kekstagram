'use strict';
(function () {
  var imgFilters = document.querySelector('.img-filters');
  var popularFilterBtn = imgFilters.querySelector('#filter-popular');
  var newFilterBtn = imgFilters.querySelector('#filter-new');
  var discussedFilterBtn = imgFilters.querySelector('#filter-discussed');
  var prevActiveBtn = imgFilters.querySelector('.img-filters__button--active');

  var clearPicturesGalery = function () {
    document.querySelectorAll('.picture__link').forEach(function (item) {
      item.parentNode.removeChild(item);
    });
  };

  var onFilterBtnClick = function (evt) {
    var btn = evt.currentTarget;
    window.utils.debounce(function () {
      applyFilter(btn);
    });
  };

  var applyFilter = function (newActiveBtn) {
    var fragment = document.createDocumentFragment();
    clearPicturesGalery();
    prevActiveBtn.classList.remove('img-filters__button--active');
    newActiveBtn.classList.add('img-filters__button--active');
    prevActiveBtn = newActiveBtn;
    var photos;

    if (newActiveBtn.id === 'filter-new') {
      photos = window.data.shuffledPhotos;
    } else {
      photos = ((newActiveBtn.id === 'filter-popular') ? window.data.photos : window.data.discussedPhotos);
    }
    photos.forEach(function (photo) {
      fragment.appendChild(window.data.createPhoto(photo));
    });
    window.preview.photoGalery.appendChild(fragment);
  };


  var showImgFilters = function () {
    imgFilters.classList.remove('img-filters--inactive');
    popularFilterBtn.addEventListener('click', onFilterBtnClick);
    newFilterBtn.addEventListener('click', onFilterBtnClick);
    discussedFilterBtn.addEventListener('click', onFilterBtnClick);
  };

  window.filters = {
    showImgFilters: showImgFilters
  };
})();
