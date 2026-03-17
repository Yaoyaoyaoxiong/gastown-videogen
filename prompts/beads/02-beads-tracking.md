# Bead 02: Beads 任务追踪系统

## 任务

研究 Gas Town 的 `bd`（beads）任务追踪系统，生成一张概念配图和一段视频叙述脚本。

## 研究范围

优先阅读以下资料：

1. **本地代码库**：`/Users/xiaodong/work/github/gastown`
   - `beads/` 或 `bd/` 相关目录
   - `bd -h`、`bd create -h`、`bd ready -h` 命令帮助

2. **CLI 快速验证**：
   ```bash
   bd ready --json       # 查看当前待处理工作
   bd show               # 查看 issue 结构
   cat .beads/issues.jsonl | head -5  # 查看 JSONL 格式
   ```

3. **关键命令理解**：
   ```bash
   bd create --title="..." --type=task --priority=2
   bd update <id> --claim
   bd close <id> --reason "Done"
   bd dep add <child> <parent>  # 设置依赖
   ```

## 核心概念说明（脚本内容参考）

Beads（bd）是 Gas Town 的任务追踪核心：

- **bd create**：创建任务（issue），包含标题、描述、优先级、类型
- **bd ready**：查找所有未阻塞、可立即执行的任务
- **bd update --claim**：原子性占领一个任务（防止多个 Polecat 重复领取）
- **bd close**：完成任务，记录原因
- **依赖关系**：`bd dep add` 建立 task 间的依赖，Wave 控制执行顺序
- **Git 同步**：自动同步到 `.beads/issues.jsonl`，随 git 版本控制

关键隐喻：**bd 是 AI 工厂的任务看板（Kanban），但有依赖感知能力**

## 配图要求

**保存提示词到**：`images/02-prompt.md`
**调用**：`/baoyu-image-gen`（传入 `images/02-prompt.md` 路径）
**输出**：`images/02-beads-tracking.png`

配图内容设计（电影级概念艺术风格，非 PPT）：
- **主视觉**：3D 透视场景 — 一个巨大的全息投影任务面板悬浮在空中，上面有三列发光的珠子节点：左列"待领取"（橙色发光珠子）、中列"进行中"（蓝色脉冲珠子）、右列"完成"（绿色稳定珠子）。珠子之间有细细的发光依赖线连接
- **动态元素**：前景一个 Polecat 干活机器人正伸出机械臂抓取一颗橙色珠子（从"待领取"列），动作有运动模糊感。另一个机器人在中列正在处理任务
- **景深**：前景机器人抓取动作（大且清晰），中景全息面板，远景更多机器人排队等待
- **运动方向**：珠子从左到右流动（Ready → In Progress → Done），适合 Sora 动画
- **配色**：深海军蓝背景（#1E2140），待处理珠子橙色发光，进行中蓝色（#4B72EF）脉冲，完成绿色（#00C853），依赖线蓝紫色（#998DF4）

`images/02-prompt.md` 格式：
```markdown
---
type: concept-illustration
style: cinematic-tech
resolution: 1280x720
---

# Content Context
Concept: Beads (bd) — Task Tracking System for AI Agents
Summary: bd is a dependency-aware task tracking system for Gas Town. It manages issues (beads) with priorities, types, and dependency relationships. Agents atomically claim tasks with bd update --claim, preventing duplicate work. All state syncs to git via JSONL.
Keywords: task tracking, Kanban, dependency, beads, atomic claim, Git sync, AI agents, robot

# Visual Design
Theme: Holographic task board with glowing bead nodes and robots
Style: Cinematic concept art, 3D perspective, depth-of-field, dynamic motion feel. Designed as a video starting frame for Sora animation.
Composition: A massive holographic panel floating in mid-air with three columns of glowing beads (Ready/orange, In Progress/blue pulse, Done/green). Foreground — a Polecat robot reaching out to grab an orange bead (motion blur). Mid-ground — the holographic panel. Background — more robots queuing. Dependency lines glow between beads. Flow direction: left to right.
Color scheme:
  - Background: Deep navy gradient (#1E2140 → #151830)
  - Ready beads: Orange glow (#F39C12)
  - In-progress beads: Blue pulse (#4B72EF)
  - Done beads: Green stable (#00C853)
  - Dependency lines: Blue-purple (#998DF4)
  - Robot accents: Teal (#00A4A6)
  - Atmosphere: Holographic shimmer, particle effects
  - No logo or brand marks

# Text Elements
Title: 珠链任务系统
Subtitle: bd — Dependency-Aware Task Tracking

# Rendering Notes
Cinematic concept art, NOT a PPT slide. Should look like a still frame from a
motion graphics animation. Beads flow left-to-right for Sora to animate.
The robot grabbing action suggests dynamic motion. Depth layers: foreground
robot detail, mid-ground holographic panel, background queuing robots.
Resolution: 1280×720 (16:9).
```

