{{ config.cProps.devNotice }}
{{ config.cProps.acronyms }}

# Quick Docs Macro Exercise — Part 2: Optimize ~(section\ {{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }})~

Part 1 stored every site in the UI Extension. Part 2 moves those sites into a configuration module, generates the panel safely, and optionally combines a remote manifest with the local list.

## Requirements ~({{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }})~

- Completion of Quick Docs Part 1 ^({{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt1 }})^
- A RoomOS device with the Macro Editor, UI Extensions Editor, WebEngine, and HTTP client
- Access to the device web interface with permission to edit macros and UI Extensions
- Network access from the RoomOS device to the destinations listed in Part 1 and to `https://raw.githubusercontent.com`

No camera or terminal application is used in this exercise.

## Canonical configuration progression

Each lesson changes only the state shown in its row:

| Checkpoint | Visibility | Local rows | Remote rows | Rendered rows |
| --- | --- | ---: | ---: | ---: |
| {{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.1.2 | `localOnly` | 2 | Not fetched | 2 |
| {{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.2.3 | `localOnly` | 3 | Not fetched | 3 |
| {{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.3.1 | `localOnly` | 3 | URL configured, not fetched | 3 |
| {{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.3.3 | `merge` | 3 | 6 | 9 |
| {{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.3.4 | Selected by learner | 3 | 6 | 3, 6, or 9 |

## Implement imports and exports ~({{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.1)~

???+ lesson "Lesson: Create the configuration macro ~({{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.1.1)~"

    Create a macro named `Quick Docs Configuration`. Remove the default xAPI import because this module only exports data. Save it and leave it inactive after the import is working; an inactive macro can still serve as a module.

???+ lesson "Lesson: Establish the configuration object ~({{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.1.2)~"

    Construct a `config` object with:

    - `manifestVisibility` set to `localOnly`
    - an empty `remoteSiteManifest`
    - two local entries using the same current URLs as Part 1
    - `Name`, `Organization`, `Url`, and `QrEnabled` on every entry

    ``` javascript title="Scaffold"
    const config = {
      manifestVisibility: /* local mode */,
      remoteSiteManifest: /* no remote URL yet */,
      localSiteManifest: [
        {
          Name: 'LAB-1451',
          Organization: 'WebexCC-SA',
          Url: /* current lab-owned URL */,
          QrEnabled: true,
        },
        // Add Reimagine Workspaces.
      ],
    };
    ```

    ??? success "Compare `Quick Docs Configuration`"

        ``` javascript
        const config = {
          manifestVisibility: 'localOnly',
          remoteSiteManifest: '',
          localSiteManifest: [
            {
              Name: 'LAB-1451',
              Organization: 'WebexCC-SA',
              Url: 'https://webexcc-sa.github.io/LAB-1451/',
              QrEnabled: true,
            },
            {
              Name: 'Reimagine Workspaces',
              Organization: 'Cisco',
              Url: 'https://www.webex.com/us/en/workspaces.html',
              QrEnabled: true,
            },
          ],
        };
        ```

???+ lesson "Lesson: Export the configuration ~({{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.1.3)~"

    Export the existing object without changing its values:

    ``` javascript title="Add at the end of Quick Docs Configuration"
    export { config };
    ```

???+ lesson "Lesson: Import the configuration ~({{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.1.4)~"

    In the `Quick Docs` macro, place this import directly after the xAPI import:

    ``` javascript
    import xapi from 'xapi';
    import { config } from './Quick Docs Configuration';
    ```

    Log `config`, save and activate `Quick Docs`, and confirm the console shows exactly two local entries and `manifestVisibility: "localOnly"`. Remove the temporary log afterward.

    Keep the Part 1 `openSite()`, `openQrCode()`, and widget-action subscription. `openQrCode()` must continue using `encodeURIComponent(url)` so destinations such as `https://example.com/?a=1&b=2#section` survive intact.

## Generate the user interface ~({{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.2)~

???+ lesson "Lesson: Preserve the manual panel as a reference ~({{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.2.1)~"

    In the UI Extensions Editor, export the existing Quick Docs panel as a local XML backup. The next lesson will save a generated panel with the same `lab1451_quick_docs` panel ID, replacing the manually-authored version on the device.

???+ lesson "Lesson: Add a safe `buildUI()` function ~({{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.2.2)~"

    Manifest values are untrusted XML data. Define `escapeXml()` once, use it for every interpolated name and URL, and then build the panel from a supplied site array.

    ``` javascript title="Scaffold"
    const PANEL_ID = 'lab1451_quick_docs';
    const APP_PREFIX = 'lab1451_quick_docs';

    function escapeXml(value) {
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      };

      return String(value).replace(/[&<>"']/g, (character) => entities[character]);
    }

    async function buildUI(sites) {
      const rows = sites.map((site) => {
        // Escape the name and URL before inserting them into XML.
        // Return one Row with Open Site and optional Open QR Code widgets.
      }).join('');

      const xml = /* panel XML containing rows */;
      // Save with xCommand UserInterface Extensions Panel Save.
    }
    ```

    ??? success "Compare `escapeXml()` and `buildUI()`"

        ``` javascript
        const PANEL_ID = 'lab1451_quick_docs';
        const APP_PREFIX = 'lab1451_quick_docs';

        function escapeXml(value) {
          const entities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&apos;',
          };

          return String(value).replace(/[&<>"']/g, (character) => entities[character]);
        }

        async function buildUI(sites) {
          const rows = sites.map((site) => {
            const name = escapeXml(site.Name);
            const url = escapeXml(site.Url);

            return `<Row>
              <Name>${name}</Name>
              <Widget>
                <WidgetId>${APP_PREFIX}~OpenSite~${url}</WidgetId>
                <Name>Open Site</Name>
                <Type>Button</Type>
                <Options>size=${site.QrEnabled ? 2 : 4}</Options>
              </Widget>
              ${site.QrEnabled ? `<Widget>
                <WidgetId>${APP_PREFIX}~OpenQrCode~${url}</WidgetId>
                <Name>Open QR Code</Name>
                <Type>Button</Type>
                <Options>size=2</Options>
              </Widget>` : ''}
            </Row>`;
          }).join('');

          const xml = `<Extensions>
            <Panel>
              <Order>1</Order>
              <Origin>local</Origin>
              <Location>HomeScreenAndCallControls</Location>
              <Icon>Language</Icon>
              <Color>#875AE0</Color>
              <Name>Quick Docs</Name>
              <ActivityType>Custom</ActivityType>
              <Page>
                <Name>Quick Docs</Name>
                ${rows}
                <PageId>lab1451_quick_docs_page</PageId>
                <Options/>
              </Page>
            </Panel>
          </Extensions>`;

          try {
            const result = await xapi.Command.UserInterface.Extensions.Panel.Save({
              PanelId: PANEL_ID,
            }, xml);
            console.log(`Quick Docs built ${sites.length} rows`, result);
            return true;
          } catch (error) {
            console.error('Quick Docs could not save its panel. Validate manifest text and URLs.', error);
            return false;
          }
        }
        ```

    Run `buildUI(config.localSiteManifest);`. The panel should contain two rows.

    Test the escaping contract temporarily with this entry, then remove it:

    ``` javascript
    {
      Name: 'R&D validation',
      Organization: 'Example',
      Url: 'https://example.com/?a=1&b=2#section',
      QrEnabled: true,
    }
    ```

    The panel must save successfully, display `R&D validation`, and preserve the full URL when either button is clicked.

???+ lesson "Lesson: Add one local site ~({{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.2.3)~"

    Add this third entry to `config.localSiteManifest` without changing either existing entry:

    ``` javascript
    {
      Name: 'Cisco',
      Organization: 'Cisco',
      Url: 'https://www.cisco.com/',
      QrEnabled: true,
    }
    ```

    Save `Quick Docs Configuration`, then save/restart `Quick Docs`. The checkpoint is now `localOnly` with exactly three rows and QR buttons enabled for all three.

    <figure markdown="span">
        ![Expected Quick Docs panel with LAB-1451, Reimagine Workspaces, and Cisco rows](../images/3-4-3_Local_PanelUI.png){ width="700" }
        <figcaption>Three-row local-only checkpoint</figcaption>
    </figure>

## Centralize the site list ~({{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.3)~

???+ lesson "Lesson: Configure the remote manifest URL ~({{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.3.1)~"

    Set only `remoteSiteManifest` in `Quick Docs Configuration`:

    ``` javascript
    remoteSiteManifest: 'https://raw.githubusercontent.com/WebexCC-SA/LAB-1451/main/docs/Main-Lab/DownloadContent/3-4-3_remoteManifest.json',
    ```

    [Open the tracked remote manifest](https://github.com/WebexCC-SA/LAB-1451/blob/main/docs/Main-Lab/DownloadContent/3-4-3_remoteManifest.json){ target="_blank" }

    Keep `manifestVisibility: 'localOnly'` for this checkpoint, so the panel still has three rows.

???+ lesson "Lesson: Fetch the remote manifest safely ~({{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.3.2)~"

    Define an explicit contract: success returns an array; failure logs one contextual error and returns `null`. Callers must stop the current build when they receive `null`.

    ``` javascript title="Scaffold"
    async function getRemoteSiteManifest() {
      const url = config.remoteSiteManifest;

      try {
        // Fetch the URL and parse response.Body.
        // Reject a parsed value that is not an array.
        return /* valid array */;
      } catch (error) {
        console.error(/* URL and next action */, error);
        return null;
      }
    }
    ```

    ??? success "Compare `getRemoteSiteManifest()`"

        ``` javascript
        async function getRemoteSiteManifest() {
          const url = config.remoteSiteManifest;

          try {
            const response = await xapi.Command.HttpClient.Get({
              AllowInsecureHTTPS: 'False',
              ResultBody: 'PlainText',
              Url: url,
            });
            const sites = JSON.parse(response.Body);

            if (!Array.isArray(sites)) {
              throw new Error('Manifest root must be an array.');
            }

            return sites;
          } catch (error) {
            console.error(`Quick Docs could not load remote manifest [${url}]. Verify the URL, HTTP client, and network access.`, error);
            return null;
          }
        }
        ```

    Temporarily make the URL invalid and call the function. Confirm that the console reports one error containing the URL and that no spread or `forEach` exception follows. Restore the current raw URL afterward.

???+ lesson "Lesson: Select, merge, and refresh manifests ~({{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.3.3)~"

    Build a new array every time. Never append remote data to a previously merged array. Deduplicate by URL and abort when a required fetch returns `null`.

    ``` javascript title="Scaffold"
    async function getVisibleSites() {
      const localSites = /* copy local source */;

      switch (config.manifestVisibility) {
        case 'localOnly':
          return localSites;
        case 'remoteOnly':
          return /* fetched array or null */;
        case 'merge': {
          const remoteSites = /* fetched array */;
          if (remoteSites === null) return null;
          return /* new, URL-deduplicated array */;
        }
        default:
          console.error(/* supported values */);
          return null;
      }
    }
    ```

    ??? success "Compare manifest selection and refresh"

        ``` javascript
        async function getVisibleSites() {
          const localSites = config.localSiteManifest.map((site) => ({ ...site }));

          switch (config.manifestVisibility) {
            case 'localOnly':
              return localSites;
            case 'remoteOnly':
              return getRemoteSiteManifest();
            case 'merge': {
              const remoteSites = await getRemoteSiteManifest();
              if (remoteSites === null) return null;

              const byUrl = new Map();
              [...localSites, ...remoteSites].forEach((site) => {
                byUrl.set(site.Url, { ...site });
              });
              return [...byUrl.values()];
            }
            default:
              console.error(`Quick Docs does not support manifestVisibility [${config.manifestVisibility}]. Use localOnly, remoteOnly, or merge.`);
              return null;
          }
        }

        async function refreshUI() {
          const sites = await getVisibleSites();
          if (sites === null) return false;
          return buildUI(sites);
        }

        xapi.Event.UserInterface.Extensions.Panel.Clicked.on(({ PanelId }) => {
          if (PanelId === PANEL_ID) refreshUI();
        });

        refreshUI();
        ```

    Change `manifestVisibility` to `merge`. Restart Quick Docs, then open the panel at least three times. Each build must report exactly nine rows—never 15 or 21—and the local and remote arrays must remain unchanged.

???+ lesson "Lesson: Compare manifest visibility modes ~({{ config.cProps.rxp.sectionIds.exe.macros.quickDocs_pt2 }}.3.4)~"

    Change only `manifestVisibility`, restarting Quick Docs after each change:

    | Value | Expected ordered result |
    | --- | --- |
    | `localOnly` | 3 local rows |
    | `remoteOnly` | 6 remote rows |
    | `merge` | 3 local rows followed by 6 remote rows, deduplicated by URL (9 with the current manifests) |

    Restore `manifestVisibility: 'merge'` when finished.

    ??? success "Complete optimized Quick Docs macro"

        ``` javascript
        import xapi from 'xapi';
        import { config } from './Quick Docs Configuration';

        const PANEL_ID = 'lab1451_quick_docs';
        const APP_PREFIX = 'lab1451_quick_docs';
        const QR_SERVICE = 'https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=';

        function escapeXml(value) {
          const entities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&apos;',
          };
          return String(value).replace(/[&<>"']/g, (character) => entities[character]);
        }

        async function openSite(url) {
          try {
            const result = await xapi.Command.UserInterface.WebView.Display({ Mode: 'Fullscreen', Target: 'OSD', Url: url });
            console.log(`Quick Docs opened site [${url}]`, result);
          } catch (error) {
            console.error(`Quick Docs could not open site [${url}]. Verify WebEngine and network access.`, error);
          }
        }

        async function openQrCode(url) {
          const qrUrl = `${QR_SERVICE}${encodeURIComponent(url)}`;
          try {
            const result = await xapi.Command.UserInterface.WebView.Display({ Mode: 'Fullscreen', Target: 'OSD', Url: qrUrl });
            console.log(`Quick Docs opened QR code for [${url}]`, result, qrUrl);
          } catch (error) {
            console.error(`Quick Docs could not open a QR code for [${url}]. Verify QR-service and network access.`, error);
          }
        }

        async function getRemoteSiteManifest() {
          const url = config.remoteSiteManifest;
          try {
            const response = await xapi.Command.HttpClient.Get({ AllowInsecureHTTPS: 'False', ResultBody: 'PlainText', Url: url });
            const sites = JSON.parse(response.Body);
            if (!Array.isArray(sites)) throw new Error('Manifest root must be an array.');
            return sites;
          } catch (error) {
            console.error(`Quick Docs could not load remote manifest [${url}]. Verify the URL, HTTP client, and network access.`, error);
            return null;
          }
        }

        async function getVisibleSites() {
          const localSites = config.localSiteManifest.map((site) => ({ ...site }));
          switch (config.manifestVisibility) {
            case 'localOnly':
              return localSites;
            case 'remoteOnly':
              return getRemoteSiteManifest();
            case 'merge': {
              const remoteSites = await getRemoteSiteManifest();
              if (remoteSites === null) return null;
              const byUrl = new Map();
              [...localSites, ...remoteSites].forEach((site) => byUrl.set(site.Url, { ...site }));
              return [...byUrl.values()];
            }
            default:
              console.error(`Quick Docs does not support manifestVisibility [${config.manifestVisibility}]. Use localOnly, remoteOnly, or merge.`);
              return null;
          }
        }

        async function buildUI(sites) {
          const rows = sites.map((site) => {
            const name = escapeXml(site.Name);
            const url = escapeXml(site.Url);
            return `<Row><Name>${name}</Name><Widget><WidgetId>${APP_PREFIX}~OpenSite~${url}</WidgetId><Name>Open Site</Name><Type>Button</Type><Options>size=${site.QrEnabled ? 2 : 4}</Options></Widget>${site.QrEnabled ? `<Widget><WidgetId>${APP_PREFIX}~OpenQrCode~${url}</WidgetId><Name>Open QR Code</Name><Type>Button</Type><Options>size=2</Options></Widget>` : ''}</Row>`;
          }).join('');

          const xml = `<Extensions><Panel><Order>1</Order><Origin>local</Origin><Location>HomeScreenAndCallControls</Location><Icon>Language</Icon><Color>#875AE0</Color><Name>Quick Docs</Name><ActivityType>Custom</ActivityType><Page><Name>Quick Docs</Name>${rows}<PageId>lab1451_quick_docs_page</PageId><Options/></Page></Panel></Extensions>`;

          try {
            const result = await xapi.Command.UserInterface.Extensions.Panel.Save({ PanelId: PANEL_ID }, xml);
            console.log(`Quick Docs built ${sites.length} rows`, result);
            return true;
          } catch (error) {
            console.error('Quick Docs could not save its panel. Validate manifest text and URLs.', error);
            return false;
          }
        }

        async function refreshUI() {
          const sites = await getVisibleSites();
          if (sites === null) return false;
          return buildUI(sites);
        }

        xapi.Event.UserInterface.Extensions.Widget.Action.on(({ Type, WidgetId }) => {
          if (Type !== 'clicked' || !WidgetId.includes(`${APP_PREFIX}~`)) return;
          const [, action, ...urlParts] = WidgetId.split('~');
          const url = urlParts.join('~');
          if (action === 'OpenSite') openSite(url);
          else if (action === 'OpenQrCode') openQrCode(url);
          else console.warn(`Quick Docs ignored unknown action [${action}]`);
        });

        xapi.Event.UserInterface.Extensions.Panel.Clicked.on(({ PanelId }) => {
          if (PanelId === PANEL_ID) refreshUI();
        });

        refreshUI();
        ```

Expected output stays inside a code block so JSON remains visible:

``` text
Quick Docs built 9 rows {"status":"OK"}
Quick Docs opened site [https://webexcc-sa.github.io/LAB-1451/] {"status":"OK"}
Quick Docs opened QR code for [https://example.com/?a=1&b=2#section] {"status":"OK"}
```
