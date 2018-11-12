import React from 'react';
import './Cell.css';

let Cell = props => (
  <td className={props.className}>
    <h4>{props.text}</h4>
  </td>
);

export default Cell;
