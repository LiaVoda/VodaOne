exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ authToken: process.env.AUTH_TOKEN })
    };
};