import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage
} from '@fortawesome/free-solid-svg-icons';
import BaseItemIcon from './base';
import Item from '../DraggableItem';

import defaultImage from '../../assets/images/defaultImage.jpg';

class ImageItem extends Component {
  render () {
    const { content } = this.props;

    return (
      <>
        <Item.Infograph>
          <div className='w-100'>
            <img style={{ maxWidth: '100%', height: 'auto' }} src={content} alt={'default'} />
          </div>
        </Item.Infograph>
        <Item.Editor>
          <div></div>
        </Item.Editor>
      </>
    );
  }
}

ImageItem.defaultProps = {
  content: defaultImage
};

class ImageIcon extends Component {
  render () {
    const { count, content, onClickFn } = this.props;
    const retContent = {
      task: {
        id: 'task-' + (count + 1),
        content: <ImageItem content={content} />
      }
    };

    return (
      <BaseItemIcon retContent={retContent} passContent={onClickFn}>
        <FontAwesomeIcon icon={faImage} />
      </BaseItemIcon>
    );
  }
}

ImageIcon.defaultProps = {
  content: defaultImage,
  onClickFn: () => {}
};

export {
  ImageIcon,
  ImageItem
};
