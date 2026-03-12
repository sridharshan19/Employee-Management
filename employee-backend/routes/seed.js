const express = require('express');
const router = express.Router();
const { seedAdmin } = require('../controllers/seedController');

// Seed default admin user
router.post('/admin', seedAdmin);

module.exports = router;
