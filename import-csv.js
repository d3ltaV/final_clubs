require('dotenv').config({ path: '.env' });
const axios = require('axios');
const csv = require('csv-parser');
const { DataTypes } = require('sequelize');

// Import the Sequelize instanc from your database.js file
const sequelize = require('./config/database'); // Adjust the path if needed

// Define the 'Club' model
const Club = sequelize.define('Club', {
  type: {
    type: DataTypes.STRING,
  },
  club_name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  meet_info: {
    type: DataTypes.STRING,
  }
  // timestamp: {
  //   type: DataTypes.STRING,
  // },
  // email_address: {
  //   type: DataTypes.STRING,
  // },
  // club_exists: {
  //   type: DataTypes.STRING,
  // },
  // club_name: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // leaders: {
  //   type: DataTypes.STRING,
  // },
  // advisor_name: {
  //   type: DataTypes.STRING,
  // },
  // advisor_email: {
  //   type: DataTypes.STRING,
  // },
  // type: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // goals: {
  //   type: DataTypes.TEXT,
  // },
  // actions: {
  //   type: DataTypes.TEXT,
  // },
  // committed_students: {
  //   type: DataTypes.TEXT,
  // },
  // meeting_info: {
  //   type: DataTypes.TEXT,
  // },
  // other_info: {
  //   type: DataTypes.TEXT,
  // },
}, {
  tableName: 'Clubs',
  timestamps: true,
});

async function importCSVFromURL(csvURL) {
  let connectionEstablished = false;
  const promises = [];

  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    // Drop and recreate the Clubs table
    await sequelize.getQueryInterface().dropTable('Clubs');
    console.log('Dropped existing Clubs table.');

    await sequelize.sync(); // Recreate the table
    console.log('Database synchronized and Clubs table created.');

    connectionEstablished = true;

    const response = await axios.get(csvURL, { responseType: 'stream' });

    response.data
      .pipe(csv())
      .on('data', (row) => {
        console.log('Processing row:', row);
        promises.push(
          Club.create({
            // timestamp: row['Timestamp'],
            // email_address: row['Email Address'],
            // club_exists: row['Did your club exist last semester/year?'],
            // club_name: row['What is the name of your club?'],
            // leaders: row['What are the first and last names of your club leaders?'],
            // advisor_name: row['What is the name of your club\'s advisor (first and last name)? (You need to have a faculty advisor.)'],
            // advisor_email: row['What is your club advisor\'s email address?'],
            // type: row['Is your club a student interest club or a student service club? (Please ask Elizabeth to clarify this as needed. The distinction lies in whether or not you are giving back to the greater community in some way.)'],
            // goals: row['How would you describe the goals of your club?'],
            // actions: row['What are the proposed actions of your club?'],
            // committed_students: row['Which students have committed to joining your club so far? Please include their first and last names. (You must have at least 7 interested students to be official, but you can list less than 7 students here and keep working on recruiting people.)'],
            // meeting_info: row['Do you know where, how often, and when will your club meet? (Have you checked with Plant Facilities, Dining Services, the Athletics Department, etc. to see if this space can be reserved for your group?)  It is okay if you do not know yet. Please articulate that here.'],
            // other_info: row['What else would you like to share about your club?']
            type: row['Type of Club'],
            club_name: row['Name of Club'],
            description: row['Description of Club'],
            meet_info: row['Club Meeting Time and Location']
          }).catch(err => {
            console.error('Error inserting row:', err);
          })
        );
      })
      .on('end', async () => {
        try {
          await Promise.all(promises);
          console.log('All rows have been inserted into the database.');
        } catch (error) {
          console.error('Error inserting rows:', error);
        } finally {
          if (connectionEstablished) {
            await sequelize.close();
            console.log('Database connection closed.');
          }
        }
      });
  } catch (error) {
    console.error('Error importing CSV:', error);
  }
}
const csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTNaoVZbJpLB-65ht7ICw-uEnf2Y4wHa0p69lYt2FYYZYC9Dvdlnt02UJ6ZobCqSA86QWGr0EcxYbwN/pub?gid=2107835340&single=true&output=csv';
importCSVFromURL(csvURL);
