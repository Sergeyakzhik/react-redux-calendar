import React from 'react';
import Event from '../components/Event/Event';
import EventTransformerContainer from './EventTransformerContainer';
import EventInfoField from '../components/EventInfoField/EventInfoField';

import { connect } from 'react-redux';
import { toggleEventInfoField } from '../store/actions/eventInfoFieldActions';
import { deleteEvent } from '../store/actions/calendarActions';

class EventContainer extends React.Component {

  handleMouseEnter = e => {
    this.props.toggleEventInfoField(e.target.attributes.targetKey.value || '');
  }

  handleMouseLeave = e => {
    this.props.toggleEventInfoField('');
  }

  handleMouseDown = e => {
    this.props.toggleEventInfoField('');
  }

  handleDeleteButtonClick = e => {
    e.stopPropagation();

    this.props.deleteEvent(e.target.attributes.targetKey.value)
  }

  render() {
    let isActive = this.props.curTarget === this.props.targetKey;

    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Event
          style={this.props.style}
          onDeleteButtonClick={this.handleDeleteButtonClick}
          event={this.props.event}
          targetKey={this.props.targetKey}
          isActive={isActive}
        />
        <EventTransformerContainer
          onMouseDown={this.handleMouseDown}
          event={this.props.event}
          targetKey={this.props.targetKey}
        />
        {isActive ? <EventInfoField event={this.props.event} /> : null}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  curTarget: store.eventInfoField.curTarget,
  events: store.calendar.events
});

const mapDispatchToProps = dispatch => ({
  toggleEventInfoField: curTarget => dispatch(toggleEventInfoField(curTarget)),
  deleteEvent: curTarget => dispatch(deleteEvent(curTarget)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventContainer);
