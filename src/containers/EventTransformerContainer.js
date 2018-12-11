import React from 'react';
import { connect } from 'react-redux';
import EventResizerContainer from './EventResizerContainer';
import EventDraggerContainer from './EventDraggerContainer';
import {
  DRAG,
  RESIZE,
} from '../constants/constants';

import {
  deleteEvent,
  updateEvent,
} from '../store/actions/calendar';

class EventTransformerContainer extends React.Component {
  isLastPartOfEvent = () => {
    const { events, targetKey, event } = this.props;
    const { endDate } = event;

    return endDate.toString() === events[targetKey].endDate.toString();
  }

  render() {
    const {
      curAction, event, targetKey, onMouseDown, eventPartKey,
    } = this.props;

    return (
      <div onMouseDown={onMouseDown}>
        { curAction !== DRAG && this.isLastPartOfEvent()
          ? (
            <EventResizerContainer
              event={event}
              targetKey={targetKey}
            />
          )
          : null
        }
        { curAction !== RESIZE
          ? (
            <EventDraggerContainer
              event={event}
              targetKey={targetKey}
            />
          )
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.calendar.events,
  curAction: state.eventTransformer.curAction,
});

const mapDispatchToProps = dispatch => ({
  deleteEvent: curTarget => dispatch(deleteEvent(curTarget)),
  updateEvent: (targetKey, newEvent) => dispatch(updateEvent(targetKey, newEvent)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventTransformerContainer);
