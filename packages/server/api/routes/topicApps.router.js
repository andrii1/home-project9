const express = require('express');

const router = express.Router({ mergeParams: true });
const appsController = require('../controllers/apps.controller');

router.get('/', (req, res, next) => {
  appsController
    .getAppsByTopic(req.params.id)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;
