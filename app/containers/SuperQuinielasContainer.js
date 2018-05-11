import React from 'react';
import { withRouter } from 'react-router';
import { Card, Button, Tabs, Input, notification} from 'antd';
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Actions
import {
    updateSuperQuiniela,
    getSuperQuiniela
} from '../actions/settings';

class SuperQuinielasContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        const { getAllGamesByGroupsAction, getSuperQuinielaAction, getStructures, getByGroup } = this.props.actions;
        const token = localStorage.getItem('PrensaTokenAdmin');
        const id = localStorage.getItem('PrensaUserIdAdmin');
        if (!token || token === 'Token invalido' || !id) {
            this.updateToken();
        } else {
            getAllGamesByGroupsAction();
            getByGroup();
            getSuperQuinielaAction();
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
        // this.props.history.push('/create');
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
                        <TabPane tab="Super Quiniela" key="1">
                            <h3 style={{ margin: '16px 0' }}>Ingresa</h3>
                            <div style={{ margin: '24px 0' }} />
                            <TextArea placeholder={"Ingresa las instrucciones"} rows={8} />
                            <div style={{ margin: '24px 0' }} />
                            <Input placeholder="Premio 1" />
                            <div style={{ margin: '24px 0' }} />
                            <Input placeholder="Premio 2" />
                            <div style={{ margin: '24px 0' }} />
                            <Input placeholder="Premio 3" />
                            <div style={{ margin: '24px 0' }} />
                            <Button onClick={this.handleClick} type="primary">Actualizar</Button>
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        );
    }
}

SuperQuinielasContainer.propTypes = {
    actions: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return({
        superQuiniela: state.settings.superQuiniela
    });
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getSuperQuinielaAction: getSuperQuiniela,
            updateSuperQuinielaAction: updateSuperQuiniela,
        }, dispatch)
    };
}
const ShowTheLocationWithRouter = withRouter(SuperQuinielasContainer);

export default connect(mapStateToProps, mapDispatchToProps)(ShowTheLocationWithRouter);

