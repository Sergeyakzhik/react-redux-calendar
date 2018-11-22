import React from 'react';
import './Event.css';

let Event = props => (
  <>
    <div className="event" date={props.date} style={props.style} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
      <h4>{props.name}</h4>
    </div>
  </>
);

export default Event;
