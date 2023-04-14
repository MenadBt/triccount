from fastapi import APIRouter

from application.expense.expense_api import ExpenseApi
from domain.expense import Expense
from use_case.create_expense import create_expense

expense_router = APIRouter()


@expense_router.post("/api/createExpense")
def add_new_expense(expense_api: ExpenseApi):
    expense: Expense = expense_api.to_expense()
    create_expense(expense)
