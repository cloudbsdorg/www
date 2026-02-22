# 

# What will be CloudBSD?

\*Note\* This is the large scale plan, features will be determined per release cycle.  
\*Note\* Not all thoughts have been expressed yet. 

Make use of FreeBSD

- Create custom builds  
  - Controller Server  
    - Give options to install  
      - All  services  
      - Selected services   
  - Worker Node  
    - A worker node will host assets (Jails, VMs, OCI containers)  
    - Should be configured to boot via network by default  
  - Network Boot  
    - System discovery  
      - Discover system resources  
        - Report all results back to a controller service  
        - RAM  
          - Type  
          - Capacity  
        - CPU  
          - Core count  
          - Speed  
          - CPU extensions  
        - Disks  
          - Types  
            - HDD  
            - SSD  
            - NVMe  
          - RAID Cards  
            - Virtual Volumes  
              - Size  
              - Composition of disks  
        - Network interfaces  
          - Type  
          - Speed  
          - MAC addresses  
        - GPU  
          - Type  
          - Hardware resources and limitations  
            - Share the GPU somehow  
        - Other PCI devices  
    - Installation as a worker node

- Utilize Bhyve VMM to run virtual hosts  
- Utilize Jails  to run FreeBSD based hosts

Installation Media

- Create installation media  
  - Primary install modes  
    - Normal Controller server  
    - Selected services  
      - Require a controller server for registration  
    - Worker Node server  
      - Require a controller server for registration  
  - Package formats  
- ISO  
- IMG  
- Netboot package  
  - As worker node

Services: 

- Controller Server(s)  
  - A controller server will be the main configuration point , or primary service provider and have definitions of the assets (Jail, VM, container)  
  - Potential use of AMQP system to coordinate with the rest of the network  
  - Utilize a RDBMS for configuration  
    - Maybe mongo for dynamic object store?  
- Worker Node Server  
  - Will have an orchestration service to manage resources  
  - Will utilize PXE boot primarily to install “base” OS  
    - Make an option on installation media  
  - Potential use of AMQP system to coordinate with the rest of the network  
- All HTTPS / Secure Services   
  - Possibly execute in a jail  
  - All insecure ports are redirected to their complementary secure ports for a given service.   
  - Generate a self signed certificate upon initialization of system  
  - Where possible, present a means to use Letsencrypt or other certificate services  
  - Also provide a way to upload certificates from other vendors  
- DHCP Server  
  - Possibly execute in a jail  
  - May run on a separate system  
  - Used to define management network for all participating nodes  
  - New nodes will be directed to install CloudBSD worker node  
- PXE Boot service  
  - Possibly execute in a jail  
  - May run on a separate system  
  - To work in tandem with DHCP server  
  - Will be used to deploy a worker node configured version of CloudBSD  
- Exposed Management API for internal and external systems  
- Orchestrator  
  - This service will run as root  
  - Must execute on bare metal  
  - Will utilize a queue to perform tasks (FIFO)  
  - This will perform tasks that require root privileges  
    - CRUD on an asset (Jail, VM, Container)l  
    - Modify network settings  
  - This service will only be accessible via localhost or AMQP  
  - Will re-balance assets of type virtual and jail  
  - Will pair with controller servers  
  - Will get commands from authorized management services  
  - Will provide metrics and status to core services  
  - Will collect and distribute SSH keys to systems for management purposes  
- Terminal Command: cloudie  
  - Inspired by juju (Ubuntu)  
  - Will have to authenticate like git on the CLI  
  - Will be able to manage the entire cluster  
    - Take tags into consideration for all actions  
    - CRUD on an asset (Jail, VM, Container)  
    - Install packages on an asset  
    - Get the state of an asset  
- Web Based Management Interface  
  - Possibly execute in a jail  
- HTTPS Admin dashboard with control panel service  
  - HTTP forwarded to HTTPS  
  - Services must drop down to a safe user once root level resources are acquired.  
  - All actions must be placed in a queue  
  - User management  
    - SSH key management   
    - System Authorization  
    - Role assignments  
  - Role management  
  - Storage Management  
    - By default, everything will utilize ZFS on a controller and worker node  
    - Look into GlusterFS for block storage  
      - https://www.gluster.org/  
- Bhyve Virtual Machine Management  
  - Make sure to validate CPU extensions  
  - CRUD on a Virtual Machine  
    - Apply tags to assets  
      - OS  
      - User defined  
    - PCI Passthru management  
      - Statically link a device on a worker node  
      - Dynamically link a device (class) on a worker node  
        - Validate that the device is unallocated  
  - Network management  
    - Virtual Interface management  
    - Manage Network interfaces  
    - Manage Bridge & TAP interfaces interfaces  
  - Export Virtual machine disk  
  - Import a virtual machine disk  
- Jail Management  
  - CRUD on a Jail  
    - Apply tags to assets  
      - OS  
      - User defined  
  - Network interface management for a Jail  
  - Export Jail package  
  - Import a Jail package  
- Docker Management  
  - Define a primary docker VM   
    - ClearOS from intel to be base image?  
    - Define Docker Swarm  
      - CRUD for VMs to be part of the swarm  
    - CRUD controls on a Docker system/swarm  
      - CRUD on Docker images  
        - Ability to tag docker images  
- System status  
- Worker node management  
  - Maintenance  
    - Disk management  
      - Wipe  
    - Shared devices (For PCI passthrough)  
  - Configuration and Power Management  
    - Support for the following Protocols  
      - IPMI  
      - AMT  
      - etc..  
    - Power Control  
    - Configuration  
      - Boot  
      - Disks  
    - IPKVM  
- Network diagram(s)  
- DHCP management  
- System Management  
  - IPMI  
  - AMT  
  - etc.  
- PXE Boot Management  
  - Make provisions to have systems be bootable to other OS’s, be usable beyond worker nodes  
- Plugins  
  - Have the ability to install plugins

CloudBSD Services:

Website

- Promotion  
- About  
- Download area  
- User guides

Community:

- Update services  
- Web Services  
  - Free Marketplace  
    - Community Plugins  
    - Community Service recipes  
      - Base systems  
      - Where to download ISOs or other images  
        - Eventually make a fallback ISO image server  
    - Community Packaged Services  
      - Jail Deployment  
      - Virtual Machine Deployment

Commercial:

- Premium Plugins  
- Includes community services  
- Potential premium update services  
- Consulting  
- Integration  
- Web Services  
  - License management  
    - All controller servers will need to register, and report utilization  
      - Abusers will be shut off  
  - Marketplace  
    - Premium service recipes 		  
    - Premium Packaged Services  
      - Jail Deployment  
      - Virtual Machine Deployment  
    - Premium Services packaged in virtual machines


  # Beyond the CloudBSD Distribution:

- Continuous integration  
  - Licensed featureset  
  - Create a plugin for IDEs’ and build systems to utilize a CloudBSD cluster  
  - This will be an effort to replicate the actual operating environment.  
  - Each user of the CI services should get an isolated instance of the systems under test.  
  - Find a way in each language to describe the following  
    - Test systems  
      - Configuration of test systems  
        - System resources  
          - CPU  
          - Disk  
          - RAM  
          - Network Speed  
      - Services on test systems  
        - Configuration of services  
      - Test data for the system  
      - External data sources  
      - Internal data sources   
    - Group test systems to create a staging ground  
    - The network(s) to utilize  
      - This will be optional for the user