import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import TableDay from '../components/TableDay';
import EventContainer from './EventContainer';
import {
  dayHours,
  ADD_EVENT,
} from '../constants/constants';

import {
  openEditEventField,
  setInitialDate,
} from '../store/actions/editEventField';

class TableDayContainer extends React.Component {
  getListOfEvents = (events, date) => {
    const eventsList = [];

    events.forEach((event) => {
      if (moment(event.startDate).startOf('day').toString() === moment(date).startOf('day').toString()) {
        eventsList.push(event);
      }
    });

    return eventsList;
  }

  roundMinutes = minutes => (minutes <= 30 ? 0 : 30);

  createRows = () => {
    const { period } = this.props;
    const tbody = [];
    const now = moment();
    const curRoundedMin = this.roundMinutes(now.minutes());
    const momentDate = now.minutes(curRoundedMin).startOf('minute');
    const skeletonBody = this.createSkeletonBody();

    for (let i = 0; i < 48; i += 1) {
      const min = i % 2 === 0 ? 0 : 30;
      const roundedHour = min === 0 ? Math.floor(i / 2) + (i % 2) : Math.floor(i / 2);
      const date = moment(period).hour(roundedHour).minutes(min).startOf('minute')
        .toDate();

      tbody.push(
        <tr className="table-row" key={`TRowDay${i}`}>
          <td
            className={momentDate.toDate().toString() === date.toString() ? 'curDay' : ''}
            key={`TDayHour-${dayHours[i]}`}
          >
            {dayHours[i]}
          </td>
          <td
            className={momentDate.toDate().toString() === date.toString() ? 'curDay' : ''}
            key={date}
            text=""
          />
        </tr>,
      );
    }

    tbody.push(
      <div className="events-skeleton" key="TWeekSkeleton">
        <table>
          <tbody>
            {skeletonBody}
          </tbody>
        </table>
      </div>,
    );

    return tbody;
  }

  handleCellClick = (e) => {
    const date = moment(new Date(e.target.attributes.date.value));
    const { setInitialDate, openEditEventField } = this.props;

    setInitialDate(date);
    openEditEventField(true, ADD_EVENT);
  }

  createSkeletonBody = () => {
    const { period } = this.props;
    const tbody = [];
    const splitEvents = this.splitEventsByDays();
    const date = moment(period).startOf('day').toDate();

    const events = this.getListOfEvents(splitEvents, date);

    events.sort(this.sortEvents('timeDiff'));

    for (let i = 0; i < 96; i += 1) {
      const min = i % 4 === 0 ? 0 : i % 4 === 1 ? 15 : i % 4 === 2 ? 30 : 45;
      const curCellEvents = [];
      let numberOfEvents = 0;
      const eventsList = [];

      events.forEach((event) => {
        if (moment(event.startDate).startOf('minute').toString() === moment(date).hours(i / 4).minutes(min).toString()) curCellEvents.push(event);

        if (moment(event.startDate).startOf('minute').toString() <= moment(date).hours(i / 4).minutes(min).toString()
          && moment(event.endDate).startOf('minute').toString() >= moment(date).hours(i / 4).minutes(min).toString()
        ) numberOfEvents += 1;
      });

      eventsList = this.createEvents(curCellEvents, numberOfEvents);

      tbody.push(
        <tr>
          <td
            key={date}
            onClick={this.handleCellClick}
            date={moment(date).hours(i / 4).minutes(min).toDate()}
            numberOfEvents={numberOfEvents}
          >
            {eventsList.map(event => event)}
          </td>
        </tr>,
      );
    }

    return (
      <>
        {tbody}
      </>
    );
  }

  createEvents = (events, numberOfEvents) => {
    const eventsList = [];
    let eventHeight;
    let style = {};


    events.forEach((event) => {
      eventHeight = event.timeDiff / 15;

      style = {
        zIndex: 20 + numberOfEvents,
        height: `${eventHeight * 17}px`,
        width: `${99 - (numberOfEvents - 1) * 15}%`,
      };

      eventsList.push(
        <EventContainer
          event={event}
          targetKey={event.targetKey}
          style={style}
        />,
      );

      numberOfEvents -= 1;
    });

    return eventsList;
  }

  splitEventsByDays = () => {
    const { events } = this.props;
    const splitEvents = [];

    Object.keys(events).forEach((key) => {
      const event = Object.assign({}, events[key]);

      while (this.isLongerThanDay(event)) {
        const curEvent = Object.assign({}, event);
        curEvent.endDate = moment(curEvent.startDate).endOf('day');
        curEvent.timeDiff = moment(curEvent.endDate).diff(moment(curEvent.startDate), 'minutes');
        curEvent.eventPartKey = curEvent.name + curEvent.startDate.toString() + curEvent.endDate.toString();

        event.startDate = moment(curEvent.endDate).date(curEvent.endDate.date() + 1).startOf('day');
        event.timeDiff = moment(event.endDate).diff(moment(event.startDate), 'minutes');
        event.eventPartKey = event.name + event.startDate.toString() + event.endDate.toString();
        splitEvents.push(curEvent);
      }

      splitEvents.push(event);
    });

    return splitEvents;
  }

  sortEvents = property => function s(a, b) {
    const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result;
  }

  isLongerThanDay = (event) => {
    const { startDate, endDate } = event;
    const eventLengthHrs = endDate.diff(startDate, 'hours');
    const eventLengthInMins = endDate.diff(startDate, 'minutes');
    const minsBeforeEndOfDay = moment(startDate).endOf('day').diff(startDate, 'minutes');

    return eventLengthHrs > 24 || eventLengthInMins > minsBeforeEndOfDay;
  }

  render() {
    const { period } = this.props;
    return (
      <TableDay
        date={`${moment(period).month() + 1}/${moment(period).date()}/${moment(period).year()}`}
        tableRows={this.createRows()}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  openEditEventField: (isActive, usage) => dispatch(openEditEventField(isActive, usage)),
  setInitialDate: initialDate => dispatch(setInitialDate(initialDate)),
});

const mapStateToProps = state => ({
  events: state.calendar.events,
  period: state.calendar.period,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableDayContainer);
