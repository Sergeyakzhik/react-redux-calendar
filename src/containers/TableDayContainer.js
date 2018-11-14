import React from 'react';
import CellContainer from './CellContainer.js';
import TableDay from '../components/TableDay/TableDay';
import moment from "moment";
import { dayHours } from '../constants/constants';

import { connect } from 'react-redux';

class TableDayContainer extends React.Component {

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

  createRows = () => {
    const { period } = this.props;
    let tbody = [];
    let momentDate = moment().startOf('hour');
    let periodDate = moment(period).startOf('hour');

    console.log(momentDate)

    for (let i = 0; i < 24; i++) {
      let date = moment(period).hour(i).startOf('hour').toDate();
      tbody.push(
        <tr key={'TRowDay' + i}>
          <CellContainer
            className={momentDate.toDate().toString() === periodDate.hour(i).toDate().toString() ? 'curDay' : ''}
            key={`TDayHour-${dayHours[i]}`}
            text={dayHours[i]}
          />
          <CellContainer
            className={momentDate.toDate().toString() === periodDate.toDate().toString() ? 'curDay' : ''}
            key={date}
            text=''
            eventsList={this.getListOfEvents(date)}
          />
        </tr>
      );
    }
    return tbody;
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
