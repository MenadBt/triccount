class Expense:
    def __init__(self, amount: float, description: str, person_id: str):
        self.amount = amount
        self.description = description
        self.person_id = person_id

    def __str__(self):
        return f"{self.amount} for {self.description}"

