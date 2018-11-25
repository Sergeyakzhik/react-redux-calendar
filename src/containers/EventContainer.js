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

let startX, startY, isMouseOver = false, isMouseDown = false;

class EventContainer extends React.Component {

  handleMouseEnter = e => {
    this.props.toggleEventInfoField(e.target.attributes.targetKey.value);
  }

  handleMouseLeave = e => {
    this.props.toggleEventInfoField('');
  }

  handleMouseOverResizer = e => {
    isMouseOver = true;
    if(isMouseDown)
      e.target.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseLeaveResizer = e => {
    isMouseOver = false;
    e.target.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleDeleteButtonClick = e => {
    this.props.deleteEvent(e.target.attributes.targetKey.value)
  }

  handleMouseDown = e => {
  }

  handleMouseUp = e => {
    console.log('up')
    isMouseDown = false;
    e.target.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseDownResizer = e => {
    if(e.button === 0) {
      isMouseDown = true;
      startX = e.clientX;
      startY = e.clientY;

      if(isMouseOver)
        e.target.addEventListener('mousemove', this.handleMouseMove);
    }
  }

  handleMouseMove = e => {
    let endDate = this.props.event.endDate
    let curEvent = this.props.events[this.props.targetKey];

    if(e.clientX - startX > 130) {
      curEvent.endDate = moment(endDate).date(moment(endDate).date() + 1);
      this.props.updateEvent(this.props.targetKey, curEvent);
      startX = e.clientX;
    }
    if(startX - e.clientX > 130) {
      if(curEvent.length > 1) {
        curEvent.endDate = moment(endDate).date(moment(endDate).date() - 1);
        this.props.updateEvent(this.props.targetKey, curEvent);
        startX = e.clientX;
      }
    }
    if(e.clientY - startY > 110) {
      curEvent.endDate = moment(endDate).date(moment(endDate).date() + 7);
      this.props.updateEvent(this.props.targetKey, curEvent);
      startY = e.clientY;
      startX = e.clientX;
    }
    if(startY - e.clientY > 110) {
      if(curEvent.length > 7) {
        curEvent.endDate = moment(endDate).date(moment(endDate).date() - 7);
        this.props.updateEvent(this.props.targetKey, curEvent);
        startY = e.clientY;
        startX = e.clientX;
      }
    }
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
          onMouseDown={this.handleMouseDown}
          onMouseDownResizer={this.handleMouseDownResizer}
          onMouseUp={this.handleMouseUp}
          onMouseOver={this.handleMouseOverResizer}
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
