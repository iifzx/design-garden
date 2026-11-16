# 🌱 design-garden

English | [简体中文](README.zh-CN.md) | **繁體中文** | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Português](README.pt-BR.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md)

**會成長的設計 skill。** 一個給 AI 編程 agent 使用的、會自我改進的通用設計 skill——涵蓋所有與美學相關的工作：UI、海報橫幅、圖示、logo 品牌、簡報、資料視覺化、影片動態、插畫、字型排版與設計評審。

![CI](https://github.com/iifzx/design-garden/actions/workflows/validate.yml/badge.svg)
![styles](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.styles&label=style%20recipes&color=2E7D32)
![domains](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.domains&label=domains&color=2E7D32)
![learnings](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.learnings&label=learnings%20files&color=A98A3D)

> 🌻 **完全沒接觸過 AI 工具？** 不用寫程式就能安裝、使用、甚至幫上忙：**[新手指南](docs/start-here.zh-CN.md)**（简体）· English: [Start Here](docs/start-here.md)

大多數 agent「設計 skill」是凍結的 prompt 包：第一天很強、第三十天就過時，而且永遠只是單一作者的品味。**design-garden 被設計來「被餵養」**——被你的日常設計工作餵養，被社群餵養。它不只執行設計任務；它**從自己跑過的每個任務中學習**。

## 它能做出什麼

以下是 skill 跑自己評測任務產出的真實作品——每一件都走完完整工作流（含評審門）。更多見 [examples/](examples/README.md)（含評審門抓到的問題清單）。

| | | |
|---|---|---|
| <img src="examples/images/bike-shop-hero.png" width="270" alt="自行車店落地頁首屏"> | <img src="examples/images/jazz-poster.png" width="270" alt="爵士咖啡店開業海報"> | <img src="examples/images/icon-sheet.png" width="270" alt="植物養護圖示集校驗頁"> |
| 落地頁（[行動版 375px](examples/images/bike-shop-mobile.png)） | 開業海報 1080×1350 | 圖示集，16/24/48 匯出階梯 |

*由 **GLM-5.3-Flash** 生成——每個範例的模型署名見 [examples/README.md](examples/README.md)。*

## 為什麼不同：四條成長循環

1. **① 執行時自我學習** —— 每個任務結束，自動把一條結構化經驗追加到 `learnings/<領域>.md`：對你個人來說，裝上就越用越強，不用重裝
2. **② 社群貢獻** —— 知識 = 小而模組化的檔案。一次 PR = 一條新風格配方 / 領域技法 / 案例
3. **③ 評測門晉升（防膨脹）** —— 新知識以 `experimental` 狀態落地（僅在明確匹配時載入），必須贏得盲測對比才能升為 `proven`
4. **④ 版本化學習** —— 每個版本的 CHANGELOG 都寫明「這個版本學會了什麼」——成長是可閱讀的

```
 ① 每次任務 → learnings/ 沉澱經驗
        ↓（可泛化的條目被 PR 回上游）
 ② 社群 PR 加入 knowledge/
        ↓（新知識標 experimental）
 ③ 盲評 A/B 勝出 → 晉升 proven
        ↓
 ④ CHANGELOG 記錄「學會了什麼」
```

## 裡面有什麼

```
SKILL.md                  路由器 + 8 步工作流（≤500 行——穩定的核心）
knowledge/
  core/                   通用模組：原則 · 色彩 · 字型排印 · 版式 · 動效 · anti-slop 黑名單
  domains/                9 大領域：ui-web · ui-mobile · 海報橫幅 · 圖示 · logo 品牌 ·
                          簡報 · 資料視覺化 · 影片動態 · 插畫藝術（各帶評審清單）
  styles/                 18 個風格配方（瑞士、包浩斯、新粗野、玻璃擬態、暗黑科技、
                          Y2K、日式侘寂、孟菲斯……）——每個都是一個小檔案
  case-studies/           改造前後對比 + 推理過程
learnings/                skill 的田野筆記——有種子起步，隨每個任務生長
evals/                    帶陷阱的基準任務 + 評分標準 + 盲評 A/B 工具
scripts/                  validate_knowledge.mjs（CI 門禁）· ab_harness.mjs（盲評頁）
```

路由器讀 `knowledge/INDEX.md`，每個任務**最多載入約 7 個檔案**——**成長而不膨脹**。工作流本身蒸餾自 agent 設計實務中最強的過程模式：**三方向發牌**、**形式五問**、每輪只修最傷 3 個問題的**評審門**，以及三源獨立收斂合併的權威 **anti-slop 清單**。詳見 [SOURCES.md](SOURCES.md)。

## 安裝

適用於任何支援 SKILL.md 約定的 agent（ZCode、Claude Code 及相容 CLI）：

```bash
# 使用者層級（所有專案生效）
git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden

# 或專案層級
git clone https://github.com/iifzx/design-garden.git <你的專案>/.zcode/skills/design-garden
```

無建置步驟、無依賴——就是 markdown 加兩個選用的 Node 腳本（僅標準庫）。

## 用起來

直接說設計就行，skill 會被任何美學任務觸發：

- 「幫我做一張寵物咖啡廳的開幕海報」→ 先發牌 3 個藝術方向，執行最強的，評審，交付，記錄
- 「給植栽 app 設計一套圖示」→ keyline 網格、光學修正、剪影測試
- 「這張圖怪怪的——幫我看問題在哪」→ 評審優先模式，跑領域清單，按傷害排序給修法
- 「落地頁 + 一套簡報模板」→ 雙領域路由，雙域學習

## 參與貢獻

**花園靠小 PR 生長。** 加一條風格配方、報告一條你使用中的經驗，或跑一次評測把實驗規則轉正。全部流程見 [CONTRIBUTING.md](CONTRIBUTING.md)——簡版：Fork，加**一個小檔案**（按 schema），`node scripts/validate_knowledge.mjs` 通過（CI 強制），提 PR。社群知識以 `experimental` 起步，贏下盲評 A/B 後轉 `proven`——成長是**被驗證的**。

## 多語言

英文是主版本（知識檔案與觸發詞對模型最穩）。翻譯隨行：

- 简体中文: [README.zh-CN.md](README.zh-CN.md)
- 繁體中文: [README.zh-TW.md](README.zh-TW.md)（本檔）
- 日本語: [README.ja.md](README.ja.md) · 한국어: [README.ko.md](README.ko.md)
- Español: [README.es.md](README.es.md) · Português: [README.pt-BR.md](README.pt-BR.md)
- Français: [README.fr.md](README.fr.md) · Deutsch: [README.de.md](README.de.md) · Русский: [README.ru.md](README.ru.md)

想新增語言？見 [CONTRIBUTING.md](CONTRIBUTING.md) 的 "Translations" 一節。

## 授權與致謝

MIT——見 [LICENSE](LICENSE)。由 17 個設計 skill 與設計行業共有工藝準則蒸餾播種；完整致謝見 [SOURCES.md](SOURCES.md)。

🌱 *花園好不好，看它長出了什麼。*
