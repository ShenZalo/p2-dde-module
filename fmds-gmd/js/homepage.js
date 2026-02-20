// Switch welcome-image every 5 seconds
function switchWelcomeImage() {
  const images = [
    'img/welcome-background-1.jpg',
    'img/welcome-background-2.jpg',
    'img/welcome-background-3.jpg',
    'img/welcome-background-4.jpg',
    'img/welcome-background-5.jpg',
    'img/welcome-background-6.jpg'
  ];

  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    document.querySelector('.welcome-background').src = images[currentIndex];
  }, 5000);
}

window.addEventListener('load', switchWelcomeImage);

