const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getOverview);
router.get('/character/:name', viewsController.getCharacter);
router.post('/search', viewsController.getResults);

module.exports = router;
