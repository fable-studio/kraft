import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFont
} from '@fortawesome/free-solid-svg-icons';
import BaseItemIcon from './base';

export default class Text extends Component {
  render () {
    let { type, content, onClickFn } = this.props,
      retContent;

    // @todo: Handle cases for each type
    if (type === 'normal') {
      retContent = content;
    } else if (type === 'qoute') {

    } else if (type === 'heading') {

    }

    return (
      <BaseItemIcon retContent={retContent} passContent={onClickFn}>
        <FontAwesomeIcon icon={faFont} />
      </BaseItemIcon>
    );
  }
}

Text.defaultProps = {
  type: 'normal',
  content: 'Inset text here',
  onClickFn: () => {}
}