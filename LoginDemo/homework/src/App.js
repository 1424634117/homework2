import './App.css';
import React from'react';
import { useState } from'react';
import { Button,Form,Input,message} from 'antd';
import { Route,Link,Routes,Navigate } from 'react-router-dom';
import axios from 'axios';
//const {findUserMo} = require('./databaseConnect/models/findUser.cjs');

//在这个作业项目中，仅仅用了三个组件：app、loginin、register，其他组件未配置路由

function App() {
  return (
    <div className="AppMain">
      <Button type='link' htmlType='submit'><Link to="/Login">去登陆</Link></Button>
      <Button type='link' htmlType='submit'><Link to="/Register">去注册</Link></Button>
          <Routes>  
            <Route path="/Home" element={<Home/>} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/Login" element={<Login/>} />
          </Routes>
    </div>
  );
}
function Login(){
  const [userName, setName] = useState('');
  const [password, setPass] = useState('');
  const [isLogin,setIsLogin]=useState(false);
  /*async function Login(userName, password) {
    try {
      await findUserMo(userName, password);
      message.success('登录成功');
      setIsLogin(true);
    } catch (error) {
      message.error('密码或用户名错误');
      setIsLogin(false);
    }*/
    const Login = async(userName,password)=>{
      try {
        await axios({
          method: 'post',
          url: 'http://localhost:3001/login',
          data: {
            userName: userName,
            password: password
          }}).then(res=>console.log(res.data.token));
        message.success('登录成功');
        setIsLogin(true);
      } catch (error) {
        message.error(`错误:${error}`);
        setIsLogin(false);
      }
    };
  return (
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
            <Route path="/Home" element={<Home/>} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/"  />
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
  async function RegisterOk() {
    if (userName!==null && password!==null && password===rePass)
   {  
      try{await axios({
        method: 'post',
        url: 'http://localhost:3001/register',
        data: {
          userName: userName,
          password: password
        }}).then(res=>{alert(res.data.data.token);});
        message.success(`注册成功,${userName}`);}
      catch(err){
        message.error(`错误:${err}`);
        message.error(`可能由于该用户名已存在，请修改后重试`);
      }}
    else if(password!==rePass)
    {message.error('两次密码不一致') ;}
    else{
    message.error('密码或用户名不能为空') ;
  }}
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
          <Input placeholder="请输入用户名" onChange={changeUserName}/>
        </Form.Item>
        <Form.Item>
          <Input.Password placeholder="请输入密码" onChange={changePass} />
        </Form.Item>
        <Form.Item>
          <Input.Password placeholder="请确认密码" onChange={changeRePass}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType='submit' onClick={RegisterOk}>注册</Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" htmlType='submit'><Link to='/Login'>已有账号？去登录</Link></Button>
        </Form.Item>
        <Routes>  
            <Route path="/"  />
            <Route path="/Login"  />
        </Routes>
      </Form>
    </div>
  );
}

function LoginOrRegister() {
  const [isLogin,setIsLogin]=useState(true);
  const changeForm=()=>{
    setIsLogin(!isLogin);
  };
  return(
    <div>
      <Button type="primary" onClick={changeForm}>{isLogin?'注册':'登录'}</Button>
      {isLogin?<App/>:<Register/>}
    </div>
  );
}

export default App;
export { Home, Register, Login, LoginOrRegister };
