import React from 'react';
import Event from '../components/Event/Event';

class EventContainer extends React.Component {

  setEventsList = () => {
    const { eventsList } = this.props;
    let events = [];

    for(let i = 0; i < eventsList.length; i++) {
      console.log(eventsList[i])
      events.push(
        <Event
          key={'Event ' + i}
          name={eventsList[i].name}
        />
      );
    }

    return events;
  }

  render() {
    return (
      <div className="eventsList">
        {this.setEventsList()}
      </div>
    );
  }
}

export default EventContainer;
