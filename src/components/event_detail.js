import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from 'react-redux';

//actions 
import { deleteEvt } from '../actions/index';
import { toggleEvtDetail } from '../actions/index';


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: "orange",
  },
});


export default class EventDetail extends React.Component {
  state = {
    open: false,
  };

  //link action to alert via app container
  componentWillReceiveProps(nextProps) {
    console.log('Event Detail', nextProps)
    this.setState({open: nextProps.open})
  }

  removeEvent() {
    this.props.deleteEvt(this.props.evt);
    this.handleClose();
  }

  handleClose = () => {
    this.props.toggleEvtDetail();
  };

  render() {
    const p = this.props;
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Delete Event"
        primary={true}
        onTouchTap={this.removeEvent.bind(this)}
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
        <h1> {p.evt.title} </h1>
        </Dialog>
      </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    evt: state.calendar.currentEvent,
    open: state.calendar.openEvtDetail
  }
}

export default connect( mapStateToProps, {  deleteEvt, toggleEvtDetail } )(EventDetail);