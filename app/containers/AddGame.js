import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
// util
const _ = require('lodash');

// Actions
import {
    getAllGamesByGroups,
    getQuinielaStructures,
    updateGame,
    sendMassiveEmail,
    getGroupList
} from '../actions/settings';

// Design
import { Card, Button, Icon, Tabs, List, notification, Modal } from 'antd';
import { CardMedia, CardTitle} from 'material-ui/Card';
import bannerSource from '../src/images/banner.png';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
import QuinielaGroups from '../components/QuinielaGroups';

class AddGame extends React.Component {
    constructor() {
        super();
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
    shouldComponentUpdate(nextProps) {
        return this.props !== nextProps;
    }
    updateToken = () => {
        notification.error({
            message: 'Necesitas iniciar sesión',
            description: 'Para poder acceder a todas las funcnioes de la Quiniela primero debes de iniciar sesión.',
            placement: 'bottomRight'
        });
        this.props.history.push('/');
    };
    saveGameAction = body => {
        const { updateGameAction } = this.props.actions;
        confirm({
            title: '¿Estás seguro que actualizar los resultados para este partido?',
            content: 'Esto actualizará la tabla de posiciones de todas las quinielas.',
            okText: 'Si, actualizar',
            cancelText: 'No',
            onOk() {
                notification.success({
                    message: 'Partido actualizado',
                    placement: 'bottomRight',
                    description: 'El marcador para este partido ha sido actualizado.',
                });
                updateGameAction(body.ID, body);
            }
        });
    };
    sendNotification = () => {
        const { sendMassiveEmailAction } = this.props.actions;
        confirm({
            title: '¿Estás seguro que deseas enviar la notificación masiva?',
            content: 'Este mensaje enviará un correo electrónico a todos los usuarios registrados en la quiniela mundialista notificando que se han actualizado los resultados de los partidos',
            okText: 'Si, enviar',
            cancelText: 'No',
            onOk() {
                sendMassiveEmailAction();
            }
        });
    };
    renderFases = () => {
        const { quinielaStructures, CountriesByGroup } = this.props;
        const fasesState = ['grupos', 'octavos', 'cuartos', 'semiFinales', 'tercer', 'final'];

        let i = 0;
        const Cards = _.map(quinielaStructures, fase => {
            const currentProp = fasesState[i];
            const currentFaseProps = this.props[currentProp];

            const data = currentFaseProps.map((juego) => {
                return (
                    <QuinielaGroups
                        saveGameAction={this.saveGameAction}
                        CountriesByGroup={CountriesByGroup}
                        game={juego}
                    />
                );
            });
            i++;
            return (
                <Card type="inner" title={'Fase de ' + fase.NOMBRE}>
                    <List
                        bordered
                        dataSource={data}
                        locale={{ emptyText: 'Cargando paises, banderas y opciones. Por favor espera...' }}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                    />
                </Card>
            );
        });
        return Cards;
    };
    render() {
        return (
            <div>
                <CardMedia
                    overlay={<CardTitle title="Partidos jugados" />} >
                    <img src={bannerSource} alt="" />
                </CardMedia>
                <Card>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="profile" />Subir resultados</span>} key="1">
                            { this.renderFases() }
                            <Button onClick={this.sendNotification} type="primary">Enviar notificación de cambios</Button>
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        );
    }
}

AddGame.propTypes = {
    actions: React.PropTypes.object.isRequired,
    quinielaStructures: React.PropTypes.array.isRequired,
    CountriesByGroup: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return({
        grupos: state.settings.grupos,
        octavos: state.settings.octavos,
        cuartos: state.settings.cuartos,
        semiFinales: state.settings.semiFinales,
        CountriesByGroup: state.settings.countriesByGroup,
        quinielaStructures: state.settings.quinielaStructures,
        tercer: state.settings.tercer,
        final: state.settings.final,
    });
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getAllGamesByGroupsAction: getAllGamesByGroups,
            getByGroup: getGroupList,
            sendMassiveEmailAction: sendMassiveEmail,
            updateGameAction: updateGame,
            getStructures: getQuinielaStructures
        }, dispatch)
    };
}
const ShowTheLocationWithRouter = withRouter(AddGame);

export default connect(mapStateToProps, mapDispatchToProps)(ShowTheLocationWithRouter);

