import React from 'react';
import AddEventForm from './AddEventForm/AddEventForm';
import { formValueSelector } from 'redux-form';

import { connect } from 'react-redux';
import { closeAddEventField } from '../store/actions/addEventFieldActions';
import { addEvent } from '../store/actions/calendarActions';

import "react-datepicker/dist/react-datepicker.css";

class AddEventFieldContainer extends React.Component {

  submit = e => {
    this.handleEndButtonClick();
    this.props.addEvent(this.fillEventData());
  }

  fillEventData = () => {
    const {
      startDate,
      endDate,
      name,
      place,
      description
    } = this.props;

    return {
      startDate,
      endDate,
      name,
      place,
      description
    }
  };

  handleEndButtonClick = e => this.props.closeAddEventField(false);

  render() {
    return (
      <div className="input-form">
        <h1>New event</h1>
        <div className="close-button" onClick={this.handleEndButtonClick}>
          <i className="fas fa-times"></i>
        </div>
        <AddEventForm
          onSubmit={this.submit}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isActive: store.eventField.isActive
});

const mapDispatchToProps = dispatch => ({
  closeAddEventField: isActive => dispatch(closeAddEventField(isActive)),
  addEvent: event => dispatch(addEvent(event)),
});

const selector = formValueSelector('addEvent');

AddEventFieldContainer = connect(
  state => selector(
    state,
    'startDate',
    'endDate',
    'name',
    'place',
    'description'
  )
)(AddEventFieldContainer)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEventFieldContainer);
