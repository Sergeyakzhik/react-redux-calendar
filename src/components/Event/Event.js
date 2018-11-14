import React from 'react';
import './Event.css';

let Event = props => (
  <div className="event">
    {props.name}
  </div>
);

export default Event;
