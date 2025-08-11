{{ config.cProps.devNotice }}
# Access RoomOS xAPI via SSH/Serial ~(section\ {{config.cProps.rxp.sectionIds.ssh}})~
!!! abstract "Section 2.2 Abstract"

    In this section, we'll dive into the various pieces of the xAPI stack and how to make use of them in various ways over an SSH Session to the codec.

    Topics covered for SSH are nearly a 1:1 match for use cases driven via a Serial Connection, whereas Serial requires additional hardware, it will not be covered in depth in this Lab.

    Understanding how to navigate a terminal session with the codec will be instrumental in your customization journey, but it's also a key integration pillar to many products, such as a room control processors, to interface with a Cisco Codec.

## **Establish SSH Connection to Device** ~({{config.cProps.rxp.sectionIds.ssh}}.1)~

- Open the Terminal application on your device
- Connect to the Device via SSH using the built in OpenSSH platform in your terminal window

!!! note inline end

    Replace ``` [USERNAME]``` with your Codec's Username and ``` [IP_ADDRESS]``` with your Codec's IPv4 address that you set in section[X.X.X]

``` shell title="Type into terminal and press Enter"
ssh [USERNAME]@[IP_ADDRESS]
``` 

??? warning "If you encountered an warning running the command above, click here"
    
    If you encounter the following warning

    ``` {.shell, .no-copy}
    ssh [USERNAME]@[IP_ADDRESS]   
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
    Someone could be eavesdropping on you right now (man-in-the-middle attack)!
    It is also possible that a host key has just been changed.
    The fingerprint for the RSA key sent by the remote host is
    SHA256:############################################
    Please contact your system administrator.
    Add correct host key in [PATH]/.ssh/known_hosts to get rid of this message.
    Offending RSA key in [PATH]/.ssh/known_hosts:##
    Host key for [IP_ADDRESS] has changed and you have requested strict checking.
    Host key verification failed.
    ``` 

    Double Check your device information and try again, if the information you entered is correct, try the following

    Then run the following command to clear an old SSH Sha Key
    Be sure to replace ``` [IP_ADDRESS]``` with your Codec's IPv4

    ``` shell title="Type into terminal and press Enter"
    ssh-keygen -R [IP_Address]
    ``` 

    - - -

    If you have a different warning or error and you're unable to resolve it, please ask one of the proctors for assistance

<br>

- The OpenSSH platform will ask for you to confirm the device before connecting
    - Type `yes` when prompted into the terminal, then hit enter
    - Type the ``` [USERNAME]``` account password into the terminal when prompted, then hit enter

!!! success "Successfully connecting to the Codec should prompt the following information and is now awaiting your input"

    ``` {.shell, .no-copy}
    Welcome to  
    Cisco Codec Release RoomOS [Codec_Software_Version]
    SW Release Date: [Codec_Software_ReleaseDate]
    *r Login successful
    OK
    ``` 

## **Navigating the Terminal** ~({{config.cProps.rxp.sectionIds.ssh}}.2)~

!!! abstract

    In a terminal session with a Cisco Codec, you can execute commands, get, set or subscribe to configs, get or subscribe to status information as well as subscribe to events.

    These are especially useful when developing a customization or troubleshooting a system.

    Click to expand each xCommand each below, execute them in your terminal session and observe the responses in the terminal window.
    

???+ lesson "Lesson: Lists All User Command Nodes ~({{config.cProps.rxp.sectionIds.ssh}}.2.1)~"

    ``` shell title="Type into terminal and press Enter"
    ?
    ``` 

    ??? info "Click to Compare your Terminal Output"
        ``` {.shell, .no-copy}
              - User Commands -

        help            xcommand        xconfiguration  xdocument       xevent          
        xfeedback       xgetxml         xpreferences    xstatus         xtransaction    
        bye             echo            log             systemtools     
        OK
        ``` 

        We won't cover every command above, we'll only focus on xConfiguration, xCommand, xStatus and xEvent as those contain all the xAPI reference we need to focus on. But we'll also take a brief stop at xPref as it's important for SSH and Serial based integrations.

        For more information on the rest of those paths, check out the [Offical xAPI Guide](https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-1114/api-reference-guide-roomos-1114.pdf).Page 33 defines all nodes


??? lesson "Lesson: Lists Terminal Preference Option ~({{config.cProps.rxp.sectionIds.ssh}}.2.2)~"

    - Lists Terminal Preference Options
      - The xPreferences command is used to set preferences for the RS-232 and SSH sessions. 

    ``` shell title="Type into terminal and press Enter"
    xpref ?
    ``` 

    
    ??? info "Click to Compare your Terminal Output"
        ``` {.shell, .no-copy}
        xpreferences usage:
          xpreferences outputmode <terminal/xml/json>
        OK
        ```

        Setting ``` xpreferences outputmode``` to JSON will change the terminal response output into a JSON format and likewise with XML

        Why might you consider JSON or XML? 
        
        - Your customization environment may be able to handle responses from the xAPI more efficiently if it's in an output format that easier for your environment to ingest
        - For testing, we'd recommend the terminal format, but when interfacing via a Room Control Processor or another service, you may have tools available to you to parse either JSON or XML to optimize you solution

        ??? example "Compare Output Mode Responses"

            === "Terminal"

                ``` {.shell, .no-copy}
                xpref outputmode terminal

                OK
                xStatus Audio Volume            
                *s Audio Volume: 50
                ** end

                OK
                ``` 

            === "XML"

                ``` {.shell, .no-copy}
                xpref outputmode xml 
                xStatus Audio Volume
                <XmlDoc resultId="">
                <Status>
                  <Audio>
                    <Volume>50</Volume>
                  </Audio>
                </Status>
                </XmlDoc>
                ``` 

            === "JSON"

                ``` {.shell, .no-copy}
                xpref outputmode json    
                xStatus Audio Volume
                {
                  "Status": {
                    "Audio": {
                      "Volume": {
                        "Value": "50"
                      }
                    }
                  }
                }
                ```

