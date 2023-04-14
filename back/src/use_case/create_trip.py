from dependencies import trip_repo
from infrastructure.objects_db import TripDb


def create_trip(trip: TripDb) -> TripDb:
    return trip_repo.create(trip)
