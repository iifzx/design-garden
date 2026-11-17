(() => {
  const dataEl = document.getElementById("dg-data");
  let data = {};
  try {
    data = JSON.parse(dataEl ? dataEl.textContent : "{}");
  } catch (error) {
    data = {};
  }
  const ui = data.ui || {};
  const copiedLabel = ui.copied || "Copied";
  const copyLabel = ui.copy || "Copy";

  const copyText = async (text) => {
    if (!text) return false;
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (fallbackError) {
        ok = false;
      }
      area.remove();
      return ok;
    }
  };

  const flash = (button, message) => {
    if (!button) return;
    const previous = button.dataset.label || button.textContent;
    button.dataset.label = previous;
    button.textContent = message;
    window.setTimeout(() => {
      button.textContent = button.dataset.label || previous;
    }, 1600);
  };

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const ok = await copyText(button.dataset.copy || "");
      flash(button, ok ? copiedLabel : ui.copyFailed || "Copy failed");
    });
  });

  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = document.querySelector(button.dataset.copyTarget || "");
      if (!target) return;
      const rows = [...target.querySelectorAll(".check-row span")].map(
        (row) => "- [ ] " + row.textContent.trim(),
      );
      const ok = await copyText(rows.join("\n"));
      flash(button, ok ? copiedLabel : ui.copyFailed || "Copy failed");
    });
  });

  // Tour filters
  const tourFilters = document.querySelectorAll("[data-filter]");
  const tourItems = document.querySelectorAll(".tour-item");
  tourFilters.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";
      tourFilters.forEach((other) => {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      });
      tourItems.forEach((item) => {
        item.hidden = filter !== "all" && item.dataset.need !== filter;
      });
    });
  });

  // Gallery filters
  const galleryFilters = document.querySelectorAll("[data-gallery-filter]");
  const galleryItems = document.querySelectorAll(".work");
  const galleryEmpty = document.querySelector(".community-empty");
  galleryFilters.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.galleryFilter || "all";
      galleryFilters.forEach((other) => {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      });
      galleryItems.forEach((item) => {
        item.hidden = filter !== "all" && item.dataset.type !== filter;
      });
      if (galleryEmpty) {
        galleryEmpty.hidden = filter !== "all";
      }
    });
  });

  // Mobile menu: close after choosing a section
  const menu = document.querySelector(".mobile-menu");
  if (menu) {
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.removeAttribute("open");
      });
    });
  }

  // Blind pick
  const blindResult = document.querySelector("[data-blind-result]");
  const blindCards = document.querySelectorAll("[data-blind-index]");
  const blindButtons = document.querySelectorAll("[data-blind-side]");
  const blindSkip = document.querySelector("[data-blind-skip]");
  const featured = Array.isArray(data.featured) ? data.featured : [];
  let blindPair = featured.slice(0, 2);

  const titleFor = (work) => {
    if (!work) return "";
    const lang = document.documentElement.lang || "zh-CN";
    return lang.toLowerCase().startsWith("en") ? work.titleEn || work.title : work.title;
  };

  const paintBlind = () => {
    if (!blindCards.length || blindPair.length < 2) return;
    blindCards.forEach((card, index) => {
      const work = blindPair[index];
      if (!work) return;
      const image = card.querySelector("img");
      const link = card.querySelector("a");
      if (image) {
        image.src = work.imageUrl;
        image.alt = titleFor(work);
      }
      if (link) link.href = work.sourceUrl;
      const captionTitle = card.querySelector(".blind-caption-title");
      if (captionTitle) captionTitle.textContent = titleFor(work);
      const credit = card.querySelector(".blind-credit");
      if (credit) credit.textContent = work.credit || "";
    });
    if (blindResult) blindResult.textContent = "";
  };

  const pickBlind = () => {
    if (!featured.length) return;
    if (featured.length < 2) {
      blindPair = featured.slice(0, 2);
    } else {
      const first = Math.floor(Math.random() * featured.length);
      let second = Math.floor(Math.random() * featured.length);
      while (second === first) second = Math.floor(Math.random() * featured.length);
      blindPair = [featured[first], featured[second]];
    }
    paintBlind();
  };

  blindButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!blindResult || blindPair.length < 2) return;
      const side = button.dataset.blindSide === "left" ? "A" : "B";
      const template = blindResult.dataset.template || "";
      blindResult.textContent = template
        ? template.replace("{side}", side)
        : side;
    });
  });

  if (blindSkip) {
    blindSkip.addEventListener("click", pickBlind);
  }
  if (blindCards.length) {
    paintBlind();
  }

  // Style roulette
  const rouletteButton = document.querySelector("[data-roulette]");
  const rouletteResult = document.querySelector("[data-roulette-result]");
  const styles = Array.isArray(data.styles) ? data.styles : [];
  const spin = () => {
    if (!rouletteResult) return;
    if (!styles.length) {
      rouletteResult.textContent = ui.noStyles || "No styles loaded.";
      return;
    }
    const style = styles[Math.floor(Math.random() * styles.length)];
    rouletteResult.textContent = "";
    const prefix = document.createElement("span");
    prefix.className = "roulette-prefix";
    prefix.textContent = rouletteResult.dataset.prefix || "";
    rouletteResult.appendChild(prefix);
    const link = document.createElement("a");
    link.href = data.repo + "/blob/main/knowledge/styles/" + style.slug + ".md";
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = style.title;
    rouletteResult.appendChild(link);
    rouletteResult.dataset.current = style.title;
  };
  if (rouletteButton) {
    rouletteButton.addEventListener("click", spin);
  }

  // Recipe builder
  const recipeFields = document.querySelectorAll(".recipe-field input");
  const recipeOutput = document.querySelector("[data-recipe-output]");
  const recipeButton = document.querySelector("[data-copy-recipe]");
  const recipeSlots = recipeOutput ? recipeOutput.querySelectorAll("[data-slot]") : [];
  const slotFor = (id) => document.querySelector('[data-slot="' + id + '"]');
  const updateRecipe = () => {
    recipeFields.forEach((input) => {
      const slot = slotFor(input.id.replace("recipe-", ""));
      if (!slot) return;
      slot.textContent = input.value.trim() || input.placeholder;
    });
    if (recipeOutput) recipeOutput.dataset.text = recipeOutput.innerText.trim();
  };
  recipeFields.forEach((input) => input.addEventListener("input", updateRecipe));
  updateRecipe();
  if (recipeButton) {
    recipeButton.addEventListener("click", async () => {
      const text = recipeOutput ? recipeOutput.innerText.trim() : "";
      const ok = await copyText(text);
      flash(recipeButton, ok ? copiedLabel : ui.copyFailed || "Copy failed");
    });
  }
})();
