const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ImageRun,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, PageNumber, PageBreak,
} = require("docx");

const ROOT = path.resolve(__dirname, "..");
const OUT_FILE = "JoinAI Swarm Factory \u591A\u667A\u80FD\u4F53\u5E76\u884C\u89C6\u9891\u5236\u4F5C\u6848\u4F8B.docx";

// ── Helpers ─────────────────────────────────────

function readImg(rel) {
  return fs.readFileSync(path.join(ROOT, rel));
}

function img(rel, w = 580) {
  const h = Math.round(w * 720 / 1280);
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    alignment: AlignmentType.CENTER,
    children: [new ImageRun({
      type: "png",
      data: readImg(rel),
      transformation: { width: w, height: h },
      altText: { title: rel, description: rel, name: path.basename(rel) },
    })],
  });
}

function textRuns(text) {
  const runs = [];
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  for (const part of parts) {
    if (part.startsWith("**") && part.endsWith("**")) {
      runs.push(new TextRun({ text: part.slice(2, -2), bold: true }));
    } else if (part) {
      runs.push(new TextRun(part));
    }
  }
  return runs;
}

function para(text) {
  return new Paragraph({ spacing: { after: 120 }, children: textRuns(text) });
}

function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] });
}

function h3(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(text)] });
}

function bullet(text, ref) {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 60 },
    children: textRuns(text),
  });
}

function num(text, ref) {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80 },
    children: textRuns(text),
  });
}

// ── Numbering ───────────────────────────────────

function makeBullet(id) {
  return {
    reference: id,
    levels: [{
      level: 0, format: LevelFormat.BULLET, text: "\u2022",
      alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } },
    }],
  };
}

function makeNumber(id) {
  return {
    reference: id,
    levels: [{
      level: 0, format: LevelFormat.DECIMAL, text: "%1.",
      alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } },
    }],
  };
}

const numberingConfig = [
  makeBullet("bl1"), makeBullet("bl2"), makeBullet("bl3"),
  makeBullet("bl4"), makeBullet("bl5"), makeBullet("bl6"),
  makeNumber("nl1"), makeNumber("nl2"),
];

// ── Content ─────────────────────────────────────

