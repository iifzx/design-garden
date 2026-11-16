# 🌱 design-garden

English | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | **한국어** | [Español](README.es.md) | [Português](README.pt-BR.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md)

**성장하는 디자인 스킬.** AI 코딩 에이전트를 위한, 스스로 개선되는 범용 디자인 스킬 — UI, 포스터, 배너, 아이콘, 로고, 브랜드, 슬라이드, 데이터 시각화, 영상·모션, 일러스트, 타이포그래피, 디자인 리뷰까지 미학과 관련된 모든 작업을 다룹니다.

![CI](https://github.com/iifzx/design-garden/actions/workflows/validate.yml/badge.svg)
![styles](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.styles&label=style%20recipes&color=2E7D32)
![domains](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.domains&label=domains&color=2E7D32)
![learnings](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.learnings&label=learnings%20files&color=A98A3D)

> 🌻 **AI 도구가 처음이신가요?** 코드 없이 설치·사용·기여까지 할 수 있습니다: **[초보자 가이드（中文）](docs/start-here.zh-CN.md)** · English: [Start Here](docs/start-here.md)

대부분의 에이전트용 "디자인 스킬"은 얼어붙은 프롬프트 묶음입니다: 첫날은 강해도 서른 날 뒤엔 낡고, 언제나 저자 한 사람의 취향에 머무릅니다. **design-garden은 '먹여 키우는' 존재로 설계되었습니다** — 여러분의 일상 디자인 작업과, 커뮤니티에 의해. 이 스킬은 디자인 작업을 수행하기만 하는 게 아니라, **수행한 모든 작업에서 배웁니다**.

## 무엇을 만들어내는가

아래는 모두 skill이 자체 평가 과제를 실행해 만들어낸 실물입니다 — 각 작업은 전체 워크플로(크리틱 게이트 포함)를 통과했습니다. 자세한 내용은 [examples/](examples/README.md)(게이트가 잡아낸 문제 목록 포함).

| | | |
|---|---|---|
| <img src="examples/images/bike-shop-hero.png" width="270" alt="자전거 수리점 랜딩 페이지"> | <img src="examples/images/jazz-poster.png" width="270" alt="재즈 카페 개관 포스터"> | <img src="examples/images/icon-sheet.png" width="270" alt="식물 관리 앱 아이콘 세트"> |
| 랜딩 페이지([모바일 375px](examples/images/bike-shop-mobile.png)) | 개관 포스터 1080×1350 | 아이콘 세트, 16/24/48 익스포트 래더 |

*생성 모델: **GLM-5.3-Flash** — 샘플별 모델 표기는 [examples/README.md](examples/README.md) 참조.*

## 무엇이 다른가: 네 가지 성장 루프

1. **① 런타임 자기 학습** — 작업이 끝날 때마다 구조화된 학습 항목을 `learnings/<domain>.md`에 추가합니다. 재설치 없이도, 쓸수록 당신에게 맞게 강해집니다
2. **② 커뮤니티 기여** — 지식 = 작은 모듈 파일. PR 하나 = 스타일 레시피·기법·케이스 스터디 하나
3. **③ 평가 게이트 승급(팽창 방지)** — 새 지식은 `experimental`로 착지해 명시적 매칭 때만 로드되고, 블라인드 A/B 평가에서 이겨야 `proven`으로 승급합니다
4. **④ 버전화된 학습** — 각 릴리스의 CHANGELOG에는 "이 버전에서 무엇을 배웠는지"가 기록됩니다. 성장이 읽힙니다

```
 ① 각 작업 → learnings/에 경험 축적
        ↓ (일반화 가능한 항목은 상류로 PR)
 ② 커뮤니티 PR이 knowledge/에 추가
        ↓ (새 지식은 experimental)
 ③ 블라인드 A/B 승리 → proven 승급
        ↓
 ④ CHANGELOG가 "배운 것"을 기록
```

## 안에 무엇이 있는가

```
SKILL.md                  라우터 + 8단계 워크플로(≤500줄 — 안정적인 핵)
knowledge/
  core/                   공용 모듈: 원칙 · 색채 · 타이포그래피 · 레이아웃 · 모션 · anti-slop
  domains/                9개 도메인: ui-web · ui-mobile · 포스터/배너 · 아이콘 · 로고/브랜드 ·
                          슬라이드 · 데이터 비즈 · 영상/모션 · 일러스트(각 크리틱 체크리스트 포함)
  styles/                 18개 스타일 레시피(스위스, 바우하우스, 네오 브루탈리즘, 글래스모피즘,
                          다크 테크, Y2K, 자판디, 멤피스…) — 각각 한 파일
  case-studies/           전/후 비교와 그 추론
learnings/                스킬의 필드 노트 — 씨앗에서 시작해 작업마다 자랍니다
evals/                    함정이 심어진 벤치마크 + 루브릭 + 블라인드 A/B 도구
scripts/                  validate_knowledge.mjs(CI 게이트) · ab_harness.mjs(블라인드 평가 페이지)
```

라우터는 `knowledge/INDEX.md`를 읽고 작업당 **최대 약 7개 파일**만 로드합니다 — **불어나지 않고 자랍니다**. 워크플로 자체는 에이전트 디자인 실천의 가장 강력한 프로세스 사상의 증류물입니다: **3방향 딜링**, **형식의 다섯 질문**, 라운드당 가장 치명적인 3가지만 고치는 **크리틱 게이트**, 3개 소스가 독립적으로 수렴한 **anti-slop 목록**. 자세한 내용은 [SOURCES.md](SOURCES.md).

## 설치

SKILL.md 규약을 지원하는 모든 에이전트에서 작동합니다(ZCode, Claude Code 등):

```bash
# 사용자 수준(모든 프로젝트)
git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden

# 또는 프로젝트 수준
git clone https://github.com/iifzx/design-garden.git <project>/.zcode/skills/design-garden
```

빌드 불필요, 의존성 없음 — markdown과 선택적인 Node 스크립트 2개(표준 라이브러리만)가 전부입니다.

## 사용법

그냥 디자인을 부탁하세요. 미학과 관련된 것이면 무엇이든 트리거됩니다:

- "동네 빵집 오픈 포스터 만들어 줘" → 3개의 아트 디렉션을 딜하고, 가장 강한 것을 실행·크리틱·전달·학습 기록
- "식물 관리 앱 아이콘 세트 디자인해 줘" → 키라인 그리드, 광학 보정, 실루엣 테스트
- "이 포스터 뭔가 이상한데 — 뭐가 문제야?" → 리뷰 우선 모드, 도메인 체크리스트, 피해 순 수정 제안
- "랜딩 페이지 + 슬라이드 템플릿 한 세트" → 두 도메인 라우팅, 양쪽에서 학습

## 기여하기

**정원은 작은 PR로 자랍니다.** 스타일 레시피 추가, 자신의 사용 경험 보고, 평가 실행으로 experimental 규칙 승급. 전체 절차는 [CONTRIBUTING.md](CONTRIBUTING.md) — 요약: 포크 후 스키마에 맞는 **작은 파일 하나**(또는 학습 항목 하나) 추가, `node scripts/validate_knowledge.mjs` 통과(CI가 강제), PR 제출. 커뮤니티 지식은 `experimental`로 시작해 블라인드 A/B 평가에서 이기면 `proven`이 됩니다 — 성장은 **검증됩니다**.

## 다국어

영어가 기본 버전입니다(지식 파일과 트리거 어휘는 모델 안정성을 위해 영어 유지). 번역:

- 简体中文: [README.zh-CN.md](README.zh-CN.md) · 繁體中文: [README.zh-TW.md](README.zh-TW.md)
- 日本語: [README.ja.md](README.ja.md) · 한국어: [README.ko.md](README.ko.md) (이 파일)
- Español: [README.es.md](README.es.md) · Português: [README.pt-BR.md](README.pt-BR.md)
- Français: [README.fr.md](README.fr.md) · Deutsch: [README.de.md](README.de.md) · Русский: [README.ru.md](README.ru.md)

언어를 추가하려면 [CONTRIBUTING.md](CONTRIBUTING.md)의 "Translations" 섹션을 참조하세요.

## 라이선스 & 크레딧

MIT — [LICENSE](LICENSE) 참조. 17개 디자인 스킬과 디자인 분야의 공유 크래프트 정전을 증류하여 씨앗을 심었습니다. 전체 크레딧은 [SOURCES.md](SOURCES.md).

🌱 *정원의 가치는 무엇을 키웠는지로 판단합니다.*
