export const personal = {
  name: "Mubeen Qazi",
  role: "Software Quality Assurance Engineer",
  location: "Hyderabad, Pakistan",
  email: "mubeenqazi707@gmail.com",
  phone: "+92 312 3001579",
  linkedIn: "https://linkedin.com/in/mubeen-qazi",
  subtitle: "Fintech | API Testing | Laravel | Automation Testing",
  resumePath: "/Mubeen-Qazi-Resume.pdf",
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const about = {
  summary:
    "Software Quality Assurance Engineer focused on reliable, scalable software across fintech and government domains. I combine structured test design with hands-on API and performance validation to catch issues early and ship with confidence.",
  highlights: [
    "API Testing with Postman",
    "Performance Testing with JMeter",
    "UI & Functional Testing",
    "Bug tracking and reporting in Jira",
    "Experience across SDLC and Agile workflows",
    "Fintech and government system QA experience",
  ],
} as const;

export const skillGroups = [
  {
    title: "QA & Testing",
    skills: [
      "Postman",
      "JMeter",
      "Test Case Design",
      "Bug Reporting",
      "Regression Testing",
    ],
  },
  {
    title: "Development",
    skills: ["PHP (Laravel)", "MySQL", "Python", "C++", "HTML/CSS"],
  },
  {
    title: "Tools",
    skills: ["Jira", "Git"],
  },
] as const;

export type ExperienceItem = {
  title: string;
  company: string;
  period?: string;
  highlights: string[];
  current?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    title: "Junior SQA Engineer",
    company: "Intrapreneur",
    period: "Jan 2026 – Present",
    current: true,
    highlights: [
      "API testing of NamiPay fintech system",
      "UI & functional testing",
      "Jira bug tracking",
      "Regression testing",
    ],
  },
  {
    title: "Internship",
    company: "CATI",
    highlights: [
      "Built Laravel Workflow System",
      "Role-based authentication",
      "CRUD operations testing",
    ],
  },
  {
    title: "Frontend Developer",
    company: "GMG Solutions",
    highlights: [
      "Responsive UI development",
      "Bootstrap-based frontend work",
    ],
  },
];

export type ProjectItem = {
  name: string;
  category: string;
  highlights: string[];
};

export const projects: ProjectItem[] = [
  {
    name: "NamiPay",
    category: "Fintech",
    highlights: [
      "API Testing (Postman)",
      "JMeter performance testing",
      "Transaction validation",
    ],
  },
  {
    name: "SSPA Government Platform",
    category: "Government",
    highlights: [
      "API testing & load testing",
      "High-traffic system validation",
    ],
  },
  {
    name: "Workflow Management System",
    category: "Laravel",
    highlights: ["Laravel system", "Authentication & SMTP"],
  },
  {
    name: "Bus Management System",
    category: "PHP / MySQL",
    highlights: ["PHP + MySQL CRUD system"],
  },
];

export const education = {
  institution: "ISRA University Hyderabad",
  degree: "Bachelor of Software Engineering",
  period: "2022 – 2025",
} as const;

export const certifications = [
  "Computer & Business Management",
  "English Language Certification",
] as const;

export const seo = {
  title: "Mubeen Qazi | Software Quality Assurance Engineer",
  description:
    "Software Quality Assurance Engineer in Hyderabad, Pakistan. API testing with Postman, performance testing with JMeter, Laravel development, and QA for fintech and government systems.",
  keywords: [
    "Software Quality Assurance",
    "SQA Engineer",
    "API Testing",
    "Postman",
    "JMeter",
    "Laravel",
    "Hyderabad",
    "Fintech QA",
  ],
  siteUrl: "https://mubeenqazi.dev",
} as const;
