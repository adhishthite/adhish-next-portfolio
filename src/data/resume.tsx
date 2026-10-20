import { Icons } from "@/components/icons";

// Career start year - used to dynamically calculate years of experience
const CAREER_START_YEAR = 2014;
export const YEARS_OF_EXPERIENCE = new Date().getFullYear() - CAREER_START_YEAR;

export const DATA = {
  name: "Adhish Thite",
  initials: "AT",
  url: "https://www.adhishthite.com",
  location: "Pune, India",
  locationLink: "https://www.google.com/maps/place/pune",
  description: `Sr. Solutions Architect, AI at Google. ${YEARS_OF_EXPERIENCE}+ years in applied AI, now focused on enterprise AI architecture and agentic AI in production.`,
  summary: `I help enterprises put Gemini and the rest of Google's AI stack into production. Most of my work starts where the demo ends: architecture, evaluation, latency and cost, the things that decide whether a model or a harness holds up in front of real customers. Before Google I led AI engineering at Elastic and spent four years building fraud, sign-up risk and identity-verification models at Synapse. I'm also one of OpenAI's Codex Ambassadors, testing pre-release models against real engineering work.`,
  avatarUrl: "/portrait.jpg",
  /**
   * Headline areas of expertise, shown as the large blocks in the Expertise
   * section. `items` are the specific capabilities under each area; `primary`
   * areas get the "Primary focus" marker.
   */
  expertise: [
    {
      title: "Enterprise AI Architecture",
      primary: true,
      summary:
        "Designing how AI fits into an enterprise: platforms, reference architectures, and the security, cost, and scale questions that decide whether a system ships.",
      items: [
        "AI solution architecture",
        "Reference architectures",
        "AI platform strategy",
        "Security & identity",
        "Cost & token economics",
        "Scalability & reliability",
        "Technical roadmaps",
        "Customer architecture reviews",
      ],
    },
    {
      title: "Agentic AI",
      primary: true,
      summary:
        "Agents that plan, call tools, and remember, plus the harness, evaluation, and security around them.",
      items: [
        "Harness engineering",
        "Harness optimization",
        "Agentic evaluations",
        "Multi-agent systems",
        "Tool use & function calling",
        "Model Context Protocol (MCP)",
        "Agent memory & context",
        "Agent observability",
        "Agent security",
        "LangGraph",
      ],
    },
    {
      title: "Generative AI & LLMs",
      summary:
        "Taking LLM applications from prototype to production on Gemini and other frontier models.",
      items: [
        "Gemini & Google Cloud AI",
        "RAG & retrieval",
        "Vector & hybrid search",
        "Prompt engineering",
        "Fine-tuning",
        "LLM benchmarking",
        "LLMOps",
        "Prompt-injection defense",
      ],
    },
    {
      title: "Machine Learning",
      summary:
        "A decade of production ML before the LLM wave: risk, fraud, vision, and language models running in real products.",
      items: [
        "Fraud & risk modeling",
        "Identity verification",
        "Deep learning",
        "NLP",
        "Computer vision",
        "Feature engineering",
        "MLOps",
        "Model deployment",
      ],
    },
  ],
  /** Tools and platforms, listed under the expertise blocks */
  skillGroups: [
    {
      label: "Languages",
      items: ["Python", "TypeScript", "Java", "Rust", "SQL"],
    },
    {
      label: "AI frameworks",
      items: [
        "LangChain",
        "LangGraph",
        "LlamaIndex",
        "PyTorch",
        "TensorFlow",
        "Hugging Face",
        "scikit-learn",
      ],
    },
    {
      label: "Cloud & data",
      items: [
        "Google Cloud",
        "AWS",
        "Azure",
        "Elasticsearch",
        "PostgreSQL",
        "Redis",
        "MongoDB",
        "Convex",
      ],
    },
    {
      label: "Engineering",
      items: [
        "FastAPI",
        "Django",
        "Next.js",
        "React",
        "Docker",
        "Kubernetes",
        "MLflow",
        "CI/CD",
        "Datadog",
      ],
    },
  ],
  navbar: [
    { href: "/#work", label: "Experience" },
    { href: "/#expertise", label: "Expertise" },
    { href: "/#projects", label: "Projects" },
    { href: "/blog/", label: "Writing" },
  ],
  contact: {
    email: "jobs.adhish@gmail.com",
    tel: "+919209244552",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/adhishthite",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/adhish-thite/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/xadhish",
        icon: Icons.x,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Google",
      href: "https://google.com",
      badges: [],
      location: "Mumbai, India",
      title: "Sr. Solutions Architect, AI",
      logoUrl: "/google.svg",
      start: "Jun 2026",
      end: "Present",
      summary:
        "Helping enterprises adopt Google's AI platform, bringing Gemini and the wider Google AI stack into production.",
      description:
        "• Working with enterprise teams to architect and deliver AI solutions on Google Cloud, centered on Gemini and Google's latest models.\n• Translating Google's AI research and platform capabilities into production systems that fit real business needs.",
    },
    {
      company: "OpenAI",
      href: "https://developers.openai.com/community/codex-ambassadors",
      badges: ["Ambassador"],
      location: "Remote",
      title: "Codex Ambassador",
      logoUrl: "/openai.svg",
      start: "Apr 2026",
      end: "Present",
      summary:
        "Selected to OpenAI's Codex Ambassador program — testing early model releases and feeding hands-on feedback back to the Codex team.",
      description:
        "• Selected as an OpenAI Codex Ambassador, joining a small group of power users and community builders who support Codex adoption.\n• Test early and pre-release model and Codex changes, then share direct feedback with OpenAI's internal teams.\n• Evaluate new Codex releases against real engineering work and write about how I actually use them.",
    },
    {
      company: "Elastic Co.",
      href: "https://elastic.co",
      badges: [],
      location: "San Francisco Bay Area [Remote]",
      title: "Lead AI Engineer",
      logoUrl: "/elastic.svg",
      start: "Feb 2024",
      end: "May 2026",
      summary:
        "Leading the design and deployment of innovative AI solutions that drive generative AI initiatives.",
      description:
        "• Leading the design and deployment of innovative AI solutions that drive generative AI initiatives.\n• Steering teams to integrate advanced machine learning techniques with customer-centric software features.\n• Shaping product strategy and influencing the broader technical roadmap at Elastic.",
    },
    {
      company: "Synapse Financial Technologies Inc.",
      badges: [],
      href: "https://www.linkedin.com/company/synapsepay",
      location: "San Francisco Bay Area",
      title: "Senior Machine Learning Engineer",
      logoUrl: "/synapse.jpeg",
      start: "Nov 2019",
      end: "Feb 2024",
      summary:
        "Led full-stack ML features for fraud detection and risk management while mentoring teams.",
      description:
        "•	Progressed from developing deep learning-based risk management and automated ID verification systems to leading full-stack, customer-facing ML features.\n•	Spearheaded the design, deployment, and optimization of advanced pipelines for sign-up risk and fraud detection while mentoring teams and refining product strategies.\n•	Collaborated with cross-functional stakeholders to ensure robust, scalable, and production-ready ML solutions across the organization.",
    },
    {
      company: "Gemini Data Inc.",
      href: "https://geminidata.com/",
      badges: [],
      location: "San Francisco Bay Area",
      title: "Machine Learning Engineer",
      logoUrl: "/geminidata.jpeg",
      start: "May 2019",
      end: "Nov 2019",
      summary:
        "Engineered data science solutions unlocking enterprise value from complex data silos.",
      description:
        "•	Engineered data science solutions to unlock enterprise value from complex data silos through sophisticated pipelines in Python and Apache Calcite.\n•	Delivered actionable insights that boosted performance and enhanced real-time log analytics.",
    },
    {
      company: "Welch Labs",
      href: "https://www.linkedin.com/company/welchlabs/",
      badges: ["Internship"],
      location: "Charlotte, NC",
      title: "Machine Learning Engineer",
      logoUrl: "/welch-labs.jpeg",
      start: "Sep 2018",
      end: "April 2019",
      summary:
        "Designed ensemble models for windshield defect detection, collaborating with Microsoft.",
      description:
        "•	Designed ensemble models combining Convolutional SVMs and CNNs to eliminate false positives in windshield defect detection, collaborating with industry leaders like Microsoft.\n•	Focused on reducing inference times and ensuring robust, production-ready ML solutions for quality assurance.",
    },
    {
      company: "Zuora, Inc.",
      href: "https://zuora.com/",
      badges: ["Internship"],
      location: "San Francisco, CA",
      title: "Data Scientist",
      logoUrl: "/zuora.jpeg",
      start: "June 2018",
      end: "Aug 2018",
      summary:
        "Developed ML models to streamline customer support through intelligent ticket correlation.",
      description:
        "•	Developed ML models to streamline customer support by correlating support tickets with internal knowledge bases, leveraging both topic modeling and deep learning.\n•	Enhanced access validation processes to accelerate ticket resolution and boost live support efficiency.",
    },
    {
      company: "UNC Charlotte",
      href: "https://charlotte.edu/",
      badges: ["Assistantship"],
      location: "Charlotte, NC",
      title: "Graduate Research Assistant",
      logoUrl: "/uncc.png",
      start: "Feb 2018",
      end: "June 2018",
      summary:
        "Conducted advanced data analysis to predict student outcomes and improve engagement.",
      description:
        "•	Conducted advanced data analysis and visualization projects using Tableau and statistical methods to predict student outcomes and improve engagement.\n•	Automated data extraction processes, significantly reducing analysis time and supporting operational decision-making.",
    },
    {
      company: "Accenture Services Pvt Ltd",
      href: "https://accenture.com/",
      badges: [],
      location: "Pune, India",
      title: "Application Development Analyst",
      logoUrl: "/accenture.svg",
      start: "April 2015",
      end: "July 2017",
      summary:
        "Delivered eCommerce platforms through Salesforce customization and Java development.",
      description:
        "•	Contributed to the end-to-end delivery of eCommerce platforms through Salesforce customization and advanced Java development.\n•	Led teams in automating testing processes, managing agile projects, and overhauling sales and service processes to drive operational excellence.\n•	Delivered scalable, high-quality software solutions that enhanced both client and internal business processes.",
    },
    {
      company: "Tata Research Development and Design Center",
      href: "https://www.linkedin.com/company/tata-research-development-and-design-centre-trddc/",
      badges: ["Internship"],
      location: "Pune, India",
      title: "Software Engineer",
      start: "July 2013",
      end: "April 2014",
      summary:
        "Designed and implemented a web portal for internal parcel tracking and management.",
      description:
        "•	Designed and implemented a web portal to manage internal parcel tracking, laying the foundation for comprehensive system design and lifecycle management.\n	•	Gained hands-on experience in full-stack development during a pivotal internship project, establishing a strong technical base for future roles.",
    },
  ],
  education: [
    {
      school: "University of North Carolina at Charlotte",
      href: "https://charlotte.edu",
      degree: "Master of Science in Computer Science",
      logoUrl: "/uncc.png",
      start: "2017",
      end: "2019",
    },
    {
      school: "University of Pune",
      href: "http://www.unipune.ac.in",
      degree: "Bachelor's Degree in Computer Engineering (BE)",
      logoUrl: "/unipune.jpg",
      start: "2010",
      end: "2014",
    },
  ],
  certificates: [
    {
      name: "Triplebyte Certified Generalist Software Engineer",
      issuer: "Triplebyte",
      date: "Issued Mar 2019",
      url: "",
      iconUrl:
        "https://images.crunchbase.com/image/upload/c_pad,h_45,w_45,f_auto,b_white,q_auto:eco,dpr_2/v1475661441/u209agyn9xfoaz3hgn74.png",
    },
    {
      name: "Sequence Models",
      issuer: "Coursera",
      date: "Issued May 2018",
      url: "https://www.coursera.org/account/accomplishments/verify/NCXFA36KAY9A",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/5/5f/Coursera_logo_%282020%29.svg",
    },
    {
      name: "Building Deep Learning Applications with Keras 2.0",
      issuer: "LinkedIn",
      date: "Issued Apr 2018",
      url: "https://www.linkedin.com/learning/certificates/fc398f51cbb9c51f21bc4efd939dbc1983784d1f594fd3aa5539b8fa7c0a6d8e?trk=backfilled_certificate",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg",
    },
    {
      name: "Convolutional Neural Networks",
      issuer: "Coursera",
      date: "Issued Apr 2018",
      url: "https://www.coursera.org/account/accomplishments/verify/G22B5BQT2EVD",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/5/5f/Coursera_logo_%282020%29.svg",
    },
    {
      name: "Deep Learning Specialization",
      issuer: "Coursera",
      date: "Issued Apr 2018",
      url: "https://www.coursera.org/account/accomplishments/specialization/YM3QT6NZ8YM4",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/5/5f/Coursera_logo_%282020%29.svg",
    },
    {
      name: "Improving Deep Neural Networks: Hyperparameter tuning, Regularization and Optimization",
      issuer: "Coursera",
      date: "Issued Apr 2018",
      url: "https://www.coursera.org/account/accomplishments/verify/RUDJCVXHS278",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/5/5f/Coursera_logo_%282020%29.svg",
    },
    {
      name: "Neural Networks and Deep Learning",
      issuer: "Coursera",
      date: "Issued Apr 2018",
      url: "https://www.coursera.org/account/accomplishments/certificate/GJ4KY7LFM3XZ",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/5/5f/Coursera_logo_%282020%29.svg",
    },
    {
      name: "Structuring Machine Learning Projects",
      issuer: "Coursera",
      date: "Issued Apr 2018",
      url: "https://www.coursera.org/account/accomplishments/verify/G8YY4QDLZ235",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/5/5f/Coursera_logo_%282020%29.svg",
    },
    {
      name: "Complete Guide to TensorFlow for Deep Learning with Python",
      issuer: "Udemy",
      date: "Issued Mar 2018",
      url: "https://www.udemy.com/certificate/UC-0K0WASCO/",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    },
    {
      name: "Ensemble Machine Learning in Python: Random Forest, AdaBoost",
      issuer: "Udemy",
      date: "Issued Mar 2018",
      url: "https://www.udemy.com/certificate/UC-T239CF7J/",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    },
    {
      name: "Spark and Python for Big Data with PySpark",
      issuer: "Udemy",
      date: "Issued Mar 2018",
      url: "https://www.udemy.com/certificate/UC-O0JX4D2Z/",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    },
    {
      name: "Deep Learning Prerequisites: The Numpy Stack in Python",
      issuer: "Udemy",
      date: "Issued Feb 2018",
      url: "https://www.udemy.com/certificate/UC-4LTPZ28A/",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    },
    {
      name: "Google Analytics for Beginners",
      issuer: "Google",
      date: "Issued Feb 2018",
      url: "",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/240px-Google_%22G%22_logo.svg.png",
    },
    {
      name: "Salesforce Certified Platform Developer 1",
      issuer: "Salesforce",
      date: "Issued Apr 2018",
      url: "",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
    },
    {
      name: "Salesforce DEV 502 (Integrating with Force.com)",
      issuer: "Salesforce",
      date: "Issued Aug 2016",
      url: "",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
    },
    {
      name: "Salesforce Certified Administrator",
      issuer: "Salesforce",
      date: "Issued Nov 2015",
      url: "",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
    },
    {
      name: "Splunk Certified Knowledge Manager",
      issuer: "Splunk",
      date: "Issued Oct 2015",
      url: "",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/1/1d/Splunk_logo.svg",
    },
    {
      name: "Fundamentals of Core Java",
      issuer: "SEED Infotech Ltd",
      date: "Issued Apr 2018",
      url: "",
      iconUrl: "",
    },
    {
      name: "Basics of C & C++ Programming Languages",
      issuer: "C-DAC INDIA",
      date: "Issued Aug 2011",
      url: "",
      iconUrl: "",
    },
  ] as const,
  projects: [
    {
      title: "MenuStat",
      year: "2026",
      description:
        "A tiny native menu-bar monitor for macOS. I wanted one that was free, light, and did exactly what I needed, so I built it with Codex.",
      tags: ["Swift", "SwiftUI", "macOS"],
      image: "/blog/menustat/menustat-panel.png",
      links: [
        { label: "Website", href: "https://menustat.adhishthite.vercel.app/" },
      ],
    },
    {
      title: "ocloc",
      year: "2025",
      description:
        "A lines-of-code counter and my first Rust project. It runs about 23x faster than cloc and ships on Homebrew and crates.io.",
      tags: ["Rust", "CLI"],
      image: "",
      links: [
        { label: "GitHub", href: "https://github.com/adhishthite/ocloc" },
        { label: "crates.io", href: "https://crates.io/crates/ocloc" },
      ],
    },
    {
      title: "Observatory",
      year: "2026",
      description:
        "A real-time dashboard for every token my OpenClaw agent burns, built after 457 million tokens turned into a $650 bill.",
      tags: ["Convex", "Next.js", "Recharts"],
      image: "/blog/observatory-dashboard/og-pic.jpg",
      links: [
        {
          label: "Live",
          href: "https://openclaw-personal-usage-dashboard.vercel.app",
        },
      ],
    },
    {
      title: "convex-jina",
      year: "2026",
      description:
        "A Convex component for Jina AI's Reader and Search APIs, with durable caching and reactive queries. Listed in the official Convex Components directory.",
      tags: ["TypeScript", "Convex", "npm"],
      image: "",
      links: [
        { label: "GitHub", href: "https://github.com/adhishthite/convex-jina" },
        { label: "npm", href: "https://www.npmjs.com/package/convex-jina" },
      ],
    },
    {
      title: "GlucoWise",
      year: "2025",
      description:
        "A full-stack tracker for glucose, weight, meals, and workouts. A blood report scared me into building it when existing apps fell short.",
      tags: ["Convex", "Next.js"],
      image: "/blog/glucowise/landing-page.png",
      links: [{ label: "Website", href: "https://glucowise.app" }],
    },
    {
      title: "Dyson MCP Server",
      year: "2025",
      description:
        'An MCP server that lets Claude control my Dyson air purifier over local MQTT, so "make the air quieter" actually does something.',
      tags: ["Python", "MCP", "MQTT"],
      image: "/blog/dyson-mcp-server/og-pic.jpeg",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/adhishthite/dyson-control",
        },
      ],
    },
  ],
} as const;

/** The current full-time role: first `work` entry still running that isn't a program/badge role. */
export const CURRENT_ROLE =
  DATA.work.find((w) => w.end === "Present" && w.badges.length === 0) ??
  DATA.work[0];
