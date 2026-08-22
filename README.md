# journey

The hero's journey, in plain English. Live at https://journey.stumason.dev

One static page. No build step, no framework.

- `public/index.html` is the page and all of its copy.
- `public/data.js` holds the content: the twelve stages, Harmon's circle, the five systems on a timeline, nine textbook breakdowns, fourteen rule-breakers, twelve lenses, twelve books. Edit there to change what the page says.
- `public/app.js` is the interaction (circle, stage panel, maps, cards, filters, the mapper).
- `public/styles.css` is the design. Paper, ink, night. One yellow, one red.
- `public/img/*.webp` are the illustrations: linocut-style prints reduced to alpha masks, tinted by CSS so they print in ink on paper and in paper on night.
- `assets-src/` has the prompt list, the generator (`gen.sh`, Flux on Workers AI) and `process.py` which turns a cream-paper print into a mask.

## Deploy

Cloudflare Pages, direct upload.

```bash
export CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=...
./deploy.sh
```

## House rules

British English. No em-dashes in the copy. Every beat is from the film or book it names. No number appears that cannot be checked.
