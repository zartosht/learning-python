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
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });
  btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 400);
  });

  document.querySelectorAll('pre > code').forEach((codeBlock) => {
    const button = document.createElement('button');
    const defaultButtonValue = '<i class="bi-clipboard" style="font-size: 1.2rem; color: cornflowerblue;"></i>';
    const copiedButtonValue = '<i class="bi-clipboard-check" style="font-size: 1.2rem; color: cornflowerblue;"></i>';

    button.className = 'copy-btn';
    button.innerHTML = defaultButtonValue;

    const pre = codeBlock.parentNode;
    pre.parentNode.insertBefore(button, pre);

    const clipboard = new ClipboardJS('.copy-btn', {
      target: function (trigger) {
        return trigger.nextElementSibling;
      }
    });

    clipboard.on('success', function (e) {
      button.innerHTML = copiedButtonValue;
      e.clearSelection();
    });

    button.addEventListener('click', () => {
      setTimeout(() => button.innerHTML = defaultButtonValue, 2000);
    });
  });
});