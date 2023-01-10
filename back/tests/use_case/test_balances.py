import datetime

from back.src.domain.expense import Expense
from back.src.domain.person import Person
from back.src.use_case.balances import compute_common_expenses_per_day, compute_owed_amount_per_day


def test_compute_common_expenses_per_day():
    # Given
    expense_menad_day_1 = Expense(1000, datetime.date(2022, 10, 10), "expense menad day 1")
    expense_menad_day_2 = Expense(200, datetime.date(2022, 10, 11), "expense menad day 2")

    expense_flavien_day_1 = Expense(500, datetime.date(2022, 10, 10), "expense flavien day 1")
    expense_flavien_day_2 = Expense(300, datetime.date(2022, 10, 11), "expense flavien day 2")

    expense_pauline_day_1 = Expense(250, datetime.date(2022, 10, 10), "expense pauline day 1")

    menad = Person("Menad", [expense_menad_day_1, expense_menad_day_2], 2)
    flavien = Person("Flavien", [expense_flavien_day_1, expense_flavien_day_2], 2)
    pauline = Person("Pauline", [expense_pauline_day_1], 2)

    # When
    common_expense_per_day_returned: list[dict] = compute_common_expenses_per_day([menad, flavien, pauline])

    # Then
    common_expenses_per_day_expected = [
        {
            "date": datetime.date(2022, 10, 10),
            "amount": 1750,
            "total_people": 3
        }, {
            "date": datetime.date(2022, 10, 11),
            "amount": 500,
            "total_people": 2
        }
    ]

    assert common_expense_per_day_returned == common_expenses_per_day_expected


def test_when_calculate_owed_amount_per_day_then_return_owed_amounts_per_day():
    # Given
    expense1 = Expense(450, datetime.date(2022, 1, 1), "Food")
    expense2 = Expense(1200, datetime.date(2022, 1, 1), "Drinks")
    expense3 = Expense(450, datetime.date(2022, 1, 1), "Snacks")

    person1 = Person("Alice", [expense1], 3)
    person2 = Person("Bob", [expense2], 3)
    person3 = Person("Eve", [expense3], 3)

    people = [person1, person2, person3]

    common_expenses_per_day = compute_common_expenses_per_day(people)

    for person in people:
        person.compute_daily_balances(common_expenses_per_day)

    # When
    owed_amounts = compute_owed_amount_per_day(people)

    # Then
    owed_amounts_expected = [
        ("Alice", "Bob", datetime.date(2022, 1, 1), 250),
        ("Eve", "Bob", datetime.date(2022, 1, 1), 250),
    ]

    assert owed_amounts == owed_amounts_expected
