# meme-website

A playful, responsive meme website for sharing and showcasing memes.

## Run locally

This is a lightweight static site (no build step required).

1. Clone the repository.
2. From the project root, run a local static server:

```bash
python3 -m http.server 8080
```

3. Open `http://localhost:8080` in your browser.

## Build and deploy

- **Build:** No build process is required for the current version.
- **Deploy:** Push the repository and serve it with GitHub Pages (or any static host).  
  For GitHub Pages, configure deployment from the branch that contains:
  - `index.html`
  - `styles.css`
  - `script.js`

## Customize sample memes and placeholder artwork

- Update meme entries in `/home/runner/work/meme-website/meme-website/script.js` inside the `memeData` array.
- Each item has text, category, and a placeholder style token (`artTheme`) used for local CSS-generated art.
- Replace placeholders by:
  1. Adding your own local image files to the repository.
  2. Extending each meme item with an image path.
  3. Updating the card rendering logic in `script.js` to use your image path instead of the generated placeholder block.
