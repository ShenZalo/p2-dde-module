

//Popup hide and show
// create one overlay once
const _overlay = document.createElement('div');
_overlay.className = 'overlay-bg';
_overlay.addEventListener('click', () => {
  // click overlay closes the current popup
  if (_currentPopup) hide(_currentPopup);
});

let _currentPopup = null; // store selector of currently open popup

function show(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  if (!document.body.contains(_overlay)) {
    document.body.appendChild(_overlay);
    document.documentElement.classList.add('no-scroll');
  }

  el.classList.remove('hidden');
  requestAnimationFrame(() => el.classList.add('visible')); // trigger animation
  _currentPopup = selector;
  el.scrollTop = 0;
}

function hide(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  el.classList.remove('visible');

  // delay hiding until animation finishes
  setTimeout(() => {
    if (_currentPopup === selector) {
      if (document.body.contains(_overlay)) document.body.removeChild(_overlay);
      document.documentElement.classList.remove('no-scroll');
      _currentPopup = null;
    }
    el.classList.add('hidden');
  }, 250); // matches transition duration
}



// Fullscreen image

function openFullscreen(imageSrc) {
  const img = document.createElement('img');
  img.src = imageSrc;

  Object.assign(img.style, {
    width: '100%',
    height: 'auto',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '1000',
    backgroundColor: 'rgba(0,0,0,0.8)',
    cursor: 'zoom-out'
  });

  document.body.appendChild(img);

  if (img.requestFullscreen) img.requestFullscreen();

  img.onclick = function () {
    closeFullscreen();
    img.remove();
  };
}

function closeFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

// Expand Card
function toggleCard(card) {
  const base = card.classList[0];
  const expandClass = `${base}-expand`;
  const isExpanding = !card.classList.contains(expandClass);

  card.classList.toggle(expandClass);

  if (isExpanding) {
    // wait a bit so the height starts animating
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  }
}

// Flip Card
function toggleFlip(card) {
  card.classList.toggle("flipped");
}

/* Navigation Buttons */

// Back button
document.getElementById("backBtn").addEventListener("click", function () {
  history.back(); // goes to previous page
  if (null == document.referrer || document.referrer === "") {
    window.location.href = "fmds-homepage.html"; // fallback to homepage if no referrer
  }
});

// To Top button
const topBtn = document.getElementById("topBtn");
topBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Collapsible Cards
function toggleCollapsible(element) {
    const collapsibleCard = element.nextElementSibling;
    collapsibleCard.classList.toggle('expand');
    const indicator = element.querySelector('.indicator');
    indicator.classList.toggle('expand'); // Add or remove the expand class
}

//Toggle Bubble
function toggleBubble(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const bubbles = Array.from(container.querySelectorAll('.bubble-map-item'));
    
    // Find the first hidden bubble
    const nextBubble = bubbles.find(b => b.classList.contains('hidden'));

    if (nextBubble) {
        // Show bubble
        nextBubble.classList.remove('hidden');
        setTimeout(() => nextBubble.classList.add('show-bubble'), 20);

        // Scroll into view
        nextBubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // If this was the last bubble, flash all bubbles green
        const remaining = bubbles.filter(b => b.classList.contains('hidden'));
        if (remaining.length === 0) {
            bubbles.forEach(b => b.classList.add('flash-green'));

            // Remove class after animation
            setTimeout(() => {
                bubbles.forEach(b => b.classList.remove('flash-green'));
            }, 1000); // match animation duration
        }
    }
}

// Attach click to bubble-map-topic
document.querySelectorAll('.bubble-map-topic').forEach(topic => {
    topic.addEventListener('click', () => {
        const containerSelector = topic.closest('.content-container')?.id;
        if (containerSelector) {
            toggleBubble(`#${containerSelector}`);
        }
    });
});


// Video Popup
function showVideo(videoSource) {
    const existingModal = document.querySelector('.video-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'video-modal';
    Object.assign(modal.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '2000'
    });

    const iframe = document.createElement('iframe');
    iframe.src = videoSource; // Drive /preview link
    iframe.style.width = '90%';
    iframe.style.height = '90%';
    iframe.allow = 'autoplay; encrypted-media';
    iframe.allowFullscreen = true;
    iframe.frameBorder = '0';

    modal.appendChild(iframe);

    modal.addEventListener('click', () => modal.remove());

    document.body.appendChild(modal);
}



// Draggable Navigation Button
//Ada velocity and all sbb boleh dik
const navButton = document.querySelector('.navigation-button');

let vx = 0;
let vy = 0;
let lastX = 0;
let lastY = 0;
let momentumFrame;

function start(e) {
    const isTouch = e.type === "touchstart";
    const p = isTouch ? e.touches[0] : e;

    const rect = navButton.getBoundingClientRect();
    const offsetX = p.clientX - rect.left;
    const offsetY = p.clientY - rect.top;

    navButton.style.cursor = "grabbing";

    cancelAnimationFrame(momentumFrame);

    function move(e) {
        const point = isTouch ? e.touches[0] : e;

        const newX = point.clientX - offsetX;
        const newY = point.clientY - offsetY;

        vx = newX - lastX;
        vy = newY - lastY;

        lastX = newX;
        lastY = newY;

        navButton.style.left = newX + "px";
        navButton.style.top = newY + "px";
    }

    function stop() {
        document.removeEventListener(isTouch ? "touchmove" : "mousemove", move);
        document.removeEventListener(isTouch ? "touchend" : "mouseup", stop);

        navButton.style.cursor = "grab";

        applyMomentum();
    }

    document.addEventListener(isTouch ? "touchmove" : "mousemove", move, { passive: false });
    document.addEventListener(isTouch ? "touchend" : "mouseup", stop, { passive: false });
}

navButton.addEventListener("mousedown", start);
navButton.addEventListener("touchstart", start, { passive: false });

function applyMomentum() {
    momentumFrame = requestAnimationFrame(() => {
        vx *= 0.95;
        vy *= 0.95;

        const rect = navButton.getBoundingClientRect();
        let x = rect.left + vx;
        let y = rect.top + vy;

        const w = rect.width;
        const h = rect.height;
        const maxX = window.innerWidth - w;
        const maxY = window.innerHeight - h;

        if (x < 0) { x = 0; vx = -vx * 0.7; }
        if (x > maxX) { x = maxX; vx = -vx * 0.7; }
        if (y < 0) { y = 0; vy = -vy * 0.7; }
        if (y > maxY) { y = maxY; vy = -vy * 0.7; }

        navButton.style.left = x + "px";
        navButton.style.top = y + "px";

        if (Math.abs(vx) > 0.3 || Math.abs(vy) > 0.3) applyMomentum();
    });
}

// Bubble Map Item Click to Toggle Image Point
document.querySelectorAll('.bubble-map-item').forEach(item => {
    item.addEventListener('click', () => {
        const point = item.querySelector('.image-point');
        if (!point) return;

        point.classList.toggle('show');
    });
});




