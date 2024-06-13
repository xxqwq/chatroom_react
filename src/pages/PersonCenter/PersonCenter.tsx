import { Avatar, Card, Skeleton, Descriptions, Flex, Button, Modal, Form, Input, Radio, DatePicker, Select, message, Upload } from 'antd';
import type { DescriptionsProps, UploadProps } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { logout } from '@/apis/login.ts'
import { getUserInfo, changeProfile, changePassword } from '@/apis/user.ts'
import { setUserInfo } from '@/store/user';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const EditModal = function ({ openModal, setOpenModal, getProfile, userInfo, form }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const handleOk = async () => {
    setOpenModal(false)
    try {
      const res = await changeProfile(form.getFieldsValue())
      if (res.code == 200) {
        getProfile()
      }
    } catch (err) {
      console.log(err)
    }
  };

  const handleCancel = () => {
    setOpenModal(false)
  };

  // 图片修改
  const getBase64 = (img: any, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
   
  return (
    <Modal title='编辑个人资料' centered okText='保存' cancelText='取消' open={openModal} onOk={handleOk} onCancel={handleCancel} >
      <Form layout='horizontal' form={form}>
        <Form.Item
          label='头像'
        >
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            defaultFileList={userInfo.avatar}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item
          label='昵称'
          name='nickName'
        >
          <Input placeholder='请输入您的昵称' defaultValue={userInfo.nickname} />
        </Form.Item>
        <Form.Item
          label='个签'
          name='signature'
        >
          <Input placeholder='请输入您的个性签名' defaultValue={userInfo.signature} />
        </Form.Item>
        <Form.Item
          label='性别'
          name='sex'
        >
          <Radio.Group defaultValue={userInfo.sex}>
            <Radio value="男">男</Radio>
            <Radio value="女">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label='生日'
          name='birthday'
        >
          <DatePicker placeholder='请输入您的生日' defaultValue={dayjs(userInfo.birthday)} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label='邮箱'
          name='email'
        >
          <Input placeholder='请输入您的邮箱' defaultValue={userInfo.email} />
        </Form.Item>
        <Form.Item
          label='手机号'
          name='phone'
        >
          <Input placeholder='请输入您的手机号' defaultValue={userInfo.phone} />
        </Form.Item>
        <Form.Item
          label='所在地'
          name='location'
        >
          <Input placeholder='请输入您的所在地' defaultValue={userInfo.location} />
        </Form.Item>
        <Form.Item
          label='教育背景'
          name='education'
        >
          <Select
            defaultValue={userInfo.education}
            options={[{ value: '小学', label: '小学' },
            { value: '初中', label: '初中' },
            { value: '高中', label: '高中' },
            { value: '本科', label: '本科' },
            { value: '硕士', label: '硕士' },
            { value: '博士', label: '博士' },
            { value: '其他', label: '其他' },]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const ChangePwdModal = function ({ openModal, setOpenModal, form }) {
  const handleOk = async () => {
    let old_password = form.getFieldValue('old_password')
    let new_password = form.getFieldValue('new_password')
    let confirm_password = form.getFieldValue('confirm_password')
    console.log(old_password, new_password, confirm_password)
    if (confirm_password !== old_password) {
      message.warning('两次密码不一致')
      return
    }
    try {
      const res = await changePassword({
        old_password,
        new_password
      })
      if (res.code == 200) {
        form.resetFields()
        setOpenModal(false)
      }
    } catch (err) {
      console.log(err)
    }
  };

  const handleCancel = () => {
    setOpenModal(false)
  };

  return (
    <Modal title='修改密码' centered okText='确认' cancelText='取消' open={openModal} onOk={handleOk} onCancel={handleCancel} >
      <Form layout='horizontal' form={form}>
        <Form.Item
          label='原密码'
          name='old_password'
        >
          <Input placeholder='请输入您的原密码' />
        </Form.Item>
        <Form.Item
          label='新密码'
          name='new_password'
        >
          <Input placeholder='请输入您的新密码' />
        </Form.Item>
        <Form.Item
          label='确认密码'
          name='confirm_password'
        >
          <Input placeholder='请再次输入新密码' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const PersonCenter = function () {
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [pwdModal, setPwdModal] = useState(false);
  const [form] = useForm()
  const navigate = useNavigate()
  const userInfo = useSelector((state: any) => state.user.userInfo)
  const dispatch = useDispatch()

  // 获取个人信息
  const getProfile = async () => {
    try {
      const res = await getUserInfo()
      if (res.code == 200) {
        dispatch(setUserInfo(res.data))
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProfile()
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const date = dayjs(userInfo.birthday).format('YYYY-MM-DD')
  const items: DescriptionsProps['items'] = [
    {
      key: 'nickname',
      label: '昵称',
      children: userInfo.nickname,
    },
    {
      key: 'signature',
      label: '个性签名',
      children: userInfo.signature,
    },
    {
      key: 'sex',
      label: '性别',
      children: userInfo.sex,
    },
    {
      key: 'birthday',
      label: '生日',
      children: date,
    },
    {
      key: 'email',
      label: '邮箱',
      children: userInfo.email,
    },
    {
      key: 'phone',
      label: '手机号',
      children: userInfo.phone,
    },
    {
      key: 'location',
      label: '所在地',
      children: userInfo.location,
    },
    {
      key: 'education',
      label: '教育背景',
      children: userInfo.education,
    },
  ];

  // 退出登录
  const handleLogout = async () => {
    try {
      const res = await logout()
      if (res.code == 200) {
        localStorage.removeItem('access_token')
        navigate('/login')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Card title='个人中心' bordered={false} style={{ margin: '20px', height: '100%' }}>
      <Skeleton loading={loading} avatar active>
        <Flex gap={20}>
          <Avatar size={64} src={userInfo.avatar}></Avatar>
          <Descriptions bordered column={2} items={items} style={{ flex: 1 }} />
        </Flex>
        <Flex justify='end' gap={20} style={{ margin: '20px' }}>
          <Button type='primary' danger onClick={handleLogout}>退出登录</Button>
          <Button type='primary' onClick={() => setPwdModal(true)}>修改密码</Button>
          <Button type='primary' onClick={() => setEditModal(true)}>编辑资料</Button>
        </Flex>
      </Skeleton>
      <EditModal openModal={editModal} setOpenModal={setEditModal} getProfile={getProfile} userInfo={userInfo} form={form} />
      <ChangePwdModal openModal={pwdModal} setOpenModal={setPwdModal} form={form} />
    </Card>
  )
}

export default PersonCenter