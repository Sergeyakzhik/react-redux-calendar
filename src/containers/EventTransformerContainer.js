import React from 'react';
import EventResizerContainer from './EventResizerContainer';
import EventDraggerContainer from './EventDraggerContainer';

import { connect } from 'react-redux';
import {
  deleteEvent,
  updateEvent
} from '../store/actions/calendarActions';

class EventTransformerContainer extends React.Component {

  isLastPartOfEvent = () => this.props.event.endDate.toString() === this.props.events[this.props.targetKey].endDate.toString();

  render() {
    return (
      <div onMouseDown={this.props.onMouseDown}>
        { this.props.curAction !== 'drag' && this.isLastPartOfEvent() ?
          <EventResizerContainer
            event={this.props.event}
            targetKey={this.props.targetKey}
          />
          : null
        }
        { this.props.curAction !== 'resize' ?
          <EventDraggerContainer
            event={this.props.event}
            targetKey={this.props.targetKey}
          />
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  curTarget: store.eventInfoField.curTarget,
  events: store.calendar.events,
  curAction: store.eventTransformer.curAction
});

const mapDispatchToProps = dispatch => ({
  deleteEvent: curTarget => dispatch(deleteEvent(curTarget)),
  updateEvent: (targetKey, newEvent) => dispatch(updateEvent(targetKey, newEvent)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventTransformerContainer);
