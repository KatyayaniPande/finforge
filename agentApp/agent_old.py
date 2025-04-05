from typing import Dict, List, Any, TypedDict
from langchain_core.messages import HumanMessage, AIMessage
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
import json
import logging
import os
from dotenv import load_dotenv
import re
import PyPDF2
import io

load_dotenv(override=True)

# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Define state structure
class AgentState(TypedDict):
    messages: List[Any]  # Store conversation
    documents: Dict[str, Any]  # Store documents
    analysis_results: Dict[str, Any]  # Store analysis results
    final_report: Dict[str, Any]  # Final output

def extract_text_from_pdf(pdf_content):
    """Extract text from PDF binary content."""
    try:
        # Create a file-like object from the binary content
        pdf_file = io.BytesIO(pdf_content)
        
        # Create a PDF reader object
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        
        # Extract text from each page
        text = ""
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text() + "\n\n"
        
        logger.info(f"Successfully extracted text from PDF, {len(text)} characters")
        return text
    except Exception as e:
        logger.error(f"Error extracting text from PDF: {str(e)}")
        return None

def document_processor(state: AgentState) -> Dict:
    """Process uploaded documents."""
    try:
        logger.info("Starting document processing")
        documents = state.get("documents", {})
        
        if documents:
            logger.info(f"Processing {len(documents)} documents")
            return {"documents": documents}
        else:
            logger.info("No documents found in state")
            return {"documents": {}, "errors": ["No documents found in state"]}
    except Exception as e:
        logger.error(f"Error in document processor: {str(e)}", exc_info=True)
        return {"documents": {}, "errors": [f"Document processing failed: {str(e)}"]}

def analysis_engine(state: AgentState) -> Dict:
    """Analyze documents using LLM."""
    try:
        logger.info("Starting document analysis")
        documents = state["documents"]
        
        # Use LLM to analyze all documents together
        model = ChatOpenAI(
            model="gpt-4o-mini",
            api_key=os.getenv("OPENAI_API_KEY")
        )
        
        # Prepare document content for analysis
        document_texts = []
        for doc_id, doc_info in documents.items():
            content = doc_info.get("content", "")
            document_texts.append(f"DOCUMENT {doc_id}:\n{content}\n\n")
        
        combined_docs = "\n".join(document_texts)
        
        # Financial analysis
        financial_response = model.invoke(
            [
                HumanMessage(content=f"""
                Analyze the financial aspects in these documents:
                
                {combined_docs}
                
                Extract and return ONLY a JSON object with these fields:
                - "valuation_assessment": Extract any valuation information or "unknown" if not found
                - "projection_realism": Information about growth projections or "unknown" if not found
                - "risk_factors": List of risk factors or ["unknown"] if not found
                
                Return ONLY the JSON.
                """)
            ]
        )
        
        # Terms analysis
        terms_response = model.invoke(
            [
                HumanMessage(content=f"""
                Analyze the investment terms in these documents:
                
                {combined_docs}
                
                Extract and return ONLY a JSON object with these fields:
                - "unusual_terms": List any unusual terms or ["unknown"] if not found
                - "favorable_terms": List favorable terms or ["unknown"] if not found
                - "recommended_negotiation_points": List recommended negotiation points or ["unknown"] if not found
                
                Return ONLY the JSON.
                """)
            ]
        )
        
        # Market analysis
        market_response = model.invoke(
            [
                HumanMessage(content=f"""
                Extract market information from these documents:
                
                {combined_docs}
                
                Return ONLY a JSON object with these fields:
                - "market_size": Any market size information or "unknown" if not found
                - "competition": Information about competitors or "unknown" if not found
                
                Return ONLY the JSON.
                """)
            ]
        )
        
        # Parse JSON responses
        try:
            financial_analysis = extract_json(financial_response.content)
            if not financial_analysis:
                financial_analysis = {
                    "valuation_assessment": "unknown",
                    "projection_realism": "unknown",
                    "risk_factors": ["unknown"]
                }
            
            terms_analysis = extract_json(terms_response.content)
            if not terms_analysis:
                terms_analysis = {
                    "unusual_terms": ["unknown"],
                    "favorable_terms": ["unknown"],
                    "recommended_negotiation_points": ["unknown"]
                }
            
            market_analysis = extract_json(market_response.content)
            if not market_analysis:
                market_analysis = {
                    "market_size": "unknown",
                    "competition": "unknown"
                }
        except Exception as e:
            logger.error(f"Error parsing LLM responses: {str(e)}")
            financial_analysis = {"valuation_assessment": "unknown", "projection_realism": "unknown", "risk_factors": ["unknown"]}
            terms_analysis = {"unusual_terms": ["unknown"], "favorable_terms": ["unknown"], "recommended_negotiation_points": ["unknown"]}
            market_analysis = {"market_size": "unknown", "competition": "unknown"}
        
        analysis_results = {
            "financial_analysis": financial_analysis,
            "terms_analysis": terms_analysis,
            "market_analysis": market_analysis
        }
        
        logger.info("Analysis completed successfully")
        return {"analysis_results": analysis_results}
    except Exception as e:
        logger.error(f"Error in analysis engine: {str(e)}", exc_info=True)
        return {"analysis_results": {}, "errors": [f"Analysis failed: {str(e)}"]}

