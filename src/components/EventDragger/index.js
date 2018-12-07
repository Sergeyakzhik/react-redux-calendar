import React from 'react';
import './style.css';

let EventDragger = props => (
  <div
    className="dragger"
    targetKey={props.targetKey}
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    onMouseLeave={props.onMouseLeave}
    onClick={e => e.stopPropagation()}
    style={props.style}
  >
  </div>
);

export default EventDragger;
