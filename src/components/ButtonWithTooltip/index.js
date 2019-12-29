import React, { Component } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';

export default class ButtonWithTooltip extends Component {
  state = {
    showTooltip: false
  };

  // showTooltip = () => { this.setState({ showTooltip: true }); }
  // hideTooltip = () => { this.setState({ showTooltip: true }); }

  render () {
    let { showTooltip } = this.state,
      btnProps = {...this.props},
      toolTipProps = this.props.tooltip;

    delete btnProps.tooltip;
    delete btnProps.children;

    return (
      <div onMouseOver={this.showTooltip} onMouseOut={this.hideTooltip}>
        <Button {...btnProps}>{this.props.children}</Button>
        <UncontrolledTooltip placement={toolTipProps.placement} target={btnProps.id}>
          {toolTipProps.tooltext}
        </UncontrolledTooltip>
      </div>
    );
  }
}