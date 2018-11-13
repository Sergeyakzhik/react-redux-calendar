import React from 'react';
import moment from "moment";
import AddEventField from '../components/AddEventField/AddEventField';
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
    this.props.changeStartDate(date);
    this.props.changeEndDate(date > this.props.endDate ? date : this.props.endDate);
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

  setMinTime = date => {
    let curDate = moment().startOf('day').toString();
    let propsDate = date.startOf('day').toString();

    if(curDate === propsDate)
      return moment().hours(this.getCurrentTime()[0]).minutes(this.getCurrentTime()[1] - 30);
    else
      return moment().hours(23).minutes(60);
  }

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
                showTimeSelect
                minDate={currentTime}
                minTime={this.setMinTime(startDate)}
                maxTime={moment().hours(23).minutes(30)}
                dateFormat="LLL"
                timeCaption="Time"
              />
            </div>
            <div className="form-group col-sm-6 text-center">
              <label htmlFor="dateTimeEnd" className="col-form-label">To</label>
              <DatePicker
                selected={endDate}
                onChange={this.handleEndDateChange}
                minDate={startDate}
                minTime={this.setMinTime(endDate)}
                maxTime={moment().hours(23).minutes(30)}
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
  startDate: store.eventField.event.startDate,
  endDate: store.eventField.event.endDate,
  event: store.eventField.event
});

const mapDispatchToProps = dispatch => ({
  closeAddEventField: isActive => dispatch(closeAddEventField(isActive)),
  changeStartDate: startDate => dispatch(changeStartDate(startDate)),
  changeEndDate: endDate => dispatch(changeEndDate(endDate)),
  addEvent: (isActive, events) => dispatch(addEvent(isActive, events)),
  changeEventName: name => dispatch(changeEventName(name)),
  changeEventDescription: description => dispatch(changeEventDescription(description)),
  changeEventPlace: place => dispatch(changeEventPlace(place))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEventFieldContainer);
