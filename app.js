// ==========================================================================
// APP INIT
// ==========================================================================

function closeMobileMenu() {
  document.body.classList.remove("menu-open");
}

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("hashchange", renderRoute);
  renderRoute();

  document.getElementById("nav-toggle").addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });

  document.getElementById("nav-close")?.addEventListener("click", closeMobileMenu);
  document.getElementById("nav-overlay")?.addEventListener("click", closeMobileMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.show").forEach((m) => m.classList.remove("show"));
      closeMobileMenu();
    }
  });
});
