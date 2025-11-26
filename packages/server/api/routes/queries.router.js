/* TODO: This is just an example file to illustrate API routing and
documentation. Can be deleted when the first real route is added. */

const express = require('express');

const router = express.Router({ mergeParams: true });
// const topicAppsRouter = require('./topicApps.router');

// router.use('/:id/apps', topicAppsRouter);

// controllers
const queriesController = require('../controllers/queries.controller');

router.get('/', (req, res, next) => {
  const { token } = req.headers;
  // TO DO : once we will add authentication I will update it
  queriesController
    .getQueries({
      token,
      days: req.query.days,
      column: req.query.column,
      direction: req.query.direction,
    })
    .then((result) => res.json(result))
    .catch(next);
});

router.post('/', (req, res) => {
  const { token } = req.headers;

  queriesController
    .createQuery(token, req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);

      res.status(400).send('Bad request').end();
    });
});

module.exports = router;