def report_generator(state: AgentState) -> Dict:
    """Generate final due diligence report using LLM."""
    try:
        logger.info("Starting report generation")
        analysis_results = state["analysis_results"]
        
        # Use LLM to generate comprehensive report
        model = ChatOpenAI(
            model="gpt-4o-mini",
            api_key=os.getenv("OPENAI_API_KEY")
        )
        
        analysis_json = json.dumps(analysis_results, indent=2)
        
        report_response = model.invoke(
            [
                HumanMessage(content=f"""
                Generate a comprehensive due diligence report based on this analysis:
                
                {analysis_json}
                
                Return ONLY a JSON object with these fields:
                - "executive_summary": A summary of the overall findings
                - "financial_analysis": A summary of the financial findings
                - "terms_analysis": A summary of the terms findings
                - "market_analysis": A summary of the market findings
                - "recommendation": A final recommendation based on the findings
                
                Return ONLY the JSON.
                """)
            ]
        )
        
        # Parse JSON response
        try:
            final_report = extract_json(report_response.content)
            if not final_report:
                # Create basic report if parsing fails
                final_report = {
                    "executive_summary": "Analysis completed but report generation had issues.",
                    "financial_analysis": analysis_results.get("financial_analysis", {}),
                    "terms_analysis": analysis_results.get("terms_analysis", {}),
                    "market_analysis": analysis_results.get("market_analysis", {}),
                    "recommendation": "Review the analysis results manually."
                }
        except Exception as e:
            logger.error(f"Error parsing report response: {str(e)}")
            final_report = {
                "executive_summary": "Analysis completed but report generation had issues.",
                "financial_analysis": analysis_results.get("financial_analysis", {}),
                "terms_analysis": analysis_results.get("terms_analysis", {}),
                "market_analysis": analysis_results.get("market_analysis", {}),
                "recommendation": "Review the analysis results manually."
            }
        
        logger.info("Report generation completed")
        return {"final_report": final_report}
    except Exception as e:
        logger.error(f"Error in report generator: {str(e)}", exc_info=True)
        return {"final_report": {}, "errors": [f"Report generation failed: {str(e)}"]}

def user_interaction(state: AgentState) -> Dict:
    """Handle user interaction and responses."""
    try:
        logger.info("Starting user interaction")
        last_message = state["messages"][-1]
        
        model = ChatOpenAI(
            model="gpt-4o-mini",
            api_key=os.getenv("OPENAI_API_KEY")
        )
        
        if "final_report" in state and state["final_report"]:
            report = state["final_report"]
            report_str = json.dumps(report, indent=2)
            
            response = model.invoke(
                [
                    HumanMessage(content=f"""
                    Based on this due diligence report, answer the user's query: "{last_message.content}"
                    
                    Report:
                    {report_str}
                    
                    Only use information from the report. If information is not available, say it's unknown.
                    """)
                ]
            )
        else:
            response = model.invoke(
                [
                    HumanMessage(content=f"I don't have enough information to answer your query: {last_message.content}")
                ]
            )
        
        logger.info("User interaction completed")
        return {"messages": state["messages"] + [AIMessage(content=response.content)]}
    except Exception as e:
        logger.error(f"Error in user interaction: {str(e)}", exc_info=True)
        return {"messages": state["messages"] + [AIMessage(content=f"Error: {str(e)}")]}

def should_continue(state: AgentState) -> str:
    """Determine next step in the workflow."""
    if "documents" not in state or not state["documents"]:
        return "document_processor"
    if "analysis_results" not in state or not state["analysis_results"]:
        return "analysis_engine"
    if "final_report" not in state or not state["final_report"]:
        return "report_generator"
    return "user_interaction"

