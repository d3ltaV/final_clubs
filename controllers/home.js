const express = require('express');
const router = express.Router();
const { Club } = require('../models');
const { Op } = require('sequelize');
router.get('/', async (req, res) => {
  try {
    // const clubs = await Club.findAll();
    // const types = [...new Set(clubs.map(club => club.type))];
    const clubs = await Club.findAll({
      where: {
        type: { [Op.ne]: null },
        club_name: { [Op.ne]: null },
        description: { [Op.ne]: null },
        meet_info: { [Op.ne]: null },
      }
    });
    const validClubNames = clubs.map(club => club.club_name);
    console.log('Filtered Club Names:', validClubNames);
    // const validClubs = clubs.filter(club => 
    //   club.type !== null && 
    //   club.club_name !== null && 
    //   club.description !== null && 
    //   club.meet_info !== null
    // );
    const validClubs = clubs.filter(club => 
      club.type.length > 0 && 
      club.club_name.length > 0 && 
      club.description.length > 0 && 
      club.meet_info.length > 0
    );
    const asdf = validClubs.map(club => club.club_name);
    console.log("ASDF", asdf); 
    const types = [...new Set(validClubs.map(club => club.type))];
    const clubsByType = types.reduce((acc, type) => {
      acc[type] = validClubs.filter(club => club.type === type);
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
