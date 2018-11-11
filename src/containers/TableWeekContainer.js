import React from 'react';
import CellContainer from './CellContainer.js';
import TableWeek from '../components/TableWeek/TableWeek';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dayHours = ['12am', '1am', '2am', '3am', '4am', '5am',
                  '6am', '7am', '8am', '9am', '10am', '11am',
                  '12pm', '1pm', '2pm', '3pm', '4pm', '5pm',
                  '6am', '7am', '8am', '9am', '10am', '11am'];

class TableWeekContainer extends React.Component {

  createTableHeader = () => {
    let thead = [];
    let weekdaysArray = this.createWeekdaysArray();

    for(let i = 0; i < weekdaysArray.length; i++) {
      thead.push(<th>{weekdays[i]} {weekdaysArray[i]}</th>);
    }
    thead.unshift(<th></th>)

    return thead;
  }

  createWeekdaysArray = () => {
    let curDate = this.props.period;
    let curMonth = curDate.getMonth();
    let curYear = curDate.getFullYear();
    let weekdaysArray = [];

    weekdaysArray = this.fillWeekdaysArray(this.calculateTimeRange());

    return weekdaysArray;
  }

  fillWeekdaysArray = (args) => {
    let array = [];
    let daysInCurMonth = this.getDaysInCurMonth();
    let daysInPrevMonth = this.getDaysInPrevMonth();
    let daysBefore, daysAfter;
    let startDate = args[0];
    let endDate = args[1];

    if(startDate <= 0) {
      daysBefore = startDate * -1;
      startDate = 1;

      while(daysBefore >= 0) {
        array.push(daysInPrevMonth - daysBefore);
        daysBefore--;
      }
    }

    if(endDate > daysInCurMonth) {
      daysAfter = endDate - daysInCurMonth;
      endDate = daysInCurMonth;
    }

    for(let i = startDate; i <= endDate; i++) {
      array.push(i)
    }

    for(let i = 1; i <= daysAfter; i++) {
      array.push(i)
    }

    return array;
  }

  getDaysInCurMonth = () => 32 - new Date(new Date().getFullYear(), new Date().getMonth(), 32).getDate();

  getDaysInPrevMonth = () => 32 - new Date(new Date().getFullYear(), new Date().getMonth() - 1, 32).getDate();

  calculateTimeRange = () => {
    let curDate = this.props.period;
    let curMonth = curDate.getMonth();
    let curYear = curDate.getFullYear();
    let emptyCellsNum = this.countEmptyCells(curYear, curMonth);
    let curDayNum = curDate.getDate() + emptyCellsNum;
    let rowNum = 0;

    while(curDayNum > 0) {
      curDayNum -= 7;
      rowNum++;
    }

    let startDate = (rowNum - 1) * 7 - emptyCellsNum + 1;
    let endDate = startDate + 6;

    return [startDate, endDate];
  }

  countEmptyCells = (year, month) => {
    return new Date(year, month).getDay();
  }

  createRows = () => {
    const { period } = this.props;
    let tbody = [];
    let weekdaysArray = this.createWeekdaysArray();
    let weekdaysArrayInd = 0;
    let curDay = new Date().getDay();
    let date = new Date();
    let realDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let curDate = new Date(period.getFullYear(), period.getMonth(), period.getDate());
    let isCurrentDay = JSON.stringify(realDate) == JSON.stringify(curDate);

    for (let i = 0; i < 24; i++) {
      let cells = [];

      for(let j = 0; j < 7; j++) {
        cells.push(<CellContainer className={isCurrentDay && j == curDay ? 'curDay' : ''} key={`TWeek-${j + i * 7}`} text='' />);
        weekdaysArrayInd++;
      }

      cells.unshift(<CellContainer key={`TDayHour-${dayHours[i]}`} text={dayHours[i]} />);
      tbody.push(<tr>{cells}</tr>);
    }
    return tbody;
  }

  setHeaderFirstMonth = () => {
    let firstMonth;
    let curMonth = this.props.period.getMonth();

    if(this.calculateTimeRange()[0] < 1) {
      if(curMonth == 0)
        firstMonth = 12;
      else
        firstMonth = curMonth;
    }
    else
      firstMonth = curMonth + 1;

    return firstMonth;
  }

  setHeaderSecondMonth = () => {
    let secondMonth;
    let curMonth = this.props.period.getMonth();

    if(this.calculateTimeRange()[1] > this.getDaysInCurMonth())
      secondMonth = curMonth + 2;
    else
      secondMonth = curMonth + 1;

    return secondMonth;
  }

  render() {
    const { period } = this.props;
    return (
      <TableWeek date={`${this.setHeaderFirstMonth()}/${this.fillWeekdaysArray(this.calculateTimeRange())[0]}/${period.getFullYear()} -
        ${this.setHeaderSecondMonth()}/${this.fillWeekdaysArray(this.calculateTimeRange())[6]}/${period.getFullYear()}`}
        tableHeader={this.createTableHeader()} tableRows={this.createRows()}
      />
    );
  }
}

export default TableWeekContainer;
