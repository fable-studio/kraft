import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStarHalfAlt
} from '@fortawesome/free-solid-svg-icons';
import BaseItemIcon from './base';

class RatingIcon extends Component {
  render () {
    const { type, content, onClickFn } = this.props;
    let retContent;

    // @todo: Handle cases for each type
    if (type === 'column2d') {
      retContent = content;
    } else if (type === 'line') {

    } else if (type === 'area2d') {

    }

    return (
      <BaseItemIcon retContent={retContent} passContent={onClickFn}>
        <FontAwesomeIcon icon={faStarHalfAlt} />
      </BaseItemIcon>
    );
  }
}

RatingIcon.defaultProps = {
  type: 'column2d',
  content: 'Inset chart here',
  onClickFn: () => {}
};

export {
  RatingIcon
};
