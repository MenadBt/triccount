from datetime import datetime


class Expense:
    def __init__(self, amount: float, date: datetime.date, description: str):
        self.amount = amount
        self.date = date
        self.description = description

    def __str__(self):
        return f"{self.amount} on {self.date} for {self.description}"

