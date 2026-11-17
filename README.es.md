# 🌱 design-garden

English | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | **Español** | [Português](README.pt-BR.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md)

**El skill de diseño que crece.** Un skill de diseño universal y auto-mejorable para agentes de código con IA — cubre todo lo que tiene que ver con la estética: UI, pósters, banners, iconos, logos, identidad de marca, slides, visualización de datos, vídeo y motion, ilustración, tipografía y crítica de diseño.

![CI](https://github.com/iifzx/design-garden/actions/workflows/validate.yml/badge.svg)
![styles](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.styles&label=style%20recipes&color=2E7D32)
![domains](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.domains&label=domains&color=2E7D32)
![learnings](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.learnings&label=learnings%20files&color=A98A3D)

> 🌻 **¿Nuevo en herramientas de IA?** Instala, usa y contribuye sin escribir código: **[Guía para principiantes（中文）](docs/start-here.zh-CN.md)** · English: [Start Here](docs/start-here.md)

La mayoría de los "skills de diseño" para agentes son paquetes de prompts congelados: fuertes el primer día, obsoletos al trigésimo, y siempre con el gusto de un solo autor. **design-garden está construido para ser alimentado** — por tu trabajo diario de diseño y por la comunidad. No solo ejecuta tareas de diseño; **aprende de cada tarea que ejecuta**.

## Lo que produce

Todo lo de abajo fue producido por el skill ejecutando sus propias tareas de evaluación — cada pieza pasó por el flujo de trabajo completo (incluida la puerta de crítica). Más en [examples/](examples/README.md), con las correcciones que la puerta detectó.

| | | |
|---|---|---|
| <img src="examples/images/bike-shop-hero.png" width="270" alt="Landing de taller de bicicletas"> | <img src="examples/images/jazz-poster.png" width="270" alt="Póster de inauguración de café de jazz"> | <img src="examples/images/icon-sheet.png" width="270" alt="Set de iconos de app de plantas"> |
| Landing page — [móvil 375px](examples/images/bike-shop-mobile.png) | Póster de inauguración, 1080×1350 | Set de iconos con exportación 16/24/48 |

*Generado con **GLM-5.3-Flash** — atribución de modelo por ejemplo en [examples/README.md](examples/README.md).*

## Por qué es diferente: cuatro bucles de crecimiento

1. **① Autoaprendizaje en ejecución** — cada tarea añade una entrada estructurada a `learnings/<domain>.md`: mejora para TI con cada uso, sin reinstalar
2. **② Contribuciones de la comunidad** — el conocimiento son archivos pequeños y modulares. Un PR = una receta de estilo / técnica / caso de estudio
3. **③ Promoción con evaluación (anti-hinchazón)** — el conocimiento nuevo llega como `experimental`, carga solo con coincidencia explícita y pasa a `proven` solo tras ganar una evaluación A/B a ciegas
4. **④ Aprendizaje versionado** — el CHANGELOG de cada versión dice qué aprendió el jardín: crecimiento que se puede leer

```
 ① cada tarea → aprendizajes en learnings/
        ↓ (las entradas generalizables se envían upstream por PR)
 ② los PR de la comunidad alimentan knowledge/
        ↓ (el conocimiento nuevo marca experimental)
 ③ gana el A/B a ciegas → promovido a proven
        ↓
 ④ el CHANGELOG registra lo aprendido
```

## Qué hay dentro

```
SKILL.md                  router + flujo de 8 pasos (≤500 líneas — el núcleo estable)
knowledge/
  core/                   módulos universales: principios · color · tipografía · layout · motion · anti-slop
  domains/                9 dominios: ui-web · ui-mobile · póster/banner · iconos · logo/marca ·
                          slides · data-viz · vídeo/motion · ilustración (con checklist de crítica)
  styles/                 18 recetas de estilo (suizo, bauhaus, neo-brutalismo, glassmorfismo,
                          dark-tech, y2k, japandi, memphis…) — un archivo pequeño cada una
  case-studies/           antes/después con razonamiento
learnings/                notas de campo del skill — empieza con semillas y crece con cada tarea
evals/                    benchmarks con trampas deliberadas + rúbrica + harness A/B a ciegas
scripts/                  validate_knowledge.mjs (puerta CI) · ab_harness.mjs (páginas de evaluación a ciegas)
```

El router lee `knowledge/INDEX.md` y nunca carga más de ~7 archivos por tarea — **crecer sin inflarse**. El flujo de trabajo es una destilación de las mejores ideas de proceso de la práctica de diseño con agentes: un **deal de tres direcciones**, las **cinco preguntas de forma**, una **puerta de crítica** que arregla solo los 3 problemas más dañinos por ronda, y una lista **anti-slop** canónica fusionada de tres fuentes independientes. Ver [SOURCES.md](SOURCES.md).

## Instalación

Funciona con cualquier agente que soporte la convención SKILL.md (ZCode, Claude Code y CLIs compatibles):

```bash
# a nivel de usuario (todos los proyectos)
git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden

# o a nivel de proyecto
git clone https://github.com/iifzx/design-garden.git <tu-proyecto>/.zcode/skills/design-garden
```

Sin build, sin dependencias — markdown más scripts opcionales de Node (solo librería estándar). Playwright es opcional para capturas de página completa.

## Úsalo

Solo pide diseño. El skill se dispara con cualquier trabajo estético:

- "Haz un póster para la inauguración de una cafetería del barrio" → presenta 3 direcciones, ejecuta la más fuerte, critica, entrega y registra lo aprendido
- "Diseña un set de iconos para una app de plantas" → rejillas keyline, correcciones ópticas, tests de silueta
- "Este póster se ve raro — revísalo" → modo crítica primero, checklist del dominio, arreglos ordenados por daño
- "Landing page + una plantilla de slides" → enruta ambos dominios, aprende de ambos

## Contribuir

**El jardín crece con PRs pequeños.** Añade una receta de estilo, reporta un aprendizaje de tu propio uso, o ejecuta una evaluación para promover una regla experimental a probada. Todo está en [CONTRIBUTING.md](CONTRIBUTING.md) — la versión corta: fork, añade **un archivo pequeño** siguiendo el esquema, `node scripts/validate_knowledge.mjs` debe pasar (CI lo exige), abre el PR. El conocimiento comunitario empieza `experimental` y se vuelve `proven` ganando una evaluación A/B a ciegas — el crecimiento está **verificado**.

## Traducciones

El inglés es la versión principal — el contenido del skill (SKILL.md, knowledge) y su vocabulario de disparo permanecen en inglés por fiabilidad del modelo. Las traducciones de la comunidad viven junto a él:

- 简体中文: [README.zh-CN.md](README.zh-CN.md) · 繁體中文: [README.zh-TW.md](README.zh-TW.md)
- 日本語: [README.ja.md](README.ja.md) · 한국어: [README.ko.md](README.ko.md)
- Español: [README.es.md](README.es.md) (este archivo) · Português: [README.pt-BR.md](README.pt-BR.md)
- Français: [README.fr.md](README.fr.md) · Deutsch: [README.de.md](README.de.md) · Русский: [README.ru.md](README.ru.md)

Para añadir un idioma, ver la sección [Translations](CONTRIBUTING.md#translations) de CONTRIBUTING.md.

## Licencia y créditos

MIT — ver [LICENSE](LICENSE). Sembrado destilando 17 skills de diseño y el canon compartido del oficio; créditos completos en [SOURCES.md](SOURCES.md).

🌱 *Los jardines se juzgan por lo que cultivan.*
