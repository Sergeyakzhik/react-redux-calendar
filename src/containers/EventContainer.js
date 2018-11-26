import React from 'react';
import Event from '../components/Event/Event';
import EventInfoField from '../components/EventInfoField/EventInfoField';
import moment from "moment";

import { connect } from 'react-redux';
import { toggleEventInfoField } from '../store/actions/eventInfoFieldActions';
import {
  deleteEvent,
  updateEvent
} from '../store/actions/calendarActions';
import { changeEndDate } from '../store/actions/addEventFieldActions';

let startX, startY, isMouseOver = false, isMouseOverDragger = false, isMouseDown = false, isMouseDownDragger = false;

class EventContainer extends React.Component {

  handleMouseOverResizer = e => {
    isMouseOver = true;
    if(isMouseDown) {
      e.target.addEventListener('mousemove', this.handleMouseMoveResizer);
    }
  }

  handleMouseLeaveResizer = e => {
    isMouseOver = false;
    e.target.removeEventListener('mousemove', this.handleMouseMoveResizer);
  }

  handleMouseDownResizer = e => {
    e.stopPropagation();

    if(e.button === 0) {
      isMouseDown = true;
      startX = e.clientX;
      startY = e.clientY;

      if(isMouseOver) {
        e.target.addEventListener('mousemove', this.handleMouseMoveResizer);
      }
    }
  }

  handleMouseUpResizer = e => {
    isMouseDown = false;
    e.target.removeEventListener('mousemove', this.handleMouseMoveResizer);
  }

/////////////////////////////

  handleMouseEnter = e => {
    this.props.toggleEventInfoField(e.target.attributes.targetKey.value);
  }

  handleMouseLeave = e => {
    this.props.toggleEventInfoField('');
  }

  handleDeleteButtonClick = e => {
    this.props.deleteEvent(e.target.attributes.targetKey.value)
  }

  handleMouseMoveResizer = e => {
    let endDate = this.props.event.endDate;
    let curEvent = this.props.events[this.props.targetKey];

    if(e.clientX - startX > 120) {
      if(endDate.date() !== moment(endDate).endOf('week').date()) {
        curEvent.endDate = moment(endDate).date(moment(endDate).date() + 1);
        this.props.updateEvent(this.props.targetKey, curEvent);
        startX = e.clientX;
      }
    }
    if(startX - e.clientX > 120) {
      if(curEvent.length > 1) {
        curEvent.endDate = moment(endDate).date(moment(endDate).date() - 1);
        this.props.updateEvent(this.props.targetKey, curEvent);
        startX = e.clientX;
      }
    }
    if(e.clientY - startY > 85) {
      curEvent.endDate = moment(endDate).date(moment(endDate).date() + 7);
      this.props.updateEvent(this.props.targetKey, curEvent);
      startY = e.clientY;
    }
    if(startY - e.clientY > 85) {
      if(curEvent.length > 7) {
        curEvent.endDate = moment(endDate).date(moment(endDate).date() - 7);
        this.props.updateEvent(this.props.targetKey, curEvent);
        startY = e.clientY;
      }
    }
  }

  /////////////////////////////////////

  handleMouseDownDragger = e => {
    if(e.button === 0) {
      console.log('down');
      startX = e.clientX;
      startY = e.clientY;
      e.target.addEventListener('mousemove', this.handleMouseMoveDragger);
    }
  }

  handleMouseUpDragger = e => {
    console.log('up');
    let diffX =  e.clientX - startX;
    let diffY =  e.clientY - startY;

    console.log(diffX)
    console.log(diffY)

    let cellsDiffX = Math.round(diffX / 157);
    let cellsDiffY = Math.round(diffY / 100) * 7;

    console.log(cellsDiffX)
    console.log(cellsDiffY)

    let elem = e.target;
    let startDate = this.props.event.startDate;
    let endDate = this.props.event.endDate;
    let curEvent = this.props.events[this.props.targetKey];

    curEvent.startDate = moment(startDate).date(moment(startDate).date() + cellsDiffX + cellsDiffY);
    curEvent.endDate = moment(endDate).date(moment(endDate).date() + cellsDiffX + cellsDiffY);
    this.props.updateEvent(this.props.targetKey, curEvent);

    e.target.removeEventListener('mousemove', this.handleMouseMoveDragger);
  }

  handleMouseMoveDragger = e => {
    let elem = e.target;

    elem.style.right = '';
    elem.style.width = this.props.event.length * 157 + 'px';
    elem.style.left = e.clientX - startX + 'px';
    elem.style.top = e.clientY - startY + 'px';
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
          onMouseDownDragger={this.handleMouseDownDragger}
          onMouseDownResizer={this.handleMouseDownResizer}
          onMouseUpResizer={this.handleMouseUpResizer}
          onMouseUpDragger={this.handleMouseUpDragger}
          onMouseOverResizer={this.handleMouseOverResizer}
          onMouseLeaveResizer={this.handleMouseLeaveResizer}
          event={this.props.event}
          targetKey={this.props.targetKey}
          isActive={isActive}
        />

      </>
    );
  }
}

//{isActive ? <EventInfoField event={this.props.event} /> : null}

const mapStateToProps = store => ({
  curTarget: store.eventInfoField.curTarget,
  events: store.calendar.events
});

const mapDispatchToProps = dispatch => ({
  toggleEventInfoField: curTarget => dispatch(toggleEventInfoField(curTarget)),
  changeEndDate: endDate => dispatch(changeEndDate(endDate)),
  deleteEvent: curTarget => dispatch(deleteEvent(curTarget)),
  updateEvent: (targetKey, newEvent) => dispatch(updateEvent(targetKey, newEvent))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventContainer);
