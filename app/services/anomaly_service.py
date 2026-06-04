class AnomalyService:

    def detect(
        self,
        metrics
    ):

        anomalies = []

        if metrics[
            "unique_visitors"
        ] == 0:

            anomalies.append({

                "severity":
                "WARN",

                "anomaly_type":
                "EMPTY_STORE",

                "message":
                "No visitors detected",

                "suggested_action":
                "Check camera feed"
            })

        return anomalies