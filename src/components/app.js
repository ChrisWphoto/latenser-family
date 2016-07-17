import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from './calendar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//material ui components
import Stay from './stay_dialog';
import Alert from './alert';
import EventDetail  from './event_detail'
import AppBar from './app_bar';



class App extends Component {
  render() {

    return (
      <div>
        <AppBar  auth={this.props.auth} />
       
        <Calendar events={this.props.events} />
        <Stay />
        <Alert
          open={this.props.openAlert}
          title="Oops!" 
          msg="Nice try Marty Mcfly, you gotta choose dates in the future."
        />  
        <EventDetail />
      </div>
      
    );
  }
}

function MapStateToProps(state) {
  return { 
    events: state.calendar.events,
    openAlert: state.calendar.openAlert, 
    auth: state.auth
  };
}

export default connect(MapStateToProps)(App);