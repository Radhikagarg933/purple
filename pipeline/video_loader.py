import cv2

class VideoLoader:

    def __init__(self, video_path):

        self.video_path = video_path
        self.cap = cv2.VideoCapture(video_path)

        if not self.cap.isOpened():
            raise Exception(
                f"Cannot open {video_path}"
            )

        self.fps = self.cap.get(
            cv2.CAP_PROP_FPS
        )

        self.width = int(
            self.cap.get(
                cv2.CAP_PROP_FRAME_WIDTH
            )
        )

        self.height = int(
            self.cap.get(
                cv2.CAP_PROP_FRAME_HEIGHT
            )
        )

        self.total_frames = int(
            self.cap.get(
                cv2.CAP_PROP_FRAME_COUNT
            )
        )

    def frames(self):

        frame_no = 0

        while True:

            ret, frame = self.cap.read()

            if not ret:
                break

            yield frame_no, frame

            frame_no += 1

    def release(self):
        self.cap.release()