??? lesson "Lesson: List Device Command Node References ~({{config.cProps.rxp.sectionIds.ssh}}.2.3)~"

    ``` shell title="Type into terminal and press Enter"
    xCommand ?
    ``` 

    ??? info "Click to Compare your Terminal Output"
        ``` {.shell, .no-copy}
        - User Commands -

        AirPlay          HttpClient       Provisioning     UserInterface    
        Audio            HttpFeedback     Proximity        UserManagement   
        Bookings         Logging          RemoteAccess     UserPresence     
        Call             Macros           RoomCleanup      Video            
        CallHistory      Message          RoomPreset       WebEngine        
        Camera           MicrosoftTeams   Security         Webex            
        Cameras          Network          SerialPort       WebRTC           
        Conference       Peripherals      Standby          Whiteboard       
        Diagnostics      Phonebook        SystemUnit       Zoom             
        Dial             Presentation     Time             

        OK
        ``` 


??? lesson "Lesson: List Device Status Node References ~({{config.cProps.rxp.sectionIds.ssh}}.2.4)~"
    ``` shell title="Type into terminal and press Enter"
    xStatus ?
    ``` 

    ??? info "Click to Compare your Terminal Output"
        ``` {.shell, .no-copy}
        - Status -

        Audio             ICE               Proximity         Time              
        Bookings          Logging           RemoteAccess      UserInterface     
        Call              MediaChannels     RoomAnalytics     Video             
        Cameras           MicrosoftTeams    RoomPreset        WebEngine         
        Capabilities      Network           SIP               Webex             
        Conference        NetworkServices   Standby           WebRTC            
        Diagnostics       Peripherals       SystemUnit        
        HttpFeedback      Provisioning      ThousandEyes      

        OK
        ```

??? lesson "Lesson: List Device Config Node References ~({{config.cProps.rxp.sectionIds.ssh}}.2.5)~"
    ``` shell title="Type into terminal and press Enter"
    xConfiguration ?
    ``` 

    ??? info Click to Compare your Terminal Output
        ``` {.shell, .no-copy}
        - User Configurations -

        Apps              Logging           RoomAnalytics     ThousandEyes      
        Audio             Macros            RoomCleanup       Time              
        Bookings          MicrosoftTeams    RoomScheduler     UserInterface     
        CallHistory       Network           RTP               UserManagement    
        Cameras           NetworkServices   Security          Video             
        Conference        Peripherals       Sensors           VoiceControl      
        FacilityService   Phonebook         SerialPort        WebEngine         
        Files             Provisioning      SIP               Webex             
        HttpClient        Proximity         Standby           WebRTC            
        HttpFeedback      RemoteAccess      SystemUnit        Zoom              

        OK
        ``` 


??? lesson "Lesson: List Device Event Node References ~({{config.cProps.rxp.sectionIds.ssh}}.2.6)~"
    ``` shell title="Type into terminal and press Enter"
    xEvent ?
    ``` 

    ??? info "Click to Compare your Terminal Output"
        ``` {.shell, .no-copy}
        xEvent ?
        ** end

        OK
        ``` 

    ??? curious ":thinking: The output of `xEvent ?` was not what you expected?"

          Try Removing the `?` from `xEvent` and re-run the command

          ``` shell title="Type into terminal and press Enter"
          xEvent
          ``` 

          ??? info "Click to Compare your Terminal Output"
              ``` {.shell, .no-copy}
              xEvent  
              *es Event Audio Input Connectors Ethernet SubId LoudspeakerActivity
              *es Event Audio Input Connectors Ethernet SubId NoiseLevel
              *es Event Audio Input Connectors Ethernet SubId PPMeter
              *es Event Audio Input Connectors Ethernet SubId VuMeter
              *es Event Audio Input Connectors HDMI Left PPMeter
              *es Event Audio Input Connectors HDMI Left VuMeter
              *es Event Audio Input Connectors HDMI Right PPMeter
              *es Event Audio Input Connectors HDMI Right VuMeter
              *es Event Audio Input Connectors Line PPMeter
              *es Event Audio Input Connectors Line VuMeter
              [... And the list goes on]
              OK
              ``` 

??? lesson "Lesson: Search for an xAPI using a Wildcard `//` ~({{config.cProps.rxp.sectionIds.ssh}}.2.7)~"
    ``` shell title="Type into terminal and press Enter"
    xConfig // Name ?
    ``` 

    ??? info "Click to Compare your Terminal Output"
        ``` {.shell, .no-copy}
        xConfig // Name ?
        *? xConfiguration FacilityService Service[1] Name: <S: 0, 1024>
        *? xConfiguration FacilityService Service[2] Name: <S: 0, 1024>
        *? xConfiguration FacilityService Service[3] Name: <S: 0, 1024>
        *? xConfiguration FacilityService Service[4] Name: <S: 0, 1024>
        *? xConfiguration FacilityService Service[5] Name: <S: 0, 1024>
        *? xConfiguration Network[1] DNS Domain Name: <S: 0, 64>
        *? xConfiguration SystemUnit Name: <S: 0, 50>
        *? xConfiguration UserInterface NameAndSiteLabels Mode: <Auto, Hidden>
        *? xConfiguration UserInterface Theme Name: <Auto, Light, Night>
        *? xConfiguration Video Input Connector[1] Name: <S: 0, 50>
        *? xConfiguration Video Input Connector[2] Name: <S: 0, 50>
        *? xConfiguration Video Input Connector[3] Name: <S: 0, 50>
        *? xConfiguration Video Input Connector[4] Name: <S: 0, 50>

        OK
        ``` 

## **Executing Commands** ~({{config.cProps.rxp.sectionIds.ssh}}.3)~

