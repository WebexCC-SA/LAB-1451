# Deploy xAPI commands via CE-Deploy

!!! abstract

    Deploying xAPI commands is a fundamental aspect of administering a Cisco collaboration endpoint 
    deployment. While Control Hub allows us to deploy commands to a single endpoint, scaling this 
    process to a larger deployment through Control Hub or a terminal command prompt can be 
    time-consuming and inefficient. By utilizing CE-Deploy, we can efficiently deploy xAPI commands 
    to multiple endpoints using various criteria such as IP Address, Control Hub Org ID, Control Hub 
    Tags, and more. This lab will demonstrate how to deploy a system time check across multiple devices. 
    Although this is not a configuration change, it will showcase how the CE-Deploy message console 
    provides real-time feedback as the deployment progresses.

??? vidcast "CE-Deploy Running xAPI Commands"

    <div style="padding-bottom:56.25%; position:relative; display:block; width: 100%">
    <iframe src="https://app.vidcast.io/share/embed/e0469f2c-5631-4a7a-a8aa-b15ecd84b4d3" width="100%" height="100%" title="CE-Deploy Running xAPI Commands" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0;border: solid; border-radius:12px;"></iframe>
    </div>

??? lesson "4.8 Lessons"

    4.8.1 Open Ce-deploy and load the environment your created in the last lab.
    
    ??? cedeploy "Loading Environments"
    
        To load an environment, use the dropdown in the Environment loading section and select your
        new Environment and select ==Load Environment==.
    
    4.8.2 Select xAPI from the deployment section. In the command text box enter:
    
    ```text
    xCommand Time DateTime Get
    ```
    <figure markdown="span">
      ![Command](images/5-2-2.png){ width="300" }
      <figcaption></figcaption>
    </figure>
    
    4.8.3 Under the deployment options drop down select ==Org Id==, this will populate the lab org ID. 
    As this command does not make any system changes it can be safely run against all the devices
    in the lab Control Hub Organization. By doing this we can see how CE-Deploy queues and completes 
    xAPI commands in bulk.
    
    <figure markdown="span">
      ![Org ID Option](images/5-2-3.png){ width="300" }
      <figcaption></figcaption>
    </figure>
    
    4.8.4 Select the ==video devices only== filter checkbox. This will limit running the command to only 
    the xAPI capable device in the organization and no other devices in the lab, an example being a phone.
    
    4.8.5 Select =="Start Deployment"==
    
    4.8.6 Ensure ==Run Deployment Now== is selected and select ==Next==.
    
    4.8.7 If any devices are offline you may receive a prompt letting your know that some of the devices are offline. 
    If this is case just select =="Yes"==.
    
    4.8.8 The message console will now let you see the deployment in progress and all output from the devices. 
    In this case what is returned is the system time running on the endpoints.
    
    <figure markdown="span">
      ![Message Console](images/5-2-8.png){ width="300" }
      <figcaption></figcaption>
    </figure>

    !!! Success
    
        This concludes this section. While this is a simple use case, any xAPI command can be run in this fashion 
        including multiline commands that contain a body section.

    ??? challenge "Running a xStatus Command"

        Now that you know how to run a xCommand, can you work out how to run a xStatus command?
        
        Find a command at [RoomOS](roomos.cisco.com)