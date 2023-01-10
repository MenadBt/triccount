from fastapi import APIRouter

from src.application.person_api import PersonApi
from src.use_case.balances import compute_owed_amount_per_day, compute_total_owed_amount

balance_router = APIRouter()


@balance_router.post("/calculate_daily_balances")
def calculate_total_balances(persons: list[PersonApi]):
    persons = [person.to_person() for person in persons]

    owed_amount_per_day = compute_owed_amount_per_day(persons)

    return compute_total_owed_amount(owed_amount_per_day)
