import React from 'react';
import './TimeSegmentToggler.css';

class TimeSegmentToggler extends React.Component {
  render() {
    return (
      <select onChange={this.props.onPeriodChange} className="form-control">
        <option>Month</option>
        <option>Week</option>
        <option>Day</option>
      </select>
    );
  }
}

export default TimeSegmentToggler;
