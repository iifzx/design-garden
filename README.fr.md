# 🌱 design-garden

English | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Português](README.pt-BR.md) | **Français** | [Deutsch](README.de.md) | [Русский](README.ru.md)

**Le skill de design qui grandit.** Un skill de design universel et auto-amélioré pour les agents de code IA — couvre tout ce qui touche à l'esthétique : UI, affiches, bannières, icônes, logos, identité de marque, slides, visualisation de données, vidéo et motion, illustration, typographie et critique de design.

![CI](https://github.com/iifzx/design-garden/actions/workflows/validate.yml/badge.svg)
![styles](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.styles&label=style%20recipes&color=2E7D32)
![domains](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.domains&label=domains&color=2E7D32)
![learnings](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.learnings&label=learnings%20files&color=A98A3D)

> 🌻 **Nouveau avec les outils IA ?** Installez, utilisez et contribuez sans écrire de code : **[Guide débutant（中文）](docs/start-here.zh-CN.md)** · English: [Start Here](docs/start-here.md)

La plupart des « skills de design » pour agents sont des paquets de prompts figés : forts le premier jour, dépassés le trentième, et toujours au goût d'un seul auteur. **design-garden est conçu pour être nourri** — par votre travail de design quotidien et par la communauté. Il ne se contente pas d'exécuter des tâches de design ; **il apprend de chaque tâche qu'il exécute**.

## Ce qu'il produit

Tout ce qui suit a été produit par le skill exécutant ses propres briefs d'évaluation — chaque pièce a traversé le flux complet (porte de critique incluse). Plus dans [examples/](examples/README.md), avec les corrections que la porte a attrapées.

| | | |
|---|---|---|
| <img src="examples/images/bike-shop-hero.png" width="270" alt="Landing d'atelier de vélos"> | <img src="examples/images/jazz-poster.png" width="270" alt="Affiche d'ouverture d'un café jazz"> | <img src="examples/images/icon-sheet.png" width="270" alt="Set d'icônes d'app de plantes"> |
| Landing page — [mobile 375px](examples/images/bike-shop-mobile.png) | Affiche d'ouverture, 1080×1350 | Set d'icônes avec export 16/24/48 |

*Généré avec **GLM-5.3-Flash** — attribution de modèle par exemple dans [examples/README.md](examples/README.md).*

## Pourquoi c'est différent : quatre boucles de croissance

1. **① Auto-apprentissage à l'exécution** — chaque tâche ajoute une entrée structurée à `learnings/<domain>.md` : il s'améliore pour VOUS à chaque usage, sans réinstaller
2. **② Contributions communautaires** — la connaissance = petits fichiers modulaires. Un PR = une recette de style / une technique / une étude de cas
3. **③ Promotion par évaluation (anti-encombrement)** — le nouveau savoir arrive en `experimental`, ne charge que sur match explicite, et passe `proven` seulement après avoir gagné une évaluation A/B à l'aveugle
4. **④ Apprentissage versionné** — le CHANGELOG de chaque version dit ce que le jardin a APPRIS : une croissance qu'on peut lire

```
 ① chaque tâche → apprentissages dans learnings/
        ↓ (les entrées généralisables remontent par PR)
 ② les PR de la communauté nourrissent knowledge/
        ↓ (le nouveau savoir marque experimental)
 ③ gagne l'A/B à l'aveugle → promu proven
        ↓
 ④ le CHANGELOG enregistre ce qui a été appris
```

## Ce qu'il y a dedans

```
SKILL.md                  routeur + flux de 8 étapes (≤500 lignes — le cœur stable)
knowledge/
  core/                   modules universels : principes · couleur · typographie · layout · motion · anti-slop
  domains/                9 domaines : ui-web · ui-mobile · affiche/bannière · icônes · logo/marque ·
                          slides · data-viz · vidéo/motion · illustration (avec checklist de critique)
  styles/                 18 recettes de style (suisse, bauhaus, néo-brutalisme, glassmorphisme,
                          dark-tech, y2k, japandi, memphis…) — un petit fichier chacune
  case-studies/           avant/après avec raisonnement
learnings/                notes de terrain du skill — semé au départ, grandit à chaque tâche
evals/                    briefs de référence avec pièges + grille + harness A/B à l'aveugle
scripts/                  validate_knowledge.mjs (porte CI) · ab_harness.mjs (pages d'évaluation à l'aveugle)
```

Le routeur lit `knowledge/INDEX.md` et ne charge jamais plus de ~7 fichiers par tâche — **grandir sans gonfler**. Le flux lui-même distille les idées de processus les plus solides de la pratique du design par agents : un **deal à trois directions**, les **cinq questions de forme**, une **porte de critique** qui ne corrige que les 3 problèmes les plus dommageables par tour, et une liste **anti-slop** canonique fusionnée de trois sources convergentes indépendantes. Voir [SOURCES.md](SOURCES.md).

## Installation

Fonctionne avec tout agent qui suit la convention SKILL.md (ZCode, Claude Code et CLIs compatibles) :

```bash
# niveau utilisateur (tous les projets)
git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden

# ou niveau projet
git clone https://github.com/iifzx/design-garden.git <votre-projet>/.zcode/skills/design-garden
```

Sans build, sans dépendances — du markdown plus deux scripts Node optionnels (stdlib uniquement).

## Utilisation

Demandez simplement du design. Le skill se déclenche sur tout ce qui touche à l'esthétique :

- « Fais l'affiche d'ouverture d'un café de quartier » → propose 3 directions, exécute la plus forte, critique, livre, enregistre ce qu'il a appris
- « Dessine un set d'icônes pour une app de plantes » → grilles keyline, corrections optiques, tests de silhouette
- « Cette affiche est bizarre — review » → mode critique d'abord, checklist du domaine, corrections classées par dommage
- « Landing page + un template de slides » → route les deux domaines, apprend des deux

## Contribuer

**Le jardin grandit par petits PR.** Ajoutez une recette de style, signalez un apprentissage tiré de votre usage, ou lancez une évaluation pour promouvoir une règle expérimentale. Tout est dans [CONTRIBUTING.md](CONTRIBUTING.md) — la version courte : fork, ajoutez **un petit fichier** suivant le schéma, `node scripts/validate_knowledge.mjs` doit passer (CI l'exige), ouvrez le PR. Le savoir communautaire commence `experimental` et devient `proven` en gagnant une évaluation A/B à l'aveugle — la croissance est **vérifiée**.

## Traductions

L'anglais est la version principale — le contenu du skill (SKILL.md, knowledge) et son vocabulaire de déclenchement restent en anglais pour la fiabilité des modèles. Les traductions communautaires vivent à côté :

- 简体中文: [README.zh-CN.md](README.zh-CN.md) · 繁體中文: [README.zh-TW.md](README.zh-TW.md)
- 日本語: [README.ja.md](README.ja.md) · 한국어: [README.ko.md](README.ko.md)
- Español: [README.es.md](README.es.md) · Português: [README.pt-BR.md](README.pt-BR.md)
- Français: [README.fr.md](README.fr.md) (ce fichier) · Deutsch: [README.de.md](README.de.md) · Русский: [README.ru.md](README.ru.md)

Pour ajouter une langue, voir la section [Translations](CONTRIBUTING.md#translations) de CONTRIBUTING.md.

## Licence & crédits

MIT — voir [LICENSE](LICENSE). Semé en distillant 17 skills de design et le canon partagé du métier ; crédits complets dans [SOURCES.md](SOURCES.md).

🌱 *Les jardins se jugent à ce qu'ils font pousser.*
