import React from 'react';
import { connect } from 'react-redux';
import EventInfoField from '../components/EventInfoField';


const EventInfoFieldContainer = (props) => {
  const {
    posX, posY, event,
  } = props;
  const style = {
    left: `${posX}px`,
    top: `${posY - 120}px`,
  };

  return (<EventInfoField event={event} style={style} />);
};

const mapStateToProps = state => ({
  posX: state.eventInfoField.posX,
  posY: state.eventInfoField.posY,
});

export default connect(
  mapStateToProps,
)(EventInfoFieldContainer);
