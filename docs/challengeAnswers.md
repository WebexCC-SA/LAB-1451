??? challenge "Challenge: Open a Text Input Prompt! [Section 2.3.3]"

    ``` { .xml , .no=copy , title="TextInput Prompt XML" }
    <Command>
      <UserInterface>
        <Message>
          <TextInput>
            <Display>
              <Title>My Title Value</Title>
              <Text>My Text Value</Text>
              <Duration>45</Duration>
            </Display>
          </TextInput>
        </Message>
      </UserInterface>
    </Command>
    ```

??? challenge "Challenge: Log and Handle Errors [Section 2.6.3]"

    ``` { .javascript , .no=copy , title="showAndComposeCamera() converted to Async Function" }
    import xapi from 'xapi';

    /**
    * Lab Guide: https://webexcc-sa.github.io/LAB-1451/wx1_1451_part_2/#263-executing-xcommands
    * 
    * Lesson 2: Execute an xCommand with multiple arguments with the same name
    */

    const showAndComposeCamera = async function () {
      try {
        await xapi.Command.Video.Selfview.Set({ Mode: 'On', FullscreenMode: 'On', OnMonitorRole: 'First' });

        await xapi.Command.Video.Input.SetMainVideoSource({
          ConnectorId: [1, 1],
          Layout: 'Equal'
        });
        console.log('Camera Composed!');
      } catch (error){
        console.error('Camera Composition Failed', error);
      };
    };

    showAndComposeCamera();
    ```

??? challenge "Challenge: Can you spot the Error? [Section 2.6.4]"

    - The {++setInterval()++} functions that wrap around ==setRandomDefaultVolume()== in `xConfigs_Lesson-4_MacroPak_2-6-4` and ==setRandomAirplayConfigs()== in `xConfigs_Lesson-5_MacroPak_2-6-4` will continue to run after the subscription has stopped

    - This will continuously change those configs, causing for a poor solution if left on

    - To resolve this, it's best to assign your SetInterval to a object, just as we had done for our subscription and run ClearInterval at the same time we unsubscribed from those configs

    !!! note

        Practically speaking, randomly assigning configs in an automation has little value, this was only done to save you a bit of time so you can see your subscriptions fire

    <div style="display: flex; gap: 10px;">
        <a class="md-button md-button--primary" href="https://developer.mozilla.org/en-US/docs/Web/API/setInterval" target="_blank">
            Learn more about <strong>Intervals</strong> <i class="fa-solid fa-square-up-right"></i>
        </a>
        <a class="md-button md-button--primary" href="https://developer.mozilla.org/en-US/docs/Web/API/setTimeout" target="_blank">
            Learn more about <strong>Timeouts</strong> <i class="fa-solid fa-square-up-right"></i>
        </a>
    </div>

??? challenge "Challenge: Alter `Execute an xCommand` in your Postman Collection"

      ``` { .json , .no=copy , title="Message Body" }
      {
        "jsonrpc": "2.0",
        "id": "Execute an xCommand",
        "method": "xCommand/Video/Selfview/Set",
        "params": {
          "Mode": "Off"
        }
      }
      ```