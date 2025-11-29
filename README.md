# RetireWise AI

An agentic AI-powered retirement planning platform built for Indian users during Mumbai Hacks hackathon. RetireWise AI acts as your personal retirement analyst and reminder assistant, providing tailored financial advice based on Indian incomes, expenses, and inflation rates.

## Features

- **Agentic AI Chat Interface**: Interactive conversations with AI for personalized retirement planning
- **Basic & Advanced Modes**: Choose between simple guidance or comprehensive financial analysis
- **Indian Market Focus**: Calculations tuned for Indian tax structures, cost of living, and inflation
- **Goal-Based Planning**: Set retirement goals and get clear savings targets and investment recommendations
- **Automated Reminders**: Monthly reminders to stay on track with your retirement goals
- **Risk Assessment**: Personalized risk profiling and investment style recommendations

## Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS with custom gradients
- **Animations**: Framer Motion
- **Charts**: Recharts for data visualization
- **AI Integration**: Botpress Web Chat for conversational AI

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── BotpressChat.jsx      # AI chat integration
│   ├── CalculatorSection.jsx # Retirement calculator UI
│   ├── Features.jsx          # Feature showcase
│   ├── Footer.jsx            # Site footer
│   ├── Hero.jsx              # Landing section
│   ├── ModesSection.jsx      # Basic/Advanced mode selection
│   └── Navbar.jsx            # Navigation header
├── utils/
│   └── retirementCalculator.js # Calculation logic
└── App.jsx                   # Main application component
```

## Mumbai Hacks

This project was developed during Mumbai Hacks hackathon to address the growing need for accessible retirement planning tools in India.