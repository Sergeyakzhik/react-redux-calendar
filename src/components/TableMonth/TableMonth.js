import React from 'react';
import './TableMonth.css';

let TableMonth = props => {
  return (
    <div>
      <h2>{props.date}</h2>
      <table className='table-month'>
        {props.tableHeader}
        {props.tableRows}
      </table>
    </div>
  );
};

export default TableMonth;
