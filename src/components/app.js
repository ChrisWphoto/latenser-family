import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from './calendar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//material ui components
import Stay from './stay_dialog';
import Alert from './alert';

class App extends Component {
  render() {

    return (
      <div>
        <h1> LatenserFamily.us </h1>
        <Calendar events={this.props.events} />
        <Stay />
        <Alert
          open={this.props.openAlert}
          title="Oops!" 
          msg="Nice try Marty Mcfly, you gotta choose dates in the future."
        />  
      </div>
      
    );
  }
}

function MapStateToProps(state) {
  return { 
    events: state.calendar.events,
    openAlert: state.calendar.openAlert 
  };
}

export default connect(MapStateToProps, null)(App);