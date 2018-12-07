import React from 'react';
import moment from "moment";
import { Field, Fields, reduxForm } from 'redux-form';
import DatePicker from "react-datepicker";
import './AddEventForm.css';

import { connect } from 'react-redux';
import { setInitialDate } from '../../store/actions/addEventField';

let now = moment();
let mins = now.minutes() < 15 ? 0 : now.minutes() < 30 ? 15 : now.minutes() < 45 ? 30 : 45;

now = now.minutes(mins);

const initialDates = {
  startDate: now,
  endDate: moment(now).minutes(now.minutes() + 15)
}

const required = value => value ? undefined : 'Required';

const eventNameInput = ({ input, type, id, placeholder, meta: { error, touched } }) => (
  <div>
    <input {...input} placeholder={placeholder} type={type} id={id} className="form-control"/>
  </div>
);

class AddEventForm extends React.Component {

  renderDateFields = fields => {
    const { startDate, endDate } = fields;
    const startDateValue = startDate.input.value;
    const endDateValue = endDate.input.value;
    const initialDate = this.props.initialDate;

    if(initialDate) {
      this.props.change('startDate', initialDate);
      this.props.change('endDate', moment(initialDate).minutes(initialDate.minutes() + 15));
      this.props.setInitialDate(null);
    }

    let handleStartDateChange = date => {
      startDate.input.onChange(date);

      if(date >= endDateValue)
        endDate.input.onChange(moment(date).minutes(date.minutes() + 15));
    }

    let handleEndDateChange = date => {
      endDate.input.onChange(date);

      if(date <= startDateValue)
        startDate.input.onChange(moment(date).minutes(date.minutes() - 15));
    }

    return (
      <>
        <div className="form-group col-sm-6 text-center">
          <label htmlFor="dateTimeStart" className="col-form-label">From</label>
          <DatePicker
            selected={startDateValue}
            onChange={handleStartDateChange}
            showTimeSelect
            timeIntervals={15}
            dateFormat="LLL"
            timeCaption="Time"
          />
        </div>
        <div className="form-group col-sm-6 text-center">
          <label htmlFor="dateTimeEnd" className="col-form-label">To</label>
          <DatePicker
            selected={endDateValue}
            onChange={handleEndDateChange}
            minDate={startDateValue}
            showTimeSelect
            timeIntervals={15}
            dateFormat="LLL"
            timeCaption="Time"
          />
        </div>
      </>
    )
  };

  render() {
    const { onSubmit, submitting, valid } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-group col-sm-6 text-center">
            <label htmlFor="name">Title</label>
            <Field name="name" component={eventNameInput} type="text" validate={required} id="name" placeholder="Title*" />
          </div>
          <div className="form-group col-sm-6 text-center">
            <label htmlFor="place">Place</label>
            <Field name="place" component="input" type="text" className="form-control" id="place" placeholder="Place" />
          </div>
          <Fields names={[ 'startDate', 'endDate' ]} component={this.renderDateFields} />
          <div className="form-group col-sm-12 text-center">
            <label htmlFor="comment">Description</label>
            <Field name="description" component="textarea" type="text" rows="5" className="form-control" id="description" placeholder="Description" />
          </div>
          <div className="col-sm-12 text-center">
            <button type="submit" disabled={!valid || submitting} className="btn btn-primary add-event-button">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = store => ({
  initialDate: store.eventField.event.initialDate
});

const mapDispatchToProps = dispatch => ({
  setInitialDate: initialDate => dispatch(setInitialDate(initialDate))
});

AddEventForm = reduxForm({
  form: 'addEvent'
})(AddEventForm);

AddEventForm = connect(
  state => ({
    initialValues: initialDates
  })
)(AddEventForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEventForm);
