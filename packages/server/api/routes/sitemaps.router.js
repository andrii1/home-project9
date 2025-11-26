const express = require('express');
const router = express.Router({ mergeParams: true });
const sitemapsController = require('../controllers/sitemaps.controller');

router.get('/:fileName', async (req, res, next) => {
  try {
    const xml = await sitemapsController.getFile(req.params.fileName);
    res.set('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
