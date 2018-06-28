import React from 'react';
import {Button, Select, Icon, Badge, Row, Col, message} from 'antd';
const Option = Select.Option;
const ButtonGroup = Button.Group;
import Flag from 'react-world-flags'; // Flags
import moment from 'moment-timezone';

// util
const _ = require('lodash');

const style = {
    margin: '5px',
    width: 46,
    borderRadius: 5
};
const esatdioStyle = {
    color: '#86c5ff',
    fontSize: 12,
    marginTop: -23
};

class QuinielaGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            GOLES_1: props.game.GOLES_1 || 0,
            GOLES_2: props.game.GOLES_2 || 0,
            JUEGO_1: null,
            JUEGO_2: null,
            show: true,
        };
    }
    updateGame = () => {
        const { game } = this.props;
        const { GOLES_1, GOLES_2, JUEGO_1, JUEGO_2 } = this.state;

        const predictionID = game.ID;
        const jugador1ID = game.JUGADOR_1.NOMBRE !== 'null' ? game.JUGADOR_1.ID : JUEGO_1;
        const jugador2ID = game.JUGADOR_2.NOMBRE !== 'null' ? game.JUGADOR_2.ID : JUEGO_2;

        const prediction = {
            ID: predictionID,
            GOLES_1,
            GOLES_2,
            JUGADOR_1: jugador1ID,
            JUGADOR_2: jugador2ID
        };
        this.setState(() => ({ prediction }));
    };
    saveGame = () => {
        const { saveGameAction } = this.props;
        const { prediction } = this.state;
        const { game } = this.props;
        const { JUGADOR_1, JUGADOR_2} = game;
        if (!prediction) {
            if (JUGADOR_1.NOMBRE === 'null' || JUGADOR_2.NOMBRE === 'null') {
                message.error('Tienes que ingresar todos los paises');
            } else {
                const gruposZero = {
                    ID: game.ID,
                    GOLES_1: 0,
                    GOLES_2: 0,
                    JUGADOR_1: game.JUGADOR_1.ID,
                    JUGADOR_2: game.JUGADOR_2.ID
                };
                saveGameAction(gruposZero);
            }
        } else {
            if (!prediction.JUGADOR_1 || !prediction.JUGADOR_2) {
                message.error('Uno de los dos paises es indefinido');
            } else {
                saveGameAction(prediction);
            }
        }
    };
    increase = () => {
        const { game } = this.props;
        const { JUEGO_1 } = this.state;
        const exist = !!JUEGO_1;

        if (game.JUGADOR_1.NOMBRE === 'null' && !exist ) {
            message.error('Tienes que ingresar el pais uno primero');
            return;
        }

        const GOLES_1 = this.state.GOLES_1 + 1;
        this.setState({ GOLES_1 }, () => {
            this.updateGame();
        });
    };
    decline = () => {
        const { game } = this.props;
        const { JUEGO_1 } = this.state;
        const exist = !!JUEGO_1;

        if (game.JUGADOR_1.NOMBRE === 'null' && !exist ) {
            message.error('Tienes que ingresar el pais uno primero');
            return;
        }
        let GOLES_1 = this.state.GOLES_1 - 1;
        if (GOLES_1 < 0) {
            GOLES_1 = 0;
        }
        this.setState({ GOLES_1 }, () => {
            this.updateGame();
        });
    };
    // Country 2
    increase2 = () => {
        const { game } = this.props;
        const { JUEGO_2 } = this.state;
        const exist = !!JUEGO_2;

        if (game.JUGADOR_2.NOMBRE === 'null' && !exist ) {
            message.error('Tienes que ingresar el pais dos primero');
            return;
        }
        const GOLES_2 = this.state.GOLES_2 + 1;
        this.setState({ GOLES_2 }, () => {
            this.updateGame();
        });
    };
    decline2 = () => {
        const { game } = this.props;
        const { JUEGO_2 } = this.state;
        const exist = !!JUEGO_2;

        if (game.JUGADOR_2.NOMBRE === 'null' && !exist ) {
            message.error('Tienes que ingresar el pais dos primero');
            return;
        }
        let GOLES_2 = this.state.GOLES_2 - 1;
        if (GOLES_2 < 0) {
            GOLES_2 = 0;
        }
        this.setState({ GOLES_2 }, () => {
            this.updateGame();
        });
    };
    // select Country 1
    selecCountry1 = country => {
        const newValue = country;
        this.setState({ JUEGO_1: newValue }, () => {
            this.updateGame();
        });
    };
    selecCountry2 = value => {
        const JUEGO_2 = value;
        this.setState({ JUEGO_2 }, () => {
            this.updateGame();
        });
    };
    render() {
        const { game, CountriesByGroup } = this.props;
        const isGroups = (game.JUGADOR_1 && game.JUGADOR_1.NOMBRE !== 'null' );

        const date = moment(game.FECHA).locale('es');
        const fecha = date.tz('America/Guatemala').format('MMM DD YYYY, h:mm:ss a');

        // FlagOptions LEFT
        const optionsPerGame = {};
        const string = game.SELECCION_1;
        const groupsCountries = string.split(',');
        _.chain(groupsCountries)
            .each(item => {
                const justgroup = _.filter(CountriesByGroup, group => {
                    return group.CODIGO === item;
                });
                _.map(justgroup, function(country) {
                    optionsPerGame[country.PAIS] = {...country};
                });
            })
            .value();

        // FlagOptions RIGTH
        const optionsPerGameR = {};
        const groupsCountriesR = game.SELECCION_2.split(',');
        _.chain(groupsCountriesR)
            .each(item => {
                const justgroupR = _.filter(CountriesByGroup, group => {
                    return group.CODIGO === item;
                });
                _.map(justgroupR, function(country) {
                    optionsPerGameR[country.PAIS] = {...country};
                });
            })
            .value();

        const menu = () => _.map(optionsPerGame, pais => {
            return (
                <Option key={pais.PAIS} key={pais.PAIS}>
                    <Flag style={{...style, width: 28, marginLeft: 8}} code={pais.ISO} height="20" />
                    {pais.NOMBRE}
                </Option>
            );
        });
        const menuRigth = () => _.map(optionsPerGameR, pais => {
            return (
                <Option key={pais.PAIS} key={pais.PAIS}>
                    <Flag style={{...style, width: 28, marginLeft: 8}} code={pais.ISO} height="20" />
                    {pais.NOMBRE}
                </Option>
            );
        });
        return (
            <div style={{ width: '100%' }}>
                { isGroups ? (
                    <div>
                        <Row>
                            <Col span={8}>
                                <label style={style}>{game.JUGADOR_1.NOMBRE || 'ADIVINA 1'}</label>
                            </Col>
                            <Col span={7} offset={3}>
                                <label style={style}>{game.JUGADOR_2.NOMBRE || 'ADIVINA 2'}</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5}>
                                <ButtonGroup>
                                    <Button onClick={this.decline}>
                                        <Icon type="minus" />
                                    </Button>
                                    <Button onClick={this.increase}>
                                        <Icon type="plus" />
                                    </Button>
                                </ButtonGroup>
                                <Flag style={style} code={game.JUGADOR_1.ISO} height="30" />
                                <Badge showZero count={this.state.GOLES_1} />
                            </Col>
                            <Col span={3} offset={1}>
                                <div style={{ textAlign: 'center' }}>
                                    <h1 style={{ color: '#d6d6d6', marginTop: -15 }}>VS</h1>
                                    <h4 style={esatdioStyle}>{game.UBICACION.NOMBRE}</h4>
                                    <div>Grupo {game.OPCIONES_DE_SELECCION}</div>
                                </div>
                            </Col>
                            <Col span={5} offset={2}>
                                <ButtonGroup>
                                    <Button onClick={this.decline2}>
                                        <Icon type="minus" />
                                    </Button>
                                    <Button onClick={this.increase2}>
                                        <Icon type="plus" />
                                    </Button>
                                </ButtonGroup>
                                <Flag style={style} code={game.JUGADOR_2.ISO} height="30" />
                                <Badge showZero count={this.state.GOLES_2} />
                            </Col>
                            <Col span={2}>
                                <Button onClick={this.saveGame} type="primary">Actualizar resultado</Button>
                            </Col>
                        </Row>
                    </div>
                ) : (
                    <div>
                        <Row>
                            <Col span={7}>
                                <Select onChange={this.selecCountry1} style={{ width: 150, marginRigth: 5 }}>
                                    { menu() }
                                </Select>
                                <ButtonGroup>
                                    <Button onClick={this.decline}>
                                        <Icon type="minus" />
                                    </Button>
                                    <Button onClick={this.increase} style={{ marginRight: 5 }}>
                                        <Icon type="plus" />
                                    </Button>
                                </ButtonGroup>
                                <Badge showZero count={this.state.GOLES_1} />
                            </Col>
                            <Col span={3}>
                                <div style={{ textAlign: 'center' }}>
                                    <h1 style={{ color: '#d6d6d6', marginTop: -15 }}>VS</h1>
                                    <h4 style={esatdioStyle}>{game.UBICACION.NOMBRE}</h4>
                                    <div>
                                        <h4>{fecha}</h4>
                                    </div>
                                    {/** options <div>{game.OPCIONES_DE_SELECCION || ''}</div> **/}
                                </div>
                            </Col>
                            <Col span={7} offset={2}>
                                <Select onChange={this.selecCountry2} style={{ width: 150, marginRigth: 5 }}>
                                    { menuRigth() }
                                </Select>
                                <ButtonGroup>
                                    <Button onClick={this.decline2}>
                                        <Icon type="minus" />
                                    </Button>
                                    <Button onClick={this.increase2} style={{ marginRight: 5 }}>
                                        <Icon type="plus" />
                                    </Button>
                                </ButtonGroup>
                                <Badge showZero count={this.state.GOLES_2} />
                            </Col>
                            <Col span={2}>
                                <Button onClick={this.saveGame} type="primary">Actualizar resultado</Button>
                            </Col>
                        </Row>
                    </div>
                )
                }
            </div>
        );
    }
}
QuinielaGroups.propTypes = {
    game: React.PropTypes.object.isRequired,
    saveGameAction: React.PropTypes.func.isRequired,
    CountriesByGroup: React.PropTypes.object.isRequired
};
export default QuinielaGroups;