!!! abstract "xCommands"

    Commands instruct the device to execute actions, such as to dial a number or to search the phone book. All commands start with the prefix xCommand followed by a command path

    Click to expand each xCommand example below, execute them in your terminal session and observe the responses in the terminal window as well as observe what happens to the Codec after each execution


???+ lesson "Lesson: Execute an xCommand ~({{config.cProps.rxp.sectionIds.ssh}}.3.1)~"

    - **xAPI**: xCommand Video Selfview Set

    - **Task**:

        ``` shell title="Type into terminal and press Enter"
        xCommand Video Selfview Set Mode: On FullscreenMode: On OnMonitorRole: First
        ```

        - Observe the change to your Codec's Display, you should see your camera feed in Full Screen
            
            - If Not, make sure your device's camera cover is not closed

        ``` shell title="Type into terminal and press Enter"
        xCommand Video Selfview Set Mode: On FullscreenMode: Off
        ```

        - Observe the change to your Codec's Display, you should see your camera feed in a PIP Window

    ??? tip "Additional Info"

        Notice when we set the Mode parameter ==**On**== we included the FullScreenMode and OnMonitorRole parameters, but when we decided to turn ==**Off**== selfview, we left out those parameters. know that not all parameters in any given command are required, but some are needed.

    As you explore the API, feel free to click on the {++RoomOS.Cisco.Com++} link in each example to Learn more about the xAPI you're working with.

    <a class="md-button md-button--primary" href="https://roomos.cisco.com/xapi/Command.Video.Selfview.Set/" target="_blank" >
      Learn more about <strong>xCommand Video Selfview Set</strong> <i class="fa-solid fa-square-up-right"></i>
    </a>



??? lesson "Lesson: Execute an xCommand with multiple arguments with the same name ~({{config.cProps.rxp.sectionIds.ssh}}.3.2)~"

    - **xAPI(s)**:

        - xCommand Video Selfview Set
        - xCommand Video Input SetMainVideoSource
    
    - **Task**:

        ``` shell title="Type into terminal and press Enter"
        xCommand Video Selfview Set Mode: On FullscreenMode: On
        ```

        ``` shell title="Type into terminal and press Enter"
        xCommand Video Input SetMainVideoSource ConnectorId: 1 ConnectorId: 1
        ```

        - Observe the change to your Codec's Display, you should see 2 instances of your camera feed spread equally in FullScreen

        ??? tip "Additional Info"

            xCommand Video Input SetMainVideoSource, an other xAPIs like it offer some parameters that allow you to enter multiple times. Notice how we used ==ConnectorId: 1== twice. This will create a 2x1 composition of your first video input connector and set this as your ==Main Source==. This will effect selfview and what you output on the far end of the call.

            Though it's **==NOT==** practical to send a duplicated camera source as we are now, this xAPI and how it's executed serves as an example of what's possible to do with larger Cisco Codecs that host multiple cameras connected to it.

        ??? success "View Successful OSD Output"

            <figure markdown>
              ![Official API Doc](./assets/wx1_1451_part_2/2-2-3_SetMain-2xEqual.png){ width="400" }
            </figure>

        ``` shell title="Type into terminal and press Enter"
        xCommand Video Input SetMainVideoSource ConnectorId: 1 ConnectorId: 1 Layout: PIP
        ```

        - Observe the change to your Codec's Display, you should see 2 instances of your camera feed, 1 FullScreen and another in a PiP window

        ??? success "View Successful OSD Output"

            Successful execution of this command, with {++PIP++} set at the ==Layout==, will look similar to image below

            <figure markdown>
              ![Official API Doc](./assets/wx1_1451_part_2/2-2-3_SetMain-2xPIP.png){ width="400" }
            </figure>

        ??? tip "Additional Info"

            xCommand Video Input SetMainVideoSource has more than one parameter we can use to alter the composition in our main source. By default, the ==Layout== parameter is set to a value of ==Equal==, but we could opt for {++PIP++} or {++Prominent++} as ==Layout== values as well.

        - Lets wrap up by setting your MainSource back to a single connector and disable Selfview

        ``` shell title="Type into terminal and press Enter"
        xCommand Video Input SetMainVideoSource ConnectorId: 1
        ```

        ``` shell title="Type into terminal and press Enter"
        xCommand Video Selfview Set Mode: Off
        ```

        - Observe the change to your Codec's Display, your selfview should be gone now

    <a class="md-button md-button--primary" href="https://roomos.cisco.com/xapi/Command.Video.Input.SetMainVideoSource/" target="_blank" >
          Learn more about <strong>xCommand Video Input SetMainVideoSource</strong> <i class="fa-solid fa-square-up-right"></i>
    </a>

??? lesson "Lesson: Execute an xCommand with a multiline argument  ~({{config.cProps.rxp.sectionIds.ssh}}.3.3)~"

    !!! info
        Some commands require a larger body of data. This data is a large string; some written in a variety of formats dictated by the command used

        When working in a terminal window, these multiline commands are structure as such

        !!! example ""

            === "Structure"

                ``` {.shell, .no-copy}
                [Command Path]
                [Multi Line Content]
                .
                ```
            
            === "xAPI Example"

                ``` {.shell, .no-copy}
                xCommand Macros Macro Save Name: Test
                import xapi from 'xapi';

                console.log('Hello World');
                .
                ```

            !!! Note

                The command should be terminated with a dot ==.== on the third line to indicate the command is complete

    - **xAPI**: xCommand UserInterface Extensions Panel Save

    - **Task**:

        ```shell title="Type into terminal and press Enter"
        xCommand UserInterface Extensions Panel Save PanelId: wx1_lab_multilineCommand
        <Extensions><Panel><Order>1</Order><PanelId>wx1_lab_multilineCommand</PanelId><Location>HomeScreen</Location><Icon>Info</Icon><Color>#1170CF</Color><Name>MultiLine Command [Section 2.2.3]</Name><ActivityType>Custom</ActivityType></Panel></Extensions>
        .
        ```
    
    - Observe the change to your Codec's Display, you should see a new Panel Button labeled `MultiLine Command [Section 2.2.3]` on your Touch Control interface

    ??? success "View Successful OSD output"
        <figure markdown>
          ![Official API Doc](./assets/wx1_1451_part_2/2-2-3_UI-Panel-Save.png){ width="600" }
        </figure>

