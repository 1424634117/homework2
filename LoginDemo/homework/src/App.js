import './App.css';
import React from 'react';
import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Route, Link, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
//const {findUserMo} = require('./databaseConnect/models/findUser.cjs');

//在这个作业项目中，仅仅用了三个组件：app、loginin、register，其他组件未配置路由

function App() {
  return (
    <div className="AppMain">
      <Button type='link' htmlType='submit'><Link to="/Login">去登陆</Link></Button>
      <Button type='link' htmlType='submit'><Link to="/Register">去注册</Link></Button>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}
function Login() {
  const [userName, setName] = useState('');
  const [password, setPass] = useState('');
  const [isLogin, setIsLogin] = useState(false); // FIXME: 这个 isLogin 的 state 有在哪里使用吗
  /*async function Login(userName, password) {
    try {
      await findUserMo(userName, password);
      message.success('登录成功');
      setIsLogin(true);
    } catch (error) {
      message.error('密码或用户名错误');
      setIsLogin(false);
    }*/

  //点击登陆时启用的函数，会向前端发送请求
  const Login = async (userName, password) => {
    try {
      //返回的请求，要读取token应为res.data.data.token，而不是res.data.token（这是没有定义的）!!!
      await axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        data: {
          userName: userName,
          password: password
        }
      }).then(res => console.log(res.data.data.token)); // FIXME: 通常按照业务逻辑，登录成功之后我们会把token放到默认的请求头中，之后每次向后台发请求都会带上token
      // FIXME: 这里的逻辑有点怪怪的，应该是判断请求返回值的情况然后决定是否登录成功，所以下面这两句话应该在then里面
      message.success('登录成功');
      setIsLogin(true);
    } catch (error) {
      message.error(`错误:${error}`);
      setIsLogin(false);
    }
  };
  return (
    // FIXME: 1. 可以看一下 antd 的 useForm 方法，用专有的 form 对象去管理表单数据，就可以省略两个state带来的消耗（userName password）
    <div><h1>登录界面</h1>
      <Form>
        <Form.Item>
          <Input placeholder="请输入用户名" value={userName} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Input.Password placeholder="请输入密码" value={password} onChange={(e) => setPass(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType='submit' onClick={() => Login(userName, password)}>登录</Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" htmlType='submit'><Link to='/Register'>注册</Link></Button>
        </Form.Item></Form>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" />
      </Routes></div>)
}

function Home() {
  return (
    <div>
      <h1>登陆成功</h1>
    </div>
  );
}

function Register() {
  const [userName, setName] = useState(null);
  const [password, setPass] = useState(null);
  const [rePass, setRePass] = useState(null);

  //点击注册启用的函数，确认密码rePass不会传给前端
  async function RegisterOk() {
    if (userName !== null && password !== null && password === rePass) {
      try {
        await axios({
          method: 'post',
          url: 'http://localhost:3001/register',
          data: {
            userName: userName,
            password: password
          }
        }).then(res => { alert(res.data.data.token); });
        message.success(`注册成功,${userName}`); // FIXME: 这个也是跟上面一样的问题，要不要放在 then 里面
      }
      catch (err) {
        message.error(`错误:${err}`);
        message.error(`可能由于该用户名已存在，请修改后重试`);
      }
    }
    else if (password !== rePass) { message.error('两次密码不一致'); }
    else {
      message.error('密码或用户名不能为空');
    }
  }
  function changeUserName(e) {
    setName(e.target.value);
  }
  function changePass(e) {
    setPass(e.target.value);
  }
  function changeRePass(e) {
    setRePass(e.target.value);
  }
  return (
    <div>
      <h1>注册</h1>
      <Form>
        <Form.Item>
          <Input placeholder="请输入用户名" onChange={changeUserName} />
        </Form.Item>
        <Form.Item>
          <Input.Password placeholder="请输入密码" onChange={changePass} />
        </Form.Item>
        <Form.Item>
          <Input.Password placeholder="请确认密码" onChange={changeRePass} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType='submit' onClick={RegisterOk}>注册</Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" htmlType='submit'><Link to='/Login'>已有账号？去登录</Link></Button>
        </Form.Item>
        <Routes>
          <Route path="/" />
          <Route path="/Login" />
        </Routes>
      </Form>
    </div>
  );
}

function LoginOrRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const changeForm = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div>
      <Button type="primary" onClick={changeForm}>{isLogin ? '注册' : '登录'}</Button>
      {isLogin ? <App /> : <Register />}
    </div>
  );
}

export default App;
export { Home, Register, Login, LoginOrRegister };
