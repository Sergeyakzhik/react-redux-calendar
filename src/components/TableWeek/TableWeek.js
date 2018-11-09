import React from 'react';
import './TableWeek.css';

let TableWeek = props => {
  return (
    <div>
      <h2>{props.date}</h2>
      <table className="table-week">
        {props.tableHeader}
        {props.tableRows}
      </table>
    </div>
  );
};

export default TableWeek;
