import React from 'react';
import TableWeek from '../components/TableWeek/TableWeek';
import EventContainer from './EventContainer';
import moment from "moment";
import { weekdays, dayHours } from '../constants/constants';

import { connect } from 'react-redux';

class TableWeekContainer extends React.Component {

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
    let datesArray = this.fillDatesArray();

    for(let i = 0; i < datesArray.length; i++) {
      thead.push(<th key={'THWeek' + i}>{weekdays[i]} {moment(datesArray[i]).date()}</th>);
    }
    thead.unshift(<th key={'THWeekEmpty'}></th>)

    return <tr>{thead}</tr>;
  }

  fillDatesArray = () => {
    const { period } = this.props;
    let array = [];
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
        array.push(now.year(curYear).month(month).date(i).startOf('day').toDate());
      }
    }

    else {
      for(let i = startOfWeekDate; i <= endOfWeekDate; i++) {
        array.push(now.year(curYear).month(month).date(i).startOf('day').toDate());
      }
    }
    return array;
  }

  createRows = () => {
    let tbody = [];
    let momentDate = moment().startOf('day');
    let datesArray = this.fillDatesArray();
    let skeletonBody = this.createSkeletonBody();

    for (let i = 0; i < 48; i++) {
      let cells = [];

      for(let j = 0; j < 7; j++) {

        cells.push(
          <td
            className={momentDate.toDate().toString() === datesArray[j].toString() ? 'curDay' : ''}
            key={datesArray[j]}
            text=''
          >
          </td>
        );
      }

      cells.unshift(
        <td
          key={`TDayHour-${dayHours[i]}`}
          text={dayHours[i]}
        >
        {dayHours[i]}
        </td>
      );

      tbody.push(<tr key={'TRowWeek' + i}>{cells}</tr>);
    }

    tbody.push(
      <div className="events-skeleton" key={'TWeekSkeleton'}>
        <table>
          <tbody>
            {skeletonBody}
          </tbody>
        </table>
      </div>
    );

    return tbody;
  }

  createSkeletonBody = () => {
    let datesArray = this.fillDatesArray();
    let rows = [];
    let tbody = [];
    let splitEvents = this.splitEventsByDays();

    for(let i = 0; i < 96; i++) {
      rows.push([]);
    }

    for(let i = 0; i < 7; i++) {
      let events = this.getListOfEvents(splitEvents, datesArray[i]);

      for(let j = 0; j < 96; j++) {
        let min = j % 4 === 0 ? 0 : j % 4 === 1 ? 15 : j % 4 === 2 ? 30 : 45;
        let curCellEvents = [];
        let numberOfEvents = 0;
        let eventsList = [];

        events.forEach(event => {
          if(moment(event.startDate).startOf('minute').toString() === moment(datesArray[i]).hours(j / 4).minutes(min).toString())
            curCellEvents.push(event);

          if(moment(event.startDate).startOf('minute').toString() <= moment(datesArray[i]).hours(j / 4).minutes(min).toString() &&
            moment(event.endDate).startOf('minute').toString() >= moment(datesArray[i]).hours(j / 4).minutes(min).toString()
          )
            numberOfEvents++;
        });

        eventsList = this.createEvents(curCellEvents, numberOfEvents);

        rows[j].push(
          <td
            key={datesArray[i]}
            date={datesArray[i]}
            numberOfEvents={numberOfEvents}
          >
            {eventsList.map(event => event)}
          </td>
        );
      }
    }

    for(let i = 0; i < 96; i++)
      tbody.push(<tr key='TSkeletonBody'>{rows[i]}</tr>);

    return (
      <>
        {tbody}
      </>
    );
  }

  createEvents = (events, numberOfEvents) => {
    let eventsList = [];
    let timeDiff;
    let eventHeight;
    let style = {};

    events.forEach((event, ind) => {
      timeDiff = moment(event.endDate).diff(moment(event.startDate), 'minutes');
      eventHeight = timeDiff / 15;

      style = {
        zIndex: 20 - ind,
        height: eventHeight * 17 + 'px',
        width: 95 - (numberOfEvents - 1) * 10 + '%',
      }

      eventsList.push(<EventContainer event={event} date={event.startDate.toString()} length={event.length} style={style} />);
    });

    return eventsList;
  }

  splitEventsByDays = () => {
    let { events } = this.props;
    let splitEvents = [];

    for(let key in events) {
      let event = Object.assign({}, events[key]);

      while(this.isLongerThanDay(event)) {
        let curEvent = Object.assign({}, event);
        curEvent.endDate = moment(curEvent.startDate).endOf('day');

        event.startDate = moment(curEvent.endDate).date(curEvent.endDate.date() + 1).startOf('day');
        splitEvents.push(curEvent);
      }

      splitEvents.push(event);
    }

    return splitEvents;
  }

  isLongerThanDay = event => {
    const startDate = event.startDate;
    const endDate = event.endDate;
    const eventLength = endDate.diff(startDate, 'hours');

    return eventLength > 24;
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

const mapStateToProps = store => ({
  events: store.eventField.events
});

export default connect(
  mapStateToProps
)(TableWeekContainer);
