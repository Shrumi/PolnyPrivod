/* ============================================================
   Четыре школы полного привода — логика презентации
   Vanilla JS, без внешних зависимостей
   ============================================================ */

(function () {
  'use strict';

  // Элементы управления
  var scene = document.getElementById('scene');
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var prevButton = document.getElementById('prev');
  var nextButton = document.getElementById('next');
  var counter = document.getElementById('counter');
  var thumbsWrap = document.getElementById('thumbs');

  var current = 0;
  var total = slides.length;

  /**
   * Масштабирование сцены под размер окна.
   * Сцена имеет фиксированный размер 1280x720 и уменьшается пропорционально.
   */
  function scaleScene() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var scale = Math.min(w / 1280, h / 720);
    scene.style.transform = 'scale(' + scale + ')';
  }

  /**
   * Построение миниатюр-навигации по слайдам.
   */
  function buildThumbs() {
    slides.forEach(function (slide, index) {
      var thumb = document.createElement('button');
      thumb.className = 'controls__thumb';
      thumb.setAttribute('role', 'tab');
      thumb.setAttribute('aria-label', 'Слайд ' + (index + 1));
      thumb.textContent = (index + 1);
      thumb.addEventListener('click', function () {
        goTo(index);
      });
      thumbsWrap.appendChild(thumb);
    });
  }

  /**
   * Переход к слайду по индексу.
   * @param {number} index - индекс целевого слайда
   */
  function goTo(index) {
    if (index < 0 || index >= total) return;
    current = index;

    slides.forEach(function (slide, idx) {
      slide.classList.toggle('slide--active', idx === current);
    });

    var thumbs = thumbsWrap.children;
    for (var k = 0; k < thumbs.length; k++) {
      thumbs[k].classList.toggle('controls__thumb--active', k === current);
    }

    counter.textContent = (current + 1) + ' / ' + total;
    prevButton.disabled = current === 0;
    nextButton.disabled = current === total - 1;
  }

  // Обработчики кнопок навигации
  prevButton.addEventListener('click', function () {
    goTo(current - 1);
  });
  nextButton.addEventListener('click', function () {
    goTo(current + 1);
  });

  // Управление с клавиатуры
  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') goTo(current + 1);
    else if (event.key === 'ArrowLeft') goTo(current - 1);
    else if (event.key === 'Home') goTo(0);
    else if (event.key === 'End') goTo(total - 1);
  });

  // Инициализация
  window.addEventListener('resize', scaleScene);
  buildThumbs();
  scaleScene();
  goTo(0);
})();
