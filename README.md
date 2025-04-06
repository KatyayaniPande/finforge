# SingVentures - AI-Powered Startup Platform
[![LangGraph](https://img.shields.io/badge/LangGraph-FF5700?style=for-the-badge&logo=chainlink&logoColor=white)](https://github.com/langchain-ai/langgraph)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)


## Overview
SingVentures is a smart, AI-powered investment platform that helps emerging and growth-stage investors discover, analyze, and manage startup investments with confidence and clarity. Our platform bridges the gap between promising startups and strategic investors through intelligent analytics and streamlined due diligence.

> [!IMPORTANT]
> Check out our [demo video](https://youtu.be/WwQipLh2vUY)!


## Features

### 1. Personalized Investor Dashboard
- **Portfolio Visualization**: Real-time portfolio value, monthly and quarterly returns
- **Sector Allocation**: Visual breakdown of investments across industries
- **Custom Analytics**: Tailored metrics based on your strategy and risk tolerance
- **Performance Tracking**: Historical performance with benchmark comparisons

### 2. AI-Powered Due Diligence Engine
- **Multi-Agent Workflow**: LangGraph-powered specialized agents for comprehensive analysis
- **Intelligent Document Analysis**: Processes financial reports, founder agreements, and term sheets
- **Document Support**: Handles PDF, DOCX, images, and more through OCR capabilities
- **Risk Identification**: Automatically flags compliance issues and potential risks
- **Key Metric Extraction**: Pulls critical data points from complex documents

### 3. Startup Marketplace
- **Curated Listings**: Focused on post-seed and growth-stage opportunities
- **Dynamic Metrics**: Real-time ARR, TAM, growth rates, and burn rates
- **Team Assessment**: Founder and key executive background analysis
- **Investment Matching**: AI-powered recommendations based on your portfolio strategy
- **Direct Connection**: Streamlined communication with promising startups

### 4. Market Intelligence
- **News & Market Sentiment**: Real-time analysis of financial news
- **Sector-Specific Insights**: NLP-generated sentiment scores by industry
- **Trend Identification**: Early detection of market shifts and opportunities
- **Competitive Landscape**: Analysis of startup positioning within markets

## Contributors
* [Alyssa Wong](https://github.com/alyssahx-wong)
* [Jden Goh](https://github.com/jdengoh)
* [Jovan Foo](https://github.com/JoeSJF)
* [Pande Katyayani](https://github.com/KatyayaniPande)


## Getting Started


## Prerequisites
- Node.js (v16 or higher)
- Python 3.9+
- npm or yarn


### Installation

1. Clone the repository:

2. Install npm dependencies:
```bash
pnpm install
# or
yarn install
```

3. Install Python dependencies

Create your virtual env:

```bash
uv venv
```

Activate your virtual env

**Linux / MacOS:**

```bash
source .venv/bin/activate
```

**Windows:**

```powershell
.venv/Scripts/activate
```

Install the dependencies:

```python
uv sync
```

4. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
GROQ_API_KEY=your_api_key_here
NEXT_PUBLIC_NEWS_API_KEY=your_api_key_here
```

Create a `.env` file in root directory as well
```env
OPENAI_API_KEY=your_api_key_here
```

5. Initialize the database:
```bash
npm run db:setup
```

### Running the Application

#### Quick Start (Recommended)

For convenience, you can use our startup scripts:

**On Linux/Mac:**
```bash
./scripts/start.sh
```

**On Windows:**
```powershell
.\scripts\start.ps1
```


1. Start the development server:
```bash
npm run dev
# or
yarn dev
```
2. Start the agentic AI server
```bash
uvicorn agentApp.main:app --reload
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## Technology Stack

- **Frontend**: Next.js and TailwindCSS with Recharts for data visualization
- **Backend**: FastAPI for high-performance API endpoints
- **AI Engine**: LangChain and transformer-based models for document analysis
- **OCR Processing**: Tesseract for document scanning and text extraction
- **Database**: SQLite for efficient data storage and retrieval
- **Authentication**: JWT implementation for secure identity management

## Project Structure

```
finforge/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── due-diligence/     # Due diligence page
│   └── investments/       # Investment pages
├── components/            # Reusable components
│   └── ui/               # UI components
├── lib/                   # Library code
│   ├── analysis/         # Analysis engines
│   └── db/               # Database utilities
├── public/               # Static files
└── styles/               # Global styles
```

## API Documentation

### Document Analysis API
- **Endpoint**: `/api/analyze`
- **Method**: POST
- **Response**: Analysis results including market insights and recommendations

### Startup Personalised Insights API
- **Endpoint**: `/api/analyze-startup`
- **Method**: POST
- **Response**: Startup assessment based on personal portfolio, including market analysis, financial analysis and risk assessment


## Roadmap

Future features planned:
- [ ] Multi-document analysis
- [ ] Collaborative annotations
- [ ] Advanced risk modeling
- [ ] Integration with external data sources
- [ ] Custom analysis rules
- [ ] Export to various formats

## Acknowledgments

- Built with Next.js 13+
- UI components from shadcn/ui
- Icons from Lucide
- Analysis powered by OpenAI
