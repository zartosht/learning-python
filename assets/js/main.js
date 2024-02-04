function copyCodeToClipboard(btn) {
  const codeBlock = btn.nextElementSibling.querySelector('code');
  const range = document.createRange();
  range.selectNode(codeBlock);
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  if (!navigator.clipboard) {
    document.execCommand('copy');
  } else {
    navigator.clipboard.writeText(text_to_copy).then(
      function () {
        window.getSelection().removeAllRanges();// to deselect
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
      })
      .catch(
        function () {
          alert("err"); // error
        });
  }
}

$(document).ready(function () {
  const btn = $('#button');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      btn.fadeIn();
    } else {
      btn.fadeOut();
    }
  });
  btn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 400);
    return false;
  });
});