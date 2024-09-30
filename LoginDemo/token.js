const { sign, verify } = require('jsonwebtoken');
const secretKey = "tanzhixin";

module.exports = {
  // 获取token
  getToken(ctx) {
    return ctx.request.headers.Authorization || '';
  },

  // 加密
  signToken(userInfo){
    // jwt由三部分组成,分别是header,payload,signature
    const token = sign(
      { username: userInfo.username, password: userInfo.password },
      secretKey,
      { expiresIn: '1h' }
      // { expiresIn: 10 } // 10s
    );
    return token;
  },

  // 验签
  verifyToken(token){
    return verify(token, secretKey);
  },
  // 将secretKey返回
  secretKey
}