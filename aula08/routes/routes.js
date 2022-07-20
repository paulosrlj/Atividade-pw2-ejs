const router = require('express').Router();
const controller = require('../controllers/message');

//CRUD
router.get('/', controller.getAll)

router.get('/new-entry', controller.newEntry)
  
router.post('/new-entry', controller.createOne)
  
module.exports = router;