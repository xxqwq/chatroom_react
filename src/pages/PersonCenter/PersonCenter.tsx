import { Avatar, Card, Skeleton, Badge, Descriptions, Flex, Button, Modal, Form, Input, Radio, DatePicker, Select } from 'antd';
import type { DescriptionsProps } from 'antd';

const EditModal = function ({ openModal, setOpenModal }) {
  const handleOk = () => {
    setOpenModal(false)
  };

  const handleCancel = () => {
    setOpenModal(false)
  };

  return (
    <Modal title='编辑个人资料' centered okText='保存' cancelText='取消' open={openModal} onOk={handleOk} onCancel={handleCancel} >
      <Form layout='horizontal'>
        <Form.Item
          label='头像'
          name='nickName'
        >
          <Avatar size={48} />
        </Form.Item>
        <Form.Item
          label='昵称'
          name='nickName'
        >
          <Input placeholder='请输入您的昵称' />
        </Form.Item>
        <Form.Item
          label='个签'
          name='signature'
        >
          <Input placeholder='请输入您的个性签名' />
        </Form.Item>
        <Form.Item
          label='性别'
          name='sex'
        >
          <Radio.Group>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label='生日'
          name='birthday'
        >
          <DatePicker placeholder='请输入您的生日' style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label='邮箱'
          name='email'
        >
          <Input placeholder='请输入您的邮箱' />
        </Form.Item>
        <Form.Item
          label='手机号'
          name='phone'
        >
          <Input placeholder='请输入您的手机号' />
        </Form.Item>
        <Form.Item
          label='所在地'
          name='location'
        >
          <Input placeholder='请输入您的所在地' />
        </Form.Item>
        <Form.Item
          label='教育背景'
          name='education'
        >
          <Select
            defaultValue='其他'
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

const ChangePwdModal = function ({ openModal, setOpenModal }) {
  const handleOk = () => {
    setOpenModal(false)
  };

  const handleCancel = () => {
    setOpenModal(false)
  };

  return (
    <Modal title='修改密码' centered okText='确认' cancelText='取消' open={openModal} onOk={handleOk} onCancel={handleCancel} >
      <Form layout='horizontal'>
        <Form.Item
          label='原密码'
          name='oldPwd'
        >
          <Input placeholder='请输入您的原密码' />
        </Form.Item>
        <Form.Item
          label='新密码'
          name='newPwd'
        >
          <Input placeholder='请输入您的新密码' />
        </Form.Item>
        <Form.Item
          label='确认密码'
          name='confirmPwd'
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

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '昵称',
      children: 'Cloud Database',
    },
    {
      key: '2',
      label: '个性签名',
      children: 'Prepaid',
    },
    {
      key: '3',
      label: '性别',
      children: 'YES',
    },
    {
      key: '4',
      label: '生日',
      children: '2018-04-24 18:00:00',
    },
    {
      key: '5',
      label: '邮箱',
      children: '2019-04-24 18:00:00',
    },
    {
      key: '6',
      label: '状态',
      children: <Badge status='processing' text='Running' />,
      span: 3,
    },
    {
      key: '7',
      label: '手机号',
      children: '$80.00',
    },
    {
      key: '8',
      label: '所在地',
      children: '$20.00',
    },
    {
      key: '9',
      label: '教育背景',
      children: '$60.00',
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <Card title='个人中心' bordered={false} style={{ margin: '20px', height: '100%' }}>
      <Skeleton loading={loading} avatar active>
        <Flex gap={20}>
          <Avatar size={64}></Avatar>
          <Descriptions bordered column={2} items={items} style={{ flex: 1 }} />
        </Flex>
        <Flex justify='end' gap={20} style={{ margin: '20px' }}>
          <Button type='primary' onClick={() => setPwdModal(true)}>修改密码</Button>
          <Button type='primary' onClick={() => setEditModal(true)}>编辑资料</Button>
        </Flex>
      </Skeleton>
      <EditModal openModal={editModal} setOpenModal={setEditModal} />
      <ChangePwdModal openModal={pwdModal} setOpenModal={setPwdModal} />
    </Card>
  )
}

export default PersonCenter