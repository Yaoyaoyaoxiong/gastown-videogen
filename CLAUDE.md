# CLAUDE.md — JoinAI Swarm Factory 工作流程介绍视频

## 项目目的

本仓库是第三个 Gas Town 多智能体示例：通过 5 个并行 Polecat 分别研究 Gastown 的核心概念，生成对应的配图、视频叙述脚本和 12s Sora 视频片段，再由拼接 Polecat 用 ffmpeg 合成最终视频，最后由字幕 Polecat 烧录硬字幕。

**产品名称**：JoinAI Swarm Factory（聚智）

---

## 智能体工作指南

### 语言要求（最高优先级）

所有脚本旁白、配图标题必须使用**中文**。英文技术术语用括号标注，如"编排器（Orchestrator）"。

---

### 输出位置

| Bead # | 主题 | 配图 | 视频脚本 | 视频片段 |
|--------|------|------|---------|---------|
| 01 | Town/Rig/Crew/Mayor 架构 | `images/01-town-architecture.png` | `scripts/01-town-architecture.md` | `videos/clip-01.mp4` |
| 02 | Beads 任务追踪 | `images/02-beads-tracking.png` | `scripts/02-beads-tracking.md` | `videos/clip-02.mp4` |
| 03 | Polecat 并行执行引擎 | `images/03-polecat-parallel.png` | `scripts/03-polecat-parallel.md` | `videos/clip-03.mp4` |
| 04 | Convoy 工作追踪 | `images/04-convoy-tracking.png` | `scripts/04-convoy-tracking.md` | `videos/clip-04.mp4` |
| 05 | Refinery 合并队列 | `images/05-refinery-merge.png` | `scripts/05-refinery-merge.md` | `videos/clip-05.mp4` |
| 06 | 视频拼接 | — | — | `videos/final-joinai-intro.mp4` |
| 07 | 硬字幕烧录 | — | — | `videos/final-joinai-intro-subtitled.mp4` |

---

### 配图标准（Wave 1 Polecat 执行）

每个 Polecat 必须：

1. 根据研究内容编写一个 `/baoyu-image-gen` 提示词文档，保存到 `images/0N-prompt.md`
2. **调用 `/baoyu-image-gen` skill**（完整调用过程）：
   - 使用 Skill 工具，技能名称填写 `baoyu-image-gen`
   - 在 ARGUMENTS 中传入：`--promptfiles images/0N-prompt.md --image images/0N-topic.png --ar 16:9 --quality 2k`
     - `--promptfiles`：提示词文件路径
     - `--image`：输出图片路径（必需）
     - `--ar 16:9`：宽高比（对应 1280×720 分辨率）
     - `--quality 2k`：高质量输出
   - 等待 skill 执行完毕，获取返回的图片
   - 图片保存到 `images/0N-topic.png`
3. 验证图片已生成：`ls -lh images/0N-topic.png`

**配图风格要求**（融合 `/chinamobile-pptx` + `/juzhi-brand` 配色，视频帧风格）：
- 画面风格：电影级概念艺术，3D 等距/透视构图，有景深和动态感，适合 Sora 转为视频动画
- 分辨率：1280×720（16:9），作为 12 秒视频的起始帧/关键帧
- 构图原则：
  - 画面要有运动方向感（从左到右、从中心向外扩散等），方便 Sora 添加动画
  - 避免大面积文字覆盖（标题简短，放在安全区域）
  - 留出画面呼吸空间，不要像 PPT 一样密集排版
  - 元素之间有层次和景深（前景、中景、远景）
- 配色方案：
  - 背景：深海军蓝渐变（#1E2140 → #151830）
  - 主高亮：#4B72EF（聚智蓝）、#0078D4（移动蓝）
  - 辅助色：#00A4A6（青绿）、#00C853（活力绿）
  - 发光效果：#998DF4（蓝紫光晕）、#F4BFA6（暖光粒子）
  - 文字：白色标题，#B0C4DE 副标题
  - 光效装饰：流动的光线轨迹、粒子效果、柔和的辐射光晕
- 包含：简短的中文主标题 + 英文副标题
- 必须体现该 Gastown 概念的核心视觉隐喻（见各 bead 说明）
- 视觉角色：Mayor=发光的机器人市长、Rig=科技感仓库、Crew=人类工作区、Polecat=干活的机器人
- **不添加 logo 或品牌标记**
- **重要**：配图是视频的起始帧，需要看起来像动画截图，不是 PPT 幻灯片

**`/baoyu-image-gen` 提示词文档格式**（`images/0N-prompt.md`）：

```markdown
---
type: concept-illustration
style: cinematic-tech
resolution: 1280x720
---

# Content Context
Concept: [概念名称]
Summary: [2-3句英文描述这个概念的核心功能和价值]
Keywords: [关键词列表]

# Visual Design
Theme: [视觉主题]
Style: Cinematic concept art, 3D isometric/perspective, with depth-of-field and dynamic motion feel. Designed as a video starting frame for Sora animation.
Composition: [构图描述 — 有明确的运动方向感，元素分前中远景层次，留出画面呼吸空间，融入具象角色]
Color scheme:
  - Background: Deep navy gradient (#1E2140 → #151830)
  - Primary highlight: #4B72EF (JuZhi blue), #0078D4 (accent blue)
  - Secondary: #00A4A6 (teal), #00C853 (vibrant green)
  - Glow effects: #998DF4 (blue-purple glow), #F4BFA6 (warm particle accents)
  - Text: White titles (minimal, in safe area), #B0C4DE subtitles
  - Lighting: Flowing light trails, particle effects, soft radial glows
  - No logo or brand marks

# Text Elements
Title: [中文主标题（简短，放在画面安全区域）]
Subtitle: [English subtitle]

# Rendering Notes
Cinematic concept art style, NOT a PPT slide. Should look like a still frame from
a motion graphics animation. Elements should suggest movement direction (left-to-right,
center-outward, etc.) for Sora to animate. Depth layers: foreground details,
mid-ground main subject, background atmosphere. Characters: Mayor as a glowing
robot mayor, Rig as tech warehouses, Crew as human workstations, Polecat as
task-executing robots. Resolution: 1280×720 (16:9).
```

