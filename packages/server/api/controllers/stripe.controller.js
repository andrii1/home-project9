require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getStripeCustomers = async () => {
  try {
    const customerEmails = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const customer of stripe.customers.list({ limit: 100 })) {
      customerEmails.push(customer.email);
      // Do something with customer
    }

    return customerEmails;
  } catch (error) {
    return error.message;
  }
};

const getStripeCustomerByEmail = async (email) => {
  try {
    const customer = await stripe.customers.list({
      email,
    });

    return customer;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getStripeCustomers,
  getStripeCustomerByEmail,
};
