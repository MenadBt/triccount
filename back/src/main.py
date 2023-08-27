import uvicorn as uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from application.calculate_balance_router import balance_router
from application.expense.expense_router import expense_router
from application.person.person_router import person_router

app = FastAPI()

app.include_router(balance_router)
# app.include_router(trip_router)
app.include_router(person_router)
app.include_router(expense_router)


@app.get("/health")
def read_root():
    return {"Hello": "World"}


origins = [
    "http://triccount-imali.fr",
    "http://localhost",
    "http://localhost:3000",  # front
    "http://localhost:80",  # front
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
