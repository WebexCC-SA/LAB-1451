{{ config.cProps.devNotice }}
{{ config.cProps.acronyms }}

# Access RoomOS xAPI with JSXAPI ~(section\ {{ config.cProps.rxp.sectionIds.jsxapi }})~

!!! abstract

    JSXAPI is Cisco's JavaScript SDK for accessing the RoomOS xAPI from an external Node.js application. The application runs on your laptop or another computer that can reach the RoomOS device.

    JSXAPI and macros use the same `xapi.Command`, `xapi.Config`, `xapi.Status`, and `xapi.Event` object model. This section therefore follows the same concepts, Lesson titles, xAPI targets, and order as the Macro Integration Method. JSXAPI adds only the external connection needed to receive the familiar `xapi` object.

    You will translate familiar terminal xAPI forms into JSXAPI. Each Lesson gives you a bounded scaffold, but keeps the completed assessed expression inside a collapsed **Successful Syntax and Log Output** disclosure. The examples use Cisco's direct `connect` → `ready` pattern without prescribing how you should structure a larger JavaScript application.

    Like the direct HTTP API, JSXAPI authenticates with a local RoomOS user and communicates directly with the RoomOS device. The difference is the session: HTTP sends independent requests, while JSXAPI authenticates as it opens a persistent WebSocket or SSH connection and then uses that connection for xAPI calls and feedback.

    !!! curious "Click the Tabs Below to compare HTTP API and JSXAPI communication"

        === "HTTP API"

            ``` mermaid
            %%{init: {'theme':'dark'}}%%
            sequenceDiagram
              participant Client as HTTP Client
              participant Device as RoomOS Device
              Client->>+Device: HTTPS GET or POST<br>with Basic credentials
              Device-->>-Client: HTTP response
              Note over Client,Device: The request and response complete
            ```

            - In this lab, every request carries local user credentials through an HTTP Basic authorization header.
            - Each xAPI GET or POST is an independent request and response.
            - Subscriptions require the RoomOS `HTTPFeedback` feature and a separate webhook endpoint.

        === "JSXAPI"

            ``` mermaid
            %%{init: {'theme':'dark'}}%%
            sequenceDiagram
              participant App as Node.js Application
              participant SDK as JSXAPI SDK
              participant Device as RoomOS Device
              App->>+SDK: connect(wss://device,<br>username and password)
              SDK->>+Device: Open connection and authenticate
              Device-->>-SDK: Authenticated xAPI session
              SDK-->>-App: ready(xapi)
              App->>+SDK: xAPI call or subscription
              SDK->>+Device: Send through the open connection
              Device-->>-SDK: Response or feedback
              SDK-->>-App: Promise result or callback
            ```

            - Local RoomOS credentials are supplied once when `jsxapi.connect()` opens the connection.
            - The `ready` event provides the same `xapi` JavaScript object used by macros.
            - Calls, responses, and `.on()` subscription feedback share the persistent connection.

## Section {{ config.cProps.rxp.sectionIds.jsxapi }} Requirements

!!! important "Previous Sections"

    Complete these sections before beginning:

    - SSH ^{{ config.cProps.rxp.sectionIds.ssh }}^
    - Macros ^{{ config.cProps.rxp.sectionIds.macro }}^

    SSH establishes the terminal form used throughout this section. Macros establish the JavaScript xAPI object model that JSXAPI reuses.

!!! important "Hardware, Software, and Credentials"

    - A laptop with network access to the RoomOS device
    - A Cisco Desk, Board, or Room Series RoomOS device
    - A current Node.js Long Term Support release and npm
    - A text editor
    - A terminal application
    - RoomOS device: {{ config.cProps.auth.roomosIp }}
    - Username: {{ config.cProps.auth.roomosUser }}
    - Password: {{ config.cProps.auth.roomosPass }}

!!! note

    The examples use secure WebSockets (`wss`) first. If the lab device certificate is not trusted by your laptop, use JSXAPI's SSH transport for the lab rather than disabling TLS certificate validation.

## **JSXAPI Authentication and Communication** ~({{ config.cProps.rxp.sectionIds.jsxapi }}.1)~

JSXAPI uses <hl_0>user-based authentication</hl_0> against the RoomOS device. It does not use a Webex access token or send requests through Webex Cloud. The Node.js application must be able to reach the device and must provide credentials for a local RoomOS user with permission to access the required xAPI paths.

| Connection element | Lab value | Purpose |
|:--|:--|:--|
| Transport URL | `wss://[ROOMOS_IP_ADDRESS]` | Opens a secure WebSocket directly to the RoomOS device |
| Alternate transport | `ssh://[ROOMOS_IP_ADDRESS]` | Uses the same local user through SSH when secure WebSocket certificate trust prevents the lab connection |
| `username` | `[ROOMOS_USERNAME]` | Identifies the local RoomOS user |
| `password` | `[ROOMOS_PASSWORD]` | Authenticates that local RoomOS user |
| `ready` event | `(xapi) => { ... }` | Confirms authentication and supplies the connected `xapi` object |

The JSXAPI SDK performs the transport-specific authentication exchange. Your application supplies the connection URL and credentials to `jsxapi.connect()`, handles connection errors, and begins xAPI work only after the `ready` event supplies the authenticated `xapi` object.

