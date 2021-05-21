// smooth scroll

const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const sectionId = anchor.getAttribute('href').substr(1);
        if (sectionId) {
            document.getElementById(sectionId).scrollIntoView( {
                behavior: 'smooth',
                block: 'start'
            });
        }
  });
}

// popup

function toggleActive(el) {
    el.classList.toggle('active');
}
function toggleFade(el) {
    el.classList.toggle('fade');
}

function showPopup(popup) {
    popups.forEach(el => {
        el.classList.remove('active');
        el.classList.remove('fade');
    })
    toggleFade(popup);
    setTimeout(toggleActive, 0, popup);
    let popupClose = popup.querySelector('.page-popup__close');
    popupClose.onclick = function() {
        hidePopup(popup)
    }
}

function hidePopup(popup) {
    setTimeout(toggleActive, 0, popup);
    setTimeout(toggleFade, 300, popup);
}

function hideOnClick(popup) {
    window.addEventListener('click', function(e) {
        if(e.target === popup) {
            hidePopup(popup)
        }
    })
}

let popupLinks = [...document.querySelectorAll('.show-popup-link')];
let popups = [...document.querySelectorAll('.page-popup')];
const consultationPopup = document.querySelector('.page-popup__conultation'); 
const callbackPopup = document.querySelector('.page-popup__callback'); 

popupLinks.forEach(el => {
    el.onclick = function(ev) {
        ev.preventDefault();
        let linkTarget = el.dataset.popup;
        if(linkTarget === "callback") {
            showPopup(callbackPopup);
            
        } else {
            showPopup(consultationPopup);
        }
    }
});

hideOnClick(consultationPopup);
hideOnClick(callbackPopup);

// navigation

const headerLogo = document.querySelector('.header__logo');
const jumpMenu = document.querySelector('.jump-menu');
const headerNav = document.querySelector('.header__nav');
const burgerBtn = document.querySelector('.burger-btn');
const body = document.querySelector('body');

const navLinks = [...document.querySelectorAll('.page-nav__link')];

for(let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function() {
        burgerBtn.classList.toggle('active');
        headerNav.classList.toggle('active');
        headerLogo.classList.toggle('active');
        
        if(jumpMenu.classList.contains === 'active') {
            hideMenu(jumpMenu)
        } else {
            showMenu(jumpMenu)
        }
    });
}


function showMenu(menu) {
    toggleFade(menu);
    setTimeout(toggleActive, 0, menu);
}

function hideMenu(menu) {
    toggleActive(menu);
    setTimeout(toggleFade, 300, menu);
}

burgerBtn.onclick = function() {
    burgerBtn.classList.toggle('active');
    headerNav.classList.toggle('active');
    headerLogo.classList.toggle('active');
    
    if(jumpMenu.classList.contains === 'active') {
        hideMenu(jumpMenu)
    } else {
        showMenu(jumpMenu)
    }
}

window.addEventListener('click', function(e) {
    if(e.target === jumpMenu) {
        hideMenu(jumpMenu);
        burgerBtn.classList.toggle('active');
        headerNav.classList.toggle('active');
        headerLogo.classList.toggle('active');
    }
});

// pics swiper

const picsSwiper = new Swiper(".pics-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
    },
    navigation: {
        nextEl: '.pics-swiper__next',
        prevEl: '.pics-swiper__prev',
    },
});

// phone mask

let elementsWithMask = document.getElementsByClassName('imaskjs__input_tel');
for (let i = 0; i < elementsWithMask.length; i++) {
   
    let mask = IMask(elementsWithMask[i], {
        mask: '+{7}(000)000-00-00',
        lazy: true
    });
    elementsWithMask[i].onfocus = function() {
        mask.updateOptions({
            lazy: false
        });
    }
    elementsWithMask[i].onblur = function() { 
        if(mask.unmaskedValue === '7') {
            mask.updateOptions({
                lazy: true
            });
        }
    }
}

// form validation

const pageForms = [...document.querySelectorAll('form')];

pageForms.forEach(el => {
    let submitBtn = el.querySelector('.page-btn__link_form');
    submitBtn.addEventListener('click', function(ev) {
        let formInputs = [...el.querySelectorAll('.form-input')];
        for(let i = 0; i < formInputs.length; i++) {
            let formInput = formInputs[i];
            formInput.addEventListener('focus', function() {
                formInput.classList.remove('invalidated')
            });
            let formInputName = formInput.getAttribute('name');
            switch (formInputName) {
                case 'userPhone':

                    
                    break;
                default:
                    if(!formInput.value) {
                        formInput.classList.add('invalidated')
                    } 
                    break;
            }
        }
        let invalidatedInputs = [...el.querySelectorAll('.invalidated')];
        if(invalidatedInputs.length > 0) {
            ev.preventDefault();
        }
    })
});

// parallax

let picsWithParallax = document.querySelectorAll('.mouse-parallax-pic');
for (let i = 0; i < picsWithParallax.length; i++){
    window.addEventListener('mousemove', function(e) { 
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;     
        picsWithParallax[i].style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
    });    
}



