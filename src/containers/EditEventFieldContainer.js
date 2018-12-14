import React from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import EditEventForm from './EditEventForm/EditEventForm';
import {
  closeEditEventField, clearEventData, addEvent, updateEvent,
} from '../store/actions/calendar';

import { ADD_EVENT } from '../constants/constants';

import 'react-datepicker/dist/react-datepicker.css';

class EditEventFieldContainer extends React.Component {
  submit = (data) => {
    const {
      addEvent, updateEvent, usage, event, clearEventData,
    } = this.props;

    this.handleEndButtonClick();

    if (usage === ADD_EVENT) addEvent(data);
    else {
      updateEvent(event.targetKey, data);
      clearEventData();
    }
  };

  handleEndButtonClick = () => this.props.closeEditEventField(false);

  render() {
    const { usage } = this.props;

    return (
      <div className="input-form">
        <h1>
          {usage === ADD_EVENT ? 'New' : 'Edit'}
          &nbsp;
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
  usage: state.calendar.usage,
  event: state.calendar.event,
});

const mapDispatchToProps = {
  closeEditEventField,
  addEvent,
  updateEvent,
  clearEventData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEventFieldContainer);
