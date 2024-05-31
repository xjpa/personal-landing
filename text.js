function changeText() {
  document.getElementById('myText').innerHTML = decryptCaesarCipher(
    'n@nslreqexe.gsq',
    4
  );
}
function decryptCaesarCipher(str, shift) {
  shift = ((shift % 26) + 26) % 26;
  let result = '';
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      let letterValue = charCode - 65;
      letterValue = (letterValue - shift + 26) % 26;
      charCode = letterValue + 65;
    } else if (charCode >= 97 && charCode <= 122) {
      let letterValue = charCode - 97;
      letterValue = (letterValue - shift + 26) % 26;
      charCode = letterValue + 97;
    }
    result += String.fromCharCode(charCode);
  }
  return result;
}

document.addEventListener('DOMContentLoaded', function () {
  const toggleDetailsElements = document.querySelectorAll('.toggle-details');

  toggleDetailsElements.forEach(function (toggleDetails) {
    toggleDetails.addEventListener('click', function () {
      const expandingDetails = toggleDetails.parentElement.nextElementSibling;

      if (expandingDetails.classList.contains('active')) {
        expandingDetails.classList.remove('active');
        return;
      }
      closeAllDetails();
      expandingDetails.classList.add('active');
    });
  });
});

function closeAllDetails() {
  const allExpandingDetails = document.querySelectorAll(
    '.expanding-details.active'
  );
  allExpandingDetails.forEach(function (detail) {
    detail.classList.remove('active');
  });
}
