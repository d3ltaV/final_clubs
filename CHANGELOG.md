# Changelog

All notable changes to this project will be documented in this file.

## [v1.1.0] - 2024-11-07
### Added
- Search function via keyword or keywords (supports substring matching).
- Cleaned up CSS to improve responsiveness across different screen sizes and removed redundant code.
- Changed the club `id` from a manual counter to use the club name.
- Integrated Google Sheets for data source:
  - **Spreadsheet 1**: NMH Student Club Form for Internal Website: FALL 2024 (Responses)
    - Tabs: "Record Keeping Data," "Website CSV" (drives website), and "Raw Data" (form submissions).
  - **Spreadsheet 2**: NMH Student Groups Contact Information.
- Shared Google Sheets with the NMH community for improved accessibility.

### Fixed
- Updated `const csvURL` with the correct link.
- Fixed issue with automatic club updating by adjusting the club `id` field to prevent website breaks.

### Known Issues
- Link to Google Sheet still does not directly navigate to individual clubs.

---

## [v1.0.0] - 2024-10-31
### Added
- Homepage with dropdown menus categorizing clubs:
  - Interest Club, Service Club, Affinity Group, Spiritual Life Group.
- Club-specific information pages displaying details such as:
  - Club type, description, meeting times, and a link to a Google Sheet with additional information for NMH members.
- Pig image on the homepage.

### Known Issues
- **Partial Club Listings**: Some clubs are missing; updating requires refreshing the Google Sheets and restarting the server.
- **Dropdown Label Mismatch**: "Interest Clubs" should be labeled "Student Interest" in the HTML code.
- **Image Update**: Pig image needs to be updated.
- **Link Optimization**: Additional information link on the club description page could be improved.
- **Static Right-Side Elements**: Buttons and text on the right side are not yet dynamic.
- **Missing Search Functionality**: No search feature to filter clubs by keywords.

