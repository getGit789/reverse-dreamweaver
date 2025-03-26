# NunoReverse - AI-Powered Content Transformation Platform

![NunoReverse Demo](/public/images/NunoReverse.png)

## 🌟 [Live Demo](https://nunoreverse.netlify.app)

NunoReverse is a modern web application that offers three powerful transformation tools:
- **Text Reverser**: Flip text in various ways (characters, words, sentences, capitalization)
- **Image Reverser**: Transform images with horizontal/vertical flips and rotations
- **AI Thought Transformer**: Gain new perspectives on your thoughts using AI-powered cognitive reframing

## ✨ Features

### Text Reverser
- Multiple reversal modes: characters, words, sentences, and capitalization
- Real-time transformation
- Copy-to-clipboard functionality
- Character count tracking

### Image Reverser
- Horizontal and vertical image flipping
- 180° rotation
- Support for common image formats (PNG, JPG, GIF)
- Download transformed images
- File size limit handling (max 10MB)

### AI Thought Transformer
- GPT-powered cognitive reframing
- Secure API handling through Netlify Functions
- Thoughtful perspective shifts
- Practical explanations of benefits
- Copy-to-clipboard functionality

## 🛠️ Tech Stack

- **Frontend**:
  - React 18 with TypeScript
  - Vite for build tooling
  - TailwindCSS for styling
  - Shadcn UI components
  - Framer Motion for animations
  - React Router for navigation

- **Backend**:
  - Netlify Functions (Serverless)
  - OpenAI GPT-3.5 Turbo API
  - Express.js for development server

- **Authentication**:
  - Clerk for user management
  - Secure session handling

- **Deployment**:
  - Netlify for hosting and serverless functions
  - Continuous deployment from GitHub

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- OpenAI API key
- Clerk account and API keys

### Installation

1. Clone the repository:
```bash
git clone https://github.com/getGit789/reverse-dreamweaver
cd nunoreverse
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_OPENAI_API_KEY=your_openai_key
```

4. Start the development server:
```bash
npm run dev
```

### Development with Netlify Functions

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Start the Netlify dev server:
```bash
netlify dev
```

## 📦 Project Structure

```
nunoreverse/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API and service functions
│   └── styles/        # Global styles and Tailwind config
├── netlify/
│   └── functions/     # Serverless functions
├── public/           # Static assets
└── package.json      # Project dependencies and scripts
```

## 🔒 Security

- API keys are securely stored in Netlify environment variables
- Authentication handled by Clerk
- OpenAI API calls are made through secure serverless functions
- Input validation and sanitization implemented

## 🎨 UI/UX Features

- Responsive design for all screen sizes
- Beautiful gradients and animations
- Loading states and error handling
- Tooltips for better user guidance
- Copy-to-clipboard functionality
- Modern, clean interface

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful component library
- [OpenAI](https://openai.com/) for the GPT API
- [Clerk](https://clerk.dev/) for authentication
- [Netlify](https://www.netlify.com/) for hosting and serverless functions

## 📧 Contact

Your Name - [@LinkedIn](https://www.linkedin.com/in/damir-kranjcevic-613825200/)

Project Link: [https://github.com/yourusername/nunoreverse](https://github.com/yourusername/nunoreverse)

---

Built with ❤️ using React, TypeScript, and AI
