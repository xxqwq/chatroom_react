import { Layout, Input, Flex, Button, Avatar, message } from 'antd';
import { MemberItemWrapper, MemberListWrapper } from './style.js'
const { TextArea } = Input;
const { Header, Content, Footer } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  // color: '#fff',
  // minHeight: '120px',
  flex: 1,
  display: 'flex',
  // backgroundColor: '#108ee9',
};


const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  padding: 0,
  position: 'relative'
};


const DialogPoper = function ({ identity, message, nickName }) {
  const [position, setPosition] = useState('start')

  useEffect(() => {
    if (identity === 'me') {
      setPosition('end')
    } else {
      setPosition('start')
    }
  }, [identity])
  if (position === 'start') {
    return (
      <Flex justify='start' align='center' style={{ margin: '10px 10px' }}>
        <Flex vertical justify='start' align='start'>
          <div style={{ color: '#555', marginLeft: '5px' }}>{nickName}</div>
          <div style={{ background: '#fff', padding: '8px', margin: '5px', borderRadius: '10%' }}>
            {message}
          </div>
        </Flex>
        <Avatar size={48} />
      </Flex>
    )
  } else {
    return (
      <Flex justify='end' align='center' style={{ margin: '10px 10px' }}>
        <Flex vertical justify='start' align='start'>
          <div style={{ color: '#555', marginLeft: '5px' }}>{nickName}</div>
          <div style={{ background: '#fff', padding: '8px', margin: '5px', borderRadius: '10%' }}>
            {message}
          </div>
        </Flex>
        <Avatar size={48} />
      </Flex>
    )
  }

}

const MainContent = function ({ messages }) {
  console.log(messages)
  return (
    <div style={{ flex: 1 }}>
      {messages.map(item => {
        return <DialogPoper {...item} key={item.id} />
      })}
    </div>
  )
}

const MemberList = function () {
  const listStyle = {
    height: '100%',
    overflowY: 'auto',
  } as React.CSSProperties

  // 成员列表数据
  const memberList = [
    {
      avatar: '',
      nickName: '路人1',
      role: '用户'
    },
    {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    },
    {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickName: '路人甲',
      role: '用户'
    },
  ]

  return (
    <MemberListWrapper>
      <div style={{ height: '100%' }}>
        <div style={{ margin: '10px' }}>成员列表</div>
        <Flex vertical align='start' justify='center' style={listStyle}>
          {memberList.map((item, index) => {
            return (
              <MemberItemWrapper>
                <Flex key={index} align='center'>
                  <Avatar size='small' />
                  <div style={{ marginLeft: '10px' }}>{item.nickName}</div>
                </Flex>
              </MemberItemWrapper>
            )
          })}
        </Flex>
      </div>
    </MemberListWrapper>
  )
}

const Home = function () {
  const [msg, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleSend = () => {
    message.success('发送成功')
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length,
        identity: 'me',
        nickName: '路人1',
        message: msg
      }
    ])
    setMessage('')
  }

  useEffect(() => {
    console.log(messages)
  }, [messages])

  return (
    <>
      <Header style={headerStyle}>聊天名</Header>
      <Content style={contentStyle}>
        <MainContent messages={messages} />
        <MemberList />
      </Content>
      <Footer style={footerStyle}>
        <TextArea
          maxLength={400}
          onChange={(e) => setMessage(e.target.value)}
          value={msg}
          placeholder='请输入你想说的话'
          style={{ height: 120, maxHeight: 120, resize: 'none' }}
        />
        <Button type='primary' size='large' style={{ position: 'absolute', right: 0, bottom: 0, width: 100 }} onClick={handleSend}>发送</Button>
      </Footer>
    </>
  );
};
export default Home;
