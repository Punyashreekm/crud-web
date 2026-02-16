import React from 'react';
import { ConfigProvider, Layout, Typography } from 'antd';
import UserList from './components/UserList';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6200ea', // Deep Purple - Premium feel
          borderRadius: 8,
          fontFamily: "'Inter', sans-serif",
        },
        components: {
          Button: {
            controlHeight: 40,
            fontSize: 16,
          },
          Table: {
            headerBg: '#f0f2f5',
            headerColor: '#333',
            rowHoverBg: '#f9f9f9',
          }
        }
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ 
          display: 'flex', 
          alignItems: 'center', 
          background: '#fff', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
          zIndex: 1, 
          padding: '0 24px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Logo placeholder or Icon */}
            <div style={{ 
              width: 40, 
              height: 40, 
              background: 'linear-gradient(45deg, #6200ea, #b388ff)', 
              borderRadius: 8, 
              marginRight: 16 
            }} />
            <Title level={4} style={{ margin: 0, color: '#333' }}>User Management Dashboard</Title>
          </div>
        </Header>
        <Content style={{ padding: '24px', background: '#f5f7fa' }}>
          <UserList />
        </Content>
        <Footer style={{ textAlign: 'center', color: '#888' }}>
          CRUD Application ©2026 Created with Ant Design & React
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
