import React from 'react';
import CellContainer from './CellContainer.js';
import TableDay from '../components/TableDay/TableDay';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dayHours = ['12am', '1am', '2am', '3am', '4am', '5am',
                  '6am', '7am', '8am', '9am', '10am', '11am',
                  '12pm', '1pm', '2pm', '3pm', '4pm', '5pm',
                  '6am', '7am', '8am', '9am', '10am', '11am'];

class TableDayContainer extends React.Component {
  createRows = () => {
    let tbody = [];
    let curHour = new Date().getHours();
    let date = new Date();
    let realDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let curDate = new Date(this.props.curPeriod.getFullYear(), this.props.curPeriod.getMonth(), this.props.curPeriod.getDate());
    let isCurrentDay = JSON.stringify(realDate) == JSON.stringify(curDate);

    for (let i = 0; i < 24; i++) {
      let cells = [];

      cells.push(<CellContainer className={isCurrentDay && i == curHour ? 'curDay' : ''} key={`TDay-${i}`} text='' />);
      cells.unshift(<CellContainer className={isCurrentDay && i == curHour ? 'curDay' : ''} key={`TDayHour-${dayHours[i]}`} text={dayHours[i]} />);
      tbody.push(<tr>{cells}</tr>);
    }
    return tbody;
  }

  render() {
    return (
      <TableDay date={`${this.props.curPeriod.getMonth() + 1}/${this.props.curPeriod.getDate()}/${this.props.curPeriod.getFullYear()}`}
        tableRows={this.createRows()}
      />
    );
  }
}

export default TableDayContainer;
