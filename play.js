document.addEventListener('DOMContentLoaded', function () {
  const audioElement = document.querySelector('.smaller-audio-player');
  const h2Element = document.getElementById('welcome');
  audioElement.addEventListener('play', function () {
    h2Element.innerHTML =
      'Welcome <a href="https://github.com/xjpa/gladiator-portfolio">Gladiator</a>';

    if (typeof window.stopAnimation === 'function') {
      window.stopAnimation();
    }
  });

  audioElement.addEventListener('play', function () {
    const canvasElement = document.querySelector('canvas');

    if (!canvasElement) {
      init();
      const newCanvasElement = document.querySelector('canvas');
      newCanvasElement.style.display = 'block';
    }
  });
});
