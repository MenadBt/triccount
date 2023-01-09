import datetime

from src.domain.person import Person


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


def compute_owed_amount_per_day(people: list[Person]) -> list[tuple[str, str, datetime.date, float]]:
    # Calculate the total amount of money that each person owes for each day
    owed_amounts = []

    for person in people:
        for daily_balance in person.daily_balances:
            person_owes_money = (daily_balance["amount"] < 0)

            if person_owes_money:
                amount_owed = -daily_balance["amount"]

                for other_person in people:
                    if other_person == person:
                        continue

                    for other_daily_balance in other_person.daily_balances:
                        if other_daily_balance["date"] == daily_balance["date"]:
                            other_person_is_owed_money = (other_daily_balance["amount"] > 0)

                            if other_person_is_owed_money:
                                amount_received = min(amount_owed, other_daily_balance["amount"])
                                owed_amounts.append(
                                    (person.name, other_person.name, daily_balance["date"], amount_received))
                                amount_owed -= amount_received
                                other_daily_balance["amount"] -= amount_received

                                if amount_owed == 0:
                                    break
    return owed_amounts


def compute_total_owed_amount(owed_amounts_per_day: list[tuple[str, str, datetime.date, float]]) -> dict:
    total_owed_amounts = {}

    for owed_amount in owed_amounts_per_day:
        if owed_amount[0:2] in total_owed_amounts:
            total_owed_amounts[owed_amount[0:2]] += owed_amount[3]
        else:
            total_owed_amounts[owed_amount[0:2]] = owed_amount[3]

    return total_owed_amounts
