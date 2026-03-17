# Town/Rig/Crew/Mayor 架构视频脚本

> 为 Sora 视频生成准备的脚本，含 3 个 Scene，每个 Scene 12 秒

---

## Scene 1: 全景概览 (0:00-0:12)

### Sora Prompt (英文)
```
Cinematic wide shot of a futuristic AI smart city at night. The camera slowly pushes forward from a distant starry sky, revealing a tech town with glowing buildings. In the center stands a massive golden robot mayor radiating warm light. Surrounding it are multiple blue-lit warehouse buildings labeled "Rigs". Small cyan robots (Polecats) move dynamically around the warehouses. Particle effects and soft glows fill the atmosphere. Deep navy blue sky gradient transitioning to the town. Dynamic camera movement pushing in from wide to medium shot. Cinematic lighting with volumetric fog. 16:9 aspect ratio.
```

### 中文旁白 (用于 Sora 语音解说)
> **旁白文本**："欢迎来到聚智小镇——Gas Town。这是一个专为 AI 智能体协作打造的编排系统。在这里，多个 AI 代理可以像一座小镇的居民一样协同工作，不再因为重启而丢失上下文。让我们走进这座小镇，看看它是如何运作的。"

---

## Scene 2: Mayor 与 Rig 的关系 (0:12-0:24)

### Sora Prompt (英文)
```
Medium close-up of the golden robot Mayor at center frame, radiating golden light rays outward in all directions. Light trails connect from the Mayor to surrounding blue warehouse buildings (Rigs). Each light trail carries a glowing task card moving from Mayor to the warehouses. The camera orbits around the Mayor showing the radial distribution pattern. Cinematic depth of field with Mayor in sharp focus and Rigs slightly blurred in background. Warm gold (#FFD700) light from Mayor contrasting with cool blue (#4B72EF) warehouses. Motion graphics style with flowing light particles. 16:9 aspect ratio.
```

### 中文旁白 (用于 Sora 语音解说)
> **旁白文本**："在小镇的中心，是机器人市长——Mayor。它是人机接口，也是全局协调者。当你告诉 Mayor 一个任务，它会将工作分发给不同的仓库——我们称之为 Rig。每个 Rig 对应一个项目，有自己的代码库和 AI 工作者。"

---

## Scene 3: Polecat 执行任务 (0:24-0:36)

### Sora Prompt (英文)
```
Dynamic tracking shot following a small cyan robot (Polecat) as it receives a glowing task card from a light trail emanating from the golden Mayor in the background. The Polecat robot carries the task card and moves toward a blue warehouse building (Rig), entering through its door. Close-up detail on the Polecat's mechanical design with teal (#00A4A6) glowing accents. Other Polecats visible in background moving in and out of warehouses. Camera follows the main Polecat's movement with smooth motion blur. Foreground shows task card details with text and icons. Cinematic tech aesthetic with particle effects. 16:9 aspect ratio.
```

### 中文旁白 (用于 Sora 语音解说)
> **旁白文本**："这些小型机器人叫做 Polecat，它们是具体执行任务的工人。Mayor 派发任务给它们，它们进入对应的 Rig 仓库完成工作。虽然每个 Polecat 的会话是临时的，但它们的工作历史会被记录在基于 Git 的 Hook 中。这就是 Gas Town 的秘密——让 AI 代理像一座小镇一样可靠地协作。"

---

## 架构概念总结

### 四层架构

| 层级 | 名称 | 角色 | 职责 |
|------|------|------|------|
| 1 | **Town（镇）** | `~/gt` 根目录 | 整个 AI 编排系统的家园 |
| 2 | **Rig（钻机）** | 项目仓库 | 每个项目 = 一个 Rig，包含该项目的所有 AI 工作者 |
| 3 | **Mayor（市长）** | 人机接口 | 全局协调者，接收人类指令并分发工作 |
| 4 | **Polecat（鼬鼠）** | 任务工人 | 离散任务 worker，由 Mayor 派发，完成后消亡 |

### 关键隐喻

**一座 AI 小镇，Mayor 管理，各 Rig 是不同工厂，Polecat 是工厂工人**

- **Town** = 整个小镇的地盘
- **Rig** = 不同的工厂/仓库（每个项目一个）
- **Mayor** = 市长，协调一切
- **Polecat** = 工厂工人，执行具体任务
- **Crew** = 你的工作区，可以长期停留
- **Hook** = 基于 Git worktree 的持久存储，记录工作状态

---

## 技术说明

**视频用途**：用于 Gas Town 架构概念介绍
**总时长**：36 秒（3 个 Scene × 12 秒）
**分辨率**：1280×720 (16:9)
**风格**：电影级概念艺术 / 动态图形
**语音**：Sora 内置中文语音解说（使用旁白文本）

---

## 文件清单

- 配图：`images/01-town-architecture.png` (1280×720)
- 配图提示词：`images/01-prompt.md`
- 本脚本：`scripts/01-town-architecture.md`
