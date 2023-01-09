import datetime

from src.domain.expense import Expense
from src.domain.person import Person
from src.use_case.balances import compute_common_expenses_per_day, compute_owed_amount_per_day, \
    compute_total_owed_amount

if __name__ == "__main__":
    expense1 = Expense(50, datetime.date(2022, 1, 1), "Food")
    expense2 = Expense(500, datetime.date(2022, 1, 1), "Drinks")
    expense3 = Expense(250, datetime.date(2022, 1, 1), "Snacks")

    expense4 = Expense(50, datetime.date(2022, 1, 2), "Food")
    expense5 = Expense(500, datetime.date(2022, 1, 2), "Drinks")
    expense6 = Expense(250, datetime.date(2022, 1, 2), "Snacks")

    person1 = Person("Alice", [expense1, expense4], 3)
    person2 = Person("Bob", [expense2, expense5], 3)
    person3 = Person("Eve", [expense3, expense6], 3)

    people = [person1, person2, person3]

    common_expenses_per_day = compute_common_expenses_per_day(people)

    for person in people:
        person.compute_daily_balances(common_expenses_per_day)

    owed_amounts_per_day: list[tuple[str, str, datetime.date, float]] = compute_owed_amount_per_day(people)

    total_owed_amounts: dict = compute_total_owed_amount(owed_amounts_per_day)
    print(total_owed_amounts)
