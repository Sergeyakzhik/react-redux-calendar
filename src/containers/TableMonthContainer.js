import React from 'react';
import CellContainer from './CellContainer.js';
import TableMonth from '../components/TableMonth/TableMonth';
import Event from '../components/Event/Event';
import moment from "moment";
import { weekdays } from '../constants/constants';

import { connect } from 'react-redux';
import {
  openAddEventField,
  changeStartDate,
  changeEndDate
} from '../store/actions/addEventFieldActions';

class TableMonthContainer extends React.Component {

  getListOfEvents = date => {
    let { events } = this.props;
    let eventsList = [];

    for(let key in events) {
      // if(events[key].startDate.startOf('day') <= moment(date).startOf('day') &&
      //   events[key].endDate.startOf('day') >= moment(date).startOf('day')) {
      if(events[key].startDate.startOf('day').toString() === moment(date).startOf('day').toString()) {
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
      let skeletonHeaderCells = [];
      let skeletonBody = this.createSkeletonBody(i);
      for(let j = 0; j < 7; j++) {
        cells.push(
          <td
            className={momentDate.toDate().toString() === datesArray[j + 7 * i].toString() ? 'curDay' : ''}
            key={'TCellMonth' + (j + 7 * i)}
          ></td>
        );
        skeletonHeaderCells.push(
          <td key={'TSkeletonHeader' + (j + 7 * i)}>
            <h4>{moment(datesArray[j + 7 * i]).date()}</h4>
          </td>
        );
      }
      tbody.push(
        <tr className="table-row" key={'TRowMonth' + i}>
          {cells}
        </tr>
      );
      tbody.push(
        <div className="events-skeleton" key={'TRowMonthSkeleton' + i}>
          <table>
            <thead>
              <tr>{skeletonHeaderCells}</tr>
            </thead>
            <tbody>
              {skeletonBody}
            </tbody>
          </table>
        </div>
      );
    }
    return tbody;
  }

  handleCellClick = e => {
    const date = moment(new Date(e.target.attributes.date.value));
    console.log((moment(new Date(date))))
    this.props.changeStartDate(date, date);
    this.props.openAddEventField(true);
  }

  createSkeletonBody = (weekIndex) => {
    let datesArray = this.fillDatesArray();
    let skeletonBody = [];

    for(let i = 0; i < 3; i++) {
      let row = [];

      for(let j = 0; j < 7; ) {
        let events = this.getListOfEvents(datesArray[j + 7 * weekIndex]);

        // if(events.length !== 0) {
        //    console.log(events.splice(0, j));
        // }
        row.push(
          <td
            key={datesArray[j + 7 * weekIndex]}
            eventsList={events}
            colSpan={events[i] ? events[i].length : 1}
            onClick={this.handleCellClick}
            date={datesArray[j + 7 * weekIndex]}
          >
            {events[i] ? <Event name={events[i] ? events[i].name : ""} length={events[i].length} /> : null}
          </td>
        );
        j += events[i] ? events[i].length : 1;
      }
      skeletonBody.push(<tr key={'TSkeletonBody' + i}>{row}</tr>);
    }
    return skeletonBody;
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
        date={`${moment(period).month() + 1}/${moment(period).year()}`}
        tableHeader={this.createTableHeader()}
        tableRows={this.createRows()}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  openAddEventField: isActive => dispatch(openAddEventField(isActive)),
  changeStartDate: (startDate, endDate) => dispatch(changeStartDate(startDate, endDate)),
  changeEndDate: (startDate, endDate) => dispatch(changeEndDate(startDate, endDate))
});

const mapStateToProps = store => ({
  events: store.eventField.events
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableMonthContainer);
