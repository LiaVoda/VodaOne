// NAVIGATE SCRIPT

// Offset (header menu size)
const offsetY = 75;

// Navigate to Showcase 
// Add event listeners
const menuShowcase = document.getElementById('menu-showcase-hook');
menuShowcase.addEventListener('click', navigateToShowcase);
// Showcase anchor
const showcaseAnchor = document.getElementById('showcase1');
// Navigate to Showcase function
function navigateToShowcase(e) {
    e.preventDefault();
    window.scrollTo({
        top: showcaseAnchor.offsetTop - offsetY,
        behavior: 'smooth'
    });
}

// Navigate to Validate Place
const menuPlacesHook = document.getElementById('menu-places-hook');
menuPlacesHook.addEventListener('click', navigateToValidatePlace);
const showcase1Place = document.getElementById('showcase1-place');
showcase1Place.addEventListener('click', navigateToValidatePlace);
const showcase2Place = document.getElementById('showcase2-place');
showcase2Place.addEventListener('click', navigateToValidatePlace);
const showcase3Place = document.getElementById('showcase3-place');
showcase3Place.addEventListener('click', navigateToValidatePlace);
const showcase4Place = document.getElementById('showcase4-place');
showcase4Place.addEventListener('click', navigateToValidatePlace);
// Validate place anchor
const validatePlaceAnchor = document.getElementById('place-hook');
// Navigate to Validate Place
function navigateToValidatePlace(e) {
    e.preventDefault();
    window.scrollTo({
        top: validatePlaceAnchor.offsetTop - offsetY,
        behavior: 'smooth'
    });
}

// Highlight hook navigation
// Add event listeners
const highlightHook = document.getElementById('highlight');
highlightHook.addEventListener('click', navigateToHighlighted);
// Highlight anchor
const highlightAnchor = document.getElementById('highlighted');
// Navigate to highlighted Showcase
function navigateToHighlighted(e) {
    e.preventDefault();
    window.scrollTo({
        top: highlightAnchor.offsetTop - offsetY,
        behavior: 'smooth'
    });
}

// Navigate to Showcase from Products
// Product 1 to Showcase 4
const product1 = document.getElementById('product-1');
product1.addEventListener('click', navigateToShowcase4);
const showcase4Anchor = document.getElementById('showcase4');
function navigateToShowcase4(e) {
    e.preventDefault();
    window.scrollTo({
        top: showcase4Anchor.offsetTop - offsetY,
        behavior: 'smooth'
    });
}
// Product 2 to Showcase 3
const product2 = document.getElementById('product-2');
product2.addEventListener('click', navigateToShowcase3);
const showcase3Anchor = document.getElementById('showcase3');
function navigateToShowcase3(e) {
    e.preventDefault();
    window.scrollTo({
        top: showcase3Anchor.offsetTop - offsetY,
        behavior: 'smooth'
    });
}
// Product 3 to Showcase 2
const product3 = document.getElementById('product-3');
product3.addEventListener('click', navigateToShowcase2);
const showcase2Anchor = document.getElementById('showcase2');
function navigateToShowcase2(e) {
    e.preventDefault();
    window.scrollTo({
        top: showcase2Anchor.offsetTop - offsetY,
        behavior: 'smooth'
    });
}
// Product 4 to Showcase 1
const product4 = document.getElementById('product-4');
product4.addEventListener('click', navigateToShowcase1);
const showcase1Anchor = document.getElementById('showcase1');
function navigateToShowcase1(e) {
    e.preventDefault();
    window.scrollTo({
        top: showcase1Anchor.offsetTop - offsetY,
        behavior: 'smooth'
    });
}

// Navigate to Top
function navigateToTop() {
    window.scrollTo({
        top: menuShowcase.offsetTop - offsetY,
        behavior: 'smooth'
    });
}