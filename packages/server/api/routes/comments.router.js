const express = require('express');

const router = express.Router({ mergeParams: true });
const commentsController = require('../controllers/comments.controller');

router.get('/', (req, res, next) => {
  if (req.query.blogId) {
    commentsController
      .getCommentsByBlogId(req.query.blogId)
      .then((result) => res.json(result))
      .catch(next);
  } else {
    commentsController
      .getAllComments()
      .then((result) => res.json(result))
      .catch(next);
  }
});
/**
 * @swagger
 * /favorites:
 *  post:
 *    tags:
 *    - favorites
 *    summary: Create a favorite
 *    description:
 *      Will create a favorite.
 *    produces: application/json
 *    parameters:
 *      - in: body
 *        name: favorites
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
  commentsController
    .createComments(token, req.body)
    .then((result) => res.json(result))
    .catch(next);
});

/**
 * @swagger
 * /favorites/{ID}:
 *  delete:
 *    tags:
 *    - favorites
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
//   favoritesController
//     .deleteFavorites(token, req.params.id, req)
//     .then((result) => res.json(result))
//     .catch(next);
// });
router.delete('/:id', (req, res, next) => {
  const { token } = req.headers;
  commentsController
    .deleteComments(token, req.params.id)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;
