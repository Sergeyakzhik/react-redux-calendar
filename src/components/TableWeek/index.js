import React from 'react';
import './style.css';

const TableWeek = props => (
  <div>
    <h2>{props.date}</h2>
    <table className="table-week">
      <thead>
        {props.tableHeader}
      </thead>
      <tbody>
        {props.tableRows}
      </tbody>
    </table>
  </div>
);

export default TableWeek;
