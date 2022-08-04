const router = require('express').Router();
const controller = require('../controllers/reminders');

router.param('id', function(req, res, next, id) {
    req.id = id;  
    return next();
});

router.post('/', controller.createReminder);

router.get('/', controller.getReminders);

router.get('/:id', controller.getReminderById);

router.put('/:id', function(req, res, next) {
    return res.status(405).send();
});
router.patch('/:id', function(req, res, next) {
    return res.status(405).send();
});
router.delete('/:id', function(req, res, next) {
    return res.status(405).send();
});

module.exports = router;
