const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./config/database'); 

const Club = sequelize.define('Club', {
  timestamp: {
    type: DataTypes.STRING,
  },
  email_address: {
    type: DataTypes.STRING,
  },
  club_exists: {
    type: DataTypes.STRING,
  },
  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leaders: {
    type: DataTypes.STRING,
  },
  advisor_name: {
    type: DataTypes.STRING,
  },
  advisor_email: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  goals: {
    type: DataTypes.TEXT('long'),
  },
  actions: {
    type: DataTypes.TEXT('long'),
  },
  committed_students: {
    type: DataTypes.TEXT('long'),
  },
  meeting_info: {
    type: DataTypes.TEXT('long'),
  },
  other_info: {
    type: DataTypes.TEXT('long'),
  },
}, {
  tableName: 'Clubs',
  timestamps: true,
});

async function readAllClubs() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    const clubs = await Club.findAll();
    console.log('All Clubs:');
    
    clubs.forEach(club => {
      console.log(club.toJSON());
    });
    
  } catch (error) {
    console.error('Error fetching clubs:', error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

//read clubs
readAllClubs();
