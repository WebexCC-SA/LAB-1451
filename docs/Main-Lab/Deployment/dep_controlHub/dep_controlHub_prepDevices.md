{{ config.cProps.acronyms }}
# Tag Your Pod Device

!!! abstract

    Device Tags are one of the most underutilized features for sorting and filtering devices.
    They're useful in Control Hub, sure, but they really shine once you start working with the
    Webex RESTful APIs and CE-Deploy — tags are one of the fastest ways to filter a fleet down to
    exactly the devices you want. In this lab you'll create a single pod tag, and you'll reuse that
    exact tag for the rest of the Deployment module.

!!! Tip

    In the real world you'd tag on several dimensions at once: Country, State, City, Building,
    Room, Product. That's how you filter a support incident down to "just the Room Bars in
    Building 4" without breaking a sweat. For this lab, one tag is plenty. Pick it carefully though
    — you'll be typing it again in every lesson from here on.

<div class="grid cards" markdown>

-   <i class="fa-solid fa-location-dot"></i> **Where**

    ---

    Management → Devices, in Control Hub

-   <i class="fa-solid fa-clock"></i> **Time**

    ---

    About 5 minutes

-   <i class="fa-solid fa-bullseye"></i> **Goal**

    ---

    Tag your pod device with the one tag you'll reuse for the rest of this module

</div>

??? lesson "{{config.cProps.dep.sectionIds.cH}}.1 Lab"

    <highlight_1>{{config.cProps.dep.sectionIds.cH}}.1.1</highlight_1> Login to the lab's Control Hub with your admin credentials

    [Login to Control Hub.](https://admin.webex.com)

    <highlight_1>{{config.cProps.dep.sectionIds.cH}}.1.2</highlight_1> Select Management>Devices

    <figure markdown="span">
      ![Management navigation menu with Devices highlighted](images/4-1-2.png){ width="150" }
      <figcaption></figcaption>
    </figure>

    <highlight_1>{{config.cProps.dep.sectionIds.cH}}.1.3</highlight_1> Select your lab device(Room Bar or Desk Pro)

    <figure markdown="span">
      ![Device selection in the Devices list](images/4-1-3.png){ width="400" }
      <figcaption></figcaption>
    </figure>

    !!! Tip
        In this lab we are only configuring the one device but if you needed to supply the same tag to multiple devices
        it would be at this stage you would just continue selecting more devices before selecting edit.

    <highlight_1>{{config.cProps.dep.sectionIds.cH}}.1.4</highlight_1> Select ==Edit==

    <highlight_1>{{config.cProps.dep.sectionIds.cH}}.1.5</highlight_1> The Edit tag page will now allow you to set as many tags as you need.
    For this lab we will be using a single tag in the format ==pod"yourPodNumber"==. As an example pod01.

    <figure markdown="span">
      ![Tag input field on the Edit tags page](images/4-1-5.png){ width="300" }
      <figcaption>The tag input field — enter your own pod tag here</figcaption>
    </figure>

    !!! important "One tag, reused everywhere"

        This is the **only** tag you'll create in this module. Every later lesson — Control Hub or
        CE-Deploy — targets your device using this exact tag. Write it down.

    <highlight_1>{{config.cProps.dep.sectionIds.cH}}.1.6</highlight_1> Select Add tag

    <highlight_1>{{config.cProps.dep.sectionIds.cH}}.1.7</highlight_1> Add pod"YourPodNumber" and press enter.

    <figure markdown="span">
      ![Tag added and pending confirmation](images/4-1-7.png){ width="300" }
      <figcaption></figcaption>
    </figure>

    <highlight_1>{{config.cProps.dep.sectionIds.cH}}.1.8</highlight_1> Select ==Close== to close the Edit tags page.

    <highlight_1>{{config.cProps.dep.sectionIds.cH}}.1.9</highlight_1> Close the edit configurations popout and return to the main devices page.

    <highlight_1>{{config.cProps.dep.sectionIds.cH}}.1.10</highlight_1> In the Find by devices dialog box type Tags: then enter the device tag previously set.
    Confirm your device — and only your device — is returned.

    <figure markdown="span">
      ![Find by devices search box with Tags filter](images/4-1-10a.png){ width="300" }
      <figcaption></figcaption>
    </figure>

    <figure markdown="span">
      ![Search results filtered down to the tagged device](images/4-1-10b.png){ width="300" }
      <figcaption></figcaption>
    </figure>

    !!! Success

        This may seem like overkill for one device, but multiply it by a thousand endpoints and
        you'll see why tags matter. That's deployment lab one done — on to configuration templates.
