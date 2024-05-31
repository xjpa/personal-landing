// get modallll
var modal = document.getElementById('genericModal');

// get <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// get all project link for shenanigans
var projectLinks = document.querySelectorAll('.project-link');

// Attach a click event listener to each project link
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

// close modal on <span> click
span.addEventListener('click', closeTheModal);
span.addEventListener('touchstart', closeTheModal, { passive: false });

// close modal on click outside
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

// draggable modal
function dragElement(element) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

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
    e.preventDefault();
    if (e.type === 'touchstart') {
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
    } else {
      pos3 = e.clientX;
      pos4 = e.clientY;
    }
    document.addEventListener('mouseup', closeDragElement);
    document.addEventListener('touchend', closeDragElement, { passive: false });
    document.addEventListener('mousemove', elementDrag);
    document.addEventListener('touchmove', elementDrag, { passive: false });
  }

  function elementDrag(e) {
    e.preventDefault();
    if (e.type === 'touchmove') {
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
    } else {
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
}

// applied the func to make the modal draggable
dragElement(document.getElementById('modalContent'));
