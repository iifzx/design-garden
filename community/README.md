# Community data — the site reads from here

This directory is the single source of truth for the beginner site's gallery and vote board.
The site never invents entries or counts; it renders these files at build time.

## Flow

```
submit issue  ──►  .github/workflows/community-intake.yml
                          │  validates + downloads images
                          ▼
                   pull request (community/issue-N)
                          │  maintainer review
                          ▼
                     merge → community/submissions/<id>.json + assets/<id>/
                          │
GitHub 👍  ──►  .github/workflows/community-votes.yml  ──►  community/votes.json
                          │
                          ▼
                 scripts/build_start_site.mjs  ──►  site/start/
```

- **Featured exhibits** — `featured.json`. Real project outputs, curated by maintainers.
  These are not community submissions and are not part of the vote count.
- **Community works** — `submissions/<id>.json`, one file per work. Created by the intake
  workflow from a submitted issue and merged through a PR. The issue number is the stable id
  used for reactions.
- **Votes** — `votes.json`. Written only by `.github/workflows/community-votes.yml` from 👍
  reactions on the submission issues. Do not hand-edit counts.
- **Monthly theme** — `themes.json`. The current prompt and the rules shown on the site.
- **Assets** — `assets/<id>/`. Downloaded from the issue attachment during intake. The intake
  workflow rejects a submission if an attachment cannot be fetched, is not PNG/JPG/WebP, is over
  5 MB, or has a shortest edge below 800px.

The submission form is `.github/ISSUE_TEMPLATE/community_work.md`. It is a legacy Markdown
template so a submitter can drag an image directly into the issue body. The issue carries the
`<!-- community-work -->` marker; the intake workflow ignores every other issue.

## Submission schema

```json
{
  "id": "issue-123",
  "issue": 123,
  "title": "社区流浪猫领养日海报",
  "type": "海报",
  "typeEn": "Poster",
  "tags": ["paper cut", "community"],
  "description": "给本地领养日做的海报。用一张手绘猫的剪影，因为照片里每只猫都不同，会分散领养信息。",
  "descriptionEn": "",
  "author": "octocat",
  "authorUrl": "https://github.com/octocat",
  "images": ["assets/issue-123/01.png"],
  "width": 1080,
  "height": 1350,
  "sourceUrl": "https://github.com/iifzx/design-garden/issues/123",
  "license": "CC BY 4.0",
  "created": "2026-11-17T08:00:00Z"
}
```

`images` entries are repo-relative paths written by the intake workflow. The build script also
accepts an `https://` image URL on a GitHub-hosted domain for older manually curated entries. The
intake script rejects other hosts, SVG, files over 5 MB, and images whose shortest edge is below
800px.

## Privacy and safety

- Only public GitHub issue content is ingested.
- The intake script strips control characters, caps text lengths, and never executes submitted
  content.
- The site renders all submission text as text, never as HTML.
- To remove a work, close its PR before merge, or delete its JSON and assets in a normal PR.
  The vote workflow will simply stop counting an issue that no submission references.

## Repository setting for intake

The intake workflow opens a PR with `GITHUB_TOKEN`. In **Settings → Actions → General**, the
repository must allow GitHub Actions to create pull requests. If that setting is disabled, the
workflow will report the API error in the issue comment; a maintainer can still push the generated
`community/issue-N` branch and open the PR manually.
