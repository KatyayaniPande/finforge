-- Create the startups table with all required fields
CREATE TABLE startups (
    id INTEGER PRIMARY KEY,
    company_name TEXT NOT NULL,
    stage TEXT NOT NULL,
    product_short TEXT NOT NULL,
    description TEXT NOT NULL,
    arr TEXT NOT NULL,
    founders TEXT NOT NULL,
    tam TEXT NOT NULL,
    market_growth_rate TEXT NOT NULL,
    product_stage TEXT NOT NULL,
    user_growth TEXT NOT NULL,
    revenue_growth TEXT NOT NULL,
    current_valuation TEXT NOT NULL,
    projected_exit_value TEXT NOT NULL,
    exit_timeline TEXT NOT NULL,
    industry TEXT NOT NULL  -- New column for industry
);

-- Insert data for all 20 companies, including industry assignment
INSERT INTO startups (company_name, stage, product_short, description, arr, founders, tam, market_growth_rate, product_stage, user_growth, revenue_growth, current_valuation, projected_exit_value, exit_timeline, industry)
VALUES
    ('PitchWhiz', 'Pre-Seed', 'AI-based pitch deck creator for founders', 'Cloud-based platform that analyzes successful pitch decks and uses AI to generate investor-ready presentations based on founder inputs. Features include industry-specific templates, automated financial projection visualizations, and real-time feedback on narrative strength.', '$0', 'Ex-Notion, YC Alum', '$2.8B', '22% YoY', 'Beta', '150% MoM (from small base)', 'Pre-revenue', '$5M', '$80M', '5-7 years', 'AI & Machine Learning'),
    
    ('NeuroBrief', 'Seed', 'AI tool that summarizes research papers for biotech firms', 'Platform that ingests scientific literature and produces concise, context-aware summaries of breakthroughs relevant to biotech R&D teams. Uses domain-specific NLP models trained on millions of peer-reviewed papers with specialized knowledge of pharmaceutical terminology.', '$120K', 'Ex-Meta AI, PhD Neuroscience', '$4.2B', '18% YoY', 'Early release', '35% QoQ', '40% QoQ', '$12M', '$150M', '4-6 years', 'BioTech'),
    
    ('FlowServe AI', 'Series A', 'AI-driven customer service automation for mid-size e-commerce', 'End-to-end customer service platform that uses AI to handle ticket routing, automate responses, and provide agents with real-time recommendation tools. Features include sentiment analysis, multilingual support, and integration with major e-commerce platforms.', '$1.2M', 'Former Zendesk PMs', '$12B', '26% YoY', 'Full release', '23% QoQ', '28% QoQ', '$40M', '$300M', '3-5 years', 'AI & Machine Learning'),
    
    ('Datasketch', 'Seed', 'No-code dashboard builder for data analysts', 'Intuitive drag-and-drop interface that allows analysts to create interactive data dashboards without coding. Uses AI to suggest visualizations based on data patterns and automates report generation with natural language insights.', '$250K', 'Ex-Looker, Tableau engineer', '$7.5B', '24% YoY', 'Product-market fit', '18% MoM', '22% QoQ', '$15M', '$180M', '4-5 years', 'AI & Machine Learning'),
    
    ('Zentry', 'Series A', 'B2B passwordless authentication platform', 'Enterprise-grade authentication solution that eliminates passwords through a combination of biometrics, device fingerprinting, and behavioral analysis. Offers single sign-on capabilities and integrates with existing identity providers.', '$900K', 'Former Okta and Cloudflare security team', '$5.4B', '32% YoY', 'Scaling', '15% MoM', '18% QoQ', '$35M', '$250M', '3-4 years', 'Cybersecurity'),
    
    ('PersonaPrompt', 'Pre-Seed', 'AI-driven personal branding assistant for LinkedIn', 'Browser extension that analyzes a user''s LinkedIn profile and activity, then suggests personalized content, engagement strategies, and profile optimizations to build a cohesive personal brand. Includes AI-generated post ideas tailored to industry trends.', '$30K', 'Ex-Canva, Solo founder', '$1.8B', '19% YoY', 'MVP', '40% MoM', '25% MoM', '$4M', '$60M', '6-8 years', 'AI & Machine Learning'),
    
    ('LoopHealth AI', 'Seed', 'Predictive AI for early diagnosis in telehealth', 'AI-powered diagnostic assistant that analyzes patient symptoms, medical history, and remote vitals to suggest potential conditions and appropriate tests. Built specifically for telehealth consultations with explainable AI to support physician decision-making.', '$300K', 'MD + ML duo, ex-Kaiser Permanente & DeepMind', '$9.2B', '29% YoY', 'Clinical validation', '12% MoM', '32% QoQ', '$18M', '$220M', '5-7 years', 'HealthTech'),
    
    ('Rundown', 'Series B', 'Real-time sports analytics SaaS for betting platforms', 'Platform that processes live sports data to deliver real-time predictive analytics for betting platforms. Uses computer vision to track player movements and generate proprietary metrics that power in-game betting markets.', '$4.5M', 'ESPN data team alumni', '$8.7B', '35% YoY', 'Market leader', '8% QoQ', '12% QoQ', '$120M', '$800M', '2-3 years', 'AI & Machine Learning'),
    
    ('AetherOps', 'Seed', 'DevOps co-pilot powered by LLMs', 'AI assistant that helps DevOps teams automate infrastructure management by generating, explaining, and debugging code. Features include automated issue remediation, infrastructure-as-code generation, and intelligent alert triaging.', '$180K', 'Ex-DigitalOcean, GitLab', '$6.3B', '28% YoY', 'Early adopters', '25% MoM', '30% QoQ', '$14M', '$175M', '4-6 years', 'AI & Machine Learning'),
    
    ('Clerkly', 'Pre-Seed', 'AI assistant for legal document review', 'Machine learning tool that scans legal documents to identify risky clauses, inconsistencies, and missing elements. Specializes in contract review with domain-specific understanding of different legal practice areas.', '$0', 'Lawyer turned coder + NLP researcher', '$3.5B', '20% YoY', 'Alpha', '80% MoM (from small base)', 'Pre-revenue', '$4.5M', '$90M', '6-8 years', 'AI & Machine Learning'),
    
    ('VerraFin', 'Series A', 'Fraud detection for fintechs using graph ML', 'Fraud prevention system that uses graph machine learning to identify complex patterns across transaction networks. Specializes in detecting sophisticated fraud rings and synthetic identity theft through relationship mapping.', '$1.6M', 'Ex-Affirm, MIT AI Lab', '$14B', '33% YoY', 'Growth', '14% QoQ', '24% QoQ', '$45M', '$350M', '3-5 years', 'FinTech'),
    
    ('BrightNote', 'Seed', 'Real-time collaborative note-taking with AI summarization', 'Collaborative note-taking application that provides real-time syncing, auto-organization, and AI-powered meeting summaries. Features contextual linking between related notes and integrations with calendar and project management tools.', '$200K', 'Ex-Evernote, Figma', '$5.1B', '22% YoY', 'Public launch', '20% MoM', '18% QoQ', '$16M', '$200M', '5-6 years', 'AI & Machine Learning'),
    
    ('AdSightIQ', 'Series B', 'AI attribution engine for marketing spend', 'Advanced marketing attribution platform that uses causal inference models to accurately measure campaign impact across channels. Features include predictive budget allocation, incrementality testing, and custom attribution models.', '$3.8M', 'Ex-Google Ads team', '$11.5B', '25% YoY', 'Category leader', '7% QoQ', '15% QoQ', '$90M', '$650M', '2-4 years', 'AI & Machine Learning'),
    
    ('Synthex Labs', 'Seed', 'AI-powered molecule generation for pharma R&D', 'Platform that uses deep learning to design novel molecular structures with specified properties for drug discovery. Features in-silico testing simulations and integration with lab automation systems for rapid experimental validation.', '$450K', 'DeepTech PhDs', '$12.8B', '32% YoY', 'Industry validation', '10% QoQ', '35% QoQ', '$25M', '$300M', '5-7 years', 'BioTech'),
    
    ('QuantaLoop', 'Series A', 'Energy usage optimizer for smart homes', 'IoT platform that uses AI to optimize energy consumption across connected home devices. Features include predictive load balancing, automated energy saving routines, and utility rebate program integration.', '$1.1M', 'Ex-Tesla engineers', '$8.5B', '27% YoY', 'Expansion', '16% QoQ', '20% QoQ', '$38M', '$280M', '4-5 years', 'CleanTech'),
    
    ('TutorMesh', 'Seed', 'Peer-to-peer AI-augmented tutoring marketplace', 'Online platform connecting students with tutors, enhanced by AI matching algorithms and learning progress tracking. Features include interactive whiteboarding, session recordings with AI summaries, and personalized learning plans.', '$220K', 'Former teachers + AI grads', '$6.7B', '21% YoY', 'Growth phase', '22% MoM', '28% QoQ', '$15M', '$190M', '4-6 years', 'AI & Machine Learning'),
    
    ('FleetMind', 'Seed', 'AI route optimizer for logistics fleets', 'Route optimization software that accounts for real-time traffic, weather, and vehicle constraints to maximize delivery efficiency. Features include dynamic rerouting, driver mobile app integration, and predictive maintenance alerts.', '$350K', 'Ex-Uber Maps, DHL', '$5.9B', '24% YoY', 'Early market entry', '15% MoM', '25% QoQ', '$20M', '$220M', '4-5 years', 'AI & Machine Learning'),
    
    ('Syncr', 'Pre-Seed', 'AI memory layer for knowledge workers', 'Browser extension that captures and organizes information encountered during online research. Uses AI to tag, connect, and resurface relevant information when needed, creating a personalized knowledge graph.', '$20K', 'YC batch, ex-Notion', '$4.3B', '23% YoY', 'Private beta', '60% MoM (small base)', '40% MoM', '$6M', '$85M', '6-7 years', 'AI & Machine Learning'),
    
    ('TruAudit', 'Series A', 'Compliance automation tool for SaaS startups', 'Platform that streamlines SOC2, GDPR, and other compliance processes through continuous monitoring and automated evidence collection. Features include policy templates, vendor risk assessment, and audit-ready reporting.', '$870K', 'Ex-SOC2 consultants + engineer', '$3.8B', '19% YoY', 'Revenue scaling', '12% QoQ', '22% QoQ', '$32M', '$240M', '3-5 years', 'FinTech'),
    
    ('MetaBriefs', 'Seed', 'AI briefings for busy execs using internal company data', 'AI system that aggregates internal company data (emails, documents, dashboards) to create personalized daily briefings for executives. Features include custom alert thresholds, competitive intelligence integration, and voice-enabled interfaces.', '$300K', 'Ex-McKinsey, ex-Palantir', '$7.2B', '25% YoY', 'Product-market fit', '18% MoM', '30% QoQ', '$18M', '$210M', '4-6 years', 'AI & Machine Learning');
