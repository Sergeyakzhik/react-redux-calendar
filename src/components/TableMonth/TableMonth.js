import React from 'react';
import './TableMonth.css';

let TableMonth = props => (
  <div>
    <h2>{props.date}</h2>
    <table className='table-month'>
      <thead>
        {props.tableHeader}
      </thead>
      <tbody>
        {props.tableRows}
      </tbody>
    </table>
  </div>
);

export default TableMonth;
