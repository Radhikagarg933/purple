class POSService:

    def correlate(
        self,
        visitors,
        transactions
    ):

        return min(
            len(visitors),
            len(transactions)
        )s