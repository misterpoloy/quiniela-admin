import React from 'react';
import AppBar from 'material-ui/AppBar';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeMainColor} from '../actions/theme';

const styles = {
    title: {
        cursor: 'pointer',
    },
};

class ComponentHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const id = localStorage.getItem('PrensaUserIdAdmin');
        return (
            <div>
                { id &&
                <AppBar
                    style={{backgroundColor: this.props.theme.primary1Color, position: 'fixed'}}
                    title={<span style={styles.title}>Quiniela 2018</span>} />
                }
            </div>
        );
    }
}

ComponentHeader.propTypes = {
    history: React.PropTypes.object.isRequired,
    theme: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return ({
        theme: state.theme
    });
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            changeMainColor
        }, dispatch)
    };
}

const ShowTheLocationWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(ComponentHeader));
export default ShowTheLocationWithRouter;


