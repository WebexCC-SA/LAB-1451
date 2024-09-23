???+ tool "Base64 Conversion Tool"
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