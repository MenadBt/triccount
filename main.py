import datetime


class Expense:
    def __init__(self, amount: float, date: datetime.date, description: str):
        self.amount = amount
        self.date = date
        self.description = description

    def __str__(self):
        return f"{self.amount} on {self.date} for {self.description}"


class Person:
    def __init__(self, name: str, expenses: list[Expense], night_number: int):
        self.name = name
        self.expenses = expenses
        self.night_number = night_number
        self.daily_balances = None

    def get_total_expenses(self) -> float:
        return sum(expense.amount for expense in self.expenses)

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
                    daily_balance = (common_expense["amount"] / common_expense["number_of_people"]) - daily_expense[
                        "amount"]

                    self.daily_balances.append({
                        "date": daily_expense["date"],
                        "amount": daily_balance
                    })

        return self.daily_balances

    def __str__(self):
        return f"{self.name} has {self.get_total_expenses()}€ in expenses. Stayed for {self.night_number} nights. \n" \
               f" Daily balances: {self.daily_balances}"


def compute_night_expense(common_expenses: float, total_number_of_nights: int) -> float:
    return common_expenses / total_number_of_nights


def compute_share_per_night_per_person(person: Person, night_expense: float):
    return night_expense * person.night_number


def compute_common_expenses_per_day(people: list[Person]) -> list[dict]:
    common_expenses_per_day = []
    day_visited = set()

    for person in people:
        total_person_expenses: list[dict] = person.compute_total_expenses_per_day()

        for expense in total_person_expenses:
            if expense["date"] in day_visited:
                for common_expense in common_expenses_per_day:
                    if common_expense["date"] == expense["date"]:
                        common_expense["amount"] += expense["amount"]
                        common_expense["total_people"] += 1
            else:
                day_visited.add(expense["date"])

                common_expenses_per_day.append(
                    {
                        "date": expense["date"],
                        "amount": expense["amount"],
                        "total_people": 1
                    })

    return common_expenses_per_day

# TODO: FINIR CETTE FONCTION -> elle ne distribue pas correctement les balance
def calculate_owed_amount(people: list[Person]) -> list[tuple[str, str, float]]:
    # Calculate the total amount of money that each person owes for each day
    owed_amounts = []
    for person in people:
        for daily_balance in person.daily_balances:
            if daily_balance["amount"] > 0:
                # This person owes money for this day
                amount_owed = -daily_balance["amount"]
                for other_person in people:
                    if other_person == person:
                        continue
                    for other_daily_balance in other_person.daily_balances:
                        if other_daily_balance["date"] == daily_balance["date"]:
                            if other_daily_balance["amount"] < 0:
                                # The other person is owed money for this day, so they will receive some of the money that the first person owes
                                amount_received = min(amount_owed, other_daily_balance["amount"])
                                owed_amounts.append((person.name, other_person.name, amount_received))
                                amount_owed -= amount_received
                                other_daily_balance["amount"] -= amount_received
                                if amount_owed == 0:
                                    break
    return owed_amounts


if __name__ == "__main__":
    expense1 = Expense(200, datetime.date(2022, 1, 1), "Food")
    expense2 = Expense(50, datetime.date(2022, 1, 1), "Drinks")
    expense3 = Expense(50, datetime.date(2022, 1, 1), "Snacks")

    person1 = Person("Alice", [expense1], 3)
    person2 = Person("Bob", [expense2], 3)
    person3 = Person("Eve", [expense3], 3)

    people = [person1, person2, person3]

    common_expenses_per_day = [{"date": datetime.date(2022, 1, 1), "amount": 300, "number_of_people": 3}]

    for person in people:
        person.compute_daily_balances(common_expenses_per_day)
        print(person)

    owed_amounts = calculate_owed_amount(people)

    print(owed_amounts)
