const CLIENT = process.env.CLIENT_URL;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const calculate_tax = async (orderAmount, currency) => {
//   const taxCalculation = await stripe.tax.calculations.create({
//     currency,
//     customer_details: {
//       address: {
//         line1: "10709 Cleary Blvd",
//         city: "Plantation",
//         state: "FL",
//         postal_code: "33322",
//         country: "US",
//       },
//       address_source: "shipping",
//     },
//     line_items: [
//       {
//         amount: orderAmount,
//         reference: "ProductRef",
//         tax_behavior: "exclusive",
//         tax_code: "txcd_30011000"
//       }
//     ],
//   });

//   return taxCalculation;
// };

module.exports = (app) => {
  // Get stripe key
  app.get('/config', (req, res) => {
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
  });

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
            name: item.title
          },
          unit_amount: item.price * 100
        },
        quantity: 1
      })),
      mode: 'payment',
      return_url: `${CLIENT}/return?session_id={CHECKOUT_SESSION_ID}`
    });

    res.send({ clientSecret: session.client_secret });
  });

  // Check customer session status
  app.get('/session-status', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );

    res.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
  });

  app.post('/create-payment-intent', async (req, res) => {
    // Create a PaymentIntent with the amount, currency, and a payment method type.
    //
    // See the documentation [0] for the full list of supported parameters.
    //
    // [0] https://stripe.com/docs/api/payment_intents/create
    const { cart } = req.body;
    const orderAmount = cart.reduce(
      (total, item) => total + item.price * 100,
      0
    );
    let paymentIntent;

    try {
      paymentIntent = await stripe.paymentIntents.create({
        currency: 'usd',
        amount: orderAmount,
        automatic_payment_methods: { enabled: true }
      });

      // Send publishable key and PaymentIntent details to client
      res.send({
        clientSecret: paymentIntent.client_secret
      });
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message
        }
      });
    }
  });
};
