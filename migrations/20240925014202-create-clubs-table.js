'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clubs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      timestamp: {
        type: Sequelize.STRING, // Adjust as necessary
      },
      email_address: {
        type: Sequelize.STRING,
      },
      club_exists: {
        type: Sequelize.STRING,
      },
      club_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      leaders: {
        type: Sequelize.STRING,
      },
      advisor_name: {
        type: Sequelize.STRING,
      },
      advisor_email: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      goals: {
        type: Sequelize.TEXT('long'),
      },
      actions: {
        type: Sequelize.TEXT('long'),
      },
      committed_students: {
        type: Sequelize.TEXT('long'),
      },
      meeting_info: {
        type: Sequelize.TEXT('long'),
      },
      other_info: {
        type: Sequelize.TEXT('long'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clubs');
  },
};

// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('Clubs', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//       },
//       club_name: {
//         type: Sequelize.STRING,
//       },
//       type: {
//         type: Sequelize.STRING,
//       },
//       leaders: {
//         type: Sequelize.STRING,
//       },
//       goals: {
//         type: Sequelize.TEXT,
//       },
//       actions: {
//         type: Sequelize.TEXT,
//       },
//       committed_students: {
//         type: Sequelize.STRING,
//       },
//       advisor_name: {
//         type: Sequelize.STRING,
//       },
//       advisor_email: {
//         type: Sequelize.STRING,
//       },
//       other_info: {
//         type: Sequelize.TEXT,
//       },
//       timestamp: {
//         type: Sequelize.STRING,
//       },
//       meeting_info: {
//         type: Sequelize.STRING,
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.fn('now'),
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.fn('now'),
//       },
//     });
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('Clubs');
//   },
// };
