import { Layout, Input, Flex, Button, Avatar, message, Modal } from 'antd';
import { LeftOutlined } from '@ant-design/icons'
import { MemberItemWrapper, MemberListWrapper, ButtonWrapper } from './style.js'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client'
import { getChatHistory } from '@/apis/chat'
import { getFriendInfo } from '@/apis/friend'
const { TextArea } = Input;
const { Header, Content, Footer } = Layout;
const my_name = localStorage.getItem('nickname')

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
  color: 'black',
  padding: 0,
  position: 'relative'
};


const DialogPoper = function ({ sender_id, content, created_at, identity, nickname }) {
  const [position, setPosition] = useState('start')
  const [avatar, setAvatar] = useState('')
  useEffect(() => {
    getFriendInfo(sender_id).then(res => {
      console.log(res);
      if (res.code === 200) {
        console.log(res.data);
        nickname = res.data.nickname
        setAvatar(res.data.avatar)
      }
    })
  }, [])
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
        <Avatar size={48} style={{ minWidth: '48px' }} src={avatar} />
        <Flex vertical justify='start' align='start' style={{ maxWidth: '100%' }}>
          <div style={{ color: '#555', marginRight: 'auto' }}>{sender_id}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', background: '#fff', padding: '8px', margin: '5px 5px 5px 5px', whiteSpace: 'pre-wrap', maxWidth: 'calc(100% - 10px)', textAlign: 'start' }}>
            {content}
          </div>
        </Flex>
      </Flex>
    )
  } else {
    return (<Flex justify='end' align='center' style={{ margin: '10px 10px', maxWidth: '100%' }}>
      <Flex vertical justify='start' align='start' style={{ maxWidth: '100%' }}>
        <div style={{ color: '#555', marginLeft: 'auto' }}>{nickname}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', background: '#fff', padding: '8px', margin: '5px 5px 5px 5px', whiteSpace: 'pre-wrap', maxWidth: 'calc(100% - 10px)', textAlign: 'start' }}>
          {content}
        </div>
      </Flex>
      <Avatar size={48} style={{ minWidth: '48px' }} />
    </Flex>
    )
  }
}

const MainContent = function ({ messages, nickname }) {
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
        if (item.sender_id == localStorage.getItem('user_id')) {
          item.identity = 'me'
          item.nickname = my_name
        } else {
          item.identity = 'other'
          item.nickname = nickname
        }
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
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  // 获取消息
  const getHistory = async () => {
    let user_id = localStorage.getItem('user_id')
    let friend_id = id
    try {
      const res = await getChatHistory({
        user_id,
        friend_id
      })
      if (res.code == 200) {
        console.log(res.data);
        setMessages(res.data)
        console.log(messages);
      }
    } catch (e) {
      console.log(e);
    }
    // socket.emit('get_history', { sender_id, receive_id});
    // socket.on('history', (res) => {
    //   console.log(res);
    //   setMessages(res)
    // })

  }
  // 聊天对象
  const { type, id } = useParams()
  const nickname = searchParams.get('nickname')
  const handleSend = () => {
    // setMessages((prev) => [
    //   ...prev,
    //   {
    //     id: id,
    //     identity: 'me',
    //     nickname,
    //     message: msg
    //   }
    // ])
    if (!msg) {
      message.warning('请输入内容')
      return
    }
    let timestamp = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
    let sender_id = localStorage.getItem('user_id')
    socket.emit('chat_private', { sender_id, receive_id: id, content: msg, timestamp, type: 'private' });
    message.success('发送成功')
    setMessage('')
  }


  // socket链接
  useEffect(() => {
    getHistory()
    const newSocket = io('ws://127.0.0.1:5000')

    newSocket.on('connect', () => {
      console.log('connected');
    });


    newSocket.on('disconnect', () => {
      console.log('disconnect');
    });

    newSocket.on('receive_chat_history', (res) => {
      setMessages(prevMessages => [...prevMessages, res]);
    })

    setSocket(newSocket)
    return () => {
      if (newSocket.connected) {
        newSocket.disconnect();
      }
    };
  }, [id])

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
        <MainContent messages={messages} nickname={nickname} />
        {type === 'group' && <MemberList />}
      </Content>
      <Footer style={footerStyle}>
        <div style={{ textAlign: 'left' }}>工具栏</div>
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
