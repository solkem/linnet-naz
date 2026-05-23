const STORAGE_KEY = "ictd_prep_state_v1";

const domains = [
  {
    id: "ict4d",
    label: "ICT4D Frameworks",
    summary:
      "Show that you can align technology choices to development outcomes, local ownership, and sustainability in field conditions.",
    interviewerFocus: [
      "How you apply people-centered design in low-connectivity environments.",
      "How you choose platforms that can be maintained locally after donor/project cycles.",
      "How you prevent harm from poorly governed digital systems.",
    ],
    mustKnow: [
      "Principles for Digital Development (refreshed in 2024) and their practical implications.",
      "Interoperability and reuse instead of creating isolated tools.",
      "Inclusion and accessibility by default, not as post-launch fixes.",
    ],
    drills: [
      "Design a digital rollout checklist for one district with offline constraints.",
      "Draft a one-page governance note defining local ownership and support model.",
      "Map one nutrition workflow from data capture to action and identify exclusion risks.",
    ],
    redFlags: [
      "Jumping to tools before understanding existing ecosystem and actors.",
      "Ignoring long-term support costs, data stewardship, and user training.",
      "No explicit harm-mitigation plan for vulnerable populations.",
    ],
  },
  {
    id: "meal",
    label: "MEAL + Reporting",
    summary:
      "Demonstrate that IT systems can strengthen monitoring, accountability, learning, and evidence quality for program decisions.",
    interviewerFocus: [
      "How system design improves timeliness, completeness, and reliability of field data.",
      "How accountability mechanisms (feedback loops, complaints, traceability) are digitized.",
      "How analytics outputs serve both operations and learning decisions.",
    ],
    mustKnow: [
      "OECD DAC evaluation criteria: relevance, coherence, effectiveness, efficiency, impact, sustainability.",
      "CHS quality/accountability commitments and why they matter for data systems.",
      "UNICEF/UNEG expectations for credible, useful, transparent evaluation evidence.",
    ],
    drills: [
      "Create a data flow from Kobo collection to district dashboard and monthly review meeting.",
      "Define 5 data quality checks (duplicates, outliers, missing fields, lag, inconsistent codes).",
      "Write a reporting template that links indicator movement to corrective action.",
    ],
    redFlags: [
      "Collecting data without a learning or decision-use pathway.",
      "No mechanism for communities to challenge or validate reported results.",
      "Treating MEAL as separate from IT architecture.",
    ],
  },
  {
    id: "database",
    label: "Database Programming",
    summary:
      "Prove you can design and operate reliable SQL-backed systems with strong access control and predictable concurrency behavior.",
    interviewerFocus: [
      "How you model transactions, constraints, and auditability for reporting systems.",
      "How you prevent SQL injection and privilege escalation.",
      "How you partition user roles and enforce least privilege.",
    ],
    mustKnow: [
      "Isolation levels and concurrency anomalies (dirty/nonrepeatable/phantom/serialization).",
      "Role creation and role-based privilege design (`CREATE ROLE`, `GRANT`, scoped access).",
      "Parameterized queries, backup/restore strategy, and secure credential handling.",
    ],
    drills: [
      "Write SQL for monthly nutrition indicators with safe joins and filtering.",
      "Create role matrix: data entry, M&E analyst, admin, and auditor.",
      "Simulate two concurrent updates and explain isolation-level impact.",
    ],
    redFlags: [
      "Using shared superuser credentials in production systems.",
      "No backup restore test history.",
      "String-concatenated SQL or weak input validation.",
    ],
  },
  {
    id: "secure",
    label: "Secure Architecture",
    summary:
      "Show you can protect sensitive program data while preserving reporting usefulness and operational continuity.",
    interviewerFocus: [
      "How security controls are integrated into design, not added after incidents.",
      "How data-in-transit and data-at-rest protections are enforced.",
      "How logs and incident response workflows support accountability.",
    ],
    mustKnow: [
      "NIST CSF 2.0 core functions with Govern added to risk lifecycle.",
      "OWASP Top 10 categories and concrete mitigation habits.",
      "Database hardening: encrypted connections, strict auth, segmentation, minimal privileges.",
    ],
    drills: [
      "Draft a mini threat model for district reporting stack.",
      "Define log sources and alert thresholds for suspicious data access.",
      "Design an incident runbook from detection to lessons learned.",
    ],
    redFlags: [
      "No governance ownership for cyber risk decisions.",
      "Open database ports and weak network boundaries.",
      "No tested incident escalation and communication protocol.",
    ],
  },
  {
    id: "network",
    label: "Network Admin",
    summary:
      "Communicate clear network fundamentals and practical troubleshooting under field conditions with unreliable links.",
    interviewerFocus: [
      "IP addressing and segmentation choices for branch or clinic environments.",
      "DHCP/DNS behavior and basic routing diagnostics.",
      "Layered troubleshooting discipline using OSI logic.",
    ],
    mustKnow: [
      "RFC 1918 private ranges and when/why to use them.",
      "DHCP client-server model and allocation methods (automatic/dynamic/manual).",
      "Structured OSI troubleshooting from physical to application layers.",
    ],
    drills: [
      "Explain subnetting choice for a 3-site program office deployment.",
      "Trace connectivity issue from cabling to switch/route table to service check.",
      "Document a fallback process for intermittent WAN at district offices.",
    ],
    redFlags: [
      "Skipping physical checks and jumping directly to app blame.",
      "No baseline documentation for IP plan and network ownership.",
      "No alerting/visibility for recurring packet loss or congestion.",
    ],
  },
  {
    id: "support",
    label: "System Support",
    summary:
      "Demonstrate calm, methodical support behavior that restores service quickly and captures lessons for prevention.",
    interviewerFocus: [
      "How you triage incidents by impact and urgency.",
      "How you gather evidence before changes in production systems.",
      "How you communicate updates to non-technical stakeholders.",
    ],
    mustKnow: [
      "Incident lifecycle: detect, contain, restore, validate, learn.",
      "Change control discipline for patching and configuration updates.",
      "User support metrics: response time, resolution time, recurrence rate.",
    ],
    drills: [
      "Write a 15-minute outage update note for management and field teams.",
      "Create a simple support escalation matrix by severity.",
      "Run one post-incident review template with root-cause and actions.",
    ],
    redFlags: [
      "Untracked changes during active incidents.",
      "No post-incident learning loop.",
      "Technical updates that ignore operational implications.",
    ],
  },
  {
    id: "hardware",
    label: "Hardware + Troubleshooting",
    summary:
      "Show practical capability to integrate and maintain field hardware assets with minimal downtime.",
    interviewerFocus: [
      "Device readiness: power, storage, accessories, and environmental constraints.",
      "How hardware faults are isolated from network or software causes.",
      "Asset reliability planning for remote implementation sites.",
    ],
    mustKnow: [
      "Bottom-up fault isolation: power, cable, interface, switch, route, service.",
      "Spare strategy for critical components in remote offices.",
      "Preventive maintenance routines and audit trails for replacements.",
    ],
    drills: [
      "Create a hardware acceptance checklist for new tablets and routers.",
      "Simulate field failure and write a swap-and-verify procedure.",
      "Design a monthly maintenance tracker with failure categories.",
    ],
    redFlags: [
      "No inventory visibility for high-risk single points of failure.",
      "No documented replacement process.",
      "Treating repeated device failures as isolated events.",
    ],
  },
];

