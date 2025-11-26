/* TODO: This is just an example file to illustrate API routing and
documentation. Can be deleted when the first real route is added. */

const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const appsController = require('../controllers/apps.controller');

/**
 * @swagger
 * /exampleResource:
 *  get:
 *    tags:
 *    - exampleResource
 *    summary: Get all exampleResource
 *    description:
 *      Will return all exampleResource.
 *    produces: application/json
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error.
 */
router.get('/', (req, res, next) => {
  if (
    req.query.categories ||
    req.query.pricing ||
    req.query.platforms ||
    req.query.socials ||
    req.query.other ||
    req.query.search ||
    req.query.tags ||
    req.query.features ||
    req.query.userTypes ||
    req.query.businessModels ||
    req.query.useCases ||
    req.query.industries
  ) {
    // const array = req.query.filteredTopics.split(',');
    appsController
      .getAppsBy({
        page: req.query.page,
        column: req.query.column,
        direction: req.query.direction,
        categories: req.query.categories,
        pricing: req.query.pricing,
        platforms: req.query.platforms,
        socials: req.query.socials,
        other: req.query.other,
        search: req.query.search,
        tags: req.query.tags,
        features: req.query.features,
        userTypes: req.query.userTypes,
        businessModels: req.query.businessModels,
        useCases: req.query.useCases,
        industries: req.query.industries,
      })
      .then((result) => res.json(result))
      .catch(next);
  }
  // else if (req.query.filteredCategories) {
  //   const array = req.query.filteredCategories.split(',');
  //   appsController
  //     .getAppsByCategory(
  //       req.query.filteredCategories,
  //       req.query.page,
  //       req.query.column,
  //       req.query.direction,
  //     )
  //     .then((result) => res.json(result))
  //     .catch(next);
  // } else if (req.query.search) {
  //   appsController
  //     .getAppsSearch(
  //       req.query.search,
  //       req.query.column,
  //       req.query.direction,
  //       req.query.page,
  //       req.query.size,
  //     )
  //     .then((result) => res.json(result))
  //     .catch(next);
  // }
  else if (req.query.tag) {
    appsController
      .getAppsByTag(
        req.query.page,
        req.query.column,
        req.query.direction,
        req.query.tag,
      )
      .then((result) => res.json(result))
      .catch(next);
  } else if (req.query.page) {
    appsController
      .getApps(req.query.page, req.query.column, req.query.direction)
      .then((result) => res.json(result))
      .catch(next);
  } else {
    appsController
      .getAppsAll()
      .then((result) => res.json(result))
      .catch(next);
  }
});

/* Create Apps */

router.post('/', (req, res, next) => {
  const { token } = req.headers;
  appsController
    .createApps(token, req.body)
    .then((result) => res.json(result))
    .catch(next);
});

/**
 * @swagger
 * /exampleResources/{ID}:
 *  get:
 *    tags:
 *    - ExampleResources
 *    summary: Get exampleResource by ID
 *    description:
 *      Will return single exampleResource with a matching ID.
 *    produces: application/json
 *    parameters:
 *     - in: path
 *       name: ID
 *       schema:
 *         type: integer
 *         required: true
 *         description: The ID of the exampleResource to get
 *
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error.
 */

router.get('/:id', (req, res, next) => {
  appsController
    .getAppById(req.params.id)
    .then((result) => res.json(result))
    .catch(next);
});

router.patch('/:id', (req, res, next) => {
  const { token } = req.headers;
  appsController
    .editApp(token, req.params.id, req.body)
    .then((result) => res.json(result))
    .catch(next);
});

router.post('/node', (req, res) => {
  const { token } = req.headers;
  appsController
    .createAppNode(token, req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(400).send('Bad request').end();
    });
});

module.exports = router;
