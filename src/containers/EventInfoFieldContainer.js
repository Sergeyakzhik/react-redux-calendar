import React from 'react';
import EventInfoField from '../components/EventInfoField/EventInfoField';

import { connect } from 'react-redux';

let startX, startY;

class EventInfoFieldContainer extends React.Component {

  render() {
    const style = {
      left: this.props.posX - 400 + 'px',
      top: this.props.posY - 400 + 'px'
    };

    return ( <EventInfoField event={this.props.event} style={style} /> );
  }
}

const mapStateToProps = store => ({
  events: store.calendar.events,
  posX: store.eventInfoField.posX,
  posY: store.eventInfoField.posY,
  curTarget: store.eventInfoField.curTarget
});

export default connect(
  mapStateToProps
)(EventInfoFieldContainer);
