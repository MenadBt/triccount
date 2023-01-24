from src.domain.expense import Expense
from src.domain.person import Person


def compute_total_common_expenses(expenses: list[Expense]) -> float:
    return sum(expense.amount for expense in expenses)


def compute_total_nights(people: list[Person]) -> int:
    return sum(person.night for person in people)


def compute_night_share_per_person(common_expenses: float,
                                   total_number_of_nights: int) -> float:
    return common_expenses / total_number_of_nights


def compute_total_owed_amount(people: list[Person]) -> list[dict[str, str, float]]:
    owed_amounts = []

    for person in people:
        if person.owes_money():
            amount_owed = -person.total_balance

            for other_person in people:
                if other_person == person:
                    continue

                if other_person.is_owed_money():
                    amount_received = min(amount_owed, other_person.total_balance)

                    owed_amounts.append({
                        "person1": person.name,
                        "person2": other_person.name,
                        "amount": round(amount_received, 2)
                    })

                    amount_owed -= amount_received
                    other_person.total_balance -= amount_received

                    if amount_owed == 0:
                        break

    return owed_amounts
