import React from 'react';
import CellContainer from './CellContainer.js';
import TableDay from '../components/TableDay/TableDay';
import { dayHours } from '../constants/constants';

class TableDayContainer extends React.Component {

  createRows = () => {
    const { period } = this.props;
    let tbody = [];
    let date = new Date();
    let curHour = date.getHours();
    let realDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let curDate = new Date(period.getFullYear(), period.getMonth(), period.getDate());
    let isCurrentDay = realDate.getTime() === curDate.getTime();

    for (let i = 0; i < 24; i++) {
      tbody.push(
        <tr key={'TRowDay' + i}>
          <CellContainer
            className={isCurrentDay && i === curHour ? 'curDay' : ''}
            key={`TDayHour-${dayHours[i]}`}
            text={dayHours[i]}
          />
          <CellContainer
            className={isCurrentDay && i === curHour ? 'curDay' : ''}
            key={`TDay-${i}`}
            text=''
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
        date={`${period.getMonth() + 1}/${period.getDate()}/${period.getFullYear()}`}
        tableRows={this.createRows()}
      />
    );
  }
}

export default TableDayContainer;
