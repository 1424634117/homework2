'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users= [];
    const count = 100;
//执行sequelize db:seed:all时，会自动执行该文件中的up函数
//请提前把数据库中的前面报错但进入数据库的数据删除掉，否则会报错
    for (let i = 1; i <= count; i++) {
     
      /*const user={
      userName: `user${i}`,
      password: `password${i}`,
      createdAt: new Date(),
      updatedAt: new Date(),};*/
      users.push({
        id: i,
        userName: `user${i}`,
        password: `password${i}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('users', users, {}); 
    console.log(`Inserting  ${users}`);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
