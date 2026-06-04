from fastapi import APIRouter
from fastapi import Depends

from app.db.database import get_db

from app.schemas.event import EventIn

from app.services.ingestion_service import (
    IngestionService
)

router = APIRouter()

@router.post(
    "/events/ingest"
)
def ingest(
    events: list[EventIn],
    db=Depends(get_db)
):

    service = IngestionService(db)

    inserted = service.ingest(
        events
    )

    return {
        "inserted":
        inserted
    }