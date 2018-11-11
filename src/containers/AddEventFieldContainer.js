import React from 'react';
import DatePicker from "react-datepicker";
import moment from "moment";
import AddEventField from '../components/AddEventField/AddEventField';

import { connect } from 'react-redux';
import { toggleAddEventField } from '../store/actions/addEventFieldAction';

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

  handleEndButtonClick = (e) => {
    console.log('11')
    if(this.props.isActive === true)
      return this.props.toggleAddEventField(false);
    else
      return this.props.toggleAddEventField(true);
  }

  render() {
    return (
      <AddEventField startDate={this.state.startDate} endDate={this.state.endDate} onChange={this.handleEndDateChange} onEndButtonClick={this.handleEndButtonClick}
        minDate={this.state.startDate} minTime={moment().hours(this.getCurrentTime()[0]).minutes(this.getCurrentTime()[1] - 30)}
        maxTime={moment().hours(23).minutes(30)}
      />
    );
  }
}


const mapStateToProps = store => ({
  isActive: store.eventField.isActive
});

const mapDispatchToProps = dispatch => ({
  toggleAddEventField: isActive => dispatch(toggleAddEventField(isActive))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEventFieldContainer);
