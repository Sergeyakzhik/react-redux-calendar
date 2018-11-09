import React from 'react';
import './PeriodToggler.css';

let PeriodToggler = props => {
  return (
    <div className="btn-group" role="group">
      <button onClick={props.onPeriodTogglerClick} type="button" className="btn btn-secondary left-button" id="left-button"><i className="fas fa-chevron-left"></i></button>
      <button onClick={props.onPeriodTogglerClick} type="button" className="btn btn-secondary right-button" id="right-button"><i className="fas fa-chevron-right"></i></button>
    </div>
  );
}

export default PeriodToggler;
