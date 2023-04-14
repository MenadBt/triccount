from pydantic import BaseModel

from domain.expense import Expense
from domain.person import Person


class PersonApi(BaseModel):
    name: str
    night: int
    trip_id: int

    def to_person(self, expenses: list[Expense] = None):
        if expenses:
            expenses = [expense for expense in expenses if expense.person_id == self.name]

        return Person(
            name=self.name,
            trip_id=self.trip_id,
            expenses=expenses,
            night_number=self.night
        )
