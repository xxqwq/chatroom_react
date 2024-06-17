import { Layout, Input, Flex, Button, Avatar, message, Modal } from 'antd';
import { LeftOutlined } from '@ant-design/icons'
import { MemberItemWrapper, MemberListWrapper, ButtonWrapper } from './style.js'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
const { TextArea } = Input;
const { Header, Content, Footer } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#000',
  fontSize: '2rem',
  paddingInline: 20,
  backgroundColor: '#7dbcea',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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


const DialogPoper = function ({ identity, message, nickname }) {
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
      <Flex justify='start' align='center' style={{ margin: '10px 10px', maxWidth: '45%' }}>
        <Avatar size={48} style={{ minWidth: '48px' }} />
        <Flex vertical justify='start' align='start' style={{ maxWidth: '100%' }}>
          <div style={{ color: '#555', marginRight: 'auto' }}>{nickname}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', background: '#fff', padding: '8px', margin: '5px 5px 5px 5px', whiteSpace: 'pre-wrap', maxWidth: 'calc(100% - 10px)', textAlign: 'start' }}>
            {message}
          </div>
        </Flex>
      </Flex>
    )
  } else {
    return (<Flex justify='end' align='center' style={{ margin: '10px 10px', maxWidth: '100%' }}>
      <Flex vertical justify='start' align='start' style={{ maxWidth: '100%' }}>
        <div style={{ color: '#555', marginLeft: 'auto' }}>{nickname}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', background: '#fff', padding: '8px', margin: '5px 5px 5px 5px', whiteSpace: 'pre-wrap', maxWidth: 'calc(100% - 10px)', textAlign: 'start' }}>
          {message}
        </div>
      </Flex>
      <Avatar size={48} style={{ minWidth: '48px' }} />
    </Flex>

    )
  }
}

const MainContent = function ({ messages }) {
  // 设置滚动容器
  const scrollContainerRef = useRef(null)
  // 当消息出现新的时候，滚动到底部
  useEffect(() => {
    if (scrollContainerRef.current) {
      const lastMessage = scrollContainerRef.current.lastElementChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [messages])

  return (
    <div style={{ flex: 1, maxHeight: '100%', overflow: 'auto' }} ref={scrollContainerRef}>
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
      nickname: '路人1',
      role: '用户'
    },
    {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    },
    {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
      role: '用户'
    }, {
      avatar: '',
      nickname: '路人甲',
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
              <MemberItemWrapper key={index} >
                <Flex align='center'>
                  <Avatar size='small' />
                  <div style={{ marginLeft: '10px' }}>{item.nickname}</div>
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
  const [searchParams] = useSearchParams()
  console.log(searchParams.get('nickname'))
  const navigate = useNavigate()
  // 聊天对象
  const { type, id } = useParams()
  const nickname = searchParams.get('nickname')
  const handleSend = () => {
    message.success('发送成功')
    setMessages((prev) => [
      ...prev,
      {
        id: id,
        identity: 'me',
        nickname,
        message: msg
      }
    ])
    setMessage('')
  }

  useEffect(() => {
    console.log(messages)
  }, [messages])

  const handleBack = () => {
    navigate('/personCenter')
  }

  return (
    <>
      <Header style={headerStyle}>
        <ButtonWrapper onClick={handleBack}>
          {/* <Button shape='round' icon={<LeftOutlined />}>返回首页</Button> */}
          <LeftOutlined />
          <span>返回首页</span>
        </ButtonWrapper>
        <div style={{ textAlign: 'center', flexGrow: 1 }}>{nickname}</div>
      </Header>
      <Content style={contentStyle}>
        <MainContent messages={messages} />
        {type === 'group' && <MemberList />}
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
