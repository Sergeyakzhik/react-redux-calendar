import React from 'react';

import { connect } from 'react-redux';
import ShowMoreField from '../components/ShowMoreField';
import { toggleShowMoreField } from '../store/actions/showMoreField';

class ShowMoreFieldContainer extends React.Component {
  handleCloseButtonClick = e => this.props.toggleShowMoreField(false, []);

  render() {
    const { events } = this.props;

    return (
      <ShowMoreField
        events={events}
        onCloseButtonClick={this.handleCloseButtonClick}
      />
    );
  }
}

const mapStateToProps = state => ({
  events: state.showMoreField.events,
});

const mapDispatchToProps = dispatch => ({
  toggleShowMoreField: (isActive, events) => dispatch(toggleShowMoreField(isActive, events)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowMoreFieldContainer);
