# Bead 04: Convoy 工作追踪与调度

## 任务

研究 Gas Town 的 Convoy 批量追踪机制（`gt convoy`），生成一张概念配图和一段视频叙述脚本。

## 研究范围

优先阅读以下资料：

1. **本地代码库**：`/Users/xiaodong/work/github/gastown`
   - `convoy/` 相关目录或 Go 代码
   - `gt convoy -h`、`gt feed -h` 命令帮助

2. **CLI 快速验证**：
   ```bash
   gt convoy list         # 查看当前 convoy 列表
   gt convoy status <id>  # 查看某个 convoy 状态
   gt feed                # 查看近期 feed 事件
   ```

3. **关键命令理解**：
   ```bash
   # 创建 convoy 追踪多个 bead
   gt convoy create "Feature X" <bead-1> <bead-2> <bead-3>

   # 查看进度
   gt convoy status <convoy-id>
   gt convoy check

   # 高级：stage 后 launch（先验证再派发）
   gt convoy stage <epic-id>
   gt convoy launch <staged-convoy-id>

   # 完成后关闭
   gt convoy close <convoy-id>
   ```

## 核心概念说明（脚本内容参考）

Convoy 是 Gas Town 的工作批次追踪单元：

- **Convoy**：把多个 bead/issue 绑在一起追踪的逻辑单元，相当于"一个工作批次"
- **自动创建**：`gt sling` 单 issue 时默认自动建 convoy
- **Stage/Launch**：先 stage 验证依赖和 Wave，再 launch 派发 Wave 1
- **`gt feed`**：实时查看所有 convoy 的活动事件流（类似 Twitter/X feed）
- **`gt convoy status`**：查看某个 convoy 中各 bead 的完成进度
- **依赖 Wave**：Wave 1 全部完成 → Wave 2 自动解锁（依赖链由 `bd dep add` 设置）

关键隐喻：**Convoy 是一支车队，Mayor 是调度员，convoy status 是车队 GPS 追踪**

## 配图要求

**保存提示词到**：`images/04-prompt.md`
**调用**：`/baoyu-image-gen`（传入 `images/04-prompt.md` 路径）
**输出**：`images/04-convoy-tracking.png`

配图内容设计（电影级概念艺术风格，非 PPT）：
- **主视觉**：3D 透视场景 — 一条发光的数字化高速公路从左侧远处延伸到右前方。公路上有多辆发光的"运输飞行器"（每辆代表一个 bead），分为两组：Wave 1 的 5 辆并排飞行（蓝色发光，正在前进），Wave 2 的 1 辆在后方等待（橙色虚线轮廓，半透明）
- **调度中心**：左侧远处一个控制塔（机器人调度员/Mayor），发出信号波纹连接所有飞行器
- **进度可视化**：每辆飞行器旁有小型全息进度环（完成/进行中/等待）
- **景深**：前景一辆 Wave 1 飞行器的近距离特写（引擎发光），中景是整个车队，远景是控制塔和公路消失点
- **运动方向**：从左后到右前的透视运动感，适合 Sora 添加飞行动画
- **配色**：深海军蓝背景（#1E2140），进行中飞行器蓝色（#4B72EF）发光，完成的绿色（#00C853），等待的橙色（#F39C12）虚线轮廓

`images/04-prompt.md` 格式：
```markdown
---
type: concept-illustration
style: cinematic-tech
resolution: 1280x720
---

# Content Context
Concept: Convoy — Batch Work Tracking and Scheduling
Summary: Convoy is Gas Town's work batch tracking unit. It groups multiple beads together for coordinated tracking. Mayor creates a convoy and monitors progress via gt convoy status and gt feed. Wave 1 tasks run in parallel; Wave 2 unlocks automatically when all Wave 1 tasks complete.
Keywords: convoy, batch tracking, wave execution, dependency, scheduling, gt convoy, gt feed, fleet

# Visual Design
Theme: Digital highway with a fleet of glowing transport vehicles in two waves
Style: Cinematic concept art, 3D perspective, depth-of-field, dynamic flight scene. Designed as a video starting frame for Sora animation.
Composition: A glowing digital highway stretching from back-left to front-right in perspective. Wave 1: 5 glowing blue transport vehicles flying in formation. Wave 2: 1 vehicle behind with orange dashed outline (waiting). Left background — a control tower (robot dispatcher/Mayor) sending signal ripples. Each vehicle has a small holographic progress ring. Foreground — close-up of one Wave 1 vehicle engine glowing.
Color scheme:
  - Background: Deep navy gradient (#1E2140 → #151830)
  - Highway: Glowing blue lines (#0078D4)
  - Wave 1 vehicles: Blue glow (#4B72EF), green completed (#00C853)
  - Wave 2 vehicle: Orange dashed outline (#F39C12), semi-transparent
  - Control tower: Gold signal ripples (#FFD700)
  - Progress rings: Teal (#00A4A6)
  - Atmosphere: Speed particles, perspective depth
  - No logo or brand marks

# Text Elements
Title: 车队批量调度
Subtitle: Convoy — Wave Tracking & Scheduling

# Rendering Notes
Cinematic flight scene, NOT a PPT slide. Should look like a still frame from
a sci-fi convoy animation. Strong perspective depth from back-left to front-right
for Sora to animate as forward motion. Depth layers: foreground vehicle close-up,
mid-ground formation fleet, background control tower. Resolution: 1280×720 (16:9).
```

