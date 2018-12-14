import React from 'react';
import './App.css';
import TableMonthContainer from './containers/TableMonthContainer';
import TableWeekContainer from './containers/TableWeekContainer';
import TableDayContainer from './containers/TableDayContainer';
import EditEventFieldContainer from './containers/EditEventFieldContainer';
import TimeSegmentToggler from './components/TimeSegmentToggler';
import PeriodToggler from './components/PeriodToggler';
import StyleToggler from './components/StyleToggler';

import {
  MONTH,
  WEEK,
  DAY,
} from './constants/constants';

const App = (props) => {
  const {
    curStyle,
    table,
    isActive,
    onPeriodTogglerClick,
    onNewEventClick,
    onPeriodChange,
    onStyleTogglerClick,
  } = props;

  return (
    <div className={`App ${curStyle}`}>
      <div className="container">
        <header className="App-header">
          <div className="row">
            <div className="col-sm-2 text-left">
              <PeriodToggler onPeriodTogglerClick={onPeriodTogglerClick} />
            </div>
            <div className="col-sm-2 text-left">
              <StyleToggler onStyleTogglerClick={onStyleTogglerClick} style={curStyle} />
            </div>
            <div className="col-sm-4">
              <h1>Calendar</h1>
            </div>
            <div className="col-sm-2 text-right">
              <button type="button" className="btn btn-primary add-event-button" onClick={onNewEventClick}>Add Event</button>
            </div>
            <div className="col-sm-2 text-right">
              <TimeSegmentToggler onPeriodChange={onPeriodChange} />
            </div>
          </div>
        </header>
        <main>
          {isActive ? <EditEventFieldContainer /> : null}
          <div className="main-table">
            { table === MONTH && <TableMonthContainer /> }
            { table === WEEK && <TableWeekContainer /> }
            { table === DAY && <TableDayContainer /> }
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
