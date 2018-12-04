import React from 'react';
import EventInfoField from '../components/EventInfoField/EventInfoField';

import { connect } from 'react-redux';

class EventInfoFieldContainer extends React.Component {

  render() {
    const { posX, posY } = this.props;
    const style = {
      left: posX + 'px',
      top: posY + 'px'
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
