# # app.py
# from fastapi import FastAPI, UploadFile, File, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import uvicorn
# import json
# from typing import Dict, List, Any, TypedDict, Optional
# import asyncio
# import tempfile
# import os
# import shutil
# import logging

# # Import the LangGraph framework components
# from .agent import run_due_diligence

# # Configure logging
# logging.basicConfig(level=logging.INFO, 
#                     format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
# logger = logging.getLogger(__name__)

# app = FastAPI(title="Due Diligence Analysis Service")

# # Add CORS middleware to allow your Next.js app to call this service
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # Update with your Next.js app URL
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class AnalysisResponse(BaseModel):
#     completed: bool
#     synthesis_report: Dict[str, Any] = {}
#     contract_analysis: Dict[str, Any] = {}
#     financial_analysis: Dict[str, Any] = {}
#     risk_assessment: Dict[str, Any] = {}
#     legal_compliance: Dict[str, Any] = {}
#     messages: List[Dict[str, Any]] = []
#     errors: List[str] = []

# @app.post("/analyze", response_model=AnalysisResponse)
# async def analyze_document(file: UploadFile = File(...)):
#     """
#     Analyze an investment contract document using the LangGraph multiagent system.
#     """
#     temp_file_path = None
#     try:
#         # Create a temporary file to store the uploaded document
#         with tempfile.NamedTemporaryFile(delete=False) as temp_file:
#             # Write the binary content
#             content = await file.read()
#             temp_file.write(content)
#             temp_file_path = temp_file.name
        
#         logger.info(f"File '{file.filename}' uploaded and saved to temporary location")
        
#         # Try to read the document content with different encodings
#         document_content = None
#         encodings_to_try = ["utf-8", "latin-1", "cp1252"]
        
#         for encoding in encodings_to_try:
#             try:
#                 with open(temp_file_path, "r", encoding=encoding) as f:
#                     document_content = f.read()
#                 logger.info(f"Successfully read file content with {encoding} encoding")
#                 break
#             except UnicodeDecodeError:
#                 logger.warning(f"Failed to decode with {encoding} encoding, trying next...")
#                 continue
        
#         # If we couldn't read the file as text, it might be a binary format like PDF
#         if document_content is None:
#             error_msg = "Unable to read file content as text. Binary formats require additional processing."
#             logger.error(error_msg)
#             raise HTTPException(status_code=415, detail=error_msg)
        
#         # Run the due diligence analysis
#         logger.info("Starting due diligence analysis...")
#         result = await run_due_diligence(document_content)
#         logger.info("Analysis completed successfully")
        
#         return AnalysisResponse(
#             completed=result.get("completed", False),
#             synthesis_report=result.get("synthesis_report", {}),
#             contract_analysis=result.get("contract_analysis", {}),
#             financial_analysis=result.get("financial_analysis", {}),
#             risk_assessment=result.get("risk_assessment", {}),
#             legal_compliance=result.get("legal_compliance", {}),
#             messages=result.get("messages", []),
#             errors=result.get("errors", [])
#         )
    
#     except Exception as e:
#         error_msg = f"Analysis failed: {str(e)}"
#         logger.error(error_msg, exc_info=True)
#         raise HTTPException(status_code=500, detail=error_msg)
    
#     finally:
#         # Clean up the temporary file
#         if temp_file_path and os.path.exists(temp_file_path):
#             os.unlink(temp_file_path)
#             logger.info("Temporary file cleaned up")

# @app.get("/health")
# async def health_check():
#     """
#     Simple health check endpoint to verify the service is running.
#     """
#     return {"status": "healthy"}

# if __name__ == "__main__":
#     uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)

# app.py
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import json
from typing import Dict, List, Any, Optional
import asyncio
import tempfile
import os
import logging
import io

# Import PyPDF2 for PDF processing
import PyPDF2

# Import the agent functionality
from .agent import run_due_diligence, extract_text_from_pdf

