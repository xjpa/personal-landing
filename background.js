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
const numberOfTiles = 30;
const tileSize = 100;

const tileCache = {};
function generatePenroseTile(size, color) {
  const key = `${size}-${color}`;
  if (tileCache[key]) return tileCache[key];

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

  const dataUrl = canvas.toDataURL();
  tileCache[key] = dataUrl;
  return dataUrl;
}

function createLayer(layerIndex) {
  const layer = document.createElement('div');
  layer.classList.add('layer');
  Object.assign(layer.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
  });

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < numberOfTiles; i++) {
    const size = Math.floor(Math.random() * tileSize + tileSize);
    const color = colors[Math.floor(Math.random() * colors.length)];

    const tile = document.createElement('div');
    Object.assign(tile.style, {
      width: `${size}px`,
      height: `${size}px`,
      backgroundImage: `url(${generatePenroseTile(size, color)})`,
      backgroundSize: 'cover',
      position: 'absolute',
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      transformOrigin: 'center',
      opacity: `${Math.random() * 0.5 + 0.5}`,
      animation: `rotateTile 20s linear infinite`,
    });

    fragment.appendChild(tile);
  }

  layer.appendChild(fragment);
  return layer;
}

function setupBackground() {
  const background = document.querySelector('.background');
  background.innerHTML = '';
  Object.assign(background.style, {
    position: 'relative',
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
  });

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < numberOfLayers; i++) {
    fragment.appendChild(createLayer(i));
  }
  background.appendChild(fragment);
}

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes rotateTile {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

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
