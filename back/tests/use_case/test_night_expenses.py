import datetime

from back.src.domain.expense import Expense
from back.src.domain.person import Person
from back.src.use_case.night_expenses import compute_night_expense, compute_share_per_night_per_person


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

