const express = require('express');

const router = express.Router({ mergeParams: true });
const stripeController = require('../controllers/stripe.controller');

/**
 * @swagger
 * /ratings:
 *  get:
 *    tags:
 *    - ratings
 *    summary: Get all product's ratings
 *    description:
 *      Will return all ratings of product.
 *    produces: application/json
 *    parameters:
 *     - in: path
 *       name: ID
 *       schema:
 *         type: integer
 *         required: false
 *         description: The ratings of the user to get
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error.
 */
router.get('/customers', (req, res, next) => {
  // TO DO : once we will add authentication I will update it
  if (req.query.userEmail) {
    stripeController
      .getStripeCustomerByEmail(req.query.userEmail)
      .then((result) => res.json(result))
      .catch(next);
  } else {
    stripeController
      .getStripeCustomers()
      .then((result) => res.json(result))
      .catch(next);
  }
});

module.exports = router;
