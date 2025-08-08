{{ config.labVariables.devNotice }}
# Download a Webex token and create an Environment in CE-Deploy

!!! abstract

    Environments enable an admin to download access and refresh tokens into CE-Deploys OS secure store, 
    which are refreshed daily. This feature is particularly useful for admins who need to access 
    multiple Control Hub instances. By utilizing environments, admins can streamline the deployment 
    process. Instead of logging into Webex everytime you need to perform a deployment you can simply select the appropriate 
    environment, load the token from the secure store, and perform the required deployment.

??? vidcast "Creating CE-Deploy Environments"

    <div style="padding-bottom:56.25%; position:relative; display:block; width: 100%">
	    <iframe src="https://app.vidcast.io/share/embed/8e846983-6528-46e9-9b95-7d1a3ae2f5b3" width="100%" height="100%" title="CE-Deploy Environments Training" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0;border: solid; border-radius:12px;"></iframe>
    </div>

??? lesson "4.7 Lessons"

    4.7.1 Open CE-deploy and select the Download Webex Token button in the manage token section
    
    <figure markdown="span">
      ![Download Token](images/5-1-1.png){ width="300" }
      <figcaption></figcaption>
    </figure>
    
    4.7.2 Sign in to Webex and accept the integration permissions when prompted. This will load 
    your token and refresh token into the default environment. This is not a persistent environment 
    so will want to save our tokens into the secure store for repeated use.

    <figure markdown="span">
      ![Webex Signin](images/5-1-2.png){ width="300" }
      <figcaption></figcaption>
    </figure>
    
    4.7.3 In the deployment features panel select =="Environment"==.
    
    <figure markdown="span">
      ![Environments](images/4-7-3.png){ width="300" }
      <figcaption></figcaption>
    </figure>
    
    4.7.4 In the environment name section, name your environment =="EnvLab"== and click =="save Environment"==.
    
    4.7.5 To load our new environment, use the dropdown in the Environment loading section and select your 
    new Environment  and select =="Load Environment"==.

    <figure markdown="span">
      ![Load Environment](images/4-7-5b.png){ width="300" }
      <figcaption></figcaption>
    </figure>
    
    4.7.6 You should now see your environment name populate the Environment Loaded text under manage Token.
    
    <figure markdown="span">
      ![Loaded Environment](images/5-1-6.png){ width="300" }
      <figcaption></figcaption>
    </figure>
    
    4.7.7 To test your token click the =="Test Token"== button. You should see the response below:
    
    <figure markdown="span">
      ![Test Token](images/5-1-7.png){ width="300" }
      <figcaption></figcaption>
    </figure>

    !!! Success
    
        Congrats, your token is now downloaded, you are ready to roll. You can build as many 
        Environments as you require. Whether you have a test and production Orgs or you are a 
        partner managing multiple customer Orgs this removes the need to always be logging in
        everytime you need to complete a deployment. The refresh token expires after 90 days so by
        keeping the app open you wont need to log in everytime you need to do a deployment.