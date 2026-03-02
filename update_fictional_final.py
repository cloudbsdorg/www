import json

def update_locale(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# Fictional languages with better translations
tlh = {
  "nav": { "about": "ghot", "features": "SeH Qu'", "community": "ghom", "downloads": "Hegh" },
  "hero": { "title": "Platform Cloud chu'", "subtitle": "FreeBSD HoS, raD stability je lulo' cloud infrastructure luvut.", "learnMore": "vIghaj", "getStarted": "tagH" },
  "about": { "title": "nuq {{projectName}}?", "p1": "CloudBSD distribution FreeBSD ghot build, Jail, VM (Bhyve), OCI container je hosting environment robust provide design.", "p2": "System discovery, worker node installation automated, centralized management powerful Controller Service via focus." },
  "features": {
    "title": "SeH Qu'",
    "unifiedController": { "title": "SeH tay'", "desc": "network Hoch ghot wa' Daq SeH. Jail, VM, Container je SeH wa' Daq." },
    "smartWorkerNodes": { "title": "Worker Nodes ghop", "desc": "resource SeH orchestrated, PXE boot raD support, OS deployment effortless base je." },
    "nativeVirtualization": { "title": "Native Virtualization", "desc": "Bhyve VMM integration chu', high-performance virtual host, hardware passthrough je." },
    "secureIsolation": { "title": "Isolation quv", "desc": "FreeBSD-native Jail Bhyve je, isolation density HoS, security boundary je provide." },
    "gpuManagement": { "title": "GPU SeH", "desc": "hardware discovery chu', PCI passthrough support, GPU resource effectively manage share je." },
    "zfsSecurity": { "title": "ZFS-Native Security", "desc": "storage reliability industry-leading, data integrity, encryption support, instant snapshotting je." },
    "hardenedServices": { "title": "Services quv", "desc": "HTTPS mandatory, certificate management automated, insecure port automatic redirection je." },
    "rbac": { "title": "Role-Based Access", "desc": "User management centralized, SSH key distribution, role-based authorization je." },
    "ociSupport": { "title": "OCI Support", "desc": "Linux OCI container FreeBSD run, SeH orchestrated built-in je." },
    "discovery": { "title": "System Discovery", "desc": "hardware reporting automated, RAM, CPU, Disk, Network interface controller je." },
    "apiFirst": { "title": "API First", "desc": "management API chu', internal external system integration, automation je." }
  },
  "community": { "title": "ghom join", "connect": "Discord connect", "desc": "Help, idea, CloudBSD future contribute.", "join": "Server join" },
  "downloads": { "title": "Hegh", "comingSoon": "Soon", "stayTuned": "Doy'ich. stay tuned." },
  "footer": { "rights": "© 2026 {{companyName}}. rights reserved.", "projectBy": "Project by", "builtOn": "FreeBSD build · 3-Clause BSD License release" }
}

nav = {
  "nav": { "about": "Teri", "features": "Säpängxe", "community": "Olo'", "downloads": "Fpe" },
  "hero": { "title": "Cloud Platform of Pandora", "subtitle": "Harness Eywa-ur security a stability o FreeBSD cloud infrastructure lín.", "learnMore": "Tielo ach", "getStarted": "Hero" },
  "about": { "title": "Peu {{projectName}}?", "p1": "CloudBSD eltsu lolu FreeBSD-ur, fte lolu Jail, VM, OCI container hosting environment.", "p2": "Fte lu system discovery, automated worker nodes, centralized management Controller Service-ur." },
  "features": {
    "title": "Säpängxe",
    "unifiedController": { "title": "Unified Controller", "desc": "Fte lu central configuration point. Jail, VM, Container-ur SeH fte lu." },
    "smartWorkerNodes": { "title": "Smart Worker Nodes", "desc": "Resource management orchestrated, PXE boot support, base OS deployment effortless." },
    "nativeVirtualization": { "title": "Native Virtualization", "desc": "Bhyve VMM integration, high-performance virtual host, hardware passthrough." },
    "secureIsolation": { "title": "Secure Isolation", "desc": "FreeBSD-native Jail, Bhyve, high-density isolation, security boundaries." },
    "gpuManagement": { "title": "GPU Management", "desc": "Advanced hardware discovery, PCI passthrough support, GPU resource manage." },
    "zfsSecurity": { "title": "ZFS-Native Security", "desc": "Storage reliability, data integrity, encryption support, instant snapshots." },
    "hardenedServices": { "title": "Hardened Services", "desc": "Mandatory HTTPS, automated certificate management, insecure port redirection." },
    "rbac": { "title": "Role-Based Access", "desc": "Centralized user management, SSH key distribution, role-based authorization." },
    "ociSupport": { "title": "OCI Support", "desc": "Linux OCI container FreeBSD run, manage orchestrated built-in." },
    "discovery": { "title": "System Discovery", "desc": "Automated hardware reporting RAM, CPU, Disk, Network interface." },
    "apiFirst": { "title": "API First", "desc": "Exposed management API, internal external system integration, automation." }
  },
  "community": { "title": "Join Olo'", "connect": "Discord-ur connect", "desc": "Help, ideas, CloudBSD future contribute.", "join": "Server join" },
  "downloads": { "title": "Downloads", "comingSoon": "Coming Soon", "stayTuned": "Stay tuned." },
  "footer": { "rights": "© 2026 {{companyName}}. Rights reserved.", "projectBy": "Project by", "builtOn": "Built on FreeBSD" }
}

sjn = {
  "nav": { "about": "Teri", "features": "Säpängxe", "community": "Olo'", "downloads": "Fpe" },
  "hero": { "title": "Cloud Platform o Pandora", "subtitle": "Leithio i-ngul, i-varn, a i-thala o FreeBSD na cloud infrastructure lín.", "learnMore": "Tielo ach", "getStarted": "Hero" },
  "about": { "title": "Peu {{projectName}}?", "p1": "CloudBSD na distribution o FreeBSD, i-gasar na environment am-hosting Jails, VMs, a OCI containers.", "p2": "Focus na system discovery, automated worker nodes, a centralized management via Controller Service." },
  "features": {
    "title": "Säpängxe",
    "unifiedController": { "title": "Unified Controller", "desc": "Central configuration point. Jail, VM, Container-ur SeH fte lu." },
    "smartWorkerNodes": { "title": "Smart Worker Nodes", "desc": "Resource management orchestrated, PXE boot support, am-base OS deployment effortless." },
    "nativeVirtualization": { "title": "Native Virtualization", "desc": "Bhyve VMM integration, high-performance virtual host, a hardware passthrough." },
    "secureIsolation": { "title": "Secure Isolation", "desc": "FreeBSD-native Jails a Bhyve, high-density isolation, a security boundaries." },
    "gpuManagement": { "title": "GPU Management", "desc": "Advanced hardware discovery, PCI passthrough support, a GPU resource manage." },
    "zfsSecurity": { "title": "ZFS-Native Security", "desc": "Storage reliability, data integrity, encryption, a instant snapshots." },
    "hardenedServices": { "title": "Hardened Services", "desc": "Mandatory HTTPS, automated certificate management, a automatic redirection." },
    "rbac": { "title": "Role-Based Access", "desc": "Centralized user management, SSH key distribution, a role-based authorization." },
    "ociSupport": { "title": "OCI Support", "desc": "Run a manage Linux OCI containers sui FreeBSD na orchestration." },
    "discovery": { "title": "System Discovery", "desc": "Automated hardware reporting o RAM, CPU, Disks, a Network interfaces." },
    "apiFirst": { "title": "API First", "desc": "Exposed management APIs, internal a external system integration, a automation." }
  },
  "community": { "title": "Join Olo'", "connect": "Discord-ur connect", "desc": "Help, ideas, a contribute am-future o CloudBSD.", "join": "Server join" },
  "downloads": { "title": "Downloads", "comingSoon": "Coming Soon", "stayTuned": "Stay tuned." },
  "footer": { "rights": "© 2026 {{companyName}}. Rights reserved.", "projectBy": "Project by", "builtOn": "Built on FreeBSD" }
}

atl = {
  "nav": { "about": "Tir", "features": "Lekter", "community": "Gwem", "downloads": "Dep" },
  "hero": { "title": "Cloud Platform of Atlantis", "subtitle": "Harness the crystal power, security, and stability of FreeBSD.", "learnMore": "Lekter mor", "getStarted": "Tag" },
  "about": { "title": "Kem {{projectName}}?", "p1": "CloudBSD distribution FreeBSD-er, design environment for hosting Jails, VMs, OCI containers.", "p2": "Focus on system discovery, automated worker nodes, centralized management Controller Service." },
  "features": {
    "title": "Lekter",
    "unifiedController": { "title": "Unified Controller", "desc": "Central configuration point. Manage Jails, VMs, Containers from one place." },
    "smartWorkerNodes": { "title": "Smart Worker Nodes", "desc": "Resource management orchestrated, PXE boot support, base OS deployment." },
    "nativeVirtualization": { "title": "Native Virtualization", "desc": "Bhyve VMM integration, high-performance virtual host, hardware passthrough." },
    "secureIsolation": { "title": "Secure Isolation", "desc": "FreeBSD-native Jail, Bhyve, high-density isolation, security boundaries." },
    "gpuManagement": { "title": "GPU Management", "desc": "Advanced hardware discovery, PCI passthrough support, GPU resource manage." },
    "zfsSecurity": { "title": "ZFS-Native Security", "desc": "Storage reliability, data integrity, encryption, snapshots." },
    "hardenedServices": { "title": "Hardened Services", "desc": "Mandatory HTTPS, automated certificate management, automatic redirection." },
    "rbac": { "title": "Role-Based Access", "desc": "Centralized user management, SSH key distribution, role-based authorization." },
    "ociSupport": { "title": "OCI Support", "desc": "Linux OCI container FreeBSD run, manage orchestrated built-in." },
    "discovery": { "title": "System Discovery", "desc": "Automated hardware reporting RAM, CPU, Disk, Network interface." },
    "apiFirst": { "title": "API First", "desc": "Exposed management API, internal external system integration, automation." }
  },
  "community": { "title": "Join Gwem", "connect": "Discord connect", "desc": "Help, ideas, CloudBSD future contribute.", "join": "Server join" },
  "downloads": { "title": "Downloads", "comingSoon": "Coming Soon", "stayTuned": "Stay tuned." },
  "footer": { "rights": "© 2026 {{companyName}}. All rights reserved.", "projectBy": "Project by", "builtOn": "Built on FreeBSD" }
}

qvy = {
  "nav": { "about": "Kosty", "features": "Zaldrīzes", "community": "Gwem", "downloads": "Dep" },
  "hero": { "title": "Cloud Platform of the Dragon", "subtitle": "Harness the fire, security, and stability of FreeBSD.", "learnMore": "Lekter mor", "getStarted": "Tag" },
  "about": { "title": "Skorkydo {{projectName}}?", "p1": "CloudBSD distribution FreeBSD-er, design environment for hosting Jails, VMs, OCI containers.", "p2": "Focus on system discovery, automated worker nodes, centralized management Controller Service." },
  "features": {
    "title": "Zaldrīzes",
    "unifiedController": { "title": "Unified Controller", "desc": "Central configuration point. Manage Jails, VMs, Containers from one place." },
    "smartWorkerNodes": { "title": "Smart Worker Nodes", "desc": "Resource management orchestrated, PXE boot support, base OS deployment." },
    "nativeVirtualization": { "title": "Native Virtualization", "desc": "Bhyve VMM integration, high-performance virtual host, hardware passthrough." },
    "secureIsolation": { "title": "Secure Isolation", "desc": "FreeBSD-native Jail, Bhyve, high-density isolation, security boundaries." },
    "gpuManagement": { "title": "GPU Management", "desc": "Advanced hardware discovery, PCI passthrough support, GPU resource manage." },
    "zfsSecurity": { "title": "ZFS-Native Security", "desc": "Storage reliability, data integrity, encryption, snapshots." },
    "hardenedServices": { "title": "Hardened Services", "desc": "Mandatory HTTPS, automated certificate management, automatic redirection." },
    "rbac": { "title": "Role-Based Access", "desc": "Centralized user management, SSH key distribution, role-based authorization." },
    "ociSupport": { "title": "OCI Support", "desc": "Linux OCI container FreeBSD run, manage orchestrated built-in." },
    "discovery": { "title": "System Discovery", "desc": "Automated hardware reporting RAM, CPU, Disk, Network interface." },
    "apiFirst": { "title": "API First", "desc": "Exposed management API, internal external system integration, automation." }
  },
  "community": { "title": "Join Gwem", "connect": "Discord connect", "desc": "Help, ideas, CloudBSD future contribute.", "join": "Server join" },
  "downloads": { "title": "Downloads", "comingSoon": "Coming Soon", "stayTuned": "Stay tuned." },
  "footer": { "rights": "© 2026 {{companyName}}. All rights reserved.", "projectBy": "Project by", "builtOn": "Built on FreeBSD" }
}

dth = {
  "nav": { "about": "Teri", "features": "Lekter", "community": "Khalasar", "downloads": "Dep" },
  "hero": { "title": "Cloud Platform of the Stallion", "subtitle": "Harness the power, security, and stability of FreeBSD for your khalasar.", "learnMore": "Lekter mor", "getStarted": "Tag" },
  "about": { "title": "Fin {{projectName}}?", "p1": "CloudBSD distribution FreeBSD-er, design environment for hosting Jails, VMs, OCI containers.", "p2": "Focus on system discovery, automated worker nodes, centralized management Controller Service." },
  "features": {
    "title": "Lekter",
    "unifiedController": { "title": "Unified Controller", "desc": "One place to rule them all. Manage Jails, VMs, and Containers from one place." },
    "smartWorkerNodes": { "title": "Smart Worker Nodes", "desc": "Resource management orchestrated, PXE boot support, base OS deployment." },
    "nativeVirtualization": { "title": "Native Virtualization", "desc": "Bhyve VMM integration, high-performance virtual host, hardware passthrough." },
    "secureIsolation": { "title": "Secure Isolation", "desc": "FreeBSD-native Jail, Bhyve, high-density isolation, security boundaries." },
    "gpuManagement": { "title": "GPU Management", "desc": "Advanced hardware discovery, PCI passthrough support, GPU resource manage." },
    "zfsSecurity": { "title": "ZFS-Native Security", "desc": "Storage reliability, data integrity, encryption, snapshots." },
    "hardenedServices": { "title": "Hardened Services", "desc": "Mandatory HTTPS, automated certificate management, automatic redirection." },
    "rbac": { "title": "Role-Based Access", "desc": "Centralized user management, SSH key distribution, role-based authorization." },
    "ociSupport": { "title": "OCI Support", "desc": "Linux OCI container FreeBSD run, manage orchestrated built-in." },
    "discovery": { "title": "System Discovery", "desc": "Automated hardware reporting RAM, CPU, Disk, Network interface." },
    "apiFirst": { "title": "API First", "desc": "Exposed management API, internal external system integration, automation." }
  },
  "community": { "title": "Join Khalasar", "connect": "Discord connect", "desc": "Help, ideas, CloudBSD future contribute.", "join": "Server join" },
  "downloads": { "title": "Downloads", "comingSoon": "Coming Soon", "stayTuned": "Stay tuned." },
  "footer": { "rights": "© 2026 {{companyName}}. All rights reserved.", "projectBy": "Project by", "builtOn": "Built on FreeBSD" }
}

locales = {
  "tlh": tlh, "nav": nav, "sjn": sjn, "atl": atl, "qvy": qvy, "dth": dth
}

for code, data in locales.items():
    update_locale(f'src/locales/{code}.json', data)
