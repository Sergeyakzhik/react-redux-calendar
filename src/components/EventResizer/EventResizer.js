import React from 'react';
import './EventResizer.css';

let EventResizer = props => (
  <div
    className="resizer"
    targetKey={props.targetKey}
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    onClick={e => e.stopPropagation()}
    style={props.style}
  >
  </div>
);

export default EventResizer;
