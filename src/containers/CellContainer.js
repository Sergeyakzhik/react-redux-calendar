import React from 'react';
import Cell from '../components/Cell/Cell'

class CellContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasEvent: false,
      numberOfEvents: 0
    }
  }

  render() {
    return (
      <Cell className={this.props.className} text={this.props.text} />
    );
  }
}

export default CellContainer;
