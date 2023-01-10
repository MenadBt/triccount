from pydantic import BaseModel
from datetime import datetime

from src.domain.expense import Expense


class ExpenseApi(BaseModel):
    amount: float
    date: datetime
    description: str

    def to_expense(self):
        return Expense(self.amount, self.date, self.description)
