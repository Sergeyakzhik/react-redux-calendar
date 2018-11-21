import React from 'react';
import './ShowMoreField.css';

import { connect } from 'react-redux';

class ShowMoreField extends React.Component {
  render() {
    return (
      <div className="show-more">
        <h1>{this.props.date}</h1>
        <div className="close-button" onClick={this.props.onEndButtonClick}>
          <i className="fas fa-times"></i>
        </div>
        <div>
          {this.props.events.map(event => event.startDate)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  events: store.showMoreField.events
});

export default connect(
  mapStateToProps
)(ShowMoreField);
