import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import EventDragger from '../components/EventDragger';
import {
  MONTH,
  WEEK,
  DAY,
  DRAG,
  EDIT_EVENT,
} from '../constants/constants';


import { updateEvent, openEditEventField } from '../store/actions/calendar';
import { changeCurAction } from '../store/actions/eventTransformer';

let startX;
let startY;

class EventDraggerContainer extends React.Component {
  handleMouseDown = (e) => {
    const { changeCurAction, table, event } = this.props;

    if (e.button === 0) {
      const elem = e.target;

      changeCurAction(DRAG);

      startX = e.clientX;
      startY = e.clientY;

      elem.style.left = `${-elem.offsetWidth / 2.5}px`;
      elem.style.top = `${-elem.offsetHeight / 2.5}px`;

      if (table !== MONTH) {
        elem.style.top = '-200px';
        elem.style.height = `${event.timeDiff / 15 * 17 + 400}px`;
      }

      e.target.addEventListener('mousemove', this.handleMouseMove);
    }
  }

  handleMouseUp = (e) => {
    e.target.removeEventListener('mousemove', this.handleMouseMove);

    const {
      table, events, targetKey, event, changeCurAction, updateEvent,
    } = this.props;
    const elem = e.target;

    changeCurAction('');

    const curTable = table;
    const diffX = e.clientX - startX;
    const diffY = e.clientY - startY;
    const curEvent = events[targetKey];
    const { startDate, endDate } = curEvent;

    if (diffX === 0 && diffY === 0) {
      this.handleEventClick(curEvent);
    } else {
      elem.style.left = '';
      elem.style.top = '';
      elem.style.width = '';

      let newStartDate;
      let newEndDate;

      if (curTable === MONTH) {
        const cellsDiffX = Math.round(diffX / 157);
        const cellsDiffY = Math.round(diffY / 100) * 7;

        newStartDate = moment().year(startDate.year()).month(startDate.month()).date(startDate.date() + cellsDiffX + cellsDiffY);
        newEndDate = moment().year(endDate.year()).month(endDate.month()).date(endDate.date() + cellsDiffX + cellsDiffY);
      }

      if (curTable === WEEK) {
        const cellsDiffX = Math.round(diffX / 67) * 48;
        const cellsDiffY = Math.round(diffY / 17);

        newStartDate = moment().year(startDate.year()).month(startDate.month()).date(startDate.date())
          .hours(startDate.hours())
          .minutes(startDate.minutes() + 15 * (cellsDiffX + cellsDiffY));
        newEndDate = moment().year(endDate.year()).month(endDate.month()).date(endDate.date())
          .hours(endDate.hours())
          .minutes(endDate.minutes() + 15 * (cellsDiffX + cellsDiffY));

        elem.style.height = `${event.timeDiff / 15 * 17}px`;
      }

      if (curTable === DAY) {
        const cellsDiffY = Math.round(diffY / 17);

        newStartDate = moment().year(startDate.year()).month(startDate.month()).date(startDate.date())
          .hours(startDate.hours())
          .minutes(startDate.minutes() + 15 * cellsDiffY);
        newEndDate = moment().year(endDate.year()).month(endDate.month()).date(endDate.date())
          .hours(endDate.hours())
          .minutes(endDate.minutes() + 15 * cellsDiffY);

        elem.style.height = `${event.timeDiff / 15 * 17}px`;
      }

      updateEvent(targetKey, Object.assign({}, { ...curEvent, startDate: newStartDate, endDate: newEndDate }));
    }
  }

  handleMouseMove = (e) => {
    const { table, event } = this.props;
    const elem = e.target;

    if (table === DAY) {
      elem.style.width = `${635 + 300}px`;
      elem.style.left = `${e.clientX - startX - elem.offsetWidth / 4}px`;
    } else {
      elem.style.width = `${event.length * 175 + 500}px`;
      elem.style.left = `${e.clientX - startX - elem.offsetWidth / 2.5}px`;
    }

    elem.style.top = `${e.clientY - startY - elem.offsetHeight / 2.5}px`;
  }

  handleMouseLeave = (e) => {
    const { changeCurAction, table, event } = this.props;
    const elem = e.target;

    changeCurAction('');

    elem.style.left = '';
    elem.style.top = '';
    elem.style.width = '';

    if (table !== MONTH) elem.style.height = `${event.timeDiff / 15 * 17}px`;

    elem.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleEventClick = (event) => {
    const { openEditEventField } = this.props;

    openEditEventField(true, EDIT_EVENT, { ...event });
  }

  render() {
    const {
      event, targetKey, table,
    } = this.props;
    const style = {
      height: `${event.timeDiff / 15 * 17}px`,
    };

    return (
      <EventDragger
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        targetKey={targetKey}
        eventPartKey={event.eventPartKey || targetKey}
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
  openEditEventField,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventDraggerContainer);
