from fastapi import APIRouter

from application.expense.expense_api import PayloadApi
from use_case.balance_simplify import compute_total_owed_amount, compute_total_nights, \
    compute_total_common_expenses, compute_night_share_per_person

balance_router = APIRouter()


@balance_router.post("/api/getBalances")
def calculate_balances(payload: PayloadApi):
    persons_api = payload.persons
    expenses_api = payload.expenses

    expenses = [expense_api.to_expense() for expense_api in expenses_api]
    people = [person_api.to_person(expenses) for person_api in persons_api]

    total_nights = compute_total_nights(people)
    common_expenses = compute_total_common_expenses(expenses)
    night_share_per_person = compute_night_share_per_person(common_expenses, total_nights)

    for person in people:
        person.compute_total_balance(night_share_per_person)

    return compute_total_owed_amount(people)
