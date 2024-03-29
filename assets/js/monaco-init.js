const editors = [];
$(document).ready(function () {
  const loaderjs = document.createElement('script');
  loaderjs.src = '/assets/js/loader.js';

  loaderjs.onload = function () {
    require.config({
      paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' }
    });
    require(['vs/editor/editor.main'], function () {
      const codeContainers = document.querySelectorAll('pre > code');

      codeContainers.forEach((codeContainer) => {
        const pre = codeContainer.parentElement;
        const width = pre.offsetWidth;
        const height = pre.offsetHeight;

        const monacoContainer = document.createElement('div');
        monacoContainer.setAttribute('style', `position: relative; width: 100%; height: ${height}px; padding 5px 0; margin: 10px 0; display: flex; ite`);

        const monacoEditor = document.createElement('div');
        monacoEditor.setAttribute('style', `width: 100%; height: 100%;`);

        const monacoResizeBar = document.createElement('div');
        monacoResizeBar.setAttribute('style', `position: relative; width: 100px; height: 3px; background-color: #f1f1f1; cursor: row-resize; bottom: 5px; margin: 0 auto; border-radius: 1rem;`);

        monacoContainer.appendChild(monacoEditor);
        monacoContainer.appendChild(monacoResizeBar);

        // Insert the new container after the pre
        pre.parentElement.insertBefore(monacoContainer, pre.nextSibling);

        const editor = monaco.editor.create(monacoEditor, {
          value: codeContainer.textContent,
          language: 'python',
          theme: 'vs-dark',
          fontSize: 16,
        });

        // Listen for changes in the editor content
        editor.onDidChangeModelContent((event) => {
          const currentLineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
          const lineBreaks = editor.getModel().getLineCount();
          const currentEditorWidth = monacoContainer.getBoundingClientRect().width;
          const newHeight = currentLineHeight * lineBreaks + 2;

          monacoContainer.style.height = newHeight + 'px';
          monacoContainer.style.width = width + 'px';
          editor.layout({ width: currentEditorWidth, height: newHeight });

          // reset scroll position to top
          editor.setScrollTop(0);
        });

        // Set the editor layout to the pre size
        editor.layout({ width, height: height + 2 });

        // The editor is ready to be used
        // Hide the original code
        pre.style.display = 'none';

        let isResizing = false;
        // Listen for mousedown on the resize handle
        monacoResizeBar.addEventListener('mousedown', function (e) {
          isResizing = true;
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', stopResize);
          e.preventDefault();
        });

        // Handle the mouse move event
        function handleMouseMove(e) {
          if (!isResizing) {
            return;
          }
          // Calculate the new size of the editor container
          const newHeight = e.clientY - monacoContainer.getBoundingClientRect().top;
          const width = monacoContainer.getBoundingClientRect().width;

          // Apply the new size to the editor container
          monacoContainer.style.height = newHeight + 'px';
          monacoContainer.style.width = width + 'px';

          // Tell the editor to re-layout itself
          editor.layout({ width: width, height: newHeight });
        }

        // Stop resizing
        function stopResize(e) {
          isResizing = false;
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', stopResize);
        }

        editors.push({ editor, monacoContainer });
      });
    });
  };

  document.body.appendChild(loaderjs);
});