# 📦 Papercrate

**A zero-build, static, mobile-friendly markdown browser.**

Papercrate lets you view and search markdown files from a list — no build tools, no server logic. Just drop in your `.md` files, point to a `list.txt`, and you’re ready to go.

---

## 🚀 How It Works

- You create a plain text file (e.g. `list.txt`) that contains **relative paths to markdown files**.
- You set the path to that file using a single line in `browse/index.html`:
  ```html
  <script>
    const listPath = 'papercraft.txt';
  </script>
  ```
- Papercrate loads `papercraft.txt`(or any other name for that matter), parses the entries, and resolves each path **relative to where it is located** — not relative to the viewer (`index.html`).

---

## 📁 Example Folder Structure

```
/project-root/
├── docs/
│   ├── papercraft.txt
│   ├── Welcome.md
│   └── Reference Notes.md
├── browse/
│   ├── index.html      ← viewer
│   ├── script.js
│   └── style.css
```

### `papercraft.txt` (inside `/docs/`)
```
Welcome.md
Reference Notes.md
topics/Deep Dive.md
```

These paths are interpreted relative to `/docs/`, so:

- `Welcome.md` → `/docs/Welcome.md`
- `topics/Deep Dive.md` → `/docs/topics/Deep%20Dive.md`

---

## ✅ Features

- Purely static — works with GitHub Pages, Netlify, or local file servers
- Mobile-first, responsive UI
- Fully client-side
- Spaces and special characters in file names are supported
- Live search in the file list
- Markdown rendered with GitHub-style layout
- Hash-based navigation (shareable URLs)

---

## 🛠 Setup Instructions

1. **Create your markdown files** anywhere (e.g., `/docs/`, `/notes/`, `/files/`)
2. **Create a `list.txt` file** next to your markdowns, listing file paths relative to its own location:
   ```
   Chapter 1.md
   Section/Advanced Topics.md
   ```
3. **Set the `listPath`** in `/browse/index.html`:
   ```html
   <script>
     const listPath = '../docs/list.txt'; // Adjust this path as needed
   </script>
   ```

4. Serve the project root with any static file server:
   ```bash
   python3 -m http.server
   ```

5. Visit:
   ```
   http://localhost:8000/browse/index.html
   ```

---

## 🧪 Example

If `papercraft.txt` is at `/docs/papercraft.txt`, and it includes:

```
Intro.md
Concepts/How It Works.md
```

Then `script.js` will fetch:
- `/docs/Intro.md`
- `/docs/Concepts/How%20It%20Works.md`

Even if `index.html` is at `/browse/index.html`.

---

## 📦 Deployment

You can host Papercrate on:

- GitHub Pages (static hosting)
- Netlify / Vercel
- Local servers (`npx serve`, `http-server`, etc.)
- Even file:// URLs with relaxed browser security

---

## ⚙️ Developer Notes

### 🧩 Key Architectural Rule

> File paths listed in `list.txt` are resolved **relative to where `papercraft.txt` lives**, not where the viewer is.

This makes it portable, modular, and location-independent.

---

## 🎨 Customization Ideas

- 🌓 Add dark mode
- 🔍 Index and search inside markdown contents
- 🧾 Support frontmatter (title, tags, etc.)
- 📂 Auto-expand folder-style file views

---

## 🪪 License

MIT — free to use, adapt, and share.
