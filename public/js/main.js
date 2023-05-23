document.addEventListener('DOMContentLoaded', function() {
const iconoMenu = document.querySelector('.burger-button');
const menu = document.querySelector('#menu');
const contMenu = document.querySelector('.cont-menu');

iconoMenu.addEventListener('click', (e) => {
    menu.classList.toggle("active");

  })
})