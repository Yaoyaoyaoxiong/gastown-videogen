# Bead 05: Refinery 合并队列

## 任务

研究 Gas Town 的 Refinery（精炼厂）合并队列机制，生成一张概念配图和一段视频叙述脚本。

## 研究范围

优先阅读以下资料：

1. **本地代码库**：`/Users/xiaodong/work/github/gastown`
   - `refinery/` 相关目录或 Go 代码
   - `gt refinery -h`、`gt mq -h`、`gt done -h` 命令帮助

2. **CLI 快速验证**：
   ```bash
   gt refinery status <rig>   # 查看 refinery 状态
   gt mq list <rig>           # 查看 merge queue
   gt mq status <mr-id>       # 查看某个 MR 状态
   gt peek <rig>/refinery     # 查看 refinery 会话输出
   ```

3. **关键命令理解**：
   ```bash
   # Polecat 完成工作后
   gt done                          # 提交到 merge queue
   gt done --status ESCALATED       # 遇到 blocker
   gt done --cleanup-status clean   # 标记工作区干净

   # Mayor/Overseer 查看队列
   gt refinery queue <rig>
   gt refinery ready <rig>
   gt refinery blocked <rig>
   ```

## 核心概念说明（脚本内容参考）

Refinery 是 Gas Town 的合并质量门禁：

- **Refinery**：每个 rig 一个，专门处理 merge queue，确保 Polecat 的工作安全合并到主干
- **Merge Queue**：Polecat 完成（`gt done`）后，工作进入队列等待审查和合并
- **`gt done`**：Polecat 专属收尾命令，自动提交到 merge queue 并通知 Witness
- **工作流**：Polecat 完成 → `gt done` → merge queue → Refinery 处理 → 合并到 main
- **隔离保护**：每个 Polecat 在独立分支工作，Refinery 串行合并，避免代码冲突

关键隐喻：**Refinery 是冶炼厂，原料（Polecat 代码）进来，精炼后（审查通过）才能进入主干**

## 配图要求

**保存提示词到**：`images/05-prompt.md`
**调用**：`/baoyu-image-gen`（传入 `images/05-prompt.md` 路径）
**输出**：`images/05-refinery-merge.png`

配图内容设计（电影级概念艺术风格，非 PPT）：
- **主视觉**：3D 透视场景 — 一座科技感的精炼工厂，左侧多条发光的传送管道（每条代表一个 Polecat 分支），各管道内有发光的代码数据包在流动。管道汇聚到中央的精炼核心（一个巨大的发光球体/熔炉，内部有旋转的审查齿轮）。右侧一条宽大的金色管道将精炼后的成品输出
- **机器人元素**：几个 Polecat 干活机器人站在各自的传送管道入口，将代码包推入管道
- **队列感**：左侧管道中可见多个数据包排队等待（有顺序编号的光环）
- **景深**：前景一个机器人正在推送代码包（近距离），中景精炼核心发光，远景右侧输出管道延伸到主干储存塔
- **运动方向**：从左（多个分支）→ 中（精炼）→ 右（主干），汇聚然后输出
- **配色**：深海军蓝背景（#1E2140），传送管道蓝色（#4B72EF），精炼核心橙色发光（#F39C12），输出管道绿色（#00C853），数据包蓝紫色（#998DF4）

`images/05-prompt.md` 格式：
```markdown
---
type: concept-illustration
style: cinematic-tech
resolution: 1280x720
---

# Content Context
Concept: Refinery — Merge Queue Processor
Summary: Refinery is Gas Town's merge queue guardian. When Polecats finish work with `gt done`, their changes enter the merge queue. Refinery processes them serially, running quality checks, resolving conflicts, and merging to the main branch. This ensures clean, conflict-free integration.
Keywords: Refinery, merge queue, gt done, code integration, branch isolation, quality gate, main branch, robot

# Visual Design
Theme: Sci-fi refinery processing code from multiple branches into main
Style: Cinematic concept art, 3D perspective, depth-of-field, industrial sci-fi. Designed as a video starting frame for Sora animation.
Composition: Left — multiple glowing transport pipes (Polecat branches), each with data packages flowing inward. Polecat robots at pipe entrances pushing code packages. Center — a massive glowing refinery core (orange sphere with rotating review gears inside). Right — a single wide golden output pipe leading to main branch storage tower. Data packages queue in left pipes with numbered halos. Foreground — close-up of robot pushing a code package. Convergent flow: many-to-one-to-one.
Color scheme:
  - Background: Deep navy gradient (#1E2140 → #151830)
  - Input pipes: Blue (#4B72EF) with flowing light
  - Refinery core: Orange glow (#F39C12) with warm halo
  - Output pipe: Green (#00C853) leading to main branch
  - Data packages: Blue-purple (#998DF4) glowing
  - Robot accents: Teal (#00A4A6)
  - Atmosphere: Steam/energy particles, industrial glow
  - No logo or brand marks

# Text Elements
Title: 精炼厂合并队列
Subtitle: Refinery — Safe Merge Queue Processing

# Rendering Notes
Cinematic industrial sci-fi scene, NOT a PPT slide. Should look like a still frame
from a factory animation. Flow direction: left (many branches) → center (refinery) →
right (main). The flowing data packages and steam effects suggest continuous motion
for Sora to animate. Depth layers: foreground robot action, mid-ground refinery core,
background output tower. Resolution: 1280×720 (16:9).
```

