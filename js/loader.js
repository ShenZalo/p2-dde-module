//Page will show preloader until fully loaded
   window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("hide");

    setTimeout(() => {
      preloader.remove();
    }, 600); // must match CSS transition duration
  });

