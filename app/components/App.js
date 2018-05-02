import React from 'react';
import Routes from '../routes';
import {Layout} from 'antd'; // Ant Styles
const {Content, Sider} = Layout; // Ant Layout
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // Material theme
import getMuiTheme from 'material-ui/styles/getMuiTheme'; // Custom App Theme
import ComponentHeader from './ComponentHeader'; // Main Content
import 'antd/dist/antd.css';
import './../styles/styles.scss';
import AppTheme from './../styles/app-material-ui-theme';
import DrawerApp from './Drawer';

const App = () =>
    <MuiThemeProvider muiTheme={getMuiTheme(AppTheme)}>
        <div>
            <ComponentHeader/>
                <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                    <DrawerApp />
                </Sider>
            <Content>
                <Layout style={{ marginLeft: 260 }}>
                    { Routes }
                </Layout>
            </Content>
        </div>
    </MuiThemeProvider>;

export default App;
