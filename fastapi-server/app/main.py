from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from PIL import Image
import io
from models.image_processor import ImageProcessor

app = FastAPI()

class ImageURL(BaseModel):
    url: str

image_processor = ImageProcessor()

@app.post("/process-image/")
async def process_image(image_url: ImageURL):
    try:
        response = requests.get(image_url.url, timeout=10)
        response.raise_for_status()

        image = Image.open(io.BytesIO(response.content))

        result = image_processor.process(image)

        return result

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Error downloading image: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 