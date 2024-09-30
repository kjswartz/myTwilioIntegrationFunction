
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const jwt = require('jsonwebtoken');

exports.handler = async (event, _) => {
  const secretKey = process.env.JWT_SECRET;
  
  const authHeader = event.headers?.authorization || event.headers?.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
          statusCode: 401,
          body: JSON.stringify({ message: 'Missing or invalid Authorization header' })
      };
  }

  const token = authHeader.split(' ')[1]; 

  try {
    jwt.verify(token, secretKey);

    const data = JSON.parse(event.body);
    const body = data.body;
    const to = data.to;
    try {
      const message = await client.messages.create({
        body: body,
        from: process.env.TWILIO_NUMBER,
        to: to,
      });
      return {
        statusCode: 200,
        body: JSON.stringify(message),
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    }
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Invalid token' })
    };
  }
}