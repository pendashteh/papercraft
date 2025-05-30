const contentElement = document.getElementById('content');
const fileListElement = document.getElementById('file-list');
const searchInput = document.getElementById('search');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('navigation');

// Converts "download/sfd.md" to absolute path based on list.txt location
function resolveFilePath(filePath) {
    const listURL = new URL(listPath, window.location.href);
    return new URL(filePath, listURL).href;
}

async function loadMarkdown(filePath) {
    const resolvedURL = resolveFilePath(filePath);
    console.log("Loading markdown:", resolvedURL);
    try {
        const response = await fetch(resolvedURL);
        console.log("Fetch status:", response.status, response.statusText);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const markdownText = await response.text();
        contentElement.innerHTML = marked.parse(markdownText);
        document.title = filePath.split('/').pop();
    } catch (error) {
        contentElement.innerHTML = `<p style="color: red;">Error loading file: ${filePath}. ${error.message}</p>`;
        console.error('Error loading markdown:', error);
    }
}

function createListItem(filePath) {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${filePath}`;
    link.textContent = filePath.split('/').pop().replace('.md', '');
    link.onclick = (event) => {
        event.preventDefault();
        loadMarkdown(filePath);
        window.location.hash = filePath;
    };
    listItem.appendChild(link);
    return listItem;
}

async function fetchFileList() {
    try {
        const response = await fetch(listPath);
        if (!response.ok) throw new Error("Missing list.txt");
        const text = await response.text();
        const files = text.split('\n').map(line => line.trim()).filter(Boolean);

        fileListElement.innerHTML = '';
        files.forEach(filePath => {
            const item = createListItem(filePath);
            fileListElement.appendChild(item);
        });

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            Array.from(fileListElement.children).forEach(li => {
                const match = li.textContent.toLowerCase().includes(query);
                li.style.display = match ? '' : 'none';
            });
        });

        loadContentFromHash();
    } catch (error) {
        contentElement.innerHTML = `<p style="color:red;">Error reading <code>list.txt</code>: ${error.message}</p>`;
    }
}

function loadContentFromHash() {
    const hash = window.location.hash.substring(1);
    if (hash) loadMarkdown(hash);
}

window.addEventListener('hashchange', loadContentFromHash);
fetchFileList();

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
});
