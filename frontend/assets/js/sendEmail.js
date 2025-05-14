/* SEND EMAIL */

// Server (switch between local and production)
// const server = 'http://localhost:5000';     // local
const server = 'https://voda-backend.vercel.app';  // production at Vercel

// Ping API event listeners
document.addEventListener("DOMContentLoaded", pingApi);
async function pingApi() {
    await fetch(server + '/api/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ ping: true })
    });
}

// Add event listeners
const submitButtonForm = document.getElementById("submit-button-form");
submitButtonForm.addEventListener('click', submitForm);
const submitButtonPlace = document.getElementById("submit-button-place");
submitButtonPlace.addEventListener('click', submitForm);

// Get form inputs on Contact Us
const phoneInputContact = document.getElementById("phone-form");
const zipcodeInputContact = document.getElementById("zipcode-form");
// Get form inputs on Place
const phoneInputPlace = document.getElementById("phone-place");
const zipcodeInputPlace = document.getElementById("zipcode-place");

// Function to submit form to server
async function submitForm(event) {
    event.preventDefault();

    // Select submit source
    const targetButton = event.currentTarget;
    const phoneInput = targetButton === submitButtonPlace ? phoneInputPlace : phoneInputContact;
    const zipcodeInput = targetButton === submitButtonPlace ? zipcodeInputPlace : zipcodeInputContact;

    // Check valid phone
    const phoneRaw = phoneInput.value.trim();
    if (!phoneRaw) {
        alert('Por favor preencha o telefone de contacto.');
        return;
    }
    const phoneNumbers = phoneRaw.match(/\d+/g)?.join('');
    if (phoneNumbers.length !== 9) {
        alert('O número de telefone não é válido.');
        return;
    }
    const phone = `${phoneNumbers.slice(0, 3)} ${phoneNumbers.slice(3, 6)}-${phoneNumbers.slice(6)}`;

    // Process zipcode
    let zipcode = '';
    if (zipcodeInput && zipcodeInput.value !== '') {
        const zipcodeRaw = zipcodeInput.value.trim();
        const zipNumbers = zipcodeRaw.match(/\d+/g)?.join('');
        if (zipNumbers.length === 7) {
            zipcode = `${zipNumbers.slice(0, 4)}-${zipNumbers.slice(4)}`;
        } else {
            zipcode = zipcodeRaw + ' **';
        }
    }

    // Solve capcha

    // Get token
    const authToken = await getTokenSendEmail();

    // Call server function to send email
    await sendEmailToServer({ authToken, zipcode, phone })
        .then(response => {
            if (response.error) {
                throw new Error(response.error);
            }
            // Send data to GTM
            SendDataToGoogleTagManager('form_submitted', targetButton);
            // Toggle Contact Form
            if (targetButton === submitButtonForm) ToggleContactForm();
            // Clean form inputs
            cleanFormInputs();
            // Navigate to Top
            navigateToTop();
            // Show success message
            showSuccessMessage();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocorreu um erro ao enviar o email. Tente novamente mais tarde.');
            cleanFormInputs();
        });
}

// Function to get token
async function getTokenSendEmail() {
    try {
        const response = await fetch( server +'/api/auth/token', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const result = await response.json();
        return result.authToken;
    } catch (error) {
        console.error('Authentication error:', error);
        throw error;
    }
}

// Function to solve capcha
async function solveCapcha() {
  return;
}

// Server communication functionasync function sendEmailToServer(data) {
async function sendEmailToServer(data) {
    try {
        const response = await fetch(server + '/api/submit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Get response
        const result = response.json();
        return result;

    // Catch error
    } catch (error) {
        console.error('Error sending email to server:', error);
        throw error;
    }
}

// Function to clean form inputs
function cleanFormInputs() {
    // Clean form inputs on Contact Us
    phoneInputContact.value = "";
    zipcodeInputContact.value = "";
    // Clean form inputs on Place
    phoneInputPlace.value = "";
    zipcodeInputPlace.value = "";
    
}

// Function to show success message
function showSuccessMessage() {
    const successPopup = document.getElementById("success-popup");
    successPopup.classList.add('visible');
    setTimeout(() => {
        successPopup.classList.remove('visible');
    }, 3000);
}