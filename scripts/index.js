const footerNav = document.querySelector(".footer__nav");
const footerLegal = document.querySelector(".footer__legal");
const footerBottom = document.querySelector(".footer__bottom");

function moveLegalLinks() {
    if (window.innerWidth <= 1368) {
        footerNav.insertAdjacentElement("afterend", footerLegal);
    } else {
        footerBottom.appendChild(footerLegal);
    }
}

moveLegalLinks();
window.addEventListener("resize", moveLegalLinks);


// cookie
const cookieBtns = document.querySelectorAll('.cookieBtn');
const cookie = document.querySelector('.cookie');

cookieBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        cookie.classList.add('hidden');
    });
});


// Hamburger Menu
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


// modal Window
const modalTriggers = document.querySelectorAll(".btn");
const windowInnerWidth = document.documentElement.clientWidth;
const scrollbarWidth = parseInt(window.innerWidth) - parseInt(windowInnerWidth);
const bodyElementHTML = document.getElementsByTagName("body")[0];
const modalBackground = document.getElementsByClassName("modal")[0];
const modalClose = document.getElementsByClassName("modal__close")[0];
const modalActive = document.getElementsByClassName("modal__active")[0];

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

// sticky header
document.addEventListener("DOMContentLoaded", function () {
    let headerMenuRight = document.querySelector(".header__menu-right");
    let headerMenuLeft = document.querySelector(".header__menu-left");
    let header = document.querySelector(".header");

    let headerHeight = header.offsetHeight;

    function updateHeader() {
        if (window.scrollY > 38) {
            headerMenuRight.classList.add("sticky");
            headerMenuLeft.classList.add("hidden");
            document.body.style.paddingTop = `${headerHeight}px`;
        } else {
            headerMenuRight.classList.remove("sticky");
            headerMenuLeft.classList.remove("hidden");
            document.body.style.paddingTop = "0px";
        }
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader);
});


// modal window
const phoneInput = document.querySelector(".modal__input-tel");
const countrySelect = document.querySelector(".PhoneInputCountrySelect");

let typingTimer;
const typingDelay = 500;

document.addEventListener("DOMContentLoaded", function () {
    if (countrySelect.value === "RU") {
        phoneInput.value = "+7";
        phoneInput.addEventListener("input", handlePhoneInput);
        phoneInput.addEventListener("keydown", handlePhoneKeydown);
    }

    countrySelect.addEventListener("change", function () {
        resetValidationError();

        if (countrySelect.value === "RU") {
            phoneInput.value = "+7";
            phoneInput.addEventListener("input", handlePhoneInput);
            phoneInput.addEventListener("keydown", handlePhoneKeydown);
        } else {
            phoneInput.value = "";
            phoneInput.removeEventListener("input", handlePhoneInput);
            phoneInput.removeEventListener("keydown", handlePhoneKeydown);
        }
    });
});

function handlePhoneInput() {
    clearTimeout(typingTimer);
    let value = phoneInput.value.replace(/\D/g, "");

    if (value.length > 0) {
        if (value.startsWith("8")) {
            value = "7" + value.slice(1);
        }

        if (!value.startsWith("7")) {
            value = "7" + value;
        }

        value = value.slice(0, 11);
        phoneInput.value = formatPhoneNumber(value);
    }

    typingTimer = setTimeout(() => {
        validatePhone(value);
    }, typingDelay);
}

function handlePhoneKeydown(event) {
    if (!/[\d]/.test(event.key) && !["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
    }

    if (phoneInput.value.replace(/\D/g, "").length >= 11 && event.key !== "Backspace" && event.key !== "Delete") {
        event.preventDefault();
    }
}

function formatPhoneNumber(value) {
    let formatted = "";

    if (value.length > 0) {
        formatted = "+7";
    }

    if (value.length > 1) formatted += " (" + value.substring(1, 4);
    if (value.length >= 5) formatted += ") " + value.substring(4, 7);
    if (value.length >= 8) formatted += "-" + value.substring(7, 9);
    if (value.length >= 10) formatted += "-" + value.substring(9, 11);

    return formatted;
}

function validatePhone(value) {
    let errorElement = document.querySelector(".phone-error");
    const wrapper = phoneInput.closest('.modal__wrapper');
    if (!wrapper) return;

    if (!errorElement) {
        errorElement = document.createElement("span");
        errorElement.className = "phone-error";
        wrapper.parentNode.insertBefore(errorElement, wrapper.nextSibling);
    }

    const operatorCodes = [
        "904", "910", "911", "912", "913", "914", "915", "916", "917", "918", "919",
        "920", "921", "922", "923", "924", "925", "926", "927", "928", "929",
        "930", "931", "932", "933", "934", "935", "936", "937", "938", "939",
        "950", "951", "952", "953", "954", "955", "956", "957", "958", "959",
        "960", "961", "962", "963", "964", "965", "966", "967", "968", "969",
        "970", "971", "972", "973", "974", "975", "976", "977", "978", "979",
        "980", "981", "982", "983", "984", "985", "986", "987", "988", "989",
        "991", "992", "993", "994", "995", "996", "997", "998", "999"
    ];

    let errorMessage = "";

    if (!/^\d+$/.test(value)) {
        errorMessage = "Invalid phone number.";
    } else if (value.length < 11) {
        errorMessage = "Invalid phone number.";
    } else {
        const cityCode = value.substring(1, 4);
        if (!operatorCodes.includes(cityCode)) {
            errorMessage = "Invalid phone number.";
        }
    }

    if (errorMessage) {
        addError(phoneInput, errorMessage);
    } else {
        removeError(phoneInput);
    }

    return !errorMessage;
}

function resetValidationError() {
    let errorElement = document.querySelector(".phone-error");
    if (errorElement) {
        errorElement.textContent = "";
    }
}

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    validateForm();

    const phoneValue = phoneInput.value.replace(/\D/g, "");
    if (countrySelect.value === "RU" && validatePhone(phoneValue)) {
        if (validateForm()) {
            const submitBtn = document.querySelector(".modal__window__form-btn");
            submitBtn.classList.add('active');
        } else {
            const submitBtn = document.querySelector(".modal__window__form-btn");
            submitBtn.classList.remove('active');
        }
    } else {
        const submitBtn = document.querySelector(".modal__window__form-btn");
        submitBtn.classList.remove('active');
    }
});

