from ultralytics import YOLO

class Detector:
    def __init__(self):
        self.model = YOLO("yolov8n.pt")

    def detect(self, frame):
        results = self.model(frame)

        detections = []

        for r in results:
            for box in r.boxes:
                cls = int(box.cls)

                if cls == 0:
                    detections.append({
                        "bbox": box.xyxy[0].tolist(),
                        "conf": float(box.conf)
                    })

        return detections