---

### 视频脚本格式（Wave 1 Polecat 执行）

每个脚本保存至 `scripts/0N-topic.md`，格式如下：

```markdown
# [主题名称] — 视频脚本

**总时长**：36 秒
**目标受众**：AI 开发者、工程团队

## 场景列表

### Scene 1 (0:00 - 0:XX)
**画面**：[描述画面内容，提供给 Sora 的视觉指引]
**旁白**：[中文旁白文案 — 将作为 Sora 语音解说的输入]
**Sora Prompt**：[该场景的英文 Sora 视频生成提示词]

### Scene 2 (0:XX - 0:XX)
...
```

- 每个脚本 3 个 Scene
- 总时长 **36 秒**（3 个 Scene × 12 秒/Scene = 36 秒旁白）
- **3 个 Scene 整合为一个 Sora prompt，一次调用生成 1 个 12 秒视频片段**
- Sora Prompt 必须是具体的视觉描述（英文），包括风格、动效、颜色
- **旁白文本**将传入 Sora 自带语音功能，生成带中文语音解说的视频

---

### 视频生成标准（Wave 1 各 Polecat 执行）

每个 Wave 1 Polecat 在生成配图和脚本之后，还需调用 `/sora` 生成 12s 视频片段：

1. 从脚本提取所有 Scene 的 `Sora Prompt` 和中文旁白
2. 整合 Sora prompt（含统一风格前缀 + 中文旁白），保存到 `videos/0N-sora-prompt.txt`
3. **调用 `/sora` skill**：
   - 使用 Skill 工具，技能名称填写 `sora`
   - ARGUMENTS：prompt 从 `videos/0N-sora-prompt.txt` 读取，时长 12 秒，分辨率 1280×720，输出 `videos/clip-0N.mp4`，启用 Sora 自带语音
4. 验证视频（时长约 12 秒、含音轨）

详细步骤见各 bead 说明（beads 01-05）。

---

### 视频拼接标准（Wave 2 Polecat 执行）

Wave 2 Polecat（bead 06）仅执行 ffmpeg 拼接，不再调用 Sora：

```bash
cd videos/
printf "file 'clip-01.mp4'\nfile 'clip-02.mp4'\nfile 'clip-03.mp4'\nfile 'clip-04.mp4'\nfile 'clip-05.mp4'\n" > filelist.txt
ffmpeg -f concat -safe 0 -i filelist.txt -c copy final-joinai-intro.mp4
```

---

### 字幕烧录标准（Wave 3 Polecat 执行）

Wave 3 Polecat（bead 07）从 5 个脚本提取中文旁白，生成 SRT 字幕，ffmpeg 烧录硬字幕：

```bash
ffmpeg -i videos/final-joinai-intro.mp4 \
  -vf "subtitles=subtitles/narration.srt:force_style='FontSize=24,FontName=PingFang SC,PrimaryColour=&HFFFFFF,OutlineColour=&H000000,Outline=2,MarginV=30'" \
  -c:a copy \
  videos/final-joinai-intro-subtitled.mp4
```

输出：`subtitles/narration.srt` + `videos/final-joinai-intro-subtitled.mp4`

---

### 研究方法

每个 Wave 1 Polecat 研究时应优先：

1. **本地代码库**（`/Users/xiaodong/work/github/gastown`）：阅读相关 Go 代码和文档
2. **Web 搜索**：搜索 `steveyegge/gastown` 相关资料（GitHub, 博客文章）
3. **gt CLI help**：运行 `gt [command] -h` 获取命令说明

每个 Polecat **不需要**联网搜索全部内容，只需关注自己负责的那个概念。

---

### 完成协议

每个 Polecat 完成后**必须**执行以下步骤：

1. 验证输出文件存在（配图 + 脚本 + 视频片段）
2. 提交：
   ```bash
   git add images/0N-*.png images/0N-prompt.md scripts/0N-*.md \
     videos/0N-sora-prompt.txt videos/clip-0N.mp4
   git commit -m "feat(bead-0N): [主题] 配图、视频脚本和 12s 视频片段"
   ```
3. 更新 bead 关键发现：`bd update <bead-id> --notes "完成。配图: images/0N-*.png, 脚本: scripts/0N-*.md, 视频: videos/clip-0N.mp4"`
4. 结束：`gt done --cleanup-status clean`

Wave 2 Polecat（bead 06）：
```bash
git add videos/filelist.txt videos/final-joinai-intro.mp4
git commit -m "feat(bead-06): ffmpeg 拼接 5 个视频片段"
```

Wave 3 Polecat（bead 07）：
```bash
git add subtitles/narration.srt videos/final-joinai-intro-subtitled.mp4
git commit -m "feat(bead-07): SRT 字幕生成 + ffmpeg 烧录硬字幕"
```
