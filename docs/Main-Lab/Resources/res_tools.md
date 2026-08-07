{{ config.cProps.devNotice }}
{{ config.cProps.acronyms }}

<link rel="stylesheet" href="../assets/tools.css">

!!! info "Private, local processing"

    These tools process text only in the current browser tab. Nothing is sent to a RoomOS device or another service, stored in browser storage, or logged by the Lab Guide. Use **Clear** when you have finished working with credentials or payload fragments.

=== "Code Difference Checker"

    Compare code by line. The compact side-by-side view pairs old and new lines in changed hunks with nearby context; turn on **Show unchanged lines** to inspect the full file. When **Ignore all whitespace** is enabled, whitespace-only changes do not count as differences.

    <section class="roomos-tool" data-roomos-tool="diff">
      <div class="roomos-tool__grid roomos-tool__grid--two-up">
        <div class="roomos-tool__field">
          <label for="roomos-diff-left">Script Entry 1</label>
          <textarea id="roomos-diff-left" spellcheck="false" placeholder="Paste your syntax here"></textarea>
        </div>
        <div class="roomos-tool__field">
          <label for="roomos-diff-right">Script Entry 2</label>
          <textarea id="roomos-diff-right" spellcheck="false" placeholder="Paste the reference syntax here"></textarea>
        </div>
      </div>
      <label class="roomos-tool__checkbox" for="roomos-diff-ignore-whitespace">
        <input id="roomos-diff-ignore-whitespace" type="checkbox" checked>
        Ignore all whitespace
      </label>
      <label class="roomos-tool__checkbox" for="roomos-diff-show-unchanged">
        <input id="roomos-diff-show-unchanged" type="checkbox">
        Show unchanged lines
      </label>
      <div class="roomos-tool__actions">
        <button class="md-button md-button--primary" type="button" data-action="compare">Compare</button>
        <button class="md-button" type="button" data-action="clear">Clear</button>
      </div>
      <p class="roomos-tool__status" aria-live="polite"></p>
      <div class="roomos-tool__results roomos-tool__diff-results" hidden>
        <div class="roomos-tool__diff-heading" aria-hidden="true">
          <span>Old version</span>
          <span>New version</span>
        </div>
        <div class="roomos-tool__diff-view" aria-label="Code comparison result"></div>
      </div>
    </section>

=== "Base64 Conversion Tool"

    Encode and decode UTF-8 text or self-describing image Data URLs. Every operation stays in this browser tab.

    <section class="roomos-tool" data-roomos-tool="base64">
      <div class="roomos-tool__subtabs" role="tablist" aria-label="Base64 tools">
        <button type="button" role="tab" aria-selected="true" aria-controls="roomos-base64-encode-text" data-base64-tab="text-encode">Encode Text</button>
        <button type="button" role="tab" aria-selected="false" aria-controls="roomos-base64-decode-text" data-base64-tab="text-decode">Decode Text</button>
        <button type="button" role="tab" aria-selected="false" aria-controls="roomos-base64-encode-image" data-base64-tab="image-encode">Encode Image</button>
        <button type="button" role="tab" aria-selected="false" aria-controls="roomos-base64-decode-image" data-base64-tab="image-decode">Decode Image</button>
      </div>

      <div class="roomos-tool__subtool" id="roomos-base64-encode-text" role="tabpanel" data-roomos-subtool="text-encode">
            <div class="roomos-tool__field">
              <label for="roomos-base64-encode-input">Text to encode</label>
              <textarea id="roomos-base64-encode-input" spellcheck="false" placeholder="username:password"></textarea>
            </div>
            <div class="roomos-tool__actions">
              <button class="md-button md-button--primary" type="button" data-action="convert">Encode text</button>
              <button class="md-button" type="button" data-action="copy" disabled>Copy</button>
              <button class="md-button" type="button" data-action="clear">Clear</button>
            </div>
            <p class="roomos-tool__status" aria-live="polite"></p>
            <div class="roomos-tool__field">
              <label for="roomos-base64-encode-output">Base64 output</label>
              <textarea id="roomos-base64-encode-output" readonly spellcheck="false" placeholder="Encoded output appears here"></textarea>
            </div>
      </div>

      <div class="roomos-tool__subtool" id="roomos-base64-decode-text" role="tabpanel" data-roomos-subtool="text-decode" hidden>
            <div class="roomos-tool__field">
              <label for="roomos-base64-decode-input">Base64 text</label>
              <textarea id="roomos-base64-decode-input" spellcheck="false" placeholder="Paste Base64 text here"></textarea>
            </div>
            <div class="roomos-tool__actions">
              <button class="md-button md-button--primary" type="button" data-action="convert">Decode text</button>
              <button class="md-button" type="button" data-action="copy" disabled>Copy</button>
              <button class="md-button" type="button" data-action="clear">Clear</button>
            </div>
            <p class="roomos-tool__status" aria-live="polite"></p>
            <div class="roomos-tool__field">
              <label for="roomos-base64-decode-output">Decoded text</label>
              <textarea id="roomos-base64-decode-output" readonly spellcheck="false" placeholder="Decoded text appears here"></textarea>
            </div>
      </div>

      <div class="roomos-tool__subtool" id="roomos-base64-encode-image" role="tabpanel" data-roomos-subtool="image-encode" hidden>
            <div class="roomos-tool__field">
              <label for="roomos-base64-image-encode-input">Image file</label>
              <input class="roomos-tool__file-input" id="roomos-base64-image-encode-input" type="file" accept="image/*">
            </div>
            <div class="roomos-tool__image-preview" data-image-preview hidden>
              <img alt="Selected image preview">
            </div>
            <div class="roomos-tool__actions">
              <button class="md-button md-button--primary" type="button" data-action="encode-image">Encode image</button>
              <button class="md-button" type="button" data-action="copy" disabled>Copy</button>
              <button class="md-button" type="button" data-action="clear">Clear</button>
            </div>
            <p class="roomos-tool__status" aria-live="polite"></p>
            <div class="roomos-tool__field">
              <label for="roomos-base64-image-encode-output">Image Data URL</label>
              <textarea id="roomos-base64-image-encode-output" readonly spellcheck="false" placeholder="The encoded image Data URL appears here"></textarea>
            </div>
      </div>

      <div class="roomos-tool__subtool" id="roomos-base64-decode-image" role="tabpanel" data-roomos-subtool="image-decode" hidden>
            <div class="roomos-tool__field">
              <label for="roomos-base64-image-decode-input">Image Data URL</label>
              <textarea id="roomos-base64-image-decode-input" spellcheck="false" placeholder="Paste a data:image/...;base64,... value here"></textarea>
            </div>
            <div class="roomos-tool__actions">
              <button class="md-button md-button--primary" type="button" data-action="decode-image">Decode image</button>
              <button class="md-button" type="button" data-action="clear">Clear</button>
            </div>
            <p class="roomos-tool__status" aria-live="polite"></p>
            <div class="roomos-tool__image-preview" data-image-preview hidden>
              <img alt="Decoded image preview">
            </div>
      </div>
    </section>

