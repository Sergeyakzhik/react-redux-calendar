import React from 'react';
import moment from "moment";
import AddEventField from '../components/AddEventField/AddEventField';

import { connect } from 'react-redux';
import {
  closeAddEventField,
  changeStartDate,
  changeEndDate
} from '../store/actions/addEventFieldActions';

import "react-datepicker/dist/react-datepicker.css";

class AddEventFieldContainer extends React.Component {

  getEndDate = () => this.props.startDate ? this.props.startDate : moment();

  handleStartDateChange = date => {
    this.props.changeStartDate(date);
    this.props.changeEndDate(date > this.props.endDate ? date : this.props.endDate);
  }

  handleEndDateChange = date => {
    this.props.changeEndDate(date);
  }

  getCurrentTime = () => {
    let date = new Date();
    return [date.getHours(), date.getMinutes()];
  }

  handleEndButtonClick = (e) => {
    if(this.props.isActive === true)
      return this.props.closeAddEventField(false);
  }

  setMinEndDateTime = () => {
    let curDate = moment()._d.toString().split(' ', 3).join();
    let propsEndDate = this.props.endDate._d.toString().split(' ', 3).join();

    if(curDate === propsEndDate)
      return moment().hours(this.getCurrentTime()[0]).minutes(this.getCurrentTime()[1] - 30);
    else
      return moment().hours(23).minutes(60);
  }

  render() {
    const { startDate, endDate } = this.props;
    const currentTime = moment();
    return (
      <AddEventField
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={this.handleStartDateChange}
        onEndDateChange={this.handleEndDateChange}
        onEndButtonClick={this.handleEndButtonClick}
        minDate={currentTime}
        minStartDateTime={moment().hours(this.getCurrentTime()[0]).minutes(this.getCurrentTime()[1] - 30)}
        minEndDateTime={this.setMinEndDateTime()}
        maxTime={moment().hours(23).minutes(30)}
      />
    );
  }
}

const mapStateToProps = store => ({
  isActive: store.eventField.isActive,
  startDate: store.eventField.startDate,
  endDate: store.eventField.endDate
});

const mapDispatchToProps = dispatch => ({
  closeAddEventField: isActive => dispatch(closeAddEventField(isActive)),
  changeStartDate: startDate => dispatch(changeStartDate(startDate)),
  changeEndDate: endDate => dispatch(changeEndDate(endDate))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEventFieldContainer);
