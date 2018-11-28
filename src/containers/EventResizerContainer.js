import React from 'react';
import EventResizer from '../components/EventResizer/EventResizer';
import moment from "moment";

import { connect } from 'react-redux';
import { updateEvent } from '../store/actions/calendarActions';
import { changeCurAction } from '../store/actions/eventTransformerActions';

let startX, startY;

class EventResizerContainer extends React.Component {

  handleMouseDown = e => {

    if(e.button === 0) {
      let elem = e.target;

      this.props.changeCurAction('resize');

      startX = e.clientX;
      startY = e.clientY;

      elem.style.right = -elem.offsetWidth / 2.5 + 'px';
      elem.style.top = -elem.offsetHeight / 2.5 + 'px';

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
    let endDate = curEvent.endDate;

    elem.style.right = '';
    elem.style.top = '';

    if(curTable === 'Month') {
      let cellsDiffX = Math.round(diffX / 157);
      let cellsDiffY = Math.round(diffY / 100) * 7;

      if(curEvent.length + cellsDiffX + cellsDiffY > 0) {
        curEvent.endDate = moment(endDate).date(moment(endDate).date() + cellsDiffX + cellsDiffY);
      }
    }

    if(curTable === 'Week') {
      let cellsDiffX = Math.round(diffX / 67) * 48;
      let cellsDiffY = Math.round(diffY / 17);

      if(curEvent.timeDiff / 15 + cellsDiffX + cellsDiffY > 0) {
        curEvent.endDate = moment(endDate).minutes(moment(endDate).minutes() + 15 * (cellsDiffX + cellsDiffY));
      }
    }

    if(curTable === 'Day') {
      let cellsDiffY = Math.round(diffY / 17);

      if(curEvent.timeDiff / 15 + cellsDiffY > 0) {
        curEvent.endDate = moment(endDate).minutes(moment(endDate).minutes() + 15 * cellsDiffY);
      }
    }

    this.props.updateEvent(this.props.targetKey, curEvent);
    e.target.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = e => {
    let elem = e.target;

    elem.style.right = -e.clientX + startX - elem.offsetWidth / 2.5 + 'px';
    elem.style.top = e.clientY - startY - elem.offsetHeight / 2.5 + 'px';
  }

  handleMouseLeave = e => {
    const elem = e.target;

    this.props.changeCurAction('');

    elem.style.right = '';
    elem.style.top = '';

    elem.removeEventListener('mousemove', this.handleMouseMove);
  }

  render() {
    let style = {
      marginTop: this.props.event.timeDiff / 15 * 17 - 10 + 'px'
    }

    return (
      <EventResizer
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
)(EventResizerContainer);
