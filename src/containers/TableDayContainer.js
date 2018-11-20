import React from 'react';
import TableDay from '../components/TableDay/TableDay';
import CellContainer from './CellContainer';
import Event from '../components/Event/Event';
import moment from "moment";
import { dayHours } from '../constants/constants';

import { connect } from 'react-redux';

class TableDayContainer extends React.Component {

  getListOfEvents = (events, date) => {
    let eventsList = [];

    events.forEach(event => {
      if(moment(event.startDate).startOf('day').toString() === moment(date).startOf('day').toString()) {
        eventsList.push(event);
      }
    });

    return eventsList;
  }

  roundMinutes = minutes => minutes <= 30 ? 0 : 30;

  createRows = () => {
    const { period } = this.props;
    let tbody = [];
    let now = moment();
    let curRoundedMin = this.roundMinutes(now.minutes());
    let momentDate = now.minutes(curRoundedMin).startOf('minute');
    let skeletonBody = this.createSkeletonBody();

    console.log(momentDate)

    for (let i = 0; i < 48; i++) {
      let min = i % 2 === 0 ? 0 : 30;
      let roundedHour = min === 0 ? Math.floor(i / 2) + i % 2 : Math.floor(i / 2);
      let date = moment(period).hour(roundedHour).minutes(min).startOf('minute').toDate();

      console.log(date)

      tbody.push(
        <tr key={'TRowDay' + i}>
          <td
            className={momentDate.toDate().toString() === date.toString() ? 'curDay' : ''}
            key={`TDayHour-${dayHours[i]}`}
          >
            {dayHours[i]}
          </td>
          <td
            className={momentDate.toDate().toString() === date.toString() ? 'curDay' : ''}
            key={date}
            text=''
          >
          </td>
        </tr>
      );
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
    const { period } = this.props;
    let tbody = [];
    let splitEvents = this.splitEventsByDays();
    let date = moment(period).startOf('day').toDate();

    let events = this.getListOfEvents(splitEvents, date);

    for(let i = 0; i < 96; i++) {
      let min = i % 4 === 0 ? 0 : i % 4 === 1 ? 15 : i % 4 === 2 ? 30 : 45;
      let curCellEvents = [];
      let numberOfEvents = 0;
      let eventsList = [];

      events.forEach(event => {
        if(moment(event.startDate).startOf('minute').toString() === moment(date).hours(i / 4).minutes(min).toString())
          curCellEvents.push(event);

        if(moment(event.startDate).startOf('minute').toString() <= moment(date).hours(i / 4).minutes(min).toString() &&
          moment(event.endDate).startOf('minute').toString() >= moment(date).hours(i / 4).minutes(min).toString()
        )
          numberOfEvents++;
      });

      eventsList = this.createEvents(curCellEvents, numberOfEvents);

      tbody.push(
        <tr>
          <td
            key={date}
            date={date}
            numberOfEvents={numberOfEvents}
          >
            {eventsList.map(event => event)}
          </td>
        </tr>
      );
    }

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
        zIndex: ind + 2,
        height: eventHeight * 17 + 'px',
        width: 50 + '%',
        left: 10 * (numberOfEvents - 1 - ind) + 'px'
      }

      eventsList.push(<Event name={event.name} length={event.length} style={style} />);
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

const mapStateToProps = store => ({
  events: store.eventField.events
});

export default connect(
  mapStateToProps
)(TableDayContainer);
