//functions that fetch the club informatinos to help display them
require('dotenv').config({ path: '.env' });
const { fetchAndProcessCSV } = require('./fetch');
// const csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTNaoVZbJpLB-65ht7ICw-uEnf2Y4wHa0p69lYt2FYYZYC9Dvdlnt02UJ6ZobCqSA86QWGr0EcxYbwN/pub?gid=2107835340&single=true&output=csv';
const csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSDnX_41zq0zQN25XLu18Bi7UNVbDM2WfAu5RhFxYdiOL4i_tAW6erRWFy14rIH3R42wlE9RfFSnuG7/pub?gid=2107835340&single=true&output=csv';

const getAllClubs = async (req, res) => {
  try {
    const clubs = await fetchAndProcessCSV(csvURL);
    const types = [...new Set(clubs.map(club => club.type))];
    const clubsByType = types.reduce((acc, type) => {
      acc[type] = clubs.filter(club => club.type === type);
      return acc;
    }, {});
    res.render('home', { types, clubsByType });
    // console.log(types);
    // console.log(clubs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const getClubById = async (req, res) => {
  try {
    const clubs = await fetchAndProcessCSV(csvURL);
    // console.log(clubs);
    // const clubId = parseInt(req.params.id, 10);

    // if (isNaN(clubId) || clubId < 0 || clubId >= clubs.length) {
    //   return res.status(404).send('Club not found');
    // }

    // const club = clubs[clubId];
    const clubName = req.params.id; // changed from id to club name
    const club = clubs.find(c => c.id === clubName);
    if (!club) {
      return res.status(404).send('Club not found');
    }
    res.render('clubPage', { club });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllClubs,
  getClubById,
};
// const express = require('express');
// const router = express.Router();
// const { Club } = require('../models');
// const { Op } = require('sequelize');
// router.get('/', async (req, res) => {
//   try {
//     // const clubs = await Club.findAll();
//     // const types = [...new Set(clubs.map(club => club.type))];
//     const clubs = await Club.findAll({
//       where: {
//         type: { [Op.ne]: null },
//         club_name: { [Op.ne]: null },
//         description: { [Op.ne]: null },
//         meet_info: { [Op.ne]: null },
//       }
//     });
//     const validClubNames = clubs.map(club => club.club_name);
//     console.log('Filtered Club Names:', validClubNames);
//     // const validClubs = clubs.filter(club => 
//     //   club.type !== null && 
//     //   club.club_name !== null && 
//     //   club.description !== null && 
//     //   club.meet_info !== null
//     // );
//     const validClubs = clubs.filter(club => 
//       club.type.length > 0 && 
//       club.club_name.length > 0 && 
//       club.description.length > 0 && 
//       club.meet_info.length > 0
//     );
//     const asdf = validClubs.map(club => club.club_name);
//     console.log("ASDF", asdf); 
//     const types = [...new Set(validClubs.map(club => club.type))];
//     const clubsByType = types.reduce((acc, type) => {
//       acc[type] = validClubs.filter(club => club.type === type);
//       return acc;
//     }, {});
//     res.render('home', {types, clubsByType});
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }
// });
// router.get('/club/:id', async (req, res) => {
//   try {
//     const club = await Club.findByPk(req.params.id);
//     res.render('clubPage', { club });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;
