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

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addCalculatorButton);
  else addCalculatorButton();
})();
