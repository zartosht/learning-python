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
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';

    const defaultButtonValue = '<i class="bi-clipboard" style="font-size: 1.2rem; color: cornflowerblue;"></i>';
    const copiedButtonValue = '<i class="bi-clipboard-check" style="font-size: 1.2rem; color: cornflowerblue;"></i>';

    const copyButton = document.createElement('button');
    copyButton.className = 'copy-btn';
    copyButton.innerHTML = defaultButtonValue;

    const runButton = document.createElement('button');
    runButton.className = 'run-btn';
    runButton.innerHTML = '<i class="bi-play-circle" style="font-size: 1.2rem; color: cornflowerblue;"></i>';

    buttonsContainer.appendChild(copyButton);
    buttonsContainer.appendChild(runButton);

    const pre = codeBlock.parentNode;
    pre.parentNode.insertBefore(buttonsContainer, pre);

    const clipboard = new ClipboardJS('.copy-btn', {
      target: function (trigger) {
        return trigger.parentNode.nextElementSibling;
      }
    });

    clipboard.on('success', function (e) {
      copyButton.innerHTML = copiedButtonValue;
      e.clearSelection();
    });

    copyButton.addEventListener('click', () => {
      setTimeout(() => copyButton.innerHTML = defaultButtonValue, 2000);
    });

    runButton.addEventListener('click', (e) => {
      e.preventDefault();
      // prevent double creation of python script and output
      if (codeBlock.parentNode.parentNode.parentNode.querySelector('.python-script')) return;

      const pythonScript = document.createElement('div');
      pythonScript.className = 'python-script';
      pythonScript.contentEditable = true;
      pythonScript.innerHTML = codeBlock.innerText;

      const output = document.createElement('div');
      output.className = 'output';

      const runCode = document.createElement('button');
      runCode.className = 'run-code btn btn-primary';
      runCode.innerHTML = 'Run Code';
      runCode.onclick = async (e) => {
        e.preventDefault();
        let pyodide = await loadPyodide();
        const result = await pyodide.runPython(codeBlock.innerText);
        output.innerHTML = result;
      };

      codeBlock.parentNode.parentNode.parentNode.appendChild(pythonScript);
      codeBlock.parentNode.parentNode.parentNode.appendChild(runCode);
      codeBlock.parentNode.parentNode.parentNode.appendChild(output);
    });
  });
});
