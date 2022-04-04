const express = require('express');
const router = express.Router();
const movieController = require("../controllers/movieController");






// CRUD
router.get('/', movieController.view);
router.post('/', movieController.find);


module.exports = router;