import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMap
} from '@fortawesome/free-solid-svg-icons';
import BaseItemIcon from './base';

export default class MapsIcon extends Component {
  render () {
    let { type, content, onClickFn } = this.props,
      retContent;

    // @todo: Handle cases for each type
    if (type === 'world') {
      retContent = content;
    } else if (type === 'usa') {

    }

    return (
      <BaseItemIcon retContent={retContent} passContent={onClickFn}>
        <FontAwesomeIcon icon={faMap} />
      </BaseItemIcon>
    );
  }
}

MapsIcon.defaultProps = {
  type: 'world',
  content: 'Inset map here',
  onClickFn: () => {}
}

export {
  MapsIcon
}