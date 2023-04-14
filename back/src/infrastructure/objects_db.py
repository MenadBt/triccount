from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class TripDb(Base):
    __tablename__ = 'trips'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    persons = relationship("PersonDb", back_populates="trip")

    def __repr__(self):
        return f"Trip(id={self.id}, " \
               f"name={self.name}," \
               f"description={self.description},"


class PersonDb(Base):
    __tablename__ = 'persons'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    nights = Column(Integer)
    trip_id = Column(Integer, ForeignKey('trips.id'))
    trip = relationship("TripDb", back_populates="persons")
    expenses = relationship("ExpenseDb", back_populates="person")


class ExpenseDb(Base):
    __tablename__ = 'expenses'

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Integer)
    description = Column(String)
    person_id = Column(Integer, ForeignKey('persons.id'))
    person = relationship("PersonDb", back_populates="expenses")

    def __repr__(self):
        return f"Expense(id={self.id}, " \
               f"amount={self.amount}," \
               f" description={self.description}," \
               f" person={self.person})"
