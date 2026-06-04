from app.db.models import Event

class EventRepository:

    def __init__(self, db):
        self.db = db

    def save(self, event):

        self.db.add(event)

    def get_by_id(self, event_id):

        return self.db.query(Event)\
            .filter(
                Event.event_id == event_id
            ).first()

    def get_store_events(
        self,
        store_id
    ):

        return self.db.query(Event)\
            .filter(
                Event.store_id == store_id
            ).all()