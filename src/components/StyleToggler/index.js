import React from 'react';
import './style.css';

let StyleToggler = props => (
  <div className="btn-group btn-group-toggle style-toggler radio">
    <input type="radio" name="style-toggler" autoComplete="off" id="style1" value="style1" onChange={props.onStyleTogglerClick} checked={props.style === "style1"}/>
    <label htmlFor="style1"  className="btn btn-secondary style-option style1"></label>
    <input type="radio" name="style-toggler" autoComplete="off" id="style2" value="style2" onChange={props.onStyleTogglerClick} checked={props.style === "style2"}/>
    <label htmlFor="style2" className="btn btn-secondary style-option style2"></label>
  </div>
)

export default StyleToggler;
