import React from 'react';
import './style.css';
import { LEFT_BUTTON, RIGHT_BUTTON } from '../../constants/constants';

const PeriodToggler = props => (
  <div className="btn-group" role="group">
    <button
      onClick={() => props.onPeriodTogglerClick(LEFT_BUTTON)}
      type="button"
      className="btn btn-secondary left-button"
      id="left-button"
    >
      <i className="fas fa-chevron-left" />
    </button>
    <button
      onClick={() => props.onPeriodTogglerClick(RIGHT_BUTTON)}
      type="button"
      className="btn btn-secondary right-button"
      id="right-button"
    >
      <i className="fas fa-chevron-right" />
    </button>
  </div>
);

export default PeriodToggler;
