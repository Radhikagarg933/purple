from app.db.models import Event

class IngestionService:

    def __init__(self, db):

        self.db = db

    def ingest(
        self,
        events
    ):

        inserted = 0

        for e in events:

            exists = self.db.query(
                Event
            ).filter(
                Event.event_id
                ==
                e.event_id
            ).first()

            if exists:
                continue

            db_event = Event(
                event_id=e.event_id,
                store_id=e.store_id,
                camera_id=e.camera_id,
                visitor_id=e.visitor_id,
                event_type=e.event_type,
                timestamp=e.timestamp,
                zone_id=e.zone_id,
                dwell_ms=e.dwell_ms,
                is_staff=e.is_staff,
                confidence=e.confidence,
                metadata_json=e.metadata
            )

            self.db.add(db_event)

            inserted += 1

        self.db.commit()

        return inserted