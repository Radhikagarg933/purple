from config import CAMERAS, VIDEOS_DIR
from video_loader import VideoLoader
from pathlib import Path


def main():

    print("=" * 50)
    print("STORE INTELLIGENCE PIPELINE")
    print("=" * 50)

    for cam_id, cam_info in CAMERAS.items():

        video_file = cam_info["video"]

        video_path = VIDEOS_DIR / video_file

        print(f"\nCamera: {cam_id}")
        print(f"Video: {video_path}")

        if not Path(video_path).exists():

            print(
                f"[ERROR] File not found: {video_path}"
            )

            continue

        try:

            loader = VideoLoader(video_path)

            print(
                f"Resolution: {loader.width} x {loader.height}"
            )

            print(
                f"FPS: {loader.fps}"
            )

            print(
                f"Frames: {loader.total_frames}"
            )

            loader.release()

            print("[SUCCESS] Loaded")

        except Exception as e:

            print(
                f"[ERROR] {e}"
            )


if __name__ == "__main__":
    main()