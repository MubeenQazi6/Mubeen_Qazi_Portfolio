export const personal = {
  name: "Mubeen Qazi",
  role: "Software Quality Assurance Engineer",
  roleSecondary: "Software Developer",
  location: "Hyderabad, Pakistan",
  email: "mubeenqazi707@gmail.com",
  phone: "+92 312 3001579",
  whatsApp: "https://wa.me/923123001579",
  linkedIn: "https://linkedin.com/in/mubeen-qazi",
  subtitle: "SQA & API Testing | Laravel & Full-Stack Dev | Fintech & Government QA",
  resumePath: "/Mubeen-Qazi-Resume.pdf",
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Job Match", href: "#job-match" },
  { label: "Contact", href: "#contact" },
] as const;

export const about = {
  summary:
    "Detail-oriented Software Engineering graduate with hands-on experience in Software Quality Assurance and full-stack development. Currently focused on API testing, load & performance testing, UI/functional testing, and defect management across fintech and government platforms — with a strong foundation in Laravel, PHP, and MySQL from building real-world applications.",
  highlights: [
    "API Testing with Postman on NamiPay fintech platform",
    "Load & Performance Testing with JMeter",
    "UI, Functional & Regression Testing",
    "Bug tracking and test case management in Jira",
    "Laravel full-stack development (Workflow System)",
    "SDLC, Agile workflows & cross-team collaboration",
  ],
} as const;

export const skillGroups = [
  {
    title: "QA & Testing",
    skills: [
      "API Testing (Postman)",
      "Load & Performance (JMeter)",
      "UI & Functional Testing",
      "Test Case Design",
      "Regression Testing",
      "Defect Reporting",
      "Bug Lifecycle Management",
    ],
  },
  {
    title: "Development",
    skills: [
      "PHP (Laravel)",
      "Python",
      "C++",
      "HTML/CSS",
      "Bootstrap",
      "MySQL",
      "REST APIs",
      "CRUD Operations",
    ],
  },
  {
    title: "Tools & Core",
    skills: [
      "Jira",
      "Git",
      "SQL Data Validation",
      "SMTP Integration",
      "Authentication Systems",
      "Role-Based Access Control",
    ],
  },
] as const;

export type ExperienceItem = {
  title: string;
  company: string;
  companyUrl?: string;
  period?: string;
  location?: string;
  highlights: string[];
  current?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    title: "Junior SQA Engineer",
    company: "Intrapreneur",
    companyUrl: "https://intrapreneur.pk/",
    period: "Jan 2026 – Present",
    location: "Hyderabad, Pakistan",
    current: true,
    highlights: [
      "Performing manual and API testing using Postman on the NamiPay payment gateway — a Saudi Arabia-based fintech platform — validating REST endpoints, request/response handling, data integrity, and transaction security",
      "Conducting comprehensive UI and functional testing on mobile applications and web platforms to ensure quality standards and compliance with business requirements",
      "Utilizing Jira for test case creation, bug tracking, defect reporting, and collaboration with development teams",
      "Identifying, documenting, and prioritizing software defects in fintech payment systems",
      "Executing regression testing cycles to ensure system stability after each release",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Civil Aviation Training Institute (CATI)",
    companyUrl: "https://catipakistan.com.pk/",
    period: "Jun 2025 – Jul 2025",
    location: "Hyderabad, Pakistan",
    highlights: [
      "Developed a complete Workflow Management System using Laravel, enabling automation of tasks, workflows, and reporting",
      "Implemented role-based authentication, middleware-based access control, and SMTP integration",
      "Built real-time task assignment modules; performed functional validation throughout the development cycle",
      "Collaborated on CRUD operations and ensured data integrity across modules",
    ],
  },
  {
    title: "Front-end Developer Intern",
    company: "GMG Solutions",
    companyUrl: "https://gmgsolution.com/",
    period: "Aug 2023 – Oct 2023",
    location: "Hyderabad, Pakistan",
    highlights: [
      "Designed and implemented responsive web application interfaces, building practical understanding of UI/UX structure essential for functional and UI testing",
      "Gained hands-on experience in HTML, CSS, and Bootstrap within a professional team environment",
    ],
  },
];

export type ProjectItem = {
  name: string;
  category: string;
  url?: string;
  highlights: string[];
  skills: string[];
  role: "qa" | "development" | "both";
};

