import React from 'react';
import './style.css';

let TableDay = props => (
  <div>
    <h2>{props.date}</h2>
    <table className="table-day">
      <tbody>
        {props.tableRows}
      </tbody>
    </table>
  </div>
);

export default TableDay;
