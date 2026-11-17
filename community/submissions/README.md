# Submissions

One JSON file per published community work. Files are written by
`scripts/intake_submission.mjs` and merged through a review PR — do not add them by hand
unless you are repairing a damaged intake.

- Filename: `issue-<number>.json`
- Schema: see [`../README.md`](../README.md#submission-schema)
- Assets: `../assets/issue-<number>/`
- Votes: `../votes.json`, written only by the votes workflow.

The build ignores files that are not `issue-*.json`, so a `README.md` here is safe.
