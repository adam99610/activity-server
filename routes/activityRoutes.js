const router = require('express').Router();
const auth = require('../middleware/authMiddleware');

const {
  createActivity,
  getActivities,
  updateActivity,
  deleteActivity
} = require('../controllers/activityController');

router.post('/', auth, createActivity);
router.get('/', auth, getActivities);
router.put('/:id', auth, updateActivity);
router.delete('/:id', auth, deleteActivity);

module.exports = router;