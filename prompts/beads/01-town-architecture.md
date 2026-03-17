# Bead 01: Town/Rig/Crew/Mayor 架构

## 任务

研究 Gas Town 的四层架构概念（Town → Rig → Crew/Mayor → Polecat），生成一张概念配图和一段视频叙述脚本。

## 研究范围

优先阅读以下资料（按顺序）：

1. **本地代码库**：`/Users/xiaodong/work/github/gastown`
   - `README.md` 或 `docs/` 目录下的架构说明
   - `gt rig -h`、`gt mayor -h`、`gt crew -h` 命令帮助
   - `pkg/town/` 或相关 Go 代码（了解 Town 的核心结构）

2. **CLI 快速验证**：
   ```bash
   gt rig list         # 查看当前 rig 列表
   gt mayor status     # 查看 mayor 状态
   gt crew list        # 查看 crew 列表
   ```

## 核心概念说明（脚本内容参考）

Gas Town 的架构层级：

- **Town（镇）**：`~/gt` 根目录，整个 AI 编排系统的家园
- **Rig（钻机）**：每个项目 = 一个 rig，包含该项目的所有 AI 工作者
- **Mayor（市长）**：人机接口，全局协调者，接收人类指令并分发工作
- **Crew（团队）**：持久开发工作区，保留上下文，适合长期项目
- **Polecat（鼬鼠）**：离散任务 worker，由 Mayor 派发，完成后消亡

关键隐喻：**一座 AI 小镇，Mayor 管理，各 Rig 是不同工厂，Polecat 是工厂工人**

## 配图要求

**保存提示词到**：`images/01-prompt.md`
**调用**：`/baoyu-image-gen`（传入 `images/01-prompt.md` 路径）
**输出**：`images/01-town-architecture.png`

配图内容设计（电影级概念艺术风格，非 PPT）：
- **主视觉**：一座科技感的"AI 小镇"，3D 等距透视。中心是发光的机器人市长（Mayor），体型较大，散发金色光芒。四周是多个科技感仓库建筑（Rig），每个仓库门口有小型干活的机器人（Polecat）进进出出
- **景深层次**：前景一个 Polecat 机器人正在搬运任务卡片（近距离细节），中景是 Mayor 和 Rig 群，远景是整个小镇的轮廓和星空
- **运动方向**：从 Mayor 中心向四周辐射的光线轨迹，暗示任务分发方向，适合 Sora 添加动画
- **配色**：深海军蓝背景（#1E2140），Mayor 金色发光，Rig 蓝色（#4B72EF），Polecat 青色（#00A4A6）小机器人，流动的蓝紫光晕（#998DF4）

`images/01-prompt.md` 格式：
```markdown
---
type: concept-illustration
style: cinematic-tech
resolution: 1280x720
---

# Content Context
Concept: Gas Town Architecture — Town, Rig, Mayor, Polecat
Summary: Gas Town is an AI agent orchestration system with a hierarchical structure. The Town is the root workspace, Rigs are project repositories (warehouses), Mayor is a glowing robot coordinator, Crew provides persistent human workspaces, and Polecats are ephemeral task-executing robots.
Keywords: AI orchestration, multi-agent, hierarchy, Town, Rig, Mayor, Polecat, Gas Town, robot

# Visual Design
Theme: AI smart city with robot mayor at the center
Style: Cinematic concept art, 3D isometric perspective, depth-of-field, dynamic motion feel. Designed as a video starting frame for Sora animation.
Composition: Center — a large glowing robot mayor (gold light), surrounded by tech warehouse buildings (Rigs). Small task-executing robots (Polecats, cyan) move in and out of warehouses. Foreground — close-up Polecat carrying a task card. Background — town skyline and starry sky. Light trails radiate from Mayor outward, suggesting task distribution flow.
Color scheme:
  - Background: Deep navy gradient (#1E2140 → #151830)
  - Mayor robot: Gold glow (#FFD700 core, #F4BFA6 warm halo)
  - Rig warehouses: #4B72EF (JuZhi blue) with #0078D4 accent lighting
  - Polecat robots: #00A4A6 (teal) with cyan glow
  - Light trails: #998DF4 (blue-purple) flowing from center outward
  - Atmosphere: Particle effects, soft radial glows
  - No logo or brand marks

# Text Elements
Title: 聚智小镇架构
Subtitle: Town / Rig / Mayor / Polecat

# Rendering Notes
Cinematic concept art, NOT a PPT slide. Should look like a still frame from a
motion graphics animation. The radial light trails from Mayor suggest outward
motion for Sora to animate. Depth layers: foreground Polecat detail, mid-ground
Mayor and Rigs, background skyline. Resolution: 1280×720 (16:9).
```

