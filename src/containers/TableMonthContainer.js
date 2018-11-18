import React from 'react';
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
      if(moment(events[key].startDate).startOf('day').toString() === moment(date).startOf('day').toString()) {
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
    this.props.changeStartDate(date);
    this.props.changeEndDate(date);
    this.props.openAddEventField(true);
  }

  createSkeletonBody = (weekIndex) => {
    let datesArray = this.fillDatesArray();
    let skeletonBody = [];
    let rows = [[], [], []];

    rows.forEach(arr => arr.numberOfCells = 0);

    for(let i = 0; i < 7; i++) {
      let events = this.getListOfEvents(datesArray[i + 7 * weekIndex]);

      events.sort(this.dynamicSort('length'));

      for(let j = 0; j < 3; j++) {

        if(rows[j].numberOfCells !== 7 && rows[j].numberOfCells < i + 1) {

          rows[j].push(
            <td
              key={datesArray[i + 7 * weekIndex]}
              eventsList={events}
              colSpan={events[0] ? events[0].length : 1}
              onClick={this.handleCellClick}
              date={datesArray[j + 7 * weekIndex]}
            >
              {events[0] ? <Event name={events[0] ? events[0].name : ""} length={events[0].length} /> : null}
            </td>
          );

          rows[j].numberOfCells += events[0] ? events[0].length : 1;
          events.shift();
        }
      }
    }

    skeletonBody.push(
      <>
        <tr key={'TSkeletonBody'}>{rows[0]}</tr>
        <tr key={'TSkeletonBody'}>{rows[1]}</tr>
        <tr key={'TSkeletonBody'}>{rows[2]}</tr>
      </>
    );

    return skeletonBody;
  }

  dynamicSort(property) {
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return -result;
    }
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
  changeStartDate: startDate => dispatch(changeStartDate(startDate)),
  changeEndDate: endDate => dispatch(changeEndDate(endDate)),
});

const mapStateToProps = store => ({
  events: store.eventField.events
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableMonthContainer);
