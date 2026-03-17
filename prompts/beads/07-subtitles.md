# Bead 07: 硬字幕烧录

## 任务

从 5 个视频脚本中提取中文旁白，生成 SRT 字幕文件，然后用 ffmpeg 将硬字幕烧录到最终视频中。

## 前置条件

此 bead 依赖 Bead 06 完成（最终视频已拼接）。执行前验证：

```bash
# 验证最终视频存在
ls -lh videos/final-joinai-intro.mp4

# 验证时长（应约 60 秒）
ffprobe -v error -show_entries format=duration \
  -of default=noprint_wrappers=1:nokey=1 videos/final-joinai-intro.mp4

# 验证 5 个脚本存在
ls scripts/01-town-architecture.md \
   scripts/02-beads-tracking.md \
   scripts/03-polecat-parallel.md \
   scripts/04-convoy-tracking.md \
   scripts/05-refinery-merge.md
```

如果视频或脚本缺失，停止并使用 `gt done --status ESCALATED` 上报给 Mayor。

## 完成步骤

1. **读取 5 个脚本，提取中文旁白文本**：
   - 逐一读取 `scripts/01~05-*.md`
   - 提取每个脚本中所有 Scene 的 `旁白` 字段内容
   - 按顺序整理为 5 段旁白文本（每段对应 12 秒视频）

2. **生成 SRT 字幕文件**：
   - 保存到 `subtitles/narration.srt`
   - 时间轴分配（每个 bead 对应 12 秒）：

   ```srt
   1
   00:00:00,000 --> 00:00:12,000
   [bead-01 的旁白文本]

   2
   00:00:12,000 --> 00:00:24,000
   [bead-02 的旁白文本]

   3
   00:00:24,000 --> 00:00:36,000
   [bead-03 的旁白文本]

   4
   00:00:36,000 --> 00:00:48,000
   [bead-04 的旁白文本]

   5
   00:00:48,000 --> 00:01:00,000
   [bead-05 的旁白文本]
   ```

   > **注意**：如果单段旁白过长（超过 2 行显示），应拆分为多个字幕条目，均匀分配在 12 秒时间段内。例如一段 36 秒旁白（3 个 Scene）可拆为 3 个 4 秒字幕条目。

3. **ffmpeg 烧录硬字幕**：
   ```bash
   ffmpeg -i videos/final-joinai-intro.mp4 \
     -vf "subtitles=subtitles/narration.srt:force_style='FontSize=24,FontName=PingFang SC,PrimaryColour=&HFFFFFF,OutlineColour=&H000000,Outline=2,MarginV=30'" \
     -c:a copy \
     videos/final-joinai-intro-subtitled.mp4
   ```

4. **验证字幕视频**：
   ```bash
   # 检查文件存在
   ls -lh videos/final-joinai-intro-subtitled.mp4

   # 验证时长（应与原视频一致，约 60 秒）
   ffprobe -v error -show_entries format=duration \
     -of default=noprint_wrappers=1:nokey=1 videos/final-joinai-intro-subtitled.mp4

   # 验证分辨率
   ffprobe -v error -select_streams v:0 \
     -show_entries stream=width,height \
     -of csv=p=0 videos/final-joinai-intro-subtitled.mp4
   # 应输出: 1280,720

   # 验证含音轨
   ffprobe -v error -select_streams a -show_entries stream=codec_name \
     -of default=noprint_wrappers=1:nokey=1 videos/final-joinai-intro-subtitled.mp4
   ```

5. **提交**：
   ```bash
   git add subtitles/narration.srt videos/final-joinai-intro-subtitled.mp4
   git commit -m "feat(bead-07): 生成 SRT 字幕并烧录硬字幕到最终视频"
   ```

6. `bd update <bead-id> --notes "完成。字幕: subtitles/narration.srt, 字幕视频: videos/final-joinai-intro-subtitled.mp4"`

7. `gt done --cleanup-status clean`

## 验收标准

- [ ] `subtitles/narration.srt` 存在，包含 5 段中文旁白（对应 5 个 bead）
- [ ] SRT 时间轴正确覆盖 0:00 至 1:00
- [ ] `videos/final-joinai-intro-subtitled.mp4` 存在，时长约 60 秒
- [ ] 字幕视频分辨率为 1280×720
- [ ] 字幕清晰可读（白色文字，黑色描边，底部居中）
- [ ] 字幕视频含完整语音解说音轨

## 错误处理

**如果 ffmpeg 字幕烧录失败**：
```bash
# 检查 PingFang SC 字体是否可用
fc-list | grep "PingFang"

# 如果字体不可用，改用系统自带中文字体
ffmpeg -i videos/final-joinai-intro.mp4 \
  -vf "subtitles=subtitles/narration.srt:force_style='FontSize=24,FontName=Heiti SC,PrimaryColour=&HFFFFFF,OutlineColour=&H000000,Outline=2,MarginV=30'" \
  -c:a copy \
  videos/final-joinai-intro-subtitled.mp4

# 如果 SRT 文件编码有问题
file subtitles/narration.srt
# 确保是 UTF-8 编码
```
