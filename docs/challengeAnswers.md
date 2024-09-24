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