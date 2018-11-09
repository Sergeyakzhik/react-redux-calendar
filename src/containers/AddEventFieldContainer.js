import React from 'react';
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class AddEventFieldContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      endDate: moment()
    }
  }

  getEndDate = () => this.state.startDate ? this.state.startDate : moment();

  handleStartDateChange = date => {
    console.log(date > this.state.endDate)
    this.setState({
      startDate: date,
      endDate: date > this.state.endDate ? date : this.state.endDate
    });
  }

  handleEndDateChange = date => {
    this.setState({
      endDate: date
    });
  }

  getCurrentTime = () => {
    let date = new Date();
    return [date.getHours(), date.getMinutes()];
  }

  render() {
    return (
      <AddEventField startDate={this.state.startDate} endDate={this.state.endDate} onChange={this.handleEndDateChange}
        minDate={this.state.startDate} minTime={moment().hours(this.getCurrentTime()[0]).minutes(this.getCurrentTime()[1] - 30)}
        maxTime={moment().hours(23).minutes(30)}
      />
    );
  }
}

export default AddEventFieldContainer;
