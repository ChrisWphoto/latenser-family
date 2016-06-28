
import React, { Component } from 'react';
import moment from 'moment';
import $ from 'jquery';
import jQueryUI from 'jquery-ui';
import fullCalendar from 'fullcalendar';
import { connect } from 'react-redux';

//actions
import { toggleAddStay } from '../actions/index';
import { toggleAlert } from '../actions/index';


class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      clicked: false,
      datesClicked: [],
      domElementsClicked: []
     };
  }

  removeHighlights() {
    this.state.domElementsClicked.forEach( (domEl) =>{
      $(domEl).css('background-color', 'white');
      this.state.domElementsClicked = [];  
    });
  }
  
  componentDidMount() {
    console.log('CDM', this.props.events);
    setupCalendar($('.jquery-calendar'), this.props.events, this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('cwrp', nextProps)
    //refresh events
    if (this.props.addStayOpen && !nextProps.addStayOpen && 
        this.state.domElementsClicked.length) {
      this.removeHighlights();
      $('.jquery-calendar').fullCalendar( 'removeEvents' )
      $('.jquery-calendar').fullCalendar( 'addEventSource', nextProps.events )
    } 
      
  }

  render() {
    return (
      <div className="jquery-calendar">
      </div>
    );
  }
};

function setupCalendar(calendar, events, that) {

  //check dates are not in past
  function validDates(dateArr){
    for (let i = 0; i < dateArr.length; i++){
      if ( dateArr[i].isBefore(moment()) ) {
        that.props.toggleAlert();
        that.removeHighlights();
        that.state.datesClicked = [];
        return false;
      }   
    }
    return true
    
  }
  
  
  calendar.fullCalendar({
    editable: true,
    events: events,
    firstDay: 1,
    droppable: true,

    eventClick: function(calEvent, jsEvent, view) {
        console.log('Event: ', calEvent);
        console.log('View: ' + view.name);
        $(this).css('border-color', 'red');
    },
    
    dayClick: function(date, jsEvent, view) {
      let state = that.state;
      console.log(date);
      console.log(date.format());
      $(this).css('background-color', 'lightblue');
      state.datesClicked.push(date) 
      state.domElementsClicked.push(this) 
      if ( state.clicked && validDates(state.datesClicked) ){
        that.props.toggleAddStay(state.datesClicked);
        state.datesClicked = [];
        
      }

      state.clicked = !that.state.clicked 
    }

    
  });
}

function mapStateToProps(state){
  
  return { addStayOpen: state.calendar.addStayOpen };
}

export default connect(mapStateToProps, { toggleAddStay, toggleAlert })(Calendar);