??? lesson "Lesson: Execute an xCommand which generates data and responds  ~({{config.cProps.rxp.sectionIds.ssh}}.3.4)~"
    !!! info
        Some commands will generate data and output a response of that data. All commands will respond with either "OK" or "Error" but some commands can provide data.


    - **xAPI**: xCommand Extensions List

    - **Task**:

        ``` shell title="Type into terminal and press Enter"
        xCommand UserInterface Extensions List ActivityType: Custom
        ```
      
      - Observe your Terminal Window's output, you should see details of both the `MultiLine Command [Section 2.2.3]` panel you loaded in previously as well as the `Subscription Assistant` panel details

    ??? success "Click to Compare your Terminal Output"
        ``` {.shell, .no-copy}
        OK
        *r ExtensionsListResult (status=OK): 
        *r ExtensionsListResult Extensions Version: "1.11"
        *r ExtensionsListResult Extensions Panel 1 Icon: Custom
        *r ExtensionsListResult Extensions Panel 1 Location: HomeScreenAndCallControls
        *r ExtensionsListResult Extensions Panel 1 ActivityType: Custom
        *r ExtensionsListResult Extensions Panel 1 Name: "Subscription Assistant [Lab 1451]"
        *r ExtensionsListResult Extensions Panel 1 PanelId: "wx1_1451_pt2_labBuddy"
        *r ExtensionsListResult Extensions Panel 1 Origin: local
        *r ExtensionsListResult Extensions Panel 1 Order: 99
        [...]
        *r ExtensionsListResult Extensions Panel 2 Icon: Info
        *r ExtensionsListResult Extensions Panel 2 Location: HomeScreen
        *r ExtensionsListResult Extensions Panel 2 ActivityType: Custom
        *r ExtensionsListResult Extensions Panel 2 Name: "MultiLine Command [Section 2.2.3]"
        *r ExtensionsListResult Extensions Panel 2 PanelId: "wx1_lab_multilineCommand"
        *r ExtensionsListResult Extensions Panel 2 Origin: local
        *r ExtensionsListResult Extensions Panel 2 Order: 1
        *r ExtensionsListResult Extensions Panel 2 Color: "#1170CF"
        *r ExtensionsListResult Extensions Panel 2 Visibility: Auto
        ```

## **Getting, Setting and Subscribing to xConfigurations** ~({{config.cProps.rxp.sectionIds.ssh}}.4)~

!!! abstract "xConfigurations"
    Configurations are device settings that are persistent across boots. Like commands, also configurations are structured in a hierarchy

    Click to expand each xConfiguration example below, execute them in your terminal session and observe the responses in the terminal window

???+ lesson "Lesson: Getting an xConfiguration Value ~({{config.cProps.rxp.sectionIds.ssh}}.4.1)~"

    - **xAPI**: xConfiguration Audio DefaultVolume

    - **Task**: 

        ```shell title="Type into terminal and press Enter"
        xConfig Audio DefaultVolume
        ```
        
        - Observe your Terminal Window's output, you should see the value for your Audio DefaultVolume

        ??? info "Click to Compare your Terminal Output"
            ``` {.shell, .no-copy}
            *c xConfiguration Audio DefaultVolume: 50
            ** end

            OK
            ```

??? lesson "Lesson: Set a new xConfiguration Value ~({{config.cProps.rxp.sectionIds.ssh}}.4.2)~"

    - **xAPI**: xConfiguration Audio DefaultVolume

    - **Task**: 

        ```shell title="Type into terminal and press Enter"
        xConfig Audio DefaultVolume: 75
        ```

        - Observe your terminal output and review the response

        ??? info "Click to Compare your Terminal Output"
            ``` {.shell, .no-copy}
            ** end

            OK
            ```

        - Now that we've set the default volume to 75, let's double check our work by getting that value one more time

        ```shell title="Type into terminal and press Enter"
        xConfig Audio DefaultVolume
        ```
        
        ??? info "Click to Compare your Terminal Output"
            ``` {.shell, .no-copy}
            *c xConfiguration Audio DefaultVolume: 75
            ** end

            OK
            ```
    
    !!! note

        The ==getting== and ==setting== of an xConfiguration only differs slightly when accessing via a terminal.

        Click on the tabs below to see the differences side by side

        !!! blank ""

            === "Get xConfiguration"

                xConfiguration Audio DefaultVolume

            === "Set xConfiguration"

                xConfiguration Audio DefaultVolume{++: 75++}

