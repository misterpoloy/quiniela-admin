import React from 'react';
import { withRouter } from 'react-router';
import { Card, Button, Tabs, List, Input, Alert} from 'antd';
const TabPane = Tabs.TabPane;
import Flag from 'react-world-flags'; // Flags

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

class CountriesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
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
                        <TabPane tab="Agregar nuevo pais" key="1">
                            <h3 style={{ margin: '16px 0' }}>Ingresa</h3>
                            <Alert
                                message="¿Cuál es el formato ISO?"
                                description="Puedes encontrar el listado aqui: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3"
                                type="info"
                            />
                            <div style={{ margin: '24px 0' }} />
                            <Input placeholder="Nombre del pais" />
                            <div style={{ margin: '24px 0' }} />
                            <Input placeholder="Codigo en formato ISO" />
                            <div style={{ margin: '24px 0' }} />
                            <Button onClick={this.handleClick} type="primary">Agregar a pais al mundial</Button>
                            <h3 style={{ margin: '16px 0' }}>Listado de paises</h3>
                            <List
                                size="large"
                                header={<div>Paises:</div>}
                                bordered
                                dataSource={data}
                                renderItem={item => (<List.Item actions={[<a>editar</a>, <a>eliminar</a>]}>{item}</List.Item>)}
                            />
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        );
    }
}

CountriesContainer.propTypes = {
    history: React.PropTypes.object.isRequired
};

const ShowTheLocationWithRouter = withRouter(CountriesContainer);

export default ShowTheLocationWithRouter;

