
import React, {Component} from 'react';
import moment from 'moment';

//actions
import { connect } from 'react-redux';
import { addStay } from '../actions/index';
import { toggleAddStay } from '../actions/index';

//material UI
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';

// material theme
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  sliderMargin: {
    marginTop: 48
  }
};

const customContentStyle = {
  width: '100%',
  maxWidth: '900px',
  textAlign: 'center'
};

const muiTheme = getMuiTheme({});

class StayDialog extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    
    
    this.state = {
      open: this.props.open,
      slider: 1,
      costPerDay: 10,
      eventTitle: this.props.username || 'Lake Trip'
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("stay dialog:",nextProps);
    
    this.setState({
      open: nextProps.open,
    });
  }

   handleSlider(event, value) {
     console.log('slider', value)
    this.setState({slider: value});
  }

  checkEndDate(moments, staylength) {
    //add day to end date for correct display on calendar
    if (staylength > 0)
      return moments[1].add(1, 'days');
    else 
      return moments[1];
  }

  createTitle() {
    const p = this.props;
    const s = this.state;
    return `(${s.slider}) ${s.eventTitle}`
  }
  
  handleSubmit() {
    // console.log(this.props);
    this.props.addStay({
      title: this.createTitle(),
      start: this.props.datesClicked[0],
      end:  this.checkEndDate(this.props.datesClicked, this.props.stayLength),
      id: Date.now()
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


  onChangeEventTitle(methods, txtVal) {
    this.setState({eventTitle: txtVal});
    console.log(this.state);
  }

  render() {
    const p = this.props;
    const s = this.state;
    let formatedDateString = `${p.formatedDates[0]} to ${p.formatedDates[1]}`
    const standardActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />,
      <FlatButton
        label="Add to Calendar"
        primary={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />
    ];

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <Dialog
            open={this.state.open}
            title={formatedDateString}
            actions={standardActions}
            onRequestClose={this.handleRequestClose}
            contentStyle={customContentStyle}
          >
          <div className="grid">
            <div className="cell">
              <h3> Details </h3>
              <TextField
                hintText="Enter a title for your stay"
                hintStyle={{color:'rgb(0, 188, 212)'}}
                onChange={this.onChangeEventTitle.bind(this)}
              />
          </div>
            <div className="cell">
              <h3> Guests </h3>
              <Slider
                  style={styles.sliderMargin}
                  min={0}
                  max={13}
                  step={1}
                  defaultValue={1}
                  value={s.slider}
                  onChange={this.handleSlider.bind(this)}
                />
            <h3 style={{marginTop:'-20px'}} > 
              {s.slider} guests x {p.stayLength} days = 
              ${s.slider * s.costPerDay * p.stayLength}  
            </h3>
            </div>
          </div>
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
        dateArr[1].format('dddd MMMM Do'),
        dateArr[0].format('dddd MMMM Do')
      ]  
    } else {
      return [
        dateArr[0].format('dddd MMMM Do'),
        dateArr[1].format('dddd MMMM Do')
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
    formatedDates:  formatDates( state.calendar.datesClicked ),
    username:       state.auth.username
  }
}

export default connect( mapStateToProps, { addStay, toggleAddStay } )(StayDialog);