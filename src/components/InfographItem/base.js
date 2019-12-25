import React, { Component } from 'react';

import './base.scss';

export default class BaseItemIcon extends Component {
  handleClick = () => {
    let { passContent, retContent } = this.props;

    passContent(retContent);
  }

  render () {
    let { width, height } = this.props;

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
}