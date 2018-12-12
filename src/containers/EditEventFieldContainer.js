import React from 'react';
import { formValueSelector } from 'redux-form';

import { connect } from 'react-redux';
import EditEventForm from './EditEventForm/EditEventForm';
import { closeEditEventField, clearEventData } from '../store/actions/editEventField';
import { addEvent, updateEvent } from '../store/actions/calendar';

import { ADD_EVENT } from '../constants/constants';

import 'react-datepicker/dist/react-datepicker.css';

class EditEventFieldContainer extends React.Component {
  submit = () => {
    const {
      addEvent, updateEvent, usage, event, clearEventData,
    } = this.props;
    const newEvent = this.fillEventData();

    this.handleEndButtonClick();

    if (usage === ADD_EVENT) addEvent(newEvent);
    else {
      updateEvent(event.targetKey, newEvent);
      clearEventData();
    }
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
    const { usage } = this.props;

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
  updateEvent: (targetKey, event) => dispatch(updateEvent(targetKey, event)),
  clearEventData: () => dispatch(clearEventData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEventFieldContainer);
