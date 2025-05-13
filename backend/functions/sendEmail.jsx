// FUNCTION TO SEND EMAIL
const FormData = require('form-data');
const Mailgun = require('mailgun.js');
const moment = require('moment-timezone');

// Function to send email
async function sendEmail(body) {

    // Destructure body
    const { authToken, zipcode, phone } = body;

    // Validate API token
    if (authToken !== process.env.AUTH_TOKEN) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: 'Unauthorized' }),
        };
    }

    try {
        // Get current time and date of an specific GMT timezone
        const currentTime = moment().tz('Europe/Lisbon').format('HH:mm');
        const currentDate = moment().tz('Europe/Lisbon').format('DD-MMM');

        // Subject
        const subject = `LEAD - ${phone} - ${zipcode} - netvdf.pt`;

        // Create the HTML table
        const htmlContent = `
        <div style="font-family: sans-serif; background: #ef1d26; margin: 30px 60px 30px 60px; padding: 20px; border-radius: 8px;">
            <div style="display: flex; flex-direction: row; justify-content: flex-start; gap: 10px; align-items: center; max-height: 50px; padding-bottom: 20px;">
                <img src="https://res.cloudinary.com/dxty1jkt7/image/upload/v1746715706/logo_w_jtcjvt.webp" alt="Vodafone Logo" />
                <h2 style="color: #ffffff; text-align: left; font-size: 2.5rem; font-weight: 500;">Lead</h2>
            </div>
            <table style="background: #f2f2f2; width: 100%; border-collapse: collapse; border-radius: 5px;">
                    <tr><td style="width: 50%; padding: 5px; text-align: left; font-size: 1.2rem; font-weight: 500; color: #333;">
                            Telemóvel: <strong style="font-size: 1.5rem; font-weight: 700;">${phone}</strong></td>
                        <td style="width: 50%; padding: 5px; text-align: left; font-size: 1.2rem; font-weight: 500; color: #333;">
                            Código postal: <strong style="font-size: 1.5rem; font-weight: 700;">${zipcode}</strong>
                    </td></tr><tr>
                        <td style="padding: 5px; text-align: left; font-size: 1.2rem; font-weight: 400; color: #333;">
                            Hora: <strong>${currentTime}</strong>&nbsp;Dia: <strong>${currentDate}</strong>
                    </td></tr>
            </table>
        </div>
        `;

        const mailgun = new Mailgun(FormData);
        const mg = mailgun.client({
            username: "api",
            key: process.env.MAIL_API_KEY,
        });
        const data = await mg.messages.create(process.env.MAIL_DOMAIN, {
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO,
            subject: subject,
            html: htmlContent,
        });

        console.log("MailGun response:", data);

    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = sendEmail;