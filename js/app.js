import * as checkingFunctions from './modules/functions.js';

checkingFunctions.isWebp();

const headerElement = document.querySelector('.header');

if (headerElement) {
    const headerWrapper = document.querySelector('.header__wrapper');
    const headerHeight = headerWrapper.clientHeight;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset >= 28) {
            document.querySelector('.header__block').style.height = headerHeight - 30 + 'px';
            document.querySelector('.header__block').style.display = 'block';
            document.querySelector('.page').style.marginTop = '0';
            headerElement.classList.add('_scroll');
        } else {
            document.querySelector('.header__block').style.display = 'none';
            headerElement.classList.remove('_scroll');
            document.querySelector('.page').style.marginTop = '-93px';
        }
    });
}

const iconMenu = document.querySelector('.menu__icon'),
      menuBody = document.querySelector('.menu');

if (iconMenu) {
    iconMenu.addEventListener('click', () => {
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
        document.body.classList.toggle('lock');
    });
}

const removeClassMenu = () => {
    iconMenu.classList.remove('_active');
    menuBody.classList.remove('_active');
};

document.addEventListener("touchmove", function (e) {
    if (document.body.scrollTop < 0) {
        e.preventDefault();
    }
});

let slideUp = (target, targetHeight, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = targetHeight + 'px';
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            // target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
};

let slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.height = 252 + 'px';
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        // target.style.overflow = 'hidden';
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.classList.remove('_slide');
        }, duration);
    }
};

const reviews = document.querySelectorAll('.item-review');

if (reviews.length > 0) {
    for (let review of reviews) {
        const reviewText = review.querySelector('.item-review__text');
        const reviewBtnMore = review.querySelector('.item-review__button');
        const reviewTextFull = reviewText.textContent;
        const reviewTextSlice = reviewTextFull.slice(0, 262) + '...';
        if (reviewText.textContent.length > 290) {
            reviewText.textContent = reviewTextSlice;
            review.classList.add('more');
            let reviewHeight = review.offsetHeight;
            function getHeight() {
                reviewHeight = review.offsetHeight;
            }
            setTimeout(getHeight, 2500);
            window.addEventListener('resize', getHeight);
            reviewBtnMore.addEventListener('click', () => {
                reviewBtnMore.classList.toggle('hide');
                if (reviewBtnMore.classList.contains('hide')) {
                    reviewText.textContent = reviewTextFull;
                    slideDown(review, 200);
                    reviewBtnMore.textContent = 'Скрыть полный отзыв';
                } else {
                    reviewText.textContent = reviewTextSlice;
                    slideUp(review, reviewHeight, 200);
                    reviewBtnMore.textContent = 'Смотреть полный отзыв';
                }
            })
        }
    }
}

const popupLinks = document.querySelectorAll('.popup-link'),
      body = document.querySelector('body'),
      lockPadding = document.querySelectorAll('.lock-padding'), // для фиксированных обьектов
      timeout = 800;

let unlock = true;

if (popupLinks.length > 0) {
    popupLinks.forEach(item => {
        item.addEventListener('click', function (e) {
            const popupName = item.getAttribute('href').replace('#', ''),
                  currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    });
}

const popupCloseIcon = document.querySelectorAll('.close-popup');

if (popupCloseIcon.length > 0) {
    popupCloseIcon.forEach(item => {
        item.addEventListener('click', function(e) {
            popupClose(item.closest('.popup'));
            e.preventDefault();
        });
    });
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.active');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('active');
        currentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnLock = true) {
    if (unlock) {
        popupActive.classList.remove('active');
        if (doUnLock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';
    if (lockPadding.langth > 0) {
        lockPadding.forEach(item => {
            item.style.paddingRight = lockPaddingValue;
        });
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock'); // в css добавить body.lock overflow: hidden; 
    if (menuBody.classList.contains('_active')) {
        removeClassMenu();
    }
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            lockPadding.forEach(item => {
                item.style.paddingRight = '0px';
            });
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', (e) => {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.active');
        popupClose(popupActive);
    }
});

(function () {
    //проверяем поддержку
    if (Element.prototype.closest) {
        // реализуем
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
(function () {
    if (Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
})();

// Скролл к блокам

const menuLinks = document.querySelectorAll('.menu-link');

if (menuLinks.length > 0) {
    for (let menuLink of menuLinks) {
        menuLink.addEventListener('click', (e) => {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                e.preventDefault();
                removeClassMenu();
                document.body.classList.remove('lock');
                const scrollLinkPath = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header__wrapper').offsetHeight - 50;
                window.scrollTo({
                    top: scrollLinkPath,
                    behavior: 'smooth'
                });
            }
            
        });
    }
}