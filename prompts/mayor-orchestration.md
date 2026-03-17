# Mayor Orchestration Prompt: JoinAI Swarm Factory 工作流程介绍视频

> Usage: 在 `~/gt` 目录下运行 `gt mayor attach`，然后粘贴此提示词

## ⚠ 语言要求（最高优先级）

**所有视频脚本旁白、配图标题必须使用中文。** 英文技术术语用括号标注，如"编排器（Orchestrator）"。Sora 视频生成提示词使用英文。

## Mission

创建并编排一个多智能体并行内容创作项目，为 JoinAI Swarm Factory（聚智 Gastown）制作工作流程介绍视频。展示 Gas Town 的跨模态并行能力：

- **Wave 1**（5 并行 Polecat）：每个 Polecat 研究一个 Gastown 核心概念 → 生成配图（`/baoyu-image-gen`）+ 撰写视频叙述脚本 + 调用 `/sora` 生成 12s 视频片段（含语音解说）
- **Wave 2**（1 拼接 Polecat）：`ffmpeg` 拼接 5 个视频片段为最终介绍视频（约 60 秒）
- **Wave 3**（1 字幕 Polecat）：生成 SRT 字幕 + `ffmpeg` 烧录硬字幕到最终视频

## 关键目录

| 目录 | 说明 |
|------|------|
| `~/gt` | Town 根目录，Mayor 运行位置 |
| `/Users/xiaodong/work/offices/gastown/testcase/workflow-intro-video` | 项目源目录（所有模板文件已就位） |
| `~/gt/workflow_intro/mayor/rig/` | Rig 创建后的规范克隆目录（自动生成） |
| `/Users/xiaodong/work/github/gastown` | Gastown 源代码库（Polecat 研究用） |

项目源目录已包含以下文件，**无需重新创建**：
- `CLAUDE.md` — 项目规范（配图、脚本、视频格式及完成协议）
- `AGENTS.md` — bd beads 工作流说明
- `README.md` — 项目说明
- `.gitignore`
- `prompts/mayor-orchestration.md` — 本编排指令
- `prompts/beads/01~07-*.md` — 7 个任务提示词

---

## Skill 使用参考

### `/baoyu-image-gen`（Wave 1 使用）

AI 图片生成 skill，支持多个提供商（Google、OpenAI、DashScope、Replicate）。

**完整调用过程：**
1. 编写提示词文件 `images/0N-prompt.md`（格式见各 bead 说明）
2. 使用 **Skill 工具**，技能名称：`baoyu-image-gen`
3. ARGUMENTS：`--promptfiles images/0N-prompt.md --image images/0N-topic.png --ar 16:9 --quality 2k`
   - `--promptfiles`：提示词文件路径
   - `--image`：输出图片路径（必需）
   - `--ar 16:9`：宽高比（对应 1280×720 分辨率）
   - `--quality 2k`：高质量输出
4. 等待执行完毕，图片保存到指定路径
5. 验证：`ls -lh images/0N-topic.png`

### `/sora`（Wave 1 使用）

Sora 视频生成 skill，生成带语音解说的视频片段。

**完整调用过程：**
1. 将 Sora prompt 保存到 `videos/0N-sora-prompt.txt`
   - 包含视觉描述（英文）
   - 附加中文旁白文本，Sora 自带语音功能会生成语音解说
2. 使用 **Skill 工具**，技能名称：`sora`
3. ARGUMENTS：传入以下内容
   - prompt：从 `videos/0N-sora-prompt.txt` 读取的完整提示词
   - 时长：12 秒
   - 分辨率：1280×720
   - 输出：`videos/clip-0N.mp4`
   - 语音：启用 Sora 自带语音，传入中文旁白文本
4. 等待执行完毕（视频生成通常需要 30~120 秒）
5. 验证：
   ```bash
   ls -lh videos/clip-0N.mp4
   ffprobe -v error -show_entries format=duration \
     -of default=noprint_wrappers=1:nokey=1 videos/clip-0N.mp4
   # 检查含音轨
   ffprobe -v error -select_streams a -show_entries stream=codec_name \
     -of default=noprint_wrappers=1:nokey=1 videos/clip-0N.mp4
   ```

---

## Phase 0: 初始化仓库

