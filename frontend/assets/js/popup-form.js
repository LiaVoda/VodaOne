// POPUP FORM SCRIPT

// Add event listeners from Menu
const menuBuyHook = document.getElementById('menu-buy-hook');
menuBuyHook.addEventListener('click', ToggleContactForm);
const menuSupportHook = document.getElementById('menu-support-hook');
menuSupportHook.addEventListener('click', ToggleContactForm);
// Add event listners from Sale Rep
const saleRepHook = document.getElementById('sales-rep-button');
saleRepHook.addEventListener('click', ToggleContactForm);
// Add event listeners from Showcases
const showcase1More = document.getElementById('showcase1-more');
showcase1More.addEventListener('click', ToggleContactForm);
const showcase2More = document.getElementById('showcase2-more');
showcase2More.addEventListener('click', ToggleContactForm);
const showcase3More = document.getElementById('showcase3-more');
showcase3More.addEventListener('click', ToggleContactForm);
const showcase4More = document.getElementById('showcase4-more');
showcase4More.addEventListener('click', ToggleContactForm);
// Add event listeners from Footer Hook
const phoneHook = document.getElementById('phone-hook');
phoneHook.addEventListener('click', ToggleContactForm);
// Add event listner from close button in Popup Form
const closePopupForm = document.getElementById('close-popup-form');
closePopupForm.addEventListener('click', ToggleContactForm);

// Contact Form
const contactForm = document.getElementById('popup-form');
// Show Contact Form
function ToggleContactForm(e) {
    // Avoid crashing
    if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
    }
    // Send data to GTM if form state was hidden
    if (contactForm.classList.contains('popup-form-hidden'))
        SendDataToGoogleTagManager('popup_form_opened','not_traced');
    // Toggle Contact Form
    contactForm.classList.toggle('popup-form-hidden');
    contactForm.classList.toggle('popup-form-visible');
}
