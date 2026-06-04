from pydantic import BaseModel

class HeatmapZone(BaseModel):

    zone_id: str

    visit_count: int

    avg_dwell_seconds: float

    normalized_score: float