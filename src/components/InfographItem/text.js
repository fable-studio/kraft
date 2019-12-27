import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFont
} from '@fortawesome/free-solid-svg-icons';
import BaseItemIcon from './base';
import Item from '../DraggableItem';
import { ButtonGroup, Button } from 'reactstrap';

import './text.scss';

class TextItem extends Component {
  constructor (props) {
    super(props);

    this.state = {
      type: props.type || 'header',
      textCosmetics: {
        color: 'black'
      },
      textTypes: ['header', 'title', 'quote', 'body'],
      colorPalette: ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'white', 'black', 'olive']
    };
  }

  getColorBtnHandler = (index) => {
    return () => {
      const { colorPalette } = this.state;

      this.setState({
        textCosmetics: {
          ...this.state.textCosmetics,
          color: colorPalette[index]
        }
      });
    };
  }

  getTextTypeHandler = (index) => {
    return () => {
      const { textTypes } = this.state;

      this.setState({
        type: textTypes[index]
      });
    };
  }

  render () {
    const { content } = this.props;
    const { colorPalette, textTypes, type, textCosmetics } = this.state;
    let retContent;
    const editorContent = (
      <Item.Editor>
        <div className='h-100 w-100'>
          <div className='d-flex flex-column'>
            <ButtonGroup className='type-btn-group mt-2 px-3' size='sm'>
              {textTypes.map((textType, index) => {
                return (
                  <Button
                    key={index}
                    className='type-btn'
                    onClick={this.getTextTypeHandler(index)}
                  >
                    {textType}
                  </Button>
                );
              })}
              {/* <Button className='type-btn'>Header</Button>
              <Button className='type-btn'>Title</Button>
              <Button className='type-btn'>Qoute</Button>
              <Button className='type-btn'>Body</Button> */}
            </ButtonGroup>
            <div className='mt-1 px-3'>
              <span style={{ fontSize: 14 }}>Color: </span>
              <ButtonGroup className='px-1' size='sm'>
                {colorPalette.map((color, index) => {
                  return (
                    <Button
                      key={index}
                      className='color-btn'
                      onClick={this.getColorBtnHandler(index)}
                      style={{ backgroundColor: color }}
                    ></Button>
                  );
                })}
              </ButtonGroup>
            </div>
          </div>
        </div>
      </Item.Editor>
    );
    if (type === 'body') {
      retContent = (
        <>
          <Item.Infograph>
            <div
              className='mx-2 my-2 h-100'
              style={{
                color: textCosmetics.color
              }}
              spellCheck={false}
            >
              {/* @todo: fill up */}
            </div>
          </Item.Infograph>
          {editorContent}
        </>
      );
    } else if (type === 'title') {
      retContent = (
        <>
          <Item.Infograph>
            <div
              className='mx-2 my-2 h-100'
              style={{
                color: textCosmetics.color
              }}
              spellCheck={false}
            >
              {/* @todo: fill up */}
            </div>
          </Item.Infograph>
          {editorContent}
        </>
      );
    } else if (type === 'quote') {
      retContent = (
        <>
          <Item.Infograph>
            <div
              className='mx-2 my-2 h-100'
              style={{
                color: textCosmetics.color
              }}
              spellCheck={false}
            >
              {/* @todo: fill up */}
            </div>
          </Item.Infograph>
          {editorContent}
        </>
      );
    } else if (type === 'header') {
      retContent = (
        <>
          <Item.Infograph>
            <div
              className='mx-2 my-2 h-100'
              style={{
                color: textCosmetics.color
              }}
              spellCheck={false}
            >
              <h1 contentEditable={true} suppressContentEditableWarning={true}>{content}</h1>
            </div>
          </Item.Infograph>
          {editorContent}
        </>
      );
    }
    return retContent;
  }
}

TextItem.defaultProps = {
  type: 'header',
  content: 'Insert text here'
};

class TextIcon extends Component {
  render () {
    const { type, content, onClickFn, count } = this.props;
    const retContent = {
      task: {
        id: 'task-' + (count + 1),
        content: <TextItem type={type} content={content} />
      }
    };

    return (
      <BaseItemIcon retContent={retContent} passContent={onClickFn}>
        <FontAwesomeIcon icon={faFont} />
      </BaseItemIcon>
    );
  }
}

TextIcon.defaultProps = {
  type: 'header',
  content: 'Insert text here',
  onClickFn: () => {}
};

export {
  TextIcon,
  TextItem
};
