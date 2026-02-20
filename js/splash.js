setTimeout(() => {
    const splash = document.querySelector('.splash');
    if (splash) splash.remove();

    const page = document.querySelector('.page-container');
    if (page) {
        page.style.opacity = '1';
        page.style.pointerEvents = 'auto';
    }
}, 2000); // match your splash duration