???+ lesson "Lesson: Relate JSXAPI to the Macro Runtime ~({{ config.cProps.rxp.sectionIds.jsxapi }}.1.1)~"

    A macro receives an `xapi` object from the RoomOS Macro Runtime. JSXAPI creates the same object after an external connection reaches its `ready` event.

    | Concern | Macro | JSXAPI |
    |:--|:--|:--|
    | JavaScript runtime | RoomOS device | External Node.js process |
    | `xapi` object | Imported from `xapi` | Provided to the JSXAPI `ready` callback |
    | Connection | Managed by RoomOS | Established with `jsxapi.connect()` |
    | External packages | Not available | Available through npm |
    | Multiple devices | Separate device runtimes | One application can manage several connections |
    | Subscription lifetime | Until stopped or unsubscribed | Until unsubscribed or the connection closes |

    The object-style mapping stays consistent:

    | Terminal branch | JSXAPI object | Common operations |
    |:--|:--|:--|
    | <hl_1>xCommand</hl_1> | `xapi.Command` | Call the command as a function |
    | <hl_2>xConfiguration</hl_2> | `xapi.Config` | `.get()`, `.set(value)`, `.on(callback)` |
    | <hl_5>xStatus</hl_5> | `xapi.Status` | `.get()`, `.on(callback)` |
    | <hl_3>xEvent</hl_3> | `xapi.Event` | `.on(callback)` |

