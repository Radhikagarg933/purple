def test_event_schema():

    event = {

        "event_id":"1",

        "store_id":"S1",

        "camera_id":"C1",

        "visitor_id":"V1",

        "event_type":"ENTRY",

        "timestamp":
        "2025-01-01",

        "confidence":0.9,

        "is_staff":False,

        "metadata":{}
    }

    assert event[
        "event_type"
    ] == "ENTRY"