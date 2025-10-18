# DevCaliber

**An AI-Powered Technical Talent Intelligence Hiring Platform**

DevCaliber is a secure technical talent intelligence platform that transforms hiring through Auth0-secured AI agents, delivering
authenticated GitHub ownership verification, AI-verified skill credentials, and role-based talent discovery for enterprise
recruitment. It bridges the gap between authentic technical talent and skills-first recruiters.

## 🚀 Live Demo

**Production Site:** [DevCaliber](https://devcaliber.netlify.app)

<img width="1920" height="2527" alt="devcaliber-landing page" src="https://github.com/user-attachments/assets/9851ffe0-a3a2-49eb-b958-7ba1dab9c37a" />


### Demo Accounts
- **Admin:** `admin@testcredential.com` password:`1234test*`
- **Recruiter:** `recruiter@testcredential.com` password:`1234test*`
- **Candidate:** `candidate@testcredential.com` password:`1234test*`

## ✨ Key Features

### For Developers
- Authenticated GitHub Analysis - AI analyzes your verified repositories with skill proficiency scoring and code quality assessment.
- Verified Skill Credentials - Digital badges with timestamps based on actual code analysis, not self-reported skills.
- Professional Profiles - Comprehensive developer portfolios with quantified GitHub metrics and project showcases.
- Recruiter Discovery - Connect with verified, skills-focused recruiters who value talent over degrees.

### For Recruiters & Hiring Teams
- Pre-Vetted Talent Pool - Access candidates with AI-verified technical skills and authenticated GitHub profiles.
- AI-Powered Talent Search - Role-restricted AI agent helps find candidates by actual coding abilities and project complexity.
- Skill Verification Dashboard - Confidence scores, detailed competency breakdowns, and real code quality metrics.
- Secure Direct Messaging - AI-facilitated communication with candidates through role-based access controls.

### For Administrators
- Recruiter Verification System - Manual approval workflow ensuring only legitimate hiring professionals access candidate data.
- Platform Security Management - Complete oversight of AI agent interactions with comprehensive audit trails.
- Quality Assurance - Maintain high standards for both talent verification and recruiter authenticity.
- Unlimited AI Access - Full platform capabilities for user management and system administration.

## 🛠️ Technology Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Build Tool:** Vite
- **Authentication:** Auth0 + GitHub OAuth
- **AI Services:** Google Gemini API, OpenRouter API
- **Deployment:** Netlify
- **Storage:** LocalStorage (client-side)

## 🏗️ Architecture

```
DevCaliber/
├── components/          # React components
│   ├── admin/           # Admin dashboard & verification
│   ├── auth/            # Authentication flows
│   ├── candidate/       # Developer profiles & analysis
│   ├── chat/            # AI agent interface
│   ├── common/          # Shared UI components
│   ├── landing/         # Marketing pages
│   ├── messages/        # Messaging system
│   └── recruiter/       # Recruiter dashboard
├── services/            # Business logic & API integrations
├── hooks/               # Custom React hooks
├── data/                # Mock data & configurations
└── public/              # Static assets & skill badges
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- GitHub OAuth App
- Auth0 Account
- Google Gemini API Key
- OpenRouter Api Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Divya4879/DevCaliber.git
   cd DevCaliber
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```env
   # Auth0 Configuration
   VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
   VITE_AUTH0_CLIENT_ID=your_auth0_client_id
   VITE_AUTH0_AUDIENCE=https://your-auth0-domain.auth0.com/api/v2/

   # GitHub OAuth
   VITE_GITHUB_CLIENT_ID=your_github_client_id

   # AI Services
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```
   
7. **Deploy locally**
   ```bash
   npm run dev
   ```
   

## 🔧 Configuration

### GitHub OAuth Setup
1. Create OAuth App at [GitHub Developer Settings](https://github.com/settings/developers)
2. Set Authorization callback URL: `https://yourdomain.com/github-callback`
3. Add client ID to environment variables

### Auth0 Setup
1. Create Auth0 application
2. Configure allowed callback URLs and origins
3. Add domain and client ID to environment variables

### API Keys
- **Gemini API:** [Google AI Studio](https://makersuite.google.com/app/apikey)
- **OpenRouter:** [OpenRouter Dashboard](https://openrouter.ai/keys)

## 🎯 Core Workflows

### Developer Onboarding
1. Sign up with Auth0 (Email/Password or Google OAuth).
2. Role Selection - Choose "Candidate" role (instant approval).
3. GitHub Authentication - Connect and verify GitHub account ownership.
4. AI Repository Analysis - Analyze coding patterns, project complexity, and documentation quality.
5. Verified Skill Badges - Receive timestamped digital credentials based on actual code.
6. Join Talent Pool - Profile becomes visible to verified recruiters.

### Recruiter Verification
1. Sign up with Auth0 and select "Recruiter" role.
2. LinkedIn Profile Required - Provide LinkedIn URL for verification.
3. Admin Manual Review - Request sent to admin dashboard for approval.
4. Waiting Period - Zero platform access until approved.
5. Access Granted - View candidates and AI agent capabilities.
6. Secure Messaging - Direct communication with candidates only.

### AI-Powered Messaging
- **Recruiters:** "Send message to Demo Candidate: Interview opportunity for React developer".
- **AI Agent:** Validates recipient permissions and composes professional message.
- **Automatic Delivery:** Message appears in candidate's dashboard with audit trail.
- **Role Restrictions:** Candidates cannot send messages, only receive them.

## 📊 Features Overview

```
| **Feature**         | **Candidates**             | **Recruiters**         | **Admins**                 |
| ------------------- | -------------------------- | ---------------------- | ---------------------------|
| **GitHub Analysis** | ✅ Own Profile Only         |  ✅ All Candidates     | ✅ All Profiles         |
| **Skill Badges**    | ✅ Generate Verified Badges | 👀 View Only           | ✅ View All              |
| **Talent Pool**     | 🌱 Join Verified Pool      | 🔍 View all Candidates  | 🧠 Complete Access        |
| **Messaging**       | 📥 Receive Only            | 📤 Send to Candidates  | 💬 Send to Anyone         |
| **Verification**    | ⚡ Auto-Approved          | ⏳ Await Manual Review  | ✅ Approve & Manage Users |
| **AI Chat**         | 🤖 Career Guidance         | 🤖 Talent Search       | 🤖 Unlimited Agent Access  |
| **Rate Limits**     | 50/session · 100/day       | 50/session · 100/day   | ♾️ Unlimited Usage          |
| **Data Access**     | 🔒 Own Data Only           | 👁️ All Candidates Only | 🌍 Full Platform Visibility |

```

## 🔒 Security

- Environment variables for sensitive data
- OAuth 2.0 authentication flows
- Role-based access control
- API key domain restrictions
- Client-side data encryption

## 🚀 Deployment

### Netlify Deployment
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Configure custom domain (optional)

### Environment Variables for Production
Set all `VITE_*` variables in your deployment platform's environment configuration.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the technicals- the hire and the hiring**
