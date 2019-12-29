/* eslint-disable */

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage
} from '@fortawesome/free-solid-svg-icons';
import BaseItemIcon from './base';
import Item from '../DraggableItem';

import defaultImage from '../../assets/images/defaultImage.jpg';
import { Input } from 'reactstrap';

import './image.scss';

class ImageItem extends Component {
  constructor (props) {
    super(props);

    this.state = {
      content: props.content,
      imageFit: true,
      filters: {
        contrast: {
          value: 100,
          max: '200',
          min: 0,
          unit: '%'
        },
        hue: {
          value: 0,
          max: 360,
          min: 0,
          unit: 'deg'
        },
        brightness: {
          value: 100,
          max: 200,
          min: 0,
          unit: '%'
        },
        saturate: {
          value: 100,
          max: 100,
          min: 0,
          unit: '%'
        },
        sepia: {
          value: 0,
          max: 100,
          min: 0,
          unit: '%'
        },
        invert: {
          value: 0,
          max: 100,
          min: 0,
          unit: '%'
        },
        transparent: {
          value: 100,
          max: 100,
          min: 0,
          unit: ''
        }
      }
    }
  }

  changeImageFit = () => {
    this.setState(prevState => { return { imageFit: !prevState.imageFit }});
  }

  uploadImage = e => {
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

  imageFilterHandler = prop => {
    return e => {
      let value = e.target.value;
      this.setState(prevState => {
        return {
          filters: {
            ...prevState.filters,
            [prop]: {
              ...prevState.filters[prop],
              value: value
            }
          }
        };
      })
    }
  }

  render () {
    const { maxLineWidth } = this.props,
      { content, filters } = this.state,
      { contrast, hue, brightness, saturate, sepia, invert, transparent} = filters,
      imgStyle = {
        maxWidth: '100%',
        height: 'auto',
        opacity: transparent.value / 100,
        filter: `contrast(${contrast.value}${contrast.unit}) hue-rotate(${hue.value}${hue.unit}) brightness(${brightness.value}${brightness.unit}) saturate(${saturate.value}${saturate.unit}) sepia(${sepia.value}${sepia.unit}) invert(${invert.value}${invert.unit})`
      },
      imageJSX = (
        <div className='w-100'>
          <img style={imgStyle} src={content} alt={'default'} />
        </div>
      );

    return (
      <>
        <Item.Infograph>
          {imageJSX}
        </Item.Infograph>
        <Item.Editor>
          <div className='h-100 mx-3 my-3 position-relative' style={{}}>
            <div className='d-flex flex-column' style={{ fontSize: 14}}>
              <div>
                <label htmlFor='image-upload font-weight-bold' className='d-inline'>Upload Image: </label>
                <Input id='image-upload' type='file' className='input-file d-inline ml-2' onChange={this.uploadImage}></Input>
              </div>
              <div className='image-filter-container d-flex flex-column justify-content-start'>
                <div className='separator font-weight-bold'>Image Filters</div>
                {Object.keys(filters).map((name, index) => {
                  let filter = filters[name];
                  return (
                    <div className='my-2 w-100 image-filter d-flex flex-row justify-content-between' key={index}>
                      <span className='mr-2'>{name}</span>
                      <input type='range' min={filter.min} max={filter.max} value={filter.value} onChange={this.imageFilterHandler(name)} />
                      <span style={{ width: 40 }}>{`${filter.value}${filter.unit}`}</span>
                    </div>
                  );
                })}
              </div>
            </div>
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
      <BaseItemIcon retContent={retContent} passContent={onClickFn} id='sidebar-image-btn' tooltext='Add image'>
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
