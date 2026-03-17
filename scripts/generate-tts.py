"""Generate TTS narration for all 5 video clips using edge-tts (Microsoft Neural TTS)."""

import asyncio
from pathlib import Path

import edge_tts

# All narrations use product name: 聚智蜂群工厂
NARRATIONS = {
    "01": "欢迎来到聚智蜂群工厂。Mayor 是全局协调者，将任务分发到各 Rig 仓库，由 Polecat 机器人执行。",
    "02": "Beads 是智能任务看板。每个任务是一颗珠子，Polecat 原子性领取避免重复，完成后自动解锁下一波。",
    "03": "Polecat 是一次性任务工人。Mayor 通过 gt sling 同时发射多个 Polecat，实现真正的并行执行，Witness 负责监控。",
    "04": "Convoy 是批量任务追踪机制。Mayor 创建车队，实时监控每个任务进度。前序任务完成后，后续自动解锁启动。",
    "05": "工作完成后，代码进入 Refinery 合并队列。串行处理、质量检查、冲突解决，确保每份代码安全合入主干。",
}

# TTS config - warm Chinese female voice
TTS_VOICE = "zh-CN-XiaoxiaoNeural"  # Microsoft's flagship warm female voice
TTS_RATE = "-5%"  # Slightly slower for clarity


async def generate_narration(clip_id: str, text: str, out_path: Path) -> None:
    """Generate a single narration clip."""
    print(f"Generating narration {clip_id}: {text[:30]}...")
    communicate = edge_tts.Communicate(text, TTS_VOICE, rate=TTS_RATE)
    await communicate.save(str(out_path))
    print(f"  -> Saved to {out_path} ({out_path.stat().st_size} bytes)")


async def main() -> None:
    audio_dir = Path(__file__).parent.parent / "audio"
    audio_dir.mkdir(exist_ok=True)

    tasks = [
        generate_narration(clip_id, text, audio_dir / f"narration-{clip_id}.mp3")
        for clip_id, text in NARRATIONS.items()
    ]
    await asyncio.gather(*tasks)

    print("\nAll narrations generated successfully!")


if __name__ == "__main__":
    asyncio.run(main())
