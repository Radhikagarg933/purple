class SessionRepository:

    def __init__(self):
        self.sessions = {}

    def create(
        self,
        visitor_id
    ):
        self.sessions[
            visitor_id
        ] = {}

    def exists(
        self,
        visitor_id
    ):
        return visitor_id in self.sessions