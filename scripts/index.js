document.addEventListener("DOMContentLoaded", function () {
    const footerNav = document.querySelector(".footer__nav");
    const footerLegal = document.querySelector(".footer__legal");
    const footerBottom = document.querySelector(".footer__bottom");

    if (!footerNav || !footerLegal || !footerBottom) {
        console.error("Один из элементов не найден!");
        return;
    }

    function moveLegalLinks() {
        if (window.innerWidth <= 768) {
            footerNav.insertAdjacentElement("afterend", footerLegal);
        } else {
            footerBottom.appendChild(footerLegal);
        }
    }

    moveLegalLinks(); // Вызываем при загрузке страницы
    window.addEventListener("resize", moveLegalLinks); // Отслеживаем изменение размера окна
});

console.log('hello');