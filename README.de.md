# 🌱 design-garden

English | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Português](README.pt-BR.md) | [Français](README.fr.md) | **Deutsch** | [Русский](README.ru.md)

**Der Design-Skill, der wächst.** Ein universeller, sich selbst verbessernder Design-Skill für KI-Coding-Agenten — deckt alles Ästhetische ab: UI, Plakate, Banner, Icons, Logos, Markenidentität, Slides, Datenvisualisierung, Video & Motion, Illustration, Typografie und Design-Kritik.

![CI](https://github.com/iifzx/design-garden/actions/workflows/validate.yml/badge.svg)
![styles](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.styles&label=style%20recipes&color=2E7D32)
![domains](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.domains&label=domains&color=2E7D32)
![learnings](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.learnings&label=learnings%20files&color=A98A3D)

> 🌻 **Neu bei KI-Tools?** Installieren, nutzen und beitragen — ganz ohne Code: **[Einsteiger-Guide（中文）](docs/start-here.zh-CN.md)** · English: [Start Here](docs/start-here.md)

Die meisten „Design-Skills" für Agenten sind eingefrorene Prompt-Pakete: am ersten Tag stark, am dreißigsten veraltet, und immer mit dem Geschmack eines einzigen Autors. **design-garden ist gebaut, um gefüttert zu werden** — durch deine tägliche Design-Arbeit und durch die Community. Er führt Design-Aufgaben nicht nur aus; er **lernt aus jeder Aufgabe, die er ausführt**.

## Was er produziert

Alles unten stammt aus dem Skill, der seine eigenen Eval-Briefs ausführt — jedes Stück hat den vollen Workflow durchlaufen (inklusive Kritik-Gate). Mehr in [examples/](examples/README.md), mit den Korrekturen, die das Gate gefunden hat.

| | | |
|---|---|---|
| <img src="examples/images/bike-shop-hero.png" width="270" alt="Landing eines Fahrradladens"> | <img src="examples/images/jazz-poster.png" width="270" alt="Eröffnungsplakat eines Jazz-Cafés"> | <img src="examples/images/icon-sheet.png" width="270" alt="Icon-Set einer Pflanzenpflege-App"> |
| Landing page — [mobil 375px](examples/images/bike-shop-mobile.png) | Eröffnungsplakat, 1080×1350 | Icon-Set mit 16/24/48-Exportleiter |

*Generiert mit **GLM-5.3-Flash** — Modell-Zuordnung pro Beispiel in [examples/README.md](examples/README.md).*

## Warum er anders ist: vier Wachstums-Loops

1. **① Selbstlernen zur Laufzeit** — jede Aufgabe hängt einen strukturierten Eintrag an `learnings/<domain>.md`: er wird mit jeder Nutzung besser für DICH, ohne Neuinstallation
2. **② Community-Beiträge** — Wissen = kleine, modulare Dateien. Ein PR = ein Style-Rezept / eine Technik / eine Fallstudie
3. **③ Eval-geführte Beförderung (anti-bloat)** — neues Wissen landet als `experimental`, lädt nur bei explizitem Match und wird erst `proven`, nachdem es ein blindes A/B-Eval gewonnen hat
4. **④ Versioniertes Lernen** — das CHANGELOG jeder Version sagt, was der Garten GELERNT hat: Wachstum, das man lesen kann

```
 ① jede Aufgabe → Lernergebnisse in learnings/
        ↓ (verallgemeinerbare Einträge werden upstream gePR't)
 ② Community-PRs füttern knowledge/
        ↓ (neues Wissen markiert experimental)
 ③ gewinnt das blinde A/B → befördert zu proven
        ↓
 ④ das CHANGELOG hält fest, was gelernt wurde
```

## Was drin steckt

```
SKILL.md                  Router + 8-Schritte-Workflow (≤500 Zeilen — der stabile Kern)
knowledge/
  core/                   universelle Module: Prinzipien · Farbe · Typografie · Layout · Motion · Anti-Slop
  domains/                9 Domänen: ui-web · ui-mobile · Plakat/Banner · Icons · Logo/Brand ·
                          Slides · Data-Viz · Video/Motion · Illustration (je mit Kritik-Checkliste)
  styles/                 18 Style-Rezepte (Swiss, Bauhaus, Neo-Brutalismus, Glassmorphismus,
                          Dark-Tech, Y2K, Japandi, Memphis…) — je eine kleine Datei
  case-studies/           Vorher/Nachher mit Begründung
learnings/                die Feldnotizen des Skills — startet gesät, wächst mit jeder Aufgabe
evals/                    Benchmark-Briefs mit Fallen + Rubrik + Blind-A/B-Harness
scripts/                  validate_knowledge.mjs (CI-Gate) · ab_harness.mjs (blinde Eval-Seiten)
```

Der Router liest `knowledge/INDEX.md` und lädt nie mehr als ~7 Dateien pro Aufgabe — **wachsen ohne aufzublähen**. Der Workflow selbst ist eine Destillation der stärksten Prozessideen der Design-Praxis mit Agenten: ein **Drei-Richtungen-Deal**, die **fünf Form-Fragen**, ein **Kritik-Gate**, das pro Runde nur die 3 schädlichsten Probleme behebt, und eine kanonische **Anti-Slop-Liste**, aus drei unabhängig konvergenten Quellen zusammengeführt. Siehe [SOURCES.md](SOURCES.md).

## Installation

Funktioniert mit jedem Agenten, der der SKILL.md-Konvention folgt (ZCode, Claude Code und kompatible CLIs):

```bash
# Benutzerebene (alle Projekte)
git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden

# oder Projektebene
git clone https://github.com/iifzx/design-garden.git <dein-projekt>/.zcode/skills/design-garden
```

Kein Build, keine Abhängigkeiten — Markdown plus zwei optionale Node-Skripte (nur Standardbibliothek).

## Benutzen

Fordere einfach Design an. Der Skill trigert auf alles Ästhetische:

- „Mach ein Plakat für die Eröffnung eines Café im Viertel“ → dealt 3 Richtungen, führt die stärkste aus, kritisiert, liefert, hält fest, was es gelernt hat
- „Entwirf ein Icon-Set für eine Pflanzenpflege-App“ → Keyline-Raster, optische Korrekturen, Silhouetten-Tests
- „Dieses Plakat wirkt komisch — review“ → Kritik-zuerst-Modus, Domain-Checkliste, Fixes nach Schaden sortiert
- „Landing page + ein Slide-Template“ → routet beide Domänen, lernt von beiden

## Beitragen

**Der Garten wächst mit kleinen PRs.** Füge ein Style-Rezept hinzu, melde ein Lernergebnis aus deinem eigenen Gebrauch, oder führe ein Eval durch, um eine experimentelle Regel zu befördern. Alles in [CONTRIBUTING.md](CONTRIBUTING.md) — die Kurzfassung: fork, füge **eine kleine Datei** nach dem Schema hinzu (oder einen Learning-Eintrag), `node scripts/validate_knowledge.mjs` muss bestehen (CI erzwingt es), PR öffnen. Community-Wissen startet `experimental` und wird `proven`, indem es ein blindes A/B-Eval gewinnt — Wachstum ist **verifiziert**, nicht nur angesammelt.

## Übersetzungen

Englisch ist die primäre Version — der Skill-Inhalt (SKILL.md, knowledge) und sein Trigger-Vokabular bleiben aus Modell-Zuverlässigkeit englisch. Community-Übersetzungen leben daneben:

- 简体中文: [README.zh-CN.md](README.zh-CN.md) · 繁體中文: [README.zh-TW.md](README.zh-TW.md)
- 日本語: [README.ja.md](README.ja.md) · 한국어: [README.ko.md](README.ko.md)
- Español: [README.es.md](README.es.md) · Português: [README.pt-BR.md](README.pt-BR.md)
- Français: [README.fr.md](README.fr.md) · Deutsch: [README.de.md](README.de.md) (diese Datei) · Русский: [README.ru.md](README.ru.md)

Um eine Sprache hinzuzufügen, siehe [Translations](CONTRIBUTING.md#translations) in CONTRIBUTING.md.

## Lizenz & Credits

MIT — siehe [LICENSE](LICENSE). Gepflanzt durch Destillation von 17 Design-Skills und dem gemeinsamen Handwerkskanon; vollständige Credits in [SOURCES.md](SOURCES.md).

🌱 *Gärten beurteilt man nach dem, was sie wachsen lassen.*
