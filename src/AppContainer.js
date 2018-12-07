import React, { Component } from 'react';
import App from './App';
import moment from "moment";

import { connect } from 'react-redux';
import {
  changeTimePeriod,
  toggleTimeSegment
} from './store/actions/calendar';
import { openAddEventField } from './store/actions/addEventField';
import { changeStyle } from './store/actions/style';

class AppContainer extends Component {

  setCurrentPeriod = () => moment();

  getCurrentYear = () => this.props.period.getFullYear();

  getCurrentMonth = () => this.props.period.getMonth();

  shouldComponentUpdate = (nextProps, nextState) => {
    if(
      this.props.table === nextProps.table && this.props.period === nextProps.period
      && this.props.isActive === nextProps.isActive && this.props.style === nextProps.style
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
    let curYear = moment(period).year();
    let curMonth = moment(period).month();
    let curDate = moment(period).date();

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

  handleNewEventClick = e => {
    if(this.props.isActive === true)
      return this.props.openAddEventField(false);
    else
      return this.props.openAddEventField(true);
  }

  handleStyleTogglerClick = e => {
    if(e.target.value === 'style1')
      this.props.changeStyle('style1');
    if(e.target.value === 'style2')
      this.props.changeStyle('style2');
  }

  render() {
    const { table, period, isActive } = this.props;

    return (
      <App
        curStyle={this.props.style}
        table={table} period={period} isActive={isActive}
        onPeriodTogglerClick={this.handlePeriodTogglerClick}
        onNewEventClick={this.handleNewEventClick}
        onPeriodChange={this.handlePeriodChange}
        onStyleTogglerClick={this.handleStyleTogglerClick}
      />
    );
  }
}

const mapStateToProps = store => ({
  table: store.calendar.table,
  period: store.calendar.period,
  isActive: store.eventField.isActive,
  events: store.calendar.events,
  style: store.style.style
});

const mapDispatchToProps = dispatch => ({
  toggleTimeSegment: table => dispatch(toggleTimeSegment(table)),
  changeTimePeriod: period => dispatch(changeTimePeriod(period)),
  openAddEventField: isActive => dispatch(openAddEventField(isActive)),
  changeStyle: style => dispatch(changeStyle(style))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
