const Koa = require('koa');
const {koaBody} = require('koa-body');
const { sign, verify } = require('jsonwebtoken');
const cors = require('@koa/cors');

const app = new Koa();
app.use(koaBody());
app.use(cors({
  origin: 'http://localhost:3000',
  allowedMethods:['GET','POST','DELETE','PUT'],
  allowHeaders:['Content-Type','Authorization'],


}))
//const path = require('path')
const Static = require('koa-static');
const Router = require('koa-router');
const router = new Router();
//import  *  as  jwt  from  'jsonwebtoken';
const axios = require('axios');
//import  *  as  jwt  from  'jsonwebtoken';
//import App from './homework/src/App';


//const App = require('./homework/src/App.js').default;
/*const Register=require('./homework/src/App.js');
const Login=require('./homework/src/App.js');;*/


//import App from './homework/src/App';
const  jwt  =  require('jsonwebtoken');
//const token = require("./token.js");
const {findUserMo,createUser} = require('./homework/src/databaseConnect/models/findUser.cjs');

//const secretKey = "tanzhixin";
//app.use(Static('./homework/src'));
//const path = require('path');
const secretKey = "tanzhixin";
// 使用 koa-static 提供静态文件
//app.use(Static(path.join(__dirname, 'homework')));
router.post('/login', async (ctx) => {
  const { userName, password } = ctx.request.body;
  const user = await findUserMo(userName, password);
  if (user) {
    const token = sign({ username: user.username, password: user.password }, secretKey, { expiresIn: '10s' });
    ctx.body = {
      data: {
        token,
      },
      message: '登录成功',
      status: 200,
    };
  } else {
    ctx.body = {
      data: null,
      message: '用户名或密码错误',
      status: 401,
    };
    throw new Error('用户名或密码错误');
  }
});
router.post('/register', async (ctx) => {
  const { userName, password } = ctx.request.body;
  const user = await createUser(userName, password);
  if (user) {
    const token = sign({ username: user.username, password: user.password }, secretKey, { expiresIn: '10s' });
    ctx.body = {
      data: {
        token,
      },
      message: '注册成功',
      status: 200,
    };
  };})

app.use(async (ctx, next) => {
  // 如果token没有经过验证中间件会返回401错误
  await next().catch((err)=>{
    if (401 === err.status) {
      ctx.status = 401;
      ctx.body = {
        data: '没有找到token信息，请检查'
      };
      console.log("未找到token: "+ err);
    } else {
      console.log(err);
      throw err;
    }
  });
});

// unless 登录注册不需要jwt验证
/*app.use(jwt({ secret: token.secretKey }).unless({ path: ['/Login', '/Register','/']}));*/


/*router.get('/',  (ctx) => {
 //   const html = ReactDOMServer.renderToString(<App />);
    const html = renderToString(<App/>);
    ctx.body = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>My App</title>
        </head>
        <body>
          <div id="root">${html}</div>
          <script src="/homework/src/App.js"></script>
        </body>
      </html>`;
  });
  router.get('/Register',  (ctx) => {
    //   const html = ReactDOMServer.renderToString(<Register />);
       const html = renderToString(<Register/>);
       ctx.body = `<!DOCTYPE html>
         <html>
           <head>
             <meta charset="UTF-8">
             <title>My App</title>
           </head>
           <body>
             <div id="root">${html}</div>
             <script src="/homework/src/App.js"></script>
           </body>
         </html>`;
     });
     router.get('/Login',  (ctx) => {
      //   const html = ReactDOMServer.renderToString(<Login />);
         const html = renderToString(<Login/>);
         ctx.body = `<!DOCTYPE html>
           <html>
             <head>
               <meta charset="UTF-8">
               <title>My App</title>
             </head>
             <body>
               <div id="root">${html}</div>
               <script src="/homework/src/App.js"></script>
             </body>
           </html>`;
       });*/
app.use(router.routes()).use(router.allowedMethods());

app.listen(3001,()=>{
    console.log('Server is running on port 3001');
});