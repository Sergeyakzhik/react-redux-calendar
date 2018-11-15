import React from 'react';
import './Event.css';

let Event = props => (
  <div className="event" style={{width: `${props.length * 9.85}rem`}}>
    {props.name}
  </div>
);

export default Event;
