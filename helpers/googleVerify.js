const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

async function googleVerify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const user = ticket.getPayload();

  return user;
}

module.exports = {
  googleVerify,
};
