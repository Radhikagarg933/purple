from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

VIDEOS_DIR = BASE_DIR / "data" / "videos"

CAMERAS = {
    "CAM1": {
        "video": "CAM 1.mp4",
        "type": "ENTRY"
    },
    "CAM2": {
        "video": "CAM 2.mp4",
        "type": "FLOOR"
    },
    "CAM3": {
        "video": "CAM 3.mp4",
        "type": "BILLING"
    },
    "CAM4": {
        "video": "CAM 4.mp4",
        "type": "FLOOR"
    },
    "CAM5": {
        "video": "CAM 5.mp4",
        "type": "ENTRY"
    }
}