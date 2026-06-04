from fastapi import APIRouter
from fastapi import Depends

from app.db.database import get_db

from app.services.metrics_service import (
    MetricsService
)

router = APIRouter()

@router.get(
"/stores/{store_id}/metrics"
)
def metrics(
    store_id: str,
    db=Depends(get_db)
):

    service = MetricsService(
        db
    )

    return service.calculate(
        store_id
    )

@router.get(
"/stores/{store_id}/funnel"
)
def funnel(
    store_id: str
):
    return {
        "store":
        store_id
    }

@router.get(
"/stores/{store_id}/heatmap"
)
def heatmap(
    store_id: str
):
    return {
        "store":
        store_id
    }

@router.get(
"/stores/{store_id}/anomalies"
)
def anomalies(
    store_id: str
):
    return []