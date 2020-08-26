const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const passportJWT = require('../middleware/passportJWT');

/* http://localhost:3000/staff/ */
router.get('/' , [ passportJWT.isLogin ] ,staffController.index);

/* get by id */
/* http://localhost:3000/staff/5e8835fde8df353c8c0b2bd4 */
router.get('/:id', staffController.show);

/* http://localhost:3000/staff/ */
router.post('/', staffController.insert);

/* http://localhost:3000/staff/5e8835fde8df353c8c0b2bd4 */
/* delete by id */
router.delete('/:id', staffController.destroy);

/* http://localhost:3000/staff/5e8835fde8df353c8c0b2bd4 */
/* delete by id */
router.put('/:id', staffController.update);

module.exports = router;
