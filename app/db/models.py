from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    Boolean,
    JSON
)

from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Event(Base):

    __tablename__ = "events"

    event_id = Column(
        String,
        primary_key=True
    )

    store_id = Column(String)

    camera_id = Column(String)

    visitor_id = Column(String)

    event_type = Column(String)

    timestamp = Column(String)

    zone_id = Column(String)

    dwell_ms = Column(Integer)

    is_staff = Column(Boolean)

    confidence = Column(Float)

    metadata_json = Column(JSON)


class Transaction(Base):

    __tablename__ = "transactions"

    transaction_id = Column(
        String,
        primary_key=True
    )

    store_id = Column(String)

    timestamp = Column(String)

    basket_value = Column(Float)