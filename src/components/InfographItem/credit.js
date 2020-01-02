/* eslint-disable */

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage, faPalette
} from '@fortawesome/free-solid-svg-icons';
import Item from '../DraggableItem';
import { connect } from 'react-redux';

class CreditItem extends Component {
  render () {
    const { themes } = this.props,
      { themeList, curSelected } = themes,
      creditCosmetics = themeList[curSelected].credit;
    return (
      <>
        <Item.Infograph height={60}>
          <div className='h-100 d-flex flex-row align-items-center justify-content-between px-2' style={{ ...creditCosmetics.background }}>
            <div style={{ ...creditCosmetics.text }}>
              <a 
                href='https://fable-studio.netlify.com/'
                style={{
                  ...creditCosmetics.text,
                  textDecoration: 'inherit'
                }}
              >
                <span className='mr-1'><FontAwesomeIcon icon={faPalette} /></span>fable-studio.netlify.com
              </a>
            </div>
            <div style={{ ...creditCosmetics.text }}>
              Made with ❤️using Fable Studio
            </div>
          </div>
        </Item.Infograph>
        <Item.Editor>
          <div></div>  
        </Item.Editor>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    themes: state.themes
  };
}

const CreditItemHOC = connect(mapStateToProps)(CreditItem);

export {
  CreditItemHOC
};
