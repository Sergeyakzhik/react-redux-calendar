import React from 'react';
import './style.css';

let TimeSegmentToggler = props => (
  <select onChange={props.onPeriodChange} className="form-control">
    <option>Month</option>
    <option>Week</option>
    <option>Day</option>
  </select>
);

export default TimeSegmentToggler;
