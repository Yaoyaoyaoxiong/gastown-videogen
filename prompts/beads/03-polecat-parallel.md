# Bead 03: Polecat 并行执行引擎

## 任务

研究 Gas Town 的 Polecat 并行执行机制（`gt sling`、Witness、fan-out 模式），生成一张概念配图和一段视频叙述脚本。

## 研究范围

优先阅读以下资料：

1. **本地代码库**：`/Users/xiaodong/work/github/gastown`
   - `polecat/` 相关目录或 Go 代码
   - `gt sling -h`、`gt polecat -h`、`gt witness -h` 命令帮助

2. **CLI 快速验证**：
   ```bash
   gt polecat list        # 查看当前 polecat 列表
   gt witness status <rig>  # 查看 witness 状态
   gt sling --help          # 查看 sling 用法
   ```

3. **关键命令理解**：
   ```bash
   # 单 bead 派给 rig（自动启动 polecat）
   gt sling <bead-id> <rig-name>

   # 批量并行派发（每个 bead 得到自己的 polecat）
   gt sling <bead-1> <bead-2> <bead-3> <rig-name>

   # 控制并发数（避免资源压力）
   gt sling <bead-1> <bead-2> <rig-name> --max-concurrent 3

   # polecat 完成后收尾
   gt done --cleanup-status clean
   ```

## 核心概念说明（脚本内容参考）

Polecat 是 Gas Town 的并行执行引擎：

- **Polecat**：一次性、离散任务 worker，由 Witness 管理生命周期
- **`gt sling`**：统一派发命令，挂上任务立即执行
- **Fan-out 模式**：多个 bead + 一个 rig = 每个 bead 得到自己的 Polecat（真正并行）
- **Witness**：每个 rig 一个，负责 Polecat 的健康监控、回收、督导
- **`gt done`**：Polecat 专属收尾命令，提交到 merge queue 并转 IDLE

关键隐喻：**Mayor 开枪，Polecat 是子弹，同时射出多颗（fan-out），Witness 是裁判**

## 配图要求

**保存提示词到**：`images/03-prompt.md`
**调用**：`/baoyu-image-gen`（传入 `images/03-prompt.md` 路径）
**输出**：`images/03-polecat-parallel.png`

配图内容设计（电影级概念艺术风格，非 PPT）：
- **主视觉**：3D 透视场景 — 左侧一个发光的机器人市长（Mayor），体型较大，双臂展开向右侧射出 5 条发光的能量轨迹。每条轨迹末端是一个小型干活机器人（Polecat），正在高速飞向各自的目标（任务节点）
- **Witness**：右上方悬浮一个银色的监控塔/瞭望台，用细线连接所有 Polecat，像雷达一样扫描监控
- **动态感**：5 条轨迹同时射出，有速度线和运动模糊，体现 fan-out 并行的爆发力
- **景深**：前景一个 Polecat 机器人的近距离特写（运动中），中景 Mayor 和其他轨迹，远景 Witness 塔
- **运动方向**：从左（Mayor）到右（各 Polecat 目标），强烈的水平运动感
- **配色**：深海军蓝背景（#1E2140），Mayor 金色发光，Polecat 青色（#00A4A6），轨迹渐变蓝→青（#4B72EF → #00A4A6），Witness 银色配蓝紫光晕（#998DF4）

`images/03-prompt.md` 格式：
```markdown
---
type: concept-illustration
style: cinematic-tech
resolution: 1280x720
---

# Content Context
Concept: Polecat — Parallel Task Execution Engine
Summary: Polecats are ephemeral task-executing robots in Gas Town, launched by Mayor via `gt sling`. Multiple polecats fan out simultaneously, each handling one task. Witness monitors their lifecycle and health. This fan-out pattern enables true parallel execution.
Keywords: parallel execution, fan-out, Polecat, gt sling, Witness, ephemeral worker, concurrent, robot

# Visual Design
Theme: Central robot mayor firing parallel task robots (fan-out explosion)
Style: Cinematic concept art, 3D perspective, depth-of-field, dynamic action scene. Designed as a video starting frame for Sora animation.
Composition: Left — a large glowing robot mayor (gold) with arms outstretched, firing 5 energy trails to the right. Each trail ends at a small Polecat robot (teal) flying toward task nodes. Upper right — a silver Witness monitoring tower with scanning lines connecting all Polecats. Foreground — close-up of one Polecat in motion (motion blur). Strong horizontal movement left-to-right.
Color scheme:
  - Background: Deep navy gradient (#1E2140 → #151830)
  - Mayor robot: Gold glow (#FFD700, #F4BFA6 warm halo)
  - Polecat robots: Teal (#00A4A6) with cyan speed trails
  - Energy trails: Gradient #4B72EF → #00A4A6
  - Witness tower: Silver with blue-purple scan lines (#998DF4)
  - Speed effects: Motion blur, velocity lines, particle bursts
  - No logo or brand marks

# Text Elements
Title: 鼬鼠并行引擎
Subtitle: Polecat Fan-out Parallel Execution

# Rendering Notes
Cinematic action scene, NOT a PPT slide. Should look like a still frame from
an explosion of parallel activity. Strong left-to-right motion for Sora to
animate. Speed lines and motion blur convey fan-out energy. Depth layers:
foreground Polecat close-up, mid-ground Mayor and trails, background Witness tower.
Resolution: 1280×720 (16:9).
```

