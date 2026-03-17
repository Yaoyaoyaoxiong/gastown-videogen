# Polecat 并行执行引擎

**时长**: 36 秒（3 个 Scene，每个 12 秒）  
**风格**: 电影级概念艺术风格，深蓝背景，青色节点  
**分辨率**: 1280×720 (16:9)

---

## Scene 1 (0:00-0:12): Polecat 的本质——一次性任务 Worker

**Sora Prompt:**
Tech visualization video, cinematic concept art style, dark navy blue (#1E2140) background, glowing blue-cyan (#4B72EF, #00A4A6) nodes and connections, 3D perspective with depth-of-field, smooth cinematic transitions, dynamic motion feel, 1280x720, 12 seconds duration.

Scene 1: A single small teal-colored robot (Polecat) emerges from a glowing portal on the left side of the frame. The robot has a sleek, futuristic design with glowing cyan accents. As it materializes, it immediately starts working on a floating holographic task node in the center. The robot moves with purpose and efficiency, its limbs extending to manipulate the glowing interface elements. Motion blur effects emphasize its quick, precise movements. The scene focuses on this one worker robot performing its task with perfect isolation - no other robots visible. The background shows faint network connections suggesting the larger system, but the focus remains on this single ephemeral worker. The robot's form is slightly transparent at the edges, suggesting it's temporary and will disappear when the task completes. Soft particle effects surround the robot as it works, indicating computational activity.

**旁白（中文，用于 Sora 语音解说）:**
> Polecat，Gas Town 的并行执行引擎。每一个 Polecat 都是一次性的任务 Worker——它们被 Mayor 通过 `gt sling` 命令瞬间发射出来，执行一个独立的任务，完成后立即消失。这种设计保证了完全的隔离性和干净的执行环境。没有残留状态，没有互相干扰，只有纯粹的计算力。

---

## Scene 2 (0:12-0:24): Fan-out 爆发——5 个 Polecat 同时射出

**Sora Prompt:**
Tech visualization video, cinematic concept art style, dark navy blue (#1E2140) background, glowing blue-cyan (#4B72EF, #00A4A6) nodes and connections, 3D perspective with depth-of-field, smooth cinematic transitions, explosive dynamic motion feel, 1280x720, 12 seconds duration.

Scene 2: A dramatic fan-out explosion shot. On the left, a large golden robot mayor (Mayor) with glowing arms outstretched fires five parallel energy trails simultaneously across the frame from left to right. Each trail is a gradient from deep blue (#4B72EF) to bright teal (#00A4A6), leaving behind speed lines and motion blur effects. At the end of each energy trail, a small teal Polecat robot rockets toward its target - five separate floating task nodes scattered across the right side of the frame. The motion is powerful and synchronized, like a shotgun blast of robotic workers. Particle bursts and shockwave effects emanate from the mayor's hands at the moment of launch. The Polecats are shown mid-flight, frozen in motion with intense velocity blur, emphasizing the simultaneous parallel dispatch. Each Polecat is clearly heading to a different destination, illustrating true parallel execution where each task gets its own dedicated worker. Strong horizontal movement from left (Mayor) to right (task nodes).

**旁白（中文，用于 Sora 语音解说）:**
> 这就是真正的并行执行。当 Mayor 需要处理多个任务时，`gt sling` 命令会将每一个任务挂载到一个独立的 Polecat 上，同时发射出去。五个任务，五个 Polecat，五个独立的进程，在同一时刻开始执行。Fan-out 模式不是伪并行，不是任务切换——这是真正的并发，每个 Polecat 都有自己的计算资源和工作空间。

---

## Scene 3 (0:24-0:36): Witness 监控与 gt done 收尾

**Sora Prompt:**
Tech visualization video, cinematic concept art style, dark navy blue (#1E2140) background, glowing blue-cyan (#4B72EF, #00A4A6) nodes and connections, 3D perspective with depth-of-field, smooth cinematic transitions, calm monitoring atmosphere after action, 1280x720, 12 seconds duration.

Scene 3: The aftermath and monitoring phase. Five teal Polecat robots are shown completing their tasks at various task nodes across the frame. In the upper right corner, a silver Witness monitoring tower hovers with a blue-purple glow (#998DF4), emitting thin scanning lines that connect to each Polecat like radar beams tracking multiple targets simultaneously. The scene shows a time-lapse effect where Polecats finish their work one by one - each robot glows brighter for a moment upon completion, then dissolves into particles as it finishes. The Witness tower's scanning lines pulse with each status check. As the last Polecat completes and vanishes, a final golden pulse emanates from the center representing the `gt done` command - this pulse travels outward, confirming all work is done and cleanup is complete. The scene ends with the Witness tower remaining, silent and vigilant, ready for the next batch of tasks. The overall mood shifts from high-energy action to calm, organized completion.

**旁白（中文，用于 Sora 语音解说）:**
> 但并行执行需要监管。Witness，每个 Rig 的专属裁判，悬浮在上方监控每一个 Polecat 的健康状况。如果某个 Polecat 崩溃或卡住，Witness 会立即介入，要么恢复，要么清理。当所有任务完成，Polecat 执行 `gt done` 命令，自动将工作提交到合并队列，然后干净利落地退出。工作完成，现场清理，等待下一次发射。

---

## 完整旁白文本（用于 Sora 语音生成）

```
Polecat，Gas Town 的并行执行引擎。每一个 Polecat 都是一次性的任务 Worker——它们被 Mayor 通过 gt sling 命令瞬间发射出来，执行一个独立的任务，完成后立即消失。这种设计保证了完全的隔离性和干净的执行环境。没有残留状态，没有互相干扰，只有纯粹的计算力。

这就是真正的并行执行。当 Mayor 需要处理多个任务时，gt sling 命令会将每一个任务挂载到一个独立的 Polecat 上，同时发射出去。五个任务，五个 Polecat，五个独立的进程，在同一时刻开始执行。Fan-out 模式不是伪并行，不是任务切换——这是真正的并发，每个 Polecat 都有自己的计算资源和工作空间。

但并行执行需要监管。Witness，每个 Rig 的专属裁判，悬浮在上方监控每一个 Polecat 的健康状况。如果某个 Polecat 崩溃或卡住，Witness 会立即介入，要么恢复，要么清理。当所有任务完成，Polecat 执行 gt done 命令，自动将工作提交到合并队列，然后干净利落地退出。工作完成，现场清理，等待下一次发射。
```

---

## 关键概念总结

| 概念 | 说明 |
|------|------|
| **Polecat** | 一次性、离散任务 Worker，执行完即销毁，保证隔离性 |
| **`gt sling`** | 统一派发命令，可批量挂载多个任务，实现 Fan-out 并行 |
| **Fan-out 模式** | 多个任务同时发射，每个任务独立进程，真正并行执行 |
| **Witness** | 每个 Rig 一个监控器，负责 Polecat 健康检查、故障恢复、生命周期管理 |
| **`gt done`** | Polecat 专属收尾命令，提交工作到合并队列，清理并退出 |

---

## 视觉风格统一规范

- **背景**: 深海军蓝渐变 (#1E2140 → #151830)
- **Mayor 机器人**: 金色发光 (#FFD700, #F4BFA6)
- **Polecat 机器人**: 青色 (#00A4A6) 带青色尾迹
- **能量轨迹**: 渐变蓝→青 (#4B72EF → #00A4A6)
- **Witness 塔**: 银色配蓝紫光晕 (#998DF4)
- **速度效果**: 运动模糊、速度线、粒子爆发
- **分辨率**: 1280×720 (16:9)
