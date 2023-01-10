from back.src.domain.person import Person


def compute_night_expense(common_expenses: float, total_number_of_nights: int) -> float:
    return common_expenses / total_number_of_nights


def compute_share_per_night_per_person(person: Person, night_expense: float):
    return night_expense * person.night_number
