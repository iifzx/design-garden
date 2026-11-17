# Submission guide: one image, three sentences

> You do not need code or Markdown. If you can drag an image and write three sentences, you can submit.

## The 30-second version

1. Open the [work submission form](https://github.com/iifzx/design-garden/issues/new?template=community_work.md).
2. Fill in a title, pick one type, and write “context + one trade-off + one open question”.
3. Drag one PNG / JPG / WebP into the Images section.
4. Check the license boxes and submit the issue.
5. If the automated check passes, a PR is opened. A maintainer reviews and merges it; the work appears in the [/start/ gallery](https://iifzx.github.io/design-garden/start/).

No GitHub account? You can browse the gallery and vote counts, but you cannot submit or react. A free account only needs an email address.

## What we accept

- Posters, web pages, icons, logos, small brand systems, slides, and illustrations.
- One main image is enough; up to 3, no nine-grid dumps.
- Real work you made and are willing to publish.
- Unfinished work is fine, as long as the note says what is unresolved.

## What we do not accept

- Someone else's work, or a client draft that is not public.
- A pure AI collage with no explanation.
- “Is this pretty?” with no context.
- An ad built around a QR code or contact details.
- SVG files (bitmap only in the first version, for safety).
- Images with personal data, client secrets, or unreleased brand names.

## Image rules

| Item | Requirement |
|---|---|
| Format | PNG / JPG / WebP |
| Count | 1–3 images |
| Size | ≤ 5 MB each |
| Shortest edge | ≥ 800px |
| Content | Subject complete, key details readable; not a raw white screenshot |
| Privacy | Mask client names, phone numbers, addresses, and non-public data |

GitHub turns a dragged image into a `https://github.com/user-attachments/assets/...` link. The automated check accepts only these GitHub attachment URLs. Do not use a cloud drive or an image host.

## How to write the three sentences

Use this order; it makes review fast:

1. **Context**: who it is for, where it is used, why you made it.
2. **One trade-off**: what you gave up, and why.
3. **One open question**: what still bothers you, and what you want the community to discuss.

Example:

> A poster for a neighborhood stray-cat adoption day. I used one hand-drawn cat silhouette because every cat photo pulled attention away from the adoption details. The silhouette cannot show personality, and that is still unresolved.

Avoid empty phrases like “elevated brand tone” or “strong visual impact”. A concrete situation beats adjectives.

## Review checks three things

1. **Is it yours?** The copyright is clear, and client work has permission to be public.
2. **Can we see it?** The subject, text, and details are legible in the image.
3. **Does the note have information?** It has context, a trade-off, and an open question.

We do not grade “professional or not”, and we do not rank by follower count. If something is missing, a maintainer says so on the PR. Editing the issue updates the same PR.

Maintainers review as soon as they can. If a few days pass with no movement, ask politely on the issue; do not open a duplicate.

## License and credit

- You keep the copyright.
- Submitting agrees to display the work under **CC BY 4.0** with your GitHub username.
- If AI generated or assisted the work, disclose it in the note; the template has a checkbox.
- Do not submit client work you cannot publish.

## How voting works

- Voting happens on the **work issue**, not directly on the site.
- A **👍** reaction on the issue is one vote.
- One GitHub account counts once per work; you can remove or change the reaction.
- The site syncs counts every 6 hours; the “votes synced” date shows the last sync.
- Counts feed the monthly community selection. They are not a professional jury and are not the only input.

## FAQ

**Can I submit without a GitHub account?**
No. You can browse, but submission and 👍 need an account. Registration is free.

**Can I submit more than one work?**
Yes, one issue per work. Do not put four different works in one issue.

**Can I submit a screenshot of a web page?**
Yes, but show the full page or the key screen, not a blurry thumbnail.

**Can I submit only a Behance link?**
No. The gallery needs an image it can display; drag the main image into the issue.

**Can I edit a work after it is merged?**
Yes. Editing the original issue updates the PR. If it is already merged, a maintainer opens a new PR to replace the JSON and image.

**How do I remove my work?**
Open an issue or contact a maintainer. Merged work is removed from `community/submissions/`, and the site is rebuilt.

## Related files

- Data format and folders: [community/README.md](../community/README.md)
- Current monthly theme: [community/themes.json](../community/themes.json)
- Zero-code beginner guide: [docs/start-here.md](start-here.md)
- GitHub button tour: [docs/github-tour.md](github-tour.md)
- Beginner site: [/start/](https://iifzx.github.io/design-garden/start/)
