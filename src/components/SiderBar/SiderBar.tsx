import { Button, List, Avatar, Input, Badge, Spin } from 'antd';
import { LoginOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { SiderWrapper } from './style.js';
import { Link, useLocation } from 'react-router-dom';

const { Search } = Input
const SideBar = function () {
  const location = useLocation()
  const data = [
    {
      nickName: 'Ant Design Title 1',
    },
    {
      nickName: 'Ant Design Title 2',
    },
    {
      nickName: 'Ant Design Title 3',
    },
    {
      nickName: 'Ant Design Title 4',
    },
    {
      nickName: 'Ant Design Title 4',
    }, {
      nickName: 'Ant Design Title 4',
    }, {
      nickName: 'Ant Design Title 4',
    }, {
      nickName: 'Ant Design Title 4',
    }, {
      nickName: 'Ant Design Title 4',
    }, {
      nickName: 'Ant Design Title 4',
    }, {
      nickName: 'Ant Design Title 4',
    }, {
      nickName: 'Ant Design Title 4',
    }, {
      nickName: 'Ant Design Title 4',
    }, {
      nickName: 'Ant Design Title 4',
    },
  ];

  // 搜索
  const handleSearch = (value) => {
    console.log(value);
    setLoading(!loading)
  }
  // 加载中
  const [loading, setLoading] = useState(false)

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
              <List.Item>
                <List.Item.Meta
                  avatar={
                    (
                      <Badge count={10}>
                        <Avatar size="large" src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />
                      </Badge>
                    )
                  }
                  title={<a href="https://ant.design">{item.nickName}</a>}
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