const questions = [
  {
    domain: "ict4d",
    question: "The Principles for Digital Development were refreshed in which year?",
    options: ["2020", "2022", "2024", "2026"],
    answer: 2,
    explanation:
      "The framework was refreshed in 2024 to reflect broader digital ecosystem realities and risk management concerns.",
  },
  {
    domain: "ict4d",
    question: "Which principle best prevents building tools that local teams cannot maintain?",
    options: ["Build for sustainability", "Design for branding", "Move fast and ship", "Centralize all decisions"],
    answer: 0,
    explanation:
      "Sustainability pushes teams to plan realistic ownership, support, financing, and long-term operations.",
  },
  {
    domain: "ict4d",
    question: "What is the best first step before choosing a new field data platform?",
    options: [
      "Buy the most popular platform",
      "Map the existing ecosystem and workflows",
      "Train everyone immediately",
      "Rewrite all indicators",
    ],
    answer: 1,
    explanation:
      "ICT4D choices should begin with context mapping: existing actors, systems, constraints, and risks.",
  },
  {
    domain: "ict4d",
    question: "A strong ICT4D answer on inclusion should mention:",
    options: ["Only smartphone users", "Only urban users", "Language, accessibility, and digital literacy barriers", "Color theme choices"],
    answer: 2,
    explanation:
      "Interviewers expect explicit inclusion strategies, especially for low-literacy and underserved groups.",
  },
  {
    domain: "meal",
    question: "Which list matches OECD DAC evaluation criteria?",
    options: [
      "Speed, automation, uptime, scale, novelty, growth",
      "Relevance, coherence, effectiveness, efficiency, impact, sustainability",
      "Access, backup, logging, routing, coding, indexing",
      "Policy, procedure, audit, risk, incident, closure",
    ],
    answer: 1,
    explanation:
      "These six criteria are widely used in development evaluations and should inform program reporting quality.",
  },
  {
    domain: "meal",
    question: "The CHS highlights how many commitments to people affected by crises?",
    options: ["5", "7", "9", "12"],
    answer: 2,
    explanation: "CHS 2024 describes nine commitments linked to quality and accountability.",
  },
  {
    domain: "meal",
    question: "Best indicator that a digital MEAL system is healthy:",
    options: [
      "It collects many indicators",
      "Data is timely, reviewed, and leads to documented decisions",
      "Only HQ can access it",
      "It has no error checks",
    ],
    answer: 1,
    explanation:
      "MEAL systems are valuable when evidence is actively used for adaptation and accountability.",
  },
  {
    domain: "meal",
    question: "UNICEF evaluation policy emphasizes evaluations should be:",
    options: [
      "Independent, credible, useful, and transparent",
      "Fully automated and anonymous",
      "Private to one department",
      "Focused only on budgets",
    ],
    answer: 0,
    explanation:
      "UNICEF aligns with UNEG norms around independence, credibility, utility, and transparency.",
  },
  {
    domain: "database",
    question: "PostgreSQL transaction isolation levels are designed to manage:",
    options: ["File storage size", "Concurrent data access anomalies", "UI rendering speed", "Disk encryption algorithms"],
    answer: 1,
    explanation:
      "Isolation levels control how concurrent transactions see changes and prevent anomalies like dirty reads.",
  },
  {
    domain: "database",
    question: "Which command creates a role in PostgreSQL?",
    options: ["ADD USER", "CREATE ROLE", "NEW ACCOUNT", "GRANT USER"],
    answer: 1,
    explanation: "`CREATE ROLE` is the primary SQL command for role creation and privilege architecture.",
  },
  {
    domain: "database",
    question: "What is the safest default for application DB access in production?",
    options: ["Use superuser", "Use shared root account", "Use least-privilege service role", "Disable authentication"],
    answer: 2,
    explanation:
      "Least-privilege service accounts reduce blast radius and support auditable access boundaries.",
  },
  {
    domain: "database",
    question: "Best protection against SQL injection in application code:",
    options: ["String concatenation", "Prepared statements/parameterized queries", "Client-side validation only", "Hiding error messages"],
    answer: 1,
    explanation:
      "OWASP recommends parameterized queries as a primary defense against SQL injection.",
  },
  {
    domain: "secure",
    question: "What function was added in CSF 2.0 to complement Identify/Protect/Detect/Respond/Recover?",
    options: ["Govern", "Patch", "Harden", "Comply"],
    answer: 0,
    explanation:
      "NIST CSF 2.0 added Govern to elevate cybersecurity strategy and risk ownership at leadership level.",
  },
  {
    domain: "secure",
    question: "OWASP Top 10 A01 (2021) is:",
    options: ["Broken Access Control", "Injection", "Security Misconfiguration", "SSRF"],
    answer: 0,
    explanation: "A01 in OWASP Top 10:2021 is Broken Access Control.",
  },
  {
    domain: "secure",
    question: "A strong database transport security baseline includes:",
    options: ["Plain TCP only", "TLS-enforced connections and cert validation", "No authentication for localhost", "Shared admin password"],
    answer: 1,
    explanation:
      "OWASP database guidance recommends encrypted transport (TLS 1.2+) with certificate validation.",
  },
  {
    domain: "secure",
    question: "NIST SP 800-61 incident guidance frames handling from:",
    options: [
      "Only detection to closure",
      "Initial preparation through post-incident lessons learned",
      "Only recovery",
      "Only prevention",
    ],
    answer: 1,
    explanation:
      "NIST incident guidance emphasizes full lifecycle handling, including preparation and post-incident learning.",
  },
  {
    domain: "network",
    question: "Which is a private IPv4 range from RFC 1918?",
    options: ["8.8.8.0/24", "10.0.0.0/8", "100.64.0.0/10", "172.32.0.0/16"],
    answer: 1,
    explanation: "RFC 1918 reserves 10/8, 172.16/12, and 192.168/16 for private addressing.",
  },
  {
    domain: "network",
    question: "DHCP is fundamentally based on what model?",
    options: ["Peer-to-peer", "Ring", "Client-server", "Broadcast-only"],
    answer: 2,
    explanation:
      "RFC 2131 describes DHCP as a client-server model for configuration and address allocation.",
  },
  {
    domain: "network",
    question: "RFC 2131 describes three allocation modes. Which option is correct?",
    options: ["Static, mirrored, cached", "Automatic, dynamic, manual", "Short, medium, long", "Direct, indirect, hybrid"],
    answer: 1,
    explanation:
      "The three DHCP allocation approaches are automatic, dynamic, and manual.",
  },
  {
    domain: "network",
    question: "A /27 subnet has how many usable host IP addresses?",
    options: ["14", "30", "62", "126"],
    answer: 1,
    explanation: "A /27 has 32 total addresses; subtract network and broadcast = 30 usable.",
  },
  {
    domain: "support",
    question: "During an outage, what should be communicated first to stakeholders?",
    options: ["Blame assignment", "Scope, impact, and next update time", "Raw logs only", "No updates until solved"],
    answer: 1,
    explanation:
      "Clear impact-based communication and predictable update cadence build trust and coordination.",
  },
  {
    domain: "support",
    question: "Best immediate action when many users suddenly cannot access a critical app:",
    options: ["Patch production immediately", "Verify scope and triage severity", "Rebuild all servers", "Close all tickets"],
    answer: 1,
    explanation: "Scope verification and severity triage guide safe and efficient incident response.",
  },
  {
    domain: "support",
    question: "Post-incident review should include:",
    options: ["Only technical logs", "Root cause, timeline, and preventive actions", "Only affected usernames", "Only SLA penalty"],
    answer: 1,
    explanation:
      "Effective reviews connect root cause to measurable prevention actions and owners.",
  },
  {
    domain: "support",
    question: "A recurring support issue with temporary fixes each week indicates:",
    options: ["Healthy operations", "Unnecessary escalation", "Need for problem management/root-cause work", "User behavior only"],
    answer: 2,
    explanation: "Repeated incidents usually require deeper root-cause analysis and structural fixes.",
  },
  {
    domain: "hardware",
    question: "Cisco troubleshooting guidance in this context recommends starting with:",
    options: ["Application logs only", "Physical layer checks then Layer 2/3 validation", "DNS cache flush", "Reinstalling software"],
    answer: 1,
    explanation:
      "A disciplined bottom-up path (cabling, switches, routing) avoids false assumptions.",
  },
  {
    domain: "hardware",
    question: "Which practice reduces downtime in remote field deployments?",
    options: ["Single spare for all sites", "Documented spares + swap procedure", "No asset register", "Centralized ad-hoc replacement"],
    answer: 1,
    explanation:
      "Prepared spare strategy and replacement workflow are essential where logistics are slow.",
  },
  {
    domain: "hardware",
    question: "If a field tablet repeatedly fails to upload forms, you should first:",
    options: ["Delete all submissions", "Check power/storage/network state and app logs", "Factory reset immediately", "Disable sync"],
    answer: 1,
    explanation:
      "Preserve evidence and isolate likely causes before destructive actions.",
  },
  {
    domain: "hardware",
    question: "A robust hardware maintenance record should track:",
    options: ["Only purchase date", "Serials, fault type, fix date, owner, status", "Only model number", "Only warranty provider"],
    answer: 1,
    explanation:
      "Consistent lifecycle records support faster troubleshooting and replacement decisions.",
  },
];

