from pydantic import BaseModel

from infrastructure.objects_db import TripDb


class TripApi(BaseModel):
    id: int = None
    name: str
    description: str

    def to_trip(self):
        return TripDb(
            name=self.name,
            description=self.description,
        )

    @staticmethod
    def from_trip_db(trip_db: TripDb):
        return TripApi(
            id=trip_db.id,
            name=trip_db.name,
            description=trip_db.description,
        )