## 视频脚本要求

**输出**：`scripts/01-town-architecture.md`

脚本结构（总时长 36 秒，3 个 Scene，每个 Scene 为 Sora 12 秒视频准备）：

```
Scene 1 (0:00-0:12): 从远景推进到 AI 小镇全貌，展示 Gas Town 整体架构
Scene 2 (0:12-0:24): 聚焦机器人市长（Mayor）与仓库（Rig）的关系，Mayor 发出光线分配任务
Scene 3 (0:24-0:36): 展示干活的机器人（Polecat）从 Mayor 接收任务，进入仓库工作
```

旁白需要覆盖：
- Gas Town 是什么，解决什么问题
- 四层架构的职责划分
- Mayor 作为人机接口的作用

**旁白文本将传入 Sora 自带语音功能，生成带中文语音解说的视频**

## 完成步骤

1. 研究代码库和命令，整理关键信息
2. 编写 `images/01-prompt.md`（配图提示词）
3. **调用 `/baoyu-image-gen` skill**（完整过程）：
   - 确认 `images/01-prompt.md` 已写好并内容完整
   - 使用 **Skill 工具**，技能名称：`baoyu-image-gen`
   - ARGUMENTS：`--promptfiles images/01-prompt.md --image images/01-town-architecture.png --ar 16:9 --quality 2k`
   - 等待执行完毕，将生成的图片保存为 `images/01-town-architecture.png`
   - 验证：`ls -lh images/01-town-architecture.png`
4. 编写 `scripts/01-town-architecture.md`（含 3 个 Scene + Sora Prompt + 中文旁白）
5. **整合 Sora prompt 并保存**：
   - 从脚本提取所有 Scene 的 Sora Prompt，拼接为完整视觉描述
   - 在开头加统一风格前缀：
     ```
     Tech visualization video, cinematic concept art style, dark navy blue (#1E2140) background,
     glowing blue-cyan (#4B72EF, #00A4A6) nodes and connections, 3D perspective with depth-of-field,
     smooth cinematic transitions, dynamic motion feel, 1280x720, 12 seconds duration.
     ```
   - 在末尾附加中文旁白文本：
     ```
     Narration (Chinese voice-over):
     [从脚本提取的 3 个 Scene 中文旁白拼接]
     ```
   - 保存到 `videos/01-sora-prompt.txt`
6. **调用 `/sora` skill 生成 12s 视频**（完整过程）：
   - 使用 **Skill 工具**，技能名称：`sora`
   - ARGUMENTS：传入以下内容
     - prompt：从 `videos/01-sora-prompt.txt` 读取的完整提示词（含视觉描述和中文旁白）
     - 时长：12 秒
     - 分辨率：1280×720
     - 输出：`videos/clip-01.mp4`
     - 语音：启用 Sora 自带语音功能，使用 prompt 中的中文旁白生成语音解说
   - 等待执行完毕（视频生成通常需要 30~120 秒）
7. **验证视频**：
   ```bash
   ls -lh videos/clip-01.mp4
   ffprobe -v error -show_entries format=duration \
     -of default=noprint_wrappers=1:nokey=1 videos/clip-01.mp4
   # 应输出约 12.0
   ffprobe -v error -select_streams a -show_entries stream=codec_name \
     -of default=noprint_wrappers=1:nokey=1 videos/clip-01.mp4
   # 应输出音频编解码器名称（如 aac）
   ```
8. 提交：
   ```bash
   git add images/01-prompt.md images/01-town-architecture.png scripts/01-town-architecture.md \
     videos/01-sora-prompt.txt videos/clip-01.mp4
   git commit -m "feat(bead-01): Town/Rig/Crew/Mayor 架构配图、视频脚本和 12s 视频片段"
   ```
9. `bd update <bead-id> --notes "完成。配图: images/01-town-architecture.png, 脚本: scripts/01-town-architecture.md, 视频: videos/clip-01.mp4"`
10. `gt done --cleanup-status clean`

## 验收标准

- [ ] `images/01-town-architecture.png` 存在，1280×720，电影级概念艺术风格
- [ ] `scripts/01-town-architecture.md` 存在，含 3 个 Scene 和中文旁白
- [ ] 每个 Scene 有对应的英文 Sora Prompt
- [ ] `videos/clip-01.mp4` 存在，约 12 秒，1280×720，含语音解说音轨
- [ ] 内容准确反映 Gastown 架构设计
- [ ] 配图看起来像动画截图，不是 PPT 幻灯片