const scenarios = [
  {
    id: "scenario_1",
    title: "District Nutrition Dashboard Discrepancy",
    prompt:
      "A district dashboard shows a 40% drop in severe acute malnutrition (SAM) cases compared to last month. Field teams suspect under-reporting due to delayed Kobo submissions and connectivity issues. Explain your response plan.",
    criteria: [
      {
        name: "Triage and verification",
        keywords: ["scope", "timeline", "verify", "triage", "cross-check"],
        weight: 20,
        tip: "Define scope quickly and validate whether the drop is real or a data pipeline issue.",
      },
      {
        name: "Data quality controls",
        keywords: ["completeness", "missing", "duplicates", "outlier", "validation"],
        weight: 20,
        tip: "Call out concrete data-quality checks before making program conclusions.",
      },
      {
        name: "Network/system remediation",
        keywords: ["connectivity", "offline", "sync", "queue", "escalate"],
        weight: 20,
        tip: "Address transport and synchronization bottlenecks with actionable steps.",
      },
      {
        name: "MEAL and accountability",
        keywords: ["meal", "learning", "accountability", "feedback", "community"],
        weight: 20,
        tip: "Connect your technical fix to accountability and learning loops.",
      },
      {
        name: "Reporting and governance",
        keywords: ["update", "stakeholder", "risk", "decision", "owner"],
        weight: 20,
        tip: "Provide communication cadence, decision owners, and risk statements.",
      },
    ],
  },
  {
    id: "scenario_2",
    title: "Unauthorized Database Access Alert",
    prompt:
      "Audit logs show repeated failed logins followed by a successful privileged login from an unusual IP. Reporting tables contain PII-linked beneficiary records. Walk through your incident handling actions.",
    criteria: [
      {
        name: "Containment",
        keywords: ["contain", "revoke", "disable", "isolate", "credential"],
        weight: 25,
        tip: "Prioritize account/session containment and access restriction.",
      },
      {
        name: "Forensics and evidence",
        keywords: ["logs", "timeline", "forensic", "evidence", "preserve"],
        weight: 20,
        tip: "Capture and preserve logs/evidence before disruptive changes.",
      },
      {
        name: "PII protection",
        keywords: ["pii", "confidentiality", "disclosure", "risk", "notification"],
        weight: 20,
        tip: "Explicitly address confidentiality risk and incident communication obligations.",
      },
      {
        name: "Root cause and hardening",
        keywords: ["root cause", "least privilege", "mfa", "pg_hba", "patch"],
        weight: 20,
        tip: "Identify likely control gap and list targeted hardening actions.",
      },
      {
        name: "Post-incident learning",
        keywords: ["lessons", "runbook", "review", "owner", "deadline"],
        weight: 15,
        tip: "Close with lessons learned and assigned preventive tasks.",
      },
    ],
  },
  {
    id: "scenario_3",
    title: "Branch Office Hardware Failure During Reporting Week",
    prompt:
      "A branch office router fails during monthly reporting. Staff can collect data offline but cannot submit. Explain how you keep reporting reliable while restoring service.",
    criteria: [
      {
        name: "Operational continuity",
        keywords: ["offline", "fallback", "manual", "continuity", "workaround"],
        weight: 20,
        tip: "Protect continuity first so field data collection does not stop.",
      },
      {
        name: "Technical troubleshooting flow",
        keywords: ["physical", "layer 2", "layer 3", "routing", "diagnose"],
        weight: 25,
        tip: "Use a layered troubleshooting sequence instead of random interventions.",
      },
      {
        name: "Asset and spare strategy",
        keywords: ["spare", "inventory", "swap", "serial", "maintenance"],
        weight: 20,
        tip: "Show preparedness with replacement assets and recordkeeping.",
      },
      {
        name: "Data integrity safeguards",
        keywords: ["sync", "timestamp", "duplicate", "validation", "reconcile"],
        weight: 20,
        tip: "Prevent duplicated or lost submissions during delayed synchronization.",
      },
      {
        name: "Stakeholder communication",
        keywords: ["eta", "update", "risk", "management", "field team"],
        weight: 15,
        tip: "Set clear ETA, status updates, and risk statements.",
      },
    ],
  },
];

