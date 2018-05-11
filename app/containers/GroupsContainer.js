import React from 'react';
import { withRouter } from 'react-router';
import { Card, Button, Tabs, List, Input, Select, notification} from 'antd';
const TabPane = Tabs.TabPane;
import Flag from 'react-world-flags';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Actions
import {
    createGroup,
    removeGroup,
    addGroup
} from '../actions/settings';

const InputGroup = Input.Group;
const Option = Select.Option;

const style = {
    margin: '5px'
};

const data = [
    <div><Flag style={style} code="usa" height="20" /> Estados Unidos <label>Codigo:</label> USA</div>,
    <div><Flag style={style} code="ABW" height="20" /> Aruba <label>Codigo:</label> ABW</div>,
    <div><Flag style={style} code="NOR" height="20" /> Noruega <label>Codigo:</label> NOR</div>,
    <div><Flag style={style} code="IDN" height="20" /> Indonesia <label>Codigo:</label> IDN</div>,
    <div><Flag style={style} code="GTM" height="20" /> Guatemala <label>Codigo:</label> GTM</div>,
];

class GroupsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        const { getAllGamesByGroupsAction, getStructures, getByGroup } = this.props.actions;
        const token = localStorage.getItem('PrensaTokenAdmin');
        const id = localStorage.getItem('PrensaUserIdAdmin');
        if (!token || token === 'Token invalido' || !id) {
            this.updateToken();
        } else {
            getAllGamesByGroupsAction();
            getByGroup();
            getStructures();
        }
    }
    updateToken = () => {
        notification.error({
            message: 'Necesitas iniciar sesión',
            description: 'Para poder acceder a todas las funcnioes de la Quiniela primero debes de iniciar sesión.',
            placement: 'bottomRight'
        });
        this.props.history.push('/');
    };
    handleClick() {
        this.props.history.push('/create');
    }
    callback() {
        // console.log(key);
    }

    render() {
        return (
            <div containerStyle={{width: 'calc(100% - 600px)'}}>
                <Card
                    style={{ width: '100%' }}
                    title="Listado">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Agregar nuevo grupo" key="1">
                            <h3 style={{ margin: '16px 0' }}>Ingresa</h3>
                            <div style={{ margin: '24px 0' }} />
                            <Input placeholder="Ingrese código de grupo" />
                            <div style={{ margin: '24px 0' }} />
                            <Input placeholder="Codigo en formato ISO" />
                            <div style={{ margin: '24px 0' }} />
                              <Button onClick={this.handleClick} type="primary">Agregar nuevo grupo</Button>
                            <h3 style={{ margin: '16px 0' }}>Asignar pais a grupo</h3>
                            <InputGroup compact>
                                <Select defaultValue="Option1-1">
                                    <Option value="Option1-1">Selecciona el grupo...</Option>
                                </Select>
                                <Select defaultValue="Option2-2">
                                    <Option value="Option2-2">Selecciona el pais...</Option>
                                </Select>
                            </InputGroup>
                              <div style={{ margin: '24px 0' }} />
                              <Button onClick={this.handleClick} type="primary">Asignar</Button>
                              <div style={{ margin: '24px 0' }} />
                            <List
                                size="large"
                                header={<strong>GRUPO A</strong>}
                                bordered
                                dataSource={data}
                                renderItem={item => (<List.Item actions={[<strong>GRUPO A</strong>, <a>editar</a>, <a>eliminar</a>]}>{item}</List.Item>)}
                            />
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        );
    }
}

GroupsContainer.propTypes = {
    actions: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return({
        groupsStructure: state.settings.groupsStructure
    });
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getAllGroupsStructureAction: createGroup,
            removeGroupAction: removeGroup,
            addGroupAction: addGroup,
        }, dispatch)
    };
}
const ShowTheLocationWithRouter = withRouter(GroupsContainer);

export default connect(mapStateToProps, mapDispatchToProps)(ShowTheLocationWithRouter);
