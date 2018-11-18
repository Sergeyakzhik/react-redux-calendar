import React from 'react';
import TableWeek from '../components/TableWeek/TableWeek';
import moment from "moment";
import { weekdays, dayHours } from '../constants/constants';

import { connect } from 'react-redux';

class TableWeekContainer extends React.Component {

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
    let datesArray = this.fillDatesArray();

    for(let i = 0; i < datesArray.length; i++) {
      thead.push(<th key={'THWeek' + i}>{weekdays[i]} {moment(datesArray[i]).date()}</th>);
    }
    thead.unshift(<th key={'THWeekEmpty'}></th>)

    return <tr>{thead}</tr>;
  }

  fillDatesArray = () => {
    let array = [];
    const { period } = this.props;
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

  getDaysInCurMonth = () => moment(this.props.period).daysInMonth();

  getDaysInPrevMonth = () => moment(new Date(this.props.period.getFullYear(), this.props.period.getMonth() - 1)).daysInMonth();

  countEmptyCells = (year, month) => {
    return new Date(year, month).getDay();
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
            eventsList={this.getListOfEvents(datesArray[j])}
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
    let skeletonBody = [];
    let rows = [];
    let tbody = [];

    for(let i = 0; i < 48; i++)
      rows.push([]);

    for(let i = 0; i < 7; i++) {
      let events = this.getListOfEvents(datesArray[i]);

      for(let j = 0; j < 48; j++) {

        rows[j].push(
          <td
            key={datesArray[i]}
            eventsList={events}
            date={datesArray[j]}
          >
          </td>
        );

      //  events.shift();
      }
    }

    for(let i = 0; i < 48; i++)
      tbody.push(<tr key='TSkeletonBody'>{rows[i]}</tr>);

    skeletonBody.push(
      <>
        {tbody}
      </>
    );

    console.log(skeletonBody)

    return skeletonBody;
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
