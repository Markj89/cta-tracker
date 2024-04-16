export function createOverlayElement() {
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.display = 'inline-block';
    el.style.width = '9999px';
    return el;
}