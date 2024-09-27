const express = require('express');
const router = express.Router();
const { Club } = require('../models');

router.get('/', async (req, res) => {
  try {
    const clubs = await Club.findAll();
    const types = [...new Set(clubs.map(club => club.type))];

    const clubsByType = types.reduce((acc, type) => {
      acc[type] = clubs.filter(club => club.type === type);
      return acc;
    }, {});
    res.render('home', {types, clubsByType});
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
router.get('/club/:id', async (req, res) => {
  try {
    const club = await Club.findByPk(req.params.id);
    res.render('clubPage', { club });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
