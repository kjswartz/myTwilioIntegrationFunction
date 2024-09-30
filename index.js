const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

exports.handler = async (event, _) => {
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
}