??? lesson "Lesson: Get multiple xConfiguration Values under a Common Node ~({{config.cProps.rxp.sectionIds.ssh}}.4.3)~"

    !!! info

        In many cases, you may want to pull information in bulk. We can do this easily by moving running an xConfig get request on ==Higher Common Node== in the xAPI path

        !!! curious "What do we mean by `Higher Common Node`"

            Click on the tabs below, to see how we'll change our requests by accessing a `Higher Common Node` on each level of an xAPI Path

            === "Full xAPI Path"

                {++xConfig Bluetooth Allowed++}

            === "Next Higher Common Node"

                {++xConfig Bluetooth++} {--Allowed--}

            === "Highest Common Node"

                {++xConfig++} {--Bluetooth Allowed--}

            === "View Visual Diagram"

                !!! Note

                    This Diagram only show a very small subset of our xAPI. We have hundreds of xAPI to explore :smiley:


                ``` mermaid
                flowchart TD
                  xAPI --> |Highest Common Node| A
                  A[xConfiguration] -->|Next Node| B(Audio)
                  B --> bb(Default Volume)
                  B --> bc(Input)
                  B --> ba(...)
                  bc --> bd(...)
                  A --> |Next Node| C(Network)
                  C --> CC(IPv4)
                  CC --> CCC(Address)
                  CC --> CCD(Gateway)
                  CC --> CCE(...)
                  A --> |Next Node| D(UserInterface)
                  D --> DD(Message)
                  D --> DF(Extensions)
                  D --> DG(...)
                  DD --> DDE(...)
                  DF --> DDF(...)
                  C --> CD(...) 
                  A --> |Next Node| E(Video)
                  E --> EE(Input)
                  EE --> EEE(...)
                  E --> EF(Output)
                  EF --> EEF(...)
                  E --> EG(...)
                  A --> |Nodes Continued| F(...)
                ```
    
    - **xAPI**: xConfig Audio

    - **Task**: 
    
        ```shell title="Type into terminal and press Enter"
        xConfig Audio
        ```

        - Observe your terminal output and review the response

    ??? info "Click to Compare your Terminal Output"
        ``` {.shell, .no-copy}
        *c xConfiguration Audio Input Value: 75
        *c xConfiguration Audio Input HDMI 1 Level: -5
        *c xConfiguration Audio Input HDMI 1 Mode: On
        *c xConfiguration Audio Input HDMI 1 VideoAssociation MuteOnInactiveVideo: On
        *c xConfiguration Audio Input Microphone 1 Mode: On
        *c xConfiguration Audio Input MicrophoneMode: Focused
        *c xConfiguration Audio Input USBC 1 Level: -5
        *c xConfiguration Audio Input USBC 1 Mode: On
        *c xConfiguration Audio Input USBC 1 VideoAssociation MuteOnInactiveVideo: On
        *c xConfiguration Audio Input USBMicrophone 1 EchoControl Mode: On
        *c xConfiguration Audio Input USBMicrophone 1 Level: 5
        *c xConfiguration Audio Input USBMicrophone 1 Zone: 1
        *c xConfiguration Audio Microphones Mute Enabled: True
        *c xConfiguration Audio Microphones NoiseRemoval Mode: Enabled
        *c xConfiguration Audio Microphones UsbPassthrough MuteButton: Inactive
        *c xConfiguration Audio Microphones VoiceActivityDetector Mode: Off
        *c xConfiguration Audio Output InternalSpeaker Mode: On
        *c xConfiguration Audio Panning HeadsetAnalog BinauralProcessing: True
        *c xConfiguration Audio Panning HeadsetAnalog Mode: Auto
        *c xConfiguration Audio Panning HeadsetUSB BinauralProcessing: False
        *c xConfiguration Audio Panning HeadsetUSB Mode: Auto
        *c xConfiguration Audio Panning Mode: Auto
        *c xConfiguration Audio SoundsAndAlerts RingTone: "Sunrise"
        *c xConfiguration Audio SoundsAndAlerts RingVolume: 0
        *c xConfiguration Audio USB Mode: SpeakerAndMicrophone
        *c xConfiguration Audio USB VolumeControl Capture Mode: Bypass
        *c xConfiguration Audio USB VolumeControl Capture Value: 0
        *c xConfiguration Audio USB VolumeControl Playback Mode: Bypass
        *c xConfiguration Audio USB VolumeControl Playback Value: 0
        *c xConfiguration Audio Ultrasound MaxVolume: 70
        ** end
        ```

        By simply removing ==DefaultVolume== from ==xConfiguration Audio== {--DefaultVolume--}, we get all of the Configurations listed under the Audio Node of the Codec

??? lesson "Lesson: Subscribing to an xConfiguration  ~({{config.cProps.rxp.sectionIds.ssh}}.4.4)~"
    
    ???+ curious ":thinking: What do we mean by Subscribe?"

        A subscription, or feedback registration, is a means to monitor changes to any xConfiguration, xStatus or xEvent

        This allows you see those changes as they occur and, more importantly, react off of those changes and automate a process without needing to constantly poll for that value

    - **xAPI:** xConfiguration Audio DefaultVolume

    - **Task**: 

        ```shell title="Type into terminal and press Enter"
            xFeedback Register Configuration/Audio/DefaultVolume
        ```

        - Press the `Subscription Assistant Button` on your Touch Interface
            - Under the xConfigurations Page, move the Slider labeled ==Audio DefaultVolume== to a new position and release
            - Observe your {++Terminal Windows++} output, you should see events for your Subscription fill the {++Terminal Window++}
                - ==Optional==: Move the slider a few more times to see more changes come in


        ??? gif "Click to Compare your Terminal Output"

            <figure markdown>
              ![Official API Doc](./assets/wx1_1451_part_2/2-2-4_xConfig-Subscribe-DefaultVolume.gif){ width="600" }
            </figure>

        ??? gif "View Subscription Assistant Operation"
            
            <figure markdown>
              ![SubAssist Operation](./assets/general/SubscriptionAssitantMacro-Operation.gif){ width="600" }
            </figure>

??? lesson "Lesson: Unsubscribing from an xConfiguration  ~({{config.cProps.rxp.sectionIds.ssh}}.4.5)~"

    Just as we can subscribe to information on the endpoint, we can unsubscribe from that same information

    ??? curious ":thinking: Why bother with Unsubscribing?"

        You can only run up to 50 subscriptions (feedback registrations) on a device

        Documented on page 40 of the <a href="https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-1114/api-reference-guide-roomos-1114.pdf" target="_blank">Official xAPI Guide</a>

        So as your solutions grow, managing your subscriptions are important. 

        Subscribing to a Higher Common Node, doesn't count towards multiple subscriptions and can allow you to get more data, with less active subscriptions

    - **xAPI**: xConfiguration Audio DefaultVolume

    - **Task**: 

        ```shell title="Type into terminal and press Enter"
        xFeedback Deregister Configuration/Audio/DefaultVolume
        ```

        - Press the `Subscription Assistant Button` on your Touch Interface
            - Under the xConfigurations Page, move the Slider labeled ==Audio DefaultVolume== to a new position and release
            - Observe your {++Terminal Windows++} output, those responses you saw in the previous lesson should have stopped outputting in your {++Terminal Window++}
                - ==Optional==: Move the slider a few more times to verify

