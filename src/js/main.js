/** Hämtar HTML element med id "menu" 
 * Funktionen körs när man kanppar på "menuEl"
 * Funktionen visar eller döljer dropdown menu
*/
const menuEl = document.getElementById("menu");
const dropdownEl = document.getElementById("dropdown-menu");

menuEl.addEventListener('click', () => {
    dropdownEl.classList.toggle('show');
})