import React, { Component } from 'react';
import './App.css';
import TableMonthContainer from './containers/TableMonthContainer.js';
import TableWeekContainer from './containers/TableWeekContainer.js';
import TableDayContainer from './containers/TableDayContainer.js';
import TimeSegmentToggler from './components/TimeSegmentToggler/TimeSegmentToggler';
import PeriodToggler from './components/PeriodToggler/PeriodToggler';
import AddEventField from './components/AddEventField/AddEventField';

import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curTable: 'Month',
      curPeriod: this.setCurrentPeriod(),
    }
  }

  setCurrentPeriod = () => new Date();

  getCurrentYear = () => this.state.curPeriod.getFullYear();

  getCurrentMonth = () => this.state.curPeriod.getMonth();

  shouldComponentUpdate = (nextProps, nextState) => {
    if(this.state.curTable === nextState.curTable && this.state.curPeriod === nextState.curPeriod && this.state.isActive === nextState.isActive) {
      return false;
    }
    return true
  }

  handlePeriodChange = (e) => {
    this.setState({ curTable: e.target.value });
  }

  handlePeriodTogglerClick = (e) => {
    let curYear = this.state.curPeriod.getFullYear();
    let curMonth = this.state.curPeriod.getMonth();
    let curDate = this.state.curPeriod.getDate();
    if(e.target.id === 'left-button') {
      if(this.props.period === 'Month')
        this.setState({ curPeriod: new Date(curYear, curMonth - 1) });
      if(this.state.curTable === 'Week')
        this.setState({ curPeriod: new Date(curYear, curMonth, curDate - 7) });
      if(this.state.curTable === 'Day')
        this.setState({ curPeriod: new Date(curYear, curMonth, curDate - 1) });
    }
    if(e.target.id === 'right-button') {
      if(this.state.curTable === 'Month')
        this.setState({ curPeriod: new Date(curYear, curMonth + 1) });
      if(this.state.curTable === 'Week')
        this.setState({ curPeriod: new Date(curYear, curMonth, curDate + 7) });
      if(this.state.curTable === 'Day')
        this.setState({ curPeriod: new Date(curYear, curMonth, curDate + 1) });
    }
  }

  openAddEventField = (e) => {
    this.setState({ isActive: true });
  }

  render() {
    const { period } = this.props;
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
            {this.state.isActive ? <AddEventField isActive={this.state.isActive} /> : null}
            <div className="main-table">
              {
                period === 'Month' ? <TableMonthContainer curPeriod={this.state.curPeriod} /> :
                (this.state.curTable === 'Week' ? <TableWeekContainer curPeriod={this.state.curPeriod} /> : <TableDayContainer curPeriod={this.state.curPeriod} />)
              }
            </div>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  console.log(store);
  return {
    period: store.calendar.period
  }
}

export default connect(mapStateToProps)(App);
