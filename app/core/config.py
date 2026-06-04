import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://admin:admin@db/storeintel"
)

REDIS_URL = os.getenv(
    "REDIS_URL",
    "redis://redis:6379"
)

MAX_BATCH_SIZE = 500

QUEUE_SPIKE_THRESHOLD = 10

CONVERSION_DROP_THRESHOLD = 0.30