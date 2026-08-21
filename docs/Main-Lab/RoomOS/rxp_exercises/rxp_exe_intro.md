{{ config.cProps.devNotice }}

# Solution Exercises: Build Complete RoomOS Customizations

Integration Method lessons teach how to express RoomOS xAPI requests through SSH, HTTP/Postman, and macros. Solution Exercises combine those fundamentals into complete, learner-facing customizations. You will make design decisions, assemble several xAPI paths, validate the result on a RoomOS device, and leave the device in a known state.

!!! important "Before you start"

    Read each exercise's requirements before beginning. Hardware, software, services, and cleanup steps can differ by solution. If you follow an exercise on a shared lab device, use the prescribed identifiers and complete its cleanup.

## Outline Your Customization

Before writing code, record the following:

1. **User and outcome** — Who will use the customization, and what should become easier or safer?
2. **RoomOS surfaces** — Will the solution appear on a Room Navigator, an integrated touch screen, the room display, or more than one surface?
3. **Device capabilities** — Which RoomOS device families, connected peripherals, configurations, and software versions must the solution support?
4. **xAPI behavior** — Which commands change state, which statuses confirm it, and which events should trigger new work?
5. **External dependencies** — Which hosted pages, APIs, or network paths must remain available?
6. **Lifecycle** — How will the solution be configured, deployed, monitored, updated, and removed?

### Design for clarity and scale

- Keep the first working path small, then add flexibility only where the use case requires it.
- Discover device state when hardware can vary instead of hard-coding one connector or output.
- Use solution-specific panel, widget, macro, and feedback identifiers so shared devices do not collide.
- Validate inputs and external responses before using them.
- Log enough context to diagnose failures without exposing credentials or other sensitive data.
- Build cleanup and rollback into the exercise rather than leaving temporary UI, feedback registrations, or changed configurations behind.

### Keep the learner's path visible

Each exercise moves from requirements, to a construction task, to a collapsed comparison answer, and finally to observable verification. Try the scaffold before opening the answer. When your result differs, compare the smallest relevant section instead of replacing your entire solution.

Start with **Quick Docs Part 1** to build a complete local UI-and-macro solution. Continue to **Quick Docs Part 2** to generate the UI from configuration data and an optional remote manifest.
