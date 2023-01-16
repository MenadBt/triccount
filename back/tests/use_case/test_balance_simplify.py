from src.domain.expense import Expense
from src.domain.person import Person
from src.use_case.balance_simplify import compute_total_common_expenses, compute_total_nights, \
    compute_night_share_per_person, compute_total_owed_amount


def test_when_compute_total_common_expenses_then_return_total_common_expenses():
    # Given
    expenses = [Expense(100, "2021-01-01", "toto"),
                Expense(200, "2021-01-01", "toto"),
                Expense(300, "2021-01-01", "toto")]

    # When
    result = compute_total_common_expenses(expenses)

    # Then
    assert result == 600


def test_when_compute_total_nights_then_return_total_number_of_nights():
    # Given
    people = [Person("Laura", [], 5), Person("Flavien", [], 10)]

    # When
    result = compute_total_nights(people)

    # Then
    assert result == 15


def test_when_compute_night_expense_per_person_then_return_night_expense_per_person():
    # Given
    common_expenses = 600
    total_number_of_nights = 15

    # When
    result = compute_night_share_per_person(common_expenses, total_number_of_nights)

    # Then
    assert result == 40


def test_when_compute_total_owed_amount_then_return_total_owed_amount():
    # Given
    expense_laura1 = Expense(100, "2021-01-01", "Laura")
    expense_laura2 = Expense(200, "2021-01-01", "Laura")
    expense_flavien1 = Expense(300, "2021-01-01", "Flavien")
    expense_flavien2 = Expense(400, "2021-01-01", "Flavien")

    people = [Person("Laura", [expense_laura1, expense_laura2], 4),
              Person("Flavien", [expense_flavien1, expense_flavien2], 6)]

    total_nights = compute_total_nights(people)
    common_expenses = compute_total_common_expenses([expense for expense in people[0].expenses + people[1].expenses])
    night_share_per_person = compute_night_share_per_person(common_expenses, total_nights)

    for person in people:
        person.compute_total_balance(night_share_per_person)

    # When
    result = compute_total_owed_amount(people)

    # Then
    assert result == [("Laura", "Flavien", 100)]
