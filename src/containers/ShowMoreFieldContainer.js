import ShowMoreField from '../components/ShowMoreField';
import React from 'react';

import { connect } from 'react-redux';
import { toggleShowMoreField } from '../store/actions/showMoreField';

class ShowMoreFieldContainer extends React.Component {

  handleCloseButtonClick = e => this.props.toggleShowMoreField(false, []);

  render() {
    return (
      <ShowMoreField
        events={this.props.events}
        onCloseButtonClick={this.handleCloseButtonClick}
      />
    );
  }
}

const mapStateToProps = store => ({
  events: store.showMoreField.events
});

const mapDispatchToProps = dispatch => ({
  toggleShowMoreField: (isActive, events) => dispatch(toggleShowMoreField(isActive, events)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowMoreFieldContainer);
