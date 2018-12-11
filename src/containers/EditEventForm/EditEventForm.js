import React from 'react';
import moment from 'moment';
import { Field, Fields, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import './EditEventForm.css';

import { connect } from 'react-redux';
import { setInitialDate } from '../../store/actions/editEventField';

let now = moment();
const mins = now.minutes() < 15 ? 0 : now.minutes() < 30 ? 15 : now.minutes() < 45 ? 30 : 45;

now = now.minutes(mins);

const initialDates = {
  startDate: now,
  endDate: moment(now).minutes(now.minutes() + 15),
  name: '',
  place: '',
  description: '',
};

const required = value => (value ? undefined : 'Required');

const eventNameInput = ({
  input, type, id, placeholder, meta: { error, touched },
}) => (
  <div>
    <input {...input} placeholder={placeholder} type={type} id={id} className="form-control" />
  </div>
);

class EditEventForm extends React.Component {
  renderDateFields = (fields) => {
    const { startDate, endDate } = fields;
    const {
      change, setInitialDate, initialDate,
    } = this.props;
    const startDateValue = startDate.input.value;
    const endDateValue = endDate.input.value;

    if (initialDate) {
      change('startDate', initialDate);
      change('endDate', moment(initialDate).minutes(initialDate.minutes() + 15));
      setInitialDate(null);
    }

    const handleStartDateChange = (date) => {
      startDate.input.onChange(date);

      if (date >= endDateValue) endDate.input.onChange(moment(date).minutes(date.minutes() + 15));
    };

    const handleEndDateChange = (date) => {
      endDate.input.onChange(date);

      if (date <= startDateValue) startDate.input.onChange(moment(date).minutes(date.minutes() - 15));
    };

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
    );
  };

  render() {
    const {
      onSubmit, submitting, valid, event, change,
    } = this.props;

    if (event) {
      const {
        startDate, endDate, name, place, description,
      } = event;

      change('startDate', startDate);
      change('endDate', endDate);
      change('name', name);
      change('place', place);
      change('description', description);
      setInitialDate(null);
    }

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
          <Fields names={['startDate', 'endDate']} component={this.renderDateFields} />
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

const mapStateToProps = state => ({
  initialDate: state.eventField.initialDate,
  initialValues: initialDates,
  event: state.eventField.event,
});

const mapDispatchToProps = dispatch => ({
  setInitialDate: initialDate => dispatch(setInitialDate(initialDate)),
});

EditEventForm = reduxForm({
  form: 'editEvent',
})(EditEventForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEventForm);
