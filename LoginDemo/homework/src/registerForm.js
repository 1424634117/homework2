import { useState } from'react';
import { Button } from 'antd';
import { Row, Col } from 'antd';
import { message } from 'koa/lib/response';


export default function RegisterF() {
  const [userNameR, setNameR] = useState('');
  const [passwordR, setPassR] = useState('');
  
  return (
    <div>
      <h1>注册界面</h1>
      <form>
        <Row align='middle'>
          <Col span={1} offset={10}>
            <label>用户名：</label>
          </Col>
          <Col span={1}>
            <input type="text" value={userNameR} onChange={(e) => { setNameR(e.target.value) }} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={1} offset={10}>
            <label>密码：</label>
          </Col>
          <Col span={1}>
            <input type="password" value={passwordR} onChange={(e) => { setPassR(e.target.value) }} />
          </Col>
        </Row>
        <br />
      </form>
      <br />
      
      <Button type="primary" onClick={()=> {message.success('注册成功！');} } href='./App.js'>注册</Button>
    </div>
  );
}

