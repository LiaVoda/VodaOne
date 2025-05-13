// WHATSAPP API
const whatsappAPIUrl = 'https://api.whatsapp.com/send?phone=';
const whatsappPhone = '351926409145';

// Add event listeners to Whatsapp link
const whatsappHook = document.getElementById('whatsapp-hook');
whatsappHook.addEventListener('click', () => openWhatsAppUrl('whatsapp-hook'));
// Add event listeners to Floating Hook
const floatingHook = document.getElementById('form-hook');
floatingHook.addEventListener('click', () => openWhatsAppUrl('form-hook'));

// Link to simple whatsapp API
function openWhatsAppUrl(targetButton) {
    // Send data to GTM
    SendDataToGoogleTagManager('whatsapp_called', targetButton);
    // Delay redirect slightly to ensure tracking fires
    setTimeout(() => {
        window.open(whatsappAPIUrl + whatsappPhone, '_blank');
    }, 100);
    // Navigate to Top
    navigateToTop();
}