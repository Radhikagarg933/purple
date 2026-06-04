from pydantic import BaseModel

class FunnelResponse(BaseModel):

    entry: int

    zone_visit: int

    billing: int

    purchase: int