app = FastAPI(title="Due Diligence Analysis Service")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class AnalysisResponse(BaseModel):
    completed: bool
    synthesis_report: Dict[str, Any] = {}
    contract_analysis: Dict[str, Any] = {}
    financial_analysis: Dict[str, Any] = {}
    risk_assessment: Dict[str, Any] = {}
    legal_compliance: Dict[str, Any] = {}
    messages: List[Dict[str, Any]] = []
    errors: List[str] = []

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_document(file: UploadFile = File(...)):
    """
    Analyze an investment document using our LLM-based due diligence system.
    """
    try:
        # Read the file content into memory
        content = await file.read()
        logger.info(f"File '{file.filename}' uploaded")
        
        document_content = None
        
        # Check if it's a PDF
        if file.filename.lower().endswith('.pdf'):
            logger.info("Processing as PDF file")
            document_content = extract_text_from_pdf(content)
            if not document_content:
                raise HTTPException(status_code=415, detail="Could not extract text from PDF")
        else:
            # Try to decode as text with different encodings
            encodings_to_try = ["utf-8", "latin-1", "cp1252"]
            
            for encoding in encodings_to_try:
                try:
                    document_content = content.decode(encoding)
                    logger.info(f"Successfully decoded with {encoding} encoding")
                    break
                except UnicodeDecodeError:
                    logger.warning(f"Failed to decode with {encoding} encoding, trying next...")
                    continue
        
        # If we couldn't read the file as text or PDF
        if document_content is None:
            error_msg = "Unable to read file content. Supported formats are text files and PDFs."
            logger.error(error_msg)
            raise HTTPException(status_code=415, detail=error_msg)
        
        # Run the due diligence analysis
        logger.info("Starting due diligence analysis...")
        result = await run_due_diligence(document_content)
        logger.info("Analysis completed successfully")
        
        return AnalysisResponse(
            completed=result.get("completed", False),
            synthesis_report=result.get("synthesis_report", {}),
            contract_analysis=result.get("contract_analysis", {}),
            financial_analysis=result.get("financial_analysis", {}),
            risk_assessment=result.get("risk_assessment", {}),
            legal_compliance=result.get("legal_compliance", {}),
            messages=result.get("messages", []),
            errors=result.get("errors", [])
        )
    
    except Exception as e:
        error_msg = f"Analysis failed: {str(e)}"
        logger.error(error_msg, exc_info=True)
        raise HTTPException(status_code=500, detail=error_msg)

@app.post("/analyze-multiple", response_model=AnalysisResponse)
async def analyze_multiple_documents(files: List[UploadFile] = File(...)):
    """
    Analyze multiple investment documents together using our LLM-based due diligence system.
    """
    try:
        # Combined document content from all files
        combined_content = ""
        
        # Process each uploaded file
        for file in files:
            # Read the file content into memory
            content = await file.read()
            logger.info(f"File '{file.filename}' uploaded")
            
            document_content = None
            
            # Check if it's a PDF
            if file.filename.lower().endswith('.pdf'):
                logger.info(f"Processing '{file.filename}' as PDF file")
                document_content = extract_text_from_pdf(content)
                if not document_content:
                    logger.warning(f"Could not extract text from PDF: {file.filename}, skipping")
                    continue
            else:
                # Try to decode as text with different encodings
                encodings_to_try = ["utf-8", "latin-1", "cp1252"]
                
                for encoding in encodings_to_try:
                    try:
                        document_content = content.decode(encoding)
                        logger.info(f"Successfully decoded '{file.filename}' with {encoding} encoding")
                        break
                    except UnicodeDecodeError:
                        logger.warning(f"Failed to decode '{file.filename}' with {encoding} encoding, trying next...")
                        continue
            
            # If we couldn't read this file, skip it
            if document_content is None:
                logger.warning(f"Could not read file '{file.filename}', skipping")
                continue
            
            # Add to combined content with clear separation
            combined_content += f"\n\n--- DOCUMENT: {file.filename} ---\n\n{document_content}\n\n"
        
        # Check if we have any content to analyze
        if not combined_content:
            error_msg = "Could not read any of the uploaded files. Supported formats are text files and PDFs."
            logger.error(error_msg)
            raise HTTPException(status_code=415, detail=error_msg)
        
        # Run the due diligence analysis on combined content
        logger.info("Starting due diligence analysis on multiple documents...")
        result = await run_due_diligence(combined_content)
        logger.info("Analysis completed successfully")
        
        return AnalysisResponse(
            completed=result.get("completed", False),
            synthesis_report=result.get("synthesis_report", {}),
            contract_analysis=result.get("contract_analysis", {}),
            financial_analysis=result.get("financial_analysis", {}),
            risk_assessment=result.get("risk_assessment", {}),
            legal_compliance=result.get("legal_compliance", {}),
            messages=result.get("messages", []),
            errors=result.get("errors", [])
        )
    
    except Exception as e:
        error_msg = f"Analysis failed: {str(e)}"
        logger.error(error_msg, exc_info=True)
        raise HTTPException(status_code=500, detail=error_msg)

@app.get("/health")
async def health_check():
    """
    Simple health check endpoint.
    """
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)