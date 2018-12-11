import React from 'react';
import { formValueSelector } from 'redux-form';

import { connect } from 'react-redux';
import EditEventForm from './EditEventForm/EditEventForm';
import { closeEditEventField } from '../store/actions/editEventField';
import { addEvent } from '../store/actions/calendar';

import { ADD_EVENT } from '../constants/constants';

import 'react-datepicker/dist/react-datepicker.css';

class EditEventFieldContainer extends React.Component {
  submit = () => {
    const { addEvent } = this.props;

    this.handleEndButtonClick();
    addEvent(this.fillEventData());
  };

  fillEventData = () => {
    const {
      startDate,
      endDate,
      name,
      place,
      description,
    } = this.props.formValues;

    return {
      startDate,
      endDate,
      name,
      place,
      description,
    };
  };

  handleEndButtonClick = e => this.props.closeEditEventField(false);

  render() {
    const { usage, event } = this.props;

    return (
      <div className="input-form">
        <h1>
          {usage === ADD_EVENT ? 'New' : 'Edit'}
          {' '}
          event
        </h1>
        <div className="close-button" onClick={this.handleEndButtonClick}>
          <i className="fas fa-times" />
        </div>
        <EditEventForm
          onSubmit={this.submit}
        />
      </div>
    );
  }
}

const selector = formValueSelector('editEvent');

const mapStateToProps = state => ({
  formValues: selector(
    state,
    'startDate',
    'endDate',
    'name',
    'place',
    'description',
  ),
  usage: state.eventField.usage,
  event: state.eventField.event,
});

const mapDispatchToProps = dispatch => ({
  closeEditEventField: isActive => dispatch(closeEditEventField(isActive)),
  addEvent: event => dispatch(addEvent(event)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEventFieldContainer);
