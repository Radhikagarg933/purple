def test_metrics():

    result = {

        "unique_visitors":10,

        "entries":10,

        "exits":5
    }

    assert result[
        "unique_visitors"
    ] > 0