??? lesson "Lesson: Subscribe to Multiple xConfigurations under a Common Node  ~({{config.cProps.rxp.sectionIds.ssh}}.4.6)~"

    !!! info

        Similarly to Getting multiple xConfiguration Values, we can subscribe to multiple values under a Higher Common Node

        This can reduce the number of active subscriptions you consume on a device and simplify your solution should you need to react to changes of information across multiple configurations under a Common Node

        !!! example ""

            Click on the tabs below, to see how we'll change our requests by accessing a `Higher Common Node` on each level of an xAPI Path

            === "Full xAPI Path"

                xFeedback Register {++Configuration/Bluetooth/Allowed++}

            === "Next Higher Common Node"

                xFeedback Register {++Configuration/Bluetooth++}{--/Allowed--}

            === "Highest Common Node"

                xFeedback Register {++Configuration++}{--/Bluetooth/Allowed--}

    - **xAPI**: xConfiguration Audio Input Airplay

    - **Task**: 

        ```shell title="Type into terminal and press Enter"
        xFeedback Register Configuration/Video/Input/AirPlay
        ```

        - Press the `Subscription Assistant Button` on your Touch Interface
            - Under the xConfigurations Page, press the toggles and buttons in the ==Airplay== row
            - Observe your {++Terminal Windows++} output, you should see events for your Subscription fill the {++Terminal Window++}
                - ==Optional==: Press those buttons and switches a few times to see more changes come in

        ??? gif "Click to Compare your Terminal Output"

            <figure markdown>
              ![Official API Doc](./assets/wx1_1451_part_2/2-2-4_xConfig-Subscribe-Airplay.gif){ width="600" }
            </figure>

        ??? gif "View Subscription Assistant Operation"
            
            <figure markdown>
              ![SubAssist Operation](./assets/general/SubscriptionAssitantMacro-Operation.gif){ width="600" }
            </figure>


??? lesson "Lesson: Unsubscribe to Multiple xConfigurations under a Higher Common Node  ~({{config.cProps.rxp.sectionIds.ssh}}.4.7)~"

    - **xAPI**: xConfiguration Audio Input Airplay

    - **Task**: 

        ```shell title="Type into terminal and press Enter"
        xFeedback Deregister Configuration/Video/Input/AirPlay
        ```

        - Press the `Subscription Assistant Button` on your Touch Interface
            - Under the xConfigurations Page, press the toggles and buttons in the ==Airplay== row
            - Observe your {++Terminal Windows++} output, those responses you saw in the previous lesson should have stopped outputting in your {++Terminal Window++}
                - ==Optional==: Press those buttons and switches a few times to see more changes come in

    !!! Tip

        In cases where you have multiple subscriptions, you can unsubscribe from all by running

        ```shell title="Type into terminal and press Enter"
        xFeedback DeregisterAll
        ```

## **Setting and Subscribing to Status** ~({{config.cProps.rxp.sectionIds.ssh}}.5)~

!!! abstract "xStatuses"
    Statuses contain information about the current state of the device, such as connected calls, the status of the gatekeeper registration, connected inputs and output sources.

    Many of the same techniques we reviewed under section 2.2.4 will apply to section 2.2.5

    Be sure to complete section 2.2.4, as many pieces of additional context were covered there, and won't be repeated moving forward

    Click to expand each xStatus example below, execute them in your terminal session and observe the responses in the terminal window

???+ lesson "Lesson: Getting an xStatus Value ~({{config.cProps.rxp.sectionIds.ssh}}.5.1)~"

    - **xAPI**: xStatus Audio Volume

    - **Task**: 

        ```shell title="Type into terminal and press Enter"
        xStatus Audio Volume
        ```

        - Observe your terminal output and review the response

        ??? info "Click to Compare your Terminal Output"
            ``` {.shell, .no-copy}
            *s Audio Volume: 65
            ** end
            ```

??? lesson "Lesson: Get multiple xStatus Values under a Common Node ~({{config.cProps.rxp.sectionIds.ssh}}.5.2)~"

    - **xAPI**: xStatus Audio Input

    - **Task**: 

        ```shell title="Type into terminal and press Enter"
        xStatus Audio Input
        ```

        - Observe your terminal output and review the response

    ??? info "Click to Compare your Terminal Output"
        ``` {.shell, .no-copy}
        [PLACEHOLDER - LUIS OUTPUT]
        ```

??? lesson "Lesson: Subscribing to an xStatus ~({{config.cProps.rxp.sectionIds.ssh}}.5.3)~"

    - **xAPI**: xStatus Audio Volume

    - **Task**:

        ```shell title="Type into terminal and press Enter"
        xFeedback Register Status/Audio/Volume
        ```

        - Press the `Subscription Assistant Button` on your Touch Interface
            - Under the xStatuses Page, move the Slider labeled ==Adjust Volume,== to a new position and release
                - Alternatively, you can adjust the volume with the Codec's native volume control buttons
            - Observe your {++Terminal Windows++} output, you should see events for your Subscription fill the {++Terminal Window++}
                - ==Optional==: Move the slider a few more times to see more changes come in

        ??? gif "Click to Compare your Terminal Output"

            <figure markdown>
              ![xStatus Audio Volume Subscription Output Gif](./assets/wx1_1451_part_2/2-2-4_xStatus-Subscribe-Volume.gif){ width="600" }
            </figure>
      
        ??? gif "View Subscription Assistant Operation"
            
            <figure markdown>
              ![SubAssist Operation](./assets/general/SubscriptionAssitantMacro-Operation.gif){ width="600" }
            </figure>

