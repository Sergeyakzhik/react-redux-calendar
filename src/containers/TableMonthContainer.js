import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import TableMonth from '../components/TableMonth';
import EventContainer from './EventContainer';
import ShowMoreFieldContainer from './ShowMoreFieldContainer';
import {
  weekdays,
  ADD_EVENT,
} from '../constants/constants';

import {
  openEditEventField,
  setInitialDate,
} from '../store/actions/editEventField';
import { toggleShowMoreField } from '../store/actions/showMoreField';

class TableMonthContainer extends React.Component {
  getListOfEvents = (events, date) => {
    const eventsList = [];

    events.forEach((event) => {
      if (moment(event.startDate).startOf('day').toString() === moment(date).startOf('day').toString()) {
        eventsList.push(event);
      }
    });

    return eventsList;
  }

  createTableHeader = () => {
    const thead = [];

    for (let i = 0; i < 7; i += 1) {
      thead.push(<th key={`THMonth${i}`}>{weekdays[i]}</th>);
    }
    return <tr>{thead}</tr>;
  }

  createRows = () => {
    const tbody = [];
    const momentDate = moment().startOf('day');
    const datesArray = this.fillDatesArray();

    for (let i = 0; i < 6; i += 1) {
      const cells = [];
      const skeletonHeaderCells = [];
      const skeletonBody = this.createSkeletonBody(i);

      for (let j = 0; j < 7; j += 1) {
        const eventsOfDay = this.getListOfEvents(this.splitEventsByDay(), datesArray[j + 7 * i]);

        cells.push(
          <td
            className={momentDate.toDate().toString() === datesArray[j + 7 * i].toString() ? 'curDay' : ''}
            key={datesArray[j + 7 * i]}
          >
            {
              eventsOfDay.length > 3
                ? (
                  <button
                    type="button"
                    id="showMoreButton"
                    className="btn btn-primary show-more-button"
                    onClick={this.handleShowMoreClick}
                    date={datesArray[j + 7 * i].toString()}
                  >
                Show more
                  </button>
                ) : null
            }
          </td>,
        );

        skeletonHeaderCells.push(
          <td key={`TSkeletonHeader${j + 7 * i}`} onClick={this.handleCellClick} date={datesArray[j + 7 * i]}>
            <h4>{moment(datesArray[j + 7 * i]).date()}</h4>
          </td>,
        );
      }

      tbody.push(
        <tr className="table-row" key={`TRowMonth${i}`}>
          {cells}
        </tr>,
      );

      tbody.push(
        <div className="events-skeleton" key={`TRowMonthSkeleton${i}`}>
          <table>
            <thead>
              <tr>{skeletonHeaderCells}</tr>
            </thead>
            <tbody>
              {skeletonBody}
            </tbody>
          </table>
        </div>,
      );
    }
    return tbody;
  }

  handleCellClick = (e) => {
    const { setInitialDate, openEditEventField } = this.props;
    const date = moment(new Date(e.target.attributes.date.value));

    setInitialDate(date);
    openEditEventField(true, ADD_EVENT);
  }

  createSkeletonBody = (weekIndex) => {
    const datesArray = this.fillDatesArray();
    const skeletonBody = [];
    const rows = [[], [], []];
    const splitEvents = this.splitEventsByWeek();

    rows.forEach((arr) => { arr.numberOfCells = 0; });

    for (let i = 0; i < 7; i += 1) {
      const events = this.getListOfEvents(splitEvents, datesArray[i + 7 * weekIndex]);

      events.sort(this.sortEvents('length'));

      for (let j = 0; j < 3; j += 1) {
        if (rows[j].numberOfCells !== 7 && rows[j].numberOfCells < i + 1) {
          rows[j].push(
            <td
              key={datesArray[i + 7 * weekIndex]}
              colSpan={events[0] ? events[0].length : 1}
              onClick={this.handleCellClick}
              date={datesArray[i + 7 * weekIndex]}
            >
              {events[0]
                ? (
                  <EventContainer
                    event={events[0]}
                    targetKey={events[0].targetKey}
                  />
                ) : null
              }
            </td>,
          );

          rows[j].numberOfCells += events[0] ? events[0].length : 1;
          events.shift();
        }
      }
    }

    for (let i = 0; i < 3; i += 1) {
      skeletonBody.push(
        <tr key={`TSkeletonBody_${i}`}>{rows[i]}</tr>,
      );
    }

    return skeletonBody;
  }

