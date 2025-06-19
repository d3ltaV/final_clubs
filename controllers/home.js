//functions that fetch the club informatinos to help display them
require('dotenv').config({ path: '.env' });
const { fetchAndProcessCSV } = require('./fetch');
const csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSDnX_41zq0zQN25XLu18Bi7UNVbDM2WfAu5RhFxYdiOL4i_tAW6erRWFy14rIH3R42wlE9RfFSnuG7/pub?gid=2107835340&single=true&output=csv';

const getAllClubs = async (req, res) => {
  try {
    const { clubs, clubsRowMapping } = await fetchAndProcessCSV(csvURL);
    const types = [...new Set(clubs.map(club => club.type))];
    const clubsByType = types.reduce((acc, type) => {
      acc[type] = clubs.filter(club => club.type === type);
      return acc;
    }, {});
    res.render('home', { types, clubsByType });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const getClubById = async (req, res) => {
  try {
    const { clubs, clubsRowMapping } = await fetchAndProcessCSV(csvURL);
    const clubName = req.params.id; // changed from id to club name
    const club = clubs.find(c => c.id === clubName);
    if (!club) {
      return res.status(404).send('Club not found');
    }
    const rowIndex = clubsRowMapping[clubName];
    const baseURL = "https://docs.google.com/spreadsheets/d/1nJTH-l3URAc8BY6s6I9_aqDjWDCJVQE4Z64fbuP79Kw/edit?gid=2107835340#gid=2107835340";
    const rangeStr = `&range=A${rowIndex}`; // Use the row index in the range query
    const fullURL = `${baseURL}${rangeStr}`;
    res.render('clubPage', { club, fullURL });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllClubs,
  getClubById,
};
