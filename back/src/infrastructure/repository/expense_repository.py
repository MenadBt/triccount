from infrastructure.objects_db import ExpenseDb


class ExpenseRepository:
    def __init__(self, session):
        self.session = session

    def get_all(self):
        return self.session.query(ExpenseDb).all()

    def get_by_id(self, id):
        return self.session.query(ExpenseDb).filter(ExpenseDb.id == id).first()

    def get_by_person_id(self, person_id):
        return self.session.query(ExpenseDb).filter(ExpenseDb.person_id == person_id).all()

    def create(self, expense):
        expense_db = ExpenseDb(amount=expense.amount,
                               description=expense.description,
                               person_id=expense.person_id)
        self.session.add(expense_db)
        self.session.commit()
        return expense_db

    def update(self, expense):
        expense_db = self.get_by_id(expense.id)
        expense_db.amount = expense.amount
        expense_db.description = expense.description
        expense_db.person_id = expense.person_id
        self.session.commit()
        return expense_db

    def delete(self, id):
        expense_db = self.get_by_id(id)
        self.session.delete(expense_db)
        self.session.commit()

    def get_all_expenses(self, trip_id: int) -> list[ExpenseDb]:
        return self.session.query(ExpenseDb).filter(ExpenseDb.trip_id == trip_id).all()