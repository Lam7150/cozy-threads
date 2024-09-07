const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const CLIENT = process.env.VERCEL_URL || 'http://localhost:4242';

module.exports = (app) => {
  // Create checkout session with embedded form
  app.post('/create-checkout-session', async (req, res) => {
    const { cart } = req.body;

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      payment_method_types: ['card'],
      line_items: cart.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
          },
          unit_amount: item.price,
        },
        quantity: 1,
      })),
      mode: 'payment',
      return_url: `${CLIENT}/return.html?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({ clientSecret: session.client_secret });
  });

  // Check customer session status
  app.get('/session-status', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  });
};