??? lesson "Lesson: Unsubscribing to an xStatus  ~({{config.cProps.rxp.sectionIds.ssh}}.5.4)~"

    - **xAPI**: xStatus Audio Input

    - **Task**:

        ```shell title="Type into terminal and press Enter"
        xFeedback Deregister Status/Audio/Volume
        ```

        - Press the `Subscription Assistant Button` on your Touch Interface
            - Under the xStatuses Page, move the Slider labeled ==Adjust Volume,== to a new position and release
                - Alternatively, you can adjust the volume with the Codec's native volume control buttons
            - Observe your {++Terminal Windows++} output, those responses you saw in the previous lesson should have stopped outputting in your {++Terminal Window++}
                - ==Optional==: Move the slider a few more times to see more changes come in

??? lesson "Lesson: Subscribe to Multiple xStatuses under a Common Node ~({{config.cProps.rxp.sectionIds.ssh}}.5.5)~"

    - **xAPI**: xStatus Cameras Camera [N] Position

    - **Task**:

        ``` title="Type into terminal and press Enter"
        xFeedback Register Status/Cameras/Camera/Position
        ```

        ??? curious "What happened to the `[N]` in the xAPI Path?"

            You may have noticed we never declared `[N]` in the xAPI Path for the command we ran. This was left out on purpose. `[N]` corresponds to the ==CameraId== you want to target. Some Codecs can control up 7 cameras, so these xAPI paths branch per connected Camera

            Whereas you could be running this lab on a variety of Codec's, it's better to leave this out for Lab Purposes, but also has value in a multi-camera system, allowing us to subscribe to ALL camera's positions as they change :smiley:

        - Press the `Subscription Assistant Button` on your Touch Interface
            - Under the xStatuses Page, click the button in the ==Camera Control Wheel== row
                - Alternatively, you can adjust your cameras position through the native camera control interface
            - Observe your {++Terminal Windows++} output, you should see events for your Subscription fill the {++Terminal Window++}
                - ==Optional==: Continue pressing buttons to see more changes come in

        ???+ gif "Click on the tabs below to"

            === "Compare Terminal"

                <figure markdown>
                  ![xStatus Cameras Camera[N] Position Output Gif](./assets/wx1_1451_part_2/2-2-4_xStatus-Subscribe-CameraPosition.gif){ width="600" }
                </figure>

            === "View Subscription Assistant"
                
                <figure markdown>
                  ![SubAssist Operation](./assets/general/SubscriptionAssitantMacro-Operation.gif){ width="600" }
                </figure>

            === "View Native Camera Control Interface"

                <figure markdown>
                  ![Navigate to Camera Control Menu GIF](./assets/wx1_1451_part_2/2-2-4_CameraMenuAccess.gif){ width="600" }
                </figure>

??? lesson "Lesson: Unsubscribe from all xStatuses ~({{config.cProps.rxp.sectionIds.ssh}}.5.6)~"

    - **xAPI**: N/A

    - **Task**: 

        ```shell title="Type into terminal and press Enter"
            xFeedback DeregisterAll
        ```

        - Press the `Subscription Assistant Button` on your Touch Interface
            - Under the xStatuses Page, click the button in the ==Camera Control Wheel== row
                - Alternatively, you can adjust your cameras position through the native camera control interface
            - Observe your {++Terminal Windows++} output, those responses you saw in the previous lesson should have stopped outputting in your {++Terminal Window++}
                - ==Optional==: Continue pressing buttons to see more changes come in

## **Subscribing to Events** ~({{config.cProps.rxp.sectionIds.ssh}}.6)~

!!! Abstract "xEvents"

    Event returns information about the events that are available for feedback. 

    Click to expand each xEvent example below, execute them in your terminal session and observe the responses in the terminal window

???+ lesson "Lesson: Subscribing to an xEvent ~({{config.cProps.rxp.sectionIds.ssh}}.6.1)~"

    - **xAPI**: xEvent UserInterface Message Prompt Response

    - **Task**: 

        ```shell title="Type into terminal and press Enter"
        xFeedback Register Event/UserInterface/Message/Prompt/Response
        ```

        - Press the `Subscription Assistant Button` on your Touch Interface
            - Under the xEvents Page, click the {++Prompt Button++} in the ==UserInterface Message== row
                - This will create a Pop Up with 5 options
                - Click on any of these 5 Options
            - Observe your {++Terminal Windows++} output, you should see events for your Subscription fill the {++Terminal Window++}
                - ==Optional==: Try each of the options under `Prompt` and continue to observe your {++Terminal Windows++}
            - Press click either the `TextInput`, the `Rating` or the `Alert` button and submit any accompanying actions in that interface
            - Observe your {++Terminal Windows++} output, you should see events for your Subscription fill the {++Terminal Window++}
                - Responses for `TextInput`, `Rating` or `Alert` shouldn't show since you're currently only subscribed to `Prompt`
    
        ??? gif "Click to Compare your Terminal Output"

            <figure markdown>
              ![xEvent UserInterface ScreenShotRequest RequestId Output Gif](./assets/wx1_1451_part_2/2-2-4_xEvent-Subscribe-Prompt.gif){ width="600" }
            </figure>
        
        ??? gif "View Subscription Assistant Operation"
                
            <figure markdown>
              ![SubAssist Operation](./assets/general/SubscriptionAssitantMacro-Operation.gif){ width="600" }
            </figure>


