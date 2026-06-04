import cv2
import numpy as np

class ZoneManager:

    def __init__(self):

        self.zones = {
            "SKINCARE":[(100,100),(500,100),
                        (500,400),(100,400)],

            "MAKEUP":[(600,100),(900,100),
                      (900,400),(600,400)]
        }

    def get_zone(self, x, y):

        for name, polygon in self.zones.items():

            poly = np.array(
                polygon,
                dtype=np.int32
            )

            inside = cv2.pointPolygonTest(
                poly,
                (x,y),
                False
            )

            if inside >= 0:
                return name

        return None