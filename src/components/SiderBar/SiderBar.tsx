import { Button, List, Avatar, Input, Badge, Spin } from 'antd';
import { LoginOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { SiderWrapper } from './style.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const { Search } = Input
const SideBar = function () {
  const location = useLocation()
  const navigate = useNavigate()
  // 加载中
  const [loading, setLoading] = useState(false)
  
  // 好友数据
  const data = [
    {
      id: '1',
      nickName: '小明',
      type:'friend'
    },
    {
      id: '2',
      nickName: '小红',
      type:'friend'
    },
    {
      id:'3',
      nickName: '群聊1',
      type:'group'
    }
  ];

  // 搜索
  const handleSearch = (value) => {
    console.log(value);
    setLoading(!loading)
  }

  // 跳转到聊天页面
  const handleChat = (type:string,id: string) => {
    navigate(`/chat/${type}/${id}`)
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
            dataSource={data}
            split={false}
            renderItem={(item, index) => (
              <List.Item onClick={()=>handleChat(item.type,item.id)}>
                <List.Item.Meta
                  avatar={
                    (
                      <Badge count={10}>
                        <Avatar size="large" src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />
                      </Badge>
                    )
                  }
                  title={<a >{item.nickName}</a>}
                  description="好友"
                />
              </List.Item>
            )}
          />
        </Spin>

      </div>
    )
  }

};
export default SideBar;
