from pydantic import BaseModel

from src.application.expense_api import ExpenseApi
from src.domain.person import Person


class PersonApi(BaseModel):
    name: str
    expenses: list[ExpenseApi]
    night_number: int

    def to_person(self):
        return Person(
            name=self.name,
            expenses=[expense.to_expense() for expense in self.expenses],
            night_number=self.night_number
        )