## 视频脚本要求

**输出**：`scripts/05-refinery-merge.md`

脚本结构（总时长 36 秒，3 个 Scene，每个 Scene 为 Sora 12 秒视频准备）：

```
Scene 1 (0:00-0:12): 展示干活机器人（Polecat）完成工作后 gt done，代码包进入传送管道
Scene 2 (0:12-0:24): 精炼核心处理 merge queue（旋转审查、质量检测、冲突解决）
Scene 3 (0:24-0:36): 精炼后的代码从输出管道流入主干储存塔，完整的分支→安全合并流程
```

旁白需要覆盖：
- 为什么需要 Refinery（多个 Polecat 并行，如何避免代码冲突）
- `gt done` 的完整语义（不只是"完成"，还包括提交到队列）
- Refinery 的串行处理策略如何保证代码质量

**旁白文本将传入 Sora 自带语音功能，生成带中文语音解说的视频**

## 完成步骤

1. 研究代码库，整理 Refinery 机制
2. 编写 `images/05-prompt.md`
3. **调用 `/baoyu-image-gen` skill**（完整过程）：
   - 确认 `images/05-prompt.md` 已写好并内容完整
   - 使用 **Skill 工具**，技能名称：`baoyu-image-gen`
   - ARGUMENTS：`--promptfiles images/05-prompt.md --image images/05-refinery-merge.png --ar 16:9 --quality 2k`
   - 等待执行完毕，将生成的图片保存为 `images/05-refinery-merge.png`
   - 验证：`ls -lh images/05-refinery-merge.png`
4. 编写 `scripts/05-refinery-merge.md`（含 3 个 Scene + Sora Prompt + 中文旁白）
5. **整合 Sora prompt 并保存**：
   - 从脚本提取所有 Scene 的 Sora Prompt + 中文旁白，加统一风格前缀
   - 保存到 `videos/05-sora-prompt.txt`（格式参见 bead-01）
6. **调用 `/sora` skill 生成 12s 视频**（完整过程）：
   - 使用 **Skill 工具**，技能名称：`sora`
   - ARGUMENTS：prompt 从 `videos/05-sora-prompt.txt` 读取，时长 12 秒，分辨率 1280×720，输出 `videos/clip-05.mp4`，启用 Sora 自带语音
   - 等待执行完毕（30~120 秒）
7. **验证视频**：
   ```bash
   ls -lh videos/clip-05.mp4
   ffprobe -v error -show_entries format=duration \
     -of default=noprint_wrappers=1:nokey=1 videos/clip-05.mp4
   ffprobe -v error -select_streams a -show_entries stream=codec_name \
     -of default=noprint_wrappers=1:nokey=1 videos/clip-05.mp4
   ```
8. 提交：
   ```bash
   git add images/05-prompt.md images/05-refinery-merge.png scripts/05-refinery-merge.md \
     videos/05-sora-prompt.txt videos/clip-05.mp4
   git commit -m "feat(bead-05): Refinery 合并队列配图、视频脚本和 12s 视频片段"
   ```
9. `bd update <bead-id> --notes "完成。配图: images/05-refinery-merge.png, 脚本: scripts/05-refinery-merge.md, 视频: videos/clip-05.mp4"`
10. `gt done --cleanup-status clean`

## 验收标准

- [ ] `images/05-refinery-merge.png` 存在，1280×720，电影级概念艺术风格
- [ ] `scripts/05-refinery-merge.md` 存在，含 3 个 Scene 和中文旁白
- [ ] 每个 Scene 有对应的英文 Sora Prompt
- [ ] `videos/clip-05.mp4` 存在，约 12 秒，1280×720，含语音解说音轨
- [ ] 内容准确体现 Refinery 的串行合并策略和质量门禁作用
- [ ] 配图看起来像动画截图，不是 PPT 幻灯片
