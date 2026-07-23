/* TODO: This is just an example file to illustrate API routing and
documentation. Can be deleted when the first real route is added. */

const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const userTypesController = require('../controllers/userTypes.controller');

router.get('/', (req, res, next) => {
  if (req.query.error) {
    userTypesController
      .getUserTypesByError(req.query.error)
      .then((result) => res.json(result))
      .catch(next);
  } else {
    userTypesController
      .getUserTypes()
      .then((result) => res.json(result))
      .catch(next);
  }
});

module.exports = router;
