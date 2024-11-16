//search functions
require('dotenv');
const csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSDnX_41zq0zQN25XLu18Bi7UNVbDM2WfAu5RhFxYdiOL4i_tAW6erRWFy14rIH3R42wlE9RfFSnuG7/pub?gid=2107835340&single=true&output=csv';
const {fetchAndProcessCSV} = require('./fetch');
// const filterByDate = async (req, res) => {
//     const clubs = await fetchAndProcessCSV(csvURL);
// }

const searchFilter = async (req, res) => {
    const { clubs, clubsRowMapping } = await fetchAndProcessCSV(csvURL);
    try {
        //.filter(word => word.wordLength() > 0)
        const keywords = req.query.keywords.split(' ').map(word => word.toLowerCase());
        const filteredClubs = clubs.filter(club => {
            const data = [club.club_name, club.type, club.description, club.meet_info].join(' ').toLowerCase();
            return keywords.some(keyword => data.includes(keyword));
        })
        const count = filteredClubs.map(club => {
            const matchCount = keywords.filter(keyword => 
                club.type.toLowerCase().includes(keyword) ||
                club.description.toLowerCase().includes(keyword) ||
                club.meet_info.toLowerCase().includes(keyword) ||
                club.club_name.toLowerCase().includes(keyword)
            ).length;
            return { ...club, matchCount };
        });
        const sortedClubs = count.sort((a, b) => b.matchCount - a.matchCount);
        res.render('results', { clubs: sortedClubs, keywords: req.query.keywords });
        // res.json(sortedClubs);
    } catch (error) {
        console.error(error);
        res.status(500).send("erororwowow");
    }
}
module.exports = {
    searchFilter,
};