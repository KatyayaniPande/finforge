# FinForge - Investment Due Diligence Platform

FinForge is a comprehensive investment due diligence platform that combines AI-powered document analysis with security scanning to help investors make informed decisions. The platform provides detailed analysis of investment documents, identifies potential risks, and offers actionable insights.

## Features

### 1. Document Analysis
- **AI-Powered Analysis**: Utilizes advanced AI models to analyze investment documents
- **Comprehensive Reports**: Generates detailed reports covering:
  - Market Analysis
  - Financial Metrics
  - Risk Assessment
  - Investment Recommendations
  - Key Performance Indicators

### 2. Security Analysis (DAST)
- **Document Security Scanning**: Analyzes documents for potential security risks
- **Vulnerability Detection**: Identifies:
  - Sensitive Data Exposure
  - Information Disclosure
  - Metadata Leakage
- **Risk Assessment**: Provides severity ratings and recommendations
- **Real-time Scanning**: Immediate feedback on uploaded documents

### 3. User Interface
- **Modern Dashboard**: Clean and intuitive interface
- **Real-time Progress**: Live progress tracking during analysis
- **Interactive Results**: Easy-to-navigate analysis results
- **Raw Data Access**: Option to view detailed JSON output

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- SQLite3

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/finforge.git
cd finforge
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install required packages:
```bash
npm install uuid @types/uuid
```

4. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
OPENAI_API_KEY=your_api_key_here
```

5. Initialize the database:
```bash
npm run db:setup
```

### Running the Application

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

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
- **Body**: FormData with file
- **Response**: Analysis results including market insights and recommendations

### DAST Security Analysis API
- **Endpoint**: `/api/dast-analysis`
- **Method**: POST
- **Body**: FormData with file
- **Response**: Security analysis results including vulnerabilities and risk levels

## Security Features

- File type validation
- File size limits (10MB max)
- Secure file handling
- Vulnerability scanning
- Metadata analysis
- Sensitive data detection

## Development

### Adding New Features

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git add .
git commit -m "Add your feature"
```

3. Push to your branch:
```bash
git push origin feature/your-feature-name
```

### Running Tests
```bash
npm run test
# or
yarn test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Error Handling

The platform includes comprehensive error handling:
- File validation errors
- Analysis engine errors
- API errors
- Database errors

Each error includes:
- Error code
- Descriptive message
- Stack trace (in development)
- Suggested resolution

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue if needed

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