=== "Flatten Multiline String Tool"

    Replace every line break with one space and trim the result. This is useful when a command field requires one line of text.

    <section class="roomos-tool" data-roomos-tool="flatten">
      <div class="roomos-tool__field">
        <label for="roomos-flatten-input">Multiline text</label>
        <textarea id="roomos-flatten-input" spellcheck="false" placeholder="Paste multiline text here"></textarea>
      </div>
      <div class="roomos-tool__actions">
        <button class="md-button md-button--primary" type="button" data-action="convert">Flatten</button>
        <button class="md-button" type="button" data-action="copy" disabled>Copy</button>
        <button class="md-button" type="button" data-action="clear">Clear</button>
      </div>
      <p class="roomos-tool__status" aria-live="polite"></p>
      <div class="roomos-tool__field">
        <label for="roomos-flatten-output">Flattened text</label>
        <textarea id="roomos-flatten-output" readonly spellcheck="false" placeholder="Flattened text appears here"></textarea>
      </div>
    </section>

=== "Escape XML Body"

    Escape XML so that it can safely be used as text inside another XML element, such as the `body` argument of `xCommand UserInterface Extensions Panel Save`.

    <section class="roomos-tool" data-roomos-tool="xml">
      <div class="roomos-tool__field">
        <label for="roomos-xml-input">XML to escape</label>
        <textarea id="roomos-xml-input" spellcheck="false" placeholder="Paste XML here"></textarea>
      </div>
      <div class="roomos-tool__actions">
        <button class="md-button md-button--primary" type="button" data-action="convert">Escape XML</button>
        <button class="md-button" type="button" data-action="copy" disabled>Copy</button>
        <button class="md-button" type="button" data-action="clear">Clear</button>
      </div>
      <p class="roomos-tool__status" aria-live="polite"></p>
      <div class="roomos-tool__field">
        <label for="roomos-xml-output">Escaped XML</label>
        <textarea id="roomos-xml-output" readonly spellcheck="false" placeholder="Escaped XML appears here"></textarea>
      </div>
    </section>

<script>
  window.RoomosToolsLoader ??= (() => {
    let ready;

    return () => {
      if (window.RoomosTools) {
        window.RoomosTools.init(document);
        return;
      }

      ready ??= new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '../assets/tools.js';
        script.addEventListener('load', resolve, { once: true });
        script.addEventListener('error', reject, { once: true });
        document.head.append(script);
      });
      ready.then(() => window.RoomosTools.init(document));
    };
  })();

  if (typeof document$ !== 'undefined') document$.subscribe(window.RoomosToolsLoader);
  else window.RoomosToolsLoader();
</script>