## 视频脚本要求

**输出**：`scripts/04-convoy-tracking.md`

脚本结构（总时长 36 秒，3 个 Scene，每个 Scene 为 Sora 12 秒视频准备）：

```
Scene 1 (0:00-0:12): 展示 Convoy 车队在数字公路上飞行，解释 Convoy 是什么
Scene 2 (0:12-0:24): 控制塔（Mayor）发出信号，实时追踪 Wave 1 各飞行器进度
Scene 3 (0:24-0:36): Wave 1 全部完成（变绿），Wave 2 飞行器自动启动（橙色→蓝色），依赖链解锁
```

旁白需要覆盖：
- Convoy 与单个 bead 的区别（批次 vs 个体）
- `gt feed` 如何提供实时事件流
- Wave 依赖链如何自动推进工作流

**旁白文本将传入 Sora 自带语音功能，生成带中文语音解说的视频**

## 完成步骤

1. 研究代码库，整理 Convoy 机制
2. 编写 `images/04-prompt.md`
3. **调用 `/baoyu-image-gen` skill**（完整过程）：
   - 确认 `images/04-prompt.md` 已写好并内容完整
   - 使用 **Skill 工具**，技能名称：`baoyu-image-gen`
   - ARGUMENTS：`--promptfiles images/04-prompt.md --image images/04-convoy-tracking.png --ar 16:9 --quality 2k`
   - 等待执行完毕，将生成的图片保存为 `images/04-convoy-tracking.png`
   - 验证：`ls -lh images/04-convoy-tracking.png`
4. 编写 `scripts/04-convoy-tracking.md`（含 3 个 Scene + Sora Prompt + 中文旁白）
5. **整合 Sora prompt 并保存**：
   - 从脚本提取所有 Scene 的 Sora Prompt + 中文旁白，加统一风格前缀
   - 保存到 `videos/04-sora-prompt.txt`（格式参见 bead-01）
6. **调用 `/sora` skill 生成 12s 视频**（完整过程）：
   - 使用 **Skill 工具**，技能名称：`sora`
   - ARGUMENTS：prompt 从 `videos/04-sora-prompt.txt` 读取，时长 12 秒，分辨率 1280×720，输出 `videos/clip-04.mp4`，启用 Sora 自带语音
   - 等待执行完毕（30~120 秒）
7. **验证视频**：
   ```bash
   ls -lh videos/clip-04.mp4
   ffprobe -v error -show_entries format=duration \
     -of default=noprint_wrappers=1:nokey=1 videos/clip-04.mp4
   ffprobe -v error -select_streams a -show_entries stream=codec_name \
     -of default=noprint_wrappers=1:nokey=1 videos/clip-04.mp4
   ```
8. 提交：
   ```bash
   git add images/04-prompt.md images/04-convoy-tracking.png scripts/04-convoy-tracking.md \
     videos/04-sora-prompt.txt videos/clip-04.mp4
   git commit -m "feat(bead-04): Convoy 工作追踪与调度配图、视频脚本和 12s 视频片段"
   ```
9. `bd update <bead-id> --notes "完成。配图: images/04-convoy-tracking.png, 脚本: scripts/04-convoy-tracking.md, 视频: videos/clip-04.mp4"`
10. `gt done --cleanup-status clean`

## 验收标准

- [ ] `images/04-convoy-tracking.png` 存在，1280×720，电影级概念艺术风格
- [ ] `scripts/04-convoy-tracking.md` 存在，含 3 个 Scene 和中文旁白
- [ ] 每个 Scene 有对应的英文 Sora Prompt
- [ ] `videos/clip-04.mp4` 存在，约 12 秒，1280×720，含语音解说音轨
- [ ] 内容准确体现 Wave 依赖链和 convoy status 追踪机制
- [ ] 配图看起来像动画截图，不是 PPT 幻灯片
