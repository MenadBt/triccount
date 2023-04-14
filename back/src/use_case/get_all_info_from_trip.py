from dependencies import person_repo, expense_repo


def get_all_info_from_trip(trip_id: int):
    persons = person_repo.get_all_persons(trip_id)
    expenses = expense_repo.get_all_expenses(trip_id)

    return persons, expenses
