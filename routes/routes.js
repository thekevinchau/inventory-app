const {Router} = require('express');
const controller = require('../controllers/controller.js')

const router = Router();

router.get('/', controller.renderHomePage)
router.get('/create', controller.renderAddPage);
//router.get('/deleteAll', controller.deleteAll)
router.post('/create', controller.submitMovie);
module.exports = router;