## 视频脚本要求

**输出**：`scripts/03-polecat-parallel.md`

脚本结构（总时长 36 秒，3 个 Scene，每个 Scene 为 Sora 12 秒视频准备）：

```
Scene 1 (0:00-0:12): 展示干活机器人（Polecat）的本质——一次性任务 worker
Scene 2 (0:12-0:24): 演示 gt sling 批量派发，5 个 Polecat 同时从 Mayor 射出（fan-out 爆发）
Scene 3 (0:24-0:36): 展示 Witness 监控塔监控 Polecat 健康，Polecat 完成后 gt done 收尾
```

旁白需要覆盖：
- Polecat 为什么是"一次性"的（隔离、干净、可扩展）
- `gt sling` 如何实现真正的并行（每个 bead 得到独立进程）
- Witness 的监护作用（crash recovery、健康检查）

**旁白文本将传入 Sora 自带语音功能，生成带中文语音解说的视频**

## 完成步骤

1. 研究代码库，整理 Polecat 机制
2. 编写 `images/03-prompt.md`
3. **调用 `/baoyu-image-gen` skill**（完整过程）：
   - 确认 `images/03-prompt.md` 已写好并内容完整
   - 使用 **Skill 工具**，技能名称：`baoyu-image-gen`
   - ARGUMENTS：`--promptfiles images/03-prompt.md --image images/03-polecat-parallel.png --ar 16:9 --quality 2k`
   - 等待执行完毕，将生成的图片保存为 `images/03-polecat-parallel.png`
   - 验证：`ls -lh images/03-polecat-parallel.png`
4. 编写 `scripts/03-polecat-parallel.md`（含 3 个 Scene + Sora Prompt + 中文旁白）
5. **整合 Sora prompt 并保存**：
   - 从脚本提取所有 Scene 的 Sora Prompt + 中文旁白，加统一风格前缀
   - 保存到 `videos/03-sora-prompt.txt`（格式参见 bead-01）
6. **调用 `/sora` skill 生成 12s 视频**（完整过程）：
   - 使用 **Skill 工具**，技能名称：`sora`
   - ARGUMENTS：prompt 从 `videos/03-sora-prompt.txt` 读取，时长 12 秒，分辨率 1280×720，输出 `videos/clip-03.mp4`，启用 Sora 自带语音
   - 等待执行完毕（30~120 秒）
7. **验证视频**：
   ```bash
   ls -lh videos/clip-03.mp4
   ffprobe -v error -show_entries format=duration \
     -of default=noprint_wrappers=1:nokey=1 videos/clip-03.mp4
   ffprobe -v error -select_streams a -show_entries stream=codec_name \
     -of default=noprint_wrappers=1:nokey=1 videos/clip-03.mp4
   ```
8. 提交：
   ```bash
   git add images/03-prompt.md images/03-polecat-parallel.png scripts/03-polecat-parallel.md \
     videos/03-sora-prompt.txt videos/clip-03.mp4
   git commit -m "feat(bead-03): Polecat 并行执行引擎配图、视频脚本和 12s 视频片段"
   ```
9. `bd update <bead-id> --notes "完成。配图: images/03-polecat-parallel.png, 脚本: scripts/03-polecat-parallel.md, 视频: videos/clip-03.mp4"`
10. `gt done --cleanup-status clean`

## 验收标准

- [ ] `images/03-polecat-parallel.png` 存在，1280×720，电影级概念艺术风格
- [ ] `scripts/03-polecat-parallel.md` 存在，含 3 个 Scene 和中文旁白
- [ ] 每个 Scene 有对应的英文 Sora Prompt
- [ ] `videos/clip-03.mp4` 存在，约 12 秒，1280×720，含语音解说音轨
- [ ] 内容准确体现 fan-out 并行和 Witness 监控机制
- [ ] 配图看起来像动画截图，不是 PPT 幻灯片
