import React from 'react';
import '../components/Cell/Cell.css';
import '../components/Cell/Cell.css';
import EventContainer from './EventContainer';

class CellContainer extends React.Component {

  createEventsList = () => {

  }

  render() {
    const { eventsList } = this.props;
    return (
      <td className={this.props.className}>
        <h4>{this.props.text}</h4>
        {eventsList ? <EventContainer eventsList={eventsList} /> : null}
      </td>
    );
  }
}

export default CellContainer;
