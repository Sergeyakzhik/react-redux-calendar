import React from 'react';
import './Cell.css';
import EventContainer from '../../containers/EventContainer';

let Cell = props => (
  <td className={props.className}>
    // <h4>{props.text}</h4>
    <EventContainer />
  </td>
);

export default Cell;
