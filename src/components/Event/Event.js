import React from 'react';
import './Event.css';
import EventInfoField from '../EventInfoField/EventInfoField';

let Event = props => (
  <>
    <div event={props.event} style={props.style} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
      <h4>{props.name}</h4>
    </div>
    {props.isActive ? <EventInfoField event={props.event} /> : null}
  </>
);

export default Event;
