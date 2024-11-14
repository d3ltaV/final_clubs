# NMH Clubs Database

Welcome to the **NMH Clubs Database**! This platform provides information about the various clubs at NMH. You can search for clubs via keyword(s) or explore the clubs categorized by their type.

---

## Project Structure

### 1. **Controllers**
Controllers handle the data-fetching and filtering functionality.

- **`fetch.js`**: A function that retrieves all club data from Google Sheets.
- **`filter.js`**: Filters and returns clubs based on search criteria.
- **`home.js`**: Retrieves all clubs, sorted by type, for display on the homepage.

### 2. **Public Assets**
These are static files used for displaying the content.

#### - **Images**
- **`pig.png`**: Image used on the homepage.

#### - **Styles**
- **`clubstyles.css`**: Styles specific to individual club pages.
- **`resultstyles.css`**: Styles for the search results page.
- **`homestyles.css`**: Styles for the homepage.

### 3. **Routes**
The routes file handles the different endpoints for searching and accessing club information.

- **`clubRoutes.js`**: Defines routes for searching clubs and displaying detailed information.

---

## Deprecated Files
The following files and functionality are no longer in use due to the removal of the database integration:

- **Models**: Database models for clubs are no longer in use.
- **Migration Files**: The migration files for setting up database tables have been discarded.
- **`import-csv.js`**: This file was used to import data from CSV files into the database, which is no longer necessary.
