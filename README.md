# 📄 Static Markdown Viewer

A clean, mobile-first markdown file browser built entirely with HTML, CSS, and JavaScript. No server-side logic required.

---

## 📁 Folder Structure

    /
    ├── index.html            → Redirects to `/view/index.html`
    ├── download/
    │   ├── index.txt         → List of markdown files, one per line
    │   └── *.md              → Your actual markdown files
    └── view/
        ├── index.html        → Markdown viewer
        ├── style.css         → Styling for layout and markdown
        ├── script.js         → Logic to load and display markdown
        └── README.md         → This file

---

## 🚀 How to Use

1. Place your `.md` files in the `/download/` folder.
2. Create a `download/index.txt` with filenames, one per line:

       README.md
       project-notes.md
       changelog.md

3. Open `/index.html` in a browser, or serve with:

       npx serve .

4. Click filenames in the sidebar to view.

---

## 🛠 Optional: Generate `index.txt`

**macOS/Linux:**

    cd download && ls *.md > index.txt

**Windows (CMD):**

    cd download
    dir /b *.md > index.txt

---

## ✅ Features

- Purely static: works on any static host (GitHub Pages, Netlify, etc.)
- Mobile responsive layout
- Client-side routing via `#hash`
- `.txt`-based index for easy editing

---

## 🔐 Privacy

All files are loaded locally via JavaScript; no data is sent or tracked.
