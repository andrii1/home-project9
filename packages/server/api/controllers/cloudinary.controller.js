require('dotenv').config();
const cloudinary = require('cloudinary');

cloudinary.v2.config({
  secure: true,
});

const getImages = async () => {
  try {
    const result = cloudinary.v2.api.resources({
      type: 'upload',
      prefix: 'apps_ai', // add your folder
    });
    return result;
  } catch (error) {
    return error.message;
  }
};

// const getStripeCustomerByEmail = async (email) => {
//   try {
//     const customer = await stripe.customers.list({
//       email,
//     });

//     return customer;
//   } catch (error) {
//     return error.message;
//   }
// };

module.exports = {
  getImages,
};