  splitEventsByWeek = () => {
    const { events } = this.props;
    const splitEvents = [];

    Object.keys(events).forEach((key) => {
      const event = Object.assign({}, events[key]);

      while (this.isLongerThanWeek(event)) {
        const curEvent = Object.assign({}, event);
        curEvent.endDate = moment(curEvent.startDate).endOf('week').startOf('day');
        curEvent.length = curEvent.endDate.diff(moment(curEvent.startDate).startOf('day'), 'days') + 1;
        curEvent.eventPartKey = curEvent.name + curEvent.startDate.toString() + curEvent.endDate.toString();

        event.startDate = moment(curEvent.endDate).date(curEvent.endDate.date() + 1).startOf('day');
        event.length = event.endDate.diff(moment(event.startDate).startOf('day'), 'days') + 1;
        event.eventPartKey = event.name + event.startDate.toString() + event.endDate.toString();
        splitEvents.push(curEvent);
      }

      splitEvents.push(event);
    });

    return splitEvents;
  }

  splitEventsByDay = () => {
    const { events } = this.props;
    const splitEvents = [];

    Object.keys(events).forEach((key) => {
      const event = Object.assign({}, events[key]);

      while (this.isLongerThanDay(event)) {
        const curEvent = Object.assign({}, event);
        curEvent.endDate = moment(curEvent.startDate).endOf('day');
        curEvent.length = 1;

        event.startDate = moment(curEvent.endDate).date(curEvent.endDate.date() + 1).startOf('day');
        event.length = 1;
        splitEvents.push(curEvent);
      }

      splitEvents.push(event);
    });

    return splitEvents;
  }

  isLongerThanWeek = (event) => {
    const startDate = moment(event.startDate).startOf('day');
    const endDate = moment(event.endDate).startOf('day');
    const eventLength = endDate.diff(startDate, 'days') + 1;

    return moment(startDate).endOf('week').startOf('day').diff(startDate, 'days') + 1 < eventLength;
  }

  isLongerThanDay = (event) => {
    const startDate = moment(event.startDate).startOf('day');
    const endDate = moment(event.endDate).startOf('day');

    return startDate.toString() !== endDate.toString();
  }

  sortEvents = property => function s(a, b) {
    const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return -result;
  }

  fillDatesArray = () => {
    const array = [];
    const { period } = this.props;
    const now = moment(period);
    const startOfMonth = now.startOf('month');
    const firstCell = startOfMonth.startOf('week');
    const firstCellDate = startOfMonth.startOf('week').date();
    const curYear = moment(period).year();
    let month = firstCell.month();
    let daysInCurMonth = firstCell.daysInMonth();
    const daysInNextMonth = now.year(curYear).month(month + 1).daysInMonth();

    for (let i = firstCellDate; array.length < 42; i += 1) {
      if (i > daysInCurMonth) {
        i = 1;
        daysInCurMonth = daysInNextMonth;
        month += 1;
      }
      array.push(now.year(curYear).month(month).date(i).startOf('day')
        .toDate());
    }

    return array;
  }

  handleShowMoreClick = e => this.props.toggleShowMoreField(true, this.getListOfEvents(this.splitEventsByDay(), e.target.attributes.date.value));

  render() {
    const { period, isActive } = this.props;

    return (
      <>
        <TableMonth
          date={`${moment(period).month() + 1}/${moment(period).year()}`}
          tableHeader={this.createTableHeader()}
          tableRows={this.createRows()}
        />
        {isActive ? <ShowMoreFieldContainer /> : null}
      </>
    );
  }
}

const mapStateToProps = state => ({
  events: state.calendar.events,
  isActive: state.showMoreField.isActive,
  period: state.calendar.period,
});

const mapDispatchToProps = dispatch => ({
  openEditEventField: (isActive, usage) => dispatch(openEditEventField(isActive, usage)),
  setInitialDate: initialDate => dispatch(setInitialDate(initialDate)),
  toggleShowMoreField: (isActive, events) => dispatch(toggleShowMoreField(isActive, events)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableMonthContainer);
