from pydantic import BaseModel

class MetricsResponse(BaseModel):

    unique_visitors: int

    conversion_rate: float

    avg_dwell_seconds: float

    queue_depth: int

    abandonment_rate: float