def test_funnel():

    funnel = {

        "entry":10,

        "zone_visit":8,

        "billing":5,

        "purchase":3
    }

    assert funnel[
        "entry"
    ] >= funnel[
        "purchase"
    ]