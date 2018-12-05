import React from 'react';
import EventDragger from '../components/EventDragger/EventDragger';
import moment from "moment";

import { connect } from 'react-redux';
import { updateEvent } from '../store/actions/calendarActions';
import { changeCurAction } from '../store/actions/eventTransformerActions';

let startX, startY;

class EventDraggerContainer extends React.Component {

  handleMouseDown = e => {

    if(e.button === 0) {
      const elem = e.target;

      this.props.changeCurAction('drag');

      startX = e.clientX;
      startY = e.clientY;

      elem.style.left = -elem.offsetWidth / 2.5 + 'px';
      elem.style.top = -elem.offsetHeight / 2.5 + 'px';

      if(this.props.table !== 'Month') {
        elem.style.top = '-200px';
        elem.style.height = this.props.event.timeDiff / 15 * 17 + 400 + 'px';
      }

      e.target.addEventListener('mousemove', this.handleMouseMove);
    }
  }

  handleMouseUp = e => {
    const elem = e.target;

    this.props.changeCurAction('');

    let curTable = this.props.table;
    let diffX =  e.clientX - startX;
    let diffY =  e.clientY - startY;

    let curEvent = this.props.events[this.props.targetKey];
    let startDate = curEvent.startDate;
    let endDate = curEvent.endDate;

    elem.style.left = '';
    elem.style.top = '';
    elem.style.width = '';

    let newStartDate, newEndDate;

    if(curTable === 'Month') {
      let cellsDiffX = Math.round(diffX / 157);
      let cellsDiffY = Math.round(diffY / 100) * 7;

      newStartDate = moment().year(startDate.year()).month(startDate.month()).date(startDate.date() + cellsDiffX + cellsDiffY);
      newEndDate = moment().year(endDate.year()).month(endDate.month()).date(endDate.date() + cellsDiffX + cellsDiffY);
    }

    if(curTable === 'Week') {
      let cellsDiffX = Math.round(diffX / 67) * 48;
      let cellsDiffY = Math.round(diffY / 17);

      newStartDate = moment().year(startDate.year()).month(startDate.month()).date(startDate.date()).hours(startDate.hours()).minutes(startDate.minutes() + 15 * (cellsDiffX + cellsDiffY));
      newEndDate = moment().year(endDate.year()).month(endDate.month()).date(endDate.date()).hours(endDate.hours()).minutes(endDate.minutes() + 15 * (cellsDiffX + cellsDiffY));

      elem.style.height = this.props.event.timeDiff / 15 * 17 + 'px';
    }

    if(curTable === 'Day') {
      let cellsDiffY = Math.round(diffY / 17);

      newStartDate = moment().year(startDate.year()).month(startDate.month()).date(startDate.date()).hours(startDate.hours()).minutes(startDate.minutes() + 15 * cellsDiffY);
      newEndDate = moment().year(endDate.year()).month(endDate.month()).date(endDate.date()).hours(endDate.hours()).minutes(endDate.minutes() + 15 * cellsDiffY);

      elem.style.height = this.props.event.timeDiff / 15 * 17 + 'px';
    }

    this.props.updateEvent(this.props.targetKey, Object.assign({}, { ...curEvent, startDate: newStartDate, endDate: newEndDate }));
    e.target.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = e => {
    let elem = e.target;

    if(this.props.table === 'Day') {
      elem.style.width = 635 + 300 + 'px';
      elem.style.left = e.clientX - startX - elem.offsetWidth / 4 + 'px';
    }
    else {
      elem.style.width = this.props.event.length * 175 + 500 + 'px';
      elem.style.left = e.clientX - startX - elem.offsetWidth / 2.5 + 'px';
    }

    elem.style.top = e.clientY - startY - elem.offsetHeight / 2.5 + 'px';
  }

  handleMouseLeave = e => {
    const elem = e.target;

    this.props.changeCurAction('');

    elem.style.left = '';
    elem.style.top = '';
    elem.style.width = '';

    if(this.props.table !== 'Month')
      elem.style.height = this.props.event.timeDiff / 15 * 17 + 'px';

    elem.removeEventListener('mousemove', this.handleMouseMove);
  }

  render() {
    let style = {
      height: this.props.event.timeDiff / 15 * 17 + 'px'
    }

    return (
      <EventDragger
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        targetKey={this.props.targetKey}
        style={this.props.table !== 'Month' ? style : null}
      />
    );
  }
}

const mapStateToProps = store => ({
  table: store.calendar.table,
  events: store.calendar.events
});

const mapDispatchToProps = dispatch => ({
  updateEvent: (targetKey, newEvent) => dispatch(updateEvent(targetKey, newEvent)),
  changeCurAction: action => dispatch(changeCurAction(action))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDraggerContainer);
