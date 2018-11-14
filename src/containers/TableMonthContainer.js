import React from 'react';
import CellContainer from './CellContainer.js';
import TableMonth from '../components/TableMonth/TableMonth';
import moment from "moment";
import { weekdays } from '../constants/constants';

import { connect } from 'react-redux';

class TableMonthContainer extends React.Component {

  getListOfEvents = date => {
    let { events } = this.props;
    let eventsList = [];

    for(let key in events) {
      if(events[key].startDate.startOf('day') <= moment(date).startOf('day') &&
        events[key].endDate.startOf('day') >= moment(date).startOf('day')) {
        eventsList.push(events[key]);
      }
    }
    return eventsList;
  }

  createTableHeader = () => {
    let thead = [];

    for(let i = 0; i < 7; i++) {
      thead.push(<th key={'THMonth' + i}>{weekdays[i]}</th>);
    }
    return <tr>{thead}</tr>;
  }

  createRows = () => {
    let tbody = [];
    let momentDate = moment().startOf('day');
    let datesArray = this.fillDatesArray();

    for (let i = 0; i < 6; i++) {
      let cells = [];
      for(let j = 0; j < 7; j++) {
        cells.push(
          <CellContainer
            className={momentDate.toDate().toString() === datesArray[j + 7 * i].toString() ? 'curDay' : ''}
            key={datesArray[j + 7 * i]}
            text={moment(datesArray[j + 7 * i]).date()}
            eventsList={this.getListOfEvents(datesArray[j + 7 * i])}
          />
        );
      }
      tbody.push(<tr key={'TRowMonth' + i}>{cells}</tr>);
    }
    return tbody;
  }

  fillDatesArray = () => {
    let array = [];
    const { period } = this.props;
    let now = moment(period);
    let startOfMonth = now.startOf('month');
    let firstCell = startOfMonth.startOf('week');
    let firstCellDate = startOfMonth.startOf('week').date();
    let curYear = moment(period).year();
    let month = firstCell.month();
    let daysInCurMonth = firstCell.daysInMonth();
    let daysInNextMonth = now.year(curYear).month(month + 1).daysInMonth();

    for(let i = firstCellDate; array.length < 42; i++) {
      if(i > daysInCurMonth) {
        i = 1;
        daysInCurMonth = daysInNextMonth;
        month++;
      }
      array.push(now.year(curYear).month(month).date(i).startOf('day').toDate());
    }

    return array;
  }

  render() {
    const { period } = this.props;
    return (
      <TableMonth
        date={`${period.month() + 1}/${period.year()}`}
        tableHeader={this.createTableHeader()}
        tableRows={this.createRows()}
      />
    );
  }
}

const mapStateToProps = store => ({
  events: store.eventField.events
});

export default connect(
  mapStateToProps
)(TableMonthContainer);
