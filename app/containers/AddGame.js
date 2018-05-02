import React from 'react';
import { Card, Button, Icon, Tabs, List, Modal} from 'antd';
const confirm = Modal.confirm;
import { CardMedia, CardTitle} from 'material-ui/Card';
import bannerSource from '../src/images/banner.png';
const TabPane = Tabs.TabPane;
import QuinielaGroups from '../components/GroupsCountries';

class AddGame extends React.Component {
    constructor() {
        super();
        this.state = {
            countries: [
                {
                    country1: { code: 'usa', name: 'United States'},
                    country2: { code: 'NIC', name: 'Nicaragua'},
                },
                {
                    country1: { code: 'NER', name: 'Nigeria'},
                    country2: { code: 'ECU', name: 'Ecuador'},
                },
                {
                    country1: { code: 'UGA', name: 'Uganda'},
                    country2: { code: 'LUX', name: 'Luxemburgo'},
                },
                {
                    country1: { code: 'CAN', name: 'Canada'},
                    country2: { code: 'SWE', name: 'Suecia'},
                }
            ]
        };
    }

    showDeleteConfirm() {
        confirm({
            title: '¿Seguro que desea eliminar la quiniela?',
            content: 'Esta acción no puede ser deshecha',
            okText: 'eliminar',
            okType: 'danger',
            cancelText: 'cancelar',
            onOk() {
                // console.log('OK');
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }
    render() {
        const data = this.state.countries.map((countries) => {
            return <QuinielaGroups country1={countries.country1} country2={countries.country2} />;
        });
        return (
            <div>
                <CardMedia
                    overlay={<CardTitle title="Partidos jugados" />} >
                    <img src={bannerSource} alt="" />
                </CardMedia>
                <Card>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="profile" />Subir resultados</span>} key="1">
                            <Card
                                type="inner"
                                title="Fase de grupos"
                            >
                                <List
                                    bordered
                                    dataSource={data}
                                    renderItem={item => (<List.Item>{item}</List.Item>)}
                                />
                                <div style={{ margin: '24px 0' }} />
                                <Button type="primary">Actualizar resultados</Button>
                            </Card>
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        );
    }
}

export default AddGame;

