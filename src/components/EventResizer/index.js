import React from 'react';
import './style.css';

const EventResizer = props => (
  <div
    className="resizer"
    targetKey={props.targetKey}
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    onMouseLeave={props.onMouseLeave}
    onClick={e => e.stopPropagation()}
    style={props.style}
  />
);

export default EventResizer;
