import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartPie
} from '@fortawesome/free-solid-svg-icons';
import BaseItemIcon from './base';

export default class Chart extends Component {
  render () {
    let { type, content, onClickFn } = this.props,
      retContent;

    // @todo: Handle cases for each type
    if (type === 'column2d') {
      retContent = content;
    } else if (type === 'line') {

    } else if (type === 'area2d') {

    }

    return (
      <BaseItemIcon retContent={retContent} passContent={onClickFn}>
        <FontAwesomeIcon icon={faChartPie} />
      </BaseItemIcon>
    );
  }
}

Chart.defaultProps = {
  type: 'column2d',
  content: 'Inset chart here',
  onClickFn: () => {}
}