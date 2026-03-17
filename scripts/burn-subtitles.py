"""Burn SRT subtitles into video using moviepy."""

import re
from pathlib import Path


def parse_srt(srt_path):
    """Parse SRT file into list of (start_ms, end_ms, text) tuples."""
    content = Path(srt_path).read_text(encoding="utf-8")
    blocks = content.strip().split("\n\n")
    subtitles = []

    for block in blocks:
        lines = block.strip().split("\n")
        if len(lines) < 3:
            continue

        # Parse timestamp line
        time_match = re.match(
            r"(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})",
            lines[1],
        )
        if not time_match:
            continue

        g = time_match.groups()
        start = int(g[0]) * 3600 + int(g[1]) * 60 + int(g[2]) + int(g[3]) / 1000
        end = int(g[4]) * 3600 + int(g[5]) * 60 + int(g[6]) + int(g[7]) / 1000
        text = "\n".join(lines[2:])
        subtitles.append((start, end, text))

    return subtitles


def main():
    from moviepy import VideoFileClip, TextClip, CompositeVideoClip

    project_root = Path(__file__).parent.parent
    video_path = project_root / "videos" / "final-joinai-intro.mp4"
    srt_path = project_root / "subtitles" / "narration.srt"
    output_path = project_root / "videos" / "final-joinai-intro-subtitled.mp4"

    print(f"Loading video: {video_path}")
    video = VideoFileClip(str(video_path))

    print(f"Parsing subtitles: {srt_path}")
    subtitles = parse_srt(srt_path)

    # Create text clips for each subtitle
    text_clips = []
    for start, end, text in subtitles:
        print(f"  Subtitle [{start:.1f}s - {end:.1f}s]: {text[:40]}...")

        txt_clip = (
            TextClip(
                text=text,
                font_size=28,
                color="white",
                font="/System/Library/Fonts/STHeiti Medium.ttc",
                stroke_color="black",
                stroke_width=2,
                method="caption",
                size=(video.w - 100, None),
                text_align="center",
            )
            .with_position(("center", video.h - 80))
            .with_start(start)
            .with_end(end)
        )
        text_clips.append(txt_clip)

    print("Compositing video with subtitles...")
    final = CompositeVideoClip([video, *text_clips])

    print(f"Writing output: {output_path}")
    final.write_videofile(
        str(output_path),
        codec="libx264",
        audio_codec="aac",
        fps=video.fps,
        preset="fast",
        logger=None,
    )

    video.close()
    print("Done!")


if __name__ == "__main__":
    main()
