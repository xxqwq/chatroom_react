import { LoginWrapper } from './style.js';
import { Button, Form, Input, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Search } = Input
const LoginAndResForm = ({ formType, toggleFormType }) => {
  const navigate = useNavigate()

  const handleLogin = () => {
    console.log('登录')
    navigate('/personCenter/1')
  }

  const handleRegister = () => {
    console.log('注册')
  }

  if (formType === 'login') {
    return (
      <Form>
        <Form.Item label='账号'>
          <Input placeholder='请输入账号' prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item label='密码'>
          <Input
            placeholder='请输入密码'
            type='password'
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button type='primary' onClick={handleLogin}>登录</Button>
          <Button type='link' onClick={toggleFormType}>注册账号</Button>
        </Form.Item>
      </Form>
    )
  } else {
    return (
      <Form>
        <Form.Item label='账号'>
          <Input placeholder='请输入账号' prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item label='密码'>
          <Input
            placeholder='请输入密码'
            type='password'
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item label='邮箱'>
          <Input
            placeholder='请输入邮箱'
            prefix={<MailOutlined />}
          />
        </Form.Item>
        <Form.Item label='验证码'>
          <Search
            placeholder="请输入验证码"
            allowClear
            enterButton="发送验证码"
          // onSearch={onSearch}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button type='primary' onClick={handleRegister}>注册</Button>
          <Button type='link' onClick={toggleFormType}>前往登录</Button>
        </Form.Item>
      </Form>
    )
  }

}

export default () => {
  const [formType, setFormType] = useState('login') // ['login', 'register']

  const toggleFormType = () => {
    setFormType((prev) => prev === 'login' ? 'register' : 'login')
  }

  return (
    <LoginWrapper>
      <Card
        title={formType === 'login' ? '登录' : '注册'}
        bordered={false}
        style={{ width: '40rem' }}
        headStyle={{ textAlign: 'center' }}
        className='animate__animated animate__fadeIn'>
        <LoginAndResForm formType={formType} toggleFormType={toggleFormType} />
      </Card>
    </LoginWrapper>
  );
};
