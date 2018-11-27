import React from 'react';
import './Event.css';

let Event = props => (
  <>
    <div className="event" style={props.style}
      targetKey={props.targetKey}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onClick={e => e.stopPropagation()}
    >
      <h4>{props.event.name}</h4>
      <div className="delete-button" targetKey={props.targetKey} event={props.event} onClick={props.onDeleteButtonClick}>
        <i className="fas fa-times"></i>
      </div>
    </div>
  </>
);

export default Event;
