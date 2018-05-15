import React from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import { Menu, Icon } from 'antd';
import Drawer from 'material-ui/Drawer';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import prensaimg from '../src/images/imagen.jpeg';

class DrawerApp extends React.Component {
    logout =() => {
        localStorage.clear();
        this.props.history.push('/');
    };
    render() {
        const id = localStorage.getItem('PrensaUserIdAdmin');
        return(
            <div>
                <Drawer
                    open
                    width={id ? 256 : 600}
                    containerStyle={{height: id ? 'calc(100% - 64px)' : 'calc(100%)', top: id ? 64 : 0, position: 'fixed'}}>
                    {id &&
                    <Menu
                        onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu key="sub1" title={<span><Icon type="setting" /><span>Configuración general</span></span>}>
                            <MenuItemGroup key="g1" title="Estructura">
                                <Menu.Item disabled key="1"><Link to="/countries">Paises</Link></Menu.Item>
                                <Menu.Item disabled key="2"><Link to="/groups">Grupos</Link></Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup disabled key="g2" title="Plataforma">
                                <Menu.Item disabled key="3"><Link to="/super">Super Quiniela</Link></Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup disabled key="g3" title="Torneo">
                                <Menu.Item key="4"><Link to="/add">+ Agregar Partido</Link></Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup key="g5" title="Sistema">
                                <Menu.Item key="5"><a onClick={this.logout}>Cerrar sesión</a></Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                    </Menu>
                    }
                    {!id &&
                        <img src={prensaimg} alt="Prensa Libre"/>
                    }
                </Drawer>
            </div>
        );
    }
}

DrawerApp.propTypes = {
    history: React.PropTypes.object.isRequired
};
const ShowTheLocationWithRouter = withRouter(DrawerApp);

export default ShowTheLocationWithRouter;


