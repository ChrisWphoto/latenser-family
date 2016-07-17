import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';

//import actions 
import { logoutUser } from '../actions/auth_actions';

const muiTheme = getMuiTheme({});

class HeaderAppBar extends Component {
  
  render(){
    const p = this.props;

    return (       
      <MuiThemeProvider muiTheme={muiTheme}>
      <AppBar
        title='LatenserFamily.us'
        iconElementRight={
          <div style={{marginTop: '5%'}} onClick={p.logoutUser}>
          <FlatButton
            label={p.auth.username ? p.auth.username : "Loggin In..." }
            
          /> 
          </div> 
        }
        style={{marginBottom:'4em'}}
      />
      </MuiThemeProvider>
    );
  }
}

function MapStateToProps(state) {
  return {   
    auth: state.auth
  };
}

export default connect(null, {logoutUser})(HeaderAppBar);