import SideBar from './components/SiderBar/SiderBar';
import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import Home from './pages/Home/Home';

import { Layout } from 'antd';
const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  color: '#fff',
  backgroundColor: '#fff',
};

const defaultPage:React.CSSProperties = {
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
      <Layout style={{ height: '100%' }}>
        <Sider style={siderStyle} width={250}>
          <SideBar></SideBar>
        </Sider>
        <Layout>
          <Routes>
            <Route path='/' element={<div style={defaultPage}>
              登录获取更好的体验
            </div>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/chat' element={<Home />}></Route>
          </Routes>
        </Layout>
      </Layout>
  );
}

export default App;
