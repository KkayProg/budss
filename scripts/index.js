const footerNav = document.querySelector(".footer__nav");
const footerLegal = document.querySelector(".footer__legal");
const footerBottom = document.querySelector(".footer__bottom");

// перемещение ссылкок footer
function moveLegalLinks() {
    if (window.innerWidth <= 1368) {
        footerNav.insertAdjacentElement("afterend", footerLegal);
    } else {
        footerBottom.appendChild(footerLegal);
    }
}

moveLegalLinks(); 
window.addEventListener("resize", moveLegalLinks); // отслеживание изменение размера окна

// Coookie
const cookieAccet = document.getElementById('cookieBtnAccet');
const cookieDecline = document.getElementById('cookieBtnDecline');
const cookie = document.querySelector('.cookie');


cookieAccet.addEventListener('click', () => {
    cookie.classList.add('hidden');
});
cookieDecline.addEventListener('click', () => {
    cookie.classList.add('hidden');
});



const hamburgerMenu = document.querySelector(".hamburger-menu");
const humburgerWrapper = document.getElementById('humburger__wrapper');
const closeburgerBtn = document.getElementById('humburger__close-btn');

hamburgerMenu.addEventListener("click", () => {
    humburgerWrapper.classList.toggle("hidden");
    document.body.classList.toggle("no-scroll");
});

closeburgerBtn.addEventListener("click", () => {
    humburgerWrapper.classList.add("hidden");
    document.body.classList.remove("no-scroll");
});



// триггер модального окна
const modalTriggers = document.querySelectorAll(".btn");


// получаем ширину отображенного содержимого и толщину ползунка прокрутки
const windowInnerWidth = document.documentElement.clientWidth;
const scrollbarWidth = parseInt(window.innerWidth) - parseInt(windowInnerWidth);

// привязываем необходимые элементы
const bodyElementHTML = document.getElementsByTagName("body")[0];
const modalBackground = document.getElementsByClassName("modal")[0];
const modalClose = document.getElementsByClassName("modal__close")[0];
const modalActive = document.getElementsByClassName("modal__active")[0];

// функция для корректировки положения body при появлении ползунка прокрутки
function bodyMargin() {
    bodyElementHTML.style.marginRight = "-" + scrollbarWidth + "px";
}

bodyMargin();

modalTriggers.forEach(button => {
    button.addEventListener("click", () => {
        modalBackground.style.display = "block";

        if (windowInnerWidth >= 1366) {
            bodyMargin();
        }

        modalActive.style.left = "calc(50% - " + (166 - scrollbarWidth / 2) + "px)";
    });
});

modalClose.addEventListener("click", function () {
    modalBackground.style.display = "none";
    if (windowInnerWidth >= 1366) {
        bodyMargin();
    }
});

modalBackground.addEventListener("click", function (event) {
    if (event.target === modalBackground) {
        modalBackground.style.display = "none";
        if (windowInnerWidth >= 1366) {
            bodyMargin();
        }
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modalBackground.style.display === "block") {
        modalBackground.style.display = "none";
        if (window.innerWidth >= 1366) {
            bodyElementHTML.style.marginRight = "0";
        }
    }
});
















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