??? tool "Code Difference Checker"
    <p>Use this tool to compare your syntax against the answers to help find stray characters, artifacts or to compare your successful implementation against the lab guides to understand the differences</p>
    <div>
        <div style="display: flex; justify-content: space-between;">
            <textarea id="codeDif-text1" placeholder="Enter first code snippet here..." style="width: 45%; height: 300px; margin: 0 2%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-family: monospace;"></textarea>
            <textarea id="codeDif-text2" placeholder="Enter second code snippet here..." style="width: 45%; height: 300px; margin: 0 2%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-family: monospace;"></textarea>
        </div>
        <label style="font-family: Arial, sans-serif;">
            <input type="checkbox" id="codeDif-ignoreWhitespace" checked>
            Ignore Whitespace
        </label>
        <button id="codeDif-checkButton" style="border: 2px solid #C0C0C0; border-radius: 5px; padding: 10px; background-color: rgba(192, 192, 192, 0.1); cursor: pointer; margin: 20px 0; font-size: 16px;">Check Differences</button>
        <h2 style="font-family: Arial, sans-serif;">Differences:</h2>
        <div style="display: flex; justify-content: space-between;">
            <div id="codeDif-result1" style="width: 45%; color: #000000; background: #f9f9f9; border: 1px solid #ccc; padding: 10px; font-family: monospace; border-radius: 4px; white-space: pre-wrap;"></div>
            <div id="codeDif-result2" style="width: 45%; color: #000000; background: #f9f9f9; border: 1px solid #ccc; padding: 10px; font-family: monospace; border-radius: 4px; white-space: pre-wrap;"></div>
        </div>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                function escapeHTML(html) {
                    var text = document.createTextNode(html);
                    var div = document.createElement('div');
                    div.appendChild(text);
                    return div.innerHTML;
                }
                function checkDifferences() {
                    var ignoreWhitespace = document.getElementById('codeDif-ignoreWhitespace').checked;
                    var code1 = document.getElementById('codeDif-text1').value.split('\n').map(function(line) {
                        return ignoreWhitespace ? line.trim() : line;
                    });
                    var code2 = document.getElementById('codeDif-text2').value.split('\n').map(function(line) {
                        return ignoreWhitespace ? line.trim() : line;
                    });
                    var output1 = '';
                    var output2 = '';
                    // Use forEach to iterate over lines
                    code1.forEach(function(line1, index) {
                        var line2 = code2[index] || '';
                        var maxLength = Math.max(line1.length, line2.length);
                        // Create an array of characters for each line
                        var chars1 = line1.split('');
                        var chars2 = line2.split('');
                        // Use forEach to compare characters
                        chars1.forEach(function(char1, i) {
                            var char2 = chars2[i] || '';
                            if (char1 === char2) {
                                output1 += escapeHTML(char1);
                                output2 += escapeHTML(char2);
                            } else {
                                if (char1) output1 += '<span style="background-color: #ffcdd2;">' + escapeHTML(char1) + '</span>';
                                if (char2) output2 += '<span style="background-color: #c8e6c9;">' + escapeHTML(char2) + '</span>';
                            }
                        });
                        output1 += '\n'; // Add a newline after each line
                        output2 += '\n';
                    });
                    document.getElementById('codeDif-result1').innerHTML = output1;
                    document.getElementById('codeDif-result2').innerHTML = output2;
                }
                document.getElementById('codeDif-checkButton').addEventListener('click', checkDifferences);
            });
        </script>
    </div>

??? tool "Base64 Conversion Tool"
    <p>Convert any string into a base64 encoded string</p>
    <p>If setting up Basic Auth for an endpoint, be sure to use a colon <strong>:</strong> to separate the Username and Password</p>
    <p>Example: username:password <p>
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
    <p>Some command fields can't accept a multi-line string. Use this tool to remove line breaks in your string.</p>
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
    <p>Use this tool to "Stringify" your XML string. Some data fields may be formatted in XML itself, so if your string is written in XML, then you may confuse that xAPI call if you don't handle the syntax appropriately.</p>
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