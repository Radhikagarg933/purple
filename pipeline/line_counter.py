class LineCounter:

    def __init__(self, y_line):
        self.y_line = y_line
        self.previous = {}

    def check_crossing(self, track_id, center_y):

        if track_id not in self.previous:
            self.previous[track_id] = center_y
            return None

        prev = self.previous[track_id]
        self.previous[track_id] = center_y

        if prev < self.y_line and center_y >= self.y_line:
            return "ENTRY"

        if prev > self.y_line and center_y <= self.y_line:
            return "EXIT"

        return None