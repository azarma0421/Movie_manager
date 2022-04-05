const express = require('express');
const router = express.Router();
const movieController = require("../controllers/movieController");






// CRUD
router.get('/', movieController.view);
router.post('/', movieController.find);
router.get('/addmovie', movieController.form);
router.post('/addmovie', movieController.create);

router.get('/editmovie/:id', movieController.edit);
router.post('/editmovie/:id', movieController.update);


module.exports = router;