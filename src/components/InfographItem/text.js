import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFont
} from '@fortawesome/free-solid-svg-icons';
import BaseItemIcon from './base';
import Item from '../DraggableItem';
import { ButtonGroup, Button } from 'reactstrap';
import Sl from 'fusioncharts-smartlabel';

import './text.scss';

const sl = new Sl();
class TextItem extends Component {
  constructor (props) {
    super(props);

    this.state = {
      content: props.content,
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

  getFormattedHeader = () => {
    let { maxLineWidth } = this.props,
      headers = this.state.content.split('\n'),
      // divs = '',
      i;

    headers.forEach((header, index) => {
      if (!header) return;

      for (i = 20; i < 100; i++) {
        sl.setStyle({
          'font-family': 'Noto Sans SC',
          'font-size': i + 'px'
        });
        sl.getSize('a');

        if (sl.getSmartText(header, maxLineWidth, sl._lineHeight).text !== header) {
          break;
        }
      }

      // divs += `<div style='font-size:${i - 1}px'>${header}</div>`;
    });

    return (
      <input
        className='w-100'
        onChange={this.handleChange}
        style={{ fontSize: i - 2, background: 'transparent', border: 'none'}}
        value={headers[0]}
      >
      </input>
    )
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value
    });
  }

  render () {
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
              className='mx-2 my-2 h-100 text-center'
              style={{
                color: textCosmetics.color
              }}
              spellCheck={false}
            >
              {this.getFormattedHeader()}
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
  content: 'Insert text here',
  maxLineWidth: 480
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
