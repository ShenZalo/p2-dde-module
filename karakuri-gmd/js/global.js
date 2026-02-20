//Collapsible Bar
document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll(".collapsible-bar");

    bars.forEach(bar => {
        const header = bar.children[0];
        const answer = bar.querySelector(".collapsible-answer");
        const icon   = bar.querySelector(".answer-indicator i");

        header.addEventListener("click", () => {
            const isOpen = answer.classList.contains("open");

            if (isOpen) {
                answer.style.maxHeight = "0px";
                answer.classList.remove("open");
                icon.style.transform = "rotate(0deg)";
            } else {
                answer.classList.add("open");
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.style.transform = "rotate(90deg)";
            }
        });
    });
});
//Fullscreen
const imgSrc = '';
function fullscreenImage(imgSrc) {
    return {
        openFullscreen() {
            const container = document.createElement('div')
            container.className =
                'fixed inset-0 bg-black flex items-center justify-center z-[9999] touch-none overflow-hidden'

            const img = document.createElement('img')
            img.src = imgSrc
            img.className = 'max-w-full max-h-full transition-transform'
            img.style.transform = 'scale(1) translate(0px,0px)'

            let scale = 1
            let translateX = 0
            let translateY = 0
            let isDragging = false
            let dragStartX = 0
            let dragStartY = 0
            let tapCount = 0
            let tapTimeout = null

            /* ------- Helper to clamp drag within image bounds ------- */
            function clampDrag() {
                const rect = img.getBoundingClientRect()
                const parentRect = container.getBoundingClientRect()

                const maxX = Math.max(0, (rect.width - parentRect.width) / 2 / scale)
                const maxY = Math.max(0, (rect.height - parentRect.height) / 2 / scale)

                translateX = Math.min(maxX, Math.max(-maxX, translateX))
                translateY = Math.min(maxY, Math.max(-maxY, translateY))
            }

            function updateTransform() {
                img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`
            }

            /* ------- Wheel Zoom ------- */
            img.addEventListener('wheel', (e) => {
                e.preventDefault()
                scale += e.deltaY > 0 ? -0.1 : 0.1
                scale = Math.max(1, Math.min(scale, 5))
                clampDrag()
                updateTransform()
            })

            /* ------- Drag / Pan (Mouse) ------- */
            img.addEventListener('mousedown', (e) => {
                if (scale <= 1) return
                isDragging = true
                dragStartX = e.clientX - translateX
                dragStartY = e.clientY - translateY
            })

            container.addEventListener('mousemove', (e) => {
                if (!isDragging) return
                translateX = e.clientX - dragStartX
                translateY = e.clientY - dragStartY
                clampDrag()
                updateTransform()
            })

            container.addEventListener('mouseup', () => { isDragging = false })
            container.addEventListener('mouseleave', () => { isDragging = false })

            /* ------- Pinch Zoom ------- */
            let startDist = 0

            container.addEventListener('touchstart', (e) => {
                if (e.touches.length === 2) {
                    const [t1, t2] = e.touches
                    startDist = Math.hypot(t2.pageX - t1.pageX, t2.pageY - t1.pageY)
                }

                // Triple tap to exit
                if (e.touches.length === 1) {
                    tapCount++
                    if (tapTimeout) clearTimeout(tapTimeout)
                    tapTimeout = setTimeout(() => {
                        if (tapCount >= 2) {
                            document.exitFullscreen()
                            container.remove()
                        }
                        tapCount = 0
                    }, 300)
                }
            })

            container.addEventListener('touchmove', (e) => {
                if (e.touches.length === 2) {
                    e.preventDefault()
                    const [t1, t2] = e.touches
                    const newDist = Math.hypot(t2.pageX - t1.pageX, t2.pageY - t1.pageY)
                    const pinchScale = newDist / startDist
                    scale = Math.max(1, Math.min(scale * pinchScale, 5))
                    startDist = newDist
                    clampDrag()
                    updateTransform()
                }
            })

            /* ------- Drag / Pan (Touch) ------- */
            img.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1 && scale > 1) {
                    const t = e.touches[0]
                    dragStartX = t.pageX - translateX
                    dragStartY = t.pageY - translateY
                    isDragging = true
                }
            })

            img.addEventListener('touchmove', (e) => {
                if (!isDragging || e.touches.length !== 1) return
                const t = e.touches[0]
                translateX = t.pageX - dragStartX
                translateY = t.pageY - dragStartY
                clampDrag()
                updateTransform()
            })

            img.addEventListener('touchend', () => { isDragging = false })

            /* ------- Esc key to exit ------- */
            document.addEventListener('keydown', function escListener(e) {
                if (e.key === 'Escape') {
                    document.exitFullscreen()
                    container.remove()
                    document.removeEventListener('keydown', escListener)
                }
            })

            container.appendChild(img)
            document.body.appendChild(container)
            container.requestFullscreen()
        }
    }
}


//Popup
// create one overlay once
const _overlay = document.createElement('div');
_overlay.className = 'overlay-bg';
_overlay.addEventListener('click', () => {
  // click overlay closes the topmost popup
  if (_popupStack.length) hide(_popupStack[_popupStack.length - 1]);
});
let _popupStack = []; // store currently open popups (stack order)
function show(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  if (!document.body.contains(_overlay)) {
    document.body.appendChild(_overlay);
    document.documentElement.classList.add('no-scroll');
  }

  // push to stack
  _popupStack.push(selector);

  el.classList.remove('hidden');
  requestAnimationFrame(() => {
    el.classList.add('visible'); // trigger animation
    el.scrollTop = 0;           // reset scroll after visibility
  });
}
function hide(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  el.classList.remove('visible');

  setTimeout(() => {
    el.classList.add('hidden');

    // remove from stack
    const index = _popupStack.indexOf(selector);
    if (index !== -1) _popupStack.splice(index, 1);

    // only remove overlay and restore scroll if stack empty
    if (_popupStack.length === 0) {
      if (document.body.contains(_overlay)) document.body.removeChild(_overlay);
      document.documentElement.classList.remove('no-scroll');
    }
  }, 250);
}

//Video
// Video Popup
function showVideo(videoSource) {
			// Close any existing modals
			const existingModal = document.querySelector('.video-modal');
			if (existingModal) {
				existingModal.remove();
			}

			// Create a modal container
			const modal = document.createElement('div');
			modal.className = 'video-modal';
			modal.style.position = 'fixed';
			modal.style.top = '0';
			modal.style.left = '0';
			modal.style.width = '100%';
			modal.style.height = '100%';
			modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
			modal.style.display = 'flex';
			modal.style.justifyContent = 'center';
			modal.style.alignItems = 'center';
			modal.style.zIndex = '2000'; // Ensure it is above any other popup

			// Create the video element
			const video = document.createElement('video');
			video.src = videoSource;
			video.controls = true;
			video.style.maxWidth = '90%';
			video.style.maxHeight = '90%';

			// Append the video to the modal
			modal.appendChild(video);

			// Close the modal when clicked
			modal.addEventListener('click', () => {
				modal.remove();
			});

			// Append the modal to the body
			document.body.appendChild(modal);
		}

        // Draggable Navigation Button
//Ada velocity and all sbb boleh dik

// Back button
document.getElementById("backBtn").addEventListener("click", function () {
  history.back(); // goes to previous page
  if (null == document.referrer || document.referrer === "") {
    window.location.href = "homepage.html"; // fallback to homepage if no referrer
  }
});

// To Top button
const topBtn = document.getElementById("topBtn");
topBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

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

