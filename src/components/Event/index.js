import React from 'react';
import './style.css';

const Event = props => (
  <>
    <div
      className="event"
      style={props.style}
      targetKey={props.targetKey}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onClick={e => e.stopPropagation()}
    >
      <h4>{props.event.name}</h4>
    </div>
    <div className="delete-button" targetKey={props.targetKey} onClick={props.onDeleteButtonClick}>
      <i className="fas fa-times" />
    </div>
  </>
);

export default Event;
