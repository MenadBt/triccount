from pydantic import BaseModel

from src.application.person_api import PersonApi
from src.domain.expense import Expense


class ExpenseApi(BaseModel):
    amount: float
    description: str
    person: str

    def to_expense(self) -> Expense:
        return Expense(
            amount=self.amount,
            description=self.description,
            person=self.person
        )


class PayloadApi(BaseModel):
    persons: list[PersonApi]
    expenses: list[ExpenseApi]
