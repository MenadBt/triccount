from fastapi import APIRouter

from application.trip.trip_api import TripApi
from infrastructure.objects_db import TripDb
from use_case.create_trip import create_trip
from use_case.get_all_info_from_trip import get_all_info_from_trip
from use_case.get_all_trips import get_all_trips

trip_router = APIRouter()


@trip_router.post("/api/createTrip")
def add_new_trip(trip_api: TripApi) -> TripApi:
    trip: TripDb = trip_api.to_trip()
    trip_db = create_trip(trip)
    return TripApi.from_trip_db(trip_db)


@trip_router.get("/api/getAllTrips")
def get_trips():
    return get_all_trips()


@trip_router.get("/api/getAllInfoFromTrip/{trip_id}")
def get_info_from_trip(trip_id: int):
    persons, expenses = get_all_info_from_trip(trip_id)
    return persons, expenses
