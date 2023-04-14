from typing import Optional

from sqlalchemy.orm import Session
from infrastructure.objects_db import ExpenseDb, PersonDb

from infrastructure.objects_db import TripDb


class TripRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, trip: TripDb) -> TripDb:
        self.db.add(trip)
        self.db.commit()
        self.db.refresh(trip)
        return trip

    def get_all(self) -> list[TripDb]:
        return self.db.query(TripDb).all()

    def get(self, trip_id: int) -> Optional[TripDb]:
        return self.db.query(TripDb).filter(TripDb.id == trip_id).first()

    def update(self, trip: TripDb) -> TripDb:
        self.db.add(trip)
        self.db.commit()
        self.db.refresh(trip)
        return trip

    def delete(self, trip_id: int):
        self.db.query(TripDb).filter(TripDb.id == trip_id).delete()
        self.db.commit()

    def get_all_persons(self, trip_id: int) -> list[PersonDb]:
        return self.db.query(PersonDb).filter(PersonDb.trip_id == trip_id).all()

    def get_all_expenses(self, trip_id: int) -> list[ExpenseDb]:
        return self.db.query(ExpenseDb).filter(ExpenseDb.trip_id == trip_id).all()

    # Get all persons and expenses
    def get_all_persons_and_expenses(self, trip_id: int) -> list[PersonDb]:
        persons = self.db.query(PersonDb).filter(PersonDb.trip_id == trip_id).all()
        expenses = []
        for person in persons:
            expenses.append(self.db.query(ExpenseDb).filter(ExpenseDb.person_id == person.id).all())