## 视频脚本要求

**输出**：`scripts/02-beads-tracking.md`

脚本结构（总时长 36 秒，3 个 Scene，每个 Scene 为 Sora 12 秒视频准备）：

```
Scene 1 (0:00-0:12): 展示全息任务面板，解释 bd 的整体概念
Scene 2 (0:12-0:24): 演示干活机器人（Polecat）原子性领取任务（bd create → bd ready → bd update --claim）
Scene 3 (0:24-0:36): 展示依赖关系（Wave 1 → Wave 2）和 Git 自动同步
```

旁白需要覆盖：
- bd 是什么，为什么需要它
- 原子性占领（`--claim`）如何防止工作重复
- 依赖感知如何控制多 Wave 执行顺序

**旁白文本将传入 Sora 自带语音功能，生成带中文语音解说的视频**

## 完成步骤

1. 研究代码库，整理 bd 的核心功能
2. 编写 `images/02-prompt.md`
3. **调用 `/baoyu-image-gen` skill**（完整过程）：
   - 确认 `images/02-prompt.md` 已写好并内容完整
   - 使用 **Skill 工具**，技能名称：`baoyu-image-gen`
   - ARGUMENTS：`--promptfiles images/02-prompt.md --image images/02-beads-tracking.png --ar 16:9 --quality 2k`
   - 等待执行完毕，将生成的图片保存为 `images/02-beads-tracking.png`
   - 验证：`ls -lh images/02-beads-tracking.png`
4. 编写 `scripts/02-beads-tracking.md`（含 3 个 Scene + Sora Prompt + 中文旁白）
5. **整合 Sora prompt 并保存**：
   - 从脚本提取所有 Scene 的 Sora Prompt + 中文旁白，加统一风格前缀
   - 保存到 `videos/02-sora-prompt.txt`（格式参见 bead-01）
6. **调用 `/sora` skill 生成 12s 视频**（完整过程）：
   - 使用 **Skill 工具**，技能名称：`sora`
   - ARGUMENTS：prompt 从 `videos/02-sora-prompt.txt` 读取，时长 12 秒，分辨率 1280×720，输出 `videos/clip-02.mp4`，启用 Sora 自带语音
   - 等待执行完毕（30~120 秒）
7. **验证视频**：
   ```bash
   ls -lh videos/clip-02.mp4
   ffprobe -v error -show_entries format=duration \
     -of default=noprint_wrappers=1:nokey=1 videos/clip-02.mp4
   ffprobe -v error -select_streams a -show_entries stream=codec_name \
     -of default=noprint_wrappers=1:nokey=1 videos/clip-02.mp4
   ```
8. 提交：
   ```bash
   git add images/02-prompt.md images/02-beads-tracking.png scripts/02-beads-tracking.md \
     videos/02-sora-prompt.txt videos/clip-02.mp4
   git commit -m "feat(bead-02): Beads 任务追踪系统配图、视频脚本和 12s 视频片段"
   ```
9. `bd update <bead-id> --notes "完成。配图: images/02-beads-tracking.png, 脚本: scripts/02-beads-tracking.md, 视频: videos/clip-02.mp4"`
10. `gt done --cleanup-status clean`

## 验收标准

- [ ] `images/02-beads-tracking.png` 存在，1280×720，电影级概念艺术风格
- [ ] `scripts/02-beads-tracking.md` 存在，含 3 个 Scene 和中文旁白
- [ ] 每个 Scene 有对应的英文 Sora Prompt
- [ ] `videos/clip-02.mp4` 存在，约 12 秒，1280×720，含语音解说音轨
- [ ] 内容准确描述 bd 的原子占领和依赖追踪机制
- [ ] 配图看起来像动画截图，不是 PPT 幻灯片
