const {Router} = require('express');
const controller = require('../controllers/controller.js')

const router = Router();

router.get('/', controller.renderHomePage)
router.get('/create', controller.renderAddPage);
router.get('/delete', controller.removeMovie)
router.get('/deleteAll', controller.deleteAll)
router.get('/search', controller.renderSearchPage)
router.get('/update', controller.renderUpdatePage)


router.post('/create', controller.submitMovie);
router.post('/update',controller.editMovie);
router.post('/search', controller.searchMovie)
module.exports = router;