const sources = [
  {
    title: "NAZ Mission and Context",
    note: "Mission/vision and program context for tailoring interview prep relevance.",
    url: "https://naz.co.zw/who-we-are/",
  },
  {
    title: "Principles for Digital Development",
    note: "Nine principles and 2024 refresh used for ICT4D competency framing.",
    url: "https://digitalprinciples.org/",
  },
  {
    title: "CHS 2024",
    note: "Nine commitments for accountability and quality in crisis-affected contexts.",
    url: "https://www.corehumanitarianstandard.org/the-standard",
  },
  {
    title: "OECD DAC Evaluation Criteria",
    note: "MEAL-aligned evaluation lenses (relevance through sustainability).",
    url: "https://www.oecd.org/en/topics/sub-issues/development-co-operation-evaluation-and-effectiveness/evaluation-criteria.html",
  },
  {
    title: "UNICEF Evaluation Policy (2023)",
    note: "Independent, credible, useful, transparent evaluation expectations.",
    url: "https://www.unicef.org/evaluation/unicef-evaluation-policy",
  },
  {
    title: "NIST CSF 2.0 Release",
    note: "Six core functions including the added Govern function.",
    url: "https://www.nist.gov/news-events/news/2024/02/nist-releases-version-20-landmark-cybersecurity-framework",
  },
  {
    title: "OWASP Top 10:2021",
    note: "Security risk categories for application and data-system design.",
    url: "https://owasp.org/Top10/2021/",
  },
  {
    title: "OWASP Database Security Cheat Sheet",
    note: "Least privilege, encrypted DB transport, segmentation, and hardening guidance.",
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html",
  },
  {
    title: "PostgreSQL Transaction Isolation",
    note: "Concurrency anomalies and isolation-level behavior for robust reporting systems.",
    url: "https://www.postgresql.org/docs/current/transaction-iso.html",
  },
  {
    title: "PostgreSQL CREATE ROLE",
    note: "Role-based access design basics for secure database governance.",
    url: "https://www.postgresql.org/docs/current/sql-createrole.html",
  },
  {
    title: "PostgreSQL pg_hba.conf",
    note: "Host-based authentication control for connection policy enforcement.",
    url: "https://www.postgresql.org/docs/current/auth-pg-hba-conf.html",
  },
  {
    title: "RFC 1918 Private Address Space",
    note: "Private IPv4 ranges and inter-network routing constraints.",
    url: "https://www.rfc-editor.org/rfc/rfc1918",
  },
  {
    title: "RFC 2131 DHCP",
    note: "Client-server DHCP model and allocation methods.",
    url: "https://www.rfc-editor.org/rfc/rfc2131",
  },
  {
    title: "Cisco Troubleshooting Methodology",
    note: "Layered troubleshooting guidance from physical through higher OSI layers.",
    url: "https://www.cisco.com/cisco/web/docs/iam/unified/ipt611/System_Troubleshooting_Methodology.html",
  },
  {
    title: "KoboToolbox Data Collection",
    note: "Web forms + KoboCollect workflows with offline support.",
    url: "https://support.kobotoolbox.org/data-collection-tools.html",
  },
  {
    title: "DHIS2 Tracker + Aggregate Integration",
    note: "Approaches for integrating individual-level and aggregate health data.",
    url: "https://docs.dhis2.org/en/implement/maintenance-and-use/tracker-and-aggregate-data-integration.html",
  },
  {
    title: "NIST SP 800-61 Incident Response Guidance",
    note: "Lifecycle thinking from preparation through post-incident learning.",
    url: "https://csrc.nist.gov/pubs/sp/800/61/r3/final",
  },
  {
    title: "NIST SP 800-122 PII Confidentiality",
    note: "Safeguards and response planning for PII-sensitive systems.",
    url: "https://www.nist.gov/publications/guide-protecting-confidentiality-personally-identifiable-information-pii",
  },
];

