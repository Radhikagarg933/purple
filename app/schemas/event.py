from pydantic import BaseModel

class EventIn(BaseModel):

    event_id: str

    store_id: str

    camera_id: str

    visitor_id: str

    event_type: str

    timestamp: str

    zone_id: str | None = None

    dwell_ms: int = 0

    is_staff: bool

    confidence: float

    metadata: dict