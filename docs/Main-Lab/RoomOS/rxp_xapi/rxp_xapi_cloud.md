{{ config.cProps.devNotice }}

# **Accessing xAPI via Cloud xAPI** ~(section\ {{config.cProps.rxp.sectionIds.cloud}})~

!!! Abstract

    Cloud xAPIs are only accessible for devices registered to the Webex Cloud or Cloud Edge for Devices

    They are HTTP requests, but differ in the sens that you're not directly communicating to the endpoint in a 1:1 relationship like we would with every other protocol we offer.

    You instead make a request, or offer a WebHook, to your Webex Cloud instance and then your cloud instance will broker the communication between itself and the device

    In short, when using Cloud xAPIs you're communicating using the Webex Cloud APIs, not directly interfacing with the Device xAPI. but fortunately, the paths fo the Device xAPI stack remain the same

    !!! curious "Click the Tabs Below to see how HTTP xAPI calls differ from Cloud xAPI calls"

        === "HTTP API"

            === "Get Requests [xStatuses/xConfigs]"

                ``` mermaid
                %%{init: {'theme':'dark'}}%%
                sequenceDiagram
                  participant My Customization
                  participant Target Codec
                  My Customization->>+Target Codec: xStatus/xConfig Get Request
                  Note over My Customization,Target Codec: If Device Online
                  Target Codec->>- My Customization: Responds 200 OK
                ```

            === "Post Requests [xCommands/xConfigs]"

                ``` mermaid
                %%{init: {'theme':'dark'}}%%
                sequenceDiagram
                  participant My Customization
                  participant Target Codec
                  My Customization->>+Target Codec: xCommand/xConfig Post Request
                  Note over My Customization,Target Codec: If Device Online
                  Target Codec->>- My Customization: Responds 200 OK
                ```

            === "Subscriptions [HTTPFeedback]"

                ``` mermaid
                %%{init: {'theme':'dark'}}%%
                sequenceDiagram
                  participant My Customization
                  participant Target Codec
                  activate Target Codec
                  Note over My Customization, Target Codec: WebHook Offered by My Customization<br>Configured in Target Codec
                  Target Codec -->>+ My Customization: Forwards Subscription Traffic
                  Note over My Customization,Target Codec: On Subscription callBack from Target Codec
                  deactivate Target Codec
                  activate My Customization
                  Target Codec->>+ My Customization: Ex. xEvent UserInterface Extension Panel Clicked (QuickDial)
                  activate Target Codec
                  My Customization->>+Target Codec: Responds with xCommand Dial Post Request
                  deactivate My Customization
                  Target Codec->>- My Customization: Responds 200 OK
                ```

        === "Cloud xAPI"

            === "Get Requests [xStatuses/xConfigs]"

                ``` mermaid
                %%{init: {'theme':'dark'}}%%
                sequenceDiagram
                  participant My Customization
                  participant Webex Cloud
                  participant Target Codec
                  Webex Cloud<<-->>Target Codec: WebSocket Connection
                  Note over Webex Cloud,Target Codec: Forwarding xStatus, xConfig<br> and xEvent information
                  My Customization->>+Webex Cloud: xStatus/xConfig Get Request
                  Webex Cloud ->>- My Customization: 200 OK
                  Note over My Customization,Webex Cloud: xStatus and xConfig<br> Information Saved in Cloud
                ```
            
            === "Post Requests [xCommands]"

                  ``` mermaid
                  %%{init: {'theme':'dark'}}%%
                  sequenceDiagram
                    participant My Customization
                    participant Webex Cloud
                    participant Target Codec
                    Webex Cloud<<-->>Target Codec: WebSocket Connection
                    Note over Webex Cloud,Target Codec: Forwarding xStatus, xConfig<br> and xEvent information
                    My Customization->>+Webex Cloud: xCommand Post Request
                    activate Webex Cloud
                    Note over Webex Cloud,Target Codec: Runs xCommand if<br>Device is Online
                    Webex Cloud->>+Target Codec: Forwards Request
                    activate Target Codec
                    Target Codec->>+Webex Cloud: Responds to Request
                    deactivate Target Codec
                    Webex Cloud->>- My Customization: Forwards Response 200 OK
                    deactivate Webex Cloud
                  ```

            === "Patch Requests [xConfigs]"

                ``` mermaid
                %%{init: {'theme':'dark'}}%%
                sequenceDiagram
                  participant My Customization
                  participant Webex Cloud
                  participant Target Codec
                  Webex Cloud<<-->>Target Codec: WebSocket Connection
                  Note over Webex Cloud,Target Codec: Forwarding xStatus, xConfig<br> and xEvent information
                  My Customization->>+Webex Cloud: xConfig Patch Request
                  activate Webex Cloud
                  %% Note over Webex Cloud,Target Codec: Runs xConfig
                  %% Webex Cloud->>+Target Codec: Forwards Patch Request
                  %% Target Codec->>+Webex Cloud: Responds Error 503
                  %% deactivate Target Codec
                  Note over Webex Cloud,My Customization: Cloud Accepts Changes
                  Webex Cloud->>+ My Customization: Forwards Response 200 OK
                  deactivate Webex Cloud
                  activate Target Codec
                  Webex Cloud->>+Target Codec: Forwards xConfig Patch Request
                  Note over Webex Cloud,Target Codec: If the Target Codec is Offline, On Boot,<br>Webex Cloud Re-issues all xConfig Changes
                  Target Codec->>+Webex Cloud: Responds 200 OK
                  deactivate Target Codec
                ```

            === "Subscriptions [Workspace Integrations]"

                ``` mermaid
                %%{init: {'theme':'dark'}}%%
                sequenceDiagram
                  participant My Customization
                  participant Webex Cloud
                  participant All Org Codecs
                  participant Target Codec
                  Webex Cloud<<-->>All Org Codecs: WebSocket Connection<br>HTTP LongPoll
                  Note over Webex Cloud,All Org Codecs: Forwarding xStatus, xConfig<br> and xEvent information
                  Note over My Customization, Webex Cloud: WebHook Offered by My Customization<br>Configured in Webex Cloud
                  Webex Cloud -->>+ My Customization: Forwards Subscription Traffic<br>
                  par
                  Note over My Customization, Target Codec: On Subscription callBack from Target Codec
                  Target Codec -->>+ Webex Cloud: Ex. xEvent UserInterface Extension Panel Clicked (QuickDial)
                  Webex Cloud -->>- My Customization: Forwards xEvent UserInterface Extension Panel Clicked
                  My Customization->>+Webex Cloud: Responds with xCommand Dial Post Request
                  Note over Webex Cloud,Target Codec: Runs xCommand if<br>Device is Online
                  Webex Cloud->>-Target Codec: Forwards xCommand Dial Request
                  Target Codec->>+Webex Cloud: Responds 200 OK
                  Webex Cloud->>- My Customization: Forwards Response 200 OK
                  end
                ```


