import { CandidateProfile, GithubAnalysis } from './types';

const badgeTS = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDUiIGZpbGw9IiMyZGQ0YmYiLz48dGV4dCB4PSI1MCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5UUzwvdGV4dD48L3N2Zz4=';
const badgeAPI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDUiIGZpbGw9IiNmNDNmNWUiLz48dGV4dCB4PSI1MCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5BUEk8L3RleHQ+PC9zdmc+';
const badgeReact = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDUiIGZpbGw9IiMzOGJkZjgiLz48dGV4dCB4PSI1MCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIzMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5SZWFjdDwvdGV4dD48L3N2Zz4=';
const badgePython = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDUiIGZpbGw9IiM0YjdjZmQiLz48dGV4dCB4PSI1MCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5QWTwvdGV4dD48L3N2Zz4=';
const badgeDocker = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDUiIGZpbGw9IiM2MGExZWEiLz48dGV4dCB4PSI1MCIgeT0iNjUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5Eb2NrZXI8L3RleHQ+PC9zdmc+';


export const mockCandidates = [
  {
    id: 'demo-candidate',
    name: 'Demo Candidate',
    email: 'candidate@testcredential.com',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    proficiency: ['Intermediate', 'Advanced', 'Intermediate', 'Beginner'],
    experience: '2 years',
    location: 'Remote',
    githubUsername: 'demo-candidate',
    profilePicture: 'https://randomuser.me/api/portraits/women/50.jpg',
    badges: [
      { skill: 'JavaScript', level: 'Intermediate', dateIssued: '2024-01-15' },
      { skill: 'React', level: 'Advanced', dateIssued: '2024-02-01' },
      { skill: 'Node.js', level: 'Intermediate', dateIssued: '2024-01-20' }
    ],
    githubAnalysis: {
      summary: 'Demo candidate profile for testing platform features and messaging functionality.',
      keySkills: [
        { skill: 'JavaScript', proficiency: 'Intermediate' },
        { skill: 'React', proficiency: 'Advanced' },
        { skill: 'Node.js', proficiency: 'Intermediate' },
        { skill: 'TypeScript', proficiency: 'Beginner' }
      ],
      techStack: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'HTML', 'CSS'],
      topRepositories: [
        { name: 'demo-portfolio', justification: 'Personal portfolio showcasing React skills' },
        { name: 'todo-app', justification: 'Full-stack application with Node.js backend' }
      ],
      codeQuality: { rating: 7, justification: 'Clean code with good documentation practices' },
      projectComplexity: { rating: 6, justification: 'Moderate complexity projects with good structure' },
      documentation: { rating: 8, justification: 'Well-documented code and clear README files' }
    }
  },
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    githubUsername: 'alexjohnson-dev-2025',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    proficiency: ['Expert', 'Expert', 'Advanced', 'Advanced'],
    badges: [
      { skill: 'JavaScript', level: 'Expert', dateIssued: '2024-01-15' },
      { skill: 'React', level: 'Expert', dateIssued: '2024-01-16' },
      { skill: 'Node.js', level: 'Advanced', dateIssued: '2024-01-17' },
      { skill: 'TypeScript', level: 'Advanced', dateIssued: '2024-01-18' }
    ],
    experience: '5 years',
    location: 'San Francisco, CA',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    githubAnalysis: {
      summary: "**Senior Full-Stack Developer** with **5+ years** of experience building scalable web applications.\n\n**Expertise:** Modern JavaScript frameworks, API design, and cloud deployment.\n\n**Notable:** Led development of **3 major e-commerce platforms** serving 100k+ users.",
      techStack: ["JavaScript", "React", "Node.js", "TypeScript", "MongoDB", "AWS"],
      keySkills: [
        { skill: "JavaScript", proficiency: "Expert" },
        { skill: "React", proficiency: "Expert" },
        { skill: "Node.js", proficiency: "Advanced" },
        { skill: "TypeScript", proficiency: "Advanced" }
      ],
      topRepositories: [
        { name: "ecommerce-platform", url: "https://github.com/alexjohnson-dev-2025/ecommerce-platform", justification: "**Full-stack e-commerce solution** with React frontend and Node.js backend. **Clean architecture** and comprehensive testing." },
        { name: "react-component-library", url: "https://github.com/alexjohnson-dev-2025/react-component-library", justification: "**Reusable component library** used by multiple teams. **Excellent documentation** and TypeScript support." }
      ],
      codeQuality: { rating: 9, justification: "**Exceptional code quality** with consistent patterns, comprehensive tests, and excellent documentation." },
      projectComplexity: { rating: 8, justification: "**Complex projects** involving microservices, real-time features, and high-traffic applications." },
      documentation: { rating: 9, justification: "**Outstanding documentation** with detailed READMEs, API docs, and inline comments." }
    }
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    githubUsername: 'sarahchen-frontend-2025',
    skills: ['Python', 'Frontend', 'UI/UX', 'React'],
    proficiency: ['Expert', 'Expert', 'Advanced', 'Advanced'],
    badges: [
      { skill: 'Python', level: 'Expert', dateIssued: '2024-01-10' },
      { skill: 'Frontend', level: 'Expert', dateIssued: '2024-01-11' },
      { skill: 'UI/UX', level: 'Advanced', dateIssued: '2024-01-12' },
      { skill: 'React', level: 'Advanced', dateIssued: '2024-01-13' }
    ],
    experience: '7 years',
    location: 'New York, NY',
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
    githubAnalysis: {
      summary: "**Creative Frontend Developer** with **strong design background** and **3+ years** of development experience.\n\n**Specializes:** User-centered design, responsive interfaces, and modern frontend frameworks.\n\n**Passion:** Creating **accessible and beautiful** web experiences.",
      techStack: ["React", "Python", "CSS3", "Figma", "JavaScript", "SASS"],
      keySkills: [
        { skill: "Frontend", proficiency: "Expert" },
        { skill: "UI/UX", proficiency: "Advanced" },
        { skill: "React", proficiency: "Advanced" },
        { skill: "Python", proficiency: "Expert" }
      ],
      topRepositories: [
        { name: "design-system", url: "https://github.com/sarahchen-frontend-2025/design-system", justification: "**Comprehensive design system** with React components. **Excellent accessibility** and responsive design." },
        { name: "portfolio-site", url: "https://github.com/sarahchen-frontend-2025/portfolio-site", justification: "**Beautiful portfolio** showcasing frontend skills. **Perfect Lighthouse scores** and smooth animations." }
      ],
      codeQuality: { rating: 8, justification: "**Clean, maintainable code** with focus on component reusability and performance optimization." },
      projectComplexity: { rating: 7, justification: "**Well-structured projects** with modern tooling, state management, and responsive design." },
      documentation: { rating: 8, justification: "**Good documentation** with setup guides, component stories, and design decisions explained." }
    }
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@email.com',
    githubUsername: 'mrodriguez-backend-2025',
    skills: ['Backend', 'Python', 'Full Stack', 'JavaScript'],
    proficiency: ['Expert', 'Expert', 'Advanced', 'Intermediate'],
    badges: [
      { skill: 'Backend', level: 'Expert', dateIssued: '2024-01-08' },
      { skill: 'Python', level: 'Expert', dateIssued: '2024-01-09' },
      { skill: 'Full Stack', level: 'Advanced', dateIssued: '2024-01-10' },
      { skill: 'JavaScript', level: 'Intermediate', dateIssued: '2024-01-11' }
    ],
    experience: '4 years',
    location: 'Austin, TX',
    profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg',
    githubAnalysis: {
      summary: "**Backend Specialist** with **6+ years** building **high-performance APIs** and distributed systems.\n\n**Expert in:** Python, microservices architecture, and database optimization.\n\n**Achievement:** Built systems handling **1M+ requests/day** with 99.9% uptime.",
      techStack: ["Python", "Django", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
      keySkills: [
        { skill: "Backend", proficiency: "Expert" },
        { skill: "Python", proficiency: "Expert" },
        { skill: "Full Stack", proficiency: "Advanced" },
        { skill: "JavaScript", proficiency: "Intermediate" }
      ],
      topRepositories: [
        { name: "api-gateway", url: "https://github.com/mrodriguez-backend-2025/api-gateway", justification: "**Scalable API gateway** handling authentication, rate limiting, and routing. **Production-ready** with comprehensive monitoring." },
        { name: "data-pipeline", url: "https://github.com/mrodriguez-backend-2025/data-pipeline", justification: "**Real-time data processing** pipeline using Python and Redis. **Handles millions** of events daily." }
      ],
      codeQuality: { rating: 9, justification: "**Enterprise-grade code** with extensive testing, error handling, and performance optimization." },
      projectComplexity: { rating: 9, justification: "**Highly complex systems** involving distributed architecture, real-time processing, and scalability challenges." },
      documentation: { rating: 7, justification: "**Technical documentation** covers architecture and APIs, could benefit from more user-friendly guides." }
    }
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    githubUsername: 'emilydavis-python-2025',
    skills: ['Backend', 'Python', 'Node.js', 'Full Stack'],
    proficiency: ['Advanced', 'Expert', 'Advanced', 'Intermediate'],
    badges: [
      { skill: 'Backend', level: 'Advanced', dateIssued: '2024-01-05' },
      { skill: 'Python', level: 'Expert', dateIssued: '2024-01-06' },
      { skill: 'Node.js', level: 'Advanced', dateIssued: '2024-01-07' },
      { skill: 'Full Stack', level: 'Intermediate', dateIssued: '2024-01-08' }
    ],
    experience: '6 years',
    location: 'Seattle, WA',
    profilePicture: 'https://randomuser.me/api/portraits/women/4.jpg',
    githubAnalysis: {
      summary: "**Backend Engineer** with **6+ years** specializing in **scalable server architecture** and database optimization.\n\n**Expertise:** Python frameworks, API development, and cloud infrastructure.\n\n**Impact:** Reduced server response times by **40%** across multiple production systems.",
      techStack: ["Python", "Django", "Node.js", "PostgreSQL", "Redis", "Docker"],
      keySkills: [
        { skill: "Backend", proficiency: "Advanced" },
        { skill: "Python", proficiency: "Expert" },
        { skill: "Node.js", proficiency: "Advanced" },
        { skill: "Full Stack", proficiency: "Intermediate" }
      ],
      topRepositories: [
        { name: "microservices-api", url: "https://github.com/emilydavis-python-2025/microservices-api", justification: "**Robust microservices architecture** with Python and Docker. **Excellent error handling** and monitoring integration." },
        { name: "database-optimizer", url: "https://github.com/emilydavis-python-2025/database-optimizer", justification: "**Performance optimization tools** for PostgreSQL. **Significant impact** on query performance and scalability." }
      ],
      codeQuality: { rating: 8, justification: "**High-quality code** with comprehensive testing, clear structure, and performance considerations." },
      projectComplexity: { rating: 8, justification: "**Complex backend systems** with distributed architecture, caching strategies, and real-time processing." },
      documentation: { rating: 7, justification: "**Good technical documentation** with API specs and deployment guides, could use more examples." }
    }
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david.kim@email.com',
    githubUsername: 'davidkim-fullstack-2025',
    skills: ['Full Stack', 'TypeScript', 'React', 'Backend'],
    proficiency: ['Expert', 'Advanced', 'Advanced', 'Intermediate'],
    badges: [
      { skill: 'Full Stack', level: 'Expert', dateIssued: '2024-01-03' },
      { skill: 'TypeScript', level: 'Advanced', dateIssued: '2024-01-04' },
      { skill: 'React', level: 'Advanced', dateIssued: '2024-01-05' },
      { skill: 'Backend', level: 'Intermediate', dateIssued: '2024-01-06' }
    ],
    experience: '8 years',
    location: 'Los Angeles, CA',
    profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg',
    githubAnalysis: {
      summary: "**Full-Stack Architect** with **8+ years** building **end-to-end applications** with modern tech stacks.\n\n**Specializes:** TypeScript, React ecosystems, and seamless frontend-backend integration.\n\n**Leadership:** Mentored **15+ developers** and led architecture decisions for enterprise applications.",
      techStack: ["TypeScript", "React", "Next.js", "Node.js", "GraphQL", "AWS"],
      keySkills: [
        { skill: "Full Stack", proficiency: "Expert" },
        { skill: "TypeScript", proficiency: "Advanced" },
        { skill: "React", proficiency: "Advanced" },
        { skill: "Backend", proficiency: "Intermediate" }
      ],
      topRepositories: [
        { name: "enterprise-dashboard", url: "https://github.com/davidkim-fullstack-2025/enterprise-dashboard", justification: "**Complete enterprise solution** with React/TypeScript frontend and Node.js backend. **Excellent architecture** and code organization." },
        { name: "graphql-starter", url: "https://github.com/davidkim-fullstack-2025/graphql-starter", justification: "**Production-ready GraphQL** setup with TypeScript. **Widely adopted** by development teams as a starting template." }
      ],
      codeQuality: { rating: 9, justification: "**Exceptional code quality** with TypeScript best practices, comprehensive testing, and clean architecture patterns." },
      projectComplexity: { rating: 8, justification: "**Sophisticated full-stack applications** with complex state management, real-time features, and scalable architecture." },
      documentation: { rating: 8, justification: "**Comprehensive documentation** with setup guides, architecture decisions, and code examples." }
    }
  },
  {
    id: '6',
    name: 'Jessica Williams',
    email: 'jessica.williams@email.com',
    githubUsername: 'jessicaw-uiux-2025',
    skills: ['UI/UX', 'Frontend', 'JavaScript', 'React'],
    proficiency: ['Expert', 'Advanced', 'Intermediate', 'Advanced'],
    badges: [
      { skill: 'UI/UX', level: 'Expert', dateIssued: '2024-01-01' },
      { skill: 'Frontend', level: 'Advanced', dateIssued: '2024-01-02' },
      { skill: 'JavaScript', level: 'Intermediate', dateIssued: '2024-01-03' },
      { skill: 'React', level: 'Advanced', dateIssued: '2024-01-04' }
    ],
    experience: '5 years',
    location: 'Chicago, IL',
    profilePicture: 'https://randomuser.me/api/portraits/women/6.jpg',
    githubAnalysis: {
      summary: "**UI/UX Developer** with **5+ years** creating **user-centered digital experiences** that drive engagement.\n\n**Combines:** Design thinking with technical implementation for **pixel-perfect** interfaces.\n\n**Achievement:** Improved user engagement by **60%** through redesigned interfaces and accessibility improvements.",
      techStack: ["React", "JavaScript", "CSS3", "Figma", "Storybook", "SASS"],
      keySkills: [
        { skill: "UI/UX", proficiency: "Expert" },
        { skill: "Frontend", proficiency: "Advanced" },
        { skill: "React", proficiency: "Advanced" },
        { skill: "JavaScript", proficiency: "Intermediate" }
      ],
      topRepositories: [
        { name: "accessible-components", url: "https://github.com/jessicaw-uiux-2025/accessible-components", justification: "**Accessibility-first component library** with WCAG compliance. **Excellent documentation** and real-world usage examples." },
        { name: "design-tokens", url: "https://github.com/jessicaw-uiux-2025/design-tokens", justification: "**Design system tokens** for consistent UI across platforms. **Innovative approach** to design-development collaboration." }
      ],
      codeQuality: { rating: 8, justification: "**Clean, semantic code** with focus on accessibility, performance, and maintainable CSS architecture." },
      projectComplexity: { rating: 7, justification: "**Well-crafted frontend projects** with complex animations, responsive design, and accessibility features." },
      documentation: { rating: 9, justification: "**Outstanding documentation** with visual examples, usage guidelines, and accessibility notes." }
    }
  },
  {
    id: '7',
    name: 'Robert Taylor',
    email: 'robert.taylor@email.com',
    githubUsername: 'robertt-enterprise-2025',
    skills: ['Python', 'Backend', 'Full Stack', 'JavaScript'],
    proficiency: ['Expert', 'Expert', 'Advanced', 'Intermediate'],
    badges: [
      { skill: 'Python', level: 'Expert', dateIssued: '2023-12-28' },
      { skill: 'Backend', level: 'Expert', dateIssued: '2023-12-29' },
      { skill: 'Full Stack', level: 'Advanced', dateIssued: '2023-12-30' },
      { skill: 'JavaScript', level: 'Intermediate', dateIssued: '2023-12-31' }
    ],
    experience: '9 years',
    location: 'Boston, MA',
    profilePicture: 'https://randomuser.me/api/portraits/men/7.jpg',
    githubAnalysis: {
      summary: "**Senior Python Engineer** with **9+ years** building **enterprise-grade backend systems** and data platforms.\n\n**Expertise:** Python ecosystems, distributed systems, and performance optimization.\n\n**Leadership:** Technical lead for **5 major projects** serving millions of users with **99.99% uptime**.",
      techStack: ["Python", "Django", "FastAPI", "PostgreSQL", "Redis", "Kubernetes"],
      keySkills: [
        { skill: "Python", proficiency: "Expert" },
        { skill: "Backend", proficiency: "Expert" },
        { skill: "Full Stack", proficiency: "Advanced" },
        { skill: "JavaScript", proficiency: "Intermediate" }
      ],
      topRepositories: [
        { name: "enterprise-api-framework", url: "https://github.com/robertt-enterprise-2025/enterprise-api-framework", justification: "**Production-ready API framework** built with FastAPI. **Used by 50+ teams** across the organization with excellent performance." },
        { name: "data-processing-engine", url: "https://github.com/robertt-enterprise-2025/data-processing-engine", justification: "**High-throughput data processor** handling **10M+ records/day**. **Exceptional architecture** with monitoring and auto-scaling." }
      ],
      codeQuality: { rating: 9, justification: "**Enterprise-level code quality** with comprehensive testing, documentation, and performance benchmarks." },
      projectComplexity: { rating: 9, justification: "**Highly complex systems** involving distributed processing, real-time analytics, and enterprise integrations." },
      documentation: { rating: 8, justification: "**Thorough technical documentation** with architecture diagrams, API specs, and deployment guides." }
    }
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    githubUsername: 'lisaanderson-react-2025',
    skills: ['React', 'TypeScript', 'Frontend', 'JavaScript'],
    proficiency: ['Advanced', 'Advanced', 'Expert', 'Advanced'],
    badges: [
      { skill: 'React', level: 'Advanced', dateIssued: '2023-12-25' },
      { skill: 'TypeScript', level: 'Advanced', dateIssued: '2023-12-26' },
      { skill: 'Frontend', level: 'Expert', dateIssued: '2023-12-27' },
      { skill: 'JavaScript', level: 'Advanced', dateIssued: '2023-12-28' }
    ],
    experience: '4 years',
    location: 'Denver, CO',
    profilePicture: 'https://randomuser.me/api/portraits/women/8.jpg',
    githubAnalysis: {
      summary: "**Frontend Specialist** with **4+ years** crafting **high-performance React applications** with modern TypeScript.\n\n**Focus:** Component architecture, state management, and developer experience optimization.\n\n**Innovation:** Created **reusable patterns** adopted by **20+ frontend teams** across multiple products.",
      techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Zustand", "Vite"],
      keySkills: [
        { skill: "Frontend", proficiency: "Expert" },
        { skill: "React", proficiency: "Advanced" },
        { skill: "TypeScript", proficiency: "Advanced" },
        { skill: "JavaScript", proficiency: "Advanced" }
      ],
      topRepositories: [
        { name: "react-performance-toolkit", url: "https://github.com/lisaanderson-react-2025/react-performance-toolkit", justification: "**Performance optimization library** for React apps. **Significant impact** on bundle size and runtime performance across projects." },
        { name: "typescript-patterns", url: "https://github.com/lisaanderson-react-2025/typescript-patterns", justification: "**TypeScript best practices** and patterns collection. **Widely referenced** by frontend developers for type-safe React development." }
      ],
      codeQuality: { rating: 8, justification: "**High-quality TypeScript code** with excellent type safety, testing coverage, and performance considerations." },
      projectComplexity: { rating: 7, justification: "**Sophisticated frontend applications** with complex state management, real-time features, and performance optimization." },
      documentation: { rating: 8, justification: "**Excellent documentation** with code examples, performance guides, and TypeScript usage patterns." }
    }
  },
  {
    id: '9',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    githubUsername: 'jameswilson-nodejs-2025',
    skills: ['Node.js', 'JavaScript', 'Backend', 'Full Stack'],
    proficiency: ['Expert', 'Expert', 'Advanced', 'Intermediate'],
    badges: [
      { skill: 'Node.js', level: 'Expert', dateIssued: '2023-12-22' },
      { skill: 'JavaScript', level: 'Expert', dateIssued: '2023-12-23' },
      { skill: 'Backend', level: 'Advanced', dateIssued: '2023-12-24' },
      { skill: 'Full Stack', level: 'Intermediate', dateIssued: '2023-12-25' }
    ],
    experience: '6 years',
    location: 'Miami, FL',
    profilePicture: 'https://randomuser.me/api/portraits/men/9.jpg',
    githubAnalysis: {
      summary: "**Node.js Expert** with **6+ years** building **scalable backend services** and real-time applications.\n\n**Specializes:** Event-driven architecture, WebSocket implementations, and API optimization.\n\n**Achievement:** Built **real-time chat system** supporting **100k+ concurrent users** with sub-100ms latency.",
      techStack: ["Node.js", "Express", "Socket.io", "MongoDB", "Redis", "AWS Lambda"],
      keySkills: [
        { skill: "Node.js", proficiency: "Expert" },
        { skill: "JavaScript", proficiency: "Expert" },
        { skill: "Backend", proficiency: "Advanced" },
        { skill: "Full Stack", proficiency: "Intermediate" }
      ],
      topRepositories: [
        { name: "realtime-chat-engine", url: "https://github.com/jameswilson-nodejs-2025/realtime-chat-engine", justification: "**Production-grade chat system** with Node.js and Socket.io. **Handles massive scale** with excellent performance and reliability." },
        { name: "api-rate-limiter", url: "https://github.com/jameswilson-nodejs-2025/api-rate-limiter", justification: "**Advanced rate limiting** middleware for Express. **Widely adopted** with **5k+ GitHub stars** and production usage." }
      ],
      codeQuality: { rating: 8, justification: "**Clean, efficient JavaScript** with comprehensive error handling, logging, and performance monitoring." },
      projectComplexity: { rating: 8, justification: "**Complex real-time systems** with event-driven architecture, WebSocket management, and high-concurrency handling." },
      documentation: { rating: 7, justification: "**Good technical documentation** with API references and deployment guides, could benefit from more tutorials." }
    }
  },
  {
    id: '10',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    githubUsername: 'mariagarcia-django-2025',
    skills: ['Full Stack', 'Python', 'React', 'Frontend'],
    proficiency: ['Advanced', 'Expert', 'Advanced', 'Intermediate'],
    badges: [
      { skill: 'Full Stack', level: 'Advanced', dateIssued: '2023-12-19' },
      { skill: 'Python', level: 'Expert', dateIssued: '2023-12-20' },
      { skill: 'React', level: 'Advanced', dateIssued: '2023-12-21' },
      { skill: 'Frontend', level: 'Intermediate', dateIssued: '2023-12-22' }
    ],
    experience: '5 years',
    location: 'Phoenix, AZ',
    profilePicture: 'https://randomuser.me/api/portraits/women/10.jpg',
    githubAnalysis: {
      summary: "**Full-Stack Developer** with **5+ years** building **data-driven web applications** with Python and React.\n\n**Expertise:** Seamless integration between Python backends and modern React frontends.\n\n**Impact:** Delivered **8 major applications** that improved business processes and user engagement by **45%**.",
      techStack: ["Python", "React", "Django", "PostgreSQL", "JavaScript", "Docker"],
      keySkills: [
        { skill: "Full Stack", proficiency: "Advanced" },
        { skill: "Python", proficiency: "Expert" },
        { skill: "React", proficiency: "Advanced" },
        { skill: "Frontend", proficiency: "Intermediate" }
      ],
      topRepositories: [
        { name: "analytics-dashboard", url: "https://github.com/mariagarcia-django-2025/analytics-dashboard", justification: "**Complete analytics platform** with Python backend and React frontend. **Excellent data visualization** and real-time updates." },
        { name: "django-react-starter", url: "https://github.com/mariagarcia-django-2025/django-react-starter", justification: "**Production-ready template** for Django-React applications. **Popular starter kit** with authentication and deployment setup." }
      ],
      codeQuality: { rating: 8, justification: "**Well-structured code** with clear separation of concerns, comprehensive testing, and good documentation." },
      projectComplexity: { rating: 7, justification: "**Solid full-stack applications** with database integration, API design, and responsive user interfaces." },
      documentation: { rating: 8, justification: "**Good documentation** with setup guides, API documentation, and code examples for both frontend and backend." }
    }
  },
  {
    id: '11',
    name: 'Kevin Brown',
    email: 'kevin.brown@email.com',
    githubUsername: 'kevinbrown-typescript-2025',
    skills: ['TypeScript', 'Frontend', 'UI/UX', 'React'],
    proficiency: ['Expert', 'Advanced', 'Intermediate', 'Advanced'],
    badges: [
      { skill: 'TypeScript', level: 'Expert', dateIssued: '2023-12-16' },
      { skill: 'Frontend', level: 'Advanced', dateIssued: '2023-12-17' },
      { skill: 'UI/UX', level: 'Intermediate', dateIssued: '2023-12-18' },
      { skill: 'React', level: 'Advanced', dateIssued: '2023-12-19' }
    ],
    experience: '7 years',
    location: 'Portland, OR',
    profilePicture: 'https://randomuser.me/api/portraits/men/11.jpg',
    githubAnalysis: {
      summary: "**TypeScript Architect** with **7+ years** creating **type-safe frontend applications** with exceptional developer experience.\n\n**Specializes:** Advanced TypeScript patterns, component libraries, and developer tooling.\n\n**Recognition:** **TypeScript community contributor** with **10k+ GitHub stars** across open-source projects.",
      techStack: ["TypeScript", "React", "Next.js", "Storybook", "Webpack", "ESLint"],
      keySkills: [
        { skill: "TypeScript", proficiency: "Expert" },
        { skill: "Frontend", proficiency: "Advanced" },
        { skill: "React", proficiency: "Advanced" },
        { skill: "UI/UX", proficiency: "Intermediate" }
      ],
      topRepositories: [
        { name: "typescript-react-patterns", url: "https://github.com/kevinbrown-typescript-2025/typescript-react-patterns", justification: "**Advanced TypeScript patterns** for React development. **Highly regarded** by the TypeScript community with excellent examples." },
        { name: "component-library-toolkit", url: "https://github.com/kevinbrown-typescript-2025/component-library-toolkit", justification: "**Complete toolkit** for building TypeScript component libraries. **Production-ready** with automated testing and documentation." }
      ],
      codeQuality: { rating: 9, justification: "**Exceptional TypeScript code** with advanced type safety, comprehensive testing, and excellent architectural patterns." },
      projectComplexity: { rating: 8, justification: "**Complex TypeScript applications** with advanced patterns, build tooling, and developer experience optimization." },
      documentation: { rating: 9, justification: "**Outstanding documentation** with TypeScript examples, API references, and comprehensive guides." }
    }
  },
  {
    id: '12',
    name: 'Amanda Lee',
    email: 'amanda.lee@email.com',
    githubUsername: 'amandalee-react-2025',
    skills: ['JavaScript', 'React', 'Full Stack', 'Frontend'],
    proficiency: ['Advanced', 'Expert', 'Advanced', 'Advanced'],
    badges: [
      { skill: 'JavaScript', level: 'Advanced', dateIssued: '2023-12-13' },
      { skill: 'React', level: 'Expert', dateIssued: '2023-12-14' },
      { skill: 'Full Stack', level: 'Advanced', dateIssued: '2023-12-15' },
      { skill: 'Frontend', level: 'Advanced', dateIssued: '2023-12-16' }
    ],
    experience: '4 years',
    location: 'Nashville, TN',
    profilePicture: 'https://randomuser.me/api/portraits/women/12.jpg',
    githubAnalysis: {
      summary: "**React Specialist** with **4+ years** building **interactive user interfaces** and modern web applications.\n\n**Focus:** Component architecture, state management, and performance optimization in React ecosystems.\n\n**Achievement:** Built **e-learning platform** serving **50k+ students** with **98% user satisfaction** ratings.",
      techStack: ["React", "JavaScript", "Redux", "Next.js", "Tailwind CSS", "Node.js"],
      keySkills: [
        { skill: "React", proficiency: "Expert" },
        { skill: "JavaScript", proficiency: "Advanced" },
        { skill: "Full Stack", proficiency: "Advanced" },
        { skill: "Frontend", proficiency: "Advanced" }
      ],
      topRepositories: [
        { name: "react-learning-platform", url: "https://github.com/amandalee-react-2025/react-learning-platform", justification: "**Complete e-learning application** with React and Node.js. **Excellent user experience** with interactive features and progress tracking." },
        { name: "react-state-patterns", url: "https://github.com/amandalee-react-2025/react-state-patterns", justification: "**State management patterns** for React applications. **Practical examples** of Redux, Context, and custom hooks implementation." }
      ],
      codeQuality: { rating: 8, justification: "**Clean React code** with excellent component design, proper state management, and comprehensive testing." },
      projectComplexity: { rating: 7, justification: "**Well-architected React applications** with complex state management, routing, and user interaction patterns." },
      documentation: { rating: 8, justification: "**Good documentation** with component examples, state management guides, and deployment instructions." }
    }
  },
  {
    id: '13',
    name: 'Daniel Martinez',
    email: 'daniel.martinez@email.com',
    githubUsername: 'danielmartinez-backend-2025',
    skills: ['Backend', 'Node.js', 'Python', 'JavaScript'],
    proficiency: ['Expert', 'Advanced', 'Advanced', 'Intermediate'],
    badges: [
      { skill: 'Backend', level: 'Expert', dateIssued: '2023-12-10' },
      { skill: 'Node.js', level: 'Advanced', dateIssued: '2023-12-11' },
      { skill: 'Python', level: 'Advanced', dateIssued: '2023-12-12' },
      { skill: 'JavaScript', level: 'Intermediate', dateIssued: '2023-12-13' }
    ],
    experience: '8 years',
    location: 'Atlanta, GA',
    profilePicture: 'https://randomuser.me/api/portraits/men/13.jpg',
    githubAnalysis: {
      summary: "**Backend Infrastructure Expert** with **8+ years** designing **robust server architectures** and distributed systems.\n\n**Specializes:** Multi-language backend development, API design, and system scalability.\n\n**Leadership:** **Technical architect** for **12 major projects** with **zero downtime** deployments and **sub-50ms** response times.",
      techStack: ["Python", "Node.js", "Express", "FastAPI", "PostgreSQL", "Docker"],
      keySkills: [
        { skill: "Backend", proficiency: "Expert" },
        { skill: "Node.js", proficiency: "Advanced" },
        { skill: "Python", proficiency: "Advanced" },
        { skill: "JavaScript", proficiency: "Intermediate" }
      ],
      topRepositories: [
        { name: "multi-service-architecture", url: "https://github.com/danielmartinez-backend-2025/multi-service-architecture", justification: "**Enterprise microservices platform** with Python and Node.js. **Exceptional scalability** and monitoring with production deployment guides." },
        { name: "api-performance-optimizer", url: "https://github.com/danielmartinez-backend-2025/api-performance-optimizer", justification: "**Performance optimization toolkit** for backend APIs. **Significant impact** on response times and resource utilization across teams." }
      ],
      codeQuality: { rating: 9, justification: "**Enterprise-level code quality** with comprehensive testing, monitoring, and performance benchmarks." },
      projectComplexity: { rating: 9, justification: "**Highly sophisticated backend systems** with distributed architecture, load balancing, and real-time processing." },
      documentation: { rating: 8, justification: "**Thorough technical documentation** with architecture diagrams, performance metrics, and deployment procedures." }
    }
  },
  {
    id: '14',
    name: 'Rachel Thompson',
    email: 'rachel.thompson@email.com',
    githubUsername: 'rachelthompson-performance-2025',
    skills: ['Frontend', 'JavaScript', 'TypeScript', 'UI/UX'],
    proficiency: ['Expert', 'Advanced', 'Advanced', 'Intermediate'],
    badges: [
      { skill: 'Frontend', level: 'Expert', dateIssued: '2023-12-07' },
      { skill: 'JavaScript', level: 'Advanced', dateIssued: '2023-12-08' },
      { skill: 'TypeScript', level: 'Advanced', dateIssued: '2023-12-09' },
      { skill: 'UI/UX', level: 'Intermediate', dateIssued: '2023-12-10' }
    ],
    experience: '6 years',
    location: 'San Diego, CA',
    profilePicture: 'https://randomuser.me/api/portraits/women/14.jpg',
    githubAnalysis: {
      summary: "**Frontend Performance Engineer** with **6+ years** optimizing **user experiences** and building **lightning-fast web applications**.\n\n**Expertise:** Advanced JavaScript optimization, TypeScript architecture, and performance monitoring.\n\n**Achievement:** Improved **Core Web Vitals** by **70%** across **15+ production applications** serving millions of users.",
      techStack: ["JavaScript", "TypeScript", "React", "Vue.js", "Webpack", "Vite"],
      keySkills: [
        { skill: "Frontend", proficiency: "Expert" },
        { skill: "JavaScript", proficiency: "Advanced" },
        { skill: "TypeScript", proficiency: "Advanced" },
        { skill: "UI/UX", proficiency: "Intermediate" }
      ],
      topRepositories: [
        { name: "frontend-performance-suite", url: "https://github.com/rachelthompson-performance-2025/frontend-performance-suite", justification: "**Comprehensive performance optimization tools** for frontend applications. **Industry-leading** bundle analysis and runtime optimization techniques." },
        { name: "typescript-performance-patterns", url: "https://github.com/rachelthompson-performance-2025/typescript-performance-patterns", justification: "**Advanced TypeScript patterns** for performance-critical applications. **Widely adopted** by frontend teams for optimization strategies." }
      ],
      codeQuality: { rating: 9, justification: "**Exceptional frontend code** with performance-first approach, comprehensive testing, and excellent TypeScript practices." },
      projectComplexity: { rating: 8, justification: "**Complex performance-optimized applications** with advanced bundling, lazy loading, and runtime optimization strategies." },
      documentation: { rating: 8, justification: "**Excellent performance documentation** with benchmarks, optimization guides, and real-world case studies." }
    }
  },
  {
    id: '15',
    name: 'Christopher White',
    email: 'christopher.white@email.com',
    githubUsername: 'chriswhite-architect-2025',
    skills: ['Full Stack', 'React', 'Node.js', 'Backend'],
    proficiency: ['Expert', 'Expert', 'Advanced', 'Advanced'],
    badges: [
      { skill: 'Full Stack', level: 'Expert', dateIssued: '2023-12-04' },
      { skill: 'React', level: 'Expert', dateIssued: '2023-12-05' },
      { skill: 'Node.js', level: 'Advanced', dateIssued: '2023-12-06' },
      { skill: 'Backend', level: 'Advanced', dateIssued: '2023-12-07' }
    ],
    experience: '10 years',
    location: 'Dallas, TX',
    profilePicture: 'https://randomuser.me/api/portraits/men/15.jpg',
    githubAnalysis: {
      summary: "**Senior Full-Stack Architect** with **10+ years** leading **enterprise application development** and technical strategy.\n\n**Expertise:** End-to-end application architecture, team leadership, and scalable system design.\n\n**Leadership:** **CTO-level contributor** who has **mentored 50+ developers** and architected systems serving **10M+ users** globally.",
      techStack: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL", "Redis"],
      keySkills: [
        { skill: "Full Stack", proficiency: "Expert" },
        { skill: "React", proficiency: "Expert" },
        { skill: "Node.js", proficiency: "Advanced" },
        { skill: "Backend", proficiency: "Advanced" }
      ],
      topRepositories: [
        { name: "enterprise-app-framework", url: "https://github.com/chriswhite-architect-2025/enterprise-app-framework", justification: "**Complete enterprise application framework** with React and Node.js. **Production-proven** architecture used by **multiple Fortune 500 companies**." },
        { name: "scalable-system-patterns", url: "https://github.com/chriswhite-architect-2025/scalable-system-patterns", justification: "**System design patterns** for scalable applications. **Authoritative resource** with **15k+ GitHub stars** and industry recognition." }
      ],
      codeQuality: { rating: 10, justification: "**World-class code quality** with architectural excellence, comprehensive testing, and industry-leading best practices." },
      projectComplexity: { rating: 10, justification: "**Extremely complex enterprise systems** with multi-service architecture, global scalability, and advanced performance optimization." },
      documentation: { rating: 9, justification: "**Exceptional documentation** with architectural decisions, scalability guides, and comprehensive API references." }
    }
  }
];

