from datetime import timedelta

class POSMapper:

    def correlate(
        self,
        visitors,
        transaction_time
    ):

        converted = []

        for v in visitors:

            diff = (
                transaction_time -
                v["billing_time"]
            )

            if diff <= timedelta(minutes=5):
                converted.append(
                    v["visitor_id"]
                )

        return converted