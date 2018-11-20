import React from 'react';
import moment from "moment";
import '../components/AddEventField/AddEventField.css';
import DatePicker from "react-datepicker";

import { connect } from 'react-redux';
import {
  closeAddEventField,
  changeStartDate,
  changeEndDate,
  addEvent,
  changeEventName,
  changeEventDescription,
  changeEventPlace
} from '../store/actions/addEventFieldActions';

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

  handleSubmitButtonClick = e => {
    this.props.addEvent(false, Object.assign({}, this.props.event));
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
    const currentTime = moment();
    return (
      <div className="input-form">
        <h1>New event</h1>
        <div className="close-button" onClick={this.handleEndButtonClick}>
          <i className="fas fa-times"></i>
        </div>
        <form>
          <div className="form-row">
            <div className="form-group col-sm-6 text-center">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" id="title" placeholder="Title" onChange={this.handleInputChange} required/>
            </div>
            <div className="form-group col-sm-6 text-center">
              <label htmlFor="place">Place</label>
              <input type="text" className="form-control" id="place" placeholder="Place"/>
            </div>
            <div className="form-group col-sm-6 text-center">
              <label htmlFor="dateTimeStart" className="col-form-label">From</label>
              <DatePicker
                selected={startDate}
                onChange={this.handleStartDateChange}
                timeIntervals={15}
                showTimeSelect
                minDate={currentTime}
                dateFormat="LLL"
                timeCaption="Time"
              />
            </div>
            <div className="form-group col-sm-6 text-center">
              <label htmlFor="dateTimeEnd" className="col-form-label">To</label>
              <DatePicker
                selected={endDate}
                onChange={this.handleEndDateChange}
                timeIntervals={15}
                minDate={startDate}
                showTimeSelect
                dateFormat="LLL"
                timeCaption="Time"
              />
            </div>
            <div className="form-group col-sm-12 text-center">
              <label htmlFor="description">Description</label>
              <textarea className="form-control" rows="5" id="description" onChange={this.handleInputChange}></textarea>
            </div>
            <div className="col-sm-12 text-center">
              <button onClick={this.handleSubmitButtonClick} type="submit" className="btn btn-primary add-event-button">Submit</button>
            </div>
          </div>
        </form>
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
  addEvent: (isActive, event) => dispatch(addEvent(isActive, event)),
  changeEventName: name => dispatch(changeEventName(name)),
  changeEventDescription: description => dispatch(changeEventDescription(description)),
  changeEventPlace: place => dispatch(changeEventPlace(place))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEventFieldContainer);
