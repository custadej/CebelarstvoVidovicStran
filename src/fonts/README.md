# Fonts

Self-hosted subsets (Basic Latin + Slovenian letters + site punctuation), built with fontTools. Scripts: `scripts/fonts/`.

| File | Source | Changes | Licence |
|---|---|---|---|
| `fraunces-roman.woff2`, `fraunces-italic.woff2` | Fraunces variable (google/fonts `ofl/fraunces`) | subset; SOFT pinned to 70, WONK to 0; weight 300–700; optical-size axis kept in the roman, pinned to 110 in the italic (display use only) | SIL OFL 1.1, `Fraunces-OFL.txt` (no reserved font name) |
| `vidovic-sans.woff2` | Source Sans 3 variable (google/fonts `ofl/sourcesans3`) | subset; weight 400–700; **renamed** because "Source" is a reserved font name | SIL OFL 1.1, `SourceSans3-OFL.txt` |

If copy ever needs a character outside the subset (for example another language), add it to `chars` in both scripts and rebuild.
