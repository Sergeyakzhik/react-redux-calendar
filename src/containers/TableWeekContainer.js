import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import TableWeek from '../components/TableWeek';
import EventContainer from './EventContainer';
import {
  dayHours,
  ADD_EVENT,
  WEEK,
} from '../constants/constants';
import {
  getListOfEvents, sortEvents, fillDatesArrayWeek, createTableHeader,
} from '../utils/utils';

import {
  openEditEventField,
  setInitialDate,
} from '../store/actions/calendar';

class TableWeekContainer extends React.Component {
  createRows = () => {
    const tbody = [];
    const momentDate = moment().startOf('day');
    const datesArray = fillDatesArrayWeek();
    const skeletonBody = this.createSkeletonBody();

    for (let i = 0; i < 48; i += 1) {
      const cells = [];

      for (let j = 0; j < 7; j += 1) {
        cells.push(
          <td
            className={momentDate.toDate().toString() === datesArray[j].toString() ? 'curDay' : ''}
            key={datesArray[j]}
            text=""
          />,
        );
      }

      cells.unshift(
        <td
          key={`TDayHour-${dayHours[i]}`}
          text={dayHours[i]}
        >
          {dayHours[i]}
        </td>,
      );

      tbody.push(<tr className="table-row" key={`TRowWeek${i}`}>{cells}</tr>);
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
    const datesArray = fillDatesArrayWeek();
    const rows = [];
    const tbody = [];
    const splitEvents = this.splitEventsByDays();

    for (let i = 0; i < 96; i += 1) {
      rows.push([]);
    }

    for (let i = 0; i < 7; i += 1) {
      const events = getListOfEvents(splitEvents, datesArray[i]);

      events.sort(sortEvents('timeDiff'));

      for (let j = 0; j < 96; j += 1) {
        const min = j % 4 === 0 ? 0 : j % 4 === 1 ? 15 : j % 4 === 2 ? 30 : 45;
        const curCellEvents = [];
        let numberOfEvents = 0;
        let eventsList = [];

        events.forEach((event) => {
          if (moment(event.startDate).startOf('minute').toString() === moment(datesArray[i]).hours(j / 4).minutes(min).toString()) curCellEvents.push(event);

          if (moment(event.startDate).startOf('minute').toString() <= moment(datesArray[i]).hours(j / 4).minutes(min).toString()
            && moment(event.endDate).startOf('minute').toString() >= moment(datesArray[i]).hours(j / 4).minutes(min).toString()
          ) numberOfEvents += 1;
        });

        eventsList = this.createEvents(curCellEvents, numberOfEvents);

        rows[j].push(
          <td
            key={datesArray[i]}
            onClick={this.handleCellClick}
            date={moment(datesArray[i]).hours(j / 4).minutes(min).toDate()}
            numberOfEvents={numberOfEvents}
          >
            {eventsList.map(event => event)}
          </td>,
        );
      }
    }

    for (let i = 0; i < 96; i += 1) tbody.push(<tr key="TSkeletonBody">{rows[i]}</tr>);

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
        width: `${95 - (numberOfEvents - 1) * 15}%`,
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

  isLongerThanDay = (event) => {
    const { startDate, endDate } = event;
    const eventLengthHrs = endDate.diff(startDate, 'hours');
    const eventLengthInMins = endDate.diff(startDate, 'minutes');
    const minsBeforeEndOfDay = moment(startDate).endOf('day').diff(startDate, 'minutes');

    return eventLengthHrs > 24 || eventLengthInMins > minsBeforeEndOfDay;
  }

  setHeaderFirstMonth = () => moment(this.props.period).startOf('week').month() + 1;

  setHeaderSecondMonth = () => moment(this.props.period).endOf('week').month() + 1;

  setHeaderFirstYear = () => moment(this.props.period).startOf('week').year();

  setHeaderSecondYear = () => moment(this.props.period).endOf('week').year();

  render() {
    const { period } = this.props;

    return (
      <TableWeek
        date={`${this.setHeaderFirstMonth()}/${moment(period).startOf('week').date()}/${this.setHeaderFirstYear()} -
        ${this.setHeaderSecondMonth()}/${moment(period).endOf('week').date()}/${this.setHeaderSecondYear()}`}
        tableHeader={createTableHeader(WEEK)}
        tableRows={this.createRows()}
      />
    );
  }
}

const mapDispatchToProps = {
  openEditEventField,
  setInitialDate,
};

const mapStateToProps = state => ({
  events: state.calendar.events,
  period: state.calendar.period,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableWeekContainer);
