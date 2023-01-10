import datetime
from back.src.domain.expense import Expense
from back.src.domain.person import Person


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
            {"date": datetime.date(2022, 10, 10), "amount": 2000, "total_people": 2},
            {"date": datetime.date(2022, 10, 11), "amount": 4000, "total_people": 2}
        ]

        # When
        daily_balances_received: list[dict] = person.compute_daily_balances(common_expenses_per_day)

        # Then
        daily_balances_expected = [
            {"date": datetime.date(2022, 10, 10), "amount": 0},
            {"date": datetime.date(2022, 10, 11), "amount": -1500}
        ]

        assert daily_balances_received == daily_balances_expected
