// // target the button using the data attribute we added earlier
// const button = document.querySelector("[data-theme-toggle]");

// button.addEventListener("click", () => {
//   const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

//   // update the button text
//   const newCta = newTheme === "dark" ? "Change to light theme" : "Change to dark theme";
//   button.innerText = newCta;  

//   // use an aria-label if you are omitting text on the button
//   // and using sun/moon icons, for example
//   button.setAttribute("aria-label", newCta);

//   // update theme attribute on HTML to switch theme in CSS
//   document.querySelector("html").setAttribute("data-theme", newTheme);

//   // update in local storage
//   localStorage.setItem("theme", newTheme);

//   // update the currentThemeSetting in memory

