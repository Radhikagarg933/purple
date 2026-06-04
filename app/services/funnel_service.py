class FunnelService:

    def build(
        self,
        events
    ):

        entry = set()

        zone = set()

        billing = set()

        purchase = set()

        for e in events:

            vid = e.visitor_id

            if e.event_type == "ENTRY":
                entry.add(vid)

            if e.event_type == "ZONE_ENTER":
                zone.add(vid)

            if e.event_type == "BILLING_QUEUE_JOIN":
                billing.add(vid)

            if e.event_type == "PURCHASE":
                purchase.add(vid)

        return {
            "entry":
            len(entry),

            "zone_visit":
            len(zone),

            "billing":
            len(billing),

            "purchase":
            len(purchase)
        }