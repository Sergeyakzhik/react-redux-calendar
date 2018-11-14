import React from 'react';
import CellContainer from './CellContainer.js';
import TableWeek from '../components/TableWeek/TableWeek';
import moment from "moment";
import { weekdays, dayHours } from '../constants/constants';

class TableWeekContainer extends React.Component {

  createTableHeader = () => {
    let thead = [];
    let datesArray = this.fillDatesArray();

    for(let i = 0; i < datesArray.length; i++) {
      thead.push(<th key={'THWeek' + i}>{weekdays[i]} {moment(datesArray[i]).date()}</th>);
    }
    thead.unshift(<th key={'THWeekEmpty'}></th>)

    return <tr>{thead}</tr>;
  }

  fillDatesArray = () => {
    let array = [];
    const { period } = this.props;
    let now = moment(period);
    let startOfWeek = moment(period).startOf('week');
    let startOfWeekDate = startOfWeek.date();
    let endOfWeek = moment(period).endOf('week');
    let endOfWeekDate = endOfWeek.date();
    let curYear = moment(period).year();
    let month = startOfWeek.month();
    let daysInCurMonth = moment(period).startOf('week').daysInMonth();

    if(startOfWeekDate > endOfWeekDate) {
      for(let i = startOfWeekDate; i <= daysInCurMonth; i++) {
        array.push(now.year(curYear).month(month).date(i).startOf('day').toDate());
      }

      month++;

      for(let i = 1; array.length < 7; i++) {
        array.push(moment().year(curYear).month(month).date(i).startOf('day').toDate());
      }
    }

    else {
      for(let i = startOfWeekDate; i <= endOfWeekDate; i++) {
        array.push(now.year(curYear).month(month).date(i).startOf('day').toDate());
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
    let tbody = [];
    let datesArray = this.fillDatesArray();
    let momentDate = moment().startOf('day');

    for (let i = 0; i < 24; i++) {
      let cells = [];

      for(let j = 0; j < 7; j++) {
        cells.push(
          <CellContainer
            className={momentDate.toDate().toString() === datesArray[j].toString() ? 'curDay' : ''}
            key={datesArray[j]}
            text=''
          />
        );
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
