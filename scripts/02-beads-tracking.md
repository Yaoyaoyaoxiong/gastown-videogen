# Beads 任务追踪系统 - 视频脚本

> 总时长: 36 秒 (3 个 Scene，每段 12 秒)
> 分辨率: 1280×720 (16:9)
> 风格: Tech visualization, cinematic concept art

---

## Scene 1 (0:00-0:12): 全息任务面板与 bd 整体概念

### Sora Prompt

```
Tech visualization video, cinematic concept art style, dark navy blue (#1E2140) background,
glowing blue-cyan (#4B72EF, #00A4A6) nodes and connections, 3D perspective with depth-of-field,
smooth cinematic transitions, dynamic motion feel, 1280x720, 12 seconds duration.

A massive holographic Kanban board floating in a dark futuristic control room. The board has three vertical columns labeled with glowing text: "Ready" (left), "In Progress" (center), "Done" (right). Each column contains glowing spherical beads—orange beads in Ready column, blue pulsing beads in In Progress, green stable beads in Done. Thin glowing dependency lines connect related beads across columns. The holographic panel shimmers with particle effects. Camera slowly pans across the board from left to right, revealing the organized workflow. The scene feels alive with gentle pulsing lights and floating particles. No robots visible yet, pure focus on the elegant task board system. Professional motion graphics aesthetic, not a presentation slide.

Narration (Chinese voice-over, professional calm voice):
```

### 旁白 (中文解说)

> **珠链任务系统，bd，是 Gas Town 的核心任务追踪引擎。**
> 
> 它像一个智能看板，管理着所有 AI 代理的工作任务。
> 每个任务都是一颗发光的珠子，按照优先级和依赖关系有序排列。

---

## Scene 2 (0:12-0:24): Polecat 原子性领取任务

### Sora Prompt

```
Tech visualization video, cinematic concept art style, dark navy blue (#1E2140) background,
glowing blue-cyan (#4B72EF, #00A4A6) nodes and connections, 3D perspective with depth-of-field,
smooth cinematic transitions, dynamic motion feel, 1280x720, 12 seconds duration.

A Polecat worker robot (teal and silver mechanical design) in the foreground reaches out its robotic arm toward the holographic task board from Scene 1. Motion blur on the arm as it grabs an orange glowing bead from the "Ready" column. As the bead is claimed, it flashes and turns blue, then moves to the "In Progress" column with a smooth animated transition. The robot's mechanical hand holds the bead firmly as it pulls away. In the background, other robot silhouettes are visible, each working on their own tasks. The dependency lines between beads glow brighter momentarily as the task is claimed. Dynamic action shot with depth layers—foreground robot in sharp focus, mid-ground holographic board, background working robots slightly blurred. Professional cinematic animation style.

Narration (Chinese voice-over, professional calm voice):
```

### 旁白 (中文解说)

> **当一个干活机器人，Polecat，准备开始工作时，它使用 bd ready 查看可执行的任务。**
> 
> 然后原子性地占领一个任务——bd update --claim。
> 这个操作是原子性的，意味着只有第一个抢到任务的机器人能获得它，
> 完全避免了多个代理重复执行同一个任务。

---

## Scene 3 (0:24-0:36): 依赖关系与 Git 同步

### Sora Prompt

```
Tech visualization video, cinematic concept art style, dark navy blue (#1E2140) background,
glowing blue-cyan (#4B72EF, #00A4A6) nodes and connections, 3D perspective with depth-of-field,
smooth cinematic transitions, dynamic motion feel, 1280x720, 12 seconds duration.

A zoomed-out view showing the complete workflow ecosystem. The holographic task board from previous scenes is now shown with multiple waves of beads. Wave 1 beads (5 blue beads in In Progress column) simultaneously turn green and move to Done column in a synchronized animation. As they complete, glowing dependency lines pulse and unlock Wave 2 beads (3 orange beads in Ready column), which immediately turn blue and begin moving to In Progress. This demonstrates the automatic dependency unlocking mechanism. In the background, a translucent overlay shows JSONL code snippets floating upward, representing Git sync. The scene emphasizes the flow: Ready → In Progress → Done, with Wave 2 automatically triggered after Wave 1 completion. Smooth flowing motion, glowing particle trails following the beads, cinematic wide shot showing the entire system in action. Professional motion graphics with depth and atmosphere.

Narration (Chinese voice-over, professional calm voice):
```

### 旁白 (中文解说)

> **bd 还能管理任务间的依赖关系。**
> 
> 当第一波任务全部完成后，第二波任务会自动解锁并开始执行。
> 所有状态变更都会实时同步到 Git 仓库，
> 通过 JSONL 文件永久保存，随时可以追溯和审计。

---

## 完整旁白文本 (用于 Sora 语音生成)

```
珠链任务系统，bd，是 Gas Town 的核心任务追踪引擎。
它像一个智能看板，管理着所有 AI 代理的工作任务。
每个任务都是一颗发光的珠子，按照优先级和依赖关系有序排列。

当一个干活机器人，Polecat，准备开始工作时，它使用 bd ready 查看可执行的任务。
然后原子性地占领一个任务——bd update --claim。
这个操作是原子性的，意味着只有第一个抢到任务的机器人能获得它，
完全避免了多个代理重复执行同一个任务。

bd 还能管理任务间的依赖关系。
当第一波任务全部完成后，第二波任务会自动解锁并开始执行。
所有状态变更都会实时同步到 Git 仓库，
通过 JSONL 文件永久保存，随时可以追溯和审计。
```

---

## 技术备注

### Sora 生成建议

- **统一风格前缀**: 所有 Scene 使用相同的前缀确保视觉一致性
- **颜色方案**: 深海军蓝背景 (#1E2140)，蓝色节点 (#4B72EF, #00A4A6)
- **镜头运动**: Scene 1 为慢速平移，Scene 2 为特写动作，Scene 3 为广角展示
- **动画感**: 强调动态模糊、粒子效果、发光脉冲

### 视频拼接顺序

1. `clip-01.mp4` - Town 架构 (Bead 01)
2. `clip-02.mp4` - **本脚本生成的 Beads 追踪系统视频**
3. `clip-03.mp4` - Polecat 并行 (Bead 03)
4. `clip-04.mp4` - Convoy 追踪 (Bead 04)
5. `clip-05.mp4` - Refinery 合并 (Bead 05)

使用 ffmpeg concat 拼接为 `final-joinai-intro.mp4`
