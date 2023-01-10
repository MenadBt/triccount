import uvicorn as uvicorn
from fastapi import FastAPI

from src.application.calculate_balance_router import balance_router

app = FastAPI()

app.include_router(balance_router, prefix="/balances", tags=["balances"])


@app.get("/health")
def read_root():
    return {"Hello": "World"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
