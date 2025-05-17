from langchain_groq import ChatGroq
from PIL import Image
import PyPDF2
from pdf2image import convert_from_path
import easyocr
import io
import os
import json
from dotenv import load_dotenv

load_dotenv()

class DocumentProcessor:
    def __init__(self):
        # Initialize EasyOCR reader
        try:
            self.ocr_reader = easyocr.Reader(['en'], gpu=False)  # GPU off for compatibility
        except Exception as e:
            raise Exception(f"Failed to initialize EasyOCR: {str(e)}")

        # Initialize Groq model
        try:
            api_key = os.getenv("GROQ_API_KEY")
            if not api_key:
                raise ValueError("GROQ_API_KEY not found in environment variables")
            self.model = ChatGroq(
                model_name="meta-llama/llama-4-maverick-17b-128e-instruct",
                api_key=api_key,
                temperature=0.7
            )
        except Exception as e:
            raise Exception(f"Failed to initialize Groq model: {str(e)}")

    def extract_text_from_image(self, image_path: str) -> str:
        """Extract text from image files using EasyOCR"""
        try:
            # Verify image file
            with Image.open(image_path) as img:
                if img.format not in ["JPEG", "PNG"]:
                    return f"Unsupported image format: {img.format}. Use JPEG or PNG."
            
            result = self.ocr_reader.readtext(image_path, detail=0)
            text = " ".join(result)
            if not text.strip():
                return "No text extracted from image"
            return text
        except Exception as e:
            return f"OCR Error: {str(e)}"

    def extract_text_from_pdf(self, pdf_path: str) -> str:
        """Extract text from PDF files using PyPDF2 or EasyOCR"""
        text = ""
        try:
            # Try direct text extraction
            with open(pdf_path, 'rb') as file:
                reader_pdf = PyPDF2.PdfReader(file)
                for page in reader_pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + " "
            
            # If no text extracted, use OCR
            if not text.strip():
                try:
                    images = convert_from_path(pdf_path, poppler_path=os.getenv("POPPLER_PATH"))
                    for img in images:
                        img_byte_arr = io.BytesIO()
                        img.save(img_byte_arr, format='PNG')
                        result = self.ocr_reader.readtext(img_byte_arr.getvalue(), detail=0)
                        text += " ".join(result) + " "
                except Exception as e:
                    return f"OCR Error for PDF: {str(e)}"
            
            if not text.strip():
                return "No text extracted from PDF"
            return text
        except Exception as e:
            return f"Error processing PDF: {str(e)}"

    def process_document(self, file_path: str) -> dict:
        """Main processing function"""
        if not os.path.exists(file_path):
            return {"error": "File not found"}
        
        if not file_path.lower().endswith(('.png', '.jpg', '.jpeg', '.pdf')):
            return {"error": "Unsupported file format. Use JPEG, PNG, or PDF"}

        text = ""
        if file_path.lower().endswith(('.png', '.jpg', '.jpeg')):
            text = self.extract_text_from_image(file_path)
        elif file_path.lower().endswith('.pdf'):
            text = self.extract_text_from_pdf(file_path)

        if isinstance(text, str) and text.startswith(("OCR Error", "Error processing", "No text extracted", "Unsupported image format")):
            return {"error": text}
        if not text.strip():
            return {"error": "No text could be extracted"}

        return {
            "extracted_text": text
        }