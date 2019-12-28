/* eslint-disable */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFont, faAlignLeft, faAlignRight, faAlignCenter, faQuoteLeft, faQuoteRight
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
      alignment: 'text-left',
      textBold: '',
      textItalic: '',
      textUnderline: '',
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

  getFontStyleHandler = (type, val) => {
    return () => {
      this.setState({
        [type]: val
      });
    }
  }

  getTextAlignmentHandler = type => {
    return () => {
      this.setState({
        alignment: type
      });
    }
  }

  getFormattedHeader = () => {
    let { maxLineWidth } = this.props,
      headers = this.state.content.split('\n'),
       divs = [],
      i;

    headers.forEach((header, index) => {
      if (!header) return;

      for (i = 20; i < 120; i++) {
        sl.setStyle({
          'font-family': 'Oswald',
          'font-size': i + 'px'
        });
        sl.getSize('a');

        if (sl.getSmartText(header, maxLineWidth, sl._lineHeight).text !== header) {
          break;
        }
      }

      divs.push(
        <div className='header-text' key={index} style={{ fontSize: i - 2, lineHeight: `${i - 5}px` }}>{header}</div>
      );
    });

    return (
      <>
        {divs}
      </>
    )
  }

  getText = type => {
    let { content } = this.state,
      textFontSize,
      textJSX;

    if (type === 'title') {
      textFontSize = 35;
      textJSX = <div style={{ fontSize: textFontSize }}>{content}</div>;
    } else if (type === 'quote') {
      textFontSize = 37;
      textJSX = (
        <div className='d-flex flex-row'>
          <div className='d-inline-block position-relative' style={{ width: 52, background: 'white', borderRadius: 5, marginRight: 10 }}>
            <span style={{ position: 'absolute', top: 0, left: 5, fontSize: 20 }}>
              <FontAwesomeIcon icon={faQuoteLeft} />
            </span>
            <span style={{ position: 'absolute', top: 20, left: 25, fontSize: 20}}>
              <FontAwesomeIcon icon={faQuoteRight} />
            </span>
          </div>
          <div style={{ fontSize: textFontSize }}>{content}</div>
        </div>
      )
    } else if (type === 'body') {
      textFontSize = 20;
      textJSX = <div style={{ fontSize: textFontSize }}>{content}</div>;
    }

    return textJSX;
  }

  onTextChangeHandler = e => {
    this.setState({
      content: e.target.value
    });
  }

  render () {
    const { colorPalette, textTypes, type, textCosmetics, content, alignment,
      textBold, textItalic, textUnderline } = this.state;
    let retContent,
      textContainerClassName = `mx-3 my-2 h-100 py-3 ${alignment} ${textBold} ${textItalic} ${textUnderline}`;

    const editorContent = (
      <Item.Editor>
        <div className='h-100 w-100 px-3 py-2'>
          <div style={{ fontSize: 14 }} className='d-flex flex-column'>
            <ButtonGroup className='type-btn-group mt-2' size='sm'>
              {textTypes.map((textType, index) => {
                return (
                  <Button
                    active={textType === type}
                    key={index}
                    className='type-btn'
                    onClick={this.getTextTypeHandler(index)}
                  >
                    {textType}
                  </Button>
                );
              })}
            </ButtonGroup>
            <div className='mt-2'>
              <span>Color: </span>
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
            <div className='mt-3 d-flex flex-row justify-content-between'>
              <div className='info-text-justify'>
                <span className='mr-2'>Alignment:</span>
                <ButtonGroup size='sm'>
                  <Button active={alignment === 'text-left'} className='font-weight-bold text-alignment-btn' onClick={this.getTextAlignmentHandler('text-left')}>
                    <FontAwesomeIcon icon={faAlignLeft} />
                  </Button>
                  <Button active={alignment === 'text-center'} className='font-weight-bold text-alignment-btn' onClick={this.getTextAlignmentHandler('text-center')}>
                    <FontAwesomeIcon icon={faAlignCenter} />
                  </Button>
                  <Button active={alignment === 'text-right'} className='font-weight-bold text-alignment-btn' onClick={this.getTextAlignmentHandler('text-right')}>
                    <FontAwesomeIcon icon={faAlignRight} />
                  </Button>
                </ButtonGroup>
              </div>
              <div className='info-text-style'>
                <span className='mr-2'>Font style:</span>
                <ButtonGroup size='sm'>
                  <Button active={textBold !== ''} className='font-weight-bold text-decoration-btn' onClick={this.getFontStyleHandler('textBold', 'font-weight-bold')}>B</Button>
                  <Button active={textItalic !== ''} className='font-italic text-decoration-btn' onClick={this.getFontStyleHandler('textItalic', 'font-italic')}>I</Button>
                  <Button active={textUnderline !== ''} className='font-underline text-decoration-btn' onClick={this.getFontStyleHandler('textUnderline', 'font-underline')}>U</Button>
                  <Button active={!textBold && !textItalic && !textUnderline} className='text-decoration-btn' onClick={() => this.setState({ textBold: '', textItalic: '', textUnderline: '' })}>N</Button>
                </ButtonGroup>
              </div>
            </div>
            <div className='mt-2'>
              <div style={{ fontSize: 14 }} >Content:</div>
              <textarea className='w-100' style={{ fontSize: 12, height: 60 }} value={content} onChange={this.onTextChangeHandler}></textarea>
            </div>
          </div>
        </div>
      </Item.Editor>
    );

    retContent = (
      <>
        <Item.Infograph>
          <div
            className={textContainerClassName}
            style={{
              color: textCosmetics.color
            }}
            spellCheck={false}
          >
            {type === 'header' ? this.getFormattedHeader() : this.getText(type)}
          </div>
        </Item.Infograph>
        {editorContent}
      </>
    );
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
    const { type, content, onClickFn, count, maxLineWidth } = this.props;
    const retContent = {
      task: {
        id: 'task-' + (count + 1),
        content: <TextItem type={type} content={content} maxLineWidth={maxLineWidth} />
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
  maxLineWidth: 480,
  content: 'Insert text here',
  onClickFn: () => {}
};

export {
  TextIcon,
  TextItem
};
