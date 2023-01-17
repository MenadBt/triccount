from datetime import datetime


class Expense:
    def __init__(self, amount: float, description: str, person: str):
        self.amount = amount
        self.description = description
        self.person = person

    def __str__(self):
        return f"{self.amount} for {self.description}"

