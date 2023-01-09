from datetime import datetime

from fastapi import FastAPI
from pydantic import BaseModel

from src.domain.expense import Expense
from src.domain.person import Person
from src.use_case.balances import compute_owed_amount_per_day, compute_total_owed_amount

app = FastAPI()


class ExpenseApi(BaseModel):
    amount: float
    date: datetime
    description: str

    def to_expense(self):
        return Expense(self.amount, self.date, self.description)


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


@app.post("/calculate_daily_balances")
def calculate_total_balances(persons: list[PersonApi]):
    persons = [person.to_person() for person in persons]

    owed_amount_per_day = compute_owed_amount_per_day(persons)

    return compute_total_owed_amount(owed_amount_per_day)
