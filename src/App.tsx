import { Routes, Route } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import SideBar from './components/SiderBar/SiderBar';
import Login from './pages/Login/Login';
import Chat from './pages/Chat/Chat';
import PersonCenter from './pages/PersonCenter/PersonCenter';
import NotFound from './pages/NotFound/NotFound';
import Authenticated from './pages/Authenticated/Authenticated';

import { ConfigProvider, Layout } from 'antd';
const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  color: '#fff',
  backgroundColor: '#fff',
};

const defaultPage: React.CSSProperties = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '2.5rem',
  backgroundColor: 'linear-gradient(#fff,#000)',
  transition: 'all 0.5s',
};

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ height: '100%' }}>
        <Sider style={siderStyle} width={250}>
          <SideBar></SideBar>
        </Sider>
        <Layout>
          <Routes>
            <Route path='/home' element={<div style={defaultPage}>
              登录获取更好的体验
            </div>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/chat/:type/:id' element={<Authenticated element={Chat} />}></Route>
            <Route path='/personCenter' element={<Authenticated element={PersonCenter} />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
