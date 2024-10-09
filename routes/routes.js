const {Router} = require('express');
const controller = require('../controllers/controller.js')

const router = Router();

router.get('/', controller.renderHomePage)
//router.get('/createUser', controller.renderUserCreation);
module.exports = router;