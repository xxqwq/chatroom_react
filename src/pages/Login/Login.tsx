import { LoginWrapper } from './style.js';
import { Button, Form, Input, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { login, register, sendCode } from '@/apis/login.ts'

const { Search } = Input
const LoginAndResForm = ({ formType, toggleFormType }) => {
  const navigate = useNavigate()
  const [form] = Form.useForm()


  const handleLogin = async () => {
    try {
      const res = await login({
        username: form.getFieldValue('username'),
        password: form.getFieldValue('password'),
      })
      if (res.code == 200) {
        localStorage.setItem('access_token', res.data.access_token)
        navigate('/personCenter/1')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleRegister = async () => {
    form.getFieldValue('email')
    try {
      const res = await register({
        username: form.getFieldValue('username'),
        password: form.getFieldValue('password'),
        email: form.getFieldValue('email'),
        code: form.getFieldValue('code'),
        nickname: form.getFieldValue('nickname')
      })
      if (res.code == "200") {
        setTimeout(() => {
          toggleFormType()
        }, 1000);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSend = async () => {
    console.log(form.getFieldsValue())
    try {
      const res = await sendCode({
        email: form.getFieldValue('email')
      })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  if (formType === 'login') {
    return (
      <Form form={form}>
        <Form.Item label='账号' name='username'>
          <Input placeholder='请输入账号' prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item label='密码' name='password'>
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
      <Form form={form}>
        <Form.Item label='账号' name='username'>
          <Input placeholder='请输入账号' prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item label='昵称' name='nickname'>
          <Input placeholder='请输入昵称' prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item label='密码' name='password'>
          <Input
            placeholder='请输入密码'
            type='password'
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item label='邮箱' name='email'>
          <Input
            placeholder='请输入邮箱'
            prefix={<MailOutlined />}
          />
        </Form.Item>
        <Form.Item label='验证码' name='code'>
          <Search
            placeholder="请输入验证码"
            allowClear
            enterButton="发送验证码"
            onSearch={handleSend}
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