??? lesson "Lesson: Unsubscribing to an xEvent ~({{config.cProps.rxp.sectionIds.ssh}}.6.2)~"

    - **xAPI**: xEvent UserInterface Message Prompt Response

    - **Task**: 

        ```shell title="Type into terminal and press Enter"
        xFeedback Deregister Event/UserInterface/ScreenShotRequest/RequestId
        ```

        - Press the `Subscription Assistant Button` on your Touch Interface
            - Under the xEvents Page, click either the `Prompt`, the `TextInput`, the `Rating` or the `Alert` button in the ==UserInterface Message== row and submit any accompanying actions in that interface
            - Observe your {++Terminal Windows++} output, those responses you saw in the previous lesson should have stopped outputting in your {++Terminal Window++}

??? lesson "Lesson: Subscribe to Multiple xEvents under a Common Node ~({{config.cProps.rxp.sectionIds.ssh}}.6.3)~"

    - **xAPI**: xEvent UserInterface

    !!! note inline end

        By Subscribing to a High Common Node, such as xEvent UserInterface, we can see all UI related Events available in that xAPI Node

    - **Task**: 

        ```shell title="Type into terminal and press Enter"
        xFeedback Register Event/UserInterface
        ```

        - Press the `Subscription Assistant Button` on your Touch Interface
            - Under the xEvents Page, try any of the `Widgets` on this page, and submit any accompanying actions in that interface if any
            - Observe your {++Terminal Windows++} output, you should see events for your Subscription fill the {++Terminal Window++}
                - ==Optional==: Try all of the `Widget` on that page :smiley:
    
        ??? gif "Click to Compare your Terminal Output"

            <figure markdown>
              ![xEvent UserInterface Output Gif](./assets/wx1_1451_part_2/2-2-4_xEvent-Subscribe-UserInterface.gif){ width="600" }
            </figure>

        ??? gif "View Subscription Assistant Operation"
            
            <figure markdown>
              ![SubAssist Operation](./assets/general/SubscriptionAssitantMacro-Operation.gif){ width="600" }
            </figure>

??? lesson "Lesson: Unsubscribe from all xEvents ~({{config.cProps.rxp.sectionIds.ssh}}.6.4)~"

    - **xAPI**: N/A

    - **Task**: 

        ```shell title="Type into terminal and press Enter"
            xFeedback DeregisterAll
        ```

        - Press the `Subscription Assistant Button` on your Touch Interface
            - Under the xEvents Page, try any of the `Widgets` on this page, and submit any accompanying actions in that interface if any
            - Observe your {++Terminal Windows++} output, those responses you saw in the previous lesson should have stopped outputting in your {++Terminal Window++}
                - ==Optional==: Continue pressing buttons to see more changes come in

## **Tagging your xAPI Calls** ~({{config.cProps.rxp.sectionIds.ssh}}.7)~

As you work to build your automation in a SSH or Serial terminal session, you may find yourself making multiple calls against the same path and the timing of that output may be critical of your solution.

To help simplify which data belongs where, you can tag your xAPI paths with a custom value to better track your work.

By appending `|resultId="myValue"` to the end of any xAPI Call, the response from that xAPI will include that resultId you assign

!!! example "Review Tagging examples below"

    === "xStatus Audio Volume"

        ``` shell
        xStatus Audio Volume |resultId="Custom Value 1"
        *s Audio Volume: 50
        ** resultId: "Custom Value 1"
        ** end
        ```
    
    === "xCommand Video Selfview Set"

        ``` shell
        xCommand Video Selfview Set Mode: On |resultId="Custom Value 2"

        OK
        *r SelfviewSetResult (status=OK): 
        ** resultId: "Custom Value 2"
        ** end
        ```
    
    === "xConfiguration SystemUnit Name"

        ``` shell
        xConfiguration SystemUnit Name |resultId="Custom Value 3"
        *c xConfiguration SystemUnit Name: " "
        ** resultId: "Custom Value 3"
        ** end

        OK
        ```

    === "xFeedback Register Event/CallSuccessful"

        !!! note

            When declaring xFeedback, or subscribing to any xAPI, the resultId will only print when you execute the command, but will not print with the subsequent data coming in from the subscription

        ``` shell
        xFeedback Register Event/CallSuccessful |resultId="Custom Value 4"
        ** resultId: "Custom Value 4"
        ** end

        OK
        *e CallSuccessful Protocol: "Spark"
        *e CallSuccessful Direction: "outgoing"
        *e CallSuccessful RemoteURI: "spark:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
        *e CallSuccessful EncryptionIn: "On"
        *e CallSuccessful EncryptionOut: "On"
        *e CallSuccessful CallRate: 20000
        *e CallSuccessful CallId: 3
        ** end
        *e CallSuccessful Protocol: "Spark"
        *e CallSuccessful Direction: "outgoing"
        *e CallSuccessful RemoteURI: "spark:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
        *e CallSuccessful EncryptionIn: "On"
        *e CallSuccessful EncryptionOut: "On"
        *e CallSuccessful CallRate: 20000
        *e CallSuccessful CallId: 4
        ** end  
        ```

## **Section {{config.cProps.rxp.sectionIds.ssh}} Cleanup** ~({{config.cProps.rxp.sectionIds.ssh}}.8)~

!!! abstract

    As we move into the rest of Part 2 of this lab, we'll cover alot of the same xAPI concepts as we had in our SSH terminal session from other integration methods available on the endpoint

    To be respectful of time, we'll only cover the minimum needed in those other integration methods, know if there is an xAPI accessible, there is a way from nearly all integration methods

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
        xFeedback DeregisterAll
        xConfig Audio DefaultVolume: 50
        xCommand UserInterface Extensions Panel Remove PanelId: wx1_lab_multilineCommand
        xCommand Video Selfview Set Mode: Off FullscreenMode: Off
        xCommand Video Input SetMainVideoSource ConnectorId: 1
        xCommand Audio Volume SetToDefault Device: Internal
        ```
    
    Feel free to close your Terminal Window