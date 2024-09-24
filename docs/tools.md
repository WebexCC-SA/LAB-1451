??? tool "Base64 Conversion Tool"
    <div>
        <input type="text" id="base64TextInput" placeholder="Convert to Base64" style="border: 2px solid #C0C0C0; border-radius: 5px; padding: 10px; box-sizing: border-box; width: 200px; margin-right: 5px;">
        <button id="base64ConvertButton" style="border: 2px solid #C0C0C0; border-radius: 5px; padding: 10px; background-color: rgba(192, 192, 192, 0.1); cursor: pointer;">Click to Convert</button>
        <br><br>
        Copy your converted Base64 String
        <div id="base64Output" style="border: 2px solid #C0C0C0; border-radius: 5px; min-height: 45px; padding: 10px; box-sizing: border-box; display: flex; justify-content: space-between; align-items: center;">
            <span id="outputText"></span>
        </div>
        <script>
            document.getElementById('base64ConvertButton').onclick = function() {
                const inputText = document.getElementById('base64TextInput').value;
                const base64Text = btoa(inputText);
                document.getElementById('outputText').textContent = base64Text; // Update only the text span
            };
        </script>
    </div>


??? tool "Flatten Multiline String Tool"
    <div>
        <textarea id="textInput" placeholder="Enter your text here" style="border: 2px solid #C0C0C0; border-radius: 5px; padding: 10px; box-sizing: border-box; width: 200px; height: 100px; margin-right: 5px;"></textarea>
        <button id="flattenButton" style="border: 2px solid #C0C0C0; border-radius: 5px; padding: 10px; background-color: rgba(192, 192, 192, 0.1); cursor: pointer;">Flatten Text</button>
        <br><br>
        Copy your flattened text
        <div id="flattenOutputContainer" style="border: 2px solid #C0C0C0; border-radius: 5px; min-height: 45px; padding: 10px; box-sizing: border-box; display: flex; justify-content: space-between; align-items: center;">
            <span id="flattenOutputText"></span>
        </div>
        <script>
            document.getElementById('flattenButton').onclick = function() {
                const inputText = document.getElementById('textInput').value;
                const flattenedText = inputText.replace(/\n/g, ' ').trim(); // Replace new lines with spaces and trim
                document.getElementById('flattenOutputText').textContent = flattenedText; // Update only the text span
            };
        </script>
    </div>

??? tool "Stringify XML Body"
    <div>
        <textarea id="xmlInput" placeholder="Enter your XML here" style="border: 2px solid #C0C0C0; border-radius: 5px; padding: 10px; box-sizing: border-box; width: 200px; height: 100px; margin-right: 5px;"></textarea>
        <button id="stringifyXmlButton" style="border: 2px solid #C0C0C0; border-radius: 5px; padding: 10px; background-color: rgba(192, 192, 192, 0.1); cursor: pointer;">Stringify XML</button>
        <br><br>
        Copy your stringified XML
        <div id="xmlOutputContainer" style="border: 2px solid #C0C0C0; border-radius: 5px; min-height: 45px; padding: 10px; box-sizing: border-box; display: flex; justify-content: space-between; align-items: center;">
            <span id="xmlOutputText"></span>
        </div>
        <script>
            document.getElementById('stringifyXmlButton').onclick = function() {
                const inputText = document.getElementById('xmlInput').value;
                const stringifiedXml = inputText
                    .replace(/&/g, '&amp;') // Replace & with &amp;
                    .replace(/</g, '&lt;')  // Replace < with &lt;
                    .replace(/>/g, '&gt;')  // Replace > with &gt;
                    .replace(/'/g, '&apos;') // Replace ' with &apos;
                    .replace(/"/g, '&quot;') // Replace " with &quot;
                    .trim(); // Replace < and > with their HTML entities
                document.getElementById('xmlOutputText').textContent = stringifiedXml; // Update only the text span
            };
        </script>
    </div>