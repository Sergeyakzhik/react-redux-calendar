import React from 'react';
import TableMonth from '../components/TableMonth/TableMonth';
import EventContainer from './EventContainer';
import ShowMoreFieldContainer from './ShowMoreFieldContainer';
import moment from "moment";
import { weekdays } from '../constants/constants';

import { connect } from 'react-redux';
import {
  openAddEventField,
  changeStartDate,
  changeEndDate
} from '../store/actions/addEventFieldActions';
import { toggleShowMoreField } from '../store/actions/showMoreFieldActions';

class TableMonthContainer extends React.Component {

  getListOfEvents = (events, date) => {
    let eventsList = [];

    events.forEach(event => {
      if(moment(event.startDate).startOf('day').toString() === moment(date).startOf('day').toString()) {
        eventsList.push(event);
      }
    });

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
        let eventsOfDay = this.getListOfEvents(this.splitEventsByDay(), datesArray[j + 7 * i]);

        cells.push(
          <td
            className={momentDate.toDate().toString() === datesArray[j + 7 * i].toString() ? 'curDay' : ''}
            key={datesArray[j + 7 * i]}
          >
            {
              eventsOfDay.length > 3 ?
              <button
                type="button"
                id="showMoreButton"
                className="btn btn-primary show-more-button"
                onClick={this.handleShowMoreClick}
                date={datesArray[j + 7 * i].toString()}
              >
                Show more
              </button> : null
            }
          </td>
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
    let splitEvents = this.splitEventsByWeek();

    rows.forEach(arr => arr.numberOfCells = 0);

    for(let i = 0; i < 7; i++) {
      let events = this.getListOfEvents(splitEvents, datesArray[i + 7 * weekIndex]);

      // events.sort(this.sortEvents('length'));

      for(let j = 0; j < 3; j++) {

        if(rows[j].numberOfCells !== 7 && rows[j].numberOfCells < i + 1) {

          rows[j].push(
            <td
              key={datesArray[i + 7 * weekIndex]}
              colSpan={events[0] ? events[0].length : 1}
              onClick={this.handleCellClick}
              date={datesArray[i + 7 * weekIndex]}
            >
              {events[0] ?
                <EventContainer
                  event={events[0]}
                  targetKey={events[0].targetKey}
                /> : null
              }
            </td>
          );

          rows[j].numberOfCells += events[0] ? events[0].length : 1;
          events.shift();
        }
      }
    }

    for(let i = 0; i < 3; i++) {
      skeletonBody.push(
        <tr key={'TSkeletonBody_' + i}>{rows[i]}</tr>
      );
    }

    return skeletonBody;
  }

  splitEventsByWeek = () => {
    let { events } = this.props;
    let splitEvents = [];

    for(let key in events) {
      let event = Object.assign({}, events[key]);

      while(this.isLongerThanWeek(event)) {
        let curEvent = Object.assign({}, event);
        curEvent.endDate = moment(curEvent.startDate).endOf('week').startOf('day');
        curEvent.length = curEvent.endDate.diff(moment(curEvent.startDate).startOf('day'), 'days') + 1;

        event.startDate = moment(curEvent.endDate).date(curEvent.endDate.date() + 1).startOf('day');
        event.length = event.endDate.diff(moment(event.startDate).startOf('day'), 'days') + 1;
        splitEvents.push(curEvent);
      }

      splitEvents.push(event);
    }

    return splitEvents;
  }

  splitEventsByDay = () => {
    let { events } = this.props;
    let splitEvents = [];

    for(let key in events) {
      let event = Object.assign({}, events[key]);

      while(this.isLongerThanDay(event)) {
        let curEvent = Object.assign({}, event);
        curEvent.endDate = moment(curEvent.startDate).endOf('day');
        curEvent.length = 1;

        event.startDate = moment(curEvent.endDate).date(curEvent.endDate.date() + 1).startOf('day');
        event.length = 1;
        splitEvents.push(curEvent);
      }

      splitEvents.push(event);
    }

    return splitEvents;
  }

  isLongerThanWeek = event => {
    const startDate = moment(event.startDate).startOf('day');
    const endDate = moment(event.endDate).startOf('day');
    const eventLength = endDate.diff(startDate, 'days') + 1;

    return moment(startDate).endOf('week').startOf('day').diff(startDate, 'days') + 1 < eventLength;
  }

  isLongerThanDay = event => {
    const startDate = moment(event.startDate).startOf('day');
    const endDate = moment(event.endDate).startOf('day');

    return startDate.toString() !== endDate.toString();
  }

  sortEvents = property => {
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

  handleShowMoreClick = e => {
    this.props.toggleShowMoreField(true, this.getListOfEvents(this.splitEventsByDay(), e.target.attributes.date.value));
  }

  render() {
    const { period } = this.props;
    return (
      <>
        <TableMonth
          date={`${moment(period).month() + 1}/${moment(period).year()}`}
          tableHeader={this.createTableHeader()}
          tableRows={this.createRows()}
        />
        {this.props.isActive ? <ShowMoreFieldContainer /> : null}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  openAddEventField: isActive => dispatch(openAddEventField(isActive)),
  changeStartDate: startDate => dispatch(changeStartDate(startDate)),
  changeEndDate: endDate => dispatch(changeEndDate(endDate)),
  toggleShowMoreField: (isActive, events) => dispatch(toggleShowMoreField(isActive, events))
});

const mapStateToProps = store => ({
  events: store.calendar.events,
  isActive: store.showMoreField.isActive
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableMonthContainer);
