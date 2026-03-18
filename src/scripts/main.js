(() => {
  const yearEl = document.querySelector(".js-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const header = document.querySelector(".header");
  const menuTrigger = document.querySelector(".js-menuTrigger");

  if (header && menuTrigger) {
    menuTrigger.addEventListener("click", () => {
      const isOpen = header.classList.toggle("menu-active");
      menuTrigger.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const cheSection = document.querySelector(".js-set-che");
  const hardhatSection = document.querySelector(".js-set-hardhat");
  const hat = document.querySelector(".logo > .hat");

  if (hat && cheSection && hardhatSection) {
    let cheAtTop = 0;
    let hardhatAtTop = 0;
    let ticking = false;

    const OFFSET = 150;

    const recalcThresholds = () => {
      cheAtTop =
        cheSection.getBoundingClientRect().top + window.scrollY - OFFSET;
      hardhatAtTop =
        hardhatSection.getBoundingClientRect().top + window.scrollY - OFFSET;
    };

    const updateHat = () => {
      const y = window.scrollY;

      hat.classList.remove("stetson", "che", "hard");

      if (y >= hardhatAtTop) {
        hat.classList.add("hard");
      } else if (y >= cheAtTop) {
        hat.classList.add("che");
      } else {
        hat.classList.add("stetson");
      }

      ticking = false;
    };

    recalcThresholds();
    updateHat();

    window.addEventListener("load", () => {
      recalcThresholds();
      updateHat();
    });

    window.addEventListener("resize", recalcThresholds, { passive: true });

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateHat);
          ticking = true;
        }
      },
      { passive: true },
    );
  }
})();
