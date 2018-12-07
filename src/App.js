import React from 'react';
import './App.css';
import TableMonthContainer from './containers/TableMonthContainer.js';
import TableWeekContainer from './containers/TableWeekContainer.js';
import TableDayContainer from './containers/TableDayContainer.js';
import AddEventFieldContainer from './containers/AddEventFieldContainer.js';
import TimeSegmentToggler from './components/TimeSegmentToggler/index';
import PeriodToggler from './components/PeriodToggler/index';
import StyleToggler from './components/StyleToggler/index';

let App = props => {
  const {
    table,
    period,
    isActive,
    onPeriodTogglerClick,
    onNewEventClick,
    onPeriodChange,
    onStyleTogglerClick
  } = props;

  return (
    <div className={`App ` + props.curStyle}>
      <div className="container">
        <header className="App-header">
          <div className="row">
            <div className="col-sm-2 text-left">
              <PeriodToggler onPeriodTogglerClick={onPeriodTogglerClick} />
            </div>
            <div className="col-sm-2 text-left">
              <StyleToggler onStyleTogglerClick={onStyleTogglerClick} style={props.style}/>
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
          {isActive ? <AddEventFieldContainer isActive={isActive} /> : null}
          <div className="main-table">
            {
              table === 'Month' ? <TableMonthContainer period={period} /> :
              (table === 'Week' ? <TableWeekContainer period={period} /> : <TableDayContainer period={period} />)
            }
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
