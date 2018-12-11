import React from 'react';
import './style.css';

const ShowMoreField = props => (
  <div className="show-more">
    <div className="close-button" onClick={props.onCloseButtonClick}>
      <i className="fas fa-times" />
    </div>
    <div>
      <ul>
        {props.events.map(event => (
            <>
              <hr />
              <li>
                <div className="row">
                  <div className="col-sm-6">
                    <h3>{event.name}</h3>
                    <h4>{`${event.startDate.format('h:mm a')} - ${event.endDate.format('h:mm a')}`}</h4>
                    <h4>{event.place}</h4>
                  </div>
                  <div className="col-sm-6">
                    <h6>{event.description || 'No description'}</h6>
                  </div>
                </div>
              </li>
            </>
        ))}
      </ul>
    </div>
  </div>
);

export default ShowMoreField;
