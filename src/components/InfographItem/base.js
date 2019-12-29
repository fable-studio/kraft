import React, { Component } from 'react';

import './base.scss';
import { UncontrolledTooltip } from 'reactstrap';

export default class BaseItemIcon extends Component {
  handleClick = () => {
    const { passContent, retContent } = this.props;

    passContent(retContent);
  }

  render () {
    const { width, height, id, tooltext } = this.props;

    return (
      <>
        <div className='default-icon mb-1' style={{ width, height }} onClick={this.handleClick} id={id}>
          {this.props.children}
        </div>
        <UncontrolledTooltip placement='left'target={id}>{tooltext}</UncontrolledTooltip>
      </>
    );
  }
}

BaseItemIcon.defaultProps = {
  width: 50,
  height: 50,
  id: 'default-icon',
  tooltext: 'sidebar-icon'
};
