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

  // disqus add #disqus_thread to the end of the url
  const internalLinks = document.querySelectorAll('a[href^="0"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href');
      if (!href.includes('#disqus_thread')) {
        link.setAttribute('href', href + '#disqus_thread');
      }
    });
  });


  // document.querySelectorAll('pre > code').forEach((codeBlock) => {
  //   const buttonsContainer = document.createElement('div');
  //   buttonsContainer.className = 'buttons-container';

  //   const defaultButtonValue = '<i class="bi-clipboard" style="font-size: 1.2rem; color: cornflowerblue;"></i>';
  //   const copiedButtonValue = '<i class="bi-clipboard-check" style="font-size: 1.2rem; color: cornflowerblue;"></i>';

  //   const copyButton = document.createElement('button');
  //   copyButton.className = 'copy-btn';
  //   copyButton.innerHTML = defaultButtonValue;

  //   const runButton = document.createElement('button');
  //   runButton.className = 'run-btn';
  //   runButton.innerHTML = '<i class="bi-play-circle" style="font-size: 1.2rem; color: cornflowerblue;"></i>';

  //   buttonsContainer.appendChild(copyButton);
  //   buttonsContainer.appendChild(runButton);

  //   const pre = codeBlock.parentNode;
  //   pre.parentNode.insertBefore(buttonsContainer, pre);

  //   const clipboard = new ClipboardJS('.copy-btn', {
  //     target: function (trigger) {
  //       return trigger.parentNode.nextElementSibling;
  //     }
  //   });

  //   clipboard.on('success', function (e) {
  //     copyButton.innerHTML = copiedButtonValue;
  //     e.clearSelection();
  //   });

  //   copyButton.addEventListener('click', () => {
  //     setTimeout(() => copyButton.innerHTML = defaultButtonValue, 2000);
  //   });

  //   runButton.addEventListener('click', (e) => {
  //     e.preventDefault();

  //     let pre;
  //     let runCode;

  //     // prevent double creation of python script and output
  //     if (!codeBlock.parentNode.parentNode.parentNode.querySelector('.run-code')) {
  //       pre = document.createElement('pre');
  //       pre.className = 'output';
  //       const code = document.createElement('code');
  //       pre.appendChild(code);

  //       runCode = document.createElement('button');
  //       runCode.className = 'run-code btn btn-primary my-2';
  //       runCode.innerHTML = 'Run Code';

  //       codeBlock.parentNode.parentNode.parentNode.appendChild(runCode);
  //       codeBlock.parentNode.parentNode.parentNode.appendChild(pre);
  //     } else {
  //       pre = codeBlock.parentNode.parentNode.parentNode.querySelector('.output');
  //       runCode = codeBlock.parentNode.parentNode.parentNode.querySelector('.run-code');

  //       pre.innerHTML = ''; 
  //       const code = document.createElement('code');
  //       pre.appendChild(code);
  //     }

  //     if (!runCode || !pre) return;

  //     // disable the run button
  //     e.target.disabled = true;
  //     codeBlock.contentEditable = true;

  //     runCode.onclick = async (e) => {
  //       e.preventDefault();
  //       pre.firstChild.innerHTML = 'Loading...';
  //       pre.removeAttribute('data-highlighted');
  //       pre.classList.remove('hljs');
  //       pre.classList.remove('language-python');
  //       pre.classList.remove('language-zsh');

  //       runCode.disabled = true;
  //       let pyodide = await loadPyodide();
  //       await pyodide.loadPackage("micropip");
  //       await pyodide.runPythonAsync(`
  //         import io
  //         import sys
  //         # Capture print statements
  //         sys.stdout = io.StringIO()
  //       `);
  //       const code = e.target.parentElement.querySelector('pre > code').textContent;
  //       const result = await pyodide.runPythonAsync(code);
  //       // Get printed statements
  //       const scriptResult = await pyodide.runPythonAsync('sys.stdout.getvalue()');

  //       if((scriptResult || result) === undefined) {
  //         pre.firstChild.innerHTML = 'Error: No output';
  //       } else {
  //         pre.firstChild.innerHTML = scriptResult || result; // Display printed output or the result of the last expression
  //       }

  //       runCode.disabled = false;

  //       hljs.configure({ languages: ['zsh'] })
  //       hljs.highlightBlock(pre);
  //     };
  //   });
  // });
});
