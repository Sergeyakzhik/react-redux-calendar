import React from 'react';
import './style.css';
import {
  STYLE1,
  STYLE2,
} from '../../constants/constants';

const StyleToggler = props => (
  <div className="btn-group btn-group-toggle style-toggler radio">
    <input type="radio" name="style-toggler" autoComplete="off" id="style1" value={STYLE1} onChange={props.onStyleTogglerClick} checked={props.style === STYLE1} />
    <label htmlFor="style1" className="btn btn-secondary style-option style1" />
    <input type="radio" name="style-toggler" autoComplete="off" id="style2" value={STYLE2} onChange={props.onStyleTogglerClick} checked={props.style === STYLE2} />
    <label htmlFor="style2" className="btn btn-secondary style-option style2" />
  </div>
);

export default StyleToggler;
