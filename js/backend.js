'use strict';

(function () {
  var URL_DATA = 'https://js.dump.academy/kekstagram/data';
  var URL_LOAD = 'https://js.dump.academy/kekstagram';
  var SUCCESS_CODE = 200;
  var AUTORIZATION_ERROR_CODE = 401;
  var INVALID_QUERY_CODE = 400;
  var NOTHING_FOUND_CODE = 404;

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case SUCCESS_CODE:
            onLoad(xhr.response);
            break;
          case INVALID_QUERY_CODE:
            onError('Неверный запрос');
            break;
          case AUTORIZATION_ERROR_CODE:
            onError('Пользователь не авторизован');
            break;
          case NOTHING_FOUND_CODE:
            onError('Ничего не найдено');
            break;

          default:
            onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('GET', URL_DATA);
      xhr.send();
    },
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case SUCCESS_CODE:
            onLoad(xhr.response);
            break;
          case INVALID_QUERY_CODE:
            onError('Неверный запрос');
            break;
          case AUTORIZATION_ERROR_CODE:
            onError('Пользователь не авторизован');
            break;
          case NOTHING_FOUND_CODE:
            onError('Ничего не найдено');
            break;
          default:
            onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('POST', URL_LOAD);
      xhr.send(data);
    }
  };
})();
