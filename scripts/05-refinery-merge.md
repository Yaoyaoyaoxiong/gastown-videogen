# Refinery 合并队列 - 视频脚本

**总时长**: 36 秒（3 个 Scene，每段 12 秒）
**用途**: Sora 视频生成 + 中文语音解说

---

## Scene 1: Polecat 完成工作，代码进入传送管道

**时间**: 0:00 - 0:12

### Sora Prompt

```
Cinematic industrial sci-fi scene. Close-up of a teal-accented robot worker (Polecat) pushing a glowing blue-purple data package into a blue transport pipe. The robot has just finished its work, symbolizing "gt done" command execution. Multiple glowing transport pipes extend into the distance on the left side, each with queued data packages bearing numbered halos. The background is deep navy gradient (#1E2140). Blue light streams flow through the pipes toward the center. Steam and energy particles float in the air. Depth-of-field effect with foreground robot in sharp focus. 16:9 aspect ratio, cinematic lighting, industrial sci-fi aesthetic.
```

### 中文旁白（Sora 语音解说）

> 当一个 Polecat 完成工作后，它会执行 `gt done` 命令。这不仅意味着"任务完成"，更是将代码提交到合并队列的信号。代码被打包成数据包，进入传送管道，开始它的精炼之旅。

---

## Scene 2: 精炼核心处理合并队列

**时间**: 0:12 - 0:24

### Sora Prompt

```
Cinematic industrial sci-fi scene. Center-focused view of a massive glowing orange refinery core (sphere #F39C12) with rotating review gears visible inside. Multiple blue transport pipes converge into this central sphere from the left. The core emits warm orange halo light, illuminating surrounding steam and energy particles. Inside the transparent core, mechanical gears rotate and scan data packages one by one - symbolizing quality checks and conflict resolution. The core represents serialization and quality gating. Deep navy background (#1E2140) with industrial atmosphere. 16:9 aspect ratio, cinematic lighting, motion blur on rotating gears.
```

### 中文旁白（Sora 语音解说）

> Refinery 是 Gas Town 的合并质量门禁。所有 Polecat 的代码在这里被串行处理——Rebase 到最新主干、运行测试、解决冲突。这种串行策略确保了代码质量，避免了并行合并可能导致的冲突。只有通过了所有检查的代码，才能进入下一阶段。

---

## Scene 3: 精炼完成，代码进入主干

**时间**: 0:24 - 0:36

### Sora Prompt

```
Cinematic industrial sci-fi scene. Wide view showing the complete flow: left side shows multiple blue input pipes with robot workers, center is the glowing orange refinery core, right side features a single wide golden-green output pipe (#00C853) extending into the distance toward a massive storage tower labeled "main". A freshly refined data package glows green as it travels through the output pipe. The tower in the background represents the main branch - the final destination. The contrast between many input pipes and single output pipe visualizes the merge queue concept. Flow direction: left → center → right. Deep navy gradient background (#1E2140 → #151830). 16:9 aspect ratio, epic cinematic composition, industrial sci-fi aesthetic.
```

### 中文旁白（Sora 语音解说）

> 经过精炼的代码从输出管道流出，安全地汇入主干储存塔。这就是完整的分支隔离工作流程：每个 Polecat 在独立分支上并行工作，Refinery 串行合并确保质量。这种设计让大规模协作成为可能——既保持了开发效率，又保证了代码库的稳定性。

---

## 核心概念总结

### 为什么需要 Refinery？

- **并行开发的冲突问题**: 多个 Polecat 同时在不同分支工作，如果直接合并到主干，容易产生代码冲突
- **质量门禁**: Refinery 作为中间层，确保所有代码在合并前都经过测试和审查
- **串行处理策略**: 一次只处理一个合并请求，按顺序 Rebase 和验证，从根本上避免冲突

### `gt done` 的完整语义

- 不只是标记"工作完成"
- 自动将当前分支提交到合并队列
- 通知 Witness 进行后续处理
- 触发 Refinery 的质量检查流程

### Refinery 的工作流程

1. 接收: 从队列中获取待合并的 MR
2. Rebase: 将工作分支变基到最新主干
3. 验证: 运行测试、构建检查、代码审查
4. 决策: 通过则合并到 main，失败则打回重试
5. 清理: 删除已合并的分支，关闭 MR

---

## 视觉隐喻说明

| 视觉元素 | 技术概念 |
|---------|---------|
| Polecat 机器人 | 工作代理（Polecat） |
| 数据包 | 代码变更（commits） |
| 传送管道 | 分支（branch） |
| 精炼核心 | Refinery 合并处理器 |
| 旋转齿轮 | 质量检查、测试、审查 |
| 输出管道 | 主干合并通道 |
| 储存塔 | 主干代码库（main branch） |
| 多进一出 | 合并队列的串行特性 |

---

*脚本生成时间: 2026-03-07*
*用于: Gas Town 概念视频系列 - Bead 05*
