/* eslint-disable */

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faExpand
} from '@fortawesome/free-solid-svg-icons';
import BaseItemIcon from './base';
import Item from '../DraggableItem';

import defaultImage from '../../assets/images/defaultImage.jpg';
import { Input, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import './image.scss';

class ImageItem extends Component {
  constructor (props) {
    super(props);

    this.state = {
      content: props.content,
      showModal: false,
      imageFit: true
    }
  }

  toggleModal = () => {
    this.setState(prevState => { return { showModal: !prevState.showModal }});
  }

  changeImageFit = () => {
    this.setState(prevState => { return { imageFit: !prevState.imageFit }});
  }

  uploadImage = e => {
    console.log(e.target.files);
    let file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.setState({
          content: reader.result
        });
      }

      reader.readAsDataURL(file)
    }
  }

  render () {
    const { maxLineWidth } = this.props,
      { showModal, content } = this.state,
      imageJSX = (
        <div className='w-100'>
          <img style={{ maxWidth: '100%', height: 'auto' }} src={content} alt={'default'} />
        </div>
      );

    console.log(content);

    return (
      <>
        <Item.Infograph>
          {imageJSX}
        </Item.Infograph>
        <Item.Editor>
          <div className='h-100 mx-2 my-3 position-relative' style={{}}>
            <div className='d-flex flex-column' style={{ fontSize: 14}}>
              <div>
                <label htmlFor='image-upload' className='d-inline'>Upload Image: </label>
                <Input id='image-upload' type='file' className='input-file d-inline ml-2' onChange={this.uploadImage}></Input>
              </div>
              <div className='mt-2'>
                <label htmlFor='image-width' className='d-inline'>Dimension: </label>
                <Input bsSize='sm' id='image-width' type='number' className='d-inline image-input-number' style={{ marginLeft: 30 }} />
                <label htmlFor='image-width' className='d-inline ml-1'>X</label>
                <Input bsSize='sm' id='image-width' type='number' className='d-inline image-input-number ml-1' />
              </div>
              <div className='mt-2'>
                <Button style={{ width: '40%' }}>Fit to page</Button>
              </div>
            </div>
            <span className='position-absolute expand-btn rounded-circle' onClick={this.toggleModal}>
              <FontAwesomeIcon icon={faExpand} />
            </span>
            <Modal
              size={'xl'}
              isOpen={showModal}
              modalTransition={{ timeout: 300 }}
              backdropTransition={{ timeout: 500 }}
              toggle={this.toggleModal}
            >
              <ModalHeader toggle={this.toggleModal} charCode='X'>Edit Image</ModalHeader>
              <ModalBody>
                <div>
                  <div className='modal-image' style={{ width: maxLineWidth }}>
                    {imageJSX}
                  </div>
                  <div className='modal-image-editor'>

                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='primary' onClick={this.toggleModal}>Close</Button>
              </ModalFooter>
            </Modal>
          </div>
        </Item.Editor>
      </>
    );
  }
}

ImageItem.defaultProps = {
  content: defaultImage,
  maxLineWidth: 500
};

class ImageIcon extends Component {
  render () {
    const { count, content, onClickFn, maxLineWidth } = this.props;
    const retContent = {
      task: {
        id: 'task-' + (count + 1),
        content: <ImageItem content={content} maxLineWidth={maxLineWidth}  />
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
