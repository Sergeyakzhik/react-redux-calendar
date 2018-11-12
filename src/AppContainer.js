import React, { Component } from 'react';
import App from './App';
import moment from "moment";

import { connect } from 'react-redux';
import { toggleTimeSegment } from './store/actions/timeSegmentActions';
import { changeTimePeriod } from './store/actions/changePeriodAction';
import { openAddEventField } from './store/actions/addEventFieldActions';

class AppContainer extends Component {

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

  handleNewEventClick = (e) => {
    let currentTime = moment();
    if(this.props.isActive === true)
      return this.props.openAddEventField(false);
    else
      return this.props.openAddEventField(true, currentTime, currentTime);
  }

  render() {
    const { table, period, isActive } = this.props;
    return (
      <App table={table} period={period} isActive={isActive}
        onPeriodTogglerClick={this.handlePeriodTogglerClick}
        onNewEventClick={this.handleNewEventClick}
        onPeriodChange={this.handlePeriodChange}
      />
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
  openAddEventField: (isActive, startDate, endDate) => dispatch(openAddEventField(isActive, startDate, endDate))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
