class StaffDetector:

    def is_staff(self, session):

        if session["zones"] > 5:
            return True

        if session["dwell"] > 3600:
            return True

        return False