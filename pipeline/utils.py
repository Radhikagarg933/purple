import uuid
import json
from datetime import datetime

def generate_event_id():
    return str(uuid.uuid4())

def utc_now():
    return datetime.utcnow().isoformat()

def bbox_center(bbox):

    x1, y1, x2, y2 = bbox

    cx = int((x1 + x2) / 2)
    cy = int((y1 + y2) / 2)

    return cx, cy

def bbox_area(bbox):

    x1, y1, x2, y2 = bbox

    return (x2 - x1) * (y2 - y1)

def save_jsonl(events, output_file):

    with open(
        output_file,
        "w",
        encoding="utf-8"
    ) as f:

        for event in events:

            f.write(
                json.dumps(event)
            )

            f.write("\n")