{{ config.cProps.devNotice }}
## 4.13 Deploy xAPI command via the shell using CE-Deploy

!!! abstract

    The terminal is not only a crucial tool for administering Cisco collaboration endpoints 
    but also an important resource for exploring xAPIs. In this lab, we will use CE-Deploy's 
    terminal emulation feature to run a command. CE-Deploy is the swiss army knife of video endpoint
    deployments so lets keep exploring.

??? lesson "4.13 Lessons"

    4.13.1 From the ==local interface== in the deployment panel select ==Tools->SSH-TTY==.
    
    <figure markdown="span">
      ![SSH Options](images/4-13-1.png){ width="300" }
      <figcaption></figcaption>
    </figure>

    !!! warning

        This lab will only work if the endpoint and your PC/MAC running CE-Deploy are on the same 
        network.
    
    4.13.2  Add your endpoint local admin details, choose a theme and add the IP address 
    from the IP address challenge. 
    
    <figure markdown="span">
      ![SSH Window Options](images/4-13-2.png){ width="300" }
      <figcaption></figcaption>
    </figure>
    
    4.13.3 Select ==Connect==. The terminal will appear in a new Window and you can start 
    interacting with it.
    
    <figure markdown="span">
      ![Window](images/4-13-3.png){ width="300" }
      <figcaption></figcaption>
    </figure>

    !!! Success
    
        Once you have tried a few commands type in ==Bye== command and the window 
        will automatically close.