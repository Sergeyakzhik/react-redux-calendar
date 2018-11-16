import React from 'react';
import Event from '../components/Event/Event';

class EventContainer extends React.Component {

  setEventsList = () => {
    const { eventsList } = this.props;
    let events = [];

    for(let i = 0; i < eventsList.length; i++) {
      events.push(
        <Event
          key={'Event ' + i}
          name={eventsList[i].name}
          length={eventsList[i].length}
        />
      );
    }
    return events;
  }

  render() {
    return (
      <div className="">
        {this.setEventsList()}
      </div>
    );
  }
}

export default EventContainer;