export const mockAnalysis = {
  summary: "A proficient full-stack developer with demonstrated expertise in TypeScript and React for frontend development, and Node.js for backend solutions. Shows strong potential in building complex, scalable applications and has a good grasp of modern development practices. The top repositories highlight a focus on web technologies and API design.",
  techStack: ["TypeScript", "React", "Node.js", "Express", "Firebase", "CSS-in-JS", "Next.js"],
  keySkills: [
    { skill: "Frontend Development", proficiency: "Expert" },
    { skill: "Backend API Design", proficiency: "Advanced" },
    { skill: "TypeScript", proficiency: "Expert" },
    { skill: "Cloud Services (Firebase)", proficiency: "Intermediate" },
  ],
  topRepositories: [
    { name: "portfolio-nextjs", url: "https://github.com/mockuser/portfolio-nextjs", justification: "A well-structured portfolio site showcasing strong React and Next.js skills. Good component design and clean code." },
    { name: "api-task-manager", url: "https://github.com/mockuser/api-task-manager", justification: "Demonstrates solid backend skills with Node.js and Express, including JWT authentication and RESTful principles." },
    { name: "react-design-system", url: "https://github.com/mockuser/react-design-system", justification: "An ambitious project to create a reusable component library, indicating a deep understanding of React and component architecture." },
  ],
  codeQuality: { rating: 8, justification: "Code is generally clean, well-organized, and follows modern best practices." },
  projectComplexity: { rating: 7, justification: "Projects show a good level of complexity, tackling real-world problems like authentication and state management." },
  documentation: { rating: 6, justification: "README files are present but could be more detailed with setup instructions and API documentation." },
};

