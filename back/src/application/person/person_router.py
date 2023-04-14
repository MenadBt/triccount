from fastapi import APIRouter

from application.person.person_api import PersonApi
from domain.person import Person
from use_case.create_person import create_person

person_router = APIRouter()


@person_router.post("/api/createPerson")
def add_new_person(person_api: PersonApi):
    person: Person = person_api.to_person()
    create_person(person)

# Delete person from db
@person_router.delete("/api/deletePerson/{person_id}")
def delete_person(person_api: PersonApi):
    delete_person_from_db(person_api.id)
