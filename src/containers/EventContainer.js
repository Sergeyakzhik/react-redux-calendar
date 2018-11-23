import React from 'react';
import Event from '../components/Event/Event';
import EventInfoField from '../components/EventInfoField/EventInfoField';

import { connect } from 'react-redux';
import { toggleEventInfoField } from '../store/actions/eventInfoFieldActions';
import { deleteEvent } from '../store/actions/addEventFieldActions';

class EventContainer extends React.Component {

  handleMouseEnter = e => {
    this.props.toggleEventInfoField(e.target.attributes.targetKey.value);
  }

  handleMouseLeave = e => {
    this.props.toggleEventInfoField('');
  }

  render() {
    let isActive = this.props.curTarget === this.props.targetKey;
    return (
      <>
        <Event
          style={this.props.style}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onDeleteButtonClick={this.handleDeleteButtonClick}
          event={this.props.event}
          targetKey={this.props.targetKey}
          isActive={isActive}
        />
        {isActive ? <EventInfoField event={this.props.event} /> : null}
      </>
    );
  }
}

const mapStateToProps = store => ({
  curTarget: store.eventInfoField.curTarget
});

const mapDispatchToProps = dispatch => ({
  toggleEventInfoField: curTarget => dispatch(toggleEventInfoField(curTarget)),
  deleteEvent: curTarget => dispatch(deleteEvent(curTarget))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventContainer);
