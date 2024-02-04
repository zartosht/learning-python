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

      let output;
      let runCode;

      // prevent double creation of python script and output
      if (!codeBlock.parentNode.parentNode.parentNode.querySelector('.run-code')) {
        output = document.createElement('div');
        output.className = 'output';

        runCode = document.createElement('button');
        runCode.className = 'run-code btn btn-primary my-2';
        runCode.innerHTML = 'Run Code';

        codeBlock.parentNode.parentNode.parentNode.appendChild(runCode);
        codeBlock.parentNode.parentNode.parentNode.appendChild(output);
      } else {
        output = codeBlock.parentNode.parentNode.parentNode.querySelector('.output');
        runCode = codeBlock.parentNode.parentNode.parentNode.querySelector('.run-code');
      }

      if(!runCode || !output) return;

      // disable the run button
      e.target.disabled = true;
      codeBlock.parentElement.contentEditable = true;

      runCode.onclick = async (e) => {
        e.preventDefault();
        output.innerHTML = 'Loading...';
        runCode.disabled = true;
        let pyodide = await loadPyodide();
        await pyodide.loadPackage("micropip");
        await pyodide.runPythonAsync(`
          import io
          import sys
          # Capture print statements
          sys.stdout = io.StringIO()
        `);
        const code = e.target.parentElement.querySelector('pre > code').textContent;
        const result = await pyodide.runPythonAsync(code);
        // Get printed statements
        const printedOutput = await pyodide.runPythonAsync('sys.stdout.getvalue()');
        output.innerHTML = printedOutput || result; // Display printed output or the result of the last expression
        runCode.disabled = false;
      };
    });
  });
});
