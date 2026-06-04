from pydantic import BaseModel

class AnomalyResponse(BaseModel):

    severity: str

    anomaly_type: str

    message: str

    suggested_action: str