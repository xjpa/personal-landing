var modal = document.getElementById('genericModal');
var span = document.getElementsByClassName('close')[0];
var projectLinks = document.querySelectorAll('.project-link');

projectLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    var title = link.getAttribute('data-title');
    var description = link.getAttribute('data-description');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').innerHTML = description;
    modal.style.display = 'block';
  });
});

span.addEventListener('click', closeTheModal);
span.addEventListener('touchstart', closeTheModal, { passive: false });
window.addEventListener('click', closeTheModalIfOutside);
window.addEventListener('touchstart', closeTheModalIfOutside, {
  passive: false,
});

function closeTheModal() {
  modal.style.display = 'none';
}

function closeTheModalIfOutside(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

function dragElement(element) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var isDragging = false;

  if (document.getElementById(element.id + 'Header')) {
    document
      .getElementById(element.id + 'Header')
      .addEventListener('mousedown', dragMouseDown);
    document
      .getElementById(element.id + 'Header')
      .addEventListener('touchstart', dragMouseDown, { passive: false });
  } else {
    element.addEventListener('mousedown', dragMouseDown);
    element.addEventListener('touchstart', dragMouseDown, { passive: false });
  }

  function dragMouseDown(e) {
    isDragging = false;
    if (e.type === 'touchstart') {
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
    } else {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
    }
    document.addEventListener('mouseup', closeDragElement);
    document.addEventListener('touchend', closeDragElement, { passive: false });
    document.addEventListener('mousemove', elementDrag);
    document.addEventListener('touchmove', elementDrag, { passive: false });
  }

  function elementDrag(e) {
    isDragging = true;
    if (e.type === 'touchmove') {
      e.preventDefault();
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
    } else {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
    }
    element.style.top = element.offsetTop - pos2 + 'px';
    element.style.left = element.offsetLeft - pos1 + 'px';
  }

  function closeDragElement() {
    document.removeEventListener('mouseup', closeDragElement);
    document.removeEventListener('touchend', closeDragElement);
    document.removeEventListener('mousemove', elementDrag);
    document.removeEventListener('touchmove', elementDrag);
  }

  element.addEventListener('click', function (e) {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      isDragging = false;
    }
  });
}

dragElement(document.getElementById('modalContent'));

document
  .getElementById('modalDescription')
  .addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      event.stopPropagation();
    }
  });
/* drag modals */
function makeDraggable(element) {
  let isDragging = false;
  let startX, startY, initialX, initialY;

  element.addEventListener('mousedown', function (e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = element.offsetLeft;
    initialY = element.offsetTop;
  });

  document.addEventListener('mousemove', function (e) {
    if (isDragging) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      element.style.left = `${initialX + dx}px`;
      element.style.top = `${initialY + dy}px`;
    }
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });

  element.addEventListener(
    'touchstart',
    function (e) {
      isDragging = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      initialX = element.offsetLeft;
      initialY = element.offsetTop;
    },
    { passive: false }
  );

  document.addEventListener(
    'touchmove',
    function (e) {
      if (isDragging) {
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        element.style.left = `${initialX + dx}px`;
        element.style.top = `${initialY + dy}px`;
      }
    },
    { passive: false }
  );

  document.addEventListener('touchend', function () {
    isDragging = false;
  });
}
/* polaroids */
const polaroidModal1 = document.getElementById('polaroidModal');
const polaroidModal2 = document.getElementById('polaroidModal2');

makeDraggable(polaroidModal1);
makeDraggable(polaroidModal2);

/* pirate */
const pirateShip = document.getElementById('pirateShip');
makeDraggable(pirateShip);
