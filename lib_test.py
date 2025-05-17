import fastapi, pydantic, uvicorn,PIL
import huggingface_hub, langchain_community, langchain_groq, groq, transformers

print("fastapi version", fastapi.__version__)
print("pydantic version", pydantic.__version__)
print("uvicorn version", uvicorn.__version__)
print("huggingface_hub version", huggingface_hub.__version__)
print("langchain_community version", langchain_community.__version__)
print("groq version", groq.__version__)
print("transformers version", transformers.__version__)
print("PIL version", PIL.__version__)
