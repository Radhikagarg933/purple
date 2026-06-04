from datetime import datetime

class ReIDManager:

    def __init__(self):
        self.exited = {}

    def register_exit(
        self,
        visitor_id,
        feature
    ):
        self.exited[visitor_id] = {
            "feature": feature,
            "time": datetime.now()
        }

    def find_reentry(self, feature):

        for vid,data in self.exited.items():

            distance = abs(
                data["feature"] - feature
            )

            if distance < 0.1:
                return vid

        return None