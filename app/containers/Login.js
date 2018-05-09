import React from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { login } from './../actions/authAdmin';

// Design
import { Form, Icon, Input, Button, Row, Col } from 'antd';
const FormItem = Form.Item;

const esRequerido = 'Esto es obligatorio';

class Welcome extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        const token = localStorage.getItem('PrensaTokenAdmin');
        const id = localStorage.getItem('PrensaUserIdAdmin');

        if (token && id) {
            this.props.history.push('/add');
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated === true) {
            this.props.history.push('/add');
        }
    }
    handleSubmit = (e) => {
        const { loginAction } = this.props.actions;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                loginAction(values);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const { isError, isAuthenticated } = this.props;
        console.log('isAuthenticated: ' + isAuthenticated);
        return (
            <div style={{ background: '#FFF' }}>
                <Row>
                    <Col span={8} offset={8}>
                        <Row>
                            <Col span={12} offset={8}>
                                <h1 style={{ marginTop: 200, fontWeight: 300 }} >Iniciar sesión</h1>
                            </Col>
                        </Row>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            {isError &&
                                <div style={{ color: '#f5222d'}}>Credenciales incorrectas</div>
                            }
                            <FormItem>
                                {getFieldDecorator('CORREO', {
                                    rules: [{ required: true, message: esRequerido }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Ingresa tu correo" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('PASSWORD', {
                                    rules: [{ required: true, message: esRequerido }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Ingresa la contraseña" />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Iniciar sesión
                                </Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}
Welcome.propTypes = {
    form: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    isError: React.PropTypes.bool.isRequired,
    history: React.PropTypes.object.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired,
    location: React.PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return({
        isAuthenticated: state.authAdmin.isAuthenticated,
        isError: state.authAdmin.isError,
    });
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loginAction: login
        }, dispatch)
    };
}
const ShowTheLocationWithRouter = withRouter(Welcome);

const WithRouterWithForm = Form.create()(ShowTheLocationWithRouter);

export default connect(mapStateToProps, mapDispatchToProps)(WithRouterWithForm);
