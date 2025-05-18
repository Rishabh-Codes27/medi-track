from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from PIL import Image
import io
from .models.image_processor import ImageProcessor
import os

app = FastAPI()

class FilePathModel(BaseModel):
    file_path: str

image_processor = ImageProcessor()

@app.post("/process-image/")
async def process_image(data: FilePathModel):
    try:
        if not os.path.exists(data.file_path):
            raise HTTPException(status_code=404, detail="File not found on server")

        image = Image.open(data.file_path)

        result = image_processor.process(image)
        return {"result": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 