{{ config.cProps.devNotice }}
{{ config.cProps.acronyms }}

<link rel="stylesheet" href="../assets/tools.css">

!!! info "Private, local processing"

    These tools process text only in the current browser tab. Nothing is sent to a RoomOS device or another service, stored in browser storage, or logged by the Lab Guide. Use **Clear** when you have finished working with credentials or payload fragments.

=== "Code Difference Checker"

    Compare two snippets to find the characters that differ. When **Ignore all whitespace** is enabled, spaces, tabs, and line breaks are removed before comparison.

    <section class="roomos-tool" data-roomos-tool="diff">
      <div class="roomos-tool__grid roomos-tool__grid--two-up">
        <div class="roomos-tool__field">
          <label for="roomos-diff-left">Your syntax</label>
          <textarea id="roomos-diff-left" spellcheck="false" placeholder="Paste your syntax here"></textarea>
        </div>
        <div class="roomos-tool__field">
          <label for="roomos-diff-right">Reference syntax</label>
          <textarea id="roomos-diff-right" spellcheck="false" placeholder="Paste the reference syntax here"></textarea>
        </div>
      </div>
      <label class="roomos-tool__checkbox" for="roomos-diff-ignore-whitespace">
        <input id="roomos-diff-ignore-whitespace" type="checkbox" checked>
        Ignore all whitespace
      </label>
      <div class="roomos-tool__actions">
        <button class="md-button md-button--primary" type="button" data-action="compare">Compare</button>
        <button class="md-button" type="button" data-action="clear">Clear</button>
      </div>
      <p class="roomos-tool__status" aria-live="polite"></p>
      <div class="roomos-tool__results" hidden>
        <div class="roomos-tool__field">
          <h3>Your syntax</h3>
          <pre class="roomos-tool__output" data-output="left"></pre>
        </div>
        <div class="roomos-tool__field">
          <h3>Reference syntax</h3>
          <pre class="roomos-tool__output" data-output="right"></pre>
        </div>
      </div>
    </section>

=== "Base64 Conversion Tool"

    Convert text to UTF-8 Base64. For a local HTTP Basic authorization value, enter `username:password` and then copy the resulting value after `Basic `.

    <section class="roomos-tool" data-roomos-tool="base64">
      <div class="roomos-tool__field">
        <label for="roomos-base64-input">Text to encode</label>
        <textarea id="roomos-base64-input" spellcheck="false" placeholder="username:password"></textarea>
      </div>
      <div class="roomos-tool__actions">
        <button class="md-button md-button--primary" type="button" data-action="convert">Encode</button>
        <button class="md-button" type="button" data-action="copy" disabled>Copy</button>
        <button class="md-button" type="button" data-action="clear">Clear</button>
      </div>
      <p class="roomos-tool__status" aria-live="polite"></p>
      <div class="roomos-tool__field">
        <label for="roomos-base64-output">Base64 output</label>
        <textarea id="roomos-base64-output" readonly spellcheck="false" placeholder="Encoded output appears here"></textarea>
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
