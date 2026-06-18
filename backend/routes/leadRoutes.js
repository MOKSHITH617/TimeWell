const express = require('express');
const router = express.Router();
const { createLead, getLeads, deleteLead } = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(createLead)
  .get(protect, getLeads);

router.route('/:id')
  .delete(protect, deleteLead);

module.exports = router;
