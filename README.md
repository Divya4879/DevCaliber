# DevCaliber

**AI-Powered Technical Talent Intelligence Platform**

DevCaliber revolutionizes technical hiring through advanced AI analysis of developer GitHub profiles, providing verified skill credentials and intelligent talent matching for modern recruitment.

## 🚀 Live Demo

**Production Site:** [https://devcaliber.netlify.app](https://devcaliber.netlify.app)

### Demo Accounts
- **Admin:** `admin@testcredential.com`
- **Recruiter:** `recruiter@testcredential.com` 
- **Candidate:** `candidate@testcredential.com`

## ✨ Key Features

### For Developers
- **AI GitHub Analysis** - Deep repository analysis with skill proficiency scoring
- **Verified Skill Badges** - Blockchain-verifiable digital credentials
- **Professional Profiles** - Comprehensive developer portfolios with quantified metrics
- **Talent Pool Access** - Connect with verified recruiters and companies

### For Recruiters & Hiring Teams
- **Pre-Vetted Talent Pool** - Access developers with AI-verified technical skills
- **Advanced Filtering** - Search by technology stack, experience level, and location
- **Skill Verification** - Confidence scores and detailed competency breakdowns
- **Direct Messaging** - AI-powered communication with candidates

### For Administrators
- **Recruiter Verification** - Manual approval workflow for hiring professionals
- **Platform Analytics** - User engagement and skill distribution insights
- **Quality Control** - Maintain high standards for both talent and recruiters

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
├── components/           # React components
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

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/devcaliber.git
   cd devcaliber
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
1. Sign up with Auth0
2. Connect GitHub account
3. AI analyzes repositories
4. Receive verified skill badges
5. Join talent pool

### Recruiter Verification
1. Sign up and request recruiter access
2. Admin reviews and approves request
3. Access verified candidate pool
4. Use AI agent for candidate communication

### AI-Powered Messaging
- Recruiters use chat agent: "Send message to Demo Candidate about their React skills"
- Agent composes professional message
- Automatic delivery to candidate dashboard

## 📊 Features Overview

| Feature | Candidates | Recruiters | Admins |
|---------|------------|------------|--------|
| GitHub Analysis | ✅ | ❌ | ✅ |
| Skill Badges | ✅ | ❌ | ✅ |
| Talent Pool | ✅ | ✅ | ✅ |
| Messaging | Receive | Send | Send |
| Verification | Auto | Manual | Approve |
| AI Chat | ✅ | ✅ | ✅ |

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

## 🆘 Support

- **Documentation:** [GitHub Wiki](https://github.com/yourusername/devcaliber/wiki)
- **Issues:** [GitHub Issues](https://github.com/yourusername/devcaliber/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/devcaliber/discussions)

## 🎉 Acknowledgments

- Google Gemini for AI analysis capabilities
- Auth0 for authentication infrastructure
- Netlify for seamless deployment
- GitHub for developer data access

---

**Built with ❤️ for the developer community**
