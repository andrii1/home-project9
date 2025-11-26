const express = require('express');

const router = express.Router({ mergeParams: true });
const cloudinaryController = require('../controllers/cloudinary.controller');

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
router.get('/images', (req, res, next) => {
  cloudinaryController
    .getImages()
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;
