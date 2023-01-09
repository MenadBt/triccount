import datetime

from main import compute_night_expense, compute_share_per_night_per_person, Person, Expense, \
    compute_common_expenses_per_day


class TestPerson:

    def test_when_compute_total_expenses_per_day_then_return_total_expenses_per_day(self):
        # Given
        expense1 = Expense(1000, datetime.date(2022, 10, 10), "toto")
        expense2 = Expense(1000, datetime.date(2022, 10, 10), "toto")

        expense3 = Expense(2000, datetime.date(2022, 10, 11), "toto")
        expense4 = Expense(2000, datetime.date(2022, 10, 11), "toto")

        person = Person("Menad", [expense1, expense2, expense3, expense4], 3)

        # When
        total_expenses_per_day_received = person.compute_total_expenses_per_day()

        # Then
        total_expenses_expected = [
            {"date": datetime.date(2022, 10, 10), "amount": 2000},
            {"date": datetime.date(2022, 10, 11), "amount": 4000}
        ]

        assert total_expenses_per_day_received == total_expenses_expected

    def test_when_compute_daily_balances_then_return_daily_balances(self):
        # Given
        expense1 = Expense(1000, datetime.date(2022, 10, 10), "toto")
        expense2 = Expense(500, datetime.date(2022, 10, 11), "toto")
        person = Person("Menad", [expense1, expense2], 3)

        common_expenses_per_day = [
            {"date": datetime.date(2022, 10, 10), "amount": 2000, "number_of_people": 2},
            {"date": datetime.date(2022, 10, 11), "amount": 4000, "number_of_people": 2}
        ]

        # When
        daily_balances_received: list[dict] = person.compute_daily_balances(common_expenses_per_day)

        # Then
        daily_balances_expected = [
            {"date": datetime.date(2022, 10, 10), "amount": 0},
            {"date": datetime.date(2022, 10, 11), "amount": -1500}
        ]

        assert daily_balances_received == daily_balances_expected


def test_compute_night_expense():
    # Given
    common_expenses = 1000
    total_number_of_nights = 10

    # When
    night_expense_returned = compute_night_expense(common_expenses, total_number_of_nights)

    # Then
    night_expense_expected = 100

    assert night_expense_returned == night_expense_expected


def test_compute_share_per_night_per_person():
    # Given
    person = Person("Menad", [Expense(1000, datetime.date(2022, 10, 10), "toto")], 10)
    night_expense = 100

    # When
    share_per_night_returned = compute_share_per_night_per_person(person, night_expense)

    # Then
    share_per_night_expected = 1000
    assert share_per_night_returned == share_per_night_expected


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
