from domain.expense import Expense


class Person:
    def __init__(self,
                 name: str,
                 expenses: list[Expense],
                 night_number: int,
                 trip_id: int):
        self.name = name
        self.expenses = expenses
        self.nights = night_number
        self.trip_id = trip_id
        self.daily_balances = None
        self.total_balance = None

    def get_total_expenses(self) -> float:
        return sum(expense.amount for expense in self.expenses)

    def compute_total_balance(self, night_share: float):
        self.total_balance = self.get_total_expenses() - (night_share * self.nights)

    def compute_total_expenses_per_day(self) -> list[dict]:
        total_expenses_per_day = {}

        for expense in self.expenses:
            if expense.date in total_expenses_per_day:
                total_expenses_per_day[expense.date] += expense.amount
            else:
                total_expenses_per_day[expense.date] = expense.amount
        return [
            {
                "date": date,
                "amount": amount
            }
            for date, amount in total_expenses_per_day.items()
        ]

    def compute_daily_balances(self, common_expenses_per_day: list[dict]) -> list[dict]:
        self.daily_balances = []

        for daily_expense in self.compute_total_expenses_per_day():
            for common_expense in common_expenses_per_day:
                if daily_expense["date"] == common_expense["date"]:
                    daily_balance = daily_expense[
                                        "amount"] - (common_expense["amount"] / common_expense["total_people"])

                    self.daily_balances.append({
                        "date": daily_expense["date"],
                        "amount": daily_balance
                    })

        return self.daily_balances

    def owes_money(self) -> bool:
        return self.total_balance < 0

    def is_owed_money(self) -> bool:
        return self.total_balance > 0

    def __str__(self):
        return f"{self.name} has {self.get_total_expenses()}€ in expenses. Stayed for {self.nights} nights. \n" \
               f" Daily balances: {self.daily_balances}"