!!! important "Section Requirements"

    Postman should have been installed on your loaner laptop, make sure it is
    
    - If Postman is **==NOT==** installed, be sure to install it before continuing section 2.5

    <div class="grid cards" markdown>

    -   <i class="fa-solid fa-download"></i> __Click the icon below for the Postman Download Page__

        ---

        <a href="https://www.Postman.com/downloads/" target="_blank">
          <figure markdown="span">
              ![Postman Download](https://voyager.postman.com/logo/postman-logo-icon-orange.svg){ width="75" }
          </figure>
        </a>
    
    -   <i class="fa-solid fa-download"></i> __Click the icon below for the Section 2.3 Postman Collection__

        ---

        <a href="https://github.com/WebexCC-SA/LAB-1451/raw/refs/heads/main/docs/assets/downloadable_resources/PostMan%20Collections/WX1-Lab-1451-CloudxAPI-PostMan-Collection.postman_collection.zip" target="_blank">
          <figure markdown="span">
              ![Postman Collection](https://voyager.postman.com/logo/postman-logo-icon-orange.svg){ width="75" }
          </figure>
        </a>

    </div>


## **Cloud xAPI Authentication and Format** ~({{config.cProps.rxp.sectionIds.cloud}}.1)~

!!! blank ""

    <h4>URL Structure</h4>

    The request URL for your Codec will change depending on whether you're making a Get, Post, Patch or Delete request to the Webex Cloud Service

    !!! example ""
        
        === "Get"

            === "xAPI Branch"

                https://webexapis.com/v1/==xapi/status==?[URL_Params]

            === "Devices Branch"

                https://webexapis.com/v1/==devices==?[URL_Params]

            === "WorkSpaces Branch"

                https://webexapis.com/v1/==workspaces==?[URL_Params]

            ??? curious "Why is there a split between `xAPI`, `Devices` and `Workspaces`"

                The Webex API stack offers APIs from all technologies within it's portfolio, not just for Video Devices. You'll have APIs for phone services, messaging, user management and the list goes on

                The `Devices` branch represents cloud-registered Webex RoomOS devices and Webex Calling phones. Devices may be associated with Workspaces.

                The `xAPI` branch allows developers to programmatically invoke commands and query the status of devices that run Webex RoomOS software. This is the very same xAPI we've been working with in the Previous Sections. These Video Devices themselves fall under the `Devices` branch and `Workspaces` branches, but mainly for management purposes.

                The `Workspaces` branch represents where people work, such as conference rooms, meeting spaces, lobbies, and lunch rooms. Devices may be associated with workspaces.

                We'll only cover 2 simple examples for the `Devices` and `Workspaces` branches in this lab as they are a bit out of scope, but they are worthwhile to know about, as they can help you build solutions for your video devices that scale across your organization.

        === "Post"

            === "xAPI Branch"

                https://webexapis.com/v1/xapi/==command/[Command_xAPI_Path]==

            === "Devices Branch"

                https://webexapis.com/v1/==devices/[Devices_API_Path]?[URL_Params]==

            === "Workspaces Branch"

                https://webexapis.com/v1/==workspaces[Workspaces_API_Path]?[URL_Params]==

        === "Patch"

            === "xAPI Branch"

                https://webexapis.com/v1/==deviceConfigurations?[URL_Params]==

                ??? curious "I thought this was the `xAPI` branch, Not the `deviceConfigurations`?"

                    Keen Eye :smiley:. This is the branch to access Device xAPI/xConfigurations but in Webex, all Device Related Configurations run under this branch

                    So when working with Video Device or Phone Devices, you'll configure them here.

            === "Devices Branch"

                https://webexapis.com/v1/==devices/[Device_Id]?[URL_Params]==

            === "Workspaces Branch"

                 https://webexapis.com/v1/==workspaces[Workspaces_API_Path]?[URL_Params]==

        === "Delete"

            === "xAPI Branch"

                !!! error "None Available"

            === "Devices Branch"

                https://webexapis.com/v1/==devices/[deviceId]?[URL_Params]==

            === "Workspaces Branch"

                https://webexapis.com/v1/==workspaceLocations/[locationId]/[Workspaces_API_Path]==

    <h4>Authentication Format</h4>

    Authentication can vary between Webex API branches and it's a bit of a broad topic depending on the solution.

    If you're interested in learning more about Webex APIs and the various scopes, check out the

    <a class="md-button md-button--primary" href="https://developer.webex.com/docs/platform-introduction" target="_blank" >
      Platform Introduction Guide <i class="fa-solid fa-square-up-right"></i>
    </a>

    On developer.webex.com

    For the lab, we'll use our Personal Access Token, which, with admin or device admin rights, will suffice.

    Your Personal Access Token is a form of `Bearer` authentication

    <h4>Request Headers</h4>

    | Key                         | Value                             |
    | :---------------------------| :---------------------------------|
    | `Content-Type`              | `application/json`                |
    | `Content-Type`              | `application/json-patch+json`     |
    | `Authorization`             | `Bearer [YOUR_TOKEN]`             |


## **Get your Personal Access Token, Import and Configure Postman Collection** ~({{config.cProps.rxp.sectionIds.cloud}}.2)~

!!! info "Get your Personal Access Token"

    First, go to the Webex Developer Site

    <a class="md-button md-button--primary" href="https://developer.webex.com" target="_blank" >
          Webex for Developers <i class="fa-solid fa-square-up-right"></i>
    </a>

    !!! tip "Click the Tabs and follow the steps to get your Token"

        === "1. Select Login >>"

            !!! info "In the Top Navigation Bar"

            <figure markdown="span">
                ![Webex Dev Login](./assets/general/DevToken-Login.png){ width="400" }
                <figcaption>Select Login</figcaption>
            </figure>

        === "2. Enter Your Email >>"

            !!! important "Use the email provided to you in this lab"

            <figure markdown="span">
                ![Webex Dev Enter Email](./assets/general/DevToken-EnterEmail.png){ width="400" }
                <figcaption>Enter Your Email</figcaption>
            </figure>

        === "3. Select Documentation >>"

            !!! info "In the Top Navigation Bar"

            <figure markdown="span">
                ![Webex Dev Documentation](./assets/general/DevToken-SelectDocs.png){ width="400" }
                <figcaption>Select Documentation</figcaption>
            </figure>

        === "4. Find Devices Reference >>"

            !!! info "In the left Navigation Bar"

            <figure markdown="span">
                ![Webex Dev Device Reference](./assets/general/DevToken-FindDevices.png){ width="250" }
                <figcaption>Select Device References</figcaption>
            </figure>

        === "5. Copy Personal Access Token"

            !!! info "In the Top Navigation Bar, then in the right content menu"

            <figure markdown="span">
                ![Webex Dev Copy Token](./assets/general/DevToken-CopyToken.png){ width="600" }
                <figcaption>Select List Devices and Copy Personal Access Token</figcaption>
            </figure>

!!! info "Import and Configure Postman Collection"

    <h4>Import Collection</h4>

    - With Postman open, in a new or existing workspace select ==import==
    - Select File
    - Locate the ==WX1-Lab:1451-CloudxAPI-Postman-Collection.Postman_collection.json== and Open it
    - You should now have the Postman Collection installed for this lab

    ??? gif "View Import Postman Collection"

        <figure markdown>
          ![Import Lab Postman Collection](./assets/wx1_1451_part_2/2-3-2_Import-PostmanCollection.gif){ width="600" }
        </figure>

    <h4>Configure Collection</h4>

    - Click on the ==WX1-Lab:1451-CloudxAPI-Postman-Collection== root folder
    - Select Variables
    - Add the following information for your codec in both the `Initial Value` and `Current Value` fields

        - developer_Token
        - device_Id

        !!! important ""

            ![Developer Id](./assets/wx1_1451_part_2/2-5-2_DevToken.png){ width="600", align=right }

            - To get the Device ID, open an SSH terminal window and run the following xAPI

            ``` shell
            xStatus Webex DeveloperId
            ```

            - Copy the response contained within the double quotes ==""==, just be sure not include the double quotes


    - Select Save (or one of the keyboard shortcuts for your computer)
        - ++control+s++ for Windows
        - ++command+s++ for Mac

    ??? gif "View Configure Postman Collection"

        <figure markdown>
          ![Configure Cloud xAPI Postman Collection](./assets/wx1_1451_part_2/2-5-2_Config-Postman.gif){ width="600" }
        </figure>

- - -

!!! Important

    For each lesson throughout Sections 2.5.3 through 2.5.7, use the ==WX1-Lab:1451-CloudxAPI-Postman-Collection.Postman_collection.json== Postman collection.

    Each Section has it's own Folder and each lesson name below matches a Postman Request in that folder.

    When tasked to use Postman, use the Request that matches your current lesson.

- - -

## **Webex Devices and Workspace APIs** ~({{config.cProps.rxp.sectionIds.cloud}}.3)~

!!! Note

    In section 2.5.3, we'll review a single API from the Devices and Workspaces branches. These APIs are not directly associated to the Devices xAPI, but help highlights what's possible to do at scale when interacting with your devices.

???+ lesson "Lesson: List Devices"

    - **Webex Api**: List Devices

    - **Task**:

        - This Postman Request comes predefined, no action other than selecting ==Send== and review the Postman Terminal's repsonse

    !!! note
    
        The result will contain all devices you have access to in your Webex Control Hub Organization. This includes not only Video Collaboration devices, but Phones, headsets and any other hardware listed as a Device

        You can apply filters to this Get request in the form of URL parameters to refine which devices you're interested in listing

    ??? success "View properly formatted Url, Body and Successful Response"

        === "URL"

            <pre><code>https://webexapis.com/v1/{++devices++}</code></pre>

        === "Body"

            !!! failure "No Body Required"

        === "Response"

            ``` JSON
            {
              "items": [
                {
                  "id": "{{device_Id}}",
                  "displayName": "XXXX-XXXX",
                  "placeId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                  "orgId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                  "capabilities": [],
                  "permissions": [],
                  "product": "Cisco Desk Mini",
                  "type": "roomdesk",
                  "tags": [],
                  "ip": "XXX.XXX.XXX.XXX",
                  "mac": "XX:XX:XX:XX:XX:XX",
                  "serial": "XXXXXXXXXXX",
                  "activeInterface": "LAN",
                  "software": "RoomOS XX.XX.XX.XX xxxxxxxxxx",
                  "upgradeChannel": "Stable",
                  "primarySipUrl": "example@example.com",
                  "sipUrls": [
                    "example@example.com"
                  ],
                  "errorCodes": [],
                  "connectionStatus": "Online",
                  "created": "0000-00-00T00:00:00.000Z",
                  "firstSeen": "0000-00-00T00:00:00.000Z",
                  "lastSeen": "0000-00-00T00:00:00.000Z",
                  "managedBy": "Webex",
                  "devicePlatform": "cisco",
                  "workspaceId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                },
                ["Devices Continued..."]
              ]
            }
            ```

??? lesson "Lesson: List Workspaces"

    - **Webex Api**: List Workspaces

    - **Task**:

        - This Postman Request comes predefined, no action other than selecting ==Send== and review the Postman Terminal's repsonse

    !!! note
    
        The result will contain all workspaces you have access to in your Webex Control Hub Organization. This includes information about each workspace you've defined. Keep in mind, each device is apart of a Workspace

        You can apply filters to this Get request in the form of URL parameters to refine which workspaces you're interested in listing

    ??? success "View properly formatted Url, Body and Successful Response"

        === "URL"

            <pre><code>https://webexapis.com/v1/{++workspaces++}</code></pre>

        === "Body"

            !!! failure "No Body Required"

        === "Response"

            ``` JSON
            {
              "items": [
                {
                  "id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                  "orgId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                  "workspaceLocationId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                  "locationId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                  "floorId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                  "displayName": "XXXX-XXXX",
                  "capacity": 16,
                  "type": "meetingRoom",
                  "sipAddress": "example@example.rooms.webex.com",
                  "created": "0000-00-00T00:00:00.000Z",
                  "calling": {
                    "type": "webexCalling",
                    "licenses": ["xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"]
                  },
                  "calendar": {
                    "type": "none"
                  },
                  "hotdeskingStatus": "off",
                  "deviceHostedMeetings": {
                    "enabled": true,
                    "siteUrl": "example.webex.com"
                  },
                  "supportedDevices": "collaborationDevices",
                  "devicePlatform": "cisco"
                },
                ["Workspaces Continued..."]
              ]
            }
            ```

## **Executing xCommands** ~({{config.cProps.rxp.sectionIds.cloud}}.4)~

???+ lesson "Lesson: Execute an xCommand"

    !!! example "Click on the tabs to see how Terminal Syntax relates to Cloud xAPI Syntax"

        === "Terminal Syntax"
            
            Url:
            <pre><code>x{++Command++} {++Child++} {++Child++} {++ChildParam_X++}: ==SomeValue== </code></pre>

        === "Cloud xAPI"

            Url:
            <pre><code>https://webexapis.com/v1/xapi/{++status++}?deviceId={{device_Id}}&name={++Child.Child++}</code></pre>

            ``` JSON title="Body"
            {
                "deviceId": "{{device_Id}}",
                "arguments": {
                  "ChildParam_X": "SomeValue"
              }
            }
            ```

    - **xAPI:** xCommand Video Selfview Set
    
    - **Task:**

        - Structure the xAPI Path above in the `URL`

        - In the Postman request Body, structure the following parameters using JSON format into the `arguments` object
            - Mode: On
            - FullScreenMode: On
            - OnMonitorRole: First

        Once the Postman Request has been updated, ==Save== the request, select ==Send== and review the Postman Terminal's repsonse and observe any changes to your device

    ??? Success "View properly formatted Url, Body and Successful Response"

        === "Url"

            <pre><code>https://webexapis.com/v1/xapi/command/==Video.Selfview.Set==</code></pre>

        === "Body"

            ``` JSON
            {
                "deviceId": "{{device_Id}}",
                "arguments": {
                  "Mode": "On",
                  "FullScreenMode": "On",
                  "OnMonitorRole": "First"
              }
            }
            ```

        === "Response"

            ``` JSON
            {
              "deviceId": "[YOUR_DEVICE_ID]",
              "result": {}
            }
            ```

??? lesson "Lesson: Execute an xCommand with multiple arguments with the same name"

    In cases where we need to declare multiple arguments of the same name, rather than duplicating and re-running the parameters, we instead leverage an Array in place of the value, containing all values we want to implement under that Parameter

    <a class="md-button md-button--primary" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" target="_blank" >
      Learn more about <strong>Arrays</strong> <i class="fa-solid fa-square-up-right"></i>
    </a>

    !!! example "Click on the tabs to see how Terminal Syntax relates to Cloud xAPI Syntax"

        === "Terminal Syntax"

            ``` { .shell }
            xParent Child ChildParam_X: 1, ChildParam_X: 2
            ```
            

        === "Cloud xAPI Syntax"

            Url: https://webexapis.com/v1/xapi/command/==Parent.Child==

            ``` { .json , title="Body" }
            {
                "deviceId": "{{device_Id}}",
                "arguments": {
                  "ChildParam_X": [1, 2]
              }
            }
            ```

    - **xAPI:** xCommand Video Input SetMainVideoSource
    
    - **Task:**

        - Structure the xAPI Path above in the `URL`

        - In the Postman request Body, structure the following parameters using JSON format into the `arguments` object, but duplicate the ConnectorId parameter twice
            - ConnectorId: 1
            - Layout: Equal

        Once the Postman Request has been updated, ==Save== the request, select ==Send== and review the Postman Terminal's repsonse and observe any changes to your device

    ??? Success "View properly formatted Url, Body and Successful Response"

        === "Url"

            <pre><code>https://webexapis.com/v1/xapi/command/==Video.Input.SetMainVideoSource==</code></pre>

        === "Body"

            ``` JSON
            {
                "deviceId": "{{device_Id}}",
                "arguments": {
                  "ConnectorId": [1, 1],
                  "Layout": "Equal"
              }
            }
            ```

        === "Response"

            ``` JSON
            {
              "deviceId": "[YOUR_DEVICE_ID]",
              "result": {}
            }
            ```

??? lesson "Lesson: Execute an xCommand with a multiline argument"

    !!! info

        Multiline Arguments can be placed into the `body` object object of your post. This is defined after the arguments object, not within it.

        The structure of a Multiline argument should look similar to the following

    !!! example "Click on the tabs to see how Terminal Syntax relates to WebSocket Syntax"

        === "Terminal Syntax"

            ``` { .shell }
            [xParent Child ChildParam_X: SomeValue]
            [Multi Line Content]
            .
            ```
            

        === "WebSocket Syntax"

            Url: https://webexapis.com/v1/xapi/command/==Parent.Child==

            ``` { .json , title="Body" }
            {
              "deviceId": "{{device_Id}}",,
              "arguments": {
                "ChildParam_X": "SomeValue"
              },
              "body": "Multi Line Content"
            }
            ```

    !!! note

        Your Selfview may still be open

        Run the following in your terminal window to close selfview

        ``` shell
        xCommand Video Selfview Set Mode: Off
        ```

        ??? challenge "Challenge: Alter `Execute an xCommand` in your Cloud xAPI Postman Collection"

              Rather than re-open your terminal session, you can go back to `Execute an xCommand` in your Cloud xAPI Postman Collection, and update the `argument` object to set the Mode parameter to Off

              <a class="md-button md-button--primary" href="../challengeAnswers/" target="_blank" >
                Giving Up? Check out the Challenge Answers Page <i class="fa-solid fa-square-up-right"></i>
              </a>

    - **xAPI:** xCommand UserInterface Extensions Panel Save
    
    - **Task:**

        - Structure the xAPI Path above in the `URL`

        - In the Postman request Body, structure the following parameters into the `arguments` object
            - PanelId: wx1_lab_multilineCommand
        
        - In the Postman request Body, format the XML below into the `body` object

            ```{ .xml , title="Your &lt;body&gt; Value" }
            <Extensions>
              <Panel>
                <Order>1</Order>
                <PanelId>wx1_lab_multilineCommand</PanelId>
                <Location>HomeScreen</Location>
                <Icon>Info</Icon>
                <Color>#FF70CF</Color>
                <Name>MultiLine Command [Section 2.4.3]</Name>
                <ActivityType>Custom</ActivityType>
              </Panel>
            </Extensions>
            ```

        - Once the Postman Request has been updated, ==Save== the request, select ==Send== and review the Postman Terminal's repsonse and observe any changes to your device
        
        !!! note 

            JSON is not a big fan of multiline strings. No need to flatten it to one line yourself, we have a `Flatten Multiline String Tool` on the Tools page

            <a class="md-button md-button--primary" href="../tools/" target="_blank" >
              Open **Tools** <i class="fa-solid fa-gear"></i> Page <i class="fa-solid fa-square-up-right"></i>
            </a>

        Once the Postman Request has been updated, ==Save== the request, select ==Send== and review the Postman Terminal's repsonse and observe any changes to your device

    ??? Success "View properly formatted Url, Body and Successful Response"

        === "Url"

            <pre><code>https://webexapis.com/v1/xapi/command/==UserInterface.Extensions.Panel.Save==</code></pre>

        === "Body"

            ``` JSON
            {
              "deviceId": "{{device_Id}}",
              "arguments": {
                "PanelId": "wx1_lab_multilineCommand"
              },
              "body": "<Extensions> <Panel> <Order>1</Order> <PanelId>wx1_lab_multilineCommand</PanelId> <Location>HomeScreen</Location> <Icon>Info</Icon> <Color>#FF70CF</Color> <Name>MultiLine Command [Section 2.5.4]</Name> <ActivityType>Custom</ActivityType> </Panel> </Extensions>"
            }
            ```

        === "Response"

            ``` JSON
            {
              "deviceId": "[YOUR_DEVICE_ID]",
              "result": {}
            }
            ```

??? lesson "Lesson: Execute an xCommand which generates data and responds"

    - **xAPI:** xCommand UserInterface Extensions List
    
    - **Task:**

        - Structure the xAPI Path above in the `URL`

        - In the Postman request Body, structure the following parameters using JSON format into the `arguments` object.
            - ActivityType: Custom

       - Once the Postman Request has been updated, ==Save== the request, select ==Send== and review the Postman Terminal's repsonse and observe any changes to your device

    ??? Success "View properly formatted Url, Body and Successful Response"

        === "Url"

            <pre><code>https://webexapis.com/v1/xapi/command/==UserInterface.Extensions.List==</code></pre>

        === "Body"

            ``` JSON
            {
              "deviceId": "{{device_Id}}",
              "arguments": {
                "ActivityType": "Custom"
              }
            }
            ```

        === "Response"

            ``` JSON
            "result": {
              "Extensions": {
                "Panel": [
                  {
                    "ActivityType": "Custom",
                    "Color": "#FF70CF",
                    "Icon": "Info",
                    "Location": "HomeScreen",
                    "Name": "MultiLine Command [Section 2.5.4]",
                    "Order": 1,
                    "Origin": "local",
                    "PanelId": "wx1_lab_multilineCommand",
                    "Visibility": "Auto",
                    "id": 2
                  },
                  {"Continues..."}
                ],
                "Version": "1.11"
              }
            }
            ```

## **Getting and Setting to xConfigurations** ~({{config.cProps.rxp.sectionIds.cloud}}.5)~

???+ lesson "Lesson: Getting an xConfiguration Value"

    !!! example "Click on the tabs to see how Terminal Syntax relates to Cloud xAPI Syntax"

        === "Terminal Syntax"

            <pre><code>x{++Configuration++} {++Child++} {++Child++}</code></pre>

        === "Cloud xAPI"

            <pre><code>https://webexapis.com/v1/device{++Configurations++}?deviceId={{device_Id}}={++Child.Child++}</code></pre>

    - **xAPI:** xConfiguration Audio DefaultVolume
    
    - **Task:**

        - Structure the xAPI Path above in the `URL`

        - Once the Postman Request has been updated, ==Save== the request, select ==Send== and review the Postman Terminal's repsonse and observe any changes to your device

    ??? Success "View properly formatted URL, Body and Successful Response"

        === "URL"

            <pre><code>https://webexapis.com/v1/deviceConfigurations?deviceId={{device_Id}}&key={++Audio.DefaultVolume++}</code></pre>

        === "Body"

            !!! failure "No Body Required"

        === "Response"

            ``` { .json , .no-copy }
            {
                "deviceId": "{{device_Id}}",
                "items": {
                    "Audio.DefaultVolume": {
                        "value": 71, // <-- Response Includes New Value for Path
                        "source": "configured",
                        "sources": {
                            "default": {
                                "value": 50,
                                "editability": {
                                    "isEditable": false,
                                    "reason": "FACTORY_DEFAULT"
                                },
                                "level": "schemaDefault",
                                "enforced": false
                            },
                            "configured": {
                                "value": 71,
                                "editability": {
                                    "isEditable": true
                                },
                                "level": "device",
                                "enforced": false
                            }
                        },
                        "valueSpace": {
                            "type": "integer",
                            "maximum": 100,
                            "minimum": 0
                        }
                    }
                }
            }
            ```

??? lesson "Lesson: Getting multiple xConfiguration Values under a common Node"

    !!! note 

        In order to Get all configuration values under a common node, we need to insert a wildcard ({++*++}) into the path as the last argument

        !!! example "Click each Tab below to see how the wildcard is implemented in the URL"
        
            === "Full xAPI Path"

                <pre><code>https://webexapis.com/v1/deviceConfigurations?deviceId={{device_Id}}&key=Bluetooth.Allowed</code></pre>

            === "Next Higher Common Node"

                <pre><code>https://webexapis.com/v1/deviceConfigurations?deviceId={{device_Id}}&key=Bluetooth{++.*++}</code></pre>

            === "Highest Common Node"

                <pre><code>https://webexapis.com/v1/deviceConfigurations?deviceId={{device_Id}}{--&key=--}</code></pre>

                !!! note

                    When requesting the entire xConfiguration Branch, path or wildcard id not required, simply remove the entire `key` URL parameter

    - **xAPI:** xConfiguration Audio
    
    - **Task:**

        - Structure the xAPI Path above in the `URL`

        - Once the Postman Request has been updated, ==Save== the request, select ==Send== and review the Postman Terminal's repsonse and observe any changes to your device

    ??? Success "View properly formatted URL, Body and Successful Response"

        === "URL"

            <pre><code>https://webexapis.com/v1/deviceConfigurations?deviceId={{device_Id}}&key={++Audio.*++}</code></pre>

        === "Body"

            !!! failure "No Body Required"

        === "Response"

            ``` { .json , .no-copy }
            {
                "deviceId": "{{device_Id}}",
                "items": { // <-- Response Includes New Values for Common Path
                  "Audio.Input.Ethernet[1].Channel[2].Gain": {
                    "value": 45,
                    "source": "default",
                    "sources": {
                      "default": {
                        "value": 45,
                        "editability": {
                          "isEditable": false,
                          "reason": "FACTORY_DEFAULT"
                        },
                        "level": "schemaDefault",
                        "enforced": false
                      },
                      "configured": {
                        "value": null,
                        "editability": {
                          "isEditable": true
                        },
                        "level": "device",
                        "enforced": false
                      }
                    },
                    "valueSpace": {
                      "type": "integer",
                      "maximum": 70,
                      "minimum": 0
                    }
                  },
                  ["And the list continues...[5000+ Lines]"]
                }
            }
            ```

??? lesson "Lesson: Set a new xConfiguration Value"

    !!! Webex "Note"

        Unlike commands, configurations use HTTP Patches. This is because you're making a change to the configuration stored on Webex Control Hub, then control hub will forward changes to the device.

        The benefit here, is that your device doesn't need to be online to make these changes :smiley:. So in the case of making bulk changes across your portfolio, Webex Control Hub will apply the configurations you set to all online devices, and should a device be offline, Webex Control Hub will apply those config changes after the device reconnects to the cloud on boot

        With that said, execution of xConfiguration changes via Cloud xAPI changes how the URL and Body are structured

    !!! example "Click on the tabs to see how Terminal Syntax relates to Cloud xAPI Syntax"

        === "Terminal Syntax"

            ``` { .shell }
            xConfig Child ChildParam_X: 1
            ```

        === "Cloud xAPI Syntax"

            Url: https://webexapis.com/v1/deviceConfigurations?deviceId={{device_Id}}

            === "Set new Value"

                To set a new value, the `op` object must have a value of ==replace== and the `value` object requires the configurations new value

                ``` { .json , title="Body" }
                [
                    {
                        "op": "replace",
                        "path": "Child.ChildParam_X/sources/configured/value",
                        "value": 1
                    }
                ]
                ```

            === "Set Default Value"

                To the configuration back to it's default value, the `op` object must have a value of ==remove== and omit {--`value`--} object

                ``` { .json , title="Body" }
                [
                    {
                        "op": "remove",
                        "path": "Child.Child/sources/configured/value",
                    }
                ]
                ```

            !!! important

                All xAPI paths in the `path` object must end with {++/sources/configured/value++}

    - **xAPI:** xConfiguration Audio DefaultVolume
    
    - **Task:** 

        - Assign the correct value to the `op` object in order to ==Set== a new value for the xAPI above

        - Structure the xAPI above in the path correctly, be sure to end that path with {++/sources/configured/value++}

        - Assign a value of ==100== to the `value` object

    ??? Success "View properly formatted URL, Body and Successful Response"

        === "URL"

            <pre><code>https://webexapis.com/v1/deviceConfigurations?deviceId={{device_Id}}</code></pre>

        === "Body"

            ``` JSON
            [
                {
                    "op": "replace",
                    "path": "Audio.DefaultVolume/sources/configured/value",
                    "value": 100
                }
            ]
            ```

        === "Response"

            ``` { .json , .no-copy }
            {
              "deviceId": "{{device_Id}}",
              "items": {
                "Audio.DefaultVolume": {
                  "value": 100, // <-- Response Includes New Value for Path
                  "source": "configured",
                  "sources": {
                    "default": {
                      "value": 50,
                      "editability": {
                        "isEditable": false,
                        "reason": "FACTORY_DEFAULT"
                      },
                      "level": "schemaDefault",
                      "enforced": false
                    },
                    "configured": {
                      "value": 50,
                      "editability": {
                        "isEditable": true
                      },
                      "level": "device",
                      "enforced": false
                    }
                  },
                  "valueSpace": {
                    "type": "integer",
                    "maximum": 100,
                    "minimum": 0
                  }
                },
                ["10000+ Line Response..."]
              }
            }
            ```

??? lesson "Lesson: Set an xConfiguration to it's Default Value"

    - **xAPI:** xConfiguration Audio DefaultVolume
    
    - **Task:** 

        - Assign the correct value to the `op` object in order to ==Set the Default Value== for the xAPI above

        - Structure the xAPI above in the path correctly, be sure to end that path with {++/sources/configured/value++}

    ??? Success "View properly formatted URL, Body and Successful Response"

        === "URL"

            <pre><code>https://webexapis.com/v1/deviceConfigurations?deviceId={{device_Id}}</code></pre>

        === "Body"

            ``` JSON
            [
                {
                    "op": "remove",
                    "path": "Audio.DefaultVolume/sources/configured/value"
                }
            ]
            ```

        === "Response"

            ``` { .json , .no-copy }
            {
              "deviceId": "{{device_Id}}",
              "items": {
                "Audio.DefaultVolume": {
                  "value": 50,  // <-- Response Includes New Value for Path
                  "source": "configured",
                  "sources": {
                    "default": {
                      "value": 50,
                      "editability": {
                        "isEditable": false,
                        "reason": "FACTORY_DEFAULT"
                      },
                      "level": "schemaDefault",
                      "enforced": false
                    },
                    "configured": {
                      "value": 50,
                      "editability": {
                        "isEditable": true
                      },
                      "level": "device",
                      "enforced": false
                    }
                  },
                  "valueSpace": {
                    "type": "integer",
                    "maximum": 100,
                    "minimum": 0
                  }
                },
                ["10000+ Line Response..."]
              }
            }
            ```

??? lesson "Lesson: Setting multiple xConfiguration Values in a single Request"

    !!! note

        Setting multiple configuration values can be handled in a single Patch request. The Body starts as an Array, we only need to push more properties into the array

    !!! example "Click the Tabs below to view multiple xConfigurations structured in a single request body"

          === "Single xConfig"

              ``` JSON
              [
                  {
                      "op": "remove",
                      "path": "Child_A.Child_A_Param/sources/configured/value"
                  }
              ]
              ```

          === "2 xConfigs"

              ``` JSON
              [
                  {
                      "op": "remove",
                      "path": "Child_A.Child_A_Param/sources/configured/value"
                  },
                  {
                      "op": "remove",
                      "path": "Child_B.Child_B_Param/sources/configured/value"
                  }
              ]
              ```

          === "3 xConfigs"

              ``` JSON
              [
                  {
                      "op": "remove",
                      "path": "Child_A.Child_A_Param/sources/configured/value"
                  },
                  {
                      "op": "remove",
                      "path": "Child_B.Child_B_Param/sources/configured/value"
                  },
                  {
                      "op": "remove",
                      "path": "Child_B.Child_B_Param/sources/configured/value"
                  }
              ]
              ```



    - **xAPI(s):**
        - xConfiguration Video Input Airplay Mode: On
        - xConfiguration Video Input Airplay Beacon: Auto
    
    - **Task:**

        - Assign the correct value to the `op` object in order to ==Set== a new value for ==each== xAPI above

        - Structure the xAPI above in the path correctly, be sure to end that path with {++/sources/configured/value++}

        - Assign the Values for ==each== xAPI Value above to their `value` object

        - **Hint**: Reference the `2 xConfig` tab above

    ??? Success "View properly formatted URL, Body and Successful Response"

        === "URL"

            <pre><code>https://webexapis.com/v1/deviceConfigurations?deviceId={{device_Id}}</code></pre>

        === "Body"

            ``` JSON
            [
                {
                    "op": "remove",
                    "path": "Audio.DefaultVolume/sources/configured/value"
                }
            ]
            ```

        === "Response"

            ``` { .json , .no-copy }
            {
              "deviceId": "{{device_Id}}",
              "items": {
                "Video.Input.AirPlay.Mode": {
                  "value": "On", // <-- Response Includes New Value for Path
                  "source": "configured",
                  "sources": {
                    "default": {
                      "value": "Off",
                      "editability": {
                        "isEditable": false,
                        "reason": "FACTORY_DEFAULT"
                      },
                      "level": "schemaDefault",
                      "enforced": false
                    },
                    "configured": {
                      "value": "On",
                      "editability": {
                        "isEditable": true
                      },
                      "level": "device",
                      "enforced": false
                    }
                  },
                  "valueSpace": {
                    "enum": [
                      "Off",
                      "On"
                    ],
                    "type": "string"
                  }
                },
                "Video.Input.AirPlay.Beacon": {
                  "value": "Auto", // <-- Response Includes New Value for Path
                  "source": "configured",
                  "sources": {
                    "default": {
                      "value": "Auto",
                      "editability": {
                        "isEditable": false,
                        "reason": "FACTORY_DEFAULT"
                      },
                      "level": "schemaDefault",
                      "enforced": false
                    },
                    "configured": {
                      "value": "Auto",
                      "editability": {
                        "isEditable": true
                      },
                      "level": "device",
                      "enforced": false
                    }
                  },
                  "valueSpace": {
                    "enum": [
                      "Auto",
                      "Off"
                    ],
                    "type": "string"
                  }
                },
                ["10000+ Line Response..."]
              }
            }
            ```

## **Getting xStatuses** ~({{config.cProps.rxp.sectionIds.cloud}}.6)~

??? lesson "Lesson: Getting an xStatus Value"

    !!! example "Click on the tabs to see how Terminal Syntax relates to Cloud xAPI Syntax"

        === "Terminal Syntax"

            <pre><code>x{++Status++} {++Child++} {++Child++}</code></pre>

        === "Cloud xAPI"

            <pre><code>https://webexapis.com/v1/xapi/{++status++}?deviceId={{device_Id}}&name={++Child.Child++}</code></pre>

    - **xAPI:** xStatus Audio Volume
    
    - **Task:**

        - Structure the xAPI Path above in the `URL` of your Postman Request

        - Once the Postman Request has been updated, ==Save== the request, select ==Send== and review the Postman Terminal's repsonse and observe any changes to your device

    ??? Success "View properly formatted URL, Body and Successful Response"

        === "URL"

            <pre><code>https://webexapis.com/v1/xapi/status?deviceId={{device_Id}}&name={++Audio.*++}</code></pre>

        === "Body"

            !!! failure "No Body Required"

        === "Response"

            ``` { .json , .no-copy }
            {
              "deviceId": "{{device_Id}}",
              "result": {
                "Audio": {
                  "Volume": 71
                }
              }
            }

??? lesson "Lesson: Get multiple xStatus Values under a Common Node"

    - **xAPI:** xStatus Audio
    
    - **Task:**

        - Structure the xAPI Path above in the `URL` of your Postman Request

        - Once the Postman Request has been updated, ==Save== the request, select ==Send== and review the Postman Terminal's repsonse and observe any changes to your device

    ??? Success "View properly formatted URL, Body and Successful Response"

        === "URL"

            <pre><code>https://webexapis.com/v1/xapi/status?deviceId={{device_Id}}&name={++Audio.*++}</code></pre>

        === "Body"

            !!! failure "No Body Required"

        === "Response"

            ``` { .json , .no-copy }
            {
              "deviceId": "{{device_Id}}",
              "result": {
                "Audio": {
                  "Devices": {
                    "Bluetooth": {
                      "ActiveProfile": "None"
                    },
                    "HandsetUSB": {
                      "ConnectionStatus": "NotConnected",
                      "Cradle": "OnHook"
                    },
                    "HeadsetUSB": {
                      "ConnectionStatus": "NotConnected",
                      "Description": "",
                      "Manufacturer": ""
                    }
                  },
                  ["500+ Line Response..."].
                }
              }
            }
            ```

## **Subscribing to xConfigurations, xStatuses and xEvents** ~({{config.cProps.rxp.sectionIds.cloud}}.7)~

Subscribing to Cloud xAPI requires us to setup a Workspace Integration

A Workspace Integration is a service you spin up that provides a Webhook, which you take and configure it your Webex Control hub instance.

This is not covered by this lab

<a class="md-button md-button--primary" href="https://developer.webex.com/docs/workspace-integrations" target="_blank" >
  Learn More about Workspace Integrations <i class="fa-solid fa-square-up-right"></i>
</a>

## **Section {{config.cProps.rxp.sectionIds.cloud}} Cleanup** ~({{config.cProps.rxp.sectionIds.cloud}}.8)~

!!! important

    - Press the `Subscription Assistant Button` on your Touch Interface
    - Under the ==Section Cleanup== Page, select the ==Run Section Cleanup?== button
    - Select ==Yes, Run the Cleanup Script==

    <figure markdown="span">
      ![Section cleanup](./assets/general/SubscriptionAssitantMacro-ConfirmCleanup.png){ width="400" }
      <figcaption>Section Cleanup Confirmation</figcaption>
    </figure>

    This will reverse the changes we've made to the endpoint, and leave us ready for the next section

    ??? question "You can run the cleanup via the terminal as well"

        Copy the contents below into your terminal window and run them all at once

        ```shell title="Type into terminal and press Enter"
        xConfig Audio DefaultVolume: 50
        xCommand UserInterface Extensions Panel Remove PanelId: wx1_lab_multilineCommand
        xCommand Video Selfview Set Mode: Off FullscreenMode: Off
        xCommand Video Input SetMainVideoSource ConnectorId: 1
        xCommand Audio Volume SetToDefault Device: Internal
        xCommand HTTPFeedBack Deregister FeedbackSlot: 1 FeedbackSlot: 2 FeedbackSlot: 3 FeedbackSlot: 4
        ```