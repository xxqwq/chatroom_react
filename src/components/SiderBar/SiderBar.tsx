import { Button, List, Avatar, Input, Badge, Spin, FloatButton, Modal, Skeleton } from 'antd';
import { LoginOutlined, PlusOutlined, BellOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SiderWrapper } from './style.js';
import { getFriendList, searchPeople, sendFriendRequest, getFriendRequest,handleFriendRequest } from '@/apis/friend'
import { useDebounce } from '../../utils/debounce.ts'
import { useSelector } from 'react-redux';

const { Search } = Input
const SideBar = function () {
  const location = useLocation()
  const navigate = useNavigate()
  // 加载中
  const [loading, setLoading] = useState(false)
  const [addFriendModalOpen, setAddFriendModalOpen] = useState(false)
  const [noticeModalOpen, setNoticeModalOpen] = useState(false)
  const [searchPeopleList, setSearchPeopleList] = useState([])
  const [requestList, setRequestList] = useState([])
  // 好友数据
  const [friendList, setFriendList] = useState([])
  useEffect(() => {
    getFriendListData()
    getFriendRequestListData()
  }, [location.pathname])

  // 获取好友列表
  const getFriendListData = async () => {
    try {
      const res = await getFriendList()
      console.log(res)
      if (res.code == 200) {
        setFriendList(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // 搜索
  const handleSearch = (value) => {
    console.log(value);
    setLoading(!loading)
  }

  // 搜索用户
  const handleSearchPerson = useDebounce(async (value) => {
    try {
      const res = await searchPeople({ keyword: value })
      if (res.code == 200) {
        setSearchPeopleList(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }, 1000)

  // 添加好友
  const handleAddFriend = async (friend_id: number) => {
    const res = await sendFriendRequest({ friend_id })
    if (res.code == 200) {
      setAddFriendModalOpen(false)
      getFriendListData()
    }
  }

  // 获取好友请求
  const getFriendRequestListData = async ()=>{
    try {
      const res = await getFriendRequest()
      console.log(res)
      if (res.code == 200) {
        setRequestList(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  // 跳转到聊天页面
  const handleChat = (type: string, id: string, nickname: string) => {
    navigate(`/chat/${type}/${id}?nickname=${nickname}`)
  }

  if (location.pathname === '/login') {
    // 登录页
    return <SiderWrapper>
      <span>前往登录，开启聊天之旅!</span>
    </SiderWrapper>
  } else if (location.pathname === '/home') {
    // 首页
    return (
      <SiderWrapper>
        <Link to="/login">
          <Button
            type='primary'
            shape='round'
            icon={<LoginOutlined />}
            size='large'
            ghost
            className='animate__animated animate__bounceIn'>
            登录
          </Button>
        </Link>
      </SiderWrapper>
    );
  } else {
    // 主页面
    return (
      <div style={{
        height: '100%',
        overflow: 'auto',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}>
        <Search
          placeholder="搜索好友"
          allowClear
          onSearch={handleSearch}
        />
        <Spin spinning={loading}>
          <List
            itemLayout="horizontal"
            dataSource={friendList}
            split={false}
            renderItem={(item, index) => (
              <List.Item onClick={() => handleChat('friend', item.id, item.nickname)}>
                <List.Item.Meta
                  avatar={
                    (
                      <Badge count={10}>
                        <Avatar size="large" src={item.avatar} />
                      </Badge>
                    )
                  }
                  title={<a >{item.nickname}</a>}
                  description="聊天记录"
                />
              </List.Item>
            )}
          />
        </Spin>
        <FloatButton.Group
          trigger="click"
          style={{ left: 16 }}
          icon={<AppstoreOutlined />}
        >
          <FloatButton tooltip={<div>好友请求</div>} icon={<BellOutlined />} onClick={() => setNoticeModalOpen(true)} />
          <FloatButton tooltip={<div>添加好友</div>} icon={<PlusOutlined />} onClick={() => setAddFriendModalOpen(true)} />
        </FloatButton.Group>
        <Modal title={<Search placeholder="请输入好友的用户名或者昵称" onSearch={handleSearchPerson} />} closable={false} maskClosable centered cancelText='取消' open={addFriendModalOpen} onOk={() => setAddFriendModalOpen(false)} onCancel={() => setAddFriendModalOpen(false)}>
          <Spin spinning={loading}>
            <List
              itemLayout="horizontal"
              dataSource={searchPeopleList}
              split={false}
              renderItem={(item, index) => (
                <List.Item actions={[<Button type='primary' onClick={() => handleAddFriend(item.id)}>添加好友</Button>, <Button onClick={() => {
                  setAddFriendModalOpen(false)
                  handleChat('friend', item.id, item.nickname)
                }}>发起聊天</Button>]}>
                  {/* <Skeleton avatar title={false} loading={item} active> */}
                  <List.Item.Meta
                    avatar={
                      (
                        <Avatar size="large" src={item.avatar} />
                      )
                    }
                    title={<a >{item.nickname}(用户名:{item.username})</a>
                    }
                    description={item.signature}
                  />
                  {/* </Skeleton> */}
                </List.Item>
              )}
            />
          </Spin>
        </Modal>
        <Modal title='好友请求' closable={false} maskClosable centered cancelText='取消' open={noticeModalOpen} onOk={() => setNoticeModalOpen(false)} onCancel={() => setNoticeModalOpen(false)} afterClose={getFriendRequestListData}>
          <Spin spinning={loading}>
            <List
              itemLayout="horizontal"
              dataSource={requestList}
              split={false}
              renderItem={(item, index) => (
                <List.Item actions={[<Button type='primary' onClick={() => {
                  handleFriendRequest({
                    sender_id: item.id,
                    respond: 1
                  })
                  setNoticeModalOpen(false)
                }}>同意请求</Button>, 
                <Button onClick={() => {
                  handleFriendRequest({
                    sender_id: item.id,
                    respond: 0
                  })
                  setNoticeModalOpen(false)
                }} danger>拒绝请求</Button>]}>
                  {/* <Skeleton avatar title={false} loading={item} active> */}
                  
                  <List.Item.Meta
                    avatar={
                      (
                        <Avatar size="large" src={item.avatar} />
                      )
                    }
                    title={<a >{item.nickname}(用户名:{item.username})</a>
                    }
                    description={item.signature}
                  />
                  {/* </Skeleton> */}
                </List.Item>
              )}
            />
          </Spin>
        </Modal>
      </div>
    )
  }
};
export default memo(SideBar);
