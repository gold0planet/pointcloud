from fastapi import FastAPI
import logging
from api.endpoints import router

logging.basicConfig(level=logging.INFO)

app = FastAPI()

app.include_router(router)