import React from 'react';
import './AddEventField.css';
import DatePicker from "react-datepicker";

let AddEventField = props => (
  <div className="input-form">
    <h1>New event</h1>
    <div className="close-button" onClick={props.onEndButtonClick}>
      <i className="fas fa-times"></i>
    </div>
    <form>
      <div className="form-row">
        <div className="form-group col-sm-6 text-center">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" placeholder="Title" required/>
        </div>
        <div className="form-group col-sm-6 text-center">
          <label htmlFor="place">Place</label>
          <input type="text" className="form-control" id="place" placeholder="Place"/>
        </div>
        <div className="form-group col-sm-6 text-center">
          <label htmlFor="dateTimeStart" className="col-form-label">From</label>
          <DatePicker
            selected={props.startDate}
            onChange={props.onStartDateChange}
            minDate={props.minDate}
            minTime={props.minStartDateTime}
            maxTime={props.maxTime}
            showTimeSelect
            dateFormat="LLL"
            timeCaption="Time"
          />
        </div>
        <div className="form-group col-sm-6 text-center">
          <label htmlFor="dateTimeEnd" className="col-form-label">To</label>
          <DatePicker
            selected={props.endDate}
            onChange={props.onEndDateChange}
            minDate={props.startDate}
            minTime={props.minEndDateTime}
            maxTime={props.maxTime}
            showTimeSelect
            dateFormat="LLL"
            timeCaption="Time"
          />
        </div>
        <div className="form-group col-sm-12 text-center">
          <label htmlFor="comment">Description</label>
          <textarea className="form-control" rows="5" id="comment"></textarea>
        </div>
        <div className="col-sm-12 text-center">
          <button type="submit" className="btn btn-primary add-event-button">Submit</button>
        </div>
      </div>
    </form>
  </div>
)

export default AddEventField;
