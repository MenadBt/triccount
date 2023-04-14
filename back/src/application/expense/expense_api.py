from pydantic import BaseModel

from application.person.person_api import PersonApi
from domain.expense import Expense


class ExpenseApi(BaseModel):
    amount: float
    description: str
    person: str

    def to_expense(self) -> Expense:
        return Expense(
            amount=self.amount,
            description=self.description,
            person_id=self.person
        )


class PayloadApi(BaseModel):
    persons: list[PersonApi]
    expenses: list[ExpenseApi]
