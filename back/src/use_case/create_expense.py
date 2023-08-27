from domain.expense import Expense
from infrastructure.objects_db import ExpenseDb


def create_expense(expense: Expense):
    expense_db = ExpenseDb(
        amount=expense.amount,
        description=expense.description,
        person_id=expense.person_id
    )

    # expense_repo.create(expense_db)
