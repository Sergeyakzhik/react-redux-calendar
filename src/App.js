import React, { Component } from 'react';
import './App.css';
import TableMonthContainer from './containers/TableMonthContainer.js';
import TableWeekContainer from './containers/TableWeekContainer.js';
import TableDayContainer from './containers/TableDayContainer.js';
import AddEventFieldContainer from './containers/AddEventFieldContainer.js';
import TimeSegmentToggler from './components/TimeSegmentToggler/TimeSegmentToggler';
import PeriodToggler from './components/PeriodToggler/PeriodToggler';

import { connect } from 'react-redux';
import { toggleTimeSegment } from './store/actions/timeSegmentActions';
import { changeTimePeriod } from './store/actions/changePeriodAction';
import { toggleAddEventField } from './store/actions/addEventFieldAction';

class App extends Component {

  setCurrentPeriod = () => new Date();

  getCurrentYear = () => this.props.period.getFullYear();

  getCurrentMonth = () => this.props.period.getMonth();

  shouldComponentUpdate = (nextProps, nextState) => {
    if(
      this.props.table === nextProps.table && this.props.period === nextProps.period
      && this.props.isActive === nextProps.isActive
    ){
      return false;
    }
    return true
  }

  handlePeriodChange = (e) => {
    this.props.toggleTimeSegment(e.target.value);
  }

  handlePeriodTogglerClick = (e) => {
    const { table, period, changeTimePeriod } = this.props;
    let curYear = period.getFullYear();
    let curMonth = period.getMonth();
    let curDate = period.getDate();

    if(e.target.id === 'left-button') {
      if(table === 'Month')
        changeTimePeriod(new Date(curYear, curMonth - 1));
      if(table === 'Week')
        changeTimePeriod(new Date(curYear, curMonth, curDate - 7));
      if(table === 'Day')
        changeTimePeriod(new Date(curYear, curMonth, curDate - 1));
    }
    if(e.target.id === 'right-button') {
      if(table === 'Month')
        changeTimePeriod(new Date(curYear, curMonth + 1));
      if(table === 'Week')
        changeTimePeriod(new Date(curYear, curMonth, curDate + 7));
      if(table === 'Day')
        changeTimePeriod(new Date(curYear, curMonth, curDate + 1));
    }
  }

  openAddEventField = (e) => {
    if(this.props.isActive === true)
      return this.props.toggleAddEventField(false);
    else
      return this.props.toggleAddEventField(true);
  }

  render() {
    const { table, period, isActive } = this.props;
    return (
      <div className="App">
        <div className="container">
          <header className="App-header">
            <div className="row">
              <div className="col-sm-4 text-left">
                <PeriodToggler onPeriodTogglerClick={this.handlePeriodTogglerClick} />
              </div>
              <div className="col-sm-4">
                <h1>Calendar</h1>
              </div>
              <div className="col-sm-4 text-right">
                <div className="row">
                  <div className="col-6 text-right">
                    <button type="button" className="btn btn-primary add-event-button" onClick={this.openAddEventField}>Add Event</button>
                  </div>
                  <div className="col-6 text-right">
                    <TimeSegmentToggler onPeriodChange={this.handlePeriodChange} />
                  </div>
                </div>
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
}

const mapStateToProps = store => ({
  table: store.calendar.table,
  period: store.calendar.period,
  isActive: store.eventField.isActive
});

const mapDispatchToProps = dispatch => ({
  toggleTimeSegment: table => dispatch(toggleTimeSegment(table)),
  changeTimePeriod: period => dispatch(changeTimePeriod(period)),
  toggleAddEventField: isActive => dispatch(toggleAddEventField(isActive))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
