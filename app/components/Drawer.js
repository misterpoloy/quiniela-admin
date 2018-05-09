import React from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import { Menu, Icon } from 'antd';
import Drawer from 'material-ui/Drawer';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class DrawerApp extends React.Component {
    logout =() => {
        localStorage.clear();
        this.props.history.push('/');
    };
    render() {
        const id = localStorage.getItem('PrensaUserIdAdmin');
        return(
            <Drawer
            open
            containerStyle={{height: 'calc(100% - 64px)', top: 64, position: 'fixed'}}>
            <Menu
                onClick={this.handleClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="sub1" title={<span><Icon type="setting" /><span>Configuración general</span></span>}>
                    <MenuItemGroup key="g1" title="Estructura">
                        <Menu.Item key="1"><Link to="/countries">Paises</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/groups">Grupos</Link></Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup key="g2" title="Plataforma">
                        <Menu.Item key="3"><Link to="/super">Super Quiniela</Link></Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup key="g3" title="Torneo">
                        <Menu.Item key="4"><Link to="/add">+ Agregar Partido</Link></Menu.Item>
                    </MenuItemGroup>
                    {id &&
                    <MenuItemGroup key="g5" title="Sistema">
                        <Menu.Item key="5"><a onClick={this.logout}>Cerrar sesión</a></Menu.Item>
                    </MenuItemGroup>
                    }
                </SubMenu>
            </Menu>
        </Drawer>);
    }
}

DrawerApp.propTypes = {
    history: React.PropTypes.object.isRequired
};
const ShowTheLocationWithRouter = withRouter(DrawerApp);

export default ShowTheLocationWithRouter;


