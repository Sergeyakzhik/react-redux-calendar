import React from 'react';
import CellContainer from './CellContainer.js';
import TableMonth from '../components/TableMonth/TableMonth';
import { weekdays } from '../constants/constants';

class TableMonthContainer extends React.Component {

  createTableHeader = () => {
    let thead = [];

    for(let i = 0; i < 7; i++) {
      thead.push(<th key={'THMonth' + i}>{weekdays[i]}</th>);
    }
    return <tr>{thead}</tr>;
  }

  createDaysArray = () => {
    let curDate = this.props.period;
    let curMonth = curDate.getMonth();
    let curYear = curDate.getFullYear();
    let date = new Date(curYear, curMonth);
    let emptyCellsNum = date.getDay();
    let daysArray = [];

    for(let i = 0; i < emptyCellsNum; i++) {
      daysArray.push('');
    }

    while(date.getMonth() === curMonth) {
      daysArray.push(date.getDate());

      date.setDate(date.getDate() + 1);
    }
    return daysArray;
  }

  createRows = () => {
    const { period } = this.props;
    let tbody = [];
    let daysArray = this.createDaysArray();
    let daysArrayInd = 0;
    let date = new Date();
    let realDate = new Date(date.getFullYear(), date.getMonth());
    let curDate = new Date(period.getFullYear(), period.getMonth());
    let isCurrentDay = realDate.getTime() === curDate.getTime();

    for (let i = 0; i < 6; i++) {
      let cells = [];

      for(let j = 0; j < 7; j++) {
        cells.push(<CellContainer className={isCurrentDay && daysArray[daysArrayInd] === date.getDate() ? 'curDay' : ''} key={`TMonth-${j + i * 7}`} text={daysArray[daysArrayInd]} />);
        daysArrayInd++;
      }
      tbody.push(<tr key={'TRowMonth' + i}>{cells}</tr>);
    }

    return tbody;
  }

  render() {
    const { period } = this.props;
    return (
      <TableMonth date={`${period.getMonth() + 1}/${period.getFullYear()}`}
        tableHeader={this.createTableHeader()} tableRows={this.createRows()}
      />
    );
  }
}

export default TableMonthContainer;
