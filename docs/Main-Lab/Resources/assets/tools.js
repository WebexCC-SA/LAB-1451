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

  const splitLines = (value) => value.replace(/\r\n?/g, '\n').split('\n');

  const myersDiff = (oldLines, newLines, equals) => {
    const max = oldLines.length + newLines.length;
    const trace = [];
    const frontier = new Map([[1, 0]]);

    for (let distance = 0; distance <= max; distance += 1) {
      trace.push(new Map(frontier));
      for (let diagonal = -distance; diagonal <= distance; diagonal += 2) {
        const previousDown = frontier.get(diagonal + 1) ?? 0;
        const previousRight = frontier.get(diagonal - 1) ?? 0;
        const moveDown = diagonal === -distance || (diagonal !== distance && previousRight < previousDown);
        let oldIndex = moveDown ? previousDown : previousRight + 1;
        let newIndex = oldIndex - diagonal;

        while (oldIndex < oldLines.length && newIndex < newLines.length && equals(oldLines[oldIndex], newLines[newIndex])) {
          oldIndex += 1;
          newIndex += 1;
        }
        frontier.set(diagonal, oldIndex);

        if (oldIndex >= oldLines.length && newIndex >= newLines.length) {
          const operations = [];
          let currentOld = oldLines.length;
          let currentNew = newLines.length;

          for (let step = trace.length - 1; step > 0; step -= 1) {
            const prior = trace[step];
            const currentDiagonal = currentOld - currentNew;
            const priorDiagonal = currentDiagonal === -step || (currentDiagonal !== step && (prior.get(currentDiagonal - 1) ?? 0) < (prior.get(currentDiagonal + 1) ?? 0))
              ? currentDiagonal + 1
              : currentDiagonal - 1;
            const priorOld = prior.get(priorDiagonal) ?? 0;
            const priorNew = priorOld - priorDiagonal;

            while (currentOld > priorOld && currentNew > priorNew) {
              operations.push({ type: 'equal', oldIndex: currentOld - 1, newIndex: currentNew - 1 });
              currentOld -= 1;
              currentNew -= 1;
            }

            if (currentOld === priorOld) {
              operations.push({ type: 'insert', newIndex: currentNew - 1 });
              currentNew -= 1;
            } else {
              operations.push({ type: 'delete', oldIndex: currentOld - 1 });
              currentOld -= 1;
            }
          }

          while (currentOld > 0 && currentNew > 0) {
            operations.push({ type: 'equal', oldIndex: currentOld - 1, newIndex: currentNew - 1 });
            currentOld -= 1;
            currentNew -= 1;
          }
          while (currentOld > 0) operations.push({ type: 'delete', oldIndex: --currentOld });
          while (currentNew > 0) operations.push({ type: 'insert', newIndex: --currentNew });
          return operations.reverse();
        }
      }
    }

    return [];
  };

  const renderDiffCell = (line) => {
    const cell = document.createElement('div');
    cell.className = `roomos-tool__diff-cell${line ? ` roomos-tool__diff-cell--${line.type}` : ''}`;
    const lineNumber = document.createElement('span');
    lineNumber.className = 'roomos-tool__diff-line-number';
    lineNumber.textContent = line?.number ?? '';
    const content = document.createElement('span');
    content.className = 'roomos-tool__diff-content';
    content.textContent = line?.text ?? '';
    cell.append(lineNumber, content);
    return cell;
  };

  const renderDiffRow = (view, oldLine, newLine) => {
    const row = document.createElement('div');
    row.className = 'roomos-tool__diff-row';
    if (oldLine?.type === 'skip') {
      row.classList.add('roomos-tool__diff-row--skip');
      const summary = document.createElement('span');
      summary.className = 'roomos-tool__diff-content';
      summary.textContent = oldLine.text;
      row.append(summary);
    } else {
      row.append(renderDiffCell(oldLine), renderDiffCell(newLine));
    }
    view.append(row);
  };

  const renderDiff = (tool) => {
    const leftInput = tool.querySelector('#roomos-diff-left');
    const rightInput = tool.querySelector('#roomos-diff-right');
    const ignoreWhitespace = tool.querySelector('#roomos-diff-ignore-whitespace').checked;
    const showUnchanged = tool.querySelector('#roomos-diff-show-unchanged').checked;
    const oldLines = splitLines(leftInput.value);
    const newLines = splitLines(rightInput.value);
    const results = tool.querySelector('.roomos-tool__results');
    const view = tool.querySelector('.roomos-tool__diff-view');
    const normalize = (line) => ignoreWhitespace ? line.replace(/\s/g, '') : line;

    if (!leftInput.value && !rightInput.value) {
      results.hidden = true;
      setStatus(tool, 'Paste syntax into at least one field to compare it.', 'error');
      return;
    }

    const operations = myersDiff(oldLines, newLines, (oldLine, newLine) => normalize(oldLine) === normalize(newLine));
    const changedIndexes = operations.reduce((indexes, operation, index) => {
      if (operation.type !== 'equal') indexes.push(index);
      return indexes;
    }, []);
    view.replaceChildren();

    if (!changedIndexes.length) {
      renderDiffRow(view, { type: 'equal', number: '—', text: 'The snippets match.' }, { type: 'equal', number: '—', text: 'The snippets match.' });
      results.hidden = false;
      setStatus(tool, 'The snippets match.', 'success');
      return;
    }

    const context = 3;
    const visible = new Set();
    if (showUnchanged) {
      operations.forEach((_, index) => visible.add(index));
    } else {
      changedIndexes.forEach((index) => {
        for (let candidate = Math.max(0, index - context); candidate <= Math.min(operations.length - 1, index + context); candidate += 1) visible.add(candidate);
      });
    }

    let oldNumber = 1;
    let newNumber = 1;
    operations.forEach((operation) => {
      if (operation.type !== 'insert') operation.oldNumber = oldNumber++;
      if (operation.type !== 'delete') operation.newNumber = newNumber++;
    });

    let hiddenLines = 0;
    for (let index = 0; index < operations.length;) {
      const operation = operations[index];
      if (!visible.has(index)) {
        hiddenLines += 1;
        index += 1;
      } else {
        if (hiddenLines) {
          renderDiffRow(view, { type: 'skip', text: `⋯ ${hiddenLines} unchanged line${hiddenLines === 1 ? '' : 's'} hidden ⋯` });
          hiddenLines = 0;
        }
        if (operation.type === 'equal') {
          renderDiffRow(view, { type: 'equal', number: operation.oldNumber, text: oldLines[operation.oldIndex] }, { type: 'equal', number: operation.newNumber, text: newLines[operation.newIndex] });
          index += 1;
          continue;
        }

        const changedBlock = [];
        while (index < operations.length && operations[index].type !== 'equal') changedBlock.push(operations[index++]);
        const removed = changedBlock.filter((item) => item.type === 'delete');
        const added = changedBlock.filter((item) => item.type === 'insert');
        const rows = Math.max(removed.length, added.length);
        for (let row = 0; row < rows; row += 1) {
          const removedLine = removed[row];
          const addedLine = added[row];
          renderDiffRow(
            view,
            removedLine && { type: 'delete', number: removedLine.oldNumber, text: oldLines[removedLine.oldIndex] },
            addedLine && { type: 'insert', number: addedLine.newNumber, text: newLines[addedLine.newIndex] },
          );
        }
      }
    }
    if (hiddenLines) renderDiffRow(view, { type: 'skip', text: `⋯ ${hiddenLines} unchanged line${hiddenLines === 1 ? '' : 's'} hidden ⋯` });
    results.hidden = false;
    setStatus(tool, `${changedIndexes.length} changed line${changedIndexes.length === 1 ? '' : 's'} found.`, 'success');
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
