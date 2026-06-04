from fastapi import FastAPI

from app.routers import (
    events,
    stores,
    health
)

app = FastAPI(
    title="Store Intelligence API"
)

app.include_router(
    events.router
)

app.include_router(
    stores.router
)

app.include_router(
    health.router
)