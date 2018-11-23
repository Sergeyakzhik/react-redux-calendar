import React from 'react';
import TableDay from '../components/TableDay/TableDay';
import EventContainer from './EventContainer';
import moment from "moment";
import { dayHours } from '../constants/constants';

import { connect } from 'react-redux';
import {
  openAddEventField,
  changeStartDate,
  changeEndDate
} from '../store/actions/addEventFieldActions';

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
        <tr className="table-row" key={'TRowDay' + i}>
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

  handleCellClick = e => {
    const date = moment(new Date(e.target.attributes.date.value));

    this.props.changeStartDate(date);
    this.props.changeEndDate(date);
    this.props.openAddEventField(true);
  }

  createSkeletonBody = () => {
    const { period } = this.props;
    let tbody = [];
    let splitEvents = this.splitEventsByDays();
    let date = moment(period).startOf('day').toDate();

    let events = this.getListOfEvents(splitEvents, date);

    events.sort(this.sortEvents('timeDiff'));

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
            onClick={this.handleCellClick}
            date={moment(date).hours(i / 4).minutes(min).toDate()}
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
    let eventHeight;
    let style = {};

    events.forEach((event, ind) => {
      eventHeight = event.timeDiff / 15;

      style = {
        zIndex: 20 + numberOfEvents,
        height: eventHeight * 17 + 'px',
        width: 99 - (numberOfEvents - 1) * 15 + '%'
      }

      eventsList.push(
        <EventContainer
          event={event}
          targetKey={event.name + event.startDate.toString() + event.endDate.toString()}
          style={style}
        />
      );

      numberOfEvents--;
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
        curEvent.timeDiff = moment(curEvent.endDate).diff(moment(curEvent.startDate), 'minutes');

        event.startDate = moment(curEvent.endDate).date(curEvent.endDate.date() + 1).startOf('day');
        event.timeDiff = moment(event.endDate).diff(moment(event.startDate), 'minutes');
        splitEvents.push(curEvent);
      }

      splitEvents.push(event);
    }

    return splitEvents;
  }

  sortEvents = property => {
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result;
    }
  }

  isLongerThanDay = event => {
    const startDate = event.startDate;
    const endDate = event.endDate;
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
  openAddEventField: isActive => dispatch(openAddEventField(isActive)),
  changeStartDate: startDate => dispatch(changeStartDate(startDate)),
  changeEndDate: endDate => dispatch(changeEndDate(endDate))
});

const mapStateToProps = store => ({
  events: store.eventField.events
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableDayContainer);
