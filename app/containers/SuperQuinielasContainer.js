import React from 'react';
import { withRouter } from 'react-router';
import { Card, Button, Tabs, Input} from 'antd';
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class SuperQuinielasContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
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
    history: React.PropTypes.object.isRequired
};

const ShowTheLocationWithRouter = withRouter(SuperQuinielasContainer);

export default ShowTheLocationWithRouter;

