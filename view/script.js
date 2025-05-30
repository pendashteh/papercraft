const contentElement = document.getElementById('content');
const fileListElement = document.getElementById('file-list');

async function loadMarkdown(fileName) {
    try {
        const response = await fetch(markdownDir + fileName);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const markdownText = await response.text();
        contentElement.innerHTML = marked.parse(markdownText);
        document.title = fileName;
    } catch (error) {
        contentElement.innerHTML = `<p style="color: red;">Error loading markdown file: ${fileName}. ${error.message}</p>`;
        console.error('Error loading markdown:', error);
    }
}

function addFileToNav(fileName) {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${fileName}`;
    link.textContent = fileName.replace('.md', '');
    link.onclick = (event) => {
        event.preventDefault();
        loadMarkdown(fileName);
        window.location.hash = fileName;
    };
    listItem.appendChild(link);
    fileListElement.appendChild(listItem);
}

async function fetchFileList() {
    try {
        const response = await fetch(markdownDir + 'index.txt');
        if (!response.ok) throw new Error("Missing index.txt");
        const text = await response.text();
        const files = text.split('\n').map(line => line.trim()).filter(Boolean);
        files.forEach(addFileToNav);
        loadContentFromHash();
    } catch (error) {
        contentElement.innerHTML = `<p style="color:red;">No <code>index.txt</code> found. Create it in <code>/download/</code> with one filename per line.</p>`;
    }
}

function loadContentFromHash() {
    const hash = window.location.hash.substring(1);
    if (hash) loadMarkdown(hash);
}

window.addEventListener('hashchange', loadContentFromHash);
fetchFileList();

const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('navigation');
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
});