const content = [
  // ━━ 标题 ━━
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun("JoinAI Swarm Factory \u591A\u667A\u80FD\u4F53\u5E76\u884C\u89C6\u9891\u5236\u4F5C \u2014 \u5B8C\u6574\u5DE5\u4F5C\u6D41\u7A0B")],
  }),
  img("assets/cover.png"),

  // ━━ 概述 ━━
  h2("\u6982\u8FF0"),
  para("\u672C\u793A\u4F8B\u901A\u8FC7 JoinAI Swarm Factory \u7684\u591A\u667A\u80FD\u4F53\u5E76\u884C\u7F16\u6392\u80FD\u529B\uFF0C\u7531 AI \u603B\u8C03\u5EA6\uFF08Mayor\uFF09\u81EA\u52A8\u5B8C\u6210\u4EFB\u52A1\u62C6\u89E3\uFF0C\u540C\u65F6\u6D3E\u53D1 5 \u4E2A AI \u667A\u80FD\u4F53\u5E76\u884C\u6267\u884C\u8DE8\u6A21\u6001\u5185\u5BB9\u521B\u4F5C\u4EFB\u52A1\u2014\u2014\u6BCF\u4E2A\u667A\u80FD\u4F53\u72EC\u7ACB\u5B8C\u6210\u4EE3\u7801\u5E93\u7814\u7A76\u3001\u6982\u5FF5\u827A\u672F\u914D\u56FE\u751F\u6210\u3001\u89C6\u9891\u811A\u672C\u64B0\u5199\u3001Sora AI \u89C6\u9891\u7247\u6BB5\u751F\u6210\u7684\u5B8C\u6574\u6D41\u6C34\u7EBF\uFF0C\u6700\u7EC8\u7ECF\u81EA\u52A8\u62FC\u63A5\u548C\u5B57\u5E55\u70E7\u5F55\uFF0C\u4EA7\u51FA\u4E00\u6BB5 60 \u79D2\u7684\u4EA7\u54C1\u4ECB\u7ECD\u89C6\u9891\u3002\u5168\u8FC7\u7A0B\u65E0\u9700\u4EBA\u5DE5\u5E72\u9884\u3002"),

  // ━━ 示例背景 ━━
  h2("\u793A\u4F8B\u80CC\u666F"),
  para("\u672C\u8FD0\u884C\u793A\u4F8B\u4E3A JoinAI Swarm Factory\uFF08\u805A\u667A Gastown\uFF09\u5236\u4F5C\u4EA7\u54C1\u5DE5\u4F5C\u6D41\u7A0B\u4ECB\u7ECD\u89C6\u9891\uFF0C\u8986\u76D6 5 \u4E2A\u6838\u5FC3\u6982\u5FF5\uFF1ATown/Rig/Mayor \u667A\u80FD\u5C0F\u9547\u67B6\u6784\u3001Beads \u4EFB\u52A1\u8FFD\u8E2A\u7CFB\u7EDF\u3001Polecat \u5E76\u884C\u6267\u884C\u5F15\u64CE\u3001Convoy \u5DE5\u4F5C\u8FFD\u8E2A\u4E0E\u8C03\u5EA6\u3001Refinery \u5408\u5E76\u961F\u5217\u30027 \u4E2A\u667A\u80FD\u4F53\u8DE8\u8D8A\u591A\u79CD\u6A21\u6001\u2014\u2014\u4ECE\u6E90\u4EE3\u7801\u7814\u7A76\u5230 AI \u914D\u56FE\u751F\u6210\u3001\u89C6\u9891\u811A\u672C\u64B0\u5199\u3001Sora \u89C6\u9891\u5408\u6210\u3001ffmpeg \u62FC\u63A5\u4E0E\u5B57\u5E55\u70E7\u5F55\u2014\u2014\u6700\u7EC8\u4EA7\u51FA 5 \u5F20\u6982\u5FF5\u827A\u672F\u914D\u56FE\u30015 \u4E2A\u89C6\u9891\u811A\u672C\u30015 \u4E2A 12 \u79D2 AI \u89C6\u9891\u7247\u6BB5\u53CA 1 \u6BB5 60 \u79D2\u5E26\u5B57\u5E55\u7684\u5B8C\u6574\u4ECB\u7ECD\u89C6\u9891\u3002"),

  // ━━ 核心能力 ━━
  h2("\u6838\u5FC3\u80FD\u529B\uFF1A\u591A\u667A\u80FD\u4F53\u8DE8\u6A21\u6001\u5E76\u884C\u521B\u4F5C"),
  para("\u4F20\u7EDF\u65B9\u5F0F\u4E0B\uFF0C\u5355\u4E2A AI \u9700\u4F9D\u6B21\u5B8C\u6210 5 \u7EC4\u201C\u7814\u7A76 \u2192 \u914D\u56FE \u2192 \u811A\u672C \u2192 \u89C6\u9891\u201D\u521B\u4F5C\u6D41\u6C34\u7EBF\uFF0C\u518D\u4E32\u884C\u6267\u884C\u62FC\u63A5\u548C\u5B57\u5E55\u70E7\u5F55\uFF0C\u4E32\u884C\u8017\u65F6\u7EA6 3 \u5C0F\u65F6\u3002JoinAI Swarm Factory \u91C7\u7528\u4E09\u9636\u6BB5 Wave \u7F16\u6392\u67B6\u6784\uFF1AWave 1 \u540C\u65F6\u8C03\u5EA6 5 \u4E2A\u72EC\u7ACB\u667A\u80FD\u4F53\u5E76\u884C\u6267\u884C\u8DE8\u6A21\u6001\u521B\u4F5C\u6D41\u6C34\u7EBF\uFF0CWave 2 \u81EA\u52A8\u62FC\u63A5\u89C6\u9891\u7247\u6BB5\uFF0CWave 3 \u81EA\u52A8\u751F\u6210\u5B57\u5E55\u5E76\u70E7\u5F55\uFF0C\u5B9E\u9645\u8017\u65F6\u7EA6 1.5 \u5C0F\u65F6\uFF0C\u6548\u7387\u63D0\u5347\u7EA6 2 \u500D\u3002"),
  img("assets/illustrations/01-flowchart-wave-pipeline.png"),

  // ━━ 执行流程 ━━
  h2("\u6267\u884C\u6D41\u7A0B"),

  h3("\u9636\u6BB5\u4E00\uFF1A\u4EFB\u52A1\u4E0B\u53D1"),
  para("\u7528\u6237\u8FDE\u63A5\u81F3 Mayor\uFF08\u603B\u8C03\u5EA6 AI\uFF09\uFF0C\u63D0\u4EA4\u7ED3\u6784\u5316\u4EFB\u52A1\u8BF4\u660E\uFF0C\u5305\u62EC\uFF1A5 \u4E2A Gastown \u6838\u5FC3\u6982\u5FF5\u4E3B\u9898\u3001\u914D\u56FE\u89C4\u8303\uFF08\u7535\u5F71\u7EA7\u6982\u5FF5\u827A\u672F\u98CE\u683C\u30011280\u00D7720 \u5206\u8FA8\u7387\uFF09\u3001\u89C6\u9891\u811A\u672C\u683C\u5F0F\uFF083 \u573A\u666F \u00D7 12 \u79D2\uFF09\u3001Sora \u89C6\u9891\u751F\u6210\u53C2\u6570\u3001\u4E09\u9636\u6BB5 Wave \u4F9D\u8D56\u5173\u7CFB\u7B49\u3002\u4EFB\u52A1\u4E0B\u53D1\u540E\uFF0C\u540E\u7EED\u6D41\u7A0B\u7531\u7CFB\u7EDF\u81EA\u52A8\u9A71\u52A8\uFF0C\u65E0\u9700\u7528\u6237\u6301\u7EED\u53C2\u4E0E\u3002"),

  h3("\u9636\u6BB5\u4E8C\uFF1A\u73AF\u5883\u521D\u59CB\u5316"),
  para("Mayor \u63A5\u6536\u4EFB\u52A1\u540E\uFF0C\u81EA\u4E3B\u5B8C\u6210\u4EE5\u4E0B\u521D\u59CB\u5316\u5DE5\u4F5C\uFF1A"),
  bullet("\u521B\u5EFA\u9879\u76EE\u4ED3\u5E93\u5E76\u63A8\u9001\u81F3 GitHub", "bl1"),
  bullet("\u5C06\u4ED3\u5E93\u6CE8\u518C\u81F3 JoinAI Swarm Factory \u7BA1\u7406\u4F53\u7CFB", "bl1"),
  bullet("\u521B\u5EFA 7 \u4E2A\u4EFB\u52A1\u5DE5\u5355\uFF085 \u4E2A Wave 1 \u8DE8\u6A21\u6001\u521B\u4F5C + 1 \u4E2A Wave 2 \u89C6\u9891\u62FC\u63A5 + 1 \u4E2A Wave 3 \u5B57\u5E55\u70E7\u5F55\uFF09\uFF0C\u5E76\u5EFA\u7ACB Wave \u95F4\u4F9D\u8D56\u5173\u7CFB", "bl1"),
  bullet("\u90E8\u7F72 Convoy \u5DE5\u4F5C\u8FFD\u8E2A\u9762\u677F\uFF0C\u652F\u6301\u5B9E\u65F6\u8FDB\u5EA6\u76D1\u63A7", "bl1"),

  h3("\u9636\u6BB5\u4E09\uFF1A5 \u667A\u80FD\u4F53\u5E76\u884C\u8DE8\u6A21\u6001\u521B\u4F5C\uFF08Wave 1\uFF09"),
  para("Mayor \u540C\u65F6\u8C03\u5EA6 5 \u4E2A AI \u667A\u80FD\u4F53\uFF08Polecat\uFF09\uFF0C\u5404\u81EA\u8D1F\u8D23\u4E00\u4E2A\u6838\u5FC3\u6982\u5FF5\u4E3B\u9898\uFF1A"),
  bullet("\u667A\u80FD\u4F53 1 \u2014 Town/Rig/Crew/Mayor \u667A\u80FD\u5C0F\u9547\u67B6\u6784", "bl2"),
  bullet("\u667A\u80FD\u4F53 2 \u2014 Beads \u4EFB\u52A1\u8FFD\u8E2A\u7CFB\u7EDF", "bl2"),
  bullet("\u667A\u80FD\u4F53 3 \u2014 Polecat \u5E76\u884C\u6267\u884C\u5F15\u64CE", "bl2"),
  bullet("\u667A\u80FD\u4F53 4 \u2014 Convoy \u5DE5\u4F5C\u8FFD\u8E2A\u4E0E\u8C03\u5EA6", "bl2"),
  bullet("\u667A\u80FD\u4F53 5 \u2014 Refinery \u5408\u5E76\u961F\u5217", "bl2"),
  para("5 \u4E2A\u667A\u80FD\u4F53\u5404\u81EA\u8FD0\u884C\u4E8E\u72EC\u7ACB\u7684\u9694\u79BB\u5DE5\u4F5C\u7A7A\u95F4\uFF0C\u4E92\u4E0D\u5E72\u6270\uFF0C\u5E76\u884C\u63A8\u8FDB\u3002\u6BCF\u4E2A\u667A\u80FD\u4F53\u9700\u5B8C\u6210\u5B8C\u6574\u7684\u8DE8\u6A21\u6001\u521B\u4F5C\u6D41\u6C34\u7EBF\uFF1A"),
  num("**\u7814\u7A76**\uFF1A\u9605\u8BFB Gastown \u6E90\u4EE3\u7801\u548C\u6587\u6863\uFF0C\u7406\u89E3\u6240\u8D1F\u8D23\u6982\u5FF5\u7684\u6838\u5FC3\u673A\u5236", "nl1"),
  num("**\u914D\u56FE\u751F\u6210**\uFF1A\u64B0\u5199\u914D\u56FE\u63D0\u793A\u8BCD\uFF0C\u8C03\u7528 AI \u56FE\u7247\u751F\u6210\u5DE5\u5177\u4EA7\u51FA 1280\u00D7720 \u7535\u5F71\u7EA7\u6982\u5FF5\u827A\u672F\u914D\u56FE", "nl1"),
  num("**\u811A\u672C\u64B0\u5199**\uFF1A\u7F16\u5199 3 \u573A\u666F\u89C6\u9891\u811A\u672C\uFF0C\u5305\u542B\u4E2D\u6587\u65C1\u767D\u548C\u82F1\u6587 Sora \u89C6\u89C9\u63D0\u793A\u8BCD", "nl1"),
  num("**\u89C6\u9891\u751F\u6210**\uFF1A\u6574\u5408 Sora \u63D0\u793A\u8BCD\u4E0E\u4E2D\u6587\u65C1\u767D\uFF0C\u8C03\u7528 Sora \u751F\u6210 12 \u79D2\u89C6\u9891\u7247\u6BB5\uFF08\u542B\u4E2D\u6587\u8BED\u97F3\u89E3\u8BF4\uFF09", "nl1"),
  para("\u5B8C\u6210\u540E\u81EA\u52A8\u63D0\u4EA4\u6210\u679C\u3001\u6E05\u7406\u5DE5\u4F5C\u73AF\u5883\u5E76\u9000\u51FA\u3002"),

  h3("\u9636\u6BB5\u56DB\uFF1A\u89C6\u9891\u62FC\u63A5\uFF08Wave 2\uFF09"),
  para("\u7CFB\u7EDF\u5185\u7F6E\u4F9D\u8D56\u68C0\u67E5\u673A\u5236\u3002\u5F53 5 \u4E2A Wave 1 \u4EFB\u52A1\u5168\u90E8\u5B8C\u6210\u540E\uFF0C\u62FC\u63A5\u4EFB\u52A1\u81EA\u52A8\u89E3\u9664\u963B\u585E\u3002\u62FC\u63A5\u667A\u80FD\u4F53\u4F7F\u7528 ffmpeg \u5C06 5 \u4E2A 12 \u79D2\u89C6\u9891\u7247\u6BB5\u6309\u5E8F\u62FC\u63A5\u4E3A 60 \u79D2\u5B8C\u6574\u89C6\u9891\u3002"),

  h3("\u9636\u6BB5\u4E94\uFF1A\u5B57\u5E55\u70E7\u5F55\u4E0E\u5F52\u6863\uFF08Wave 3\uFF09"),
  para("Wave 2 \u5B8C\u6210\u540E\uFF0C\u5B57\u5E55\u4EFB\u52A1\u81EA\u52A8\u89E3\u9664\u963B\u585E\u3002\u5B57\u5E55\u667A\u80FD\u4F53\u4ECE 5 \u4E2A\u89C6\u9891\u811A\u672C\u4E2D\u63D0\u53D6\u4E2D\u6587\u65C1\u767D\uFF0C\u751F\u6210 SRT \u5B57\u5E55\u6587\u4EF6\uFF0C\u518D\u4F7F\u7528 ffmpeg \u70E7\u5F55\u786C\u5B57\u5E55\u5230\u6700\u7EC8\u89C6\u9891\u3002\u5168\u90E8 7 \u4E2A\u4EFB\u52A1\u6807\u8BB0\u5B8C\u6210\uFF0CConvoy \u5DE5\u4F5C\u8FFD\u8E2A\u9762\u677F\u5173\u95ED\uFF0C\u4EFB\u52A1\u81EA\u52A8\u5F52\u6863\u3002"),

  // ━━ 效率分析 ━━
  h2("\u6548\u7387\u5206\u6790"),
  img("assets/illustrations/02-comparison-parallel-vs-serial.png"),
  bullet("\u5E76\u884C\u5B9E\u9645\u8017\u65F6\uFF1A\u7EA6 1.5 \u5C0F\u65F6", "bl3"),
  bullet("\u4E32\u884C\u9884\u4F30\u8017\u65F6\uFF1A\u7EA6 3 \u5C0F\u65F6", "bl3"),
  bullet("\u6548\u7387\u63D0\u5347\uFF1A\u7EA6 2 \u500D", "bl3"),
  para("\u5B9E\u9645\u63D0\u5347\u4E3A 2 \u500D\u800C\u975E 5 \u500D\uFF0C\u539F\u56E0\u5728\u4E8E\uFF1A5 \u4E2A\u667A\u80FD\u4F53\u5171\u4EAB AI \u63A5\u53E3\u8C03\u7528\u914D\u989D\uFF08\u56FE\u7247\u751F\u6210\u548C Sora \u89C6\u9891\u751F\u6210\u5747\u6709\u901F\u7387\u9650\u5236\uFF09\uFF0CSora \u89C6\u9891\u751F\u6210\u662F\u4E3B\u8981\u8017\u65F6\u74F6\u9888\uFF08\u6BCF\u4E2A\u7247\u6BB5\u9700\u7B49\u5F85 30\u2013120 \u79D2\uFF09\uFF0C\u4E14 Wave 2 \u62FC\u63A5\u548C Wave 3 \u5B57\u5E55\u70E7\u5F55\u5FC5\u987B\u4E32\u884C\u6267\u884C\u3002"),

  // ━━ 交付成果 ━━
  h2("\u4EA4\u4ED8\u6210\u679C"),
  para("\u672C\u8FD0\u884C\u793A\u4F8B\u5171\u4EA7\u51FA\u4E09\u7C7B\u4EA4\u4ED8\u7269\uFF1A"),
  para("**5 \u5F20\u6982\u5FF5\u827A\u672F\u914D\u56FE**\uFF081280\u00D7720\uFF0C\u7535\u5F71\u7EA7\u6982\u5FF5\u827A\u672F\u98CE\u683C\uFF09\uFF1A"),
  bullet("Town/Rig/Mayor \u667A\u80FD\u5C0F\u9547\u67B6\u6784", "bl4"),
  bullet("Beads \u5168\u606F\u4EFB\u52A1\u770B\u677F", "bl4"),
  bullet("Polecat \u5E76\u884C\u6267\u884C\u5F15\u64CE", "bl4"),
  bullet("Convoy \u5DE5\u4F5C\u8FFD\u8E2A\u8F66\u961F", "bl4"),
  bullet("Refinery \u5408\u5E76\u8D28\u91CF\u95E8\u7981", "bl4"),
  para("**5 \u4E2A\u89C6\u9891\u811A\u672C + 5 \u4E2A Sora \u63D0\u793A\u8BCD**\uFF1A"),
  bullet("\u6BCF\u4E2A\u811A\u672C\u5305\u542B 3 \u4E2A\u573A\u666F\u300136 \u79D2\u4E2D\u6587\u65C1\u767D\u3001\u5BF9\u5E94\u7684\u82F1\u6587 Sora \u89C6\u89C9\u63D0\u793A\u8BCD", "bl5"),
  bullet("\u6BCF\u4E2A Sora \u63D0\u793A\u8BCD\u5305\u542B\u7EDF\u4E00\u98CE\u683C\u524D\u7F00\u3001\u573A\u666F\u63CF\u8FF0\u548C\u4E2D\u6587\u8BED\u97F3\u65C1\u767D", "bl5"),
  para("**\u89C6\u9891\u4EA7\u51FA\u7269**\uFF1A"),
  bullet("5 \u4E2A 12 \u79D2 AI \u89C6\u9891\u7247\u6BB5\uFF08Sora \u751F\u6210\uFF0C\u542B\u4E2D\u6587\u8BED\u97F3\u89E3\u8BF4\uFF09", "bl6"),
  bullet("1 \u4E2A 60 \u79D2\u5B8C\u6574\u62FC\u63A5\u89C6\u9891", "bl6"),
  bullet("1 \u4E2A\u5E26\u786C\u5B57\u5E55\u7684\u6700\u7EC8\u4EA4\u4ED8\u89C6\u9891", "bl6"),
  bullet("1 \u4E2A SRT \u5B57\u5E55\u6587\u4EF6", "bl6"),
  img("assets/illustrations/03-infographic-output-results.png"),

  // ━━ 总结 ━━
  h2("\u603B\u7ED3"),
  num("**\u8DE8\u6A21\u6001\u5185\u5BB9\u521B\u4F5C\u540C\u6837\u9002\u7528\u591A\u667A\u80FD\u4F53\u5E76\u884C**\u3002JoinAI Swarm Factory \u7684\u80FD\u529B\u4E0D\u5C40\u9650\u4E8E\u6587\u672C\u7814\u7A76\u6216\u6570\u636E\u5206\u6790\uFF0CAI \u914D\u56FE\u751F\u6210\u3001\u89C6\u9891\u811A\u672C\u64B0\u5199\u3001Sora \u89C6\u9891\u5408\u6210\u7B49\u591A\u6A21\u6001\u521B\u4F5C\u540C\u6837\u53EF\u901A\u8FC7\u591A\u667A\u80FD\u4F53\u5E76\u884C\u9AD8\u6548\u5B8C\u6210\u3002", "nl2"),
  num("**\u4E09\u9636\u6BB5 Wave \u7F16\u6392\u5B9E\u73B0\u590D\u6742\u4F9D\u8D56\u7BA1\u7406**\u3002Wave 1 \u5E76\u884C\u521B\u4F5C\u3001Wave 2 \u4E32\u884C\u62FC\u63A5\u3001Wave 3 \u4E32\u884C\u5B57\u5E55\u7684\u4E09\u9636\u6BB5\u6D41\u6C34\u7EBF\uFF0C\u5728\u4FDD\u8BC1\u4F9D\u8D56\u5173\u7CFB\u7684\u540C\u65F6\u6700\u5927\u5316\u5E76\u884C\u5EA6\uFF0C\u5C55\u793A\u4E86\u591A\u667A\u80FD\u4F53\u7F16\u6392\u5904\u7406\u590D\u6742\u5DE5\u4F5C\u6D41\u7684\u80FD\u529B\u3002", "nl2"),
  num("**AI \u5DE5\u5177\u94FE\u7684\u7AEF\u5230\u7AEF\u4E32\u8054**\u3002\u6BCF\u4E2A\u667A\u80FD\u4F53\u72EC\u7ACB\u5B8C\u6210\u4ECE\u4EE3\u7801\u5E93\u7814\u7A76\u5230\u914D\u56FE\u751F\u6210\u3001\u811A\u672C\u64B0\u5199\u518D\u5230 Sora \u89C6\u9891\u5408\u6210\u7684\u5B8C\u6574\u95ED\u73AF\uFF0C\u5C55\u793A\u591A\u79CD AI \u5DE5\u5177\uFF08\u56FE\u7247\u751F\u6210\u3001\u89C6\u9891\u751F\u6210\u3001ffmpeg \u97F3\u89C6\u9891\u5904\u7406\uFF09\u7684\u65E0\u7F1D\u534F\u4F5C\u3002", "nl2"),
  num("**\u5168\u6D41\u7A0B\u9AD8\u5EA6\u81EA\u52A8\u5316**\u3002\u4ECE\u4EFB\u52A1\u4E0B\u53D1\u5230\u6700\u7EC8\u5E26\u5B57\u5E55\u89C6\u9891\u4EA4\u4ED8\uFF0C7 \u4E2A\u667A\u80FD\u4F53\u81EA\u52A8\u534F\u4F5C\uFF0C\u65E0\u9700\u4EBA\u5DE5\u4ECB\u5165\u3002\u6BCF\u4E2A\u667A\u80FD\u4F53\u5B8C\u6210\u540E\u81EA\u52A8\u63D0\u4EA4\u6210\u679C\u3001\u6E05\u7406\u73AF\u5883\u3001\u9000\u51FA\u5DE5\u4F5C\u7A7A\u95F4\u3002", "nl2"),

  // ━━ 附录 ━━
  new Paragraph({ children: [new PageBreak()] }),

  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun("\u9644\u5F55\uFF1A\u521B\u4F5C\u6210\u679C")],
  }),
  para("\u4EE5\u4E0B\u4E3A\u672C\u8FD0\u884C\u793A\u4F8B\u4E2D AI \u667A\u80FD\u4F53\u81EA\u4E3B\u521B\u4F5C\u7684\u5B8C\u6574\u6210\u679C\uFF0C\u5305\u62EC 5 \u5F20\u6982\u5FF5\u827A\u672F\u914D\u56FE\u548C\u6700\u7EC8\u5E26\u5B57\u5E55\u7684\u4ECB\u7ECD\u89C6\u9891\u3002"),

  h2("\u6982\u5FF5\u827A\u672F\u914D\u56FE"),

  h3("Town/Rig/Mayor \u667A\u80FD\u5C0F\u9547\u67B6\u6784"),
  img("images/01-town-architecture.png"),

  h3("Beads \u4EFB\u52A1\u8FFD\u8E2A\u7CFB\u7EDF"),
  img("images/02-beads-tracking.png"),

  h3("Polecat \u5E76\u884C\u6267\u884C\u5F15\u64CE"),
  img("images/03-polecat-parallel.png"),

  h3("Convoy \u5DE5\u4F5C\u8FFD\u8E2A\u4E0E\u8C03\u5EA6"),
  img("images/04-convoy-tracking.png"),

  h3("Refinery \u5408\u5E76\u961F\u5217"),
  img("images/05-refinery-merge.png"),

  h2("\u6700\u7EC8\u89C6\u9891"),
  para("\u6700\u7EC8\u4EA7\u51FA\u4E3A\u4E00\u6BB5 60 \u79D2\u5E26\u4E2D\u6587\u786C\u5B57\u5E55\u7684\u4EA7\u54C1\u5DE5\u4F5C\u6D41\u7A0B\u4ECB\u7ECD\u89C6\u9891\uFF08final-joinai-intro-subtitled.mp4\uFF09\uFF0C\u7531 5 \u4E2A 12 \u79D2 AI \u89C6\u9891\u7247\u6BB5\u7ECF ffmpeg \u62FC\u63A5\u5E76\u70E7\u5F55 SRT \u5B57\u5E55\u540E\u751F\u6210\u3002\u89C6\u9891\u6587\u4EF6\u8BF7\u53C2\u89C1\u968F\u9644\u6750\u6599\u3002"),
];

// ── Document ────────────────────────────────────

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22 } },
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1",
        basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 360, after: 240 }, outlineLevel: 0 },
      },
      {
        id: "Heading2", name: "Heading 2",
        basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: "2B579A" },
        paragraph: { spacing: { before: 240, after: 180 }, outlineLevel: 1 },
      },
      {
        id: "Heading3", name: "Heading 3",
        basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 180, after: 120 }, outlineLevel: 2 },
      },
    ],
  },
  numbering: { config: numberingConfig },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "999999", space: 1 } },
          children: [new TextRun({
            text: "JoinAI Swarm Factory",
            font: "Arial", size: 18, color: "999999",
          })],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: "999999", space: 1 } },
          children: [new TextRun({
            children: [PageNumber.CURRENT],
            font: "Arial", size: 18, color: "999999",
          })],
        })],
      }),
    },
    children: content,
  }],
});

// ── Write ───────────────────────────────────────

Packer.toBuffer(doc).then((buf) => {
  const outPath = path.join(ROOT, OUT_FILE);
  fs.writeFileSync(outPath, buf);
  console.log("Written: " + OUT_FILE + " (" + (buf.length / 1024 / 1024).toFixed(1) + " MB)");
}).catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
