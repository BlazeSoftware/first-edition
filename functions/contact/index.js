const functions = require('firebase-functions');
const sendgrid = require('@sendgrid/mail');
const fetch = require('node-fetch');

module.exports = () => {
  const app = require('express')();

  app.use(require('cors')({ origin: true }));
  app.use(require('body-parser').raw({ type: '*/*' }));

  app.post('/contact/send', async (req, res) => {
    if (!req.body.email || !req.body.from || !req.body.message) {
      return res.send(400, 'Form is incomplete');
    }

    if (!req.body.token) {
      return res.send(400, 'Token missing');
    }

    if (req.body.message.length > 3000) {
      return res.send(413, 'Message is too long, max length 5000 characters');
    }

    const SENDGRID_API_KEY = functions.config().sendgrid.key;
    sendgrid.setApiKey(SENDGRID_API_KEY);

    const RECAPTCHA_SECRET = functions.config().recaptcha.key;
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${req.body.token}`,
      {
        method: 'POST',
      }
    );
    const recaptcha = await response.json();
    if (recaptcha.success !== true || recaptcha.score < 0.75 || recaptcha.action !== 'contact') {
      return res.send(400, 'Bot detected.');
    }

    const msg = {
      to: 'gregory.pratt@me.com',
      from: {
        name: req.body.from,
        email: 'contact@typd.com',
      },
      replyTo: req.body.email,
      subject: 'Contact via Typd',
      html: `
        <p><strong>From:</strong> ${req.body.from} <${req.body.email}></p>
        <p><strong>Message:</strong></p>
        <p>${req.body.message.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
      `,
    };

    sendgrid
      .send(msg)
      .then(() => {
        return res.send(200);
      })
      .catch((error) => {
        console.error(error);
        return res.send(500, error);
      });
  });

  return app;
};
