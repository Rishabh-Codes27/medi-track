from langchain_groq import ChatGroq
from PIL import Image
import base64
import io
import os
from dotenv import load_dotenv

load_dotenv()

class ImageProcessor:
    def __init__(self):
        try:
            api_key = os.getenv("GROQ_API_KEY")
            if not api_key:
                raise ValueError("GROQ_API_KEY not found in environment variables")
            self.model = ChatGroq(
                model_name="meta-llama/llama-4-maverick-17b-128e-instruct",
                api_key=api_key,
                temperature=0.4
            )
        except Exception as e:
            raise Exception(f"Failed to initialize Groq model: {str(e)}")

    def process(self, image: Image.Image):
        try:
            image_format = image.format if image.format else "JPEG"

            buffered = io.BytesIO()
            image.save(buffered, format=image_format)
            image_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

            prompt = [
                {
                    "type": "text",
                    "text": "Analyze this image and provide a detailed description of its contents, including objects, colors, and any notable features."
                },
                {
                    "type": "image_url",
                    "image_url": f"data:image/{image_format.lower()};base64,{image_base64}"
                }
            ]

            response = self.model.invoke(prompt)

            return {
                "description": response.content,
                "image_size": {"width": image.width, "height": image.height},
                "format": image_format
            }

        except Exception as e:
            raise Exception(f"Error processing image with Groq model: {str(e)}")