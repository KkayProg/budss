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
            bodyMargin();
        }
    }
});

const formState = {
    isNameValid: false,
    isEmailValid: false,
    isPhoneValid: false,
};

const wrapperName = document.querySelector('.wrapper-name');
const wrapperEmail = document.querySelector('.wrapper-email');
const wrapperPhone = document.querySelector('.wrapper-phone');
const inputName = document.querySelector('.input-name');
const inputEmail = document.querySelector('.input-email');
const inputPhone = document.querySelector('.modal__input-tel');
const countrySelect = document.querySelector('.PhoneInputCountrySelect');
const errorsFormText = document.querySelector('.errors-form');
const submitBtn = document.querySelector(".modal__window__form-btn");
const modalThanks = document.querySelector(".modal-thanks");
const thanksClose = document.querySelector(".modal-thanks__close-btn");
const thanksMainBtn = document.querySelector(".modal-thanks__btn");

let isNameTouched = false;
let isEmailTouched = false;
let isPhoneTouched = false;

function removeError(wrapper) {
    wrapper.classList.remove('error-border');
    const errorElement = wrapper.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function addError(wrapper, message) {
    wrapper.classList.add('error-border');

    let errorElement = wrapper.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement("span");
        errorElement.className = "error-message";
        wrapper.parentNode.insertBefore(errorElement, wrapper.nextSibling);
    }
    errorElement.textContent = message;
}

function validateField(input, wrapper) {
    if (!input.value.trim()) {
        addError(wrapper, 'This field is required');
        return false;
    }
    removeError(wrapper);
    return true;
}


function updateFormState() {
    if (isNameTouched) {
        formState.isNameValid = validateField(inputName, wrapperName);
    } else {
        formState.isNameValid = false;
    }

    if (isEmailTouched) {
        formState.isEmailValid = validateField(inputEmail, wrapperEmail);
    } else {
        formState.isEmailValid = false;
    }

    if (isPhoneTouched) {
        formState.isPhoneValid = validatePhone(inputPhone.value.replace(/\D/g, ''), countrySelect.value);
    } else {
        formState.isPhoneValid = false;
    }

    const isFormValid = formState.isNameValid && formState.isEmailValid && formState.isPhoneValid;

    if (isFormValid) {
        submitBtn.classList.add('active', 'btn');
    } else {
        submitBtn.classList.remove('active', 'btn');
    }

    const shouldShowErrors =
        (isNameTouched && !formState.isNameValid) ||
        (isEmailTouched && !formState.isEmailValid) ||
        (isPhoneTouched && !formState.isPhoneValid);

    errorsFormText.style.display = shouldShowErrors ? 'block' : 'none';

    console.log('Форма валидна?', isFormValid);
    return isFormValid;
}

inputName.addEventListener('focus', function () {
    isNameTouched = true;
    removeError(wrapperName);
});
inputName.addEventListener('blur', function () {
    isNameTouched = true;
    formState.isNameValid = validateField(inputName, wrapperName);
    updateFormState();
});

inputEmail.addEventListener('focus', function () {
    isEmailTouched = true;
    removeError(wrapperEmail);
});
inputEmail.addEventListener('blur', function () {
    isEmailTouched = true;
    formState.isEmailValid = validateField(inputEmail, wrapperEmail);
    updateFormState();
});

inputPhone.addEventListener('focus', function () {
    isPhoneTouched = true; 
    removeError(wrapperPhone);
});
inputPhone.addEventListener('blur', function () {
    isPhoneTouched = true;
    formState.isPhoneValid = validatePhone(inputPhone.value.replace(/\D/g, ''), countrySelect.value);
    updateFormState();
});

if (countrySelect.value === "RU") {
    inputPhone.value = "+7";
    inputPhone.addEventListener("input", handlePhoneInput);
    inputPhone.addEventListener("keydown", handlePhoneKeydown);
}

countrySelect.addEventListener("change", function () {
    resetValidationError();

    inputPhone.value = "";
    if (countrySelect.value === "RU") {
        inputPhone.value = "+7";
        inputPhone.addEventListener("input", handlePhoneInput);
        inputPhone.addEventListener("keydown", handlePhoneKeydown);
    } else {
        inputPhone.removeEventListener("input", handlePhoneInput);
        inputPhone.removeEventListener("keydown", handlePhoneKeydown);
    }
    updateFormState();
});

let typingTimer;

function handlePhoneInput() {
    clearTimeout(typingTimer);
    let value = inputPhone.value.replace(/\D/g, "");

    if (value.length > 0) {
        if (value.startsWith("8")) {
            value = "7" + value.slice(1);
        }

        if (!value.startsWith("7")) {
            value = "7" + value;
        }

        value = value.slice(0, 11);
        inputPhone.value = formatPhoneNumber(value);
    }

    typingTimer = setTimeout(() => {
        validatePhone(value, countrySelect.value);
        updateFormState();
    }, 500);
}

function handlePhoneKeydown(event) {
    if (!/[\d]/.test(event.key) && !["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
    }

    if (inputPhone.value.replace(/\D/g, "").length >= 11 && event.key !== "Backspace" && event.key !== "Delete") {
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

function validatePhone(value, country) {
    let errorElement = document.querySelector(".error-message");
    const wrapper = inputPhone.closest('.modal__wrapper');
    if (!wrapper) return false;

    if (!errorElement) {
        errorElement = document.createElement("span");
        errorElement.className = "error-message";
        wrapper.parentNode.insertBefore(errorElement, wrapper.nextSibling);
    }

    let errorMessage = "";

    if (country === "RU") {
        const operatorCodes = [
            "900", "904", "910", "911", "912", "913", "914", "915", "916", "917", "918", "919",
            "920", "921", "922", "923", "924", "925", "926", "927", "928", "929",
            "930", "931", "932", "933", "934", "935", "936", "937", "938", "939",
            "950", "951", "952", "953", "954", "955", "956", "957", "958", "959",
            "960", "961", "962", "963", "964", "965", "966", "967", "968", "969",
            "970", "971", "972", "973", "974", "975", "976", "977", "978", "979",
            "980", "981", "982", "983", "984", "985", "986", "987", "988", "989",
            "991", "992", "993", "994", "995", "996", "997", "998", "999"
        ];

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
    } else if (!country) {
        errorMessage = "This field is required.";
    } else if (!value.trim()) {
        errorMessage = "This field is required."; 
    }

    if (errorMessage) {
        addError(wrapper, errorMessage);
        return false;
    } else {
        removeError(wrapper);
        return true;
    }
}

function resetValidationError() {
    let errorElement = document.querySelector(".error-message");
    if (errorElement) {
        errorElement.textContent = "";
    }
}

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); 

    isNameTouched = true;
    isEmailTouched = true;
    isPhoneTouched = true;

    const isFormValid = updateFormState();

    if (isFormValid) {
        modalThanks.classList.add('show-modal-thanks');
        modalBackground.style.display = "none";

        submitBtn.classList.remove('active');
        bodyElementHTML.style.marginRight = "-" + scrollbarWidth + "px";
    } else {
        console.log('Форма невалидна, исправьте ошибки');
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