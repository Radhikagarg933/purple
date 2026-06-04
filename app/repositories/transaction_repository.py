from app.db.models import Transaction

class TransactionRepository:

    def __init__(self, db):
        self.db = db

    def get_store_transactions(
        self,
        store_id
    ):
        return self.db.query(
            Transaction
        ).filter(
            Transaction.store_id == store_id
        ).all()