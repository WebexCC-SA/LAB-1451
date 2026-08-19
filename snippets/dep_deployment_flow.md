??? cedeploy "Every deployment in CE-Deploy follows this exact pipeline"

    Once you've filled in a feature's form (a command, a macro, a branding image, whatever it is),
    every single deployment in CE-Deploy — cloud or on-premise — goes through the same four gates.
    Once you've seen it here, you've seen it everywhere in this module.

    ```mermaid
    flowchart LR
        A["Fill out the\nfeature form"] --> B{{"Next: Select Devices"}}
        B --> C["Deployment Options modal\n(Org Id / Tags / Device ID,\nVideo Devices Only, etc.)"]
        C --> D{{"Next: Schedule"}}
        D --> E["Deployment Scheduler modal\n(Run Now / Schedule / Recurring)"]
        E --> F{{"Continue"}}
        F --> G["Deployment runs —\nmessage console shows progress"]

        style B fill:#0078D4,color:#fff
        style D fill:#0078D4,color:#fff
        style F fill:#0078D4,color:#fff
    ```

    The blue boxes are buttons you click. Everything else is a screen you'll see in between.