export const mockRecruiters = [
  {
    id: 'demo-recruiter',
    name: 'Demo Recruiter',
    title: 'Demo Technical Recruiter',
    company: 'DevCaliber Demo',
    location: 'Remote',
    experience: '3 years',
    specialization: 'Full-Stack & Frontend Engineers',
    hiredCount: 25,
    email: 'recruiter@testcredential.com',
    profilePicture: 'https://randomuser.me/api/portraits/men/50.jpg',
    description: 'Demo recruiter account for testing platform features and functionality.',
    viewedAt: '5 mins ago'
  },
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Senior Technical Recruiter',
    company: 'Google',
    viewedAt: '2 hours ago',
    email: 'sarah.chen@google.com',
    profilePicture: 'https://randomuser.me/api/portraits/women/21.jpg',
    location: 'Mountain View, CA',
    experience: '8 years',
    specialization: 'Frontend & Full-Stack Engineers',
    hiredCount: 150,
    description: 'Specialized in recruiting top-tier frontend and full-stack engineers for Google\'s core products. Expert in identifying React, TypeScript, and JavaScript talent.'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    title: 'Talent Acquisition Manager',
    company: 'Microsoft',
    viewedAt: '5 hours ago',
    email: 'michael.rodriguez@microsoft.com',
    profilePicture: 'https://randomuser.me/api/portraits/men/22.jpg',
    location: 'Seattle, WA',
    experience: '10 years',
    specialization: 'Backend & Cloud Engineers',
    hiredCount: 200,
    description: 'Leading talent acquisition for Microsoft Azure and backend services. Focuses on Python, Node.js, and cloud infrastructure specialists.'
  },
  {
    id: '3',
    name: 'Emily Johnson',
    title: 'Engineering Recruiter',
    company: 'Amazon',
    viewedAt: '1 day ago',
    email: 'emily.johnson@amazon.com',
    profilePicture: 'https://randomuser.me/api/portraits/women/23.jpg',
    location: 'Seattle, WA',
    experience: '6 years',
    specialization: 'Full-Stack & DevOps Engineers',
    hiredCount: 120,
    description: 'Recruiting engineering talent for Amazon Web Services and e-commerce platforms. Expert in full-stack development and DevOps practices.'
  },
  {
    id: '4',
    name: 'David Kim',
    title: 'Technical Talent Partner',
    company: 'Meta',
    viewedAt: '2 days ago',
    email: 'david.kim@meta.com',
    profilePicture: 'https://randomuser.me/api/portraits/men/24.jpg',
    location: 'Menlo Park, CA',
    experience: '7 years',
    specialization: 'React & Mobile Engineers',
    hiredCount: 180,
    description: 'Partnering with Meta\'s product teams to hire React, React Native, and mobile engineering talent for social media platforms.'
  },
  {
    id: '5',
    name: 'Jessica Williams',
    title: 'Senior Recruiter',
    company: 'Netflix',
    viewedAt: '3 days ago',
    email: 'jessica.williams@netflix.com',
    profilePicture: 'https://randomuser.me/api/portraits/women/25.jpg',
    location: 'Los Gatos, CA',
    experience: '9 years',
    specialization: 'UI/UX & Frontend Engineers',
    hiredCount: 140,
    description: 'Recruiting creative technologists and frontend engineers for Netflix\'s streaming platform and user experience teams.'
  },
  {
    id: '6',
    name: 'Robert Taylor',
    title: 'Lead Technical Recruiter',
    company: 'Apple',
    viewedAt: '4 days ago',
    email: 'robert.taylor@apple.com',
    profilePicture: 'https://randomuser.me/api/portraits/men/26.jpg',
    location: 'Cupertino, CA',
    experience: '12 years',
    specialization: 'iOS & System Engineers',
    hiredCount: 220,
    description: 'Leading technical recruitment for Apple\'s hardware and software engineering teams. Specializes in iOS, macOS, and system-level development.'
  },
  {
    id: '7',
    name: 'Lisa Anderson',
    title: 'Talent Acquisition Specialist',
    company: 'Spotify',
    viewedAt: '5 days ago',
    email: 'lisa.anderson@spotify.com',
    profilePicture: 'https://randomuser.me/api/portraits/women/27.jpg',
    location: 'New York, NY',
    experience: '5 years',
    specialization: 'Backend & Data Engineers',
    hiredCount: 90,
    description: 'Recruiting backend and data engineering talent for Spotify\'s music streaming and recommendation systems.'
  },
  {
    id: '8',
    name: 'James Wilson',
    title: 'Senior Talent Acquisition Specialist',
    company: 'Airbnb',
    viewedAt: '1 week ago',
    email: 'james.wilson@airbnb.com',
    profilePicture: 'https://randomuser.me/api/portraits/men/28.jpg',
    location: 'San Francisco, CA',
    experience: '6 years',
    specialization: 'Full-Stack & Mobile Engineers',
    hiredCount: 110,
    description: 'Recruiting full-stack and mobile engineering talent for Airbnb\'s platform and host experience teams.'
  },
  {
    id: '9',
    name: 'Amanda Chen',
    title: 'Principal Technical Recruiter',
    company: 'Tesla',
    viewedAt: '1 week ago',
    email: 'amanda.chen@tesla.com',
    profilePicture: 'https://randomuser.me/api/portraits/women/29.jpg',
    location: 'Austin, TX',
    experience: '11 years',
    specialization: 'Embedded & Automotive Software Engineers',
    hiredCount: 160,
    description: 'Leading technical recruitment for Tesla\'s autonomous driving and embedded systems teams. Expert in C++, embedded systems, and automotive software talent.'
  }
];
