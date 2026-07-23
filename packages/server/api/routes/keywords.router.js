/* TODO: This is just an example file to illustrate API routing and
documentation. Can be deleted when the first real route is added. */

const express = require('express');

const router = express.Router({ mergeParams: true });
// const topicErrorsRouter = require('./topicErrors.router');

// router.use('/:id/errors', topicErrorsRouter);

// controllers
const keywordsController = require('../controllers/keywords.controller');

router.get('/', (req, res, next) => {
  if (req.query.error) {
    keywordsController
      .getKeywordsByError(req.query.error)
      .then((result) => res.json(result))
      .catch(next);
  } else {
    try {
      keywordsController
        .getKeywords()
        .then((result) => res.json(result))
        .catch(next);
    } catch (error) {
      res.status(404).json({ error: 'Bad Get Request' });
    }
  }
});

router.get('/:id', (req, res, next) => {
  keywordsController
    .getKeywordById(req.params.id)
    .then((result) => res.json(result))
    .catch(next);
});

router.post('/', (req, res) => {
  const { token } = req.headers;
  keywordsController
    .createKeyword(token, req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);

      res.status(400).send('Bad request').end();
    });
});

module.exports = router;
