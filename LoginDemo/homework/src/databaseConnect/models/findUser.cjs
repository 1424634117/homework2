

const { Sequelize } = require('sequelize');



const sequelize = new Sequelize('userLogin', 'root', 'tan11xin', {
    host: 'localhost',
    dialect:  'mysql' 
  });
  // 测试连接,建立成功
  async function test(){
    try {
    await sequelize.authenticate();
    console.log('成功连接到数据库');

  } catch (error) {
    console.error('无法连接到数据库:', error);
  }
  }
  test();
  const userLogin = require('./user.cjs')(sequelize, Sequelize);
 

//登陆用函数
  async function findUserMo(userName, password) {
    const user = await userLogin.findOne({
      where: {
        userName: userName,
        password: password
      }
    });
    console.log(user);
    if (user) {
      console.log(`${userName} 登录成功`);
      return user;
    } else {
      console.log('用户名或密码错误');
      return null;
    }
  }

//注册用函数
  async function createUser(userName, password) {
    const user = await userLogin.create({
      userName: userName,
      password: password
    });
    console.log(`${userName} 注册成功`);
    return user;
  }


//登陆测试，user1应该显示登陆成功，user2应该显示错误
  findUserMo('user1', 'password1');
  findUserMo('user2', 'password55');
  //createUser('user101', 'password101');
  module.exports = {
    findUserMo,
    createUser
  };




  



  

  
/*const { users } = require('./user')
const { DataTypes } = require('sequelize');
function findUser(userName, password) {
    console.log(users.findOne({
        where: {
            userName: userName,
            password: password
        }
    }));
    return users.findOne({
        where: {
            userName: userName,
            password: password
        }
    });
}
findUser('user1', 'password1');
findUser('user2', 'password55');*/
