
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addStay } from '../actions/index';
import { toggleAddStay } from '../actions/index';
import moment from 'moment';

//material UI
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { deepOrange500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import Slider from 'material-ui/Slider';


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 10,
  },
};

const customContentStyle = {
  width: '100%',
  maxWidth: '900px',
  textAlign: 'center'
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class StayDialog extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    
    this.state = {
      open: this.props.open,
      slider: 1,
      costPerDay: 10
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("stay dialog:",nextProps);
    
    this.setState({
      open: nextProps.open,
    });
  }

   handleSlider(event, value) {
    this.setState({slider: value});
  }

  checkEndDate(moments, staylength) {
    //add day to end date for correct display on calendar
    if (staylength > 1)
      return moments[1].add(1, 'days');
    else 
      return moments[1];
  }
  
  handleSubmit() {
    // console.log(this.props);
    this.props.addStay({
      title: `Barbara + ${this.state.slider} ppl`,
      start: this.props.datesClicked[0],
      end:  this.checkEndDate(this.props.datesClicked, this.props.stayLength)
    });
    this.handleRequestClose();
  }

  handleRequestClose() {
    
    this.props.toggleAddStay();
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  render() {
    const standardActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />,
      <FlatButton
        label="Book My Stay!"
        primary={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />
      
    ];

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <Dialog
            open={this.state.open}
            title="Lake Trip"
            actions={standardActions}
            onRequestClose={this.handleRequestClose}
            contentStyle={customContentStyle}
          >
          <h4>Dates: {this.props.formatedDates[0]} through {this.props.formatedDates[1]}</h4>
          <br/>
          <Slider
            min={0}
            max={13}
            step={1}
            defaultValue={1}
            value={this.state.slider}
            onChange={this.handleSlider.bind(this)}
            description= "Use the Slider to Add Guests"
          />
          
          <h3 style={{marginTop:'-20px'}} > 
           {this.state.slider} guests x {this.props.stayLength} days = 
           ${this.state.slider * this.state.costPerDay * this.props.stayLength}  
          </h3> 
          
          
          
            
          </Dialog>

          
        </div>
      </MuiThemeProvider>
    );
  }
}

//return stay length in days or default to 1 day
function calcNumOfDays(dateArr) {
  if (dateArr && dateArr.length)
    return  Math.abs( dateArr[0].diff( dateArr[1], 'days' )) || 1;
  else
    return 1;
}

function formatDates(dateArr){
  if (dateArr && dateArr.length){
    //in case they selected the dates backwars
    if (dateArr[1].diff( dateArr[0], 'days' ) < 0){
      return [
        dateArr[1].format('ddd MMMM Do'),
        dateArr[0].format('ddd MMMM Do')
      ]  
    } else {
      return [
        dateArr[0].format('ddd MMMM Do'),
        dateArr[1].format('ddd MMMM Do')
      ]
    }
    
  }else {
    return []
  }
}

function mapStateToProps(state) {
  return { 
    datesClicked:   state.calendar.datesClicked,
    open:           state.calendar.addStayOpen,
    stayLength:     calcNumOfDays( state.calendar.datesClicked ),
    formatedDates:  formatDates( state.calendar.datesClicked )


  }
}

export default connect( mapStateToProps, { addStay, toggleAddStay } )(StayDialog);