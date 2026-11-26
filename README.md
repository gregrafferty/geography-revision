# Geography Revision

A small, installable web app (PWA) for revising geography for a mock exam. Topics so far:

- **European capital cities**
- **World rivers & mountains**: the longest rivers, which rivers flow through which cities, the major mountain ranges, the highest peak on each continent, and UK rivers and mountains, with a filter by continent
- **Oceans & continents**: continent facts, which continent a country is in, the five oceans, major seas, and lines on the globe (Equator, Tropics, Prime Meridian)
- **Climate types**: naming climates from their description, where each climate is found, what affects climate, types of rainfall, and UK weather and climate

 It has no build step and no dependencies, and it works offline once it has loaded.

## Modes

- **Flashcards**: flip cards to learn, then go round again with only the ones marked "not yet".
- **Multiple choice**: given a country, pick its capital from four options.
- **Reverse multiple choice**: given a capital, pick the country.
- **Type the answer**: exam style. Accents and capital letters don't matter, and a small spelling slip counts as correct but shows the right spelling.
- **Practise weak spots**: a typed quiz made from the questions answered wrongly recently.

Progress is saved on the device (in `localStorage`). An item counts as **mastered** after 3 correct answers in a row. You can choose which regions to include (Northern, Western, Southern, Eastern, Microstates, UK nations) and how long each quiz is.

## Run locally

```bash
python3 -m http.server 8765
```

Then open http://localhost:8765.

## Host on GitHub Pages

1. Create a new repository on GitHub, for example `geography-revision`.
2. Push this folder to it:

```bash
git init && git add . && git commit -m "Geography revision app"
```

```bash
git branch -M main && git remote add origin https://github.com/<your-username>/geography-revision.git && git push -u origin main
```

3. On GitHub, go to **Settings → Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, then choose branch `main` and folder `/ (root)`, and save.
4. After a minute the app will be live at `https://<your-username>.github.io/geography-revision/`.

All paths are relative, so the app works from a repository subfolder like this.

### Install on a phone

- **iPhone/iPad (Safari):** Share → **Add to Home Screen**.
- **Android (Chrome):** menu → **Install app** (or **Add to Home screen**).

## Updating

Whenever you change any file, increase the version in `sw.js` (for example `geo-revision-v1` to `geo-revision-v2`) so installed copies pick up the change. Installed copies also fetch new files whenever they're online.

## Adding more topics

Topics live in [`data/topics.js`](data/topics.js). To add one (rivers, mountain ranges, other continents' capitals and so on), add another object to the `TOPICS` array with the same shape: a `forward` question template, an optional `reverse` template, optional `groups`, and `items` of `{ q, a, alt }`. Items can also have their own question (`ask`), a fact shown after answering (`fact`), and a `kind` so multiple-choice wrong answers stay the same kind of thing. The comment at the top of the file explains each field. Every mode works with a new topic automatically. Add the new file to the `ASSETS` list in `sw.js` if you put it in a separate file.
