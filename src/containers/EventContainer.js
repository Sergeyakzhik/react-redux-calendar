import React from 'react';
import { connect } from 'react-redux';
import Event from '../components/Event';
import EventTransformerContainer from './EventTransformerContainer';
import EventInfoFieldContainer from './EventInfoFieldContainer';

import { toggleEventInfoField, changeEventInfoPosition } from '../store/actions/eventInfoField';
import { deleteEvent } from '../store/actions/calendar';

class EventContainer extends React.Component {
  handleMouseLeave = e => this.props.toggleEventInfoField('');

  handleMouseDown = (e) => {
    this.props.toggleEventInfoField('');
  }

  handleMouseMove = (e) => {
    const { toggleEventInfoField, changeEventInfoPosition } = this.props;
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (e.target.className !== 'dragger') toggleEventInfoField('');
    else toggleEventInfoField(e.target.attributes.eventPartKey.value || '');

    changeEventInfoPosition(x, y);
  }

  handleDeleteButtonClick = (e) => {
    e.stopPropagation();

    this.props.deleteEvent(e.target.attributes.targetKey.value);
  }

  render() {
    const {
      curTarget, targetKey, style, event,
    } = this.props;
    const isActive = curTarget === (event.eventPartKey || targetKey);

    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
      >
        <Event
          style={style}
          onDeleteButtonClick={this.handleDeleteButtonClick}
          event={event}
          targetKey={targetKey}
          isActive={isActive}
        />
        <EventTransformerContainer
          onMouseDown={this.handleMouseDown}
          event={event}
          targetKey={targetKey}
        />
        {isActive ? <EventInfoFieldContainer event={event} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  curTarget: state.eventInfoField.curTarget,
});

const mapDispatchToProps = dispatch => ({
  toggleEventInfoField: curTarget => dispatch(toggleEventInfoField(curTarget)),
  deleteEvent: curTarget => dispatch(deleteEvent(curTarget)),
  changeEventInfoPosition: (posX, posY) => dispatch(changeEventInfoPosition(posX, posY)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventContainer);
