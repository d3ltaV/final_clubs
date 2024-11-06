// clubRoutes.js
require('dotenv').config({ path: '.env' });
const express = require('express');
const router = express.Router();
const clubController = require('../controllers/home');
const search = require('../controllers/filter');
router.get('/', clubController.getAllClubs);
router.get('/club/:id', clubController.getClubById); 
router.get('/search', search.searchFilter);
module.exports = router;
