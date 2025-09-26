{{ config.cProps.devNotice }}
{{ config.cProps.acronyms }}


## **3.2.1 - Navigating the UI Extensions Editor**
docs/Main-Lab/RoomOS/rxp_userInterface/images/UI_Extension_Gifs
!!! example "Access the UI Extensions Editor"

    === "Device Login"

        - Open a Browser and enter your Codec's IP as a URL and hit enter
        - Login with your Username and Password

        <figure markdown="span">
            ![Device Login](../images/UI_Extension_Gifs/3-2_DeviceLogin.png){ width="600" }
            <figcaption>Device Login Page</figcaption>
        </figure>

    === "Device Home"

        - Select the UI Extensions Editor on the Left-Hand Navigation Bar

        <figure markdown="span">
            ![Device Home](../images/UI_Extension_Gifs/3-2_DeviceHome.png){ width="700" }
            <figcaption>Device Home Page</figcaption>
        </figure>

    === "UI Extensions Editor"

        <figure markdown="span">
            ![Device Login](../images/UI_Extension_Gifs/3-2_UI_Editor.png){ width="800" }
            <figcaption>UI Extensions Editor</figcaption>
        </figure>

    === "Adding a Panel"

        !!! important inline end "Always Assign Unique PanelIds"

            You may not be the only developer. Assigning PanelIds unique to your solution helps limit conflicts with other solutions.

        !!! Gif "How to Add a Panel"

            <figure markdown="span">
                ![Adding a Panel](../images/UI_Extension_Gifs/3-2_Add_UI_Panel.gif){ width="600" }
                <figcaption>Adding a new Panel</figcaption>
            </figure>

        !!! info

            - Panels
                - Creates a Panel with pages and rows within, containing widgets
            - Action Buttons
                - Creates a panel
            - Web Widgets
                - Creates a Web Widget on your OSD
            - Web Apps
                - Creates a Panel, that when `clicked`, opens a URL to a target Web Page

    === "Adding Widgets"

        !!! important inline end "Always Assign Unique WidgetIds"
        
            You may not be the only developer. Assigning WidgetIds unique to your solution helps limit conflicts with other solutions.

        !!! Gif "How to Add Widgets"

              <figure markdown="span">
                ![Adding Widgets](../images/UI_Extension_Gifs/3-2_Add_UI_Widgets.gif){ width="600" }
                <figcaption>Adding bew Widgets</figcaption>
            </figure>

    === "Edit Text Elements"

        !!! tip inline end

            Some text elements have limited space, but you won't see an error

            Make sure the Text Renders correctly on your device after you apply it

        !!! Gif

              <figure markdown="span">
                ![Edit Text Elements](../images/UI_Extension_Gifs/3-2_Rename_Text_Elements.gif){ width="600" }
                <figcaption>Editing Text Elements</figcaption>
            </figure>

        !!! info

            - Double clicking on any text element allows you to edit the filed
            - Change the Text as you need it, then press enter

    === "Add/Delete Rows and Pages"

        !!! tip  inline end
            
            Keep in mind more is not always better. Try to keep things simple


        !!! Gif

              <figure markdown="span">
                ![Adding a Panel](../images/UI_Extension_Gifs/3-2_Add-Delete_Pages-Rows.gif){ width="600" }
                <figcaption>Adding a new Panel</figcaption>
            </figure>

        !!! info

            - You can add as many rows and pages as your solution needs


!!! experiment "Click on each table below to review each Widget"

    === "Toggle"

        !!! gif inline end

            <figure markdown="span">
                ![Toggle Action](../images/UI_Extension_Gifs/toggle.gif)
                <figcaption>Toggle Action</figcaption>
            </figure>

        |Key|Value|
        |:--|:----|
        |WidgetId|`Assigned by the Developer on Widget Instantiation`|
        |Type| `changed`|
        |Value| `on` or `off` |

    === "Slider"

        !!! gif inline end

            <figure markdown="span">
                ![Slider Action](../images/UI_Extension_Gifs/slider.gif)
                <figcaption>Slider Action</figcaption>
            </figure>

        |Key|Value|
        |:--|:----|
        |WidgetId|`Assigned by the Developer on Widget Instantiation`|
        |Type|`pressed`, `released`, or `changed`|
        |Value| `Integer between 0 and 255` |

    === "Button"

        !!! gif inline end

            <figure markdown="span">
                ![Button Action](../images/UI_Extension_Gifs/button.gif)
                <figcaption>Button Action</figcaption>
            </figure>

        |Key|Value|
        |:--|:----|
        |WidgetId|`Assigned by the Developer on Widget Instantiation`|
        |Type|`pressed`, `released`, or `clicked`|
        |Value| N/A |

    === "GroupButton"

        !!! gif inline end

            <figure markdown="span">
                ![Group Button Action](../images/UI_Extension_Gifs/groupButton.gif)
                <figcaption>Group Button Action</figcaption>
            </figure>

        |Key|Value|
        |:--|:----|
        |WidgetId|`Assigned by the Developer on Widget Instantiation`|
        |Type|`pressed`, `released`|
        |Value| `Assigned by the Developer on Widget Instantiation` |

    === "Icon Button"

        !!! gif inline end

            <figure markdown="span">
                ![Icon Button Icons](../images/UI_Extension_Gifs/iconButton.gif)
                <figcaption>Icon Button Icons</figcaption>
            </figure>

        |Key|Value|
        |:--|:----|
        |WidgetId|`Assigned by the Developer on Widget Instantiation`|
        |Type|`pressed`, `released`, or `clicked`|
        |Value| N/A |

    === "Spinner"

        !!! gif inline end

            <figure markdown="span">
                ![Spinner Icons](../images/UI_Extension_Gifs/spinner.gif)
                <figcaption>Spinner Icons</figcaption>
            </figure>

        |Key|Value|
        |:--|:----|
        |WidgetId|`Assigned by the Developer on Widget Instantiation`|
        |Type|`pressed`, `released`, or `clicked`|
        |Value| `increment` or `decrement` |

    === "TextBox"

        !!! failure "Does not fire events"

    === "Directional Pad"

        !!! gif inline end

            <figure markdown="span">
                ![Directional Pad Action](../images/UI_Extension_Gifs/controlWheel.gif)
                <figcaption>Directional Pad Action</figcaption>
            </figure>

        |Key|Value|
        |:--|:----|
        |WidgetId|`Assigned by the Developer on Widget Instantiation`|
        |Type|`pressed`, `released`, or `clicked`|
        |Value| `up`, `down`, `left`, `right`, `center` |

    === "Spacer"

        !!! failure "Does not fire events"
