from app.db.models import Event

class MetricsService:

    def __init__(self, db):

        self.db = db

    def calculate(
        self,
        store_id
    ):

        visitors = self.db.query(
            Event.visitor_id
        ).filter(
            Event.store_id
            ==
            store_id
        ).distinct().count()

        entries = self.db.query(
            Event
        ).filter(
            Event.event_type
            ==
            "ENTRY"
        ).count()

        exits = self.db.query(
            Event
        ).filter(
            Event.event_type
            ==
            "EXIT"
        ).count()

        return {
            "unique_visitors":
            visitors,

            "entries":
            entries,

            "exits":
            exits
        }