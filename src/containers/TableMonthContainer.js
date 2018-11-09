import React from 'react';
import CellContainer from './CellContainer.js';
import TableMonth from '../components/TableMonth/TableMonth';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class TableMonthContainer extends React.Component {

  createTableHeader = () => {
    let thead = [];

    for(let i = 0; i < 7; i++) {
      thead.push(<th>{weekDays[i]}</th>);
    }
    return thead;
  }

  createDaysArray = () => {
    let curDate = this.props.curPeriod;
    let curMonth = curDate.getMonth();
    let curYear = curDate.getFullYear();
    let curDay = curDate.getDate();
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

  handleAddEvent = (e) => {

  }

  createRows = () => {
    let tbody = [];
    let daysArray = this.createDaysArray();
    let daysArrayInd = 0;
    let date = new Date();
    let realDate = new Date(date.getFullYear(), date.getMonth());
    let curDate = new Date(this.props.curPeriod.getFullYear(), this.props.curPeriod.getMonth());
    let isCurrentDay = JSON.stringify(realDate) == JSON.stringify(curDate);

    for (let i = 0; i < 6; i++) {
      let cells = [];

      for(let j = 0; j < 7; j++) {
        cells.push(<CellContainer className={isCurrentDay && daysArray[daysArrayInd] == date.getDate() ? 'curDay' : ''} key={`TMonth-${j + i * 7}`} text={daysArray[daysArrayInd]} />);
        daysArrayInd++;
      }
      tbody.push(<tr>{cells}</tr>);
    }


    return tbody;
  }

  render() {
    return (
      <TableMonth date={`${this.props.curPeriod.getMonth() + 1}/${this.props.curPeriod.getFullYear()}`}
        tableHeader={this.createTableHeader()} tableRows={this.createRows()}
      />
    );
  }
}

export default TableMonthContainer;