// Валидация формы
function validateForm() {
    let isValid = true;

    const requiredFields = document.querySelectorAll('.modal__span');

    requiredFields.forEach(span => {
        const label = span.closest('.modal__label');
        const input = label.querySelector('.modal__input');

        if (!input.value.trim()) {
            addError(input, 'This field is required');
            isValid = false;
        } else {
            removeError(input);
        }
    });

    return isValid;
}


function addError(input, message) {
    removeError(input);

    const wrapper = input.closest('.modal__wrapper');
    if (!wrapper) return;

    wrapper.classList.add('error-border'); // Add error border

    let existingError = wrapper.parentNode.querySelector('.error-message');
    if (!existingError) {
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;

        wrapper.parentNode.insertBefore(errorElement, wrapper.nextSibling);
    }

    input.classList.add('invalid'); // Mark the input as invalid

    input.addEventListener('input', function handler() {
        removeError(input);
        input.removeEventListener('input', handler);
    });
}

function removeError(input) {
    input.classList.remove('invalid'); // Remove the invalid class

    const wrapper = input.closest('.modal__wrapper');
    if (!wrapper) return;

    // Remove error border
    wrapper.classList.remove('error-border');

    const errorElement = wrapper.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove(); // Remove the error message
    }
}



const requiredInputs = document.querySelectorAll('.modal__input');

requiredInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim()) {
            removeError(input);
        }
    });
});

function toggleSubmitButton() {
    const submitBtn = document.querySelector(".modal__window__form-btn");
    const phoneValue = phoneInput.value.replace(/\D/g, "");

    if (countrySelect.value === "RU" && validatePhone(phoneValue) && validateForm()) {
        submitBtn.classList.add('active');
    } else {
        submitBtn.classList.remove('active');
    }
}

requiredInputs.forEach(input => {
    input.addEventListener('input', toggleSubmitButton);
});
phoneInput.addEventListener('input', toggleSubmitButton);





const submitBtn = document.querySelector(".modal__window__form-btn");
const modalThanks = document.querySelector(".modal-thanks");
const thanksClose = document.querySelector(".modal-thanks__close-btn");
const thanksMainBtn = document.querySelector(".modal-thanks__btn");

submitBtn.addEventListener("click", () => {
    if (submitBtn.classList.contains('active')) {
        modalThanks.classList.add('show-modal-thanks');
        modalBackground.style.display = "none";

        submitBtn.classList.remove('active');
        bodyElementHTML.style.marginRight = "-" + scrollbarWidth + "px";
    }
});


thanksClose.addEventListener("click", () => {
    modalThanks.classList.remove('show-modal-thanks');

    document.querySelector("form").reset();
    resetValidationError();

    submitBtn.classList.remove('active');

    bodyElementHTML.style.marginRight = "0";
});

thanksMainBtn.addEventListener("click", () => {
    modalThanks.classList.remove('show-modal-thanks');

    document.querySelector("form").reset();
    resetValidationError();

    submitBtn.classList.remove('active');

    bodyElementHTML.style.marginRight = "0";
});

modalTriggers.forEach(button => {
    button.addEventListener("click", () => {
        modalBackground.style.display = "block";

        if (windowInnerWidth >= 1366) {
            bodyMargin();
        }

        modalActive.style.left = "calc(50% - " + (166 - scrollbarWidth / 2) + "px)";

        submitBtn.classList.remove('active');
    });
});