??? lesson "Lesson: Verify Device Access for JSXAPI ~({{ config.cProps.rxp.sectionIds.jsxapi }}.1.2)~"

    - Connect to the RoomOS device through SSH.
    - Read the WebSocket and HTTP service configuration.

    ```shell title="Run in the RoomOS SSH session"
    xConfiguration NetworkServices Websocket
    xConfiguration NetworkServices HTTP Mode
    ```

    - Confirm WebSocket is enabled directly or follows an enabled HTTP service.
    - Confirm your local user can authenticate through SSH.
    - Exit the SSH session when the checks are complete.

    [Open NetworkServices Websocket in the RoomOS xAPI Reference](https://roomos.cisco.com/xapi/Configuration.NetworkServices.Websocket/){ .md-button .md-button--primary target="_blank" }

## **Create and Connect the Node.js Project** ~({{ config.cProps.rxp.sectionIds.jsxapi }}.2)~

???+ lesson "Lesson: Verify Node.js and npm ~({{ config.cProps.rxp.sectionIds.jsxapi }}.2.1)~"

    - Open a terminal on your laptop.
    - Check Node.js and npm.

    ```shell title="Run in your laptop terminal"
    node --version
    npm --version
    ```

    Both commands must return version numbers. If either command is missing, install a current Node.js Long Term Support release before continuing.

??? lesson "Lesson: Create the JSXAPI Project ~({{ config.cProps.rxp.sectionIds.jsxapi }}.2.2)~"

    - Create an empty project folder and enter it.

    === "macOS or Linux"

        ```shell
        mkdir roomos-jsxapi-lab
        cd roomos-jsxapi-lab
        ```

    === "Windows PowerShell"

        ```powershell
        New-Item -ItemType Directory roomos-jsxapi-lab
        Set-Location roomos-jsxapi-lab
        ```

    - Initialize the project and install the connection and environment-file packages.

    ```shell title="Run inside roomos-jsxapi-lab"
    npm init -y
    npm install jsxapi@6.0.0 dotenv
    ```

    - Confirm `package.json`, `package-lock.json`, and `node_modules` now exist.

??? lesson "Lesson: Set Temporary Connection Environment Variables ~({{ config.cProps.rxp.sectionIds.jsxapi }}.2.3)~"

    Shell environment variables are useful for a quick connection check because credentials stay out of source code. They are ephemeral: these values normally disappear when the terminal closes, and they do not survive a restart unless your operating system is configured to persist them.

    - Set the four values for this terminal session.

    === "macOS or Linux"

        ```shell
        export ROOMOS_PROTOCOL='wss'
        export ROOMOS_IP='[ROOMOS_IP_ADDRESS]'
        export ROOMOS_USERNAME='[ROOMOS_USERNAME]'
        export ROOMOS_PASSWORD='[ROOMOS_PASSWORD]'
        ```

    === "Windows PowerShell"

        ```powershell
        $env:ROOMOS_PROTOCOL='wss'
        $env:ROOMOS_IP='[ROOMOS_IP_ADDRESS]'
        $env:ROOMOS_USERNAME='[ROOMOS_USERNAME]'
        $env:ROOMOS_PASSWORD='[ROOMOS_PASSWORD]'
        ```

    - Print only the non-secret settings to confirm they are available.

    === "macOS or Linux"

        ```shell
        printf '%s://%s\n' "$ROOMOS_PROTOCOL" "$ROOMOS_IP"
        ```

    === "Windows PowerShell"

        ```powershell
        "$($env:ROOMOS_PROTOCOL)://$($env:ROOMOS_IP)"
        ```

    !!! warning

        Do not print the password, save it in shell history, or commit it to source control. The next Lesson moves these settings into an ignored project-local file that loads whenever the application starts.

??? lesson "Lesson: Create a Persistent Project Environment File ~({{ config.cProps.rxp.sectionIds.jsxapi }}.2.4)~"

    The `.env` file persists with this lab project and is loaded by `dotenv` on each run. It is convenient for a lab, but a production integration should use an approved secret manager.

    - Create `.gitignore` inside `roomos-jsxapi-lab`.

    ```text title=".gitignore"
    node_modules/
    .env
    ```

    - Create a secret-free example that can safely be shared.

    ```text title=".env.example"
    ROOMOS_PROTOCOL=wss
    ROOMOS_IP=
    ROOMOS_USERNAME=
    ROOMOS_PASSWORD=
    ```

    - Create `.env` and replace the bracketed values with your pod information.

    ```text title=".env"
    ROOMOS_PROTOCOL=wss
    ROOMOS_IP=[ROOMOS_IP_ADDRESS]
    ROOMOS_USERNAME=[ROOMOS_USERNAME]
    ROOMOS_PASSWORD=[ROOMOS_PASSWORD]
    ```

    - If secure WebSockets fail because the device certificate is not trusted, change only this line for the lab:

    ```text title="Use the SSH transport in .env"
    ROOMOS_PROTOCOL=ssh
    ```

??? lesson "Lesson: Create and Run the JSXAPI Connection ~({{ config.cProps.rxp.sectionIds.jsxapi }}.2.5)~"

    The connection is prerequisite syntax, so you may copy it directly. This is the bare connection pattern shown in Cisco's JSXAPI introduction; it does not add a helper module or application wrapper.

    - Create `lesson.js`.

    ```javascript title="lesson.js"
    require('dotenv').config();
    const jsxapi = require('jsxapi');

    jsxapi
      .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
        username: process.env.ROOMOS_USERNAME,
        password: process.env.ROOMOS_PASSWORD
      })
      .on('error', console.error)
      .on('ready', (xapi) => {
        console.log('The JSXAPI connection is ready.');
        xapi.close();
      });
    ```

    - Run the connection check.

    ```shell title="Run in your laptop terminal"
    node lesson.js
    ```

    ??? success "Successful Connection and Log Output"

        === "JSXAPI"

            ```javascript title="lesson.js"
            require('dotenv').config();
            const jsxapi = require('jsxapi');

            jsxapi
              .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
                username: process.env.ROOMOS_USERNAME,
                password: process.env.ROOMOS_PASSWORD
              })
              .on('error', console.error)
              .on('ready', (xapi) => {
                console.log('The JSXAPI connection is ready.');
                xapi.close();
              });
            ```

        === "Log Output"

            | Stream | Message |
            |:--|:--|
            | `stdout` | `The JSXAPI connection is ready.` |

## **Executing xCommands** ~({{ config.cProps.rxp.sectionIds.jsxapi }}.3)~

!!! abstract

    A JSXAPI command follows the same path as its terminal form. Remove the leading `x`, convert path spaces to dot notation after `xapi.Command`, and pass named arguments in a JavaScript object. Await the returned Promise when later work depends on completion.

???+ lesson "Lesson: Execute an xCommand ~({{ config.cProps.rxp.sectionIds.jsxapi }}.3.1)~"

    - **xAPI:** `xCommand Video Selfview Set`

    ```shell title="Terminal xAPI form"
    xCommand Video Selfview Set Mode: On FullscreenMode: On OnMonitorRole: First
    ```

    - Identify the `Video Selfview Set` path and its three named arguments.
    - Replace the marked line in `lesson.js` with the JSXAPI expression derived from the terminal form.

    ```javascript title="Scaffold — replace the marked line"
    require('dotenv').config();
    const jsxapi = require('jsxapi');

    jsxapi
      .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
        username: process.env.ROOMOS_USERNAME,
        password: process.env.ROOMOS_PASSWORD
      })
      .on('error', console.error)
      .on('ready', async (xapi) => {
        // Replace this comment with the awaited JSXAPI command.
        console.log('Selfview command completed.');
        xapi.close();
      });
    ```

    - Run `node lesson.js`.
    - Confirm <hl_0>full-screen selfview</hl_0> appears on the RoomOS User Interface.

    ??? success "Successful Syntax and Log Output"

        === "JSXAPI"

            ```javascript title="lesson.js"
            require('dotenv').config();
            const jsxapi = require('jsxapi');

            jsxapi
              .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
                username: process.env.ROOMOS_USERNAME,
                password: process.env.ROOMOS_PASSWORD
              })
              .on('error', console.error)
              .on('ready', async (xapi) => {
                await xapi.Command.Video.Selfview.Set({
                  Mode: 'On',
                  FullscreenMode: 'On',
                  OnMonitorRole: 'First'
                });

                console.log('Selfview command completed.');
                xapi.close();
              });
            ```

        === "Log Output"

            | Stream | Message |
            |:--|:--|
            | `stdout` | `Selfview command completed.` |

    [Open xCommand Video Selfview Set](https://roomos.cisco.com/xapi/Command.Video.Selfview.Set/){ .md-button .md-button--primary target="_blank" }

??? lesson "Lesson: Execute an xCommand with multiple arguments with the same name ~({{ config.cProps.rxp.sectionIds.jsxapi }}.3.2)~"

    When a terminal command repeats an argument name, represent its values as a JavaScript array instead of repeating an object key.

    - **xAPI:** `xCommand Video Input SetMainVideoSource`

    ```shell title="Terminal xAPI form"
    xCommand Video Input SetMainVideoSource ConnectorId: 1 ConnectorId: 1 Layout: Equal
    ```

    - Translate the command path to dot notation.
    - Represent both `ConnectorId` values in one array.
    - Replace the marked line and run the file.

    ```javascript title="Scaffold — replace the marked line"
    .on('ready', async (xapi) => {
      // Replace this comment with the awaited JSXAPI command.
      console.log('Main video source command completed.');
      xapi.close();
    });
    ```

    - Confirm the RoomOS device composes the two connector references with the <hl_0>Equal layout</hl_0>.

    ??? success "Successful Syntax and Log Output"

        === "JSXAPI"

            ```javascript title="lesson.js"
            require('dotenv').config();
            const jsxapi = require('jsxapi');

            jsxapi
              .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
                username: process.env.ROOMOS_USERNAME,
                password: process.env.ROOMOS_PASSWORD
              })
              .on('error', console.error)
              .on('ready', async (xapi) => {
                await xapi.Command.Video.Input.SetMainVideoSource({
                  ConnectorId: [1, 1],
                  Layout: 'Equal'
                });

                console.log('Main video source command completed.');
                xapi.close();
              });
            ```

        === "Log Output"

            | Stream | Message |
            |:--|:--|
            | `stdout` | `Main video source command completed.` |

    [Open xCommand Video Input SetMainVideoSource](https://roomos.cisco.com/xapi/Command.Video.Input.SetMainVideoSource/){ .md-button .md-button--primary target="_blank" }

??? lesson "Lesson: Execute an xCommand with a multiline argument ~({{ config.cProps.rxp.sectionIds.jsxapi }}.3.3)~"

    JSXAPI passes command arguments as the first function parameter and multiline content as the second. The multiline XML below is input data, so you may copy it before constructing the assessed command call.

    - **xAPI:** `xCommand UserInterface Extensions Panel Save`

    ```shell title="Terminal xAPI form"
    xCommand UserInterface Extensions Panel Save PanelId: wx1_lab_multilineCommand
    <Extensions>
      <Panel>
        <Order>1</Order>
        <PanelId>wx1_lab_multilineCommand</PanelId>
        <Location>HomeScreen</Location>
        <Icon>Info</Icon>
        <Color>#00FFFF</Color>
        <Name>MultiLine Command [rxp-7]</Name>
        <ActivityType>Custom</ActivityType>
      </Panel>
    </Extensions>
    .
    ```

    - Replace `lesson.js` with the scaffold.
    - Construct only the marked `Panel.Save` call.

    ```javascript title="Scaffold — construct the command at the marked line"
    require('dotenv').config();
    const jsxapi = require('jsxapi');

    const panelId = 'wx1_lab_multilineCommand';
    const panelXml = `<Extensions>
      <Panel>
        <Order>1</Order>
        <PanelId>wx1_lab_multilineCommand</PanelId>
        <Location>HomeScreen</Location>
        <Icon>Info</Icon>
        <Color>#00FFFF</Color>
        <Name>MultiLine Command [rxp-7]</Name>
        <ActivityType>Custom</ActivityType>
      </Panel>
    </Extensions>`;

    jsxapi
      .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
        username: process.env.ROOMOS_USERNAME,
        password: process.env.ROOMOS_PASSWORD
      })
      .on('error', console.error)
      .on('ready', async (xapi) => {
        // Replace this comment with the awaited JSXAPI command.
        console.log(`Panel ${panelId} saved.`);
        xapi.close();
      });
    ```

    - Run `node lesson.js`.
    - Confirm <hl_0>MultiLine Command [rxp-7]</hl_0> appears on the RoomOS User Interface.

    ??? success "Successful Syntax and Log Output"

        === "JSXAPI"

            ```javascript title="lesson.js"
            require('dotenv').config();
            const jsxapi = require('jsxapi');

            const panelId = 'wx1_lab_multilineCommand';
            const panelXml = `<Extensions>
              <Panel>
                <Order>1</Order>
                <PanelId>wx1_lab_multilineCommand</PanelId>
                <Location>HomeScreen</Location>
                <Icon>Info</Icon>
                <Color>#00FFFF</Color>
                <Name>MultiLine Command [rxp-7]</Name>
                <ActivityType>Custom</ActivityType>
              </Panel>
            </Extensions>`;

            jsxapi
              .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
                username: process.env.ROOMOS_USERNAME,
                password: process.env.ROOMOS_PASSWORD
              })
              .on('error', console.error)
              .on('ready', async (xapi) => {
                await xapi.Command.UserInterface.Extensions.Panel.Save(
                  { PanelId: panelId },
                  panelXml
                );

                console.log(`Panel ${panelId} saved.`);
                xapi.close();
              });
            ```

        === "Log Output"

            | Stream | Message |
            |:--|:--|
            | `stdout` | `Panel wx1_lab_multilineCommand saved.` |

    [Open xCommand UserInterface Extensions Panel Save](https://roomos.cisco.com/xapi/Command.UserInterface.Extensions.Panel.Save/){ .md-button .md-button--primary target="_blank" }

??? lesson "Lesson: Execute an xCommand which generates data and responds ~({{ config.cProps.rxp.sectionIds.jsxapi }}.3.4)~"

    - **xAPI:** `xCommand UserInterface Extensions List`

    ```shell title="Terminal xAPI form"
    xCommand UserInterface Extensions List
    ```

    - Translate the path to JSXAPI.
    - Await the command and assign its response to `extensions`.
    - Replace the marked expression, run the file, and inspect the returned data.

    ```javascript title="Scaffold — replace the marked expression"
    .on('ready', async (xapi) => {
      const extensions =
        /* Replace with the awaited JSXAPI expression */;

      console.log(JSON.stringify(extensions, null, 2));
      xapi.close();
    });
    ```

    ??? success "Successful Syntax and Log Output"

        === "JSXAPI"

            ```javascript title="lesson.js"
            require('dotenv').config();
            const jsxapi = require('jsxapi');

            jsxapi
              .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
                username: process.env.ROOMOS_USERNAME,
                password: process.env.ROOMOS_PASSWORD
              })
              .on('error', console.error)
              .on('ready', async (xapi) => {
                const extensions =
                  await xapi.Command.UserInterface.Extensions.List();

                console.log(JSON.stringify(extensions, null, 2));
                xapi.close();
              });
            ```

        === "Log Output"

            | Stream | Message |
            |:--|:--|
            | `stdout` | `{"Extensions":{"Panel":[{"PanelId":"wx1_lab_multilineCommand","Name":"MultiLine Command [rxp-7]"}]}}` |

        The exact response includes the UI Extensions installed on your RoomOS device.

    [Open xCommand UserInterface Extensions List](https://roomos.cisco.com/xapi/Command.UserInterface.Extensions.List/){ .md-button .md-button--primary target="_blank" }

## **Setting, Getting and Subscribing to xConfigurations** ~({{ config.cProps.rxp.sectionIds.jsxapi }}.4)~

!!! abstract

    Use `.get()` to read a configuration, `.set(value)` to change it, and `.on(callback)` to create a Feedback Subscription. The function returned by `.on()` removes that subscription.

???+ lesson "Lesson: Get an xConfiguration Value ~({{ config.cProps.rxp.sectionIds.jsxapi }}.4.1)~"

    - **xAPI:** `xConfiguration Audio DefaultVolume`

    ```shell title="Terminal xAPI form"
    xConfiguration Audio DefaultVolume
    ```

    - Derive the `xapi.Config` path and append the appropriate read method.
    - Replace the marked expression and run `node lesson.js`.

    ```javascript title="Scaffold — replace the marked expression"
    .on('ready', async (xapi) => {
      const targetConfig =
        /* Replace with the awaited JSXAPI expression */;

      console.log('DefaultVolume:', targetConfig);
      xapi.close();
    });
    ```

    ??? success "Successful Syntax and Log Output"

        === "JSXAPI"

            ```javascript title="lesson.js"
            require('dotenv').config();
            const jsxapi = require('jsxapi');

            jsxapi
              .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
                username: process.env.ROOMOS_USERNAME,
                password: process.env.ROOMOS_PASSWORD
              })
              .on('error', console.error)
              .on('ready', async (xapi) => {
                const targetConfig =
                  await xapi.Config.Audio.DefaultVolume.get();

                console.log('DefaultVolume:', targetConfig);
                xapi.close();
              });
            ```

        === "Log Output"

            | Stream | Message |
            |:--|:--|
            | `stdout` | `DefaultVolume: 50` |

        Your value may be different.

    [Open xConfiguration Audio DefaultVolume](https://roomos.cisco.com/xapi/Configuration.Audio.DefaultVolume/){ .md-button .md-button--primary target="_blank" }

??? lesson "Lesson: Set a new xConfiguration Value ~({{ config.cProps.rxp.sectionIds.jsxapi }}.4.2)~"

    - **xAPI:** `xConfiguration Audio DefaultVolume`

    ```shell title="Terminal xAPI form"
    xConfiguration Audio DefaultVolume: 70
    ```

    - Derive the same `xapi.Config` path.
    - Append the write method and pass `70` as its value.

    ```javascript title="Scaffold — replace the marked expression"
    .on('ready', async (xapi) => {
      // Replace this comment with the awaited JSXAPI expression.
      console.log('DefaultVolume set to: 70');
      xapi.close();
    });
    ```

    - Run the file.
    - Press the <hl_5>Subscription Assistant Button</hl_5> on the RoomOS device's Touch Interface.
        - Under the <hl_2>xConfigurations</hl_2> page, confirm the slider labeled <hl_0>Audio DefaultVolume</hl_0> is set to <hl_1>70</hl_1>.

    ??? success "Successful Syntax and Log Output"

        === "JSXAPI"

            ```javascript title="lesson.js"
            require('dotenv').config();
            const jsxapi = require('jsxapi');

            jsxapi
              .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
                username: process.env.ROOMOS_USERNAME,
                password: process.env.ROOMOS_PASSWORD
              })
              .on('error', console.error)
              .on('ready', async (xapi) => {
                await xapi.Config.Audio.DefaultVolume.set(70);
                console.log('DefaultVolume set to: 70');
                xapi.close();
              });
            ```

        === "Log Output"

            | Stream | Message |
            |:--|:--|
            | `stdout` | `DefaultVolume set to: 70` |

    [Open xConfiguration Audio DefaultVolume](https://roomos.cisco.com/xapi/Configuration.Audio.DefaultVolume/){ .md-button .md-button--primary target="_blank" }

??? lesson "Lesson: Get multiple xConfigurations under a Common Node ~({{ config.cProps.rxp.sectionIds.jsxapi }}.4.3)~"

    - **xAPI:** `xConfiguration Audio`

    ```shell title="Terminal xAPI form"
    xConfiguration Audio
    ```

    - Stop the path at the `Audio` common node and apply the read method.
    - Replace the marked expression and inspect the returned object.

    ```javascript title="Scaffold — replace the marked expression"
    .on('ready', async (xapi) => {
      const audioConfigurations =
        /* Replace with the awaited JSXAPI expression */;

      console.log(JSON.stringify(audioConfigurations, null, 2));
      xapi.close();
    });
    ```

    ??? success "Successful Syntax and Log Output"

        === "JSXAPI"

            ```javascript title="lesson.js"
            require('dotenv').config();
            const jsxapi = require('jsxapi');

            jsxapi
              .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
                username: process.env.ROOMOS_USERNAME,
                password: process.env.ROOMOS_PASSWORD
              })
              .on('error', console.error)
              .on('ready', async (xapi) => {
                const audioConfigurations =
                  await xapi.Config.Audio.get();

                console.log(JSON.stringify(audioConfigurations, null, 2));
                xapi.close();
              });
            ```

        === "Log Output"

            | Stream | Message |
            |:--|:--|
            | `stdout` | `{"DefaultVolume":"70","Input":{"...":"Additional Audio configuration nodes"}}` |

    [Search the RoomOS xAPI Reference for xConfiguration Audio](https://roomos.cisco.com/xapi/search?search=Configuration+Audio){ .md-button .md-button--primary target="_blank" }

??? lesson "Lesson: Subscribe and Unsubscribe to an xConfiguration ~({{ config.cProps.rxp.sectionIds.jsxapi }}.4.4)~"

    - **xAPI:** `xConfiguration Audio DefaultVolume`

    ```shell title="Terminal xAPI form"
    xFeedback Register Configuration/Audio/DefaultVolume
    ```

    - Create `subscription.js` from the scaffold.
    - Replace the marked expression with a JSXAPI `.on()` subscription.
    - Store the returned unsubscribe function in `unsubscribe`.

    ```javascript title="subscription.js — replace the marked expression"
    .on('ready', (xapi) => {
      const unsubscribe =
        /* Subscribe to Audio DefaultVolume and log each value */;

      console.log('Listening for 20 seconds...');

      setTimeout(() => {
        unsubscribe();
        xapi.close();
        console.log('DefaultVolume subscription stopped.');
      }, 20000);
    });
    ```

    - Run `node subscription.js` in the <hl_6>Laptop Terminal</hl_6>.
    - Press the <hl_5>Subscription Assistant Button</hl_5> on the RoomOS device's Touch Interface.
        - Under the <hl_2>xConfigurations</hl_2> page, move the slider labeled <hl_0>Audio DefaultVolume</hl_0> to several positions.
        - Observe each change in the <hl_6>Laptop Terminal</hl_6>.
    - After `DefaultVolume subscription stopped.` appears, move the slider again and confirm no new values print.

    ??? success "Successful Syntax and Log Output"

        === "JSXAPI"

            ```javascript title="subscription.js"
            require('dotenv').config();
            const jsxapi = require('jsxapi');

            jsxapi
              .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
                username: process.env.ROOMOS_USERNAME,
                password: process.env.ROOMOS_PASSWORD
              })
              .on('error', console.error)
              .on('ready', (xapi) => {
                const unsubscribe =
                  xapi.Config.Audio.DefaultVolume.on((value) => {
                    console.log('DefaultVolume:', value);
                  });

                console.log('Listening for 20 seconds...');

                setTimeout(() => {
                  unsubscribe();
                  xapi.close();
                  console.log('DefaultVolume subscription stopped.');
                }, 20000);
              });
            ```

        === "Log Output"

            | Stream | Message |
            |:--|:--|
            | `stdout` | `Listening for 20 seconds...` |
            | `stdout` | `DefaultVolume: 55` |
            | `stdout` | `DefaultVolume: 65` |
            | `stdout` | `DefaultVolume subscription stopped.` |

??? lesson "Lesson: Subscribe and Unsubscribe to Multiple xConfigurations under a Common Node ~({{ config.cProps.rxp.sectionIds.jsxapi }}.4.5)~"

    - **xAPI:** `xConfiguration Video Input AirPlay`

    ```shell title="Terminal xAPI form"
    xFeedback Register Configuration/Video/Input/AirPlay
    ```

    - Reuse `subscription.js`.
    - Replace the marked expression with a subscription at the `AirPlay` common node.
    - Log the returned object so changes beneath that node remain distinguishable.

    ```javascript title="Replace the subscription expression"
    const unsubscribe =
      /* Subscribe to the Video Input AirPlay common node */;
    ```

    - Run the file in the <hl_6>Laptop Terminal</hl_6>.
    - Press the <hl_5>Subscription Assistant Button</hl_5> on the RoomOS device's Touch Interface.
        - Under the <hl_2>xConfigurations</hl_2> page, use the toggles and buttons in the <hl_0>AirPlay</hl_0> row.
        - Observe the different AirPlay configuration objects in the <hl_6>Laptop Terminal</hl_6>.
    - After `AirPlay subscription stopped.` appears, use the controls again and confirm no new values print.

    ??? success "Successful Syntax and Log Output"

        === "JSXAPI"

            ```javascript title="subscription.js"
            require('dotenv').config();
            const jsxapi = require('jsxapi');

            jsxapi
              .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
                username: process.env.ROOMOS_USERNAME,
                password: process.env.ROOMOS_PASSWORD
              })
              .on('error', console.error)
              .on('ready', (xapi) => {
                const unsubscribe =
                  xapi.Config.Video.Input.AirPlay.on((configuration) => {
                    console.log('AirPlay:', JSON.stringify(configuration));
                  });

                console.log('Listening for 20 seconds...');

                setTimeout(() => {
                  unsubscribe();
                  xapi.close();
                  console.log('AirPlay subscription stopped.');
                }, 20000);
              });
            ```

        === "Log Output"

            | Stream | Message |
            |:--|:--|
            | `stdout` | `Listening for 20 seconds...` |
            | `stdout` | `AirPlay: {"Mode":"On"}` |
            | `stdout` | `AirPlay: {"Beacon":"Auto"}` |
            | `stdout` | `AirPlay subscription stopped.` |

    [Search the RoomOS xAPI Reference for AirPlay configurations](https://roomos.cisco.com/xapi/search?search=Configuration+Video+Input+AirPlay){ .md-button .md-button--primary target="_blank" }

## **Getting and Subscribing to xStatuses** ~({{ config.cProps.rxp.sectionIds.jsxapi }}.5)~

!!! abstract

    An xStatus describes current RoomOS state. Read it once with `.get()` or observe changes with `.on(callback)`. As with configurations, store and call the function returned by `.on()` to unsubscribe.

???+ lesson "Lesson: Get an xStatus Value ~({{ config.cProps.rxp.sectionIds.jsxapi }}.5.1)~"

    - **xAPI:** `xStatus Audio Volume`

    ```shell title="Terminal xAPI form"
    xStatus Audio Volume
    ```

    - Translate the path beneath `xapi.Status` and append the read method.

    ```javascript title="Scaffold — replace the marked expression"
    .on('ready', async (xapi) => {
      const targetStatus =
        /* Replace with the awaited JSXAPI expression */;

      console.log('Volume:', targetStatus);
      xapi.close();
    });
    ```

    ??? success "Successful Syntax and Log Output"

        === "JSXAPI"

            ```javascript title="lesson.js"
            require('dotenv').config();
            const jsxapi = require('jsxapi');

            jsxapi
              .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
                username: process.env.ROOMOS_USERNAME,
                password: process.env.ROOMOS_PASSWORD
              })
              .on('error', console.error)
              .on('ready', async (xapi) => {
                const targetStatus =
                  await xapi.Status.Audio.Volume.get();

                console.log('Volume:', targetStatus);
                xapi.close();
              });
            ```

        === "Log Output"

            | Stream | Message |
            |:--|:--|
            | `stdout` | `Volume: 50` |

    [Open xStatus Audio Volume](https://roomos.cisco.com/xapi/Status.Audio.Volume/){ .md-button .md-button--primary target="_blank" }

??? lesson "Lesson: Get multiple xStatuses under a Common Node ~({{ config.cProps.rxp.sectionIds.jsxapi }}.5.2)~"

    - **xAPI:** `xStatus Audio`

    ```shell title="Terminal xAPI form"
    xStatus Audio
    ```

    - Stop the path at the `Audio` common node and return the full object beneath it.

    ```javascript title="Scaffold — replace the marked expression"
    .on('ready', async (xapi) => {
      const audioStatuses =
        /* Replace with the awaited JSXAPI expression */;

      console.log(JSON.stringify(audioStatuses, null, 2));
      xapi.close();
    });
    ```

    ??? success "Successful Syntax and Log Output"

        === "JSXAPI"

            ```javascript title="lesson.js"
            require('dotenv').config();
            const jsxapi = require('jsxapi');

            jsxapi
              .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
                username: process.env.ROOMOS_USERNAME,
                password: process.env.ROOMOS_PASSWORD
              })
              .on('error', console.error)
              .on('ready', async (xapi) => {
                const audioStatuses =
                  await xapi.Status.Audio.get();

                console.log(JSON.stringify(audioStatuses, null, 2));
                xapi.close();
              });
            ```

        === "Log Output"

            | Stream | Message |
            |:--|:--|
            | `stdout` | `{"Volume":"50","Input":{"...":"Additional Audio status nodes"}}` |

    [Search the RoomOS xAPI Reference for xStatus Audio](https://roomos.cisco.com/xapi/search?search=Status+Audio){ .md-button .md-button--primary target="_blank" }

??? lesson "Lesson: Subscribe and Unsubscribe to an xStatus ~({{ config.cProps.rxp.sectionIds.jsxapi }}.5.3)~"

    - **xAPI:** `xStatus Audio Volume`

    ```shell title="Terminal xAPI form"
    xFeedback Register Status/Audio/Volume
    ```

    - Reuse `subscription.js`.
    - Replace the marked expression with an `Audio Volume` status subscription.

    ```javascript title="Replace the subscription expression"
    const unsubscribe =
      /* Subscribe to Audio Volume and log each value */;
    ```

    - Run the file in the <hl_6>Laptop Terminal</hl_6>.
    - Press the <hl_5>Subscription Assistant Button</hl_5> on the RoomOS device's Touch Interface.
        - Under the <hl_5>xStatuses</hl_5> page, move the slider labeled <hl_0>Adjust Volume</hl_0> to several positions.
        - Observe each volume change in the <hl_6>Laptop Terminal</hl_6>.
    - After `Volume subscription stopped.` appears, move the slider again and confirm no new values print.

    ??? success "Successful Syntax and Log Output"

        === "JSXAPI"

            ```javascript title="subscription.js"
            require('dotenv').config();
            const jsxapi = require('jsxapi');

            jsxapi
              .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
                username: process.env.ROOMOS_USERNAME,
                password: process.env.ROOMOS_PASSWORD
              })
              .on('error', console.error)
              .on('ready', (xapi) => {
                const unsubscribe =
                  xapi.Status.Audio.Volume.on((volume) => {
                    console.log('Volume:', volume);
                  });

                console.log('Listening for 20 seconds...');

                setTimeout(() => {
                  unsubscribe();
                  xapi.close();
                  console.log('Volume subscription stopped.');
                }, 20000);
              });
            ```

        === "Log Output"

            | Stream | Message |
            |:--|:--|
            | `stdout` | `Listening for 20 seconds...` |
            | `stdout` | `Volume: 55` |
            | `stdout` | `Volume: 60` |
            | `stdout` | `Volume subscription stopped.` |

??? lesson "Lesson: Subscribe and Unsubscribe to Multiple xStatuses under a Common Node ~({{ config.cProps.rxp.sectionIds.jsxapi }}.5.4)~"

    - **xAPI:** `xStatus Cameras Camera[N] Position`

    ```shell title="Terminal xAPI form"
    xFeedback Register Status/Cameras/Camera/Position
    ```

    - Reuse `subscription.js`.
    - Subscribe at the `Camera Position` common node so Pan, Tilt, and Zoom changes can arrive through one callback.

    ```javascript title="Replace the subscription expression"
    const unsubscribe =
      /* Subscribe to all Camera Position values */;
    ```

    - Run the file in the <hl_6>Laptop Terminal</hl_6>.
    - Press the <hl_5>Subscription Assistant Button</hl_5> on the RoomOS device's Touch Interface.
        - Under the <hl_5>xStatuses</hl_5> page, use the controls in the <hl_1>Camera Control Wheel</hl_1> row.
        - Observe the Pan, Tilt, and Zoom changes in the <hl_6>Laptop Terminal</hl_6>.
    - After `Camera position subscription stopped.` appears, move the camera again and confirm no new values print.

    ??? success "Successful Syntax and Log Output"

        === "JSXAPI"

            ```javascript title="subscription.js"
            require('dotenv').config();
            const jsxapi = require('jsxapi');

            jsxapi
              .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
                username: process.env.ROOMOS_USERNAME,
                password: process.env.ROOMOS_PASSWORD
              })
              .on('error', console.error)
              .on('ready', (xapi) => {
                const unsubscribe =
                  xapi.Status.Cameras.Camera.Position.on((position) => {
                    console.log('Camera position:', JSON.stringify(position));
                  });

                console.log('Listening for 20 seconds...');

                setTimeout(() => {
                  unsubscribe();
                  xapi.close();
                  console.log('Camera position subscription stopped.');
                }, 20000);
              });
            ```

        === "Log Output"

            | Stream | Message |
            |:--|:--|
            | `stdout` | `Listening for 20 seconds...` |
            | `stdout` | `Camera position: {"Zoom":"4295"}` |
            | `stdout` | `Camera position: {"Pan":"-65","Tilt":"123"}` |
            | `stdout` | `Camera position subscription stopped.` |

    [Search the RoomOS xAPI Reference for Camera Position statuses](https://roomos.cisco.com/xapi/search?search=Status+Cameras+Camera+Position){ .md-button .md-button--primary target="_blank" }

## **Subscribing to xEvents** ~({{ config.cProps.rxp.sectionIds.jsxapi }}.6)~

!!! abstract

    An xEvent reports a discrete occurrence. Event paths use `.on(callback)` but do not use `.get()` because an event has no current value to retrieve.

???+ lesson "Lesson: Subscribe and Unsubscribe to an xEvent ~({{ config.cProps.rxp.sectionIds.jsxapi }}.6.1)~"

    - **xAPI:** `xEvent UserInterface Extensions Widget Action`

    ```shell title="Terminal xAPI form"
    xFeedback Register Event/UserInterface/Extensions/Widget/Action
    ```

    - Reuse `subscription.js`.
    - Replace the marked expression with a `Widget Action` event subscription.

    ```javascript title="Replace the subscription expression"
    const unsubscribe =
      /* Subscribe to Widget Action and log each event */;
    ```

    - Run the file in the <hl_6>Laptop Terminal</hl_6>.
    - Press the <hl_5>Subscription Assistant Button</hl_5> on the RoomOS device's Touch Interface.
        - Under the <hl_3>xEvents</hl_3> page, interact with one or more <hl_0>widgets</hl_0>.
        - Observe each Widget Action event in the <hl_6>Laptop Terminal</hl_6>.
    - After `Widget Action subscription stopped.` appears, use a widget again and confirm no new events print.

    ??? success "Successful Syntax and Log Output"

        === "JSXAPI"

            ```javascript title="subscription.js"
            require('dotenv').config();
            const jsxapi = require('jsxapi');

            jsxapi
              .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
                username: process.env.ROOMOS_USERNAME,
                password: process.env.ROOMOS_PASSWORD
              })
              .on('error', console.error)
              .on('ready', (xapi) => {
                const unsubscribe =
                  xapi.Event.UserInterface.Extensions.Widget.Action.on((event) => {
                    console.log('Widget action:', JSON.stringify(event));
                  });

                console.log('Listening for 20 seconds...');

                setTimeout(() => {
                  unsubscribe();
                  xapi.close();
                  console.log('Widget Action subscription stopped.');
                }, 20000);
              });
            ```

        === "Log Output"

            | Stream | Message |
            |:--|:--|
            | `stdout` | `Listening for 20 seconds...` |
            | `stdout` | `Widget action: {"Type":"clicked","Value":"","WidgetId":"example_widget"}` |
            | `stdout` | `Widget Action subscription stopped.` |

    [Open xEvent UserInterface Extensions Widget Action](https://roomos.cisco.com/xapi/Event.UserInterface.Extensions.Widget.Action/){ .md-button .md-button--primary target="_blank" }

??? lesson "Lesson: Subscribe and Unsubscribe to Multiple xEvents under a Common Node ~({{ config.cProps.rxp.sectionIds.jsxapi }}.6.2)~"

    - **xAPI:** `xEvent UserInterface Extensions`

    ```shell title="Terminal xAPI form"
    xFeedback Register Event/UserInterface/Extensions
    ```

    - Reuse `subscription.js`.
    - Subscribe at the `Extensions` common node so panel, page, and widget events can reach one callback.

    ```javascript title="Replace the subscription expression"
    const unsubscribe =
      /* Subscribe to all UserInterface Extensions events */;
    ```

    - Run the file in the <hl_6>Laptop Terminal</hl_6>.
    - Press the <hl_5>Subscription Assistant Button</hl_5> on the RoomOS device's Touch Interface.
        - Opening the panel generates a <hl_0>Panel Clicked</hl_0> event.
        - Under the <hl_3>xEvents</hl_3> page, open pages and interact with several widgets.
        - Compare the panel, page, and widget event shapes in the <hl_6>Laptop Terminal</hl_6>.
    - After `UI Extensions subscription stopped.` appears, continue using the panel and confirm no new events print.

    ??? success "Successful Syntax and Log Output"

        === "JSXAPI"

            ```javascript title="subscription.js"
            require('dotenv').config();
            const jsxapi = require('jsxapi');

            jsxapi
              .connect(`${process.env.ROOMOS_PROTOCOL}://${process.env.ROOMOS_IP}`, {
                username: process.env.ROOMOS_USERNAME,
                password: process.env.ROOMOS_PASSWORD
              })
              .on('error', console.error)
              .on('ready', (xapi) => {
                const unsubscribe =
                  xapi.Event.UserInterface.Extensions.on((event) => {
                    console.log('UI Extension event:', JSON.stringify(event));
                  });

                console.log('Listening for 20 seconds...');

                setTimeout(() => {
                  unsubscribe();
                  xapi.close();
                  console.log('UI Extensions subscription stopped.');
                }, 20000);
              });
            ```

        === "Log Output"

            | Stream | Message |
            |:--|:--|
            | `stdout` | `Listening for 20 seconds...` |
            | `stdout` | `UI Extension event: {"Panel":{"Clicked":{"PanelId":"wx1_lab_multilineCommand"}}}` |
            | `stdout` | `UI Extension event: {"Widget":{"Action":{"Type":"clicked","WidgetId":"example_widget"}}}` |
            | `stdout` | `UI Extensions subscription stopped.` |

    [Search the RoomOS xAPI Reference for UI Extension events](https://roomos.cisco.com/xapi/search?search=Event+UserInterface+Extensions){ .md-button .md-button--primary target="_blank" }

## **Keep the Lab Examples in Scope** ~({{ config.cProps.rxp.sectionIds.jsxapi }}.7)~

!!! note

    These examples intentionally stop at JSXAPI syntax. The `connect` → `ready` chain is required to receive the external `xapi` object; the surrounding application architecture is your choice after the lab.

    - The `.env` file keeps lab credentials out of the script. It is a lab convenience, not a prescribed production design.
    - One-time examples close the connection after their xAPI operation finishes.
    - Subscription examples stop after 20 seconds so each Lesson has a clear end.
    - Framework selection, reconnect behavior, multi-device state, logging, and production secret management are outside this Integration Method.

## **Section {{ config.cProps.rxp.sectionIds.jsxapi }} Cleanup** ~({{ config.cProps.rxp.sectionIds.jsxapi }}.8)~

- Press ++ctrl+c++ in every terminal running a JSXAPI application.
- Confirm each Node.js process returns to the terminal prompt.
- Keep `.env` out of source control and delete the lab credential file when the project is no longer needed.
- Run the shared RoomOS Section Cleanup below.

{{ config.cProps.rxp.sectionCleanup }}
