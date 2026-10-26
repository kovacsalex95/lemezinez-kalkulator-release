/*
 * Shop-wide helper for lemezinez.hu, loaded on every page by the loader in
 * Szkript beszúrás (see README, "Deploying to UNAS").
 *
 * - Loads custom.css from the same release, so one version number in UNAS
 *   covers both files.
 * - On a slat's product page, adds a button under the cart button that opens
 *   the calculator with that slat preselected. A page counts as a slat when
 *   the shop files it under "Acél Kerítéslécek", so new slats and colours get
 *   the button without a release. The calculator reads the slat type and
 *   colour from the product name it is given.
 * - On any product page, replaces a centimetre length dropdown with a number
 *   field and a slider that drive the hidden dropdown.
 */
(function () {
  "use strict";
  const SLAT_CATEGORY = "Acél Kerítéslécek";
  const CALCULATOR = "/keriteskalkulator";

  const self = document.currentScript;
  if (self && self.src) {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = self.src.replace(/shop[.]js([?#].*)?$/, "custom.css");
    document.head.appendChild(css);
  }

  // The Product block of the page's structured data, or null.
  function pageProduct() {
    const blocks = document.querySelectorAll('script[type="application/ld+json"]');
    for (const block of blocks) {
      try {
        const data = JSON.parse(block.textContent);
        if (data && data["@type"] === "Product") return data;
      } catch (e) { /* not JSON: skip the block */ }
    }
    return null;
  }

  function decode(text) {
    const t = document.createElement("textarea");
    t.innerHTML = text;
    return t.value;
  }

  function addCalculatorButton() {
    if (document.body.id !== "ud_shop_artdet" || document.getElementById("lis-calc-btn")) return;
    const cart = document.getElementById("artdet__cart");
    const product = pageProduct();
    if (!cart || !product || !product.name) return;
    // UNAS puts the category path ("Acél Kerítéslécek > Rusztikus kerítésléc")
    // in the offer, not on the product.
    const offer = Array.isArray(product.offers) ? product.offers[0] : product.offers;
    const category = decode(String((offer && offer.category) || product.category || ""));
    if (category.indexOf(SLAT_CATEGORY) !== 0) return;
    const link = document.createElement("a");
    link.id = "lis-calc-btn";
    link.className = "lis-calc-btn btn btn-block";
    link.href = CALCULATOR + "?termek=" + encodeURIComponent(decode(product.name).trim());
    link.textContent = "Mennyi kell? Kerítéskalkulátor";
    cart.insertAdjacentElement("afterend", link);
  }

  // The centimetre length variant ("Hosszúság méret (30cm-300cm)") becomes a
  // number field with -/+ and a slider. The theme's dropdown stays in the page,
  // hidden: every committed value selects its option and fires the change the
  // theme listens to, so price and cart work exactly as with the dropdown.
  // Option values are used as stored, some with a trailing space.
  function lengthOptions(select) {
    const byCm = new Map();
    for (const option of select.options) {
      if (!option.value) continue;
      const m = /^ *([0-9]+) *cm *$/.exec(option.value);
      if (!m) return null;
      byCm.set(Number(m[1]), option.value);
    }
    return byCm.size > 1 ? byCm : null;
  }

  function addLengthControl(select) {
    const wrap = select.closest(".js-variant-wrap");
    const name = wrap && wrap.querySelector('input[name^="egyeb_nev"]');
    if (!name || !/hossz/i.test(name.value) || wrap.dataset.lisLength) return;
    const byCm = lengthOptions(select);
    if (!byCm) return;
    wrap.dataset.lisLength = "1";
    const lengths = Array.from(byCm.keys()).sort(function (a, b) { return a - b; });
    const min = lengths[0];
    const max = lengths[lengths.length - 1];
    const id = "lis-len-" + select.id;

    const box = document.createElement("div");
    box.className = "lis-len form-group";
    box.innerHTML =
      '<label class="lis-len-label" for="' + id + '"></label>' +
      '<div class="lis-len-row">' +
      '<button type="button" class="lis-len-step" data-step="-1" aria-label="Rövidebb">−</button>' +
      '<input type="number" class="form-control lis-len-input" id="' + id + '" inputmode="numeric" min="' + min + '" max="' + max + '" step="1" placeholder="pl. 200">' +
      '<span class="lis-len-unit">cm</span>' +
      '<button type="button" class="lis-len-step" data-step="1" aria-label="Hosszabb">+</button>' +
      "</div>" +
      '<input type="range" class="lis-len-range" min="' + min + '" max="' + max + '" step="1" aria-label="Hosszúság csúszkával">' +
      '<div class="lis-len-hint"></div>';
    box.querySelector("label").textContent = name.value;
    const input = box.querySelector(".lis-len-input");
    const range = box.querySelector(".lis-len-range");
    const hint = box.querySelector(".lis-len-hint");
    const rangeText = min + "–" + max + " cm, centiméterre pontosan.";
    hint.textContent = rangeText;

    function nearest(cm) {
      return lengths.reduce(function (best, l) { return Math.abs(l - cm) < Math.abs(best - cm) ? l : best; }, lengths[0]);
    }
    function show(cm) {
      input.value = cm === null ? "" : String(cm);
      range.value = String(cm === null ? Math.round((min + max) / 2) : cm);
      box.classList.toggle("lis-len-unset", cm === null);
    }
    function commit(cm) {
      const value = byCm.get(cm);
      box.classList.remove("lis-len-error");
      hint.textContent = rangeText;
      show(cm);
      if (select.value === value) return;
      select.value = value;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
    function chosen() {
      const m = /^ *([0-9]+)/.exec(select.value || "");
      return m ? Number(m[1]) : null;
    }

    // While typing, only a length the shop sells is applied. On leaving the
    // field (or Enter) the value snaps to the nearest one, so the field always
    // shows what goes into the cart.
    input.addEventListener("input", function () {
      const cm = Number(input.value);
      if (input.value !== "" && byCm.has(cm)) commit(cm);
    });
    input.addEventListener("change", function () {
      if (input.value === "") { show(chosen()); return; }
      commit(nearest(Math.round(Number(input.value))));
    });
    range.addEventListener("input", function () { commit(Number(range.value)); });
    box.querySelectorAll(".lis-len-step").forEach(function (b) {
      b.addEventListener("click", function () {
        const from = chosen();
        commit(nearest(from === null ? Math.round((min + max) / 2) : from + Number(b.dataset.step)));
      });
    });

    // The theme reports a missing variant inside the hidden wrap; say it here.
    document.querySelectorAll(".artdet__cart-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (chosen() !== null) return;
        box.classList.add("lis-len-error");
        hint.textContent = "Kérjük, adja meg a hosszúságot (" + min + "–" + max + " cm).";
        input.focus();
      }, true);
    });

    wrap.style.display = "none";
    wrap.insertAdjacentElement("afterend", box);
    show(chosen());
  }

  function addLengthControls() {
    if (document.body.id !== "ud_shop_artdet") return;
    document.querySelectorAll('.js-variant-wrap select[name^="egyeb_list"]').forEach(addLengthControl);
  }

  function init() {
    addCalculatorButton();
    addLengthControls();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
