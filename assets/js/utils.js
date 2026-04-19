export function parseContent(rawText) {
    if (!rawText) return "";
    // Chuyển Markdown thành HTML
    const rawHTML = marked.parse(rawText);
    // Chuyển cú pháp [EN|VI] thành thẻ span
    return rawHTML.replace(/\[(.*?)\|(.*?)\]/g, (match, en, vi) => {
        return `<span class="vocab is-hint" data-en="${en}" data-vi="${vi}">${vi}</span>`;
    });
}

export function setupRevealLogic() {
    const revealNext = () => {
        const nextVocab = document.querySelector('.vocab.is-hint');
        if (nextVocab) {
            nextVocab.textContent = nextVocab.getAttribute('data-en');
            nextVocab.classList.replace('is-hint', 'is-revealed');
            nextVocab.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            revealNext();
        }
    });

    return { revealNext };
}