const rapidReference = [
  {
    term: "ICT4D",
    value: "Information and Communication Technology for Development",
    context: "Framework",
    tip: "Anchor technical answers to measurable development outcomes.",
  },
  {
    term: "MEAL",
    value: "Monitoring, Evaluation, Accountability, and Learning",
    context: "Program quality",
    tip: "Explain how your system improves decision quality and accountability.",
  },
  {
    term: "ToC",
    value: "Inputs -> Activities -> Outputs -> Outcomes -> Impact",
    context: "Evaluation logic",
    tip: "Use ToC language when defending indicator design.",
  },
  {
    term: "CHS",
    value: "9 commitments in CHS 2024",
    context: "Accountability",
    tip: "Mention community feedback channels and complaint traceability.",
  },
  {
    term: "DAC",
    value: "Relevance, coherence, effectiveness, efficiency, impact, sustainability",
    context: "Evaluation criteria",
    tip: "Use at least two criteria to justify recommendations.",
  },
  {
    term: "CIA",
    value: "Confidentiality, Integrity, Availability",
    context: "Security baseline",
    tip: "Explicitly balance confidentiality with service continuity.",
  },
  {
    term: "RBAC",
    value: "Role-based access control with least privilege",
    context: "Database security",
    tip: "Give an example role matrix: data entry, analyst, admin, auditor.",
  },
  {
    term: "ACID",
    value: "Atomicity, Consistency, Isolation, Durability",
    context: "Database reliability",
    tip: "Connect ACID guarantees to trusted donor reporting.",
  },
  {
    term: "RFC1918",
    value: "10/8, 172.16/12, 192.168/16",
    context: "Network fundamentals",
    tip: "Pair private addressing with segmentation and clear ownership.",
  },
  {
    term: "DHCP",
    value: "Automatic / Dynamic / Manual allocation",
    context: "Operations",
    tip: "If you see 169.254.x.x, diagnose DHCP path first.",
  },
  {
    term: "IR Flow",
    value: "Prepare -> Detect/Analyze -> Contain/Recover -> Lessons learned",
    context: "Incident response",
    tip: "Describe communication cadence and evidence preservation steps.",
  },
  {
    term: "STAR+I",
    value: "Situation, Task, Action, Result + Impact on beneficiaries",
    context: "Interview delivery",
    tip: "Use this structure for scenario questions to stay concise and practical.",
  },
];

const checklistSections = [
  {
    title: "Documents and Logistics",
    items: [
      "Prepare CV copies, ID, and relevant certifications in one folder.",
      "Confirm interview venue route and target arrival 20-30 minutes early.",
      "Charge laptop/phone and pack charger, notebook, and pen.",
      "Prepare a backup hotspot/data bundle for digital demonstrations if requested.",
    ],
  },
  {
    title: "Technical Final Review",
    items: [
      "Rehearse one end-to-end data flow: collection -> database -> dashboard -> decision.",
      "Review one SQL aggregation query and one RBAC access matrix example.",
      "Review one network troubleshooting sequence from physical to application layer.",
      "Review one incident response narrative including containment and lessons learned.",
    ],
  },
  {
    title: "Scenario Rehearsal",
    items: [
      "Practice the unauthorized DB access scenario aloud in under 3 minutes.",
      "Practice the dashboard discrepancy scenario with MEAL accountability language.",
      "Practice one hardware outage continuity response for a field office.",
    ],
  },
  {
    title: "Communication Quality",
    items: [
      "Use STAR+I framing: include measurable impact on program beneficiaries.",
      "Avoid tool-only answers; always explain governance, risk, and ownership.",
      "Prepare a short closing statement about mission fit with NAZ's nutrition outcomes.",
    ],
  },
];

const panelQuestions = [
  "How does the ICT team currently coordinate with MEAL staff during reporting cycles?",
  "Which platforms are currently central to field data collection and reporting (for example Kobo, ODK, or DHIS2 integrations)?",
  "What are the top reliability or security pain points in branch or district operations today?",
  "What would success look like in the first 90 days for this role?",
  "How are incident response and post-incident learning currently documented at NAZ?",
];

const state = loadState();
const quizState = {
  queue: [],
  current: null,
  score: 0,
  total: 0,
  streak: 0,
};
let timerInterval = null;