```bash
# 项目源目录（所有模板文件已就位）
PROJ_DIR="/Users/xiaodong/work/offices/gastown/testcase/workflow-intro-video"
cd "$PROJ_DIR"

# 初始化 Git（如尚未初始化）
git init && git checkout -b main

# 验证关键文件存在
ls CLAUDE.md AGENTS.md README.md
ls prompts/beads/01-town-architecture.md
ls prompts/beads/06-video-synthesis.md
ls prompts/beads/07-subtitles.md

# 确保输出目录有占位符
touch scripts/.gitkeep images/.gitkeep videos/.gitkeep subtitles/.gitkeep

# 初始化 beads（前缀: wiv = workflow-intro-video）
bd init
# 设置前缀: "wiv"

# 初始提交
git add -A
git commit -m "feat: 初始化 JoinAI Swarm Factory 工作流程介绍视频项目"

# 创建 GitHub 仓库并推送
gh repo create workflow-intro-video --private --source=. --push
```

---

## Phase 1: 添加 Rig

```bash
# 回到 Town 根目录
cd ~/gt

# 添加 rig（使用 Phase 0 中 gh repo create 返回的 URL）
gt rig add workflow-intro <github-url-from-phase-0>

# 验证 rig 目录已创建
ls ~/gt/workflow_intro/mayor/rig/CLAUDE.md
```

---

## Phase 2: 创建 7 个 Beads

```bash
# 进入 rig 的规范克隆目录（bd 在此目录下操作）
cd ~/gt/workflow_intro/mayor/rig
```

### Wave 1 Beads（5 个并行任务，优先级 2）

```bash
# Bead 01: Town/Rig/Crew/Mayor 架构
bd create --title="Town/Rig/Crew/Mayor 架构配图、视频脚本和 12s 视频" \
  --type=task --priority=2 \
  -d "$(cat prompts/beads/01-town-architecture.md)"

# Bead 02: Beads 任务追踪
bd create --title="Beads 任务追踪系统配图、视频脚本和 12s 视频" \
  --type=task --priority=2 \
  -d "$(cat prompts/beads/02-beads-tracking.md)"

# Bead 03: Polecat 并行执行引擎
bd create --title="Polecat 并行执行引擎配图、视频脚本和 12s 视频" \
  --type=task --priority=2 \
  -d "$(cat prompts/beads/03-polecat-parallel.md)"

# Bead 04: Convoy 工作追踪
bd create --title="Convoy 工作追踪与调度配图、视频脚本和 12s 视频" \
  --type=task --priority=2 \
  -d "$(cat prompts/beads/04-convoy-tracking.md)"

# Bead 05: Refinery 合并队列
bd create --title="Refinery 合并队列配图、视频脚本和 12s 视频" \
  --type=task --priority=2 \
  -d "$(cat prompts/beads/05-refinery-merge.md)"
```

### Wave 2 Bead（视频拼接，依赖 Wave 1 全部完成）

```bash
# Bead 06: 视频拼接
bd create --title="ffmpeg 拼接 5 个视频片段" \
  --type=task --priority=1 \
  -d "$(cat prompts/beads/06-video-synthesis.md)"

# 设置依赖: Bead 06 依赖 Beads 01-05
bd dep add <bead-06-id> <bead-01-id>
bd dep add <bead-06-id> <bead-02-id>
bd dep add <bead-06-id> <bead-03-id>
bd dep add <bead-06-id> <bead-04-id>
bd dep add <bead-06-id> <bead-05-id>
```

### Wave 3 Bead（硬字幕烧录，依赖 Wave 2 完成）

```bash
# Bead 07: 硬字幕烧录
bd create --title="SRT 字幕生成 + ffmpeg 烧录硬字幕" \
  --type=task --priority=1 \
  -d "$(cat prompts/beads/07-subtitles.md)"

# 设置依赖: Bead 07 依赖 Bead 06
bd dep add <bead-07-id> <bead-06-id>
```

---

## Phase 3: 创建 Convoy 并派发 Wave 1

