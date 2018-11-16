import React from 'react';
import './Event.css';

let Event = props => (
  <div className="event">
    <h4>{props.name}</h4>
  </div>
);

export default Event;
