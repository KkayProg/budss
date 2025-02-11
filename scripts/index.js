// const footerNav = document.querySelector(".footer__nav");
// const footerLegal = document.querySelector(".footer__legal");
// const footerBottom = document.querySelector(".footer__bottom");

// if (!footerNav || !footerLegal || !footerBottom) {
//     console.error("Один из элементов не найден!");
//     return;
// }

// function moveLegalLinks() {
//     if (window.innerWidth <= 1368) {
//         footerNav.insertAdjacentElement("afterend", footerLegal);
//     } else {
//         footerBottom.appendChild(footerLegal);
//     }
// }

// moveLegalLinks(); // Вызываем при загрузке страницы
// window.addEventListener("resize", moveLegalLinks); // Отслеживаем изменение размера окна





// document.querySelector(".hamburger-menu").addEventListener("click", () => {
//     document.querySelector(".nav-links").classList.toggle("show-menu");
// });







// // устанавливаем триггер для модального окна (название можно изменить)
// const modalTriggers = document.querySelectorAll(".btn");


// // получаем ширину отображенного содержимого и толщину ползунка прокрутки
// const windowInnerWidth = document.documentElement.clientWidth;
// const scrollbarWidth = parseInt(window.innerWidth) - parseInt(windowInnerWidth);

// // привязываем необходимые элементы
// const bodyElementHTML = document.getElementsByTagName("body")[0];
// const modalBackground = document.getElementsByClassName("modalBackground")[0];
// const modalClose = document.getElementsByClassName("modalClose")[0];
// const modalActive = document.getElementsByClassName("modalActive")[0];

// // функция для корректировки положения body при появлении ползунка прокрутки
// function bodyMargin() {
//     bodyElementHTML.style.marginRight = "-" + scrollbarWidth + "px";
// }

// // при длинной странице - корректируем сразу
// bodyMargin();

// // событие нажатия на триггер открытия модального окна
// modalTriggers.forEach(button => {
//     button.addEventListener("click", () => {
//         // делаем модальное окно видимым
//         modalBackground.style.display = "block";

//         // если размер экрана больше 1366 пикселей (т.е. на мониторе может появиться ползунок)
//         if (windowInnerWidth >= 1366) {
//             bodyMargin();
//         }

//         // позиционируем наше окно по середине, где 175 - половина ширины модального окна
//         modalActive.style.left = "calc(50% - " + (175 - scrollbarWidth / 2) + "px)";
//     });
// });

// // нажатие на крестик закрытия модального окна
// modalClose.addEventListener("click", function () {
//     modalBackground.style.display = "none";
//     if (windowInnerWidth >= 1366) {
//         bodyMargin();
//     }
// });

// // закрытие модального окна на зону вне окна, т.е. на фон
// modalBackground.addEventListener("click", function (event) {
//     if (event.target === modalBackground) {
//         modalBackground.style.display = "none";
//         if (windowInnerWidth >= 1366) {
//             bodyMargin();
//         }
//     }
// });

// document.addEventListener("keydown", function (event) {
//     if (event.key === "Escape" && modalBackground.style.display === "block") {
//         modalBackground.style.display = "none";
//         if (window.innerWidth >= 1366) {
//             bodyElementHTML.style.marginRight = "0";
//         }
//     }
// });
















document.addEventListener("DOMContentLoaded", function () {
    let headerMenuRight = document.querySelector(".header__menu-right");
    let headerMenuLeft = document.querySelector(".header__menu-left");
    let header = document.querySelector(".header");

    let headerHeight = header.offsetHeight; // Запоминаем высоту хедера

    function updateHeader() {
        if (window.scrollY > 38) { // Когда прокручено 38px
            headerMenuRight.classList.add("sticky");
            headerMenuLeft.classList.add("hidden");
            document.body.style.paddingTop = `${headerHeight}px`; // Компенсируем исчезновение
        } else {
            headerMenuRight.classList.remove("sticky");
            headerMenuLeft.classList.remove("hidden");
            document.body.style.paddingTop = "0px";
        }
    }

    // Проверяем положение скролла при загрузке страницы
    updateHeader();

    window.addEventListener("scroll", updateHeader);
});