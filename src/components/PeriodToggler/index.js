import React from 'react';
import './style.css';

const PeriodToggler = props => (
  <div className="btn-group" role="group">
    <button
      onClick={props.onPeriodTogglerClick}
      type="button"
      className="btn btn-secondary left-button"
      id="left-button"
    >
      <i className="fas fa-chevron-left" />
    </button>
    <button
      onClick={props.onPeriodTogglerClick}
      type="button"
      className="btn btn-secondary right-button"
      id="right-button"
    >
      <i className="fas fa-chevron-right" />
    </button>
  </div>
);

export default PeriodToggler;
