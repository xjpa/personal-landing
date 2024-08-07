const colors = [
  '#ff9966',
  '#66ccff',
  '#ff6699',
  '#99ff99',
  '#ffcc66',
  '#66ffcc',
  '#ff6666',
  '#6666ff',
  '#66ff66',
  '#cc66ff',
];

const numberOfLayers = 3;
const numberOfTiles = 50;
const tileSize = 100;

function generatePenroseTile(size, color) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = size;
  canvas.height = size;

  ctx.beginPath();
  ctx.moveTo(size * 0.5, 0);
  ctx.lineTo(size, size * 0.5);
  ctx.lineTo(size * 0.5, size);
  ctx.lineTo(0, size * 0.5);
  ctx.closePath();

  ctx.fillStyle = color;
  ctx.fill();

  return canvas.toDataURL();
}

function createLayer(layerIndex, existingLayer) {
  const layer = existingLayer || document.createElement('div');
  layer.classList.add('layer');
  layer.style.position = 'absolute';
  layer.style.top = 0;
  layer.style.left = 0;
  layer.style.width = '100%';
  layer.style.height = '100%';
  layer.style.pointerEvents = 'none';
  layer.style.overflow = 'hidden';

  for (let i = 0; i < numberOfTiles; i++) {
    const size = Math.random() * tileSize + tileSize;
    const color = colors[Math.floor(Math.random() * colors.length)];

    const tile = document.createElement('div');
    tile.style.width = `${size}px`;
    tile.style.height = `${size}px`;
    tile.style.backgroundImage = `url(${generatePenroseTile(size, color)})`;
    tile.style.backgroundSize = 'cover';
    tile.style.position = 'absolute';
    tile.style.top = `${Math.random() * 100}%`;
    tile.style.left = `${Math.random() * 100}%`;
    tile.style.transformOrigin = 'center';
    tile.style.opacity = Math.random() * 0.5 + 0.5;

    const animationName = `animateTile${layerIndex}-${i}`;
    const keyframes = `
      @keyframes ${animationName} {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = keyframes;
    document.head.appendChild(styleSheet);

    tile.style.animation = `${animationName} 10s linear infinite`;

    layer.appendChild(tile);
  }

  return layer;
}

function setupBackground() {
  const background = document.querySelector('.background');
  background.innerHTML = '';
  background.style.position = 'relative';
  background.style.overflow = 'hidden';
  background.style.width = '100vw';
  background.style.height = '100vh';

  for (let i = 0; i < numberOfLayers; i++) {
    const existingLayer = background.querySelector(
      `.layer:nth-child(${i + 1})`
    );
    const layer = createLayer(i, existingLayer);
    background.appendChild(layer);
  }
}

setupBackground();

window.stopAnimation = function () {
  const background = document.querySelector('.background');
  if (background) {
    background.innerHTML = '';
  }
};

window.startAnimation = function () {
  setupBackground();
};