def create_due_diligence_graph():
    """Create the LangGraph workflow."""
    workflow = StateGraph(AgentState)
    
    workflow.add_node("document_processor", document_processor)
    workflow.add_node("analysis_engine", analysis_engine)
    workflow.add_node("report_generator", report_generator)
    workflow.add_node("user_interaction", user_interaction)
    
    workflow.add_conditional_edges(
        "document_processor",
        should_continue,
        {
            "analysis_engine": "analysis_engine",
            "report_generator": "report_generator",
            "user_interaction": "user_interaction"
        }
    )
    
    workflow.add_conditional_edges(
        "analysis_engine",
        should_continue,
        {
            "report_generator": "report_generator",
            "user_interaction": "user_interaction"
        }
    )
    
    workflow.add_conditional_edges(
        "report_generator",
        should_continue,
        {
            "user_interaction": "user_interaction"
        }
    )
    
    workflow.add_edge("user_interaction", END)
    workflow.set_entry_point("document_processor")
    
    return workflow.compile()

def extract_json(text):
    """Extract JSON from text."""
    # Try to extract JSON block if present
    json_match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text)
    if json_match:
        text = json_match.group(1)
    
    # Clean up the text to make it valid JSON
    text = text.strip()
    if text.startswith('```') and text.endswith('```'):
        text = text[3:-3].strip()
    
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return None

async def run_due_diligence(document_content: str) -> Dict[str, Any]:
    """Run due diligence analysis on document content."""
    logger.info("Starting due diligence analysis")
    
    def format_message(content: str) -> Dict[str, Any]:
        """Format message for API response."""
        return {
            "role": "assistant",
            "content": content
        }
    
    try:
        # Create agent
        due_diligence_agent = create_due_diligence_graph()
        
        # Set up initial state with document
        initial_state = {
            "messages": [HumanMessage(content="Analyze this investment document.")],
            "documents": {
                "uploaded_document.txt": {
                    "type": "investment_document", 
                    "content": document_content
                }
            },
            "analysis_results": {},
            "final_report": {}
        }
        
        # Execute the graph
        captured_analysis_results = None
        captured_final_report = None
        llm_response = None
        
        for step in due_diligence_agent.stream(initial_state):
            logger.info("Processing step in graph")
            
            # Extract state
            current_state = None
            if hasattr(step, 'state'):
                current_state = step.state
            elif isinstance(step, dict) and 'state' in step:
                current_state = step['state']
            elif isinstance(step, dict):
                current_state = step
                
            # Capture data during execution
            if current_state and isinstance(current_state, dict):
                if 'analysis_results' in current_state and current_state['analysis_results']:
                    captured_analysis_results = current_state['analysis_results']
                
                if 'final_report' in current_state and current_state['final_report']:
                    captured_final_report = current_state['final_report']
                
                if 'messages' in current_state and len(current_state['messages']) > 1:
                    last_message = current_state['messages'][-1]
                    if hasattr(last_message, 'content'):
                        llm_response = last_message.content
        
        # Construct response
        if captured_final_report and captured_analysis_results:
            return {
                "completed": True,
                "synthesis_report": captured_final_report,
                "contract_analysis": captured_analysis_results.get("terms_analysis", {}),
                "financial_analysis": captured_analysis_results.get("financial_analysis", {}),
                "risk_assessment": {
                    "key_risks": captured_analysis_results.get("financial_analysis", {}).get("risk_factors", []),
                    "mitigation_suggestions": captured_analysis_results.get("terms_analysis", {}).get("recommended_negotiation_points", [])
                },
                "legal_compliance": {},
                "messages": [format_message(llm_response)] if llm_response else [],
                "errors": []
            }
        else:
            # Direct analysis fallback
            model = ChatOpenAI(
                model="gpt-4o-mini",
                api_key=os.getenv("OPENAI_API_KEY")
            )
            
            response = model.invoke(
                [
                    HumanMessage(content=f"""
                    Analyze this investment document for due diligence:
                    
                    {document_content}
                    
                    Create a comprehensive analysis that includes:
                    1. Financial assessment
                    2. Terms analysis
                    3. Risk factors
                    4. Overall recommendation
                    """)
                ]
            )
            
            return {
                "completed": True,
                "synthesis_report": {
                    "executive_summary": "Analysis performed directly with LLM",
                    "recommendation": "See the message for full analysis"
                },
                "contract_analysis": {},
                "financial_analysis": {},
                "risk_assessment": {},
                "legal_compliance": {},
                "messages": [format_message(response.content)],
                "errors": []
            }
    except Exception as e:
        logger.error(f"Error during due diligence analysis: {str(e)}", exc_info=True)
        return {
            "completed": False,
            "errors": [f"Analysis failed: {str(e)}"],
            "synthesis_report": {
                "executive_summary": f"Error occurred: {str(e)}",
                "recommendation": "Please try again"
            },
            "messages": [format_message(f"Error during analysis: {str(e)}")],
            "contract_analysis": {},
            "financial_analysis": {},
            "risk_assessment": {},
            "legal_compliance": {}
        }