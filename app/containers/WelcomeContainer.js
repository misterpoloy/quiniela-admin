import React from 'react';
import { Layout } from 'antd'; // Ant Styles

class Welcome extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <Layout>
                    <h1>Bienvenido</h1>
                </Layout>
            </div>
        );
    }
}

export default Welcome;
