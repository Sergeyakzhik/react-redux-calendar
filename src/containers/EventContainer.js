import React from 'react';
import Event from '../components/Event/Event';
import EventInfoField from '../components/EventInfoField/EventInfoField';

import { connect } from 'react-redux';
import { toggleEventInfoField } from '../store/actions/eventInfoFieldActions';

class EventContainer extends React.Component {

  handleMouseEnter = e => {
    this.props.toggleEventInfoField(true, e.target);
  }

  handleMouseLeave = e => {
    this.props.toggleEventInfoField(false, '');
  }

  render() {
    return (
      <>
        <Event
          style={this.props.style}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          name={this.props.name}
          event={this.props.event}
          isActive={this.props.isActive}
          isCurrentTarget={this.props.target === this.props.event.startDate.toString()}
        />
      </>
    );
  }
}

const mapStateToProps = store => ({
  isActive: store.eventInfoField.isActive,
  target: store.eventInfoField.target
});

const mapDispatchToProps = dispatch => ({
  toggleEventInfoField: (isActive, target) => dispatch(toggleEventInfoField(isActive, target)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventContainer);
