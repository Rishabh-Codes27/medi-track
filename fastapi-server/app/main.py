from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from ..app.models.document_processor import DocumentProcessor
import os

app = FastAPI()

class DocumentPath(BaseModel):
    path: str  # Local file path to image or PDF

document_processor = DocumentProcessor()

@app.post("/process-document/")
async def process_document(doc_path: DocumentPath):
    try:
        if not os.path.exists(doc_path.path):
            raise HTTPException(status_code=404, detail="File not found")
        if not os.path.isfile(doc_path.path):
            raise HTTPException(status_code=400, detail="Path is not a file")

        result = document_processor.process_document(doc_path.path)
        return {"result": result}

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing document: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)