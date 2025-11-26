const express = require('express');

const router = express.Router({ mergeParams: true });
const ratingsController = require('../controllers/ratings.controller');

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
router.get('/', (req, res, next) => {
  const { token } = req.headers;
  // TO DO : once we will add authentication I will update it
  if (req.query.blogId && token) {
    ratingsController
      .getRatingsByBlogId(token, req.query.blogId)
      .then((result) => res.json(result))
      .catch(next);
  } else if (token) {
    ratingsController
      .getRatingsByUserId(token)
      .then((result) => res.json(result))
      .catch(next);
  } else {
    ratingsController
      .getAllRatings()
      .then((result) => res.json(result))
      .catch(next);
  }
});

/**
 * @swagger
 * /ratings:
 *  post:
 *    tags:
 *    - ratings
 *    summary: Create a favorite
 *    description:
 *      Will create a favorite.
 *    produces: application/json
 *    parameters:
 *      - in: body
 *        name: ratings
 *        description: The favorite to create.
 *        schema:
 *          type: object
 *          required:
 *            - user_id
 *            - product_id
 *          properties:
 *            user_id:
 *              type: number
 *            product_id:
 *              type: number
 *            created_at:
 *              type: date/time
 *    responses:
 *      201:
 *        description: Favorite created
 *      5XX:
 *        description: Unexpected error.
 */
router.post('/', (req, res, next) => {
  const { token } = req.headers;
  ratingsController
    .createratings(token, req.body)
    .then((result) => res.json(result))
    .catch(next);
});

/**
 * @swagger
 * /ratings/{ID}:
 *  delete:
 *    tags:
 *    - ratings
 *    summary: Delete an favorite
 *    description:
 *      Will delete a favorite with a given ID.
 *    produces: application/json
 *    parameters:
 *      - in: path
 *        description: ID of the favorite to delete.
 *    responses:
 *      200:
 *        description: favorite deleted
 *      5XX:
 *        description: Unexpected error.
 */

// router.delete('/:id', (req, res, next) => {
//   const { token } = req.headers;
//   ratingsController
//     .deleteratings(token, req.params.id, req)
//     .then((result) => res.json(result))
//     .catch(next);
// });
router.delete('/:id', (req, res, next) => {
  const { token } = req.headers;
  ratingsController
    .deleteratings(token, req.params.id)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;
