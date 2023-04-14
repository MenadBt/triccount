from typing import Optional

from sqlalchemy.orm import Session

from infrastructure.objects_db import PersonDb


class PersonRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, person: PersonDb) -> PersonDb:
        self.db.add(person)
        self.db.commit()
        self.db.refresh(person)
        return person

    def read_all(self) -> list[PersonDb]:
        return self.db.query(PersonDb).all()

    def read(self, person_id: int) -> Optional[PersonDb]:
        return self.db.query(PersonDb).filter(PersonDb.id == person_id).first()

    def update(self, person: PersonDb) -> PersonDb:
        self.db.add(person)
        self.db.commit()
        self.db.refresh(person)
        return person

    def delete(self, person_id: int):
        self.db.query(PersonDb).filter(PersonDb.id == person_id).delete()
        self.db.commit()

    # get all persons
    def get_all_persons(self, trip_id: int) -> list[PersonDb]:
        return self.db.query(PersonDb).filter(PersonDb.trip_id == trip_id).all()