```bash
# 回到 Town 根目录执行 gt 命令
cd ~/gt

# 创建 convoy 追踪全部 7 个 beads
gt convoy create "JoinAI Swarm Factory 工作流程介绍视频" \
  <bead-01> <bead-02> <bead-03> <bead-04> <bead-05> <bead-06> <bead-07>

# Wave 1: 同时派发 5 个 Polecat（并行，每个生成配图+脚本+12s视频）
gt sling <bead-01> <bead-02> <bead-03> <bead-04> <bead-05> workflow-intro
```

---

## Phase 4: 监控进度并逐波派发

```bash
# 从 ~/gt 监控进度
cd ~/gt
gt convoy status <convoy-id>
gt feed

# === Wave 1 完成后 ===
# 当全部 5 个 Wave 1 bead 完成后，Bead 06 变为 ready
bd ready  # 应显示 bead-06

# Wave 2: 派发视频拼接 Polecat
gt sling <bead-06> workflow-intro

# === Wave 2 完成后 ===
# Bead 06 完成后，Bead 07 变为 ready
bd ready  # 应显示 bead-07

# Wave 3: 派发字幕烧录 Polecat
gt sling <bead-07> workflow-intro
```

---

## Phase 5: 验收

```bash
# 在 rig 目录下验收
cd ~/gt/workflow_intro/mayor/rig

# 检查 convoy 完成状态
gt convoy status <convoy-id>

# 验证全部输出文件
ls -la images/*.png        # 应有 5 张配图
ls -la scripts/*.md        # 应有 5 个视频脚本
ls -la videos/clip-*.mp4   # 应有 5 个视频片段（含语音）
ls -la videos/final-joinai-intro.mp4           # 拼接视频
ls -la videos/final-joinai-intro-subtitled.mp4 # 字幕视频
ls -la subtitles/narration.srt                  # SRT 字幕文件

# 验证最终字幕视频时长（约 60 秒 = 5 × 12 秒）
ffprobe -v error -show_entries format=duration \
  -of default=noprint_wrappers=1:nokey=1 \
  videos/final-joinai-intro-subtitled.mp4

# 验证视频含音轨（语音解说）
ffprobe -v error -select_streams a -show_entries stream=codec_name \
  -of default=noprint_wrappers=1:nokey=1 videos/final-joinai-intro-subtitled.mp4

# 质量检查:
# - 5 张配图均存在且可查看（1280×720）
# - 5 个脚本均包含中文旁白和 Sora Prompt
# - 5 个视频片段每段约 12 秒，含语音解说
# - 拼接视频约 60 秒，含完整语音解说
# - 字幕视频含清晰的中文硬字幕
# - 所有内容中文为主，英文技术术语有括号注释

# 关闭 convoy
gt convoy close <convoy-id>
```

---

## 关键原则

1. **中文内容**：脚本旁白、配图标题必须使用中文，Sora 提示词使用英文
2. **研究优先**：Polecat 必须先研究 `/Users/xiaodong/work/github/gastown` 代码库，再生成内容
3. **配图规范**：通过 `/baoyu-image-gen` skill 生成，提示词先写入 `images/0N-prompt.md`
   - 风格：电影级概念艺术，3D 等距/透视构图，有景深和动态感（**不是 PPT 幻灯片风格**）
   - 配色参考 `/chinamobile-pptx`（#0078D4 蓝、#00A4A6 青绿）和 `/juzhi-brand`（#4B72EF 主蓝、#373B61 深色、#998DF4 发光）
   - 分辨率 1280×720（16:9），作为 Sora 视频的起始帧/关键帧
   - 构图有运动方向感，留出画面呼吸空间，元素分前中远景层次
   - 视觉角色：Mayor=发光的机器人市长、Rig=科技感仓库、Crew=人类工作区、Polecat=干活的机器人
   - 不添加 logo
4. **视频时长**：每个 Sora 视频片段 **12 秒**，5 段合计约 60 秒
5. **语音解说**：使用 Sora 自带语音功能，将中文旁白传入 Sora 生成带语音的视频
6. **文件隔离**：每个 bead 使用编号前缀（01-*, 02-*），避免 git 冲突
7. **Wave 执行**：Wave 1（5 并行，配图+脚本+Sora视频）→ Wave 2（1 ffmpeg拼接）→ Wave 3（1 ffmpeg字幕烧录）
8. **持久化发现**：每个 Polecat 必须 `bd update <bead-id> --notes "..."` 记录输出文件路径
