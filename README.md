NMH Clubs Database!
1. import-csv.js: Sheets is uploaded as a CSV file on the web, reads from that URL and drops/creates POSTGRES table with data
2. Public folder: images and CSS
3. Views folder: HTML, homepage and clubpage.
4. Models: Clubs models containing club name, club type, description of club, and meeting info
5. Controllers: home.js fetches all valid clubs (where all fields have string length > 0) and renders the homepage.
6. Config: configuration, sets up database/sequelize instance
