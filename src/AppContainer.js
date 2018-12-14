import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import App from './App';
import {
  STYLE1,
  STYLE2,
  MONTH,
  WEEK,
  DAY,
  LEFT_BUTTON,
  RIGHT_BUTTON,
  ADD_EVENT,
} from './constants/constants';

import { changeTimePeriod, toggleTimeSegment, openEditEventField } from './store/actions/calendar';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: STYLE2,
    };
  }

  getCurrentYear = () => this.props.period.getFullYear();

  getCurrentMonth = () => this.props.period.getMonth();

  shouldComponentUpdate = (nextProps, nextState) => {
    const {
      table,
      period,
      isActive,
      style,
    } = this.props;

    return !(table === nextProps.table
      && period === nextProps.period
      && isActive === nextProps.isActive
      && style === nextState.style);
  };

  handlePeriodChange = e => this.props.toggleTimeSegment(e.target.value);

  handlePeriodTogglerClick = (e) => {
    const { table, period, changeTimePeriod } = this.props;
    const curPeriod = moment(period);
    const curYear = curPeriod.year();
    const curMonth = curPeriod.month();
    const curDate = curPeriod.date();

    if (e === LEFT_BUTTON) {
      if (table === MONTH) changeTimePeriod(new Date(curYear, curMonth - 1));
      if (table === WEEK) changeTimePeriod(new Date(curYear, curMonth, curDate - 7));
      if (table === DAY) changeTimePeriod(new Date(curYear, curMonth, curDate - 1));
    }
    if (e === RIGHT_BUTTON) {
      if (table === MONTH) {
        changeTimePeriod(new Date(curYear, curMonth + 1));
      }
      if (table === WEEK) {
        changeTimePeriod(new Date(curYear, curMonth, curDate + 7));
      }
      if (table === DAY) {
        changeTimePeriod(new Date(curYear, curMonth, curDate + 1));
      }
    }
  };

  handleNewEventClick = () => {
    const { isActive, openEditEventField } = this.props;

    isActive ? openEditEventField(false, '') : openEditEventField(true, ADD_EVENT);
  };

  handleStyleTogglerClick = (e) => {
    if (e === STYLE1) this.setState({ style: STYLE1 });
    if (e === STYLE2) this.setState({ style: STYLE2 });
  };

  render() {
    const { table, isActive } = this.props;
    const { style } = this.state;

    return (
      <App
        curStyle={style}
        table={table}
        isActive={isActive}
        onPeriodTogglerClick={this.handlePeriodTogglerClick}
        onNewEventClick={this.handleNewEventClick}
        onPeriodChange={this.handlePeriodChange}
        onStyleTogglerClick={this.handleStyleTogglerClick}
      />
    );
  }
}

const mapStateToProps = state => ({
  table: state.calendar.table,
  period: state.calendar.period,
  isActive: state.calendar.isActive,
});

const mapDispatchToProps = ({
  toggleTimeSegment,
  changeTimePeriod,
  openEditEventField,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
