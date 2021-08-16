function toggleText() {
  document.querySelector('.toggle-text-button').onclick = function() {
    document.getElementById('text').hidden = document.getElementById('text').hidden !== true;
  }
}
