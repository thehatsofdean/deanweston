(() => {
  const year = new Date().getFullYear();
  const yearEl = document.querySelector(".js-year");
  if (yearEl) yearEl.textContent = String(year);

  const header = document.querySelector(".header");
  const menuTrigger = document.querySelector(".js-menuTrigger");

  if (menuTrigger && header) {
    menuTrigger.addEventListener("click", () => {
      const isOpen = header.classList.toggle("menu-active");
      menuTrigger.setAttribute("aria-expanded", isOpen);
    });
  }

  const cheSection = document.querySelector(".js-set-che");
  const borisSection = document.querySelector(".js-set-hardhat");
  const hat = document.querySelector(".logo > .hat");

  // Bail early if key elements aren’t present
  if (!hat || !cheSection || !borisSection) return;

  let scrollHappened = false;
  let cheAtTop = 0;
  let borisAtTop = 0;

  const recalcThresholds = () => {
    cheAtTop = cheSection.getBoundingClientRect().top + window.scrollY - 150;
    borisAtTop =
      borisSection.getBoundingClientRect().top + window.scrollY - 150;
  };

  recalcThresholds();
  window.addEventListener("resize", recalcThresholds, { passive: true });

  window.addEventListener(
    "scroll",
    () => {
      scrollHappened = true;
    },
    { passive: true },
  );

  setInterval(() => {
    if (!scrollHappened) return;
    scrollHappened = false;

    const y = window.scrollY;

    // che threshold first, then hardhat can override.
    if (y >= cheAtTop) {
      hat.classList.remove("stetson");
      hat.classList.add("che");
    } else {
      hat.classList.remove("che", "hard");
      hat.classList.add("stetson");
    }

    if (y >= borisAtTop) {
      hat.classList.remove("che");
      hat.classList.add("hard");
    } else {
      hat.classList.remove("hard");
      hat.classList.add("stetson");
    }
  }, 250);
})();
