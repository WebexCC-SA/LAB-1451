(() => {
  const htmlEscape = (value) => value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

  const utf8Base64 = (value) => {
    const bytes = new TextEncoder().encode(value);
    let binary = '';
    bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
    return btoa(binary);
  };

  const setStatus = (tool, message, state = '') => {
    const status = tool.querySelector('.roomos-tool__status');
    status.textContent = message;
    status.dataset.state = state;
  };

  const setCopyEnabled = (tool, enabled) => {
    const copyButton = tool.querySelector('[data-action="copy"]');
    if (copyButton) copyButton.disabled = !enabled;
  };

  const clearTextTool = (tool) => {
    tool.querySelectorAll('textarea').forEach((element) => { element.value = ''; });
    setCopyEnabled(tool, false);
    setStatus(tool, 'Cleared from this browser tab.', 'success');
  };

  const copyOutput = async (tool) => {
    const output = tool.querySelector('textarea[readonly]');
    if (!output?.value) return;

    try {
      await navigator.clipboard.writeText(output.value);
      setStatus(tool, 'Copied to your clipboard.', 'success');
    } catch {
      output.focus();
      output.select();
      setStatus(tool, 'Select the output and copy it manually.', 'error');
    }
  };

  const renderDiff = (tool) => {
    const leftInput = tool.querySelector('#roomos-diff-left');
    const rightInput = tool.querySelector('#roomos-diff-right');
    const ignoreWhitespace = tool.querySelector('#roomos-diff-ignore-whitespace').checked;
    const normalize = (value) => ignoreWhitespace ? value.replace(/\s/g, '') : value;
    const left = normalize(leftInput.value);
    const right = normalize(rightInput.value);
    const leftOutput = tool.querySelector('[data-output="left"]');
    const rightOutput = tool.querySelector('[data-output="right"]');
    const results = tool.querySelector('.roomos-tool__results');

    if (!left && !right) {
      results.hidden = true;
      setStatus(tool, 'Paste syntax into at least one field to compare it.', 'error');
      return;
    }

    if (left === right) {
      leftOutput.textContent = left || '(Both snippets are empty.)';
      rightOutput.textContent = right || '(Both snippets are empty.)';
      results.hidden = false;
      setStatus(tool, 'The snippets match.', 'success');
      return;
    }

    let prefixLength = 0;
    while (prefixLength < left.length && left[prefixLength] === right[prefixLength]) prefixLength += 1;

    let leftSuffix = left.length;
    let rightSuffix = right.length;
    while (leftSuffix > prefixLength && rightSuffix > prefixLength && left[leftSuffix - 1] === right[rightSuffix - 1]) {
      leftSuffix -= 1;
      rightSuffix -= 1;
    }

    const sharedPrefix = htmlEscape(left.slice(0, prefixLength));
    const sharedSuffix = htmlEscape(left.slice(leftSuffix));
    const leftDifference = htmlEscape(left.slice(prefixLength, leftSuffix));
    const rightDifference = htmlEscape(right.slice(prefixLength, rightSuffix));
    leftOutput.innerHTML = `${sharedPrefix}<mark class="roomos-tool__difference">${leftDifference || '∅'}</mark>${sharedSuffix}`;
    rightOutput.innerHTML = `${sharedPrefix}<mark class="roomos-tool__addition">${rightDifference || '∅'}</mark>${sharedSuffix}`;
    results.hidden = false;
    setStatus(tool, 'Differences are highlighted. ∅ marks a missing character sequence.', 'success');
  };

  const configureTextTool = (tool, transform, emptyMessage) => {
    const input = tool.querySelector('textarea:not([readonly])');
    const output = tool.querySelector('textarea[readonly]');
    tool.querySelector('[data-action="convert"]').addEventListener('click', () => {
      if (!input.value) {
        output.value = '';
        setCopyEnabled(tool, false);
        setStatus(tool, emptyMessage, 'error');
        return;
      }
      output.value = transform(input.value);
      setCopyEnabled(tool, true);
      setStatus(tool, 'Converted locally in this browser tab.', 'success');
    });
  };

  const configure = (tool) => {
    if (tool.dataset.initialized === 'true') return;
    tool.dataset.initialized = 'true';
    const kind = tool.dataset.roomosTool;

    if (kind === 'diff') {
      tool.querySelector('[data-action="compare"]').addEventListener('click', () => renderDiff(tool));
      tool.querySelector('[data-action="clear"]').addEventListener('click', () => {
        tool.querySelectorAll('textarea').forEach((element) => { element.value = ''; });
        tool.querySelector('.roomos-tool__results').hidden = true;
        setStatus(tool, 'Cleared from this browser tab.', 'success');
      });
      return;
    }

    const transforms = {
      base64: [utf8Base64, 'Enter text to encode.'],
      flatten: [(value) => value.replace(/\r?\n/g, ' ').trim(), 'Enter multiline text to flatten.'],
      xml: [htmlEscape, 'Enter XML to escape.'],
    };
    configureTextTool(tool, ...transforms[kind]);
    tool.querySelector('[data-action="copy"]').addEventListener('click', () => copyOutput(tool));
    tool.querySelector('[data-action="clear"]').addEventListener('click', () => clearTextTool(tool));
  };

  window.RoomosTools = {
    init(root = document) {
      root.querySelectorAll('[data-roomos-tool]').forEach(configure);
    },
  };
})();
