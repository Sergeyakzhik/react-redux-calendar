import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import EventResizer from '../components/EventResizer';
import {
  MONTH,
  WEEK,
  DAY,
  RESIZE,
} from '../constants/constants';


import { updateEvent } from '../store/actions/calendar';
import { changeCurAction } from '../store/actions/eventTransformer';

let startX; let
  startY;

class EventResizerContainer extends React.Component {
  handleMouseDown = (e) => {
    const { changeCurAction } = this.props;

    if (e.button === 0) {
      const elem = e.target;

      changeCurAction(RESIZE);

      startX = e.clientX;
      startY = e.clientY;

      elem.style.right = `${-elem.offsetWidth / 2.5}px`;
      elem.style.top = `${-elem.offsetHeight / 2.5}px`;

      e.target.addEventListener('mousemove', this.handleMouseMove);
    }
  }

  handleMouseUp = (e) => {
    const {
      changeCurAction, table, events, targetKey, updateEvent,
    } = this.props;
    const elem = e.target;

    changeCurAction('');

    const curTable = table;
    const diffX = e.clientX - startX;
    const diffY = e.clientY - startY;

    const curEvent = events[targetKey];
    const { endDate } = curEvent;

    elem.style.right = '';
    elem.style.top = '';

    let newEndDate;

    if (curTable === MONTH) {
      const cellsDiffX = Math.round(diffX / 157);
      const cellsDiffY = Math.round(diffY / 100) * 7;

      if (curEvent.length + cellsDiffX + cellsDiffY > 0) {
        newEndDate = moment().year(endDate.year()).month(endDate.month()).date(endDate.date() + cellsDiffX + cellsDiffY);
        updateEvent(targetKey, Object.assign({}, { ...curEvent, endDate: newEndDate }));
      }
    }

    if (curTable === WEEK) {
      const cellsDiffX = Math.round(diffX / 67) * 48;
      const cellsDiffY = Math.round(diffY / 17);

      if (curEvent.timeDiff / 15 + cellsDiffX + cellsDiffY > 0) {
        newEndDate = moment().year(endDate.year()).month(endDate.month()).date(endDate.date())
          .hours(endDate.hours())
          .minutes(endDate.minutes() + 15 * (cellsDiffX + cellsDiffY));
        updateEvent(targetKey, Object.assign({}, { ...curEvent, endDate: newEndDate }));
      }
    }

    if (curTable === DAY) {
      const cellsDiffY = Math.round(diffY / 17);

      if (curEvent.timeDiff / 15 + cellsDiffY > 0) {
        newEndDate = moment().year(endDate.year()).month(endDate.month()).date(endDate.date())
          .hours(endDate.hours())
          .minutes(endDate.minutes() + 15 * cellsDiffY);
        updateEvent(targetKey, Object.assign({}, { ...curEvent, endDate: newEndDate }));
      }
    }

    e.target.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = (e) => {
    const elem = e.target;

    elem.style.right = `${-e.clientX + startX - elem.offsetWidth / 2.5}px`;
    elem.style.top = `${e.clientY - startY - elem.offsetHeight / 2.5}px`;
  }

  handleMouseLeave = (e) => {
    const { changeCurAction } = this.props;
    const elem = e.target;

    changeCurAction('');

    elem.style.right = '';
    elem.style.top = '';

    elem.removeEventListener('mousemove', this.handleMouseMove);
  }

  render() {
    const {
      event, targetKey, table,
    } = this.props;
    const style = {
      marginTop: `${event.timeDiff / 15 * 17 - 10}px`,
    };

    return (
      <EventResizer
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        targetKey={targetKey}
        style={table !== MONTH ? style : null}
      />
    );
  }
}

const mapStateToProps = state => ({
  table: state.calendar.table,
  events: state.calendar.events,
});

const mapDispatchToProps = {
  updateEvent,
  changeCurAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventResizerContainer);
