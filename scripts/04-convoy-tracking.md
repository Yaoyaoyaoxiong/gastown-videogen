# Convoy 工作追踪与调度 — 视频脚本

> 总时长：36 秒（3 个 Scene，每个 12 秒）
> 目标：用于 Sora 视频生成 + 中文语音旁白

---

## Scene 1 (0:00-0:12): Convoy 车队启航

### Sora 英文 Prompt
```
Cinematic sci-fi scene: A glowing digital highway stretches from back-left to front-right in 3D perspective. Five sleek transport vehicles with blue neon engines fly in tight formation (Wave 1), leaving light trails. Left background features a towering control center (Mayor) sending golden signal ripples to all vehicles. Deep navy gradient background (#1E2140). Each vehicle has a small holographic progress ring. Foreground shows a close-up of one vehicle's glowing engine. Speed particles fill the air. Dynamic forward motion. Cinematic depth of field. 16:9 aspect ratio.
```

### 中文旁白
> **旁白（Sora 语音）**: "在 Gas Town 中，Convoy 是一种批量追踪机制。当 Mayor 需要同时调度多个任务时，他会创建一个 Convoy，就像组建一支车队。"

---

## Scene 2 (0:12-0:24): 实时追踪与进度监控

### Sora 英文 Prompt
```
Cinematic sci-fi scene: Same digital highway and control tower from different angle. Five Wave 1 vehicles in mid-ground, each showing holographic progress rings with different completion percentages (25%, 50%, 75%, 100%, 100%). The two 100% vehicles turn green. Golden signal beams from the control tower connect to each vehicle like GPS tracking. One vehicle in foreground shows its engine detail with status indicator. Floating data overlays show "In Progress" and "Completed" labels. Dynamic camera movement following the fleet. Deep navy background with blue highway glow. 16:9 aspect ratio.
```

### 中文旁白
> **旁白（Sora 语音）**: "通过 `gt convoy status` 和 `gt feed`，Mayor 可以实时监控整个车队的进度。每辆飞行器代表一个 bead，进度条显示任务的完成状态。"

---

## Scene 3 (0:24-0:36): Wave 依赖链自动解锁

### Sora 英文 Prompt
```
Cinematic sci-fi scene: Same digital highway. All five Wave 1 vehicles now glow solid green and fly ahead faster. Behind them, the sixth vehicle (Wave 2) transitions from orange dashed outline to solid blue glow, its engines igniting and joining the formation. The control tower sends a golden "GO" signal pulse to the newly activated Wave 2 vehicle. Visual effect of dependency chain unlocking — the orange dashed outline dissolves and transforms into solid blue. Celebration particles as Wave 2 launches. Deep navy background. Sense of momentum and progression. 16:9 aspect ratio.
```

### 中文旁白
> **旁白（Sora 语音）**: "当 Wave 1 的所有任务完成后，Wave 2 会自动解锁并开始执行。这就是依赖链的工作原理——前序任务全部完成，后续任务才会启动。"

---

## 核心概念总结（用于字幕/片尾）

| 概念 | 说明 |
|------|------|
| **Convoy** | 批量追踪单元，把多个 bead 绑在一起协调追踪 |
| **gt convoy status** | 查看车队整体进度和各飞行器状态 |
| **gt feed** | 实时事件流，像 Twitter 时间线一样展示所有活动 |
| **Wave** | 执行波次，Wave 1 全部完成 → Wave 2 自动解锁 |
| **依赖链** | 通过 `bd dep add` 设置的 bead 间依赖关系 |

---

## 关键隐喻

> **Convoy 是一支车队，Mayor 是调度员，`gt convoy status` 是车队 GPS 追踪。**

---

## 生成指令

```bash
# 生成 Scene 1 (0:00-0:12)
sora generate --prompt "Cinematic sci-fi scene: A glowing digital highway..." --duration 12s --aspect 16:9 --output scene1.mp4

# 生成 Scene 2 (0:12-0:24)
sora generate --prompt "Cinematic sci-fi scene: Same digital highway..." --duration 12s --aspect 16:9 --output scene2.mp4

# 生成 Scene 3 (0:24-0:36)
sora generate --prompt "Cinematic sci-fi scene: Same digital highway..." --duration 12s --aspect 16:9 --output scene3.mp4

# 合并（可选）
ffmpeg -f concat -i scenes.txt -c copy convoy-tracking.mp4
```

---

## 配图文件

- **Prompt**: `images/04-prompt.md`
- **配图**: `images/04-convoy-tracking.png` (1376×768 PNG)

---

*Generated for workflow_intro Bead 04: Convoy 工作追踪与调度*