let currentDomain = domains[0].id;

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const defaults = {
    ratings: {},
    bestStreak: 0,
    quizRuns: [],
    scenarioRuns: [],
    checklist: {},
    timerSeconds: 0,
    timerRunning: false,
  };

  domains.forEach((domain) => {
    defaults.ratings[domain.id] = 2;
  });

  if (!raw) {
    return defaults;
  }

  try {
    const parsed = JSON.parse(raw);
    const merged = {
      ...defaults,
      ...parsed,
      ratings: {
        ...defaults.ratings,
        ...(parsed.ratings || {}),
      },
      checklist: {
        ...defaults.checklist,
        ...(parsed.checklist || {}),
      },
    };
    return merged;
  } catch {
    return defaults;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function byId(id) {
  return document.getElementById(id);
}

function shuffle(input) {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function fmtDate(date) {
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function mean(values) {
  if (!values.length) return 0;
  return values.reduce((acc, value) => acc + value, 0) / values.length;
}

function flattenChecklistKeys() {
  const keys = [];
  checklistSections.forEach((section, sectionIdx) => {
    section.items.forEach((_, itemIdx) => {
      keys.push(`s${sectionIdx}_i${itemIdx}`);
    });
  });
  return keys;
}

function calculateChecklistCompletion() {
  const keys = flattenChecklistKeys();
  const completed = keys.filter((key) => state.checklist[key]).length;
  const total = keys.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percent };
}

function formatDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function calculateReadiness() {
  const ratingValues = domains.map((d) => Number(state.ratings[d.id] || 0));
  const ratingScore = (mean(ratingValues) / 5) * 100;

  const quizAvg = mean(
    state.quizRuns
      .filter((run) => run.total > 0)
      .map((run) => (run.score / run.total) * 100)
  );

  const scenarioAvg = mean(state.scenarioRuns.map((run) => run.score));
  const checklist = calculateChecklistCompletion();
  const overall = Math.round(
    ratingScore * 0.5 + quizAvg * 0.22 + scenarioAvg * 0.18 + checklist.percent * 0.1
  );

  const weakestId = domains
    .slice()
    .sort((a, b) => (state.ratings[a.id] || 0) - (state.ratings[b.id] || 0))[0].id;

  return {
    overall,
    weakestId,
    quizAvg,
    scenarioAvg,
    ratingScore,
    checklistPercent: checklist.percent,
  };
}

function updateHeroMetrics() {
  const readiness = calculateReadiness();
  byId("readinessPercent").textContent = `${readiness.overall}%`;
  byId("weakestDomain").textContent = domains.find((d) => d.id === readiness.weakestId).label;
  byId("quizBest").textContent = String(state.bestStreak || 0);
  byId("checklistDone").textContent = `${readiness.checklistPercent}%`;

  const progressBar = byId("overallProgressBar");
  const progressLabel = byId("overallProgressLabel");
  if (progressBar) {
    progressBar.style.width = `${readiness.overall}%`;
  }
  if (progressLabel) {
    progressLabel.textContent = `${readiness.overall}%`;
  }
}

function renderDomainTabs() {
  const tabs = byId("domainTabs");
  tabs.innerHTML = "";

  domains.forEach((domain) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tab-btn ${domain.id === currentDomain ? "active" : ""}`;
    button.textContent = domain.label;
    button.addEventListener("click", () => {
      currentDomain = domain.id;
      renderDomainTabs();
      renderDomainDetail();
    });
    tabs.appendChild(button);
  });
}

function listToMarkup(title, items) {
  return `
    <section class="detail-card">
      <h4>${title}</h4>
      <ul>
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderDomainDetail() {
  const domain = domains.find((item) => item.id === currentDomain);
  const panel = byId("domainDetail");

  panel.innerHTML = `
    <h3>${domain.label}</h3>
    <p class="summary">${domain.summary}</p>
    <div class="detail-grid">
      ${listToMarkup("What Interviewers Probe", domain.interviewerFocus)}
      ${listToMarkup("Must-Know Topics", domain.mustKnow)}
      ${listToMarkup("Practical Drills", domain.drills)}
      ${listToMarkup("Common Weak Answers", domain.redFlags)}
    </div>
  `;
}

function renderSkillMatrix() {
  const matrix = byId("skillMatrix");
  matrix.innerHTML = "";

  domains.forEach((domain) => {
    const wrapper = document.createElement("article");
    wrapper.className = "skill-row";
    const current = Number(state.ratings[domain.id] || 2);

    wrapper.innerHTML = `
      <div class="top">
        <strong>${domain.label}</strong>
        <span id="rating_${domain.id}">${current}/5 confidence</span>
      </div>
      <input id="slider_${domain.id}" type="range" min="1" max="5" value="${current}" />
    `;

    matrix.appendChild(wrapper);

    const slider = wrapper.querySelector(`#slider_${domain.id}`);
    slider.addEventListener("input", (event) => {
      const value = Number(event.target.value);
      state.ratings[domain.id] = value;
      wrapper.querySelector(`#rating_${domain.id}`).textContent = `${value}/5 confidence`;
      saveState();
      updateHeroMetrics();
    });
  });
}

function renderReferenceGrid() {
  const grid = byId("referenceGrid");
  grid.innerHTML = "";

  rapidReference.forEach((item) => {
    const card = document.createElement("article");
    card.className = "ref-card";
    card.innerHTML = `
      <div class="ref-top">
        <strong class="ref-term">${item.term}</strong>
        <span class="ref-context">${item.context}</span>
      </div>
      <p class="ref-value">${item.value}</p>
      <p class="ref-tip">${item.tip}</p>
    `;
    grid.appendChild(card);
  });
}

function updateChecklistProgress() {
  const status = calculateChecklistCompletion();
  byId("checkProgressLabel").textContent = `${status.completed}/${status.total} completed`;
  const bar = byId("checkProgressBar");
  bar.style.width = `${status.percent}%`;
}

function setChecklistValue(key, isChecked) {
  state.checklist[key] = isChecked;
  saveState();
  updateChecklistProgress();
  updateHeroMetrics();
}

function renderChecklist() {
  const groups = byId("checklistGroups");
  groups.innerHTML = "";

  checklistSections.forEach((section, sectionIdx) => {
    const article = document.createElement("article");
    article.className = "check-group";
    article.innerHTML = `<h3>${section.title}</h3>`;

    const ul = document.createElement("ul");
    ul.className = "task-list";

    section.items.forEach((item, itemIdx) => {
      const key = `s${sectionIdx}_i${itemIdx}`;
      const checked = Boolean(state.checklist[key]);
      const li = document.createElement("li");
      if (checked) {
        li.classList.add("done");
      }

      li.innerHTML = `
        <input type="checkbox" id="task_${key}" ${checked ? "checked" : ""} />
        <span>${item}</span>
      `;
      ul.appendChild(li);

      const checkbox = li.querySelector(`#task_${key}`);
      checkbox.addEventListener("change", (event) => {
        const nextValue = Boolean(event.target.checked);
        li.classList.toggle("done", nextValue);
        setChecklistValue(key, nextValue);
      });
    });

    article.appendChild(ul);
    groups.appendChild(article);
  });

  const questions = byId("interviewerQuestions");
  questions.innerHTML = "";
  panelQuestions.forEach((question) => {
    const li = document.createElement("li");
    li.textContent = question;
    questions.appendChild(li);
  });

  updateChecklistProgress();
}

function updateTimerDisplay() {
  const timer = byId("timerDisplay");
  if (timer) {
    timer.textContent = formatDuration(Number(state.timerSeconds || 0));
  }
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerControls() {
  const button = byId("toggleTimer");
  if (button) {
    button.textContent = state.timerRunning ? "Pause Timer" : "Start Timer";
  }
}

function startTimer() {
  if (timerInterval) return;
  state.timerRunning = true;
  saveState();
  updateTimerControls();
  timerInterval = setInterval(() => {
    state.timerSeconds = Number(state.timerSeconds || 0) + 1;
    updateTimerDisplay();
    if (state.timerSeconds % 5 === 0) {
      saveState();
    }
  }, 1000);
}

function pauseTimer() {
  state.timerRunning = false;
  stopTimer();
  saveState();
  updateTimerControls();
}

function toggleTimer() {
  if (state.timerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function resetTimer() {
  state.timerSeconds = 0;
  pauseTimer();
  updateTimerDisplay();
  saveState();
}

function buildQuizSelector() {
  const select = byId("quizDomainSelect");
  select.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All domains";
  select.appendChild(allOption);

  domains.forEach((domain) => {
    const option = document.createElement("option");
    option.value = domain.id;
    option.textContent = domain.label;
    select.appendChild(option);
  });
}

function startQuiz() {
  const selected = byId("quizDomainSelect").value;
  const pool = selected === "all" ? questions : questions.filter((q) => q.domain === selected);

  quizState.queue = shuffle(pool);
  quizState.current = null;
  quizState.score = 0;
  quizState.total = 0;
  quizState.streak = 0;

  if (!quizState.queue.length) {
    byId("quizBox").innerHTML = `<p class="muted">No questions available for this mode.</p>`;
    return;
  }

  nextQuestion();
}

function nextQuestion() {
  const question = quizState.queue.shift();
  quizState.current = question || null;

  if (!question) {
    finalizeQuiz();
    return;
  }

  const box = byId("quizBox");
  box.innerHTML = `
    <p class="quiz-question"><strong>${question.question}</strong></p>
    <div class="options"></div>
    <div class="quiz-meta">
      <span>Score: ${quizState.score}/${quizState.total}</span>
      <span>Current streak: ${quizState.streak}</span>
      <span>Remaining: ${quizState.queue.length}</span>
    </div>
  `;

  const optionsContainer = box.querySelector(".options");

  question.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.textContent = optionText;

    button.addEventListener("click", () => handleAnswer(index, button));
    optionsContainer.appendChild(button);
  });
}

function handleAnswer(selectedIndex, selectedButton) {
  const question = quizState.current;
  if (!question) return;

  const optionButtons = Array.from(byId("quizBox").querySelectorAll(".option"));
  optionButtons.forEach((button) => {
    button.disabled = true;
  });

  const isCorrect = selectedIndex === question.answer;
  quizState.total += 1;

  if (isCorrect) {
    selectedButton.classList.add("correct");
    quizState.score += 1;
    quizState.streak += 1;
    state.bestStreak = Math.max(state.bestStreak || 0, quizState.streak);
  } else {
    selectedButton.classList.add("wrong");
    optionButtons[question.answer].classList.add("correct");
    quizState.streak = 0;
  }

  const feedback = document.createElement("div");
  feedback.className = "feedback";
  feedback.innerHTML = `
    <strong>${isCorrect ? "Correct" : "Not quite"}:</strong> ${question.explanation}
  `;
  byId("quizBox").appendChild(feedback);

  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.textContent = quizState.queue.length ? "Next Question" : "Finish Quiz";
  nextBtn.style.marginTop = "0.6rem";
  nextBtn.addEventListener("click", nextQuestion);
  byId("quizBox").appendChild(nextBtn);

  updateHeroMetrics();
  saveState();
}

function finalizeQuiz() {
  const summary = {
    score: quizState.score,
    total: quizState.total,
    date: new Date().toISOString(),
    domain: byId("quizDomainSelect").value,
  };
  state.quizRuns.push(summary);

  const percentage = summary.total ? Math.round((summary.score / summary.total) * 100) : 0;
  byId("quizBox").innerHTML = `
    <h3>Quiz Complete</h3>
    <p>You scored <strong>${summary.score}/${summary.total}</strong> (${percentage}%).</p>
    <p class="muted">Tip: Re-run focused mode for your weakest domain and target 80%+.</p>
  `;

  saveState();
  updateHeroMetrics();
}

function renderScenarioSelector() {
  const select = byId("scenarioSelect");
  select.innerHTML = "";
  scenarios.forEach((scenario) => {
    const option = document.createElement("option");
    option.value = scenario.id;
    option.textContent = scenario.title;
    select.appendChild(option);
  });

  updateScenarioPrompt();
  select.addEventListener("change", updateScenarioPrompt);
}

function updateScenarioPrompt() {
  const selectedId = byId("scenarioSelect").value;
  const selected = scenarios.find((scenario) => scenario.id === selectedId);
  byId("scenarioResponse").placeholder = selected.prompt;
  byId("scenarioFeedback").innerHTML = "";
}

function scoreScenarioResponse() {
  const selectedId = byId("scenarioSelect").value;
  const selected = scenarios.find((scenario) => scenario.id === selectedId);
  const response = byId("scenarioResponse").value.trim().toLowerCase();

  if (!response) {
    byId("scenarioFeedback").innerHTML = `<p class="muted">Write your response first, then score it.</p>`;
    return;
  }

  let total = 0;
  const rows = selected.criteria.map((criterion) => {
    const matches = criterion.keywords.filter((keyword) => response.includes(keyword)).length;
    const points = matches >= 2 ? criterion.weight : matches === 1 ? Math.round(criterion.weight * 0.5) : 0;
    total += points;

    return {
      name: criterion.name,
      points,
      weight: criterion.weight,
      tip: criterion.tip,
    };
  });

  state.scenarioRuns.push({
    date: new Date().toISOString(),
    scenarioId: selected.id,
    score: total,
  });

  const feedback = byId("scenarioFeedback");
  feedback.innerHTML = `
    <div><span class="score-pill">${total}/100</span></div>
    ${rows
      .map((row) => {
        const status = row.points === row.weight ? "Strong" : row.points > 0 ? "Partial" : "Missing";
        return `<p><strong>${row.name}:</strong> ${status} (${row.points}/${row.weight})<br /><span class="muted">${row.tip}</span></p>`;
      })
      .join("")}
  `;

  saveState();
  updateHeroMetrics();
}

function renderSources() {
  const list = byId("sourceList");
  list.innerHTML = "";
  sources.forEach((source) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${source.url}" target="_blank" rel="noreferrer">${source.title}</a> - ${source.note}`;
    list.appendChild(li);
  });
}

function updateHoursLabel() {
  const value = Number(byId("hoursPerDay").value);
  byId("hoursPerDayValue").textContent = `${value} hour${value === 1 ? "" : "s"}/day`;
}

function buildWeightedPlanOrder(priority) {
  const balanced = ["ict4d", "meal", "database", "secure", "network", "support", "hardware"];

  if (priority === "database") {
    return ["database", "secure", "database", "meal", "network", "support", "ict4d", "hardware"];
  }
  if (priority === "network") {
    return ["network", "support", "hardware", "network", "secure", "database", "meal", "ict4d"];
  }
  if (priority === "meal") {
    return ["meal", "ict4d", "secure", "meal", "database", "support", "network", "hardware"];
  }

  return balanced;
}

function taskTemplate(domainId) {
  const taskMap = {
    ict4d: "Map stakeholder ecosystem + apply 2 Digital Principles to a nutrition use case.",
    meal: "Run data quality checks and define one accountability feedback loop.",
    database: "Practice SQL query + role-based access design for reporting tables.",
    secure: "Review threat model, logging, and access controls for one workflow.",
    network: "Do subnet/DHCP drill and write a layered troubleshooting path.",
    support: "Write incident communication update + post-incident action list.",
    hardware: "Review device checklist, spare plan, and swap verification routine.",
  };

  return taskMap[domainId];
}

function generatePlan() {
  const dateInput = byId("interviewDate").value;
  const hours = Number(byId("hoursPerDay").value);
  const priority = byId("priorityFocus").value;
  const output = byId("studyPlan");
  output.innerHTML = "";

  if (!dateInput) {
    output.innerHTML = "<li>Select an interview date first.</li>";
    return;
  }

  const interviewDate = new Date(`${dateInput}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const msDiff = interviewDate - today;
  const daysUntil = Math.ceil(msDiff / (1000 * 60 * 60 * 24));

  if (daysUntil <= 0) {
    output.innerHTML = "<li>The selected date is today or in the past. Choose a future interview date.</li>";
    return;
  }

  const totalDays = Math.min(daysUntil, 28);
  const order = buildWeightedPlanOrder(priority);

  for (let i = 0; i < totalDays; i += 1) {
    const current = new Date(today);
    current.setDate(today.getDate() + i + 1);
    const domainId = order[i % order.length];
    const domainLabel = domains.find((d) => d.id === domainId).label;

    const li = document.createElement("li");
    li.textContent = `${fmtDate(current)} (${hours}h) - ${domainLabel}: ${taskTemplate(domainId)}`;
    output.appendChild(li);
  }

  const final = document.createElement("li");
  final.textContent = `Day before interview: 60-minute rapid review, rehearse 2 scenarios aloud, and verify examples of impact.`;
  output.appendChild(final);
}

function setDefaultDate() {
  const dateField = byId("interviewDate");
  if (dateField.value) return;

  const future = new Date();
  future.setDate(future.getDate() + 14);
  const iso = future.toISOString().split("T")[0];
  dateField.value = iso;
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));
}

function init() {
  setDefaultDate();
  updateHoursLabel();

  renderDomainTabs();
  renderDomainDetail();
  renderSkillMatrix();
  renderReferenceGrid();
  renderChecklist();
  buildQuizSelector();
  renderScenarioSelector();
  renderSources();
  updateTimerDisplay();
  updateTimerControls();
  updateHeroMetrics();
  setupReveal();

  byId("hoursPerDay").addEventListener("input", updateHoursLabel);
  byId("generatePlan").addEventListener("click", generatePlan);
  byId("startQuiz").addEventListener("click", startQuiz);
  byId("scoreScenario").addEventListener("click", scoreScenarioResponse);
  byId("toggleTimer").addEventListener("click", toggleTimer);
  byId("resetTimer").addEventListener("click", resetTimer);

  if (state.timerRunning) {
    startTimer();
  }
}

init();
