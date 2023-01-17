from pydantic import BaseModel

from src.domain.expense import Expense
from src.domain.person import Person


class PersonApi(BaseModel):
    name: str
    night: int

    def to_person(self, expenses: list[Expense]):
        expenses = [expense for expense in expenses if expense.person == self.name]

        return Person(
            name=self.name,
            expenses=expenses,
            night_number=self.night
        )
