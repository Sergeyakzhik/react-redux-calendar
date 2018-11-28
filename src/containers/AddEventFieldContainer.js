import React from 'react';
import moment from "moment";
import '../components/AddEventField/AddEventField.css';
import DatePicker from "react-datepicker";
import AddEventForm from '../components/AddEventField/AddEventForm/AddEventForm';

import { connect } from 'react-redux';
import {
  closeAddEventField,
  changeStartDate,
  changeEndDate,
  changeEventName,
  changeEventDescription,
  changeEventPlace
} from '../store/actions/addEventFieldActions';
import { addEvent } from '../store/actions/calendarActions';

import "react-datepicker/dist/react-datepicker.css";

class AddEventFieldContainer extends React.Component {

  getEndDate = () => this.props.startDate ? this.props.startDate : moment();

  handleStartDateChange = date => {
    const { endDate } = this.props;

    this.props.changeStartDate(date);
    this.props.changeEndDate(date > endDate ? date : endDate);
  }

  handleEndDateChange = date => {
    this.props.changeEndDate(date);
  }

  getCurrentTime = () => {
    let date = new Date();

    return [date.getHours(), date.getMinutes()];
  }

  submit = e => {
    console.log("ssss " + e)
    // this.handleEndButtonClick();
    // this.props.addEvent(Object.assign({}, this.props.event));
  }

  handleEndButtonClick = e => this.props.closeAddEventField(false);

  handleInputChange = e => {
    if(e.target.id === 'title')
      this.props.changeEventName(e.target.value);
    if(e.target.id === 'description')
      this.props.changeEventDescription(e.target.value);
    if(e.target.id === 'place')
      this.props.changeEventPlace(e.target.value);
  }

  render() {
    const { startDate, endDate } = this.props;

    return (
      <div className="input-form">
        <h1>New event</h1>
        <div className="close-button" onClick={this.handleEndButtonClick}>
          <i className="fas fa-times"></i>
        </div>
        <AddEventForm
          onSubmit={this.submit}
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={this.handleStartDateChange}
          handleEndDateChange={this.handleEndDateChange}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isActive: store.eventField.isActive,
  event: store.eventField.event,
  startDate: store.eventField.event.startDate,
  endDate: store.eventField.event.endDate,
  length: store.eventField.event.length
});

const mapDispatchToProps = dispatch => ({
  closeAddEventField: isActive => dispatch(closeAddEventField(isActive)),
  changeStartDate: startDate => dispatch(changeStartDate(startDate)),
  changeEndDate: endDate => dispatch(changeEndDate(endDate)),
  addEvent: event => dispatch(addEvent(event)),
  changeEventName: name => dispatch(changeEventName(name)),
  changeEventDescription: description => dispatch(changeEventDescription(description)),
  changeEventPlace: place => dispatch(changeEventPlace(place))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEventFieldContainer);
