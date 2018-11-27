import React from 'react';
import './EventDragger.css';

let EventDragger = props => (
  <div
    className="dragger"
    targetKey={props.targetKey}
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    onClick={e => e.stopPropagation()}
    style={props.style}
  >
  </div>
);

export default EventDragger;
