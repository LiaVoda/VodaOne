const sendEmail = require('./sendEmail.jsx');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Invalid request' };
    }

    const body = JSON.parse(event.body);
    if (!body || !body.authToken || !body.zipcode || !body.phone) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid request' })
        };
    }

    await sendEmail(body);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Email sent' })
    };
};