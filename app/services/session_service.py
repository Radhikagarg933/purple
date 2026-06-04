class SessionService:

    def __init__(self):

        self.active = {}

    def start(
        self,
        visitor_id
    ):
        self.active[
            visitor_id
        ] = True

    def end(
        self,
        visitor_id
    ):
        self.active.pop(
            visitor_id,
            None
        )