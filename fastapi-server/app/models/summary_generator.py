from langchain_groq import ChatGroq
from langchain_core.output_parsers import JsonOutputParser
from dotenv import load_dotenv
import os
import json

load_dotenv()

class SummaryGenerator:
    def __init__(self):
        try:
            api_key = os.getenv("GROQ_API_KEY")
            if not api_key:
                raise ValueError("GROQ_API_KEY not found in environment variables")
            self.model = ChatGroq(
                model_name="llama3-70b-8192",
                api_key=api_key,
                temperature=0.7
            )
            self.parser = JsonOutputParser()
        except Exception as e:
            raise Exception(f"Failed to initialize Groq model: {str(e)}")

    def generate_summary(self, text: str) -> dict:
        """Generate structured summary from extracted text using Groq Llama 70b model"""
        prompt = f"""Analyze the following medical document and extract medication details in the specified JSON schema. Ensure the output matches the schema exactly, filling in 'N/A' for missing or unclear information. Do not include any additional fields or explanations outside the schema.

        Schema:
        {{
          "Medicines": [string, ...],
          "Duration": {{
            "string": str(integer),
             ...
          }}
          "Intake per week": [string, ...],
          "Timings per week": {{
            "string": [string, ...],
            ...
          }}
        }}

        - "Medicines": List of medication names.
        - "Duration": A dictionary with only the medicine names as reference id and the element being the str(integer) duration of the particular medicine.
        - "Intake per week": List of intake instructions (e.g., "14 tablets", "7 doses") corresponding to each medicine.
        - "Timings per week": Dictionary where each key is a medicine name, and the value is a list of specific intake times (e.g., ["Monday 8:00 AM", "Monday 8:00 PM", ...]). Use 'N/A' if timings are not specified.

        Document:
        {text}

        Return the result as a JSON object matching the schema.
        """

        try:
            response = self.model.invoke(prompt)
            parsed = self.parser.parse(response.content)
            if not isinstance(parsed, dict) or not all(key in parsed for key in ["Medicines", "Intake per week", "Timings per week"]):
                return {
                    "error": "Model response does not match required schema",
                    "raw_response": response.content
                }
            # Validate schema structure
            if not isinstance(parsed["Medicines"], list) or not isinstance(parsed["Intake per week"], list) or not isinstance(parsed["Timings per week"], dict):
                return {
                    "error": "Invalid schema structure",
                    "raw_response": response.content
                }
            # Ensure Medicines and Intake per week have the same length
            if len(parsed["Medicines"]) != len(parsed["Intake per week"]):
                return {
                    "error": "Medicines and Intake per week lists must have the same length",
                    "raw_response": response.content
                }
            # Ensure Timings per week has entries for all medicines
            if set(parsed["Medicines"]) != set(parsed["Timings per week"].keys()):
                return {
                    "error": "Timings per week must have entries for all medicines",
                    "raw_response": response.content
                }
            return parsed
        except Exception as e:
            return {"error": f"Error generating summary: {str(e)}"}