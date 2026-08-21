{{ config.cProps.devNotice }}
{{ config.cProps.acronyms }}

# Web Content ~(section\ {{ config.cProps.rxp.sectionIds.ui.webContent }})~

RoomOS uses an embedded Chromium-based WebEngine for several distinct experiences. Enable and test only the experience needed by your solution, and validate the hosted content on every intended RoomOS device model.

Learn about the available WebEngine settings:

<roomosfind>xConfiguration WebEngine</roomosfind>

## Web Apps

A web app is a launcher on a supported touch interface. Selecting it opens the configured URL as a full-screen web experience. Web apps can be provisioned through Control Hub, through the device web interface, or with `xCommand UserInterface Extensions WebApp Save`. They are intended for touch-capable Board and Desk series devices; a room display without touch does not offer the same home-screen app interaction.

## API-Driven Web Views

`xCommand UserInterface WebView Display` opens hosted content programmatically. On supported Room series devices, a web view can appear on the main display even when the display itself is not touch-enabled. A macro or external integration can open and close the view; a paired controller can provide separate controls.

An API-driven web view remains open until it is closed, but it is not a persistent web app and should not be described as preserving an application session after closure.

<roomosfind>UserInterface WebView</roomosfind>

The WXSD Sales example below demonstrates a macro that controls a WebView from UI Extensions or a second WebView on a Room Navigator.

<a class="md-button md-button--primary" href="https://github.com/wxsd-sales/webview-websocket-control-macro" target="_blank">
    WebView Controls Macro <i class="fa-solid fa-square-up-right"></i>
</a>

## Web Widgets

A web widget is a single noninteractive hosted view on the RoomOS home screen. It is useful for a QR code, announcement, dashboard, or room information. RoomOS supports one web widget at a time; use a web app or web view when the user must interact with the page.

<a class="md-button md-button--primary" href="https://github.com/wxsd-sales/analytics-web-widget" target="_blank">
    Analytics Web Widget <i class="fa-solid fa-square-up-right"></i>
</a>

## Kiosk Mode

Kiosk mode replaces the standard home screen with one hosted web application. Current xAPI support is limited to the Desk series and supported Board Pro models; it is not a general Room series feature. The WebEngine must be enabled, and both `UserInterface Kiosk URL` and `UserInterface Kiosk Mode` must be configured.

Kiosk mode can support calling experiences that the hosted application exposes, but enabling it does not automatically recreate every standard RoomOS home-screen function. Plan the exit, recovery, and administrative-access experience before deployment.

<a class="md-button md-button--primary" href="https://github.com/wxsd-sales/kiosk-reception-demo" target="_blank">
    Kiosk Reception Demo <i class="fa-solid fa-square-up-right"></i>
</a>