export const projects: ProjectItem[] = [
  {
    name: "NamiPay",
    category: "FinTech Payment Gateway",
    url: "https://www.namipay.com.sa/",
    role: "qa",
    skills: [
      "postman",
      "api testing",
      "jmeter",
      "jira",
      "regression testing",
      "fintech",
      "payment gateway",
      "rest api",
    ],
    highlights: [
      "Tested a Saudi Arabia-based payment platform processing digital transactions, POS solutions, and payment integrations",
      "Validated transaction security, data integrity, and third-party integrations through API and load testing",
      "Tested edge cases in payment flows including failure scenarios, timeout handling, and retry mechanisms",
    ],
  },
  {
    name: "SSPA — Sindh Social Protection Authority",
    category: "Government Digital Platform",
    url: "https://sspa.gos.pk/",
    role: "qa",
    skills: [
      "postman",
      "api testing",
      "jmeter",
      "load testing",
      "jira",
      "rest api",
      "government",
      "performance testing",
    ],
    highlights: [
      "Performed QA on a large-scale government platform serving social protection beneficiaries across Sindh",
      "Conducted API testing and load/performance testing under high concurrent user traffic",
      "Reported and tracked defects in Jira; contributed to regression testing for mission-critical releases",
    ],
  },
  {
    name: "Workflow Management System",
    category: "Laravel / PHP / MySQL",
    role: "both",
    skills: [
      "laravel",
      "php",
      "mysql",
      "smtp",
      "authentication",
      "crud",
      "workflow",
      "middleware",
    ],
    highlights: [
      "Built during CATI internship to automate business workflows, task assignments, and operational reporting",
      "Implemented SMTP integration, role-based authentication, and real-time operations",
      "Validated functionality and tested edge cases throughout development",
    ],
  },
  {
    name: "Bus Management System",
    category: "PHP / MySQL",
    role: "development",
    skills: [
      "php",
      "mysql",
      "crud",
      "html",
      "css",
      "admin panel",
      "booking system",
    ],
    highlights: [
      "Developed a web-based system for managing buses, routes, scheduling, and passenger booking",
      "Implemented separate admin and user panels with complete CRUD operations",
      "Validated all modules for data correctness and integrity",
    ],
  },
];

export const education = {
  institution: "ISRA University Hyderabad",
  institutionUrl: "https://isra.edu.pk/",
  degree: "Bachelor of Software Engineering",
  period: "Jan 2022 – Dec 2025",
  location: "Hyderabad, Pakistan",
} as const;

export type CertificationItem = {
  name: string;
  issuer: string;
  url: string;
  period?: string;
};

export const certifications: CertificationItem[] = [
  {
    name: "English Language Certification",
    issuer: "Domino English Learning Centre",
    url: "https://www.facebook.com/DominoHyd/",
    period: "2018",
  },
  {
    name: "Certificate in Computer & Business Management",
    issuer: "Dynamic Training Solutions",
    url: "https://www.facebook.com/DTSHYD/",
    period: "2019",
  },
];

/** Structured profile used by the Job Match AI bot */
export const jobMatchProfile = {
  titles: [
    "Software Quality Assurance Engineer",
    "Junior SQA Engineer",
    "QA Engineer",
    "Software Tester",
    "Software Engineer",
    "Software Developer",
    "Laravel Developer",
    "PHP Developer",
    "API Tester",
  ],
  skills: [
    { name: "API Testing", keywords: ["api testing", "api test", "rest api", "restful", "postman", "endpoint", "request response"] },
    { name: "Postman", keywords: ["postman", "api client", "collection runner"] },
    { name: "JMeter", keywords: ["jmeter", "load testing", "performance testing", "stress test", "load test"] },
    { name: "Manual Testing", keywords: ["manual testing", "manual test", "functional testing", "ui testing", "ui test", "black box"] },
    { name: "Regression Testing", keywords: ["regression", "regression testing", "retesting"] },
    { name: "Test Case Design", keywords: ["test case", "test plan", "test scenario", "test design", "test documentation"] },
    { name: "Jira", keywords: ["jira", "bug tracking", "defect tracking", "issue tracking", "agile", "scrum"] },
    { name: "Defect Management", keywords: ["defect", "bug report", "bug lifecycle", "defect reporting"] },
    { name: "SQL / MySQL", keywords: ["sql", "mysql", "database", "data validation", "query"] },
    { name: "Laravel", keywords: ["laravel", "php framework", "eloquent", "blade"] },
    { name: "PHP", keywords: ["php", "backend", "server side"] },
    { name: "Python", keywords: ["python", "scripting"] },
    { name: "C++", keywords: ["c++", "cpp", "object oriented"] },
    { name: "HTML/CSS", keywords: ["html", "css", "frontend", "front-end", "responsive", "bootstrap"] },
    { name: "Git", keywords: ["git", "version control", "github", "gitlab"] },
    { name: "SDLC", keywords: ["sdlc", "software development life cycle", "software lifecycle"] },
    { name: "Agile", keywords: ["agile", "scrum", "sprint", "kanban"] },
    { name: "Fintech", keywords: ["fintech", "payment", "payment gateway", "transaction", "pos", "financial"] },
    { name: "Government Systems", keywords: ["government", "public sector", "social protection"] },
    { name: "Authentication", keywords: ["authentication", "authorization", "rbac", "role based", "middleware", "login"] },
    { name: "CRUD", keywords: ["crud", "create read update delete"] },
  ],
  experienceKeywords: [
    { role: "SQA / QA Testing", keywords: ["qa", "quality assurance", "tester", "testing", "sqa", "quality engineer"] },
    { role: "Software Development", keywords: ["developer", "development", "engineer", "programming", "software engineer", "full stack", "fullstack", "backend", "frontend"] },
    { role: "Internship Experience", keywords: ["intern", "internship", "graduate", "entry level", "junior"] },
  ],
} as const;

export const seo = {
  title: "Mubeen Qazi | SQA Engineer & Software Developer",
  description:
    "Software Quality Assurance Engineer and Software Developer in Hyderabad, Pakistan. API testing with Postman, performance testing with JMeter, Laravel development, and QA for fintech and government systems.",
  keywords: [
    "Software Quality Assurance",
    "SQA Engineer",
    "Software Developer",
    "API Testing",
    "Postman",
    "JMeter",
    "Laravel",
    "PHP",
    "Hyderabad",
    "Fintech QA",
  ],
  siteUrl: "https://mubeenqazi.dev",
} as const;
