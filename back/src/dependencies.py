from sqlalchemy import create_engine
from sqlalchemy.orm import create_session

from infrastructure.objects_db import Base
from infrastructure.repository.expense_repository import ExpenseRepository
from infrastructure.repository.person_repository import PersonRepository
from infrastructure.repository.trip_repository import TripRepository

# DATABASE_URL = "postgresql://postgres:password@postgres:5432/triccount"
DATABASE_URL = "postgresql://postgres:password@localhost:5432/triccount"

engine = create_engine(DATABASE_URL)
Base.metadata.create_all(engine)
session = create_session(bind=engine)

trip_repo = TripRepository(session)
person_repo = PersonRepository(session)
expense_repo = ExpenseRepository(session)
