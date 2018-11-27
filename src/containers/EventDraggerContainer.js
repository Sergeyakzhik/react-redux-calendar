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
      let elem = e.target;

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
    let elem = e.target;

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

    if(curTable === 'Month') {
      let cellsDiffX = Math.round(diffX / 157);
      let cellsDiffY = Math.round(diffY / 100) * 7;

      curEvent.startDate = moment(startDate).date(moment(startDate).date() + cellsDiffX + cellsDiffY);
      curEvent.endDate = moment(endDate).date(moment(endDate).date() + cellsDiffX + cellsDiffY);
    }

    if(curTable === 'Week') {
      let cellsDiffX = Math.round(diffX / 67) * 48;
      let cellsDiffY = Math.round(diffY / 17);

      curEvent.startDate = moment(startDate).minutes(moment(startDate).minutes() + 15 * (cellsDiffX + cellsDiffY));
      curEvent.endDate = moment(endDate).minutes(moment(endDate).minutes() + 15 * (cellsDiffX + cellsDiffY));
    }

    this.props.updateEvent(this.props.targetKey, curEvent);
    e.target.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = e => {
    let elem = e.target;

    elem.style.width = this.props.event.length * 175 + 500 + 'px';
    elem.style.left = e.clientX - startX - elem.offsetWidth / 2.5 + 'px';
    elem.style.top = e.clientY - startY - elem.offsetHeight / 2.5 + 'px';
  }

  render() {
    let style = {
      height: this.props.event.timeDiff / 15 * 17 + 'px'
    }

    return (
      <EventDragger
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
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
