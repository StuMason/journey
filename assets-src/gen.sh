#!/usr/bin/env bash
cd ~/workspace/journey/assets-src
STYLE="Black ink linocut print on cream paper, bold carved lines, high contrast, rough paper texture, no text, no letters, no signature, minimal composition, 1970s book-cover woodcut style."
while IFS=$'\t' read -r name scene; do
  [ -z "$name" ] && continue
  [ -f "$name.png" ] && continue
  printf '%s %s' "$STYLE" "$scene" > "/home/coder/.claude/jobs/e7724318/tmp/$name.txt"
  for try in 1 2 3; do
    python3 ~/.claude/skills/cloudflare-ai/bin/cfai.py image @cf/black-forest-labs/flux-1-schnell "/home/coder/.claude/jobs/e7724318/tmp/$name.txt" "$name.png" >/dev/null 2>&1 && [ -s "$name.png" ] && break
    sleep 3
  done
  echo "$name $(stat -c %s "$name.png" 2>/dev/null)"
done < prompts.tsv
echo ALLDONE
