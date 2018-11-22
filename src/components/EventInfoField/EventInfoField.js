import React from 'react';
import './EventInfoField.css';

let EventInfoField = props => (
  <div className="event-info">
    <h5>{props.event.name}</h5>
    <div className="row">
      <div className="col-sm-12">
        <h6>{`${props.event.startDate.format('h:mm a')} - ${props.event.endDate.format('h:mm a')}`}</h6>
        <h6>{props.event.place}</h6>
      </div>
      <div className="col-sm-12">
        <h6>{props.event.description}</h6>
      </div>
    </div>
  </div>
);

export default EventInfoField;
