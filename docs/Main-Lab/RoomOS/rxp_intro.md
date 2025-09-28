{{ config.cProps.devNotice }}
{{ config.cProps.acronyms }}

!!! important "Welcome"

    This section of the lab consists 3 main sections. 

    RoomOS xAPI will teach you to interact with the RoomOS xAPI stack from several different integration points, such as SSH, HTTP and Macros. The xAPI are the building blocks to help you bring your solution to life.

    RoomOS UserInterfaces will guide you through the customizable interfaces of the device. These pieces help you communicate with your users and build new experiences.

    Solution Exercises discusses best practices for developing any customization with the RoomOS xAPI and contains walkthroughs of real solutions for you to build leveraging what you learned from the RoomOS xAPI and UserInterfaces sections

<!-- !!! important "Abstract"

    Throughout the {{ config.cProps.rxp.name }} section, we'll run through many examples on how you can interface with your Codec's xAPI through the following integration methods

    - - -

    | **Integration Method** | **Port** | **Common Field Uses**                                                                                                                      |
    |------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------|
    | SSH                    | 22       | AV Room Controllers [Room Automation]                                                                                                      |
    | HTTP                   | 80/443   | AV Room Controllers [Room Automation], Telepresence Management Suite (TMS[EoL]), 3rd Party Management Systems and/or Analytics             |
    | WebHooks               | 80/443   | Telepresence Management Suite (TMS[EoL]), 3rd Party Management Systems and/or Analytics                                                    |
    | WebSockets             | 80/443   | AV Room Controllers [Room Automation], Web Applications, Webex Control Hub, 3rd Party Management Systems and/or AnalyticsWeb Applications, |
    | Cloud xAPI             | 80/443   | Web Applications,  Webex Control Hub, 3rd Party Management Systems and/or Analytics                                                        |
    | Macros                 | Local    | Room Automation                                                                                                                            |

    Some topics that aren't covered in this lab are the following Integration Methods

    | **Integration Method**     | **Common Field Uses**                                                                                                  | Closest Integration Method and Differences                                                                                                                                                                                                                                   |
    |----------------------------|------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | Serial Rs232               | AV Room Controllers [Room Automation], Non-Networked AV solutions                                                      | SSH - Serial Rs232 interacts with the terminal in the same way as SSH, but requires additional configurations on the Codec and String Terminators to complete the instruction set                                                                                |
    | jsxapi [Javascript Module] | AV Room Controllers [Room Automation], Web Applications, 3rd Party Management Systems and/or AnalyticsWeb Applications | Macros - Macros are a derivative of the jsxapi. Syntax is largely the same, except the added steps to establish an SSH or WebSocket Connection. Following the SSH, WebSocket and Macro Lessons will teach you format and communication that the jsxapi relies on |
    | Workspace Integrations     | Web Applications,  Webex Control Hub, 3rd Party Management Systems and/or Analytics                                    | Cloud xAPI - WorkSpace integrations functions as the Subscription mechanism for Cloud xAPI. There isn't a close example in this lab, but it a worthwhile topic on it's own to explore for solutions that scale in a cloud environment                            |

    - - -

    As you move forward in {{ config.cProps.rxp.name }}, we'd love for you to cover all integration methods outlined throughout {{ config.cProps.rxp.name }}, but we understand it may be alot of information to take in

    At a minimum, if you could review sections before the 90 minutes concludes

    - SSH ^{{config.cProps.rxp.sectionIds.ssh}}^
    - HTTP ^{{config.cProps.rxp.sectionIds.http}}^
    - Macros ^{{config.cProps.rxp.sectionIds.macro}}^

    These will lay the base ground work when it comes to building your First Automation and Deployment, which will be covered in the remainder of the lab

    !!! Note

        Each Section has a `Cleanup` Process. These are important when moving from each integration method

        It requires you to have an active SSH session against the endpoint, so once you're done with section within {{ config.cProps.rxp.name }}, keep that terminal session alive

    Time Permitting, certainly check out the sections on WebSockets ^{{config.cProps.rxp.sectionIds.websocket}}^ and Webex Cloud ^{{config.cProps.rxp.sectionIds.cloud}}^

    Every integration method serves a purpose, whether your a customer optimizing your workflow, an integrator wanting a deeper understanding on how all these pieces connect or a partner wanting to building new opportunities for your business with Cisco RoomOS Devices -->