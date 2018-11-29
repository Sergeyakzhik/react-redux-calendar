import React from 'react';
import moment from "moment";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import DatePicker from "react-datepicker";

import { connect } from 'react-redux';

let AddEventForm = props => {
  const {
    onSubmit,
    startDate,
    endDate,
    minDate,
    handleStartDateChange,
    handleEndDateChange,
  } = props;

  let currentTime = moment();

  return (
    <form onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-group col-sm-6 text-center">
          <label htmlFor="title">Title</label>
          <Field name="title" component="input" type="text" className="form-control" id="title" placeholder="Title" />
        </div>
        <div className="form-group col-sm-6 text-center">
          <label htmlFor="place">Place</label>
          <Field name="place" component="input" type="text" className="form-control" id="place" placeholder="Place" />
        </div>
        <div className="form-group col-sm-6 text-center">
          <label htmlFor="dateTimeStart" className="col-form-label">From</label>
          <Field
            name="startDate"
            id="startDate"
            component={(props) =>
               (<DatePicker
                 selected={props.input.value || startDate}
                 onChange={props.input.onChange}
                 minDate={currentTime}
                 showTimeSelect
                 timeIntervals={15}
                 dateFormat="LLL"
                 timeCaption="Time"
               />)}
           />
        </div>
        <div className="form-group col-sm-6 text-center">
          <label htmlFor="dateTimeEnd" className="col-form-label">To</label>
          <Field
            name="endDate"
            id="endDate"
            component={(props) =>
               (<DatePicker
                 selected={props.input.value || startDate}
                 onChange={props.input.onChange}
                 minDate={startDate}
                 showTimeSelect
                 timeIntervals={15}
                 dateFormat="LLL"
                 timeCaption="Time"
               />)
             }
           />
        </div>
        <div className="form-group col-sm-12 text-center">
          <label htmlFor="comment">Description</label>
          <Field name="description" component="textarea" type="text" className="form-control" id="description" placeholder="Description" />
        </div>
        <div className="col-sm-12 text-center">
          <button type="submit" className="btn btn-primary add-event-button">Submit</button>
        </div>
      </div>
    </form>
  );
}

AddEventForm = reduxForm({
  form: 'addEvent'
})(AddEventForm);

const selector = formValueSelector('addEvent');

AddEventForm = connect(
  state => selector(state, 'startDate', 'endDate')
)(AddEventForm);

export default AddEventForm;
