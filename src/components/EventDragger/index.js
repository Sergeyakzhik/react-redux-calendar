import React from 'react';
import './style.css';

const EventDragger = props => (
  <div
    className="dragger"
    targetKey={props.targetKey}
    eventPartKey={props.eventPartKey}
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    onMouseLeave={props.onMouseLeave}
    onClick={e => e.stopPropagation()}
    style={props.style}
  />
);

export default EventDragger;
