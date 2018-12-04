import React from 'react';
import './StyleToggler.css';

let StyleToggler = props => (
  <div className="btn-group btn-group-toggle style-toggler radio">
    <input type="radio" name="style-toggler" autoComplete="off" id="style1" value="style1" onChange={props.onStyleTogglerClick} checked={props.style === "style1"}/>
    <label for="style1"  className="btn btn-secondary style-option style1"></label>
    <input type="radio" name="style-toggler" autoComplete="off" id="style2" value="style2" onChange={props.onStyleTogglerClick} checked={props.style === "style2"}/>
    <label for="style2" className="btn btn-secondary style-option style2"></label>
    <input type="radio" name="style-toggler" autoComplete="off" id="style3" value="style3" onChange={props.onStyleTogglerClick} checked={props.style === "style3"}/>
    <label for="style3" className="btn btn-secondary style-option style3"></label>
  </div>
)

export default StyleToggler;
