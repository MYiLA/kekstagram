'use strict';
(function () {
  var ZOOM_DEFAULT = 100;
  var HUNDRED_PERCENT = 100;
  var ZOOM_STEP = 25;
  var ZOOM_MAX = 100;
  var ZOOM_MIN = 25;
  var HASHTAGS_LIMIT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_COMMENT_LENGTH = 140;

  var formEditImage = document.querySelector('.img-upload__overlay');
  var btnUploadFile = document.querySelector('#upload-file');
  var btnUploadCancel = formEditImage.querySelector('#upload-cancel');
  var pinBlock = formEditImage.querySelector('.effect-level__pin');
  var pinBlockDepth = formEditImage.querySelector('.effect-level__depth');
  var prewiewUzerImage = formEditImage.querySelector('.img-upload__preview');
  var main = document.querySelector('main');

  var photoEffects = [
    {
      name: 'grayscale',
      unit: '',
      maxValue: 1,
      effectClass: 'effects__preview--chrome',
      btnRadio: formEditImage.querySelector('#effect-chrome'),
    },
    {
      name: 'sepia',
      unit: '',
      maxValue: 1,
      effectClass: 'effects__preview--sepia',
      btnRadio: formEditImage.querySelector('#effect-sepia'),
    },
    {
      name: 'invert',
      unit: '%',
      maxValue: 100,
      effectClass: 'effects__preview--marvin',
      btnRadio: formEditImage.querySelector('#effect-marvin'),
    },
    {
      name: 'blur',
      unit: 'px',
      maxValue: 3,
      effectClass: 'effects__preview--phobos',
      btnRadio: formEditImage.querySelector('#effect-phobos'),
    },
    {
      name: 'brightness',
      unit: '',
      maxValue: 3,
      effectClass: 'effects__preview--heat',
      btnRadio: formEditImage.querySelector('#effect-heat'),
    }
  ];

  var addDefoltEffect = function () {
    effectDefault.checked = true;
    effectLevel.classList.add('hidden');
    prewiewUzerImage.style.filter = 'none';
  };

  var onEditImageEscPress = function (evt) {
    if (evt.keyCode === window.util.keyCodeButton.esc) {
      closeEditImage();
    }
  };

  var openEditImage = function () {
    formEditImage.classList.remove('hidden');
    effectLevel.classList.add('hidden');
    document.addEventListener('keydown', onEditImageEscPress);
    prewiewUzerImage.style.transform = 'scale(' + (ZOOM_DEFAULT / HUNDRED_PERCENT) + ')';
    zoomValue.value = ZOOM_DEFAULT + '%';
  };

  var form = document.querySelector('#upload-select-image');

  var closeEditImage = function () {
    form.reset();
    formEditImage.classList.add('hidden');
    zoomValue.value = ZOOM_DEFAULT + '%';
    prewiewUzerImage.style.transform = 'scale(' + (ZOOM_DEFAULT / HUNDRED_PERCENT) + ')';
    addDefoltEffect();
    document.removeEventListener('keydown', onEditImageEscPress);
  };

  btnUploadFile.addEventListener('change', function () {
    openEditImage();
  });

  btnUploadCancel.addEventListener('click', function () {
    closeEditImage();
  });

  btnUploadCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.keyCodeButton.enter) {
      closeEditImage();
    }
  });

  var changesSaturationFilter = function (maxFilter) {
    var positionPin = parseFloat(pinBlock.style.left);
    return (positionPin * maxFilter) / HUNDRED_PERCENT;
  };

  var effectLevel = formEditImage.querySelector('.effect-level');
  var allEffectBlock = formEditImage.querySelector('.effects__list');
  var effectDefault = formEditImage.querySelector('#effect-none');
  var actualPhotoEffect = {
    name: 'none',
    unit: '',
    maxValue: 0,
  };

  var renderPhotoEffect = function () {
    var effectSaturation = changesSaturationFilter(actualPhotoEffect.maxValue);
    prewiewUzerImage.style.filter = actualPhotoEffect.name + '(' + effectSaturation + actualPhotoEffect.unit + ')';
  };

  var addEffect = function () {
    for (var b = 0; b < photoEffects.length; b++) {
      if (effectDefault.checked) {
        addDefoltEffect();
      }
      if (!photoEffects[b].btnRadio.checked) {
        prewiewUzerImage.classList.remove(photoEffects[b].effectClass);
      }
      if (photoEffects[b].btnRadio.checked) {
        pinBlock.style.left = pinBlockDepth.style.width = '100%';
        effectLevel.classList.remove('hidden');
        prewiewUzerImage.classList.add(photoEffects[b].effectClass);
        actualPhotoEffect = {
          name: photoEffects[b].name,
          unit: photoEffects[b].unit,
          maxValue: photoEffects[b].maxValue,
        };
        renderPhotoEffect();
      }
    }
  };

  allEffectBlock.addEventListener('click', function () {
    addEffect();
  });

  //  ///////////////////////////////////////////////////////////////

  var clientX = 100; // начальные координаты пина

  var PinCoords = function (x) {
    this.x = x;
  };

  var startCoordinate = new PinCoords(clientX);

  var onPinMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    startCoordinate = new PinCoords(moveEvt.clientX);

    var shift = new PinCoords(startCoordinate.x - moveEvt.clientX);
    // смещение в пикселях необходимо рассчитать пропорцией в уровень эффекта (заменить существующее смещение в 100% на пиксели)
    pinBlock.style.left = (pinBlock.offsetLeft - shift.x) + 'px';

  pinBlock.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    console.log(startCoordinate);

    pinBlock.addEventListener('mousemove', onPinMouseMove);
    pinBlock.addEventListener('mouseup', onPinMouseUp);

  });

  var onPinMouseUp = function (upEvt) {
    upEvt.preventDefault(); // эта функция должна решать задачу ниже
    // в данное значение (50) нужно записывать существующее положение фильтра относительно контейнера pinBlock.style.lef
    // pinBlock.style.left = pinBlockDepth.style.width;
    renderPhotoEffect();
    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onPinMouseUp);
  };

  // /////////////////////////////// Задание ////////////////////////////////

  //   В этом задании мы закончим работу над слайдером, задающим глубину эффекта,
  //   заставив его перемещаться.

  // Теперь, когда вы знакомы с тем, как работает механизм перемещения элементов,
  // вы можете закончить работу над слайдером.

  // Вам необходимо описать полный цикл перемещение для метки,
  // то есть добавить обработчики событий mousedown, mousemove и mouseup.

  // Обработчики mousemove и mouseup должны добавляться только при вызове обработчика mousedown.

  // Обработчик mousemove должен запускать логику изменения положения пина: в нём должны
  // вычисляться новые координаты пина на основании смещения, применяться через стили к
  // элементу и записываться в поле уровня эффекта (с поправкой на то, что в это
  // поле записываются координаты середины пина).

  // При перемещении, кроме состояния слайдера, должна меняться глубина эффекта,
  // наложенного на изображение, то есть меняться значение CSS-фильтра, добавленного
  // на изображение. Это нетривиальная задача, потому что значение CSS-фильтра записывается
  // в одних границах, а положение слайдера в других. Вам нужно использовать пропорцию, чтобы рассчитать насыщенность правильно.

  // Ещё один момент касается ограничения перемещения: не забудьте сделать так, чтобы
  // слайдер можно было двигать только горизонтально и при этом движение должно быть ограничено пределами слайдера.

  // ТЗ //////////////////////////////////////////

  var zoomInControl = formEditImage.querySelector('.scale__control--bigger');
  var zoomOutControl = formEditImage.querySelector('.scale__control--smaller');
  var zoomValue = formEditImage.querySelector('.scale__control--value');

  var zoomChange = function (zoomStepVar) {
    zoomOutControl.disabled = false;
    zoomInControl.disabled = false;
    zoomValue.value = parseFloat(zoomValue.value) + zoomStepVar + '%';
    prewiewUzerImage.style.transform = 'scale(' + (parseFloat(zoomValue.value) / HUNDRED_PERCENT) + ')';
  };

  var zoomInChange = function () {
    if (parseFloat(zoomValue.value) === ZOOM_MAX) {
      zoomInControl.disabled = true;
    } else {
      zoomChange(ZOOM_STEP);
    }
  };

  var zoomOutChange = function () {
    if ((parseFloat(zoomValue.value)) === ZOOM_MIN) {
      zoomOutControl.disabled = true;
    } else {
      zoomChange(-ZOOM_STEP);
    }
  };

  zoomInControl.addEventListener('click', function () {
    zoomInChange();
  });

  zoomOutControl.addEventListener('click', function () {
    zoomOutChange();
  });

  var hashtagsInput = formEditImage.querySelector('.text__hashtags');
  var сommentInput = formEditImage.querySelector('.text__description');
  var formSubmitBtn = form.querySelector('#upload-submit');

  function verifyDuplicates(arr) {
    var f;
    var result = [];
    for (f = 0; f < arr.length; f++) {
      if (!result.includes(arr[f].toLowerCase())) {
        result.push(arr[f].toLowerCase());
      }
    }
    if (arr.length === result.length) {
      return true;
    }
    return false;
  }

  var checkCommentValidity = function (commentBlock) {
    if (commentBlock.value.length > MAX_COMMENT_LENGTH) {
      commentBlock.setCustomValidity('Длина комментария не должна превышать 140 символов');
      return false;
    } else {
      commentBlock.setCustomValidity('');
      return true;
    }
  };

  var checkHashtagsValidity = function (hashtags) {
    if (hashtags.length === 1 && hashtags[0] === '') {
      return true;
    }

    if (hashtags.length > HASHTAGS_LIMIT) {
      hashtagsInput.setCustomValidity('Нельзя указывать больше пяти хеш-тегов.');
      return false;
    }

    for (var c = 0; c < hashtags.length; c++) {
      if (hashtags[c][0] !== '#') {
        hashtagsInput.setCustomValidity('Хеш-тег начинается с символа # (решётка).');
        return false;
      }
    }

    for (var d = 0; d < hashtags.length; d++) {
      if (!hashtags[d][1]) {
        hashtagsInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки.');
        return false;
      }
    }

    for (var g = 0; g < hashtags.length; g++) {
      var res = hashtags[g].match(/#/g);
      if (res.length > 1) {
        hashtagsInput.setCustomValidity('Хеш-теги разделяются пробелами.');
        return false;
      }
    }

    for (var e = 0; e < hashtags.length; e++) {
      if (hashtags[e].length > MAX_HASHTAG_LENGTH) {
        hashtagsInput.setCustomValidity('Максимальная длина одного хеш-тега 20 символов, включая решетку.');
        return false;
      }
    }

    if (!verifyDuplicates(hashtags)) {
      hashtagsInput.setCustomValidity('Один и тот же хештег не может быть использован дважды.');
      return false;
    } else {
      hashtagsInput.setCustomValidity('');
      return true;
    }
  };

  var showSuccessMessage = function () {
    var similarSuccessMessage = document.querySelector('#success')
        .content
        .querySelector('.success');
    var successMessageElement = similarSuccessMessage.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(successMessageElement);
    main.appendChild(fragment);
    var clozeButton = document.querySelector('.success__button');
    clozeButton.addEventListener('click', function () {
      closeSuccessMessage();
    });
    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', onSuccessMessageClickClose);
    document.querySelector('.success__inner').addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  };

  var onSuccessMessageEscPress = function (evt) {
    if (evt.keyCode === window.util.keyCodeButton.esc) {
      closeSuccessMessage();
    }
  };

  var onSuccessMessageClickClose = function () {
    closeSuccessMessage();
  };

  var closeSuccessMessage = function () {
    var successMessage = document.querySelector('.success');
    successMessage.remove();
    document.removeEventListener('keydown', onSuccessMessageEscPress);
    document.removeEventListener('click', onSuccessMessageClickClose);
  };

  var addRedFrame = function (validityCheck, inputBlock) {
    if (!validityCheck) {
      inputBlock.style.boxShadow = '0 0 0 6px rgba(223, 30, 30, 0.9)';
    } else {
      inputBlock.style.boxShadow = 'none';
    }
  };

  formSubmitBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    var hashtagsArr = hashtagsInput.value.split(' ');
    var isValid = checkHashtagsValidity(hashtagsArr) && checkCommentValidity(сommentInput);
    if (isValid) {
      window.backend.upload(new FormData(form), function () {
        closeEditImage();
        showSuccessMessage();
      });
    } else {
      hashtagsInput.reportValidity();
      сommentInput.reportValidity();
      addRedFrame(checkHashtagsValidity(hashtagsArr), hashtagsInput);
      addRedFrame(checkCommentValidity(сommentInput), сommentInput);
    }
  });

  hashtagsInput.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  сommentInput.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

})();
