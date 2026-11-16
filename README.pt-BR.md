# 🌱 design-garden

English | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | **Português** | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md)

**A skill de design que cresce.** Uma skill de design universal e auto-aprimorável para agentes de código com IA — cobre tudo que envolve estética: UI, pôsteres, banners, ícones, logos, identidade de marca, slides, visualização de dados, vídeo e motion, ilustração, tipografia e crítica de design.

![CI](https://github.com/iifzx/design-garden/actions/workflows/validate.yml/badge.svg)
![styles](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.styles&label=style%20recipes&color=2E7D32)
![domains](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.domains&label=domains&color=2E7D32)
![learnings](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.learnings&label=learnings%20files&color=A98A3D)

> 🌻 **Novato em ferramentas de IA?** Instale, use e contribua sem escrever código: **[Guia para iniciantes（中文）](docs/start-here.zh-CN.md)** · English: [Start Here](docs/start-here.md)

A maioria dos "skills de design" para agentes são pacotes de prompts congelados: fortes no primeiro dia, obsoletos no trigésimo, e sempre com o gosto de um único autor. **O design-garden foi construído para ser alimentado** — pelo seu trabalho diário de design e pela comunidade. Ele não só executa tarefas de design; **aprende de cada tarefa que executa**.

## O que ele produz

Tudo abaixo foi produzido pelo skill executando as próprias tarefas de avaliação — cada peça passou pelo fluxo completo (incluindo o portão de crítica). Mais em [examples/](examples/README.md), com as correções que o portão capturou.

| | | |
|---|---|---|
| <img src="examples/images/bike-shop-hero.png" width="270" alt="Landing de oficina de bicicletas"> | <img src="examples/images/jazz-poster.png" width="270" alt="Pôster de inauguração de café jazz"> | <img src="examples/images/icon-sheet.png" width="270" alt="Set de ícones de app de plantas"> |
| Landing page — [mobile 375px](examples/images/bike-shop-mobile.png) | Pôster de inauguração, 1080×1350 | Set de ícones com exportação 16/24/48 |

*Gerado com **GLM-5.3-Flash** — atribuição de modelo por exemplo em [examples/README.md](examples/README.md).*

## Por que é diferente: quatro ciclos de crescimento

1. **① Autoaprendizado em execução** — cada tarefa acrescenta uma entrada estruturada a `learnings/<domain>.md`: melhora para VOCÊ a cada uso, sem reinstalar
2. **② Contribuições da comunidade** — conhecimento = arquivos pequenos e modulares. Um PR = uma receita de estilo / técnica / estudo de caso
3. **③ Promoção com avaliação (anti-inchaço)** — conhecimento novo chega como `experimental`, carrega só em match explícito e vira `proven` apenas depois de vencer uma avaliação A/B às cegas
4. **④ Aprendizado versionado** — o CHANGELOG de cada versão diz o que o jardim APRENDEU: crescimento que dá para ler

```
 ① cada tarefa → aprendizados em learnings/
        ↓ (entradas generalizáveis vão upstream via PR)
 ② PRs da comunidade alimentam knowledge/
        ↓ (novo conhecimento marca experimental)
 ③ vence o A/B às cegas → promovido a proven
        ↓
 ④ o CHANGELOG registra o que foi aprendido
```

## O que há dentro

```
SKILL.md                  router + fluxo de 8 passos (≤500 linhas — o núcleo estável)
knowledge/
  core/                   módulos universais: princípios · cor · tipografia · layout · motion · anti-slop
  domains/                9 domínios: ui-web · ui-mobile · pôster/banner · ícones · logo/marca ·
                          slides · data-viz · vídeo/motion · ilustração (com checklist de crítica)
  styles/                 18 receitas de estilo (suíço, bauhaus, neo-brutalismo, glassmorfismo,
                          dark-tech, y2k, japandi, memphis…) — um arquivo pequeno cada
  case-studies/           antes/depois com raciocínio
learnings/                notas de campo do skill — começa com sementes e cresce a cada tarefa
evals/                    benchmarks com armadilhas deliberadas + rubrica + harness A/B às cegas
scripts/                  validate_knowledge.mjs (portão de CI) · ab_harness.mjs (páginas de avaliação às cegas)
```

O router lê `knowledge/INDEX.md` e nunca carrega mais de ~7 arquivos por tarefa — **crescer sem inchar**. O fluxo de trabalho é uma destilação das melhores ideias de processo da prática de design com agentes: um **deal de três direções**, as **cinco perguntas de forma**, um **portão de crítica** que corrige só os 3 problemas mais danosos por rodada, e uma lista **anti-slop** canônica mesclada de três fontes independentes. Ver [SOURCES.md](SOURCES.md).

## Instalação

Funciona com qualquer agente que suporte a convenção SKILL.md (ZCode, Claude Code e CLIs compatíveis):

```bash
# nível de usuário (todos os projetos)
git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden

# ou nível de projeto
git clone https://github.com/iifzx/design-garden.git <seu-projeto>/.zcode/skills/design-garden
```

Sem build, sem dependências — markdown mais dois scripts opcionais de Node (só biblioteca padrão).

## Use

Só peça design. O skill dispara em qualquer trabalho estético:

- "Faça um pôster para a inauguração de um café do bairro" → apresenta 3 direções, executa a mais forte, critica, entrega e registra o que aprendeu
- "Projete um set de ícones para um app de plantas" → grades keyline, correções ópticas, testes de silhueta
- "Esse pôster está estranho — revise" → modo crítica primeiro, checklist do domínio, correções ordenadas por dano
- "Landing page + um template de slides" → roteia os dois domínios, aprende dos dois

## Contribuir

**O jardim cresce com PRs pequenos.** Adicione uma receita de estilo, reporte um aprendizado do seu próprio uso, ou rode uma avaliação para promover uma regra experimental a comprovada. Tudo está em [CONTRIBUTING.md](CONTRIBUTING.md) — a versão curta: fork, adicione **um arquivo pequeno** seguindo o schema, `node scripts/validate_knowledge.mjs` precisa passar (CI exige), abra o PR. Conhecimento da comunidade começa `experimental` e vira `proven` vencendo uma avaliação A/B às cegas — o crescimento é **verificado**.

## Traduções

O inglês é a versão principal — o conteúdo do skill (SKILL.md, knowledge) e seu vocabulário de gatilho permanecem em inglês por confiabilidade do modelo. As traduções da comunidade vivem ao lado:

- 简体中文: [README.zh-CN.md](README.zh-CN.md) · 繁體中文: [README.zh-TW.md](README.zh-TW.md)
- 日本語: [README.ja.md](README.ja.md) · 한국어: [README.ko.md](README.ko.md)
- Español: [README.es.md](README.es.md) · Português: [README.pt-BR.md](README.pt-BR.md) (este arquivo)
- Français: [README.fr.md](README.fr.md) · Deutsch: [README.de.md](README.de.md) · Русский: [README.ru.md](README.ru.md)

Para adicionar um idioma, veja a seção [Translations](CONTRIBUTING.md#translations) do CONTRIBUTING.md.

## Licença e créditos

MIT — ver [LICENSE](LICENSE). Semeado destilando 17 skills de design e o cânone compartilhado do ofício; créditos completos em [SOURCES.md](SOURCES.md).

🌱 *Jardins são julgados pelo que cultivam.*
