import React from 'react';
import './Event.css';

let Event = props => (
  <>
    <div className="event" style={props.style}
      targetKey={props.targetKey}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onClick={e => e.stopPropagation()}
    >
      <h4>{props.event.name}</h4>
      {props.isActive ?
        <div className="delete-button" targetKey={props.targetKey} event={props.event} onClick={props.onDeleteButtonClick}>
          <i className="fas fa-times"></i>
        </div>
        : null
      }
      <div
        className="resizer"
        targetKey={props.targetKey}
        onMouseOver={props.onMouseOver}
        onMouseLeave={props.onMouseLeaveResizer}
        onMouseDown={props.onMouseDownResizer}
        onMouseUp={props.onMouseUp}
      >
      </div>
    </div>
  </>
);

export default Event;
