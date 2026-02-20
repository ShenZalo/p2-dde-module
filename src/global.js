// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
    } else {
        mobileMenu.style.maxHeight = "0";
        setTimeout(() => mobileMenu.classList.add('hidden'), 300);
    }
});

  // Select buttons and modules
const btnGmd = document.querySelector(".btn-gmd");
const btnSd  = document.querySelector(".btn-sd");
const btnTft = document.querySelector(".btn-tft");

const moduleGmd = document.querySelector(".module-gmd");
const moduleSd  = document.querySelector(".module-sd");
const moduleTft = document.querySelector(".module-tft");

// Function to show a module and hide the others
function show(sectionToShow) {
  const modules = [
    { section: moduleGmd, btn: btnGmd },
    { section: moduleSd,  btn: btnSd },
    { section: moduleTft, btn: btnTft }
  ];

  modules.forEach(({ section, btn }) => {
    if (section === sectionToShow) {
      section.style.maxHeight = section.scrollHeight + "px";
      section.classList.remove("opacity-0");
      section.classList.add("opacity-100");

      btn.classList.add("bg-gray-600", "text-white");
    } else {
      section.style.maxHeight = "0px";
      section.classList.remove("opacity-100");
      section.classList.add("opacity-0");

      btn.classList.remove("bg-gray-600", "text-white");
    }
  });
}

// Add click listeners
btnGmd.addEventListener("click", () => show(moduleGmd));
btnSd.addEventListener("click",  () => show(moduleSd));
btnTft.addEventListener("click", () => show(moduleTft));

//Show GMD by default
show(moduleGmd);
