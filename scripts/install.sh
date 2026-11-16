#!/usr/bin/env sh
# design-garden installer — clone-or-update into your agent's skills directory.
# Works in bash/zsh/Git Bash. On Windows PowerShell, plain `git clone` works too
# (see docs/start-here.md).

set -e

REPO="https://github.com/iifzx/design-garden.git"
DEST="${DESIGN_GARDEN_DIR:-$HOME/.agents/skills/design-garden}"

if [ "$1" = "--project" ]; then
  DEST="$(pwd)/.zcode/skills/design-garden"
  echo "Installing project-level into: $DEST"
fi

if ! command -v git >/dev/null 2>&1; then
  echo "git is required. Install it from https://git-scm.com/downloads" >&2
  exit 1
fi

if [ -d "$DEST/.git" ]; then
  echo "design-garden already installed — updating…"
  git -C "$DEST" pull --ff-only
else
  echo "Cloning into $DEST …"
  mkdir -p "$(dirname "$DEST")"
  git clone --depth 1 "$REPO" "$DEST"
fi

echo ""
echo "✅ Installed at: $DEST"
echo "Next: open your AI assistant and just design — 'make a poster for my cat's birthday'."
echo "If it doesn't trigger, say: 'use design-garden to …'"
echo "Beginner guide: https://github.com/iifzx/design-garden/blob/main/docs/start-here.md"
