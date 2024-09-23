<div>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const footerNav = document.querySelector('.md-footer__inner');
      if (footerNav) {
        footerNav.style.display = 'none';
      }
    });
  </script>
</div>

???+ blank "Part 2: Accessing the Video Device xAPI"

    ??? info "Terminal Shortcut References"

        | Key              | Description      |
        | :-------         | :-------         |
        | `?`              | List all commands under a given node Path         |
        | `??`             | List all commands `and value spaces` under a given node Path         |
        | `//`             | Path wild, use to search for key words in any given path. You can use multiple wildcards in a xAPI path         |
        | ++tab++| Auto-completes the command string         |

    ??? info "xAPI Branch Capabilities"

        | **xAPI Branch**    | **Get Value** | **Set Value** | **Run Action** | **Subscribe to Value** |
        |--------------------|---------------|---------------|----------------|------------------------|
        | **xCommands**      |       [🔶^1^](# "Though commands don't have values assigned, some do generate data and provide a response similar to Getting a Status or Config")       |       ❌       |        ✅       |            ❌           |
        | **xConfiguration** |       ✅       |       ✅       |        ❌       |            ✅           |
        | **xStatus**        |       ✅       |       ✅       |        ❌       |            ✅           |
        | **xEvent**         |       ❌       |       ❌       |        ❌       |            ✅           |
    
    ??? info "Syntax Relationships Accross Access Methods Types"

        !!! example "xConfiguration Syntaxes"

            === "Command Line"

                ``` shell title="Get Value"
                xConfiguration Audio DefaultVolume
                ``` 

                ``` shell title="Set Value"
                xConfiguration Audio DefaultVolume: 50
                ``` 

                ``` shell title="Subscribe to Value Changes"
                xFeedback Register Configuration/Audio/DefaultVolume
                ``` 

                ``` shell title="UnSubscribe to Value Changes"
                xFeedback Deregister Configuration/Audio/DefaultVolume
                ``` 

            === "Macro Editor [Javascript]"

                ``` javascript title="Set Value"
                import xapi from 'xapi';

                ``` 

                ``` javascript title="Get Value"
                import xapi from 'xapi';
                    
                ``` 

                ``` javascript title="Subscribe to Value"
                import xapi from 'xapi';
                    
                ``` 

                ``` javascript title="Unsubscribe to Value Value"
                import xapi from 'xapi';
                    
                ``` 

            === "XML API"

                ???+ blank "Javascript > Fetch Example"

                    Fetch is a tool found in front end JS environments.

                    ``` javascript title="Set Value"
                

                    ``` 

                    ``` javascript title="Get Value"
                    
                    ``` 

                ??? blank "Javascript > xCommand HTTPClient API Example"

                    xCommand HTTPClient APIs are accessible on Cisco Codec's allowing them to Post, Patch, Put, Pull Get and Delete using HTTP communication

                    ``` javascript title="Set Value"
                

                    ``` 

                    ``` javascript title="Get Value"
                    
                    ``` 

            === "jsxapi [NodeJs]"

                ``` javascript title="Set Value"
                import xapi from 'xapi';

                ``` 

                ``` javascript title="Get Value"
                    
                ``` 

                ``` javascript title="Subscribe to Value"
                    
                ``` 

                ``` javascript title="Unsubscribe to Value Value"
                    
                ``` 

            === "Cloud xAPI"

                ``` markdown
                1. Sed sagittis eleifend rutrum
                2. Donec vitae suscipit est
                3. Nulla tempor lobortis orci
                ``` 

??? blank "Part 3:  Building a Device Customization using Macros"

    ??? info "..."

        ...

??? blank "Part 4: Deployment via Control Hub"

    ??? info "..."

        ...

??? blank "Part 4: Deployment via CE-Deploy"

    ??? info "..."

        ...