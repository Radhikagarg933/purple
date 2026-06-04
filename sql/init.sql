CREATE TABLE IF NOT EXISTS events(

event_id VARCHAR PRIMARY KEY,

store_id VARCHAR,

camera_id VARCHAR,

visitor_id VARCHAR,

event_type VARCHAR,

timestamp VARCHAR,

zone_id VARCHAR,

dwell_ms INTEGER,

is_staff BOOLEAN,

confidence FLOAT,

metadata_json JSON
);

CREATE TABLE IF NOT EXISTS transactions(

transaction_id VARCHAR PRIMARY KEY,

store_id VARCHAR,

timestamp VARCHAR,

basket_value FLOAT
);