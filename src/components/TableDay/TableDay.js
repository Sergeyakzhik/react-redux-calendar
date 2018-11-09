import React from 'react';
import './TableDay.css';

let TableDay = props => {
  return (
    <div>
      <h2>{props.date}</h2>
      <table className="table-day">
        {props.tableRows}
      </table>
    </div>
  );
}

export default TableDay;
