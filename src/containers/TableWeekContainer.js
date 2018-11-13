import React from 'react';
import CellContainer from './CellContainer.js';
import TableWeek from '../components/TableWeek/TableWeek';
import moment from "moment";
import { weekdays, dayHours } from '../constants/constants';

class TableWeekContainer extends React.Component {

  createTableHeader = () => {
    let thead = [];
    let weekdaysArray = this.fillWeekdaysArray();

    for(let i = 0; i < weekdaysArray.length; i++) {
      thead.push(<th key={'THWeek' + i}>{weekdays[i]} {weekdaysArray[i]}</th>);
    }
    thead.unshift(<th key={'THWeekEmpty'}></th>)

    return <tr>{thead}</tr>;
  }

  fillWeekdaysArray = () => {
    let array = [];
    const { period } = this.props;
    let startDate = moment(period).startOf('week').toDate();
    let endDate = moment(period).endOf('week').toDate();

    if(startDate.getMonth() !== endDate.getMonth()) {
      for(let i = startDate.getDate(); i <= moment(startDate).daysInMonth(); i++) {
        array.push(i);
      }

      for(let i = 1; array.length < 7; i++) {
        array.push(i);
      }
    }

    else {
      for(let i = startDate.getDate(); i <= endDate.getDate(); i++) {
        array.push(i);
      }
    }

    return array;
  }

  getDaysInCurMonth = () => moment(this.props.period).daysInMonth();

  getDaysInPrevMonth = () => moment(new Date(this.props.period.getFullYear(), this.props.period.getMonth() - 1)).daysInMonth();

  countEmptyCells = (year, month) => {
    return new Date(year, month).getDay();
  }

  createRows = () => {
    const { period } = this.props;
    let tbody = [];
    let weekdaysArray = this.fillWeekdaysArray();
    let weekdaysArrayInd = 0;
    let date = new Date();
    let curDay = date.getDay();
    let realDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let curDate = new Date(period.getFullYear(), period.getMonth(), period.getDate());
    let isCurrentDay = realDate.getTime() === curDate.getTime();

    for (let i = 0; i < 24; i++) {
      let cells = [];

      for(let j = 0; j < 7; j++) {
        cells.push(
          <CellContainer
            className={isCurrentDay && j === curDay ? 'curDay' : ''}
            key={`TWeek-${j + i * 7}`}
            text=''
          />
        );
        weekdaysArrayInd++;
      }

      cells.unshift(
        <CellContainer
          key={`TDayHour-${dayHours[i]}`} 
          text={dayHours[i]}
        />
      );
      tbody.push(<tr key={'TRowWeek' + i}>{cells}</tr>);
    }
    return tbody;
  }

  setHeaderFirstMonth = () => moment(this.props.period).startOf('week').month() + 1;

  setHeaderSecondMonth = () => moment(this.props.period).endOf('week').month() + 1;

  setHeaderFirstYear = () => moment(this.props.period).startOf('week').year();

  setHeaderSecondYear = () => moment(this.props.period).endOf('week').year();

  render() {
    const { period } = this.props;
    return (
      <TableWeek date={`${this.setHeaderFirstMonth()}/${moment(period).startOf('week').date()}/${this.setHeaderFirstYear()} -
        ${this.setHeaderSecondMonth()}/${moment(period).endOf('week').date()}/${this.setHeaderSecondYear()}`}
        tableHeader={this.createTableHeader()} tableRows={this.createRows()}
      />
    );
  }
}

export default TableWeekContainer;
