// This script executes immediately to prevent theme flashing
(function() {
  // Get saved theme or detect user preference
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  
  // Apply theme immediately, before the page renders
  const theme = getPreferredTheme();
  document.documentElement.setAttribute("data-theme", theme);
})();
