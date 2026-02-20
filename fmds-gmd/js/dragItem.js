// Main tarik2 yey
//Separated cuz it was bothering the global.js lmao
const dragItem = document.getElementById("draggableItem");
const container = dragItem.parentElement;

let isDown = false;
let offsetX = 0;
let offsetY = 0;

function startDrag(e) {
    isDown = true;

    const p = e.touches ? e.touches[0] : e;

    const containerRect = container.getBoundingClientRect();
    const itemRect = dragItem.getBoundingClientRect();

    // Convert pointer coords => container coords
    const x = p.clientX - containerRect.left;
    const y = p.clientY - containerRect.top;

    offsetX = x - dragItem.offsetLeft;
    offsetY = y - dragItem.offsetTop;
}

function onDrag(e) {
    if (!isDown) return;

    const p = e.touches ? e.touches[0] : e;

    const containerRect = container.getBoundingClientRect();
    const itemRect = dragItem.getBoundingClientRect();

    // Pointer → container coordinates
    let x = p.clientX - containerRect.left - offsetX;
    let y = p.clientY - containerRect.top - offsetY;

    // Clamp so it stays inside
    x = Math.max(0, Math.min(x, containerRect.width - itemRect.width));
    y = Math.max(0, Math.min(y, containerRect.height - itemRect.height));

    dragItem.style.left = x + "px";
    dragItem.style.top = y + "px";
}

function endDrag() {
    isDown = false;
}

dragItem.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", onDrag);
document.addEventListener("mouseup", endDrag);

dragItem.addEventListener("touchstart", startDrag, { passive: false });
document.addEventListener("touchmove", onDrag, { passive: false });
document.addEventListener("touchend", endDrag);
