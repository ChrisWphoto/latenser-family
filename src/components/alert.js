import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from 'react-redux';

//actions 
import { toggleAlert } from '../actions/index';


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: "orange",
  },
});


export default class Alert extends React.Component {
  state = {
    open: false,
  };

  //link action to alert via app container
  componentWillReceiveProps(nextProps) {
    console.log('alert:', nextProps)
    this.setState({open: nextProps.open})
  }
  

  

  handleClose = () => {
    this.props.toggleAlert();
  };

  render() {
    const actions = [
    
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <h1> {this.props.title} </h1>
        <h2> {this.props.msg} </h2>
        </Dialog>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default connect( null, {  toggleAlert } )(Alert);