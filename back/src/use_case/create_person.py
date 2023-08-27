from domain.person import Person
from infrastructure.objects_db import PersonDb


def create_person(person: Person):
    person_db = PersonDb(
        name=person.name,
        trip_id=person.trip_id,
        nights=person.nights,
    )

    # person_repo.create(person_db)
