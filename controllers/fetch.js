//read from csv (sheets that drives website), gets all the clubs that need to be publisehd ready
const axios = require('axios');
const axiosRetry = require('axios-retry').default;
const csv = require('csv-parser');
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
async function fetchAndProcessCSV(csvURL) {
  // let idCounter = 0;
  const clubs = [];
  try {
    const response = await axios.get(csvURL, { responseType: 'stream', timeout: 10000 });

    return new Promise((resolve, reject) => {
      response.data
        .pipe(csv())
        .on('data', (row) => {
          const typeOfClub = row['Type of Club'] ? row['Type of Club'].trim() : '';
          const nameOfClub = row['Name of Club '] ? row['Name of Club '].trim() : '';
          const descriptionOfClub = row['Description of Club '] ? row['Description of Club '].trim() : '';
          const meetInfo = row['Club Meeting Time and Location'] ? row['Club Meeting Time and Location'].trim() : '';
          const publish = row['Publish'] ? row['Publish'].trim() : '';
          if (typeOfClub.length > 0 && nameOfClub.length > 0 && descriptionOfClub.length > 0 && meetInfo.length > 0 && publish === "YES") {
            clubs.push({
              // id: idCounter++,
              id: nameOfClub,
              type: typeOfClub,
              club_name: nameOfClub,
              description: descriptionOfClub,
              meet_info: meetInfo,
              publish: publish,
            });
          }
        })
        .on('end', () => resolve(clubs))
        .on('error', (error) => reject(error));
    });
  } catch (error) {
    console.error('Error fetching or processing CSV:', error);
    throw error;
  }
}

module.exports = { fetchAndProcessCSV };
