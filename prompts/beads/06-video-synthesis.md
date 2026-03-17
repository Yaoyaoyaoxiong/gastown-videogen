# Bead 06: 视频拼接

## 任务

读取 Wave 1 生成的 5 个视频片段（`videos/clip-01.mp4` 至 `videos/clip-05.mp4`），用 ffmpeg 拼接为最终的 JoinAI Swarm Factory 工作流程介绍视频。

> **注意**：视频片段已由 Wave 1 各 Polecat 分别调用 `/sora` 生成（每段 12 秒，含语音解说），本 bead 只负责拼接，不再调用 Sora。

## 前置条件

此 bead 依赖 Beads 01-05 全部完成。执行前验证所有片段存在：

```bash
for i in 01 02 03 04 05; do
  echo -n "clip-$i.mp4: "
  if [ -f "videos/clip-$i.mp4" ]; then
    duration=$(ffprobe -v error -show_entries format=duration \
      -of default=noprint_wrappers=1:nokey=1 videos/clip-$i.mp4)
    audio=$(ffprobe -v error -select_streams a -show_entries stream=codec_name \
      -of default=noprint_wrappers=1:nokey=1 videos/clip-$i.mp4)
    echo "duration=${duration}s audio=${audio}"
  else
    echo "MISSING!"
  fi
done
```

如果任何片段缺失或无音轨，停止并使用 `gt done --status ESCALATED` 上报给 Mayor。

## 完成步骤

1. **验证 5 个片段**（上述前置条件检查）
2. **ffmpeg 拼接视频**：
   ```bash
   cd videos/

   # 创建片段文件列表
   cat > filelist.txt << 'EOF'
   file 'clip-01.mp4'
   file 'clip-02.mp4'
   file 'clip-03.mp4'
   file 'clip-04.mp4'
   file 'clip-05.mp4'
   EOF

   # ffmpeg 拼接（copy 模式，不重新编码）
   ffmpeg -f concat -safe 0 -i filelist.txt -c copy final-joinai-intro.mp4

   # 如果 copy 模式有编解码器不兼容问题，改用重编码模式：
   # ffmpeg -f concat -safe 0 -i filelist.txt \
   #   -vcodec libx264 -acodec aac \
   #   final-joinai-intro.mp4

   cd ..
   ```
3. **验证最终视频**：
   ```bash
   # 检查文件存在
   ls -lh videos/final-joinai-intro.mp4

   # 验证时长（应约 60 秒 = 5 × 12 秒）
   ffprobe -v error -show_entries format=duration \
     -of default=noprint_wrappers=1:nokey=1 videos/final-joinai-intro.mp4

   # 验证分辨率
   ffprobe -v error -select_streams v:0 \
     -show_entries stream=width,height \
     -of csv=p=0 videos/final-joinai-intro.mp4
   # 应输出: 1280,720

   # 验证含音轨（语音解说贯穿全片）
   ffprobe -v error -select_streams a -show_entries stream=codec_name \
     -of default=noprint_wrappers=1:nokey=1 videos/final-joinai-intro.mp4
   ```
4. **提交**：
   ```bash
   git add videos/filelist.txt videos/final-joinai-intro.mp4
   git commit -m "feat(bead-06): ffmpeg 拼接 5 个视频片段为最终介绍视频"
   ```
5. `bd update <bead-id> --notes "完成。最终视频: videos/final-joinai-intro.mp4 (约60秒, 含语音解说)"`
6. `gt done --cleanup-status clean`

## 验收标准

- [ ] `videos/clip-01.mp4` 至 `videos/clip-05.mp4` 均存在，每个约 12 秒
- [ ] `videos/final-joinai-intro.mp4` 存在，总时长约 60 秒
- [ ] 最终视频分辨率为 1280×720
- [ ] 最终视频含完整语音解说（中文旁白贯穿全片）

## 错误处理

**如果 ffmpeg 拼接失败**：
```bash
# 检查 ffmpeg 是否安装
which ffmpeg
ffmpeg -version

# 如果未安装
brew install ffmpeg

# 如果编解码器不兼容，检查各片段格式
for clip in videos/clip-*.mp4; do
  echo "$clip:"
  ffprobe -v error -show_entries stream=codec_name,width,height \
    -of default=noprint_wrappers=1 "$clip"
done

# 改用重编码模式拼接
cd videos/
ffmpeg -f concat -safe 0 -i filelist.txt \
  -vcodec libx264 -acodec aac \
  final-joinai-intro.mp4
cd ..
```
