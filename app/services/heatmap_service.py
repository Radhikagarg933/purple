class HeatmapService:

    def generate(
        self,
        events
    ):

        zones = {}

        for e in events:

            if not e.zone_id:
                continue

            zones.setdefault(
                e.zone_id,
                0
            )

            zones[e.zone_id] += 1

        return zones