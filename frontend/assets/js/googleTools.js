/* SEND DATA TO GOOGLE TAG MANAGER */

function SendDataToGoogleTagManager(event, targetButton) {

    // Switch by event
    switch (event) {
        // Form submitted
        case 'form_submitted':
            dataLayer.push({
                'event': 'form_submitted',
                'clicked_button': targetButton
            });
            break;
        // Whatsapp called
        case 'whatsapp_called':
            dataLayer.push({
                'event': 'whatsapp_called',
                'clicked_button': targetButton
            });
            break;
        // Popup form opened
        case 'popup_form_opened':
            dataLayer.push({
                'event': 'popup_form_opened',
                'clicked_button': targetButton
            });
            break;
    }
}
