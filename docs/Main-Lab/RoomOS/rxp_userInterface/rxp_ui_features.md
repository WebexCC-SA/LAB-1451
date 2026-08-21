{{ config.cProps.devNotice }}
{{ config.cProps.acronyms }}

# Features ~(section\ {{ config.cProps.rxp.sectionIds.ui.features }})~

Features are built-in RoomOS user-interface elements. Many can be hidden or restored through `xConfiguration UserInterface Features`, although their placement cannot be rearranged through the xAPI.

!!! important

    These lessons use SSH. If you have not completed RoomOS xAPI > SSH ^({{ config.cProps.rxp.sectionIds.ssh }})^, review that material before continuing.

???+ lesson "Lesson: Hide selected features ~({{ config.cProps.rxp.sectionIds.ui.features }}.1)~"

    - **xAPI**: `xConfiguration UserInterface Features Call Start`
    - **Task**:

        1. Note the controls currently shown on your RoomOS device's home screen.
        2. Hide the main Call button:

            ``` shell title="Type into the terminal and press Enter"
            xConfiguration UserInterface Features Call Start: Hidden
            ```

        3. Hide the following built-in controls:

            ``` shell title="Type into the terminal and press Enter"
            xConfiguration UserInterface Features Whiteboard Start: Hidden
            xConfiguration UserInterface Features Call JoinZoom: Hidden
            xConfiguration UserInterface Features Call JoinGoogleMeet: Hidden
            xConfiguration UserInterface Features Call JoinMicrosoftTeamsCVI: Hidden
            xConfiguration UserInterface Features Call JoinMicrosoftTeamsDirectGuestJoin: Hidden
            ```

        4. Confirm that the hidden controls no longer appear. This is useful when a room should offer a smaller, purpose-specific set of choices.
        5. Restore every value changed in this lesson:

            ``` shell title="Type into the terminal and press Enter"
            xConfiguration UserInterface Features Call Start: Auto
            xConfiguration UserInterface Features Whiteboard Start: Auto
            xConfiguration UserInterface Features Call JoinZoom: Auto
            xConfiguration UserInterface Features Call JoinGoogleMeet: Auto
            xConfiguration UserInterface Features Call JoinMicrosoftTeamsCVI: Auto
            xConfiguration UserInterface Features Call JoinMicrosoftTeamsDirectGuestJoin: Auto
            ```

???+ lesson "Lesson: Hide all built-in features ~({{ config.cProps.rxp.sectionIds.ui.features }}.2)~"

    - **xAPI**: `xConfiguration UserInterface Features HideAll`
    - **Task**:

        1. Note the controls currently shown on the home screen, then hide all supported built-in features:

            ``` shell title="Type into the terminal and press Enter"
            xConfiguration UserInterface Features HideAll: True
            ```

        2. Confirm that the RoomOS home-screen buttons disappear.
        3. Restore them immediately:

            ``` shell title="Type into the terminal and press Enter"
            xConfiguration UserInterface Features HideAll: False
            ```

To explore the other built-in features that RoomOS can show or hide, open the current xAPI reference:

<roomosfind>UserInterface Features</roomosfind>
