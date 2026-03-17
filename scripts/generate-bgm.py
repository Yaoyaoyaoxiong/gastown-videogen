"""Generate a 60-second ambient electronic BGM using Python audio synthesis."""

import struct
import wave
from pathlib import Path
import math
import random

SAMPLE_RATE = 44100
DURATION = 65  # slightly longer than 60s for fade-out buffer
CHANNELS = 2
OUTPUT_PATH = Path(__file__).parent.parent / "audio" / "bgm.wav"


def generate_sine(freq, duration, sample_rate, amplitude=0.3):
    """Generate a sine wave."""
    samples = []
    for i in range(int(duration * sample_rate)):
        t = i / sample_rate
        samples.append(amplitude * math.sin(2 * math.pi * freq * t))
    return samples


def generate_pad(freq, duration, sample_rate, amplitude=0.15):
    """Generate a soft pad sound with slight detuning for width."""
    samples = []
    detune = 0.003  # slight detune for chorus effect
    for i in range(int(duration * sample_rate)):
        t = i / sample_rate
        # Main tone + detuned copies for richness
        val = (
            amplitude * 0.4 * math.sin(2 * math.pi * freq * t)
            + amplitude * 0.3 * math.sin(2 * math.pi * freq * (1 + detune) * t)
            + amplitude * 0.3 * math.sin(2 * math.pi * freq * (1 - detune) * t)
            # Add soft octave
            + amplitude * 0.15 * math.sin(2 * math.pi * freq * 2 * t)
            # Sub bass
            + amplitude * 0.1 * math.sin(2 * math.pi * freq * 0.5 * t)
        )
        samples.append(val)
    return samples


def apply_envelope(samples, attack=2.0, release=3.0, sample_rate=44100):
    """Apply attack/release envelope."""
    result = list(samples)
    attack_samples = int(attack * sample_rate)
    release_samples = int(release * sample_rate)
    total = len(result)

    for i in range(min(attack_samples, total)):
        result[i] *= i / attack_samples

    for i in range(min(release_samples, total)):
        idx = total - 1 - i
        if idx >= 0:
            result[idx] *= i / release_samples

    return result


def low_pass_filter(samples, cutoff_ratio=0.1):
    """Simple single-pole low-pass filter for warmth."""
    alpha = cutoff_ratio
    filtered = [samples[0]]
    for i in range(1, len(samples)):
        filtered.append(filtered[-1] + alpha * (samples[i] - filtered[-1]))
    return filtered


def mix_tracks(tracks):
    """Mix multiple tracks together."""
    max_len = max(len(t) for t in tracks)
    result = [0.0] * max_len
    for track in tracks:
        for i in range(len(track)):
            result[i] += track[i]
    return result


def normalize(samples, peak=0.85):
    """Normalize audio to peak level."""
    max_val = max(abs(s) for s in samples)
    if max_val == 0:
        return samples
    factor = peak / max_val
    return [s * factor for s in samples]


def add_stereo_width(mono_samples, width=0.3):
    """Create stereo from mono with slight delay for width."""
    delay_samples = int(0.015 * SAMPLE_RATE)  # 15ms delay
    left = list(mono_samples)
    right = [0.0] * delay_samples + list(mono_samples)
    right = right[: len(left)]

    # Mix with width control
    stereo_l = []
    stereo_r = []
    for i in range(len(left)):
        r = right[i] if i < len(right) else 0.0
        stereo_l.append(left[i] * (1 - width * 0.5) + r * width * 0.5)
        stereo_r.append(r * (1 - width * 0.5) + left[i] * width * 0.5)

    return stereo_l, stereo_r


def main():
    print("Generating 60-second ambient electronic BGM...")
    total_samples = DURATION * SAMPLE_RATE

    # Chord progression: Am - F - C - G (sci-fi ambient feel)
    # Each chord lasts ~15 seconds for a 60-second loop
    chord_freqs = [
        (220.0, 261.63, 329.63),   # Am (A3, C4, E4)
        (174.61, 220.0, 261.63),   # F (F3, A3, C4)
        (130.81, 164.81, 196.0),   # C (C3, E3, G3)
        (196.0, 246.94, 293.66),   # G (G3, B3, D4)
    ]

    chord_duration = 15.0  # seconds per chord
    all_samples = []

    for chord_idx, freqs in enumerate(chord_freqs):
        print(f"  Generating chord {chord_idx + 1}/4...")
        chord_samples = [0.0] * int(chord_duration * SAMPLE_RATE)

        for freq in freqs:
            pad = generate_pad(freq, chord_duration, SAMPLE_RATE, amplitude=0.12)
            pad = apply_envelope(pad, attack=2.0, release=2.5, sample_rate=SAMPLE_RATE)
            pad = low_pass_filter(pad, cutoff_ratio=0.05)
            for i in range(len(pad)):
                chord_samples[i] += pad[i]

        # Add subtle high-frequency shimmer
        shimmer_freq = freqs[2] * 2  # octave above top note
        shimmer = generate_sine(shimmer_freq, chord_duration, SAMPLE_RATE, amplitude=0.02)
        shimmer = apply_envelope(shimmer, attack=3.0, release=2.0, sample_rate=SAMPLE_RATE)
        for i in range(len(shimmer)):
            if i < len(chord_samples):
                chord_samples[i] += shimmer[i]

        all_samples.extend(chord_samples)

    # Trim or pad to exact duration
    all_samples = all_samples[:total_samples]
    while len(all_samples) < total_samples:
        all_samples.append(0.0)

    # Apply overall envelope (fade in/out)
    all_samples = apply_envelope(all_samples, attack=3.0, release=5.0, sample_rate=SAMPLE_RATE)

    # Normalize
    all_samples = normalize(all_samples, peak=0.7)

    # Apply warmth filter
    all_samples = low_pass_filter(all_samples, cutoff_ratio=0.15)

    # Create stereo
    left, right = add_stereo_width(all_samples, width=0.4)

    # Normalize stereo channels
    max_val = max(max(abs(s) for s in left), max(abs(s) for s in right))
    if max_val > 0:
        factor = 0.8 / max_val
        left = [s * factor for s in left]
        right = [s * factor for s in right]

    # Write WAV file
    print(f"  Writing to {OUTPUT_PATH}...")
    OUTPUT_PATH.parent.mkdir(exist_ok=True)

    with wave.open(str(OUTPUT_PATH), "w") as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(2)  # 16-bit
        wf.setframerate(SAMPLE_RATE)

        for i in range(len(left)):
            l_val = max(-1.0, min(1.0, left[i]))
            r_val = max(-1.0, min(1.0, right[i] if i < len(right) else 0.0))
            wf.writeframes(struct.pack("<hh",
                int(l_val * 32767),
                int(r_val * 32767)
            ))

    print(f"  Done! File size: {OUTPUT_PATH.stat().st_size} bytes")
    print(f"  Duration: {DURATION} seconds")

    # Convert to MP3 using ffmpeg
    mp3_path = OUTPUT_PATH.with_suffix(".mp3")
    import subprocess
    subprocess.run([
        "ffmpeg", "-y", "-i", str(OUTPUT_PATH),
        "-codec:a", "libmp3lame", "-b:a", "192k",
        str(mp3_path)
    ], check=True, capture_output=True)
    print(f"  MP3: {mp3_path} ({mp3_path.stat().st_size} bytes)")

    # Clean up WAV
    OUTPUT_PATH.unlink()
    print("BGM generation complete!")


if __name__ == "__main__":
    main()
