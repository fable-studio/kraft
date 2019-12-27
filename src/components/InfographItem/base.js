import React, { Component } from 'react';

import './base.scss';

export default class BaseItemIcon extends Component {
  handleClick = () => {
    const { passContent, retContent } = this.props;

    passContent(retContent);
  }

  render () {
    const { width, height } = this.props;

    return (
      <div className='default-icon mb-1' style={{ width, height }} onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
}

BaseItemIcon.defaultProps = {
  width: 50,
  height: 50
};
