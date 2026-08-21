{{ config.cProps.devNotice }}
{{ config.cProps.acronyms }}

# Messages ~(section\ {{ config.cProps.rxp.sectionIds.ui.messages }})~

RoomOS message commands create temporary user-interface elements. `Prompt`, `Rating`, and `TextInput` are interactive and emit response events. `Alert` and `TextLine` display information but do not emit a user-response event.

When `Target` is omitted, RoomOS chooses the normal surface for that message and device topology. In a typical Room Series room, interactive dialogs appear on the paired touch controller while informational overlays appear on the room display. An integrated-touch Board or Desk device can present either type on its OSD. Because an implicit target can vary, every example below supplies `Target` explicitly; the response event's `Origin` identifies the surface used.

| Message | Common surface when `Target` is omitted | Interactive response |
| --- | --- | --- |
| Prompt | Touch interface | `Prompt/Response`: `FeedbackId`, `OptionId`, `Origin` |
| Alert | Room display | None |
| Rating | Touch interface | `Rating/Response`: `FeedbackId`, `Rating`, `Origin` |
| TextInput | Touch interface | `TextInput/Response`: `FeedbackId`, `Text`, `Origin` |
| TextLine | Room display | None |

!!! important

    These lessons use SSH. If you have not completed RoomOS xAPI > SSH ^({{ config.cProps.rxp.sectionIds.ssh }})^, review that material before continuing.

???+ lesson "Lesson: Prompt Display ~({{ config.cProps.rxp.sectionIds.ui.messages }}.1)~"

    - **xAPI**: `xCommand UserInterface Message Prompt Display`
    - **Task**:

        1. Register only for prompt-response events:

            ``` shell title="Type into the terminal and press Enter"
            xFeedback Register Event/UserInterface/Message/Prompt/Response
            ```

        2. Display a two-option prompt on the touch controller:

            ``` shell title="Type into the terminal and press Enter"
            xCommand UserInterface Message Prompt Display Target: Controller FeedbackId: lab1451_prompt "Option.1": "It's the best" "Option.2": "Needs work" Text: "Let us know about this lab." Title: "How is the lab?"
            ```

        3. Select an option. The terminal reports the same `FeedbackId`, the selected `OptionId`, and an `Origin` of `Controller`.
        4. Display a timed five-option prompt and confirm that it closes after ten seconds if no option is selected:

            ``` shell title="Type into the terminal and press Enter"
            xCommand UserInterface Message Prompt Display Target: Controller Duration: 10 FeedbackId: lab1451_prompt "Option.1": 1 "Option.2": 2 "Option.3": 3 "Option.4": 4 "Option.5": 5 Text: "Choose a number." Title: "Prompt example"
            ```

        5. Clear any remaining prompt and remove the subscription:

            ``` shell title="Type into the terminal and press Enter"
            xCommand UserInterface Message Prompt Clear Target: Controller FeedbackId: lab1451_prompt
            xFeedback Deregister Event/UserInterface/Message/Prompt/Response
            ```

        <roomosfind>UserInterface Message Prompt</roomosfind>

???+ lesson "Lesson: Alert Display ~({{ config.cProps.rxp.sectionIds.ui.messages }}.2)~"

    - **xAPI**: `xCommand UserInterface Message Alert Display`
    - **Task**:

        An alert is informational, so there is no response subscription to register.

        1. Display a ten-second alert on the room display:

            ``` shell title="Type into the terminal and press Enter"
            xCommand UserInterface Message Alert Display Target: OSD Duration: 10 Text: "The lab continues in ten seconds." Title: "LAB-1451"
            ```

        2. Confirm that it closes when the duration expires.
        3. Display an alert without a duration, then clear it explicitly:

            ``` shell title="Type into the terminal and press Enter"
            xCommand UserInterface Message Alert Display Target: OSD Text: "Clear this alert from the terminal." Title: "Cleanup check"
            xCommand UserInterface Message Alert Clear Target: OSD
            ```

        <roomosfind>UserInterface Message Alert</roomosfind>

???+ lesson "Lesson: Rating Display ~({{ config.cProps.rxp.sectionIds.ui.messages }}.3)~"

    - **xAPI**: `xCommand UserInterface Message Rating Display`
    - **Task**:

        1. Register only for rating-response events:

            ``` shell title="Type into the terminal and press Enter"
            xFeedback Register Event/UserInterface/Message/Rating/Response
            ```

        2. Display the rating interface on the touch controller:

            ``` shell title="Type into the terminal and press Enter"
            xCommand UserInterface Message Rating Display Target: Controller FeedbackId: lab1451_rating SubmitReceiptText: "Your rating was recorded." SubmitReceiptTitle: "Thank you" Text: "Rate this lab below." Title: "How is the lab?"
            ```

        3. Select a star rating. Confirm that the response event includes `FeedbackId`, `Rating`, and `Origin`.
        4. Clear any remaining rating and remove the subscription:

            ``` shell title="Type into the terminal and press Enter"
            xCommand UserInterface Message Rating Clear Target: Controller FeedbackId: lab1451_rating
            xFeedback Deregister Event/UserInterface/Message/Rating/Response
            ```

        <roomosfind>UserInterface Message Rating</roomosfind>

??? challenge "Challenge: Compare TextInput and TextLine"

    1. Register for the interactive text-input response:

        ``` shell title="Type into the terminal and press Enter"
        xFeedback Register Event/UserInterface/Message/TextInput/Response
        ```

    2. Display a text-input dialog, submit a short comment, and confirm that the event contains `FeedbackId`, `Text`, and `Origin`:

        ``` shell title="Type into the terminal and press Enter"
        xCommand UserInterface Message TextInput Display Target: Controller FeedbackId: lab1451_text Placeholder: "Type a short comment" SubmitText: "Send" Text: "What should we improve?" Title: "Lab feedback"
        ```

    3. Display a noninteractive text line on the room display. It produces no response event:

        ``` shell title="Type into the terminal and press Enter"
        xCommand UserInterface Message TextLine Display Target: OSD Duration: 10 Text: "This is an informational text line."
        ```

    4. Clean up both message types and the subscription:

        ``` shell title="Type into the terminal and press Enter"
        xCommand UserInterface Message TextInput Clear Target: Controller FeedbackId: lab1451_text
        xCommand UserInterface Message TextLine Clear Target: OSD
        xFeedback Deregister Event/UserInterface/Message/TextInput/Response
        ```

    <roomosfind>UserInterface Message TextInput</roomosfind>

    <roomosfind>UserInterface Message TextLine